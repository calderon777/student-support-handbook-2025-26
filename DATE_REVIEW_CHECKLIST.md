# Date-Sensitive Content Checklist

Use this checklist at least once per term before publishing updates.

1. Deadlines
- Replace fixed dates with current-cycle dates or evergreen wording.
- Confirm links that mention "deadline" or "application window" still match source pages.

2. Academic Calendar
- Verify term dates, exam timetable links, and progression/awards links.
- Confirm the current academic year value in timetable URLs (e.g., `TT2526`).

3. Staff and Student Processes
- Recheck Extenuating Circumstances wording and submission windows.
- Recheck registration and fees/finance guidance wording.

4. People and Contacts
- Verify role-holder names and all `mailto:` links (personal tutors, course office, directors).
- Confirm shared inboxes are still active.

5. Rendered Output QA
- Run `quarto render index.qmd`.
- Run `quarto render Staff_Support.qmd`.
- Spot-check `docs/index.html` and `docs/Staff_Support.html` for stale dates and broken links.

6. Publish Notes
- Record changes in `HANDOFF_LOG.md` with date and what was updated.
