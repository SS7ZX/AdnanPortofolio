# Changelog

All notable changes to the Adnan Syukur portfolio are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-09-07

### Added
- **Dark mode**: theme toggle in the header with `localStorage` persistence, system-preference detection, and a flash-free inline init script; `theme-color` meta updates per theme
- **Animated stats band** on the homepage (shipped projects, certifications, VAPT award, years building) with scroll-triggered counting
- **Marquee ticker strip** on the homepage listing disciplines and focus areas
- **Proficiency matrix** on the About page: 16 animated skill bars calibrated to depth of shipped work (Advanced / Working / Learning)
- **Chapter navigation**: fixed on-page rail built automatically from section labels, with scroll-spy highlighting (desktop only)
- **Custom cursor**: pointer-following dot + trailing ring with hover states (fine pointers, reduced-motion aware, hidden on touch)
- **Fonts actually load now**: Google Fonts stylesheet (Fraunces, Inter, IBM Plex Mono) was referenced by the CSS but never linked; preconnect existed without the stylesheet
- **`assets/favicon.svg`**: the brand mark was referenced by every page but the file did not exist; created in the case-file style
- **Staged page-load entrances** for hero and page-hero content, plus View Transition API page transitions with a slide/fade animation
- **Upgraded footer**: brand block, site links, social/profiles, contact info, availability chip, and colophon
- **Header scrolled state**: subtle shadow once the page scrolls past the top
- **Grain texture overlay** for paper depth (pointer-safe, no-JS safe)
- **Reading progress marker** restyled as a gradient bar

### Changed
- `css/style.css` fully rewritten from six stacked "final art direction" blocks into a single coherent token-driven stylesheet (light + dark palettes, no duplicate palettes)
- `js/script.js` rewritten into a single IIFE with discrete modules; every feature degrades gracefully (no JS, no IntersectionObserver, reduced motion)
- Contact panel, buttons, status chips, and nav CTA now use `--on-ink` / `--on-accent` contrast tokens so every surface stays WCAG AA in both themes
- Footer on all seven pages replaced with a comprehensive grid layout
- 404/500 error pages share the new header, theme toggle, and footer
- CV page: removed stray comment, added favicon link

### Fixed
- Broken favicon reference on every page (file missing)
- Fonts silently falling back to system stacks (stylesheets were never linked)
- Hero-frame entrance animation could have overridden the pointer-tilt transform; frame now enters via the page fade instead

## [2.0.0] - 2026-09-02

### Added
- Comprehensive README.md with project structure and technical details
- Changelog documentation
- robots.txt for SEO optimization
- sitemap.xml for search engine indexing
- .htaccess with security headers and compression
- Performance optimization documentation
- Accessibility audit trail
- JavaScript error handling and event cleanup
- LazyLoad support for future images
- Detailed CSS variable documentation
- Analytics-ready structure
- Open Graph meta tags for social sharing
- Twitter Card meta tags
- Theme color meta tag for browser UI

### Changed
- Enhanced JavaScript with better error handling
- Improved CSS organization and documentation
- Updated meta descriptions for each page
- Refined responsive breakpoints
- Enhanced mobile navigation accessibility
- Better focus management in keyboard navigation
- Improved form accessibility on contact page
- Updated timeline styling for clarity

### Fixed
- Removed unused CSS classes
- Fixed potential memory leaks in event listeners
- Improved mobile menu z-index stacking
- Enhanced color contrast ratios for WCAG AA
- Fixed timeline alignment on mobile
- Corrected form label associations
- Fixed nested heading hierarchy

### Security
- Added security headers configuration
- Implemented Content Security Policy guidelines
- Removed inline event handlers
- Added noopener/noreferrer to external links
- Protected against common vulnerabilities

### Performance
- Optimized CSS (13KB minified)
- Minified JavaScript (3.2KB)
- Implemented lazy loading structure
- Added resource hints (preload, prefetch)
- Reduced animations for low-end devices
- Optimized font loading strategy

## [1.5.0] - 2026-08-15

### Added
- Mobile hamburger menu animation
- Scroll-to-top button with smooth behavior
- Reveal animations for cards using IntersectionObserver
- Support for prefers-reduced-motion

### Changed
- Enhanced responsive typography with clamp()
- Improved grid layouts for various screen sizes
- Better spacing consistency across sections
- Refined button hover states

## [1.0.0] - 2026-07-01

### Initial Release
- Basic portfolio structure
- 5 main pages (Home, About, Experience, Work, Contact)
- Responsive design
- Navigation system
- Project showcase
- Contact information
- Professional styling

---

## Versioning Strategy

**Major** (X.y.z): Breaking changes, significant redesign  
**Minor** (x.Y.z): New features, enhancements  
**Patch** (x.y.Z): Bug fixes, minor improvements  

## Maintenance Schedule

- **Security patches**: As needed, same day
- **Performance updates**: Quarterly
- **Content updates**: Weekly (projects, learning log)
- **Major redesign**: Annually or as needed

## Known Issues

None currently documented. Please report issues to adnannsyukurr@gmail.com

## Future Roadmap

### Q4 2026
- Dark mode toggle
- Blog section
- Enhanced case studies

### Q1 2027
- Video testimonials
- Interactive skill matrix
- Advanced analytics

### Q2 2027
- Mobile app
- API integration
- Real-time project updates
