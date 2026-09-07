/**
 * Adnan Syukur Portfolio — Main JavaScript (v3)
 * Vanilla ES6+, zero dependencies, progressive enhancement.
 * Every feature degrades gracefully: no-JS, no-IntersectionObserver,
 * and prefers-reduced-motion are all first-class states.
 */
(function () {
  'use strict';

  /* ============ HELPERS & CONFIG ============ */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const CONFIG = {
    scrollRevealThreshold: 0.08,
    scrollRevealRootMargin: '0px 0px -30px',
    backTopVisibleAt: 500,
    countDuration: 900,
    pageLoadMaxWait: 1400,
  };

  const root = document.documentElement;
  root.classList.add('js');

  /* ============ PAGE-READY BOOT ============ */
  /* html.js.is-ready switches on the staged hero/page-hero entrance animations. */
  function bootReady() {
    root.classList.add('is-ready');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootReady);
  } else {
    bootReady();
  }

  /* Fade the page in once everything critical has painted.
     A timeout guards against load events that never fire. */
  document.body.classList.add('page-loading');
  function revealPage() {
    document.body.classList.remove('page-loading');
  }
  window.addEventListener('load', revealPage, { once: true });
  window.setTimeout(revealPage, CONFIG.pageLoadMaxWait);

  /* ============ PAGE TRANSITIONS ============ */
  /* Same-document View Transitions when supported, graceful fallback otherwise. */
  (function initPageTransitions() {
    if (!document.startViewTransition || reducedMotion.matches) return;

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.hash) return;

      event.preventDefault();
      document.startViewTransition(() => {
        window.location.href = destination.href;
      });
    });
  })();

  /* ============ THEME MANAGER ============ */
  (function initTheme() {
    const toggle = $('#theme-toggle');

    function currentTheme() {
      return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function applyTheme(theme, persist) {
      const isDark = theme === 'dark';
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      if (toggle) {
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      }
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', isDark ? '#080C12' : '#EDE7D6');
      if (persist) {
        try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
      }
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
      });
    }

    /* sync ARIA state on load without overwriting the stored preference */
    applyTheme(currentTheme(), false);
  })();

  /* ============ HEADER SCROLLED STATE ============ */
  (function initHeaderState() {
    const header = $('.site-header');
    if (!header) return;
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ============ MOBILE NAVIGATION ============ */
  (function initNavigation() {
    const navToggle = $('.nav-toggle');
    const siteNav = $('#site-nav');
    if (!navToggle || !siteNav) return;

    function handleNavToggle() {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    }

    function closeNav() {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', handleNavToggle);
    siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
    document.addEventListener('click', (event) => {
      if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) closeNav();
    });
  })();

  /* ============ SKIP LINK ============ */
  (function addSkipLink() {
    const main = $('main');
    if (!main || $('.skip-to-main')) return;

    main.id = main.id || 'main-content';
    main.setAttribute('tabindex', '-1');
    const link = document.createElement('a');
    link.className = 'skip-to-main';
    link.href = '#' + main.id;
    link.textContent = 'Skip to main content';
    document.body.prepend(link);
    link.addEventListener('click', (e) => {
      e.preventDefault();
      main.focus();
      main.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  })();

  /* ============ FOOTER YEAR ============ */
  (function updateFooterYear() {
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  })();

  /* ============ PROJECT CARD GITHUB LINKS ============ */
  (function addGitHubLinks() {
    $$('.project-card .card-footer').forEach((footer) => {
      if (footer.querySelector('.project-link')) return;
      const link = document.createElement('a');
      link.className = 'card-link project-link';
      link.href = 'https://github.com/SS7ZX';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'View on GitHub +';
      footer.appendChild(link);
    });
  })();

  /* ============ BACK TO TOP ============ */
  (function initBackToTop() {
    const btn = $('.back-top');
    if (!btn) return;

    function update() {
      btn.classList.toggle('is-visible', window.scrollY > CONFIG.backTopVisibleAt);
    }
    function toTop() {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }

    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', toTop);
    update();
  })();

  /* ============ SCROLL REVEAL ============ */
  (function initScrollReveal() {
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

    const targets = $$(
      '[data-reveal], [data-reveal-item], .section-heading, .feature-card, .card, ' +
      '.timeline-item, .case-study, .stack-group, .contact-panel, .table-wrap, ' +
      '.faq, .form-grid, .stats-grid, .skill-group'
    );
    if (targets.length === 0) return;

    targets.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: CONFIG.scrollRevealThreshold,
      rootMargin: CONFIG.scrollRevealRootMargin,
    });

    targets.forEach((el) => observer.observe(el));
  })();

  /* ============ STATS COUNTERS ============ */
  (function initStatsCounters() {
    const values = $$('.stat-value');
    if (values.length === 0 || !('IntersectionObserver' in window)) return;

    function animate(el) {
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      if (reducedMotion.matches || target === 0) {
        el.textContent = target + suffix;
        return;
      }
      const start = performance.now();
      const duration = CONFIG.countDuration;
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    values.forEach((el) => observer.observe(el));
  })();

  /* ============ SKILL BARS ============ */
  (function initSkillBars() {
    const groups = $$('.skill-group');
    if (groups.length === 0 || !('IntersectionObserver' in window)) return;

    function fill(group) {
      $$('.skill-fill', group).forEach((bar, i) => {
        const level = Math.min(100, Math.max(0, parseInt(bar.dataset.level, 10) || 0));
        const delay = reducedMotion.matches ? 0 : i * 90;
        window.setTimeout(() => {
          bar.style.width = level + '%';
        }, delay);
      });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        fill(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.25 });

    groups.forEach((group) => observer.observe(group));
  })();

  /* ============ PROJECT ARCHIVE FILTERS ============ */
  (function initProjectFilters() {
    const filters = $$('.project-filter');
    const projects = $$('.portfolio-project');
    const status = $('.project-filter-status');
    if (filters.length === 0 || projects.length === 0) return;

    filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        const selected = filter.dataset.filter || 'all';
        let visible = 0;
        filters.forEach((item) => {
          const active = item === filter;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        projects.forEach((project) => {
          const matches = selected === 'all' || project.dataset.category === selected;
          project.classList.toggle('is-filtered-out', !matches);
          project.classList.toggle('is-filtered-in', matches);
          if (matches) visible += 1;
        });
        if (status) status.textContent = selected === 'all'
          ? 'Showing all ' + visible + ' projects'
          : 'Showing ' + visible + ' ' + filter.textContent.replace(/\d+/g, '').trim().toLowerCase();
      });
    });
  })();

  /* ============ CHAPTER NAVIGATION (on-page rail) ============ */
  (function initChapterNav() {
    if (document.body.classList.contains('error-page')) return;
    if (!('IntersectionObserver' in window)) return;

    const sections = $$('main .section').filter((s) => s.querySelector('.section-heading .section-label'));
    if (sections.length < 3) return;

    const nav = document.createElement('nav');
    nav.className = 'chapter-nav';
    nav.setAttribute('aria-label', 'On this page');

    const items = sections.map((section) => {
      const label = section.querySelector('.section-heading .section-label').textContent.trim();
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chapter-nav-item';
      const span = document.createElement('span');
      span.textContent = label;
      btn.appendChild(span);
      btn.addEventListener('click', () => {
        const top = section.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      });
      nav.appendChild(btn);
      return btn;
    });

    document.body.appendChild(nav);

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = sections.indexOf(entry.target);
        items.forEach((item, i) => item.classList.toggle('is-active', i === idx));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => spy.observe(section));
  })();

  /* ============ CURSOR ACCENT ============
     A single crisp dot replaces the arrow on fine pointers. No trailing
     ring, no lag — it is a pointer, not a decoration. */
  (function initCursor() {
    if (!finePointer.matches || reducedMotion.matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    root.classList.add('has-cursor');

    document.addEventListener('mousemove', (e) => {
      dot.style.transform = 'translate3d(' + (e.clientX - 3) + 'px, ' + (e.clientY - 3) + 'px, 0)';
    });

    const interactive = 'a, button, summary, input, textarea, [role="button"], label';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactive)) dot.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactive)) dot.classList.remove('is-hover');
    });
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
    });
  })();

  /* ============ HERO FRAME DEPTH (pointer tilt) ============ */
  (function initFrameDepth() {
    const frame = $('.hero-frame');
    if (!frame || reducedMotion.matches || !finePointer.matches) return;

    frame.addEventListener('pointermove', (event) => {
      const bounds = frame.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      frame.style.setProperty('--frame-x', x * 7 + 'px');
      frame.style.setProperty('--frame-y', y * 7 + 'px');
      frame.style.setProperty('--frame-rotate', 1.5 + x * 1.5 + 'deg');
    });

    frame.addEventListener('pointerleave', () => {
      frame.style.setProperty('--frame-x', '0px');
      frame.style.setProperty('--frame-y', '0px');
      frame.style.setProperty('--frame-rotate', '1.5deg');
    });
  })();

  /* ============ SCROLL MARKER (reading progress) ============ */
  (function initScrollMarker() {
    const marker = document.createElement('div');
    marker.className = 'scroll-marker';
    marker.setAttribute('aria-hidden', 'true');
    document.body.appendChild(marker);

    function update() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      marker.style.transform = 'scaleX(' + Math.min(1, Math.max(0, progress)) + ')';
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  /* ============ EXTERNAL LINK AFFORDANCES ============ */
  (function markExternalLinks() {
    $$('a[target="_blank"]').forEach((link) => {
      const label = (link.textContent || '').trim();
      if (label) {
        link.setAttribute('aria-label', label + ' (opens in a new tab)');
      }
    });
  })();

  /* ============ ERROR HANDLING ============ */
  (function setupErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Script error:', event.error);
    });
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  })();

  console.log('Portfolio loaded - Adnan Syukur');
})();
