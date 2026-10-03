# Fonts

Self-hosted, per the decision of 2026-10-03. Loading these from Google would add a third-party request
to every page and send visitor IP addresses to Google; both faces are open-licensed, so hosting them
here costs nothing.

| File | Size | Axes |
| --- | --- | --- |
| `manrope-variable.woff2` | 23 KB | `wght` 200–800 |
| `inter-variable.woff2` | 103 KB | `opsz`, `wght` 100–900 |

Both are **variable** fonts, so one file covers every weight the design uses.

## How they were produced

Downloaded from `github.com/google/fonts`, then subset and compressed with `fonttools`:

```
pyftsubset <font>.ttf --unicodes=U+0000-00FF,U+0131,... --layout-features='*' --flavor=woff2
```

The subset is Latin plus the punctuation and symbols this site uses. The full files were 161 KB and
856 KB — Inter in particular carries Cyrillic, Greek and a great deal more that an English-language
Australian site never renders. Subsetting cut them by 85% and 88%.

**If the design ever needs a character outside that range** — a currency symbol, an accented name in a
testimonial — it will render in the fallback face instead. Re-run the subset with the extra range
rather than adding a second font file.

## Licence

Both are SIL Open Font License 1.1. The full licences are in `OFL-manrope.txt` and `OFL-inter.txt` and
must stay with the files.
