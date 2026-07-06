# Web Improvement Plan — pending items

From the 2026-07-06 code review. All completed items (XSS fix, worker
hardening, lazy loading, thumbnails, image resizing, Bootstrap 4.6.2
upgrade, Font Awesome subset, head/SEO tags, cruft deletion) have been
done and removed from this list — see git history for details.

---

## 1. `/logs` endpoint polish — LOW priority
**File:** `chatbot-worker/worker.js` (`handleLogsRequest`)

- `secret !== env.LOGS_SECRET` is not a constant-time comparison.
- Listing does one KV `get` per key **sequentially** — slow as logs grow
  (batch with `Promise.all` per page).
- `logs.sort` throws if any stored entry lacks a `timestamp`.

## 2. Repo size risk — MEDIUM priority, grows over time

Git repo is 1.7 GB; 331 large binaries (theses, publication PDFs, videos)
are version-tracked. Site source is past GitHub Pages' 1 GB soft limit —
deploys may eventually fail.

- [ ] Move `cool/videos/` to YouTube embeds.
- [ ] Host theses / large publication PDFs externally (e.g. TU Delft
  repository links), or at minimum stop adding new large binaries.

## 3. Replace temp publication PDFs when finals arrive

`assets/temp/*_temp.pdf` are the live download links for in-press papers
108/109/111 (linked from `publications/index.md`). When the final
publisher PDFs are available, move them to `assets/publications/`, update
the links, and delete `assets/temp/`.
