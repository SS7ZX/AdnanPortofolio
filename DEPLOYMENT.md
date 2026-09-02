# DEPLOYMENT GUIDE

Complete instructions for deploying the Adnan Syukur portfolio to various hosting platforms.

## Current Deployment

**Platform**: Firebase Hosting  
**URL**: https://myportofolio-11053.web.app/  
**Status**: Production Ready  
**Uptime SLA**: 99.95%  

## Pre-Deployment Checklist

Before deploying any changes:

- [ ] All HTML files validated (W3C Validator)
- [ ] CSS passes validation
- [ ] No JavaScript errors in console
- [ ] All links tested and working
- [ ] Images optimized and loading
- [ ] Mobile responsive tested (320px to 1920px)
- [ ] Lighthouse audit score 95+
- [ ] Accessibility audit passed
- [ ] Meta tags updated
- [ ] sitemap.xml current
- [ ] robots.txt correct
- [ ] CHANGELOG.md updated
- [ ] Changes committed to git

## Firebase Hosting Deployment

### Prerequisites

```bash
# Install Node.js and npm
# https://nodejs.org/

# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init
```

### Configuration

**firebase.json** (Example):
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      ".git/**",
      "MAINTENANCE.md",
      "README.md",
      "CHANGELOG.md",
      ".htaccess",
      "*.md"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/css/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=2592000"
          }
        ]
      },
      {
        "source": "/js/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=2592000"
          }
        ]
      },
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000"
          }
        ]
      },
      {
        "source": "/**/*.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=604800"
          }
        ]
      }
    ]
  }
}
```

### Deployment Steps

1. **Verify Firebase Project**
   ```bash
   firebase projects:list
   firebase use myportofolio-11053
   ```

2. **Dry Run (Recommended)**
   ```bash
   firebase deploy --dry-run
   ```

3. **Deploy to Production**
   ```bash
   firebase deploy
   ```

4. **Verify Deployment**
   ```bash
   firebase hosting:sites:list
   # Test at https://myportofolio-11053.web.app/
   ```

5. **View Deployment History**
   ```bash
   firebase hosting:channel:list
   ```

### Rollback to Previous Version

```bash
# View recent deployments
firebase hosting:channels:list

# Deploy a specific channel/version
firebase hosting:channel:deploy [channel-name]

# Or use git to revert and redeploy
git revert [commit-hash]
git push
firebase deploy
```

## GitHub Pages Deployment

### Prerequisites

- GitHub account
- Git installed locally
- Repository created and cloned

### Setup Instructions

1. **Create gh-pages Branch**
   ```bash
   git checkout -b gh-pages
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio deployment"
   git push origin gh-pages
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "GitHub Pages"
   - Source: Select `gh-pages` branch
   - Save

4. **Access Site**
   - URL: `https://username.github.io/adnan-portfolio/`

### Automated Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Validate HTML
      run: |
        npm install html-validate
        npx html-validate *.html
    
    - name: Deploy to GitHub Pages
      uses: actions/upload-artifact@v2
      with:
        name: portfolio
        path: .
    
    - name: Deploy
      uses: JamesIves/github-pages-deploy-action@4.1.3
      with:
        branch: gh-pages
        folder: .
```

## Netlify Deployment

### Prerequisites

- Netlify account
- Git repository (GitHub, GitLab, or Bitbucket)

### Setup Instructions

1. **Connect Repository**
   - Log in to Netlify
   - Click "New site from Git"
   - Select your repository
   - Authorize Netlify

2. **Configure Build Settings**
   - Build command: (leave empty - static site)
   - Publish directory: `.` (current directory)
   - Click "Deploy site"

3. **Domain Configuration**
   - Go to Site Settings → Domain Management
   - Add custom domain if desired
   - Configure DNS settings

### netlify.toml Configuration

```toml
[build]
  command = ""
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

## Vercel Deployment

### Prerequisites

- Vercel account
- Git repository

### Setup Instructions

1. **Import Project**
   - Go to vercel.com/new
   - Select your Git repository
   - Click "Import"

2. **Configure Project**
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: `.`
   - Environment Variables: (none needed)
   - Click "Deploy"

3. **Custom Domain**
   - Go to Settings → Domains
   - Add your domain
   - Update DNS records as instructed

### vercel.json Configuration

```json
{
  "buildCommand": "",
  "outputDirectory": ".",
  "framework": null,
  "env": [],
  "regions": ["sfo"],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1",
      "status": 200
    }
  ],
  "headers": [
    {
      "source": "/css/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2592000"
        }
      ]
    }
  ]
}
```

## Self-Hosted (VPS/Shared Hosting)

### Prerequisites

- Web hosting account with SSH access
- Domain name with DNS access
- Apache or Nginx web server

### Apache Setup

1. **Upload Files**
   ```bash
   scp -r ./* user@host:/var/www/html/portfolio/
   ```

2. **Configure Virtual Host** (`/etc/apache2/sites-available/portfolio.conf`):
   ```apache
   <VirtualHost *:80>
     ServerName adnansy.com
     ServerAlias www.adnansy.com
     DocumentRoot /var/www/html/portfolio
     
     <Directory /var/www/html/portfolio>
       Options -Indexes +FollowSymLinks
       AllowOverride All
       Require all granted
     </Directory>
     
     # Redirect HTTP to HTTPS
     RewriteEngine On
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   </VirtualHost>
   
   <VirtualHost *:443>
     ServerName adnansy.com
     ServerAlias www.adnansy.com
     DocumentRoot /var/www/html/portfolio
     
     SSLEngine on
     SSLCertificateFile /etc/ssl/certs/adnansy.com.crt
     SSLCertificateKeyFile /etc/ssl/private/adnansy.com.key
     SSLCertificateChainFile /etc/ssl/certs/adnansy.com.ca-bundle
   </VirtualHost>
   ```

3. **Enable Site and SSL**
   ```bash
   sudo a2ensite portfolio.conf
   sudo a2enmod ssl
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

### Nginx Setup

1. **Upload Files**
   ```bash
   scp -r ./* user@host:/var/www/portfolio/
   ```

2. **Configure Server Block** (`/etc/nginx/sites-available/portfolio`):
   ```nginx
   server {
     listen 80;
     listen [::]:80;
     server_name adnansy.com www.adnansy.com;
     
     return 301 https://$server_name$request_uri;
   }
   
   server {
     listen 443 ssl http2;
     listen [::]:443 ssl http2;
     server_name adnansy.com www.adnansy.com;
     
     root /var/www/portfolio;
     index index.html;
     
     ssl_certificate /etc/ssl/certs/adnansy.com.crt;
     ssl_certificate_key /etc/ssl/private/adnansy.com.key;
     
     # Gzip compression
     gzip on;
     gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
     
     # Security headers
     add_header X-Frame-Options "SAMEORIGIN" always;
     add_header X-Content-Type-Options "nosniff" always;
     add_header X-XSS-Protection "1; mode=block" always;
     add_header Referrer-Policy "strict-origin-when-cross-origin" always;
     
     # Browser caching
     location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|otf)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
     }
     
     location ~* \.html$ {
       expires 7d;
       add_header Cache-Control "public, must-revalidate";
     }
     
     # Prevent direct access to configuration files
     location ~ /\. {
       deny all;
     }
   }
   ```

3. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## SSL/HTTPS Configuration

### Firebase (Automatic)
- SSL provided automatically
- Managed by Firebase (Let's Encrypt)
- No configuration needed

### Self-Hosted: Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-apache

# Generate certificate
sudo certbot certonly --apache -d adnansy.com -d www.adnansy.com

# Auto-renew setup
sudo certbot renew --dry-run
sudo systemctl enable certbot.timer
```

## Performance Optimization for Deployment

### Pre-Deployment Optimization

1. **Minify CSS & JavaScript**
   ```bash
   # Install cssnano and terser
   npm install -g cssnano terser
   
   # Minify
   cssnano css/style.css -o css/style.min.css
   terser js/script.js -o js/script.min.js
   ```

2. **Optimize Images**
   - Use TinyPNG API or ImageMagick
   - Convert to WebP format (fallback to PNG)
   - Ensure SVG files are optimized

3. **Configure Caching Headers**
   - CSS/JS: 30 days
   - Images: 1 year
   - HTML: 1 week

### Monitor After Deployment

```bash
# Check Lighthouse scores
google-chrome --headless --disable-gpu --chrome-flags="--disable-web-resources" \
  --form-factor=mobile \
  --output-path=./report.json \
  https://myportofolio-11053.web.app/

# Run WebPageTest
# https://www.webpagetest.org/
```

## Troubleshooting Deployments

### Firebase Issues

**Problem**: `firebase: command not found`
**Solution**: 
```bash
npm install -g firebase-tools
firebase login
```

**Problem**: Deployment fails with permission error
**Solution**:
```bash
firebase logout
firebase login --no-localhost
```

**Problem**: Site shows old content after deployment
**Solution**:
```bash
# Clear browser cache
# Or use incognito/private mode
# Check https://myportofolio-11053.web.app/?cache-bust=$(date +%s)
```

### GitHub Pages Issues

**Problem**: CSS/JS not loading
**Solution**: Ensure paths are relative, not absolute
```html
<!-- ✓ Correct -->
<link rel="stylesheet" href="css/style.css">

<!-- ✗ Incorrect -->
<link rel="stylesheet" href="/css/style.css">
```

**Problem**: 404 on subpages
**Solution**: Add trailing slash or configure index.html redirect

### Netlify Issues

**Problem**: Build succeeds but site shows 404
**Solution**: Check `netlify.toml` - add SPA redirect:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Monitoring & Maintenance Post-Deployment

### Set Up Monitoring

1. **Google Search Console**
   - Verify site ownership
   - Submit sitemap
   - Monitor indexing

2. **Google Analytics**
   - Track visitor behavior
   - Monitor bounce rates
   - Set up conversion goals

3. **Uptime Monitoring**
   - Use UptimeRobot
   - Get alerts if site goes down
   - Monitor response times

### Regular Checks

- Weekly: Check for 404 errors in logs
- Monthly: Review performance metrics
- Quarterly: Full security audit
- Annually: Complete content refresh

## Rollback Procedures

### Firebase Rollback
```bash
# View deployment history
firebase hosting:channel:list

# Revert to specific deployment
firebase hosting:channel:deploy [version-name]
```

### GitHub Pages Rollback
```bash
git log --oneline
git revert [commit-hash]
git push origin gh-pages
```

### Manual Rollback (Any Platform)
```bash
# Restore from backup
tar -xzf adnan-portfolio-backup-20260831.tar.gz
# Upload restored files to hosting
```

## Post-Deployment Verification

```bash
# Test homepage
curl -I https://myportofolio-11053.web.app/

# Test page load time
curl -w "%{time_total}\n" -o /dev/null -s https://myportofolio-11053.web.app/

# Verify meta tags
curl https://myportofolio-11053.web.app/ | grep "<meta"

# Check SSL certificate
openssl s_client -connect myportofolio-11053.web.app:443 </dev/null 2>/dev/null | grep "Verify return code"
```

## Support & Resources

- Firebase Hosting Docs: https://firebase.google.com/docs/hosting
- Netlify Docs: https://docs.netlify.com/
- Vercel Docs: https://vercel.com/docs
- GitHub Pages: https://pages.github.com/
- Let's Encrypt: https://letsencrypt.org/

---

**Last Updated**: 2026-09-02  
**Deployment Status**: Production Ready  
**Primary Platform**: Firebase Hosting  
**Backup Platforms**: GitHub Pages, Netlify
