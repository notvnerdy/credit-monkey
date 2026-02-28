# Git Branch & Deployment Configuration

## Branch Structure

### 🌐 Frontend Branch
- **Branch Name:** `frontend`
- **Deploys To:** https://creditmonkey.com
- **Path:** `/home4/dionros/public_html`
- **Workflow:** `.github/workflows/deploy-frontend.yml`
- **Trigger:** Push to `frontend` branch

**Contains:**
- HTML files (all pages)
- Assets (CSS, JS, images)
- States pages
- Static files (robots.txt, CNAME, etc.)

### 🔧 Backend Branch
- **Branch Name:** `backend`
- **Deploys To:** https://creditmonkey.com  
- **Path:** `/home4/dionros/public_html/api.creditmonkey`
- **Workflow:** `.github/workflows/deploy-backend.yml`
- **Trigger:** Push to `backend` branch

**Contains:**
- Laravel application (backend/)
- API endpoints
- Database migrations
- Backend configuration

### 📦 Main Branch
- **Purpose:** Development/staging branch
- **Not auto-deployed**
- Use for testing before pushing to frontend/backend

---

## Deployment Workflows

### Frontend Deployment (deploy-frontend.yml)
**Runs on:** Push to `frontend` branch

**Steps:**
1. Code quality check & HTML validation
2. Security scan
3. Deploy files via rsync to `/home4/dionros/public_html`
4. Excludes: backend/, .git, *.md, *.py, *.sh

**Deploy Command:**
```bash
git checkout frontend
git add .
git commit -m "Update frontend"
git push origin frontend
```

### Backend Deployment (deploy-backend.yml)
**Runs on:** Push to `backend` branch

**Steps:**
1. Validate composer.json and .env.production
2. Deploy Laravel files via rsync
3. Copy .env.production to .env
4. Install Composer dependencies
5. Run database migrations
6. Clear Laravel caches (no config caching)
7. Test API endpoint

**Deploy Command:**
```bash
git checkout backend
git add .
git commit -m "Update backend API"
git push origin backend
```

---

## Quick Reference

### Deploy Frontend Only
```bash
git checkout frontend
# Make your changes
git add .
git commit -m "Frontend updates"
git push origin frontend
```
✅ Deploys to: https://creditmonkey.com

### Deploy Backend Only
```bash
git checkout backend
# Make your changes to backend/
git add .
git commit -m "Backend API updates"
git push origin backend
```
✅ Deploys to: https://creditmonkey.com

### Deploy Both
```bash
# Update frontend
git checkout frontend
git add .
git commit -m "Frontend changes"
git push origin frontend

# Update backend  
git checkout backend
git add .
git commit -m "Backend changes"
git push origin backend
```

### Sync Changes Between Branches
```bash
# If you made changes on main and want to push to frontend
git checkout frontend
git merge main
git push origin frontend

# Same for backend
git checkout backend
git merge main
git push origin backend
```

---

## Current API Configuration

**Frontend API Endpoint:** `assets/js/script.js`
```javascript
const API_ENDPOINT = 'https://creditmonkey.com/api/leads';
```

**Backend API Route:** `backend/routes/api.php`
```php
Route::post('/leads', [LeadController::class, 'store']);
```

---

## GitHub Actions Secrets Required

Make sure these secrets are configured in GitHub repository settings:

- `STAGING_HOST`: 108.179.232.14
- `STAGING_USER`: dionros
- `SSH_PRIVATE_KEY`: Your SSH private key for deployment

---

## Monitoring Deployments

### View GitHub Actions
1. Go to repository on GitHub
2. Click "Actions" tab
3. See deployment status for each branch

### Check Deployment Logs
- **Frontend:** GitHub Actions → "Deploy Frontend to creditmonkey.com"
- **Backend:** GitHub Actions → "Deploy Backend to creditmonkey.com"

### Test After Deployment

**Frontend:**
```bash
curl https://creditmonkey.com
```

**Backend API:**
```bash
curl -X POST https://creditmonkey.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"555-1234","message":"Test"}'
```

Expected response:
```json
{"success":true,"id":1}
```

---

## Troubleshooting

### Frontend not updating?
1. Check GitHub Actions logs
2. Verify rsync completed successfully
3. Clear browser cache
4. Check file permissions on server

### Backend API errors?
1. Check Laravel logs: `/home4/dionros/public_html/api.creditmonkey/storage/logs/laravel.log`
2. Verify database connection
3. Run: `ssh dionros@108.179.232.14 "cd public_html/api.creditmonkey && php artisan config:clear"`
4. Check .env file configuration

### Both branches need update?
```bash
# Update both from main
git checkout main
# ... make changes ...
git commit -m "Changes"

git checkout frontend
git merge main
git push origin frontend

git checkout backend
git merge main  
git push origin backend
```

---

**Last Updated:** February 3, 2026
**Status:** ✅ All branches configured and tested
