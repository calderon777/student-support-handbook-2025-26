(function () {
  'use strict';
  function buildTilesIndex() {
    try {
      const main = document.querySelector('main.content') || document;
      const mainTitle = main.querySelector('h1') || document.querySelector('h1');
      if (!mainTitle) return;

      // remove any existing index
      const old = main.querySelector('.quarto-tiles-index'); if (old) old.remove();

      // collect headings (skip the main title)
      const allHeadings = Array.from(main.querySelectorAll('h1,h2'));
      const headings = allHeadings.filter(h => h !== mainTitle);

      const index = document.createElement('div'); index.className = 'quarto-tiles-index';
      const seen = new Set();

      headings.forEach(heading => {
        // gather anchors from nodes until next h1/h2
        const items = [];
        let node = heading.nextSibling;
        while (node && !(node.nodeType === 1 && (node.matches('h1') || node.matches('h2')))) {
          if (node.nodeType === 1) {
            Array.from(node.querySelectorAll('a[href]')).forEach(a => {
              const href = (a.href || a.getAttribute('href') || '').trim();
              if (!href || href.startsWith('#')) return;
              if (seen.has(href)) return; // global dedupe: show each service only once
              seen.add(href);
              const raw = (a.textContent || a.getAttribute('title') || href).trim();
              const label = raw.length > 60 ? raw.slice(0,57).trim() + '…' : raw;
              items.push({ href, label });
            });
          }
          node = node.nextSibling;
        }

        if (items.length > 0) {
          const group = document.createElement('div'); group.className = 'tiles-group';
          const gt = document.createElement('div'); gt.className = 'group-title'; gt.textContent = heading.textContent.trim(); group.appendChild(gt);
          const grid = document.createElement('div'); grid.className = 'quarto-tiles-grid';
          // choose a semantic icon for each tile based on label or href
          function chooseImportant(text, href) {
            const s = (text + ' ' + (href || '')).toLowerCase();
            const keywords = ['exam','examination','timetable','registration','evision','extension','extenuating','support@city','support','funding','fees','accommodation','health','wellbeing','attendance','seats','urgent'];
            return keywords.some(k => s.includes(k));
          }

          // ---- Explicit per-tile icon overrides (exact label match) ----
// Add/modify entries to force a specific icon for a specific tile label.
// Uses Bootstrap Icons (https://icons.getbootstrap.com/) classes like 'bi-calendar3'.
const ICON_EXACT_MAP = {
  // Already agreed / good
  "Term Dates": "bi-calendar3",
  "Timetable Information": "bi-calendar3",
  "Examination Timetable": "bi-clock",
  "Personal Tutors": "bi-person-workspace",
  "Extenuating Circumstances": "bi-clipboard-check",
  "Extensions": "bi-file-earmark-text",
  "Academic Misconduct": "bi-shield-exclamation",
  "Student Appeals": "bi-clipboard-check",
  "Student Union Advise & Support": "bi-people",
  "Library": "bi-book",
  "Library Resources": "bi-book",
  "e-referral": "bi-heart-pulse",
  "Support with Revision": "bi-mortarboard",
  "Employability Economics": "bi-briefcase",

  // Fix obvious mismatches
  "SEAtS Mobile app": "bi-phone",
  "Student Health & Wellbeing e-Referral": "bi-heart-pulse",
  "Student Support Hub Advisers": "bi-person-lines-fill",
  "The Student Support Hub": "bi-building",

  // Authorised absence forms
  "PG online Authorised Absence form": "bi-calendar-check",
  "Authorised Absence for Research students via Research Man…": "bi-calendar-check",

  // Buddying / mentoring
  "CityBuddy": "bi-people",
  "Apply to get a mentor that will be your personal guide to…": "bi-person-plus",

  // Core support areas
  "Accommodation": "bi-house-door",
  "Uni Cares": "bi-life-preserver",
  "International Student & Visa Advice": "bi-globe2",
  "Student Funding": "bi-cash-coin",
  "School Student Welfare teams": "bi-heart",

  // Study support / skills
  "Academic English support": "bi-chat-text",
  "Academic Skills": "bi-mortarboard",
  "Digital Skills": "bi-laptop",

  // Student Hub catch-all
  "Help and support | Student Hub | City, University of London": "bi-question-circle",

  // SU / reps / nominations
  "the nomination form": "bi-pencil-square",

  // Careers / mentoring
  "Professional Mentoring Scheme": "bi-person-badge",

  // Faith & culture
  "Faith, belief and culture at City St George’s": "bi-people",

  // Staff resources
  "Toolkit for Supporting Students": "bi-tools",
  "personal tutors": "bi-person-workspace",

  // E-learning / teaching resources
  "Staff Supporting Students": "bi-play-circle",
  "Managers Supporting Staff": "bi-play-circle",
  "Risks and Crises": "bi-shield-exclamation",
  "including Powerpoint slides to incorporate into Induction…": "bi-easel2"
};

// ---------------------------------------------------------------

            function chooseIconClass(text, href) {
            const k = (text || '').trim();
            if (ICON_EXACT_MAP[k]) return ICON_EXACT_MAP[k];
            const s = (text + ' ' + (href || '')).toLowerCase();
            // more specific matches first to reduce reuse
            if (s.includes('youtube.com') || s.includes('youtube')) return 'bi-youtube';
            if (s.includes('instagram.com') || s.includes('instagram')) return 'bi-instagram';
            if (s.includes('progression') || s.includes('award') || s.includes('awards')) return 'bi-trophy';
            if (s.includes('term dates') || s.includes('term date') || (s.includes('term') && s.includes('dates'))) return 'bi-calendar3';
            if (s.includes('timetable') || s.includes('mytimetable') || s.includes('calendar')) return 'bi-calendar3';
            if (s.includes('examin') || s.includes('exam')) return 'bi-clock';
            if (s.includes('extension') || s.includes('extensions') || s.includes('late submission')) return 'bi-file-earmark-text';
            if (s.includes('count me in') || s.includes('attendance') || s.includes('seats')) return 'bi-check2-square';
            if (s.includes('getheard') || s.includes('get heard') || s.includes('feedback') || s.includes('voice') || s.includes('unitu')) return 'bi-megaphone';
            if (s.includes('citynav') || s.includes('city nav') || s.includes('map') || s.includes('nav')) return 'bi-compass';
            if (s.includes('study spaces') || s.includes('library') || s.includes('libguides')) return 'bi-book';
            if (s.includes('student guides') || s.includes('educational technology') || s.includes('educational') || s.includes('technology')) return 'bi-laptop';
            if (s.includes('appsanywhere') || s.includes('apps anywhere') || s.includes('appsanywhere') || s.includes('apps anywhere')) return 'bi-box-seam';
            if (s.includes('careers') || s.includes('employability') || s.includes('jobs') || s.includes('unitemps')) return 'bi-briefcase';
            if (s.includes('union') || s.includes('students union') || s.includes('csgsu')) return 'bi-people';
            if (s.includes('misconduct') || s.includes('academic misconduct')) return 'bi-shield-exclamation';
            if (s.includes('appeal') || s.includes('appeals')) return 'bi-file-earmark-text';
            if (s.includes('progression') || s.includes('award') || s.includes('awards')) return 'bi-trophy';
            if (s.includes('reportandsupport') || s.includes('report+support') || (s.includes('report') && s.includes('support'))) return 'bi-shield-lock';
            if (s.includes('stay city safe') || s.includes('stay city') || s.includes('stay-city')) return 'bi-shield-check';
            if (s.includes('citysport') || s.includes('sport') || s.includes('sports')) return 'bi-trophy';
            if (s.includes('registration') || s.includes('register')) return 'bi-person-badge';
            if (s.includes('fee') || s.includes('finance') || s.includes('fees')) return 'bi-wallet2';
            if (s.includes('evision')) return 'bi-person-badge';
            if (s.includes('it') || s.includes('it service') || s.includes('helpdesk') || s.includes('service now')) return 'bi-laptop';
            if (s.includes('support@city') || s.includes('support hub') || s.includes('create-case') || s.includes('support.city')) return 'bi-headset';
            if (s.includes('health') || s.includes('wellbeing') || s.includes('mental') || s.includes('togetherall')) return 'bi-heart';
            return 'bi-link-45deg';
          }

          items.forEach(it => {
            const tile = document.createElement('a'); tile.className = 'tile-card'; tile.href = it.href; tile.target = '_blank'; tile.rel = 'noopener noreferrer'; tile.setAttribute('aria-label', it.label);
            // mark important tiles
            if (chooseImportant(it.label, it.href)) tile.classList.add('tile-important');
            const icon = document.createElement('i');
            const iconClass = chooseIconClass(it.label, it.href);
            const emailRegex = /\S+@\S+\.\S+/;
            const isEmail = (it.href && it.href.startsWith('mailto:')) || emailRegex.test(it.href) || emailRegex.test(it.label);
            if (isEmail) {
              icon.className = 'tile-icon bi bi-person tile-icon--email';
            } else {
              icon.className = 'tile-icon bi ' + iconClass;
            }
            icon.setAttribute('aria-hidden', 'true');
            const txt = document.createElement('div'); txt.className = 'tile-label'; txt.textContent = it.label;
            tile.appendChild(icon); tile.appendChild(txt); grid.appendChild(tile);
          });
          group.appendChild(grid); index.appendChild(group);
        }
      });

      // insert after the title description (so credit + instructions stay above tiles)
var desc = document.querySelector('#title-block-header .description');
var subtitle = main.querySelector('.subtitle, .quarto-subtitle, h2.subtitle, p.subtitle, .page-subtitle');

var insertAfter =
  (desc && desc.textContent && desc.textContent.trim()) ? desc :
  ((subtitle && subtitle.textContent && subtitle.textContent.trim()) ? subtitle : mainTitle);

insertAfter.insertAdjacentElement('afterend', index);
    } catch (e) { console.error('Tiles index generator error', e); }
  }

  if (typeof ENABLE_DYNAMIC_TILES !== 'undefined' && ENABLE_DYNAMIC_TILES) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildTilesIndex); else buildTilesIndex();
  }
})();
