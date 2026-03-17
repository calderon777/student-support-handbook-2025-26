# Temporary Handoff for Next Session

Created: 2026-03-17
Status: Temporary working note for the next editing session. Fold confirmed outcomes into `HANDOFF_LOG.md` once work is completed.

## Current Project State

- Project type: Quarto website with output published to `docs/`.
- Main source pages: `index.qmd` and `Staff_Support.qmd`.
- Shared assets already extracted: `tiles-shared.css` and `tiles-shared.js`.
- Offline link check status: no malformed links detected in the two main source pages.

## Priority Actions for Next Session

1. Restrict what gets published and indexed.
   - `docs/search.json` currently includes backup content and internal notes.
   - Review whether `backup/`, `HANDOFF_LOG.md`, and `DATE_REVIEW_CHECKLIST.md` should be rendered into the public site.

2. Reduce duplicated source content between `index.qmd` and `Staff_Support.qmd`.
   - Shared student-support sections are still duplicated across both files.
   - Decide whether to move repeated content into includes, partials, or a shared data-driven structure.

3. Consolidate and clean the tile search implementation.
   - `index.qmd` still contains debug `console.log` statements.
   - Align both pages to one production-ready search implementation.

4. Fix end-of-page markdown/rendering issues.
   - `## Change log` is currently being absorbed into the preceding paragraph in rendered HTML.
   - Check paragraph spacing and heading separation in both source pages.

5. Add a lightweight QA workflow.
   - Reuse `scripts/check-links.ps1`.
   - Add a simple pre-publish routine for render, stale-date review, and spot checks of `docs/index.html` and `docs/Staff_Support.html`.

## Specific Findings to Recheck

- Public search index leakage from `docs/search.json`.
- Repeated student-support sections in both main `.qmd` files.
- Production debug logging in `index.qmd`.
- Rendered change-log formatting in both published HTML files.
- Date-sensitive wording such as review dates, academic-cycle references, and deadline/process text.

## Suggested Next Session Sequence

1. Tighten Quarto render scope so backups/internal notes are not indexed publicly.
2. Fix the change-log rendering issue and remove remaining debug logging.
3. Render both pages and verify `docs/search.json`, `docs/index.html`, and `docs/Staff_Support.html`.
4. Start the larger deduplication refactor only after the public-output issues are resolved.

## Validation Checklist

- Run `quarto render index.qmd`.
- Run `quarto render Staff_Support.qmd`.
- Run `powershell -ExecutionPolicy Bypass -File scripts\check-links.ps1`.
- Confirm `docs/search.json` no longer exposes backup/internal pages if publishing scope is changed.
- Spot-check the final rendered pages for heading structure and search behavior.

## Notes

- This file is intentionally temporary and action-oriented.
- If next-session changes are completed, summarize outcomes in `HANDOFF_LOG.md` and then remove or archive this file.
