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

Status 2026-07-15: published site is 1.2 GB — already over GitHub Pages'
documented 1 GB limit (deploys still work, unenforced). Git repo 1.7 GB
(GitHub intervenes ~5 GB). Hard limit that bites first: 100 MB max per
file pushed (largest file today is 54 MB).

Decision (2026-07-15): move `cool/videos/` (248 MB) to YouTube embeds —
planned, not yet done. That alone brings the published site back under
1 GB.

- [ ] Move `cool/videos/` to YouTube embeds.
- [ ] Host theses (134 MB) / publication PDFs externally: TU Delft
  repository links or GitHub Release assets (NOT Git LFS — Pages serves
  LFS pointer files, breaking all links; free LFS quota also too small).
- [ ] After assets are moved out: rewrite history with git filter-repo
  + force push to actually reclaim repo size (deleting files alone does
  not shrink .git).

## 3. Replace temp publication PDFs when finals arrive

`assets/temp/*_temp.pdf` are the live download links for in-press papers
108/109/111 (linked from `publications/index.md`). When the final
publisher PDFs are available, move them to `assets/publications/`, update
the links, and delete `assets/temp/`.
