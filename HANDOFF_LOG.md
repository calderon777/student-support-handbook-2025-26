# Session Handoff Log

This file tracks session outcomes, decisions, and recommended next steps so future sessions can pick up quickly.

## 2026-03-04 - Project Analysis and Review

### Scope
- Reviewed repository structure and Quarto website setup.
- Audited key source pages: `index.qmd` and `Staff_Support.qmd`.
- Cross-checked rendered outputs in `docs/index.html` and `docs/Staff_Support.html`.

### What We Did Together
- Mapped project files and outputs (`_quarto.yml`, source `.qmd` files, `docs/` artifacts).
- Performed a focused quality/code-content review for:
  - Broken or malformed links
  - JavaScript runtime risks
  - Time-sensitive/stale content
  - Maintainability concerns from duplicated logic
- Produced a findings-first review with severity and line-level references.

### Key Findings
1. Broken email link in student page body:
   - `index.qmd` uses `[Employability Economics](dagmara.celik@city.ac.uk)` instead of `mailto:`.
2. JavaScript guard inconsistency:
   - `Staff_Support.qmd` references `ENABLE_DYNAMIC_TILES` directly (`if (ENABLE_DYNAMIC_TILES)`) and can throw `ReferenceError`.
   - `index.qmd` safely uses `typeof ENABLE_DYNAMIC_TILES !== 'undefined' && ENABLE_DYNAMIC_TILES`.
3. Stale date in careers section:
   - "deadline ... Sunday, October 6th, 2024" still present in both pages and rendered HTML.
4. Maintainability risk:
   - Large inline CSS/JS block duplicated across pages with drift already visible.

### Decisions / Agreements
- No file edits were applied in this session; this was analysis-only.
- Prioritized next fixes are small, low-risk, and can be delivered quickly.

### Recommended Plan for Next Sessions
1. **Apply immediate content/code fixes**
   - Fix malformed email link with `mailto:` in `index.qmd`.
   - Align `Staff_Support.qmd` dynamic-tiles guard with the safe `typeof` pattern.
   - Replace or remove stale 2024 deadline text (use evergreen phrasing or update with current cycle dates).
2. **Render and validate**
   - Run Quarto render for both pages.
   - Verify updated outputs in `docs/index.html` and `docs/Staff_Support.html`.
3. **Stabilize maintainability**
   - Extract shared inline CSS/JS into a shared include/snippet to avoid future drift.
4. **Optional quality pass**
   - Light copy-edit for typos and consistency (capitalization, punctuation, wording).
   - Add an annual/term review checklist for date-sensitive statements.

### Suggested Session Starters (copy/paste)
- "Implement the 3 quick fixes from HANDOFF_LOG and render the site."
- "Refactor shared tile CSS/JS into a reusable include used by both pages."
- "Do a text polish pass for grammar and consistency on student/staff pages."

### Notes
- Project type from `_quarto.yml`: website output to `docs`.
- Date of this log entry: 2026-03-04.

## 2026-03-04 - Staff Support Page Finalization

### Scope
- Focused exclusively on `Staff_Support.qmd`.
- Improved staff-first structure while preserving student-support guidance for staff signposting.
- Synced source and rendered outputs to GitHub.

### What We Did Together
- Added and organized staff-specific links and tiles.
- Implemented `index.qmd`-style search + crucial-tiles behavior on the staff page.
- Tuned crucial tiles to include only priority staff links:
  - Kept: SEAtS, attendance monitoring, IT self service, timetable overview, referees/references.
  - Removed from crucial set: Toolkit and Learning & Teaching Hub; later removed Report + Support from crucial set.
- Replaced non-working attendance monitoring tile target with working SEAtS training/info URL.
- Updated Referees tile/link with the latest SharePoint URL provided by user.
- Restructured content to two main post-tile sections:
  - `Resources for Staff`
  - `Student Support Links`
- Removed classroom behavior/email-to-student guidance block as agreed.
- Added glossary-style context text for key staff links to improve discoverability/search usefulness.

### Publishing / GitHub Updates
- Multiple commits were pushed on `main` during iterative cleanup and render sync.
- Latest state confirmed pushed and accepted by user.

### Final Status
- User-confirmed: "ok, I am happy."
- Page is now in a stable, staff-oriented mixed model:
  - staff resources first,
  - student-support links retained for staff advising purposes.

### Recommended Next Session
1. Optional final copy-edit pass for typos/encoding artifacts.
2. Optional cleanup of any residual duplicated links between crucial tiles and staff tiles if desired.
3. If content ownership broadens, consider splitting shared JS/CSS into include files to reduce future drift.

## 2026-03-04 - Research References Logged (Information Fragmentation in Large Organizations)

### Purpose
- Consolidate all papers discussed during this session sequence in one place.
- Record whether each source is interview-based / qualitative so methods choices are traceable.

### Papers Discussed

1. Stocker et al. (2015), *Exploring barriers of enterprise search implementation*  
   DOI: https://doi.org/10.1108/AJIM-03-2015-0035  
   Method note: Includes semi-structured interviews (qualitative user study).

2. Svarre, Lykke, Bygholm (2024), *Searching for people in the workplace*  
   DOI: https://doi.org/10.47989/ir292848  
   Access: https://informationr.net/infres/article/download/848/417  
   Method note: Mixed methods including semi-structured interviews.

3. Lykke et al. (2021), *The role of historical and contextual knowledge in enterprise search*  
   DOI: https://doi.org/10.1108/JD-08-2021-0170  
   Method note: Mixed methods; interview component included.

4. Weisman & Bar-Ilan (2010), *Intranet search patterns in a complex organization*  
   Access: https://aisel.aisnet.org/mcis2010/88/  
   Method note: Case study with focus groups and in-depth interviews.

5. Bento et al. (2020), *Organizational silos review* (Societies)  
   DOI: https://doi.org/10.3390/soc10030056  
   Method note: Scoping review (not interview fieldwork).

6. Nevo & Wand (2005), *Transactive memory / knowledge directories* (Decision Support Systems)  
   DOI: https://doi.org/10.1016/j.dss.2004.03.002  
   Method note: Conceptual/framework orientation (not interview-based in the discussed evidence).

7. Jackson & Klobas (2008), *Transactive memory / knowledge directories* (Decision Support Systems)  
   DOI: https://doi.org/10.1016/j.dss.2007.05.001  
   Method note: Detailed case study; interview use not conclusively confirmed from the abstract-level evidence reviewed.

8. Bachrach et al. (2019), *Context factors affecting knowledge-location systems performance* (Journal of Applied Psychology)  
   DOI: https://doi.org/10.1037/apl0000329  
   Method note: Meta-analysis (not interview-based).

9. Hadi, Liu, Li (2022), *Knowledge brokerage / silo-bridging in projects* (International Journal of Project Management)  
   DOI: https://doi.org/10.1016/j.ijproman.2021.11.003  
   Method note: Conceptual/propositional framing (not primary interview fieldwork in this paper).

10. Karakurt & Akbulut (2026), *AI/RAG enterprise KM review* (Applied Sciences)  
    DOI: https://doi.org/10.3390/app16010368  
    Method note: Systematic literature review (not interview-based).

11. Romano & Albrecht (2026), *Applied silo case in emergency management* (Humanities & Social Sciences Communications)  
    DOI/URL: https://www.nature.com/articles/s41599-025-06450-y  
    Method note: Uses secondary qualitative material (prior SME interview notes), not new interviews conducted specifically for the paper.

### Working Classification Summary
- Interview-heavy / qualitative or mixed with interviews: 1, 2, 3, 4.
- Reviews / meta-analysis / conceptual (non-primary interview studies): 5, 6, 8, 9, 10.
- Case/mixed with partial or secondary qualitative evidence: 7, 11.

### Recommendation for Next Research Session
1. Build a shortlist of 8-12 interview-heavy enterprise knowledge-fragmentation papers for the methods section.
2. Define a minimum viable mixed-method protocol for this app (instrumentation + interviews).
3. Prepare a data protection checklist (consent, minimization, retention, pseudonymization) before live analytics.
