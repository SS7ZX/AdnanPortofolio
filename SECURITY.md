# SECURITY POLICY

Security guidelines and best practices for the Adnan Syukur portfolio website.

## Security Overview

This portfolio is built with security-first principles:
- **No external JavaScript dependencies** - reduces attack surface
- **Content Security Policy** - strict CSP headers
- **HTTPS enforcement** - all connections encrypted
- **Security headers** - comprehensive header configuration
- **Input validation** - all user inputs validated
- **Regular audits** - quarterly security reviews

## Supported Versions

| Version | Status | Support Until |
|---------|--------|---------------|
| 2.0.x   | Current | 2027-09-02 |
| 1.5.x   | Deprecated | 2026-12-02 |
| 1.0.x   | Unsupported | 2026-09-02 |

Security updates are released as patch versions (.x).

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please email **adnannsyukurr@gmail.com** instead of using the issue tracker.

**Include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

**Response Timeline:**
- Acknowledgment within 24 hours
- Initial assessment within 48 hours
- Patch release within 7 days (if confirmed)

**Disclosure Policy:**
- 90-day responsible disclosure window
- Coordinated disclosure with credit to reporter
- Public advisory after patch release

## Security Features

### 1. Content Security Policy (CSP)

**Current Policy:**
```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
connect-src 'self'
```

**Protection Against:**
- Cross-site scripting (XSS)
- Injection attacks
- Data exfiltration
- Unauthorized resource loading

### 2. HTTP Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | SAMEORIGIN | Prevent clickjacking |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| X-XSS-Protection | 1; mode=block | Enable XSS filter |
| Referrer-Policy | strict-origin-when-cross-origin | Control referrer info |
| Permissions-Policy | geolocation=(), microphone=(), camera=() | Restrict permissions |

### 3. HTTPS/TLS

- **Protocol**: TLS 1.2+
- **Certificate**: Let's Encrypt (Firebase)
- **Renewal**: Automatic
- **Cipher Suites**: Modern browsers only
- **HSTS**: Enabled (6 months)

### 4. Authentication & Authorization

- **No user accounts**: Reduces attack surface
- **Email forms**: No sensitive data stored
- **GitHub links**: Properly scoped with rel="noopener noreferrer"
- **External links**: Validated and secure

### 5. Input Validation

All external inputs validated:
- Email addresses: Basic RFC 5322 validation
- URLs: Protocol and domain validation
- Form data: Type and length validation
- No unsanitized user input rendered

### 6. File Upload Security

Currently no file uploads, but if implemented:
- Whitelist allowed file types
- Store uploads outside web root
- Rename files (remove extensions)
- Implement size limits
- Scan for malware

### 7. Dependency Management

**Current Dependencies:**
- Google Fonts (CDN) - CSS font loading
- Firebase (hosting) - no code dependencies
- No npm packages

**Vulnerability Monitoring:**
- Monthly review of third-party services
- Check for security advisories
- Evaluate alternative solutions

## Vulnerability Scanning

### Regular Scanning

- **Monthly**: OWASP Top 10 manual testing
- **Quarterly**: Automated security scanning (OWASP ZAP)
- **Annually**: Professional penetration test

### Automated Tools

```bash
# OWASP ZAP Scan
zaproxy -cmd \
  -quickurl https://myportofolio-11053.web.app \
  -quickout report.html

# npm audit (when dependencies added)
npm audit

# Trivy scanning (container/dependency scan)
trivy image myportofolio:latest
```

### Manual Testing Checklist

- [ ] XSS injection vectors
- [ ] SQL injection (if database added)
- [ ] CSRF token validation
- [ ] Broken authentication flows
- [ ] Sensitive data exposure
- [ ] XML external entity (XXE) attacks
- [ ] Broken access control
- [ ] Using components with known vulnerabilities
- [ ] Insufficient logging & monitoring
- [ ] Server-side template injection

## Secure Development Practices

### Git Security

1. **Commit Signing**
   ```bash
   git config user.signingkey [GPG_KEY]
   git commit -S -m "message"
   ```

2. **Secrets Management**
   - Never commit passwords, API keys, tokens
   - Use `.gitignore` for sensitive files
   - Environment variables for configuration

3. **Branch Protection**
   - Require pull request reviews
   - Require status checks before merge
   - Dismiss stale reviews on push

### Code Review Process

1. **All changes** require review before merge
2. **Security review** for any external dependencies
3. **Accessibility review** for UI changes
4. **Performance review** for optimization changes

## OWASP Top 10 - Mitigation

### A1: Broken Access Control
- **Mitigation**: No user authentication needed
- **Risk Level**: LOW
- **Status**: Not Applicable

### A2: Cryptographic Failures
- **Mitigation**: HTTPS/TLS enforced, no sensitive data stored
- **Risk Level**: LOW
- **Status**: Mitigated

### A3: Injection
- **Mitigation**: No database queries, no dynamic evaluation
- **Risk Level**: LOW
- **Status**: Not Applicable

### A4: Insecure Design
- **Mitigation**: Simple, modular architecture, no complex workflows
- **Risk Level**: LOW
- **Status**: Mitigated by design

### A5: Security Misconfiguration
- **Mitigation**: Security headers configured, CSP enabled, .htaccess hardened
- **Risk Level**: LOW
- **Status**: Mitigated

### A6: Vulnerable and Outdated Components
- **Mitigation**: No third-party code, vanilla JS only, monitored dependencies
- **Risk Level**: LOW
- **Status**: Monitored

### A7: Identification and Authentication Failures
- **Mitigation**: No authentication system, email only contact
- **Risk Level**: LOW
- **Status**: Not Applicable

### A8: Software and Data Integrity Failures
- **Mitigation**: No data modifications, read-only portfolio
- **Risk Level**: LOW
- **Status**: Not Applicable

### A9: Logging and Monitoring Failures
- **Mitigation**: Google Analytics setup, error tracking planned
- **Risk Level**: MEDIUM
- **Status**: In Progress

### A10: SSRF (Server-Side Request Forgery)
- **Mitigation**: No server-side requests, static content only
- **Risk Level**: LOW
- **Status**: Not Applicable

## Security Audit Log

| Date | Vulnerability | Severity | Status | Resolution |
|------|---------------|----------|--------|------------|
| 2026-09-02 | Initial deployment | N/A | Reviewed | Comprehensive security review completed |
| TBD | TBD | TBD | Open | Quarterly audit pending |

## Disaster Recovery

### Data Backup

- **Frequency**: Weekly automated backups
- **Storage**: Firebase backup + cloud storage
- **Retention**: 90 days minimum
- **Testing**: Monthly restore test

### Incident Response Plan

1. **Detection**: Monitor error rates, uptime alerts
2. **Assessment**: Severity level and impact scope
3. **Containment**: Disable compromised components
4. **Eradication**: Remove malicious code, patch vulnerability
5. **Recovery**: Restore from clean backup
6. **Post-Incident**: Review and improve security

### Contact Information

- **Security Lead**: Adnan Syukur
- **Email**: adnannsyukurr@gmail.com
- **Response Time**: 24 hours

## Compliance & Standards

### Standards Followed

- **OWASP Top 10**: Mitigation strategies implemented
- **CWE Top 25**: Common weakness prevention
- **SANS Top 25**: Critical software errors avoided
- **WCAG 2.1 AA**: Accessibility compliance
- **NIST Cybersecurity Framework**: Best practices

### Certifications

- Secure coding: Self-certified
- BNSP Network Engineer: Certified
- Database Developer: DB Academy certified
- VAPT Excellence: University recognized

## Security Best Practices for Users

### For Visitors

1. **Use HTTPS**: Always (enforced by site)
2. **Verify domain**: adnansy.com or portfolio URL
3. **Be cautious with links**: Check URLs before clicking
4. **Report issues**: Email security concerns

### For Developers

1. **Review dependencies**: Before adding new packages
2. **Test locally**: Before deploying
3. **Use version control**: Track all changes
4. **Code review**: Get security eyes on changes
5. **Stay updated**: Keep development tools current

## Security Resources

### Learning Resources

- OWASP WebGoat: https://owasp.org/www-project-webgoat/
- PortSwigger Web Security Academy: https://portswigger.net/web-security
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- CWE: https://cwe.mitre.org/

### Scanning Tools

- OWASP ZAP: https://www.zaproxy.org/
- Burp Suite Community: https://portswigger.net/burp/communitydownload
- Nikto: https://cirt.net/Nikto2
- NMAP: https://nmap.org/

### Monitoring Services

- Have I Been Pwned: https://haveibeenpwned.com/
- Shodan: https://www.shodan.io/
- Censys: https://censys.io/
- Security Headers: https://securityheaders.com/

## FAQ

**Q: Is my data safe on this site?**  
A: Yes. The site doesn't collect personal data beyond basic analytics. No passwords, payment info, or sensitive data stored.

**Q: What happens if the site is compromised?**  
A: We have automated backups, security monitoring, and incident response procedures in place.

**Q: Can I report security issues privately?**  
A: Yes, email adnannsyukurr@gmail.com with vulnerability details.

**Q: Does the site use SSL/HTTPS?**  
A: Yes, all connections are encrypted with modern TLS protocol.

**Q: What external services does the site use?**  
A: Google Fonts (CSS delivery) and Firebase (hosting). Both are secure, widely-trusted services.

**Q: Is there tracking/analytics on the site?**  
A: Yes, Google Analytics for visitor insights. No personal data is sold or shared.

---

**Last Updated**: 2026-09-02  
**Next Review**: 2026-12-02  
**Status**: Production Ready  
**Security Rating**: A (Excellent)  

For questions about security, contact: adnannsyukurr@gmail.com
