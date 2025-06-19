# Monetizr Deployment Guide

## 🚀 Quick Start

All Monetizr applications are successfully deployed to Cloudflare infrastructure. Here's how to access and manage them.

## 📱 Live Applications

### Production URLs
- **Landing Page**: https://7e2572ab.monetizr-landing.pages.dev
- **Authentication**: https://b3944292.monetizr-auth.pages.dev  
- **Dashboard**: https://74fa2bf3.monetizr-dashboard.pages.dev
- **Admin Panel**: https://18b1c712.monetizr-admin.pages.dev
- **API Workers**: https://monetizr-api.rendoarsandi.workers.dev

## 🛠️ Infrastructure Overview

### Cloudflare Services Used
- **Cloudflare Pages**: Static hosting for Next.js applications
- **Cloudflare Workers**: Serverless API backend
- **Cloudflare D1**: SQLite database
- **Cloudflare KV**: Session storage
- **Cloudflare R2**: File storage (planned)

### Account Information
- **Account ID**: f64759bf49d0b0dbad173519b611f80c
- **Email**: rendoarsandi@gmail.com
- **Domain**: *.pages.dev (temporary)

## 🔧 Deployment Process

### Prerequisites
1. Cloudflare account with Workers/Pages access
2. Wrangler CLI installed: `bun add -g wrangler`
3. Authenticated with Cloudflare: `wrangler login`

### Build and Deploy Commands

#### Build All Applications
```bash
bun run build
```

#### Deploy Workers API
```bash
cd workers/api
bun x wrangler deploy
```

#### Deploy Next.js Applications
```bash
# Admin App
cd apps/admin
bun x wrangler pages deploy out --project-name "monetizr-admin"

# Auth App  
cd apps/auth
bun x wrangler pages deploy out --project-name "monetizr-auth"

# Dashboard App
cd apps/dashboard
bun x wrangler pages deploy out --project-name "monetizr-dashboard"

# Landing App
cd apps/landing
bun x wrangler pages deploy out --project-name "monetizr-landing"
```

## 💾 Database Management

### D1 Database
- **Name**: monetizr-db-dev
- **ID**: 21cbd266-ef7d-4a84-a81e-ddafda7e705c
- **Type**: SQLite (Cloudflare D1)

### Schema Migration
```bash
cd workers/api
bun x wrangler d1 execute monetizr-db-dev --file=schema.sql
```

### Database Tables
- `users` - User accounts and profiles
- `campaigns` - Creator campaigns
- `promotions` - Promoter activities
- `transactions` - Financial transactions
- `wallets` - User balances
- `bank_accounts` - Withdrawal information

## 🔐 Security Configuration

### Environment Variables
Set in Cloudflare Workers dashboard:
- `JWT_SECRET`: Secret key for JWT token signing
- `CORS_ORIGINS`: Allowed origins for API requests

### Authentication Flow
1. User registers/logs in via auth app
2. JWT token stored in localStorage
3. Token included in API requests
4. Workers API validates token
5. User data returned from D1 database

## 🔄 CI/CD Pipeline

### Manual Deployment
Currently using manual deployment via Wrangler CLI.

### Future Automation
Consider setting up:
- GitHub Actions for automatic deployment
- Branch-based environments (dev/staging/prod)
- Automated testing before deployment

## 📊 Monitoring and Analytics

### Available Metrics
- Cloudflare Analytics (built-in)
- Workers Analytics
- D1 Database metrics
- Pages deployment logs

### Error Tracking
- Workers error logs in Cloudflare dashboard
- Console errors in browser dev tools
- API response error handling

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
- Ensure all dependencies are installed: `bun install`
- Check TypeScript errors: `bun run type-check`
- Verify Next.js configuration for static export

#### API Connection Issues
- Verify CORS configuration in Workers
- Check API URL in environment variables
- Ensure JWT token is valid and not expired

#### Database Issues
- Verify D1 database ID in wrangler.toml
- Check SQL syntax in migration files
- Ensure proper table relationships

### Support Resources
- Cloudflare Documentation: https://developers.cloudflare.com/
- Wrangler CLI Reference: https://developers.cloudflare.com/workers/wrangler/
- Next.js Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

## 🎯 Next Steps

### Immediate Tasks
1. Set up custom domain (monetizr.com)
2. Configure SSL certificates
3. Set up production environment variables
4. Implement monitoring and alerting

### Future Enhancements
1. Add Cloudflare R2 for file storage
2. Implement caching strategies
3. Set up automated backups
4. Add performance monitoring
5. Configure CDN optimization

## 📞 Contact Information

For deployment issues or questions:
- Email: rendoarsandi@gmail.com
- Cloudflare Account: f64759bf49d0b0dbad173519b611f80c
