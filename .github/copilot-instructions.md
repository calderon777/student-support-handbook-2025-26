# Copilot Instructions for SPGA Student Support Handbook

## Project Overview
This is a **Quarto markdown document** (`Student_Support_2025-26.qmd`) that generates HTML and PDF versions of the SPGA Student Support Handbook for the 2025-26 academic year. The primary output is used for student-facing documentation about university services, policies, and support resources.

**Key Contact**: Zahra Gambarova (Zahra.gambarova@city.ac.uk) for missing information or updates.

## Architecture & Build Process

### Main Components
- **Source File**: `Student_Support_2025-26.qmd` - Single Quarto markdown file containing all handbook content
- **Output Formats**: 
  - HTML (`Student_Support_2025-26.html`) - Primary web-based format with table of contents
  - PDF (`Student_Support_2025-26.pdf`) - Printable format
- **Assets**: `Student_Support_2025-26_files/` - Auto-generated static files (Bootstrap CSS, JavaScript libraries) from Quarto rendering

### Build Command
```powershell
quarto render Student_Support_2025-26.qmd
```
This renders the `.qmd` file to both HTML and PDF formats based on the YAML frontmatter configuration.

## Content Organization

The handbook is organized by major sections (no subsections below level 2):

1. **General Information** - Campus navigation, term dates, IT tools
2. **Student Conduct & Behaviour** - Attendance policies, classroom engagement, email communication
3. **Assessment Information** - Deadlines, late submission penalties, misconduct, appeals
4. **Key School Contacts** - Module leaders, tutors, course officers, student welfare officers
5. **Student Support Services** - Library, IT, CityBuddy, wellbeing, accommodation
6. **Student Union** - Advice, societies, events, sports
7. **Careers & Employability** - Placement programs, micro-placements, mentoring
8. **Other Useful Information** - Registration, fees, faith/culture, international student resources
9. **Staff Resources** - Support toolkits, e-learning courses, attendance monitoring

### Key Patterns
- **Email addresses** are inline links: `[email](mailto:email@domain.com)`
- **External resources** are referenced as standalone links with descriptions
- **Policy references** use square brackets for clarity: "Any work... more than 1 minute past deadline... will have 10 marks deducted"
- **Contact information** is organized by program: Undergraduate vs Postgraduate email addresses
- **Procedures** are listed as bullet points with step numbers or conditions

## Common Updates & Maintenance

When editing content:
- **Email addresses**: Verify format is `[name@domain](mailto:name@domain)`
- **Dates and deadlines**: Check academic calendar; noted deadlines include program rep nominations (Oct 15), placement applications (Oct 14), mentoring (Oct 6)
- **Policy changes**: Keep assessment late submission policy (1 minute grace, 10 mark penalty within 48hrs, zero after) synchronized across document
- **Contact directories**: Maintains separate contact lists for UG (Sociology, International Politics, Economics) and PG programs
- **Links to external systems**: eVision, Moodle, SEAtS, eReferral, Report+Support platform are critical touchpoints

## Important Context for Modifications

**Audience**: Primarily SPGA (School of Policy and Global Affairs) students - both undergraduate and postgraduate
**Tone**: Formal, informative, and student-friendly
**Missing Sections**: SPGA Placement Programme and SPGA Exchange Programme are outlined as headers but lack content (marked as TODO)
**Deprecated Content**: References older "City St George's" branding - verify current institutional name before major updates
**Accessibility**: HTML output should be checked for accessibility; PDF maintains printability

## Tools & Technologies
- **Quarto 1.3+** for markdown rendering
- **Bootstrap** for HTML styling (version embedded in assets)
- **YAML front matter** controls output formats and table of contents generation

## When Adding Content
- Maintain parallel structure across HTML/PDF outputs
- Use relative links for internal cross-references where possible
- Test rendering with `quarto render Student_Support_2025-26.qmd` after significant changes
- Verify all mailto links are properly formatted
- Keep sections at header level 1 (#) or 2 (##) only - avoid deeper nesting
