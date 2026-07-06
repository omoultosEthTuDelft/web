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
  is absent. — DONE 2026-07-06, deployed and verified live (429 after
  ~11 rapid requests; note CF counters are per-machine/approximate, so
  requests spread over many connections may each see a fresh counter).

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
- [x] Generate ~800px-wide thumbnails — DONE 2026-07-06. Thumbs live in
  `photos/photos/thumbs/` (9.7 MB total vs 117 MB originals, JPEG q80);
  gallery `<img>` tags point at thumbs, `<a href>` still opens the
  full-res original. The lightbox modal shows the thumb, which matches
  its ~800px max width.

### 2.2 Simulation gallery videos (~300 MB) — HIGH impact
**File:** `cool/index.md`

8 `<video controls>` tags with no `preload` attribute; browsers fetch
metadata and often buffer ahead for all of them (files up to 54 MB each).

- [x] Add `preload="none"` to every `<video>`. — DONE 2026-07-06 (8 videos).
- [ ] Add a `poster` image per video so nothing downloads until play.

### 2.3 Oversized images elsewhere — MEDIUM impact
- [x] Homepage portrait `assets/photoOtto2.jpg`: resized 1453×1907
  (706 KB) → 800px wide (249 KB). — DONE 2026-07-06
- [x] People-page avatars: all resized to max 400px wide (dir went
  8.3 MB → 0.8 MB); `Hicham.png` converted to JPEG (1.2 MB → 40 KB,
  reference updated in `people/index.md`). — DONE 2026-07-06

### 2.4 Frontend stack — MEDIUM impact
**File:** `_layouts/default.html`

- [x] **Delete the Tether script tag** (~line 89) — Bootstrap 4 final does
  not use Tether at all; Popper alone is enough. Pure dead weight.
  — DONE 2026-07-06.
- [x] Upgrade Bootstrap 4.0.0 → 4.6.2 (jsdelivr, SRI hashes verified by
  downloading and hashing the files). jQuery 3.2.1-slim → 3.7.1-slim;
  Popper now comes from bootstrap.bundle.min.js (one script fewer).
  — DONE 2026-07-06, homepage rendering verified via headless Chrome.
- [x] Font Awesome CDN (~250 KB CSS + webfonts) replaced with
  `css/fa-icons.css` (~25 KB raw / ~8 KB gzipped): a generated subset of
  the 19 icons the site actually uses, embedded as SVG masks colored via
  currentColor. Supports `.fa-solid`, `.fa-brands`, legacy `.fa`, and
  `.fa-fw`. All 19 verified rendering via headless Chrome. To add a new
  icon: append a rule with the SVG from @fortawesome/fontawesome-free.
  — DONE 2026-07-06

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

- [x] `js/` — jQuery 1.7.1 + plugins; nothing references them (site uses
  CDN jQuery 3.2.1). — DELETED 2026-07-06
- [x] `fonts/` — unreferenced. — DELETED 2026-07-06
- ~~`assets/temp/`~~ — **NOT cruft after all**: the `*_temp.pdf` files
  are linked from `publications/index.md` for the in-press papers
  108/109/111. Kept. Revisit when the final publisher PDFs replace them.
- [x] `Makefile_old` — DELETED 2026-07-06
- [x] `_layouts/default_original.html` — DELETED 2026-07-06
- [x] `photos/indexOriginal.md` — DELETED 2026-07-06
- [x] `software/index_original.md`, `software/index_better.md`
  — DELETED 2026-07-06

---

## Suggested order of execution

1. **Quick wins (minutes):** 1.1 quote-escaping fix, 2.1 `loading="lazy"`,
   2.2 `preload="none"`, 2.4 delete Tether.
2. **Worker hardening:** 1.2 input caps + rate limit.
3. **Config/head fixes:** 1.4, 1.5.
4. **Image resizing:** 2.1 thumbnails, 2.3.
5. **Cleanup:** section 3.
6. **Longer term:** 2.5 repo-size strategy, Bootstrap upgrade.
