/* Package the theme as the ZIP WordPress installs: Appearance → Themes → Add New → Upload Theme.

   Written out by hand rather than with PowerShell's Compress-Archive, which on Windows PowerShell 5.1
   stores paths with backslashes. A Linux host such as HostGator then unpacks
   "virtual-office-angels\style.css" as a single oddly named file and the theme does not install.
   This writes standard forward-slash paths, every file deflated, with nothing beyond Node itself.

   The archive has one top-level folder, virtual-office-angels/, which is the theme's directory name
   on the server. README files stay in; they are harmless and explain the theme to whoever opens it.

   Usage: node scripts/wordpress/package-theme.mjs [output.zip]
   Default output: wordpress-theme/virtual-office-angels.zip (git-ignored). */

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { crc32, deflateRawSync } from 'node:zlib';

const NAME = 'virtual-office-angels';
const source = join(process.cwd(), 'wordpress-theme', NAME);
const output = process.argv[2] ?? join(process.cwd(), 'wordpress-theme', `${NAME}.zip`);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return files.flat().sort();
}

/* MS-DOS date and time, as the ZIP format stores them. */
function dosTime(date) {
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    date: ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
  };
}

const locals = [];
const centrals = [];
let offset = 0;

for (const file of await walk(source)) {
  const name = Buffer.from(`${NAME}/${relative(source, file).split('\\').join('/')}`, 'utf8');
  const data = await readFile(file);
  const packed = deflateRawSync(data, { level: 9 });
  const { time, date } = dosTime((await stat(file)).mtime);
  const sum = crc32(data);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);           // version needed
  local.writeUInt16LE(0x0800, 6);       // UTF-8 names
  local.writeUInt16LE(8, 8);            // deflate
  local.writeUInt16LE(time, 10);
  local.writeUInt16LE(date, 12);
  local.writeUInt32LE(sum, 14);
  local.writeUInt32LE(packed.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(name.length, 26);
  locals.push(local, name, packed);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(0x031e, 4);     // made by: Unix, spec 3.0
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x0800, 8);
  central.writeUInt16LE(8, 10);
  central.writeUInt16LE(time, 12);
  central.writeUInt16LE(date, 14);
  central.writeUInt32LE(sum, 16);
  central.writeUInt32LE(packed.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(name.length, 28);
  central.writeUInt32LE((0o100644 << 16) >>> 0, 38); // rw-r--r--
  central.writeUInt32LE(offset, 42);
  centrals.push(central, name);

  offset += local.length + name.length + packed.length;
}

const directory = Buffer.concat(centrals);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(centrals.length / 2, 8);
end.writeUInt16LE(centrals.length / 2, 10);
end.writeUInt32LE(directory.length, 12);
end.writeUInt32LE(offset, 16);

const zip = Buffer.concat([...locals, directory, end]);
await writeFile(output, zip);
console.log(`${output}\n${centrals.length / 2} files, ${(zip.length / 1048576).toFixed(1)} MB`);
