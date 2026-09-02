# MAINTENANCE GUIDE

This document outlines the maintenance schedule and procedures for keeping the Adnan Syukur portfolio current, secure, and optimized.

## Maintenance Schedule

### Weekly
- [ ] Check email for inquiries (adnannsyukurr@gmail.com)
- [ ] Update project status in work.html if needed
- [ ] Update learning log in contact.html
- [ ] Verify all external links are working

### Monthly
- [ ] Audit accessibility with axe DevTools
- [ ] Review Lighthouse scores (target: 95+)
- [ ] Check for CSS/JS compatibility issues
- [ ] Test on multiple devices and browsers
- [ ] Review Google Search Console for errors
- [ ] Check for broken images or resources

### Quarterly
- [ ] Update CV (Adnan-Syukur-CV.pdf and Adnan-Syukur-CV.html)
- [ ] Review and update "About" page
- [ ] Add new projects to portfolio
- [ ] Update case studies with latest insights
- [ ] Test form functionality and email delivery
- [ ] Review analytics for trends
- [ ] Update dependencies and libraries

### Annually
- [ ] Major content review and refresh
- [ ] Evaluate design against current trends
- [ ] Update GitHub links and social media
- [ ] Security audit and penetration test
- [ ] Performance optimization pass
- [ ] Plan future features
- [ ] Create annual backup

## Content Updates

### Adding a New Project

1. **Update work.html**
   - Add new card in Featured Projects grid
   - Include project name, description, status, and tech stack
   - Add appropriate status badge (Shipped, In Progress, etc.)

2. **Add GitHub Links**
   - Verify GitHub repository exists
   - Update href in card-link (script.js handles this automatically)

3. **Create Case Study (Optional)**
   - Add detailed breakdown after featured projects
   - Include architecture diagrams or code samples
   - Explain key decisions and learnings

4. **Update README.md**
   - Add project to list of featured works
   - Update project count if applicable

5. **Update CHANGELOG.md**
   - Document new project addition
   - Note any related changes

### Updating Skills & Competencies

1. **Edit about.html - Core Competencies Section**
   - Update card descriptions
   - Adjust depth levels (High, Working, Growing, New)
   - Add new skill cards as needed

2. **Update Continuous Learning Log (contact.html)**
   - Move completed items from "In Progress" to "Completed"
   - Add new learning items
   - Update timestamps

### Updating Experience

1. **Edit experience.html - Timeline Section**
   - Add new internships or roles at the top
   - Keep existing entries for historical record
   - Update dates and organization info

2. **Update Certifications Table**
   - Add new credentials as obtained
   - Verify issuer and credential details

## Security Updates

### Monthly Security Checklist
- [ ] Check for security advisories in JavaScript libraries
- [ ] Review .htaccess for any updates
- [ ] Verify HTTPS is enforced on production
- [ ] Check Content Security Policy headers
- [ ] Review external script dependencies

### SSL Certificate
- Hosted on Firebase - automatically managed
- Verify SSL status at: https://www.sslshopper.com/ssl-checker.html
- Check certificate expiry in 30 days before renewal

### Dependency Monitoring
- No npm dependencies (vanilla JS)
- Monitor Google Fonts for security updates
- Track any third-party service changes

## Performance Optimization

### CSS & JavaScript
1. Keep total bundle under 20KB (currently ~16.2KB)
2. Test minification: run through minifiers before production
3. Profile animations with Chrome DevTools
4. Audit font loading strategy quarterly

### Images & Assets
1. Compress new images with TinyPNG or similar
2. Test favicon across all devices
3. Monitor favicon.svg file size
4. Use WebP format for modern browsers (future enhancement)

### Page Speed
- Target Lighthouse scores:
  - Performance: 95+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 95+

Test with:
- Google PageSpeed Insights
- WebPageTest
- Lighthouse CLI

## Backup Procedures

### Local Backup
```bash
# Create weekly backup
cp -r adnan-portfolio/ adnan-portfolio-backup-$(date +%Y%m%d).zip
```

### Production Backup
- Firebase automatic backups (check Firebase Console)
- Export files weekly to local drive
- Store copies in cloud (Google Drive, Dropbox)

### Version Control
```bash
git commit -m "Content update: [description]"
git push origin main
git tag -a v2.0.1 -m "Maintenance release"
git push origin --tags
```

## Analytics & Monitoring

### Google Analytics Setup
- [ ] Install Google Analytics tracking
- [ ] Monitor page views by page
- [ ] Track conversion events (email clicks, external links)
- [ ] Set up goals for contact attempts

### Google Search Console
- [ ] Verify site ownership
- [ ] Submit sitemap.xml
- [ ] Monitor search performance
- [ ] Check for indexing issues
- [ ] Review Core Web Vitals

### Performance Monitoring
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Monitor 404 errors
- [ ] Track JavaScript errors
- [ ] Monitor API availability

## Deployment Procedures

### Firebase Deployment
```bash
# Prerequisites
firebase login
firebase projects:list

# Deploy
firebase deploy

# Verify
firebase hosting:channel:list
```

### Pre-Deployment Checklist
- [ ] All links working
- [ ] No console errors
- [ ] Mobile responsive tested
- [ ] Forms functional
- [ ] Images loading
- [ ] CSS/JS minified
- [ ] Meta tags updated
- [ ] Lighthouse scores acceptable

### Rollback Procedure
```bash
# View deployment history
firebase hosting:channel:list

# Revert to previous version
firebase hosting:clone [source-version] [target-version]
```

## SEO Maintenance

### Monthly SEO Tasks
- [ ] Check Google Search Console
- [ ] Verify meta descriptions are unique
- [ ] Check for 404 errors
- [ ] Monitor keyword rankings
- [ ] Verify sitemap.xml is current
- [ ] Check robots.txt compliance

### Content Optimization
- [ ] Use descriptive page titles
- [ ] Write compelling meta descriptions (160 chars)
- [ ] Ensure proper heading hierarchy
- [ ] Add alt text to images
- [ ] Use semantic HTML
- [ ] Internal linking strategy

## Browser Compatibility Testing

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

### Testing Tools
- BrowserStack (paid)
- Chrome DevTools device emulation
- Firefox Responsive Design Mode
- Safari Responsive Design Mode

## Common Issues & Solutions

### Issue: CSS Not Loading on HTTPS
**Solution**: Update <link> tags to use protocol-relative URLs
```html
<!-- Before -->
<link rel="stylesheet" href="http://example.com/style.css">

<!-- After -->
<link rel="stylesheet" href="/css/style.css">
```

### Issue: Images Not Displaying
**Solution**: Verify image paths are relative or absolute
```html
<!-- Correct: Relative path -->
<img src="assets/favicon.svg" alt="Logo">

<!-- Avoid: Absolute paths -->
<img src="/assets/favicon.svg" alt="Logo">
```

### Issue: Mobile Menu Not Working
**Solution**: Check JavaScript console for errors
1. Verify .nav-toggle element exists
2. Check .site-nav has is-open class handling
3. Test on different mobile devices

### Issue: Slow Page Load
**Solution**: 
1. Check file sizes with DevTools
2. Enable gzip compression (.htaccess)
3. Enable browser caching headers
4. Optimize images with TinyPNG
5. Review Google PageSpeed Insights

## Contact Updates

### Email Changes
- Update all email addresses in HTML files
- Update footer and contact page
- Test email links before deploying
- Ensure email client forwards all inquiries

### Social Media Links
- LinkedIn: linkedin.com/in/adnansyukurs/
- GitHub: github.com/SS7ZX
- Update URLs if handles change

## Documentation

### Keeping Docs Current
- [ ] Update README.md quarterly
- [ ] Add entries to CHANGELOG.md for all changes
- [ ] Document any new features in comments
- [ ] Keep this MAINTENANCE.md updated
- [ ] Archive old changelogs if needed

### Code Comments
- Add comments for complex logic
- Document any workarounds or hacks
- Explain why not just what
- Link to related issues/PRs

## Accessibility Maintenance

### Quarterly Accessibility Audit
Use these tools:
- axe DevTools (browser extension)
- WAVE (web.bama.ua.edu/Webtools/wave)
- Lighthouse DevTools (built into Chrome)
- Keyboard navigation testing

### Common Accessibility Issues
- Missing alt text on images
- Poor color contrast (test with Contrast Checker)
- Keyboard navigation not working
- Missing ARIA labels
- Focus indicators not visible

### Testing Checklist
- [ ] Tab through entire site with keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast ratios (4.5:1 minimum)
- [ ] Test with browser zoom (200%)
- [ ] Disable CSS and verify readable

## Performance Profiling

### Chrome DevTools Profiling
1. Open DevTools (F12)
2. Go to Performance tab
3. Click record, interact with site
4. Stop recording and analyze
5. Look for long tasks and jank

### Lighthouse Audit
1. Open DevTools
2. Go to Lighthouse tab
3. Run audit (select devices/categories)
4. Review recommendations
5. Implement high-priority fixes

### WebPageTest Analysis
1. Visit webpagetest.org
2. Enter portfolio URL
3. Run test from different locations
4. Compare results with historical data
5. Identify bottlenecks

## Renewal Dates & Expiries

| Item | Renewal Date | Notes |
|------|--------------|-------|
| SSL Certificate | Auto (Firebase) | Check quarterly |
| Domain Registration | Annually | Set calendar reminder |
| Firebase Hosting | Ongoing | Free tier sufficient |
| Google Analytics | Continuously | Review quarterly |

## Emergency Procedures

### Site Down/Inaccessible
1. Check Firebase status
2. Verify domain DNS settings
3. Check browser cache issues
4. Test with different browser
5. Review Firebase logs
6. Redeploy if necessary

### Hacked/Defaced
1. Change Firebase password immediately
2. Check deployment history
3. Review .htaccess for modifications
4. Restore from backup
5. Re-scan with malware scanner
6. Update all credentials

### Data Loss
1. Restore from latest backup
2. Verify backup completeness
3. Redeploy to production
4. Test all functionality
5. Update git history if needed

## Contact for Support

For technical issues, documentation updates, or maintenance requests:
- Email: adnannsyukurr@gmail.com
- Response time: Within 48 hours

---

**Last Updated**: 2026-09-02  
**Maintained By**: Adnan Syukur  
**Next Review**: 2026-10-02
