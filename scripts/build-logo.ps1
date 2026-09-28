Add-Type -AssemblyName System.Drawing

$code = @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class LogoBuild
{
    // Below this "distance from white" a pixel is treated as background; above it, as solid ink.
    // 60 keeps the grey tagline (min channel 166) and the pale halo highlights fully opaque while
    // still keying the paper white cleanly.
    const int Feather = 60;

    static byte Clamp(double v) { return (byte)(v < 0 ? 0 : (v > 255 ? 255 : v)); }

    public static string Build(string src, string outLight, string outDark, int targetWidth)
    {
        Bitmap source = (Bitmap)Image.FromFile(src);

        // 1. Content bounds: anything that is not paper white.
        int minX = source.Width, minY = source.Height, maxX = -1, maxY = -1;
        for (int y = 0; y < source.Height; y++)
            for (int x = 0; x < source.Width; x++)
            {
                Color c = source.GetPixel(x, y);
                int mn = Math.Min(c.B, Math.Min(c.G, c.R));
                if (mn < 235)
                {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        int cw = maxX - minX + 1, ch = maxY - minY + 1;

        // 2. Downscale on the white background FIRST, so the resampled edges stay matted against
        //    white exactly as the artwork was drawn. Keying afterwards then produces clean alpha;
        //    keying first and scaling second would bleed transparent pixels into the edges.
        int tw = targetWidth;
        int th = (int)Math.Round((double)ch * tw / cw);
        Bitmap scaled = new Bitmap(tw, th, PixelFormat.Format32bppArgb);
        using (Graphics g = Graphics.FromImage(scaled))
        {
            g.Clear(Color.White);
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
            g.SmoothingMode = SmoothingMode.HighQuality;
            g.DrawImage(source, new Rectangle(0, 0, tw, th), new Rectangle(minX, minY, cw, ch), GraphicsUnit.Pixel);
        }
        source.Dispose();

        Bitmap light = new Bitmap(tw, th, PixelFormat.Format32bppArgb);
        Bitmap dark = new Bitmap(tw, th, PixelFormat.Format32bppArgb);

        Rectangle rect = new Rectangle(0, 0, tw, th);
        BitmapData sd = scaled.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        BitmapData ld = light.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
        BitmapData dd = dark.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
        int stride = sd.Stride;
        byte[] sb = new byte[stride * th];
        byte[] lb = new byte[stride * th];
        byte[] db = new byte[stride * th];
        Marshal.Copy(sd.Scan0, sb, 0, sb.Length);

        for (int i = 0; i < sb.Length; i += 4)
        {
            double b = sb[i], gg = sb[i + 1], r = sb[i + 2];
            int mn = (int)Math.Min(b, Math.Min(gg, r));
            int alpha = (255 - mn) * 255 / Feather;
            if (alpha > 255) alpha = 255;
            if (alpha <= 0) continue;                 // paper: leave both outputs fully transparent

            // 3. Unmatte: the observed pixel is ink composited over white, so recover the ink.
            double a = alpha / 255.0;
            double ur = (r - 255 * (1 - a)) / a;
            double ug = (gg - 255 * (1 - a)) / a;
            double ub = (b - 255 * (1 - a)) / a;
            byte R = Clamp(ur), G = Clamp(ug), B = Clamp(ub);

            lb[i] = B; lb[i + 1] = G; lb[i + 2] = R; lb[i + 3] = (byte)alpha;

            // 4. Dark variant. The halo keeps its orange; the blue wordmark and the grey tagline are
            //    lifted, because the brand blue (#2563a8) has too little contrast on the dark navy.
            double dr = R, dg = G, dbb = B;
            int mx = Math.Max(R, Math.Max(G, B));
            int mnv = Math.Min(R, Math.Min(G, B));
            if (R - B > 40)
            {
                // orange: untouched
            }
            else if (mx - mnv <= 28)
            {
                dr = R + (255 - R) * 0.55; dg = G + (255 - G) * 0.55; dbb = B + (255 - B) * 0.55;
            }
            else
            {
                dr = R * 0.38 + 187 * 0.62; dg = G * 0.38 + 221 * 0.62; dbb = B * 0.38 + 255 * 0.62;
            }
            db[i] = Clamp(dbb); db[i + 1] = Clamp(dg); db[i + 2] = Clamp(dr); db[i + 3] = (byte)alpha;
        }

        Marshal.Copy(lb, 0, ld.Scan0, lb.Length);
        Marshal.Copy(db, 0, dd.Scan0, db.Length);
        scaled.UnlockBits(sd); light.UnlockBits(ld); dark.UnlockBits(dd);
        scaled.Dispose();

        light.Save(outLight, ImageFormat.Png);
        dark.Save(outDark, ImageFormat.Png);
        light.Dispose(); dark.Dispose();

        return string.Format("content {0}x{1} (ratio {2:N3}) -> exported {3}x{4}", cw, ch, (double)cw / ch, tw, th);
    }
}
'@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing

$root = "E:\_Yua\VOA\Mock Layout\VOA Layout 1"
$res = [LogoBuild]::Build(
  (Join-Path $root "VOA LOGOS.png"),
  (Join-Path $root "public\assets\voa-logo.png"),
  (Join-Path $root "public\assets\voa-logo-dark.png"),
  700)
Write-Output $res
Get-ChildItem (Join-Path $root "public\assets\voa-logo*.png") | ForEach-Object { Write-Output ("{0}  {1:N0} bytes" -f $_.Name, $_.Length) }
