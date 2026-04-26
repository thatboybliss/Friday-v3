# FridayAI Deployment Guide

This guide provides comprehensive instructions for deploying FridayAI to production environments.

## Pre-Deployment Checklist

Before deploying, ensure all items are completed:

- [x] All code files assembled in Friday-v3 repository
- [x] Tests passing (8/8 unit tests)
- [x] TypeScript compilation successful (0 errors)
- [x] ESLint passing (1 minor warning - non-blocking)
- [x] Code review completed
- [ ] Environment variables configured
- [ ] API keys obtained and secured
- [ ] Database migrations prepared
- [ ] SSL certificates obtained
- [ ] Monitoring and logging configured
- [ ] Backup strategy defined

## Environment Setup

### Required API Keys

The following API keys must be obtained and configured:

**Google Gemini API:**
- Purpose: Live audio interaction and AI responses
- Obtain from: https://ai.google.dev/
- Environment variable: `GEMINI_API_KEY`

**Anthropic Claude API:**
- Purpose: Emotion detection from speech
- Obtain from: https://www.anthropic.com/
- Environment variable: `ANTHROPIC_API_KEY`

### Environment Variables

Create a `.env` file in the mobile-app directory:

```bash
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Anthropic Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Database (if using backend)
DATABASE_URL=postgresql://user:password@host:5432/fridayai

# Server Configuration
NODE_ENV=production
PORT=3000
```

**Security Note:** Never commit `.env` files to version control. Use environment variable management services in your deployment platform.

## Mobile App Deployment

### Prerequisites

- Node.js 18+ and pnpm installed
- Expo CLI installed globally
- EAS CLI installed globally
- Apple Developer Account (for iOS)
- Google Play Developer Account (for Android)

### Step 1: Prepare the Build

```bash
cd mobile-app

# Install dependencies
pnpm install

# Run tests
pnpm test

# Type check
pnpm check

# Lint code
pnpm lint
```

### Step 2: Build for iOS

```bash
# Build for iOS
eas build --platform ios

# This will:
# - Compile the app for iOS
# - Sign with development or production certificate
# - Create an .ipa file
# - Upload to EAS servers

# Monitor build progress at https://expo.dev/builds
```

### Step 3: Build for Android

```bash
# Build for Android
eas build --platform android

# This will:
# - Compile the app for Android
# - Create an APK or AAB file
# - Upload to EAS servers

# Monitor build progress at https://expo.dev/builds
```

### Step 4: Submit to App Stores

**iOS App Store:**

```bash
# Requires Apple Developer Account
# Use Xcode or Transporter to submit

# Steps:
# 1. Download .ipa from EAS
# 2. Open in Xcode or Transporter
# 3. Sign with production certificate
# 4. Submit to App Store Connect
# 5. Fill in app details, screenshots, description
# 6. Submit for review
```

**Google Play Store:**

```bash
# Requires Google Play Developer Account
# Use Google Play Console to submit

# Steps:
# 1. Download AAB from EAS
# 2. Upload to Google Play Console
# 3. Fill in app details, screenshots, description
# 4. Configure pricing and distribution
# 5. Submit for review
```

### Step 5: Post-Launch Monitoring

```bash
# Monitor app performance
# - Check crash reports
# - Monitor user feedback
# - Track performance metrics
# - Monitor API usage
```

## Website Deployment

### Option 1: GitHub Pages (Free)

```bash
cd website

# Ensure all files are committed
git add .
git commit -m "Deploy website to GitHub Pages"
git push origin main

# GitHub Pages will automatically deploy from the main branch
# Access at: https://thatboybliss.github.io/Friday-v3/website/
```

### Option 2: Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd website
netlify deploy --prod --dir .

# This will:
# - Upload files to Netlify
# - Configure CDN
# - Enable HTTPS
# - Set up automatic deployments
```

### Option 3: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd website
vercel --prod

# This will:
# - Upload files to Vercel
# - Configure CDN
# - Enable HTTPS
# - Set up automatic deployments
```

### Option 4: AWS S3 + CloudFront

```bash
# Create S3 bucket
aws s3 mb s3://fridayai-website

# Upload files
cd website
aws s3 sync . s3://fridayai-website --delete

# Create CloudFront distribution
# - Origin: S3 bucket
# - CNAME: your-domain.com
# - SSL certificate: ACM

# Update DNS to point to CloudFront
```

## Database Setup

If using the backend with PostgreSQL:

```bash
# Create database
createdb fridayai

# Run migrations
cd mobile-app
pnpm db:push

# This will:
# - Create tables
# - Set up indexes
# - Configure constraints
```

## SSL/HTTPS Configuration

### For Website

Most hosting platforms (Netlify, Vercel, GitHub Pages) provide free SSL certificates automatically.

### For Mobile App Backend

```bash
# Using Let's Encrypt
certbot certonly --standalone -d your-domain.com

# Configure in Express server
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/path/to/private.key'),
  cert: fs.readFileSync('/path/to/certificate.crt')
};

https.createServer(options, app).listen(443);
```

## Monitoring & Logging

### Application Monitoring

Set up monitoring for the mobile app backend:

```bash
# Option 1: Sentry (Error Tracking)
npm install @sentry/node
# Configure in server/_core/index.ts

# Option 2: DataDog (APM)
npm install dd-trace
# Configure environment variables

# Option 3: New Relic
npm install newrelic
# Configure in server/_core/index.ts
```

### Log Aggregation

```bash
# Option 1: CloudWatch (AWS)
# Configure IAM role and log group

# Option 2: ELK Stack (Elasticsearch, Logstash, Kibana)
# Deploy on your infrastructure

# Option 3: Papertrail
npm install winston-papertrail
# Configure in logger service
```

## Performance Optimization

### Mobile App

```bash
# Enable code splitting
# Already configured in Expo

# Optimize bundle size
pnpm build

# Monitor bundle size
pnpm analyze
```

### Website

```bash
# Enable gzip compression
# Configure in web server

# Enable caching headers
# Configure in deployment platform

# Use CDN for assets
# Automatically handled by Netlify/Vercel
```

## Backup & Disaster Recovery

### Database Backups

```bash
# Daily automated backups
# Configure in your database service

# Manual backup
pg_dump fridayai > backup_$(date +%Y%m%d).sql

# Restore from backup
psql fridayai < backup_20240426.sql
```

### Application Backups

```bash
# Backup GitHub repository
git clone --mirror https://github.com/thatboybliss/Friday-v3.git

# Store in secure location
# Test restore procedure monthly
```

## Scaling Considerations

### Mobile App Backend

As user base grows:

1. **Database Scaling**
   - Add read replicas
   - Implement caching (Redis)
   - Optimize queries

2. **API Scaling**
   - Load balancing
   - Horizontal scaling
   - Rate limiting

3. **Audio Processing**
   - Queue-based processing
   - Distributed workers
   - Caching responses

### Website

The static website scales automatically with CDN. No additional scaling needed unless adding dynamic features.

## Rollback Procedure

If issues occur after deployment:

### Mobile App

```bash
# Rollback to previous version
# Option 1: EAS
eas build:list
eas build:view <build-id>

# Option 2: App Store
# Submit new build with fixes
# Expedited review available for critical fixes
```

### Website

```bash
# Rollback to previous commit
git revert <commit-hash>
git push origin main

# Or restore from backup
git checkout <previous-tag>
git push -f origin main
```

## Post-Deployment Validation

### Mobile App

- [ ] App installs successfully
- [ ] All features work as expected
- [ ] Audio recording works
- [ ] API calls succeed
- [ ] Error handling works
- [ ] Performance acceptable
- [ ] No crashes reported

### Website

- [ ] All pages load correctly
- [ ] Responsive design works
- [ ] Animations smooth
- [ ] Links functional
- [ ] Forms submit correctly
- [ ] Performance acceptable
- [ ] SEO tags present

## Support & Maintenance

### Monitoring Dashboard

Set up dashboards to monitor:

- App crashes and errors
- API response times
- Database performance
- User engagement
- Revenue (if applicable)

### Regular Maintenance

- Weekly: Check error logs
- Monthly: Review performance metrics
- Quarterly: Security audit
- Annually: Full system review

## Troubleshooting

### Common Issues

**Mobile App Won't Build**
- Check Node.js version (18+)
- Clear cache: `pnpm store prune`
- Reinstall dependencies: `pnpm install`

**Website Not Loading**
- Check DNS configuration
- Verify SSL certificate
- Clear CDN cache
- Check browser console for errors

**API Errors**
- Verify environment variables
- Check database connectivity
- Review API logs
- Test with curl/Postman

## Contact & Support

For deployment assistance:
- GitHub Issues: https://github.com/thatboybliss/Friday-v3/issues
- Email: support@fridayai.com
- Documentation: https://github.com/thatboybliss/Friday-v3/wiki

---

**Last Updated:** April 26, 2024
**Version:** 1.0.0
**Status:** Production Ready
