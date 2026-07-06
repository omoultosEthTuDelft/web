# Web Improvement Plan

Findings from a code review of the site (2026-07-06), ordered by impact.
Repo: Jekyll academic site + Cloudflare Worker chatbot.

---

## 1. Bugs & security

### 1.1 XSS hole in the chat widget — HIGH priority
**File:** `_layouts/default.html` (`formatText()`, ~lines 167–176)

`formatText()` escapes `&`, `<`, `>` but **not double quotes**, then builds
`<a href="$2" ...>` from the markdown-link regex. A URL like
`[click](https://x.com/" onmouseover="...)` breaks out of the `href`
attribute and injects arbitrary event handlers. Bot replies are LLM output
(steerable via prompt injection), so this is a realistic phishing vector.

**Fix:** add `.replace(/"/g,'&quot;')` to the escaping chain (before the
link replacement), or build links via `document.createElement` instead of
`innerHTML`.

**DONE (2026-07-06):** `"` and `'` are now escaped in `formatText()`.

### 1.2 Chatbot worker has no input limits / rate limiting — HIGH priority
**File:** `chatbot-worker/worker.js` (~lines 194–217)

- Accepts any `message` length and any number of `history` entries, all
  forwarded to OpenRouter on a paid API key.
- CORS does not stop server-to-server abuse; there is no rate limiting.
  Anyone can run up the bill with a curl loop.
- The widget in `default.html` never trims `history`, so even legitimate
  long conversations send ever-growing payloads.

**Fix:**
- [x] Cap `message` length (2,000 chars) in the worker. — DONE 2026-07-06
- [x] Cap `history` to the last 20 messages (~10 turns), worker AND widget,
  plus per-entry length cap and type validation. — DONE 2026-07-06
- [x] Per-IP rate limit (10 req/60 s) via the Workers rate-limiting
  binding in `wrangler.toml`; worker degrades gracefully if the binding
  is absent. — DONE 2026-07-06. **Requires `wrangler deploy` to take
  effect.**

### 1.3 `/logs` endpoint weaknesses — LOW priority
**File:** `chatbot-worker/worker.js` (~line 135)

- `secret !== env.LOGS_SECRET` is not a constant-time comparison.
- Listing does one KV `get` per key **sequentially** — slow as logs grow
  (batch with `Promise.all` per page).
- `logs.sort` throws if any stored entry lacks a `timestamp`.

### 1.4 `_config.yml` URL trailing slash → double-slash URLs — MEDIUM priority
**Files:** `_config.yml`, `CNAME`

- `url: https://omoultosethtudelft.github.io/web/` + `{{ site.url }}/css/...`
  yields `…/web//css/theme.css` in production. (Local `_site` hides this
  because `jekyll serve` overrides the URL with `localhost:4000`.)
- **Fix:** drop the trailing slash from `url`. — DONE 2026-07-06
- `CNAME` contains `omoultosethtudelft.github.io` — CNAME files are for
  *custom* domains; pointing it at the github.io hostname does nothing.
  Removed. — DONE 2026-07-06

### 1.5 Layout / head hygiene — MEDIUM priority
**File:** `_layouts/default.html`

- [x] Add `lang="en"` to `<html>` (accessibility). — DONE 2026-07-06
- [x] Add `<meta name="description">` (site-wide default in `_config.yml`,
  per-page override via front matter `description:`), SVG favicon
  (`assets/favicon.svg`), canonical link, Open Graph + Twitter card tags.
  — DONE 2026-07-06
- [x] Move `<meta charset="UTF-8">` to be the first element in `<head>`.
  — DONE 2026-07-06

---

## 2. Performance

### 2.1 Photos page ships ~117 MB — HIGHEST impact
**File:** `photos/index.md`

77 full-resolution camera images embedded directly (e.g.
`prateek2022.jpg` is 3 MB at 4032×3024). No `loading="lazy"` anywhere on
the site.

- [x] Add `loading="lazy"` to every gallery `<img>` (cuts initial load to
  just the viewport). — DONE 2026-07-06 (65 images; lightbox modal img
  excluded on purpose, its src is set dynamically).
- [ ] Generate ~800px-wide thumbnails (e.g. with `sips` or ImageMagick);
  link thumbnails to the originals. Takes the page from ~117 MB to ~5 MB
  even fully scrolled.

### 2.2 Simulation gallery videos (~300 MB) — HIGH impact
**File:** `cool/index.md`

8 `<video controls>` tags with no `preload` attribute; browsers fetch
metadata and often buffer ahead for all of them (files up to 54 MB each).

- [x] Add `preload="none"` to every `<video>`. — DONE 2026-07-06 (8 videos).
- [ ] Add a `poster` image per video so nothing downloads until play.

### 2.3 Oversized images elsewhere — MEDIUM impact
- Homepage portrait `assets/photoOtto2.jpg`: 706 KB at 1453×1907,
  displayed at roughly a third of that width → resize.
- People-page avatars rendered as small circles:
  `people/photos/Sarvesh.jpg` (2.6 MB), `people/photos/Hicham.png`
  (1.2 MB), `people/photos/Kostas.jpg` (1.1 MB) → resize to ~400px.

### 2.4 Frontend stack — MEDIUM impact
**File:** `_layouts/default.html`

- [x] **Delete the Tether script tag** (~line 89) — Bootstrap 4 final does
  not use Tether at all; Popper alone is enough. Pure dead weight.
  — DONE 2026-07-06.
- [ ] Upgrade Bootstrap 4.0.0 (2018, known CVEs in later-patched
  components) to 4.6.2.
- [ ] Font Awesome full `all.min.css` (~100 KB) is loaded for ~10 icons —
  replace with inline SVGs or a subset build.

### 2.5 Repo size risk — MEDIUM priority, grows over time
Git repo is 1.7 GB; 331 large binaries (theses, publication PDFs, videos)
are version-tracked. Site source is past GitHub Pages' 1 GB soft limit —
deploys may eventually fail.

- [ ] Move `cool/videos/` to YouTube embeds (also fixes 2.2).
- [ ] Host theses / large publication PDFs externally (e.g. TU Delft
  repository links), or at minimum stop adding new large binaries.

---

## 3. Cleanup (no runtime cost, just clutter)

Tracked in git but unused — safe to delete:

- [ ] `js/` — jQuery 1.7.1 + plugins; nothing references them (site uses
  CDN jQuery 3.2.1).
- [ ] `fonts/` — unreferenced.
- [ ] `assets/temp/` — ~70 MB of `*_temp.pdf` files.
- [ ] `Makefile_old`
- [ ] `_layouts/default_original.html`
- [ ] `photos/indexOriginal.md`
- [ ] `software/index_original.md`, `software/index_better.md`

---

## Suggested order of execution

1. **Quick wins (minutes):** 1.1 quote-escaping fix, 2.1 `loading="lazy"`,
   2.2 `preload="none"`, 2.4 delete Tether.
2. **Worker hardening:** 1.2 input caps + rate limit.
3. **Config/head fixes:** 1.4, 1.5.
4. **Image resizing:** 2.1 thumbnails, 2.3.
5. **Cleanup:** section 3.
6. **Longer term:** 2.5 repo-size strategy, Bootstrap upgrade.
