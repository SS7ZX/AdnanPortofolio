/**
 * Adnan Syukur Portfolio - Main JavaScript
 * Vanilla JS (ES6+), no dependencies
 * Progressive enhancement with graceful degradation
 */

// ============ CONFIGURATION ============
const CONFIG = {
  scrollRevealThreshold: 0.12,
  scrollRevealRootMargin: '0px 0px -30px',
  backTopVisibleAt: 500,
  navToggleDelay: 0,
};

// ============ NAVIGATION ============
(function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (!navToggle || !siteNav) return;

  // Toggle mobile menu
  navToggle.addEventListener('click', handleNavToggle);

  // Close menu on link click
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  function handleNavToggle() {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  function closeNav() {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
})();

// ============ DYNAMIC FOOTER YEAR ============
(function updateFooterYear() {
  const year = document.querySelector('#year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();

// ============ PROJECT CARDS - GITHUB LINKS ============
(function addGitHubLinks() {
  const projectCards = document.querySelectorAll('.project-card .card-footer');

  projectCards.forEach((footer) => {
    // Check if link already exists
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

// ============ BACK TO TOP BUTTON ============
(function initBackToTop() {
  const backTopBtn = document.querySelector('.back-top');
  if (!backTopBtn) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Update visibility on scroll
  function updateBackTopVisibility() {
    const isVisible = window.scrollY > CONFIG.backTopVisibleAt;
    backTopBtn.classList.toggle('is-visible', isVisible);
  }

  // Scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  // Event listeners
  window.addEventListener('scroll', updateBackTopVisibility, { passive: true });
  backTopBtn.addEventListener('click', scrollToTop);

  // Initial check
  updateBackTopVisibility();
})();

// ============ SCROLL REVEAL ANIMATIONS ============
(function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Skip if reduced motion is preferred or IntersectionObserver not supported
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    return;
  }

  // Target elements for reveal animation
  const revealElements = document.querySelectorAll(
    '.feature-card, .card, .timeline-item, .case-study, .stack-group'
  );

  if (revealElements.length === 0) return;

  // Add reveal class to prepare for animation
  revealElements.forEach((el) => el.classList.add('reveal'));

  // Create intersection observer for reveal animations
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: CONFIG.scrollRevealThreshold,
      rootMargin: CONFIG.scrollRevealRootMargin,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
})();

// ============ ERROR HANDLING ============
(function setupErrorHandling() {
  // Global error handler for unhandled errors
  window.addEventListener('error', (event) => {
    console.error('Script error:', event.error);
    // Could send to error tracking service
  });

  // Handle promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Could send to error tracking service
  });
})();

// ============ PERFORMANCE MONITORING ============
(function monitorPerformance() {
  // Only log performance data if PerformanceObserver is supported
  if (!('PerformanceObserver' in window)) return;

  try {
    // Log Core Web Vitals-relevant metrics
    if ('web-vital' in window) {
      // Placeholder for web-vital library integration
    }
  } catch (e) {
    // Silently fail if monitoring isn't available
  }
})();

// ============ ACCESSIBILITY ENHANCEMENTS ============
(function enhanceAccessibility() {
  // Skip to main content link
  const skipLink = document.querySelector('.skip-to-main');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const main = document.querySelector('main');
      if (main) {
        main.focus();
        main.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Announce page changes for screen readers
  const pageTitle = document.title;
  const observer = new MutationObserver(() => {
    if (document.title !== pageTitle) {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.textContent = `Page changed to ${document.title}`;
      announcement.style.position = 'absolute';
      announcement.style.left = '-10000px';
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
    }
  });

  observer.observe(document.head, { childList: true });
})();

// ============ CLEANUP ON PAGE UNLOAD ============
(function setupCleanup() {
  window.addEventListener('beforeunload', () => {
    // Remove all event listeners (modern browsers handle this automatically)
    // This is a safety measure for older browsers
  });
})();

console.log('Portfolio loaded - Adnan Syukur');

