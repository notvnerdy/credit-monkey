# Backend Deployment Complete ✓

## What Was Done

### 1. ✅ Backend Deployment Script Created
- Created [`deploy-backend.sh`](deploy-backend.sh) for automated backend deployment
- Script handles: file upload, composer install, migrations, permissions

### 2. ✅ Backend Files Deployed
- **Location:** `/home4/dionros/public_html/api.creditmonkey`
- **Public Directory:** `/home4/dionros/public_html/api.creditmonkey/public`
- All Laravel files uploaded successfully

### 3. ✅ Composer Dependencies Installed
- PHP 8.3.28 confirmed on server
- Composer 2.9.5 installed
- All Laravel dependencies installed (77 packages)

### 4. ✅ Database Configuration
- **Database:** dionros_credit-monkey
- **User:** dionros_credit-monkey
- **Host:** localhost (corrected from 108.179.232.14)
- **.env file:** Configured and working

### 5. ✅ Database Migrations Run
All tables created successfully:
- `migrations` - Migration tracking
- `users` - User authentication
- `cache` - Application cache
- `jobs` - Background jobs queue
- `personal_access_tokens` - API authentication (Sanctum)
- `leads` - Lead capture with UTM tracking
- `credit_cases` - Case management
- `case_notes` - Case activity notes
- `case_documents` - Document uploads

### 6. ✅ Laravel Optimized
- Configuration cached
- Routes cached
- Proper file permissions set (755/775)

### 7. ✅ Frontend Updated
- API endpoint updated in [`assets/js/script.js`](assets/js/script.js)
- Points to: `https://creditmonkey.com/api/leads`

---

## ⚠️ Final Configuration Needed

### Configure Subdomain in cPanel/Hostgator

The subdomain `creditmonkey.com` needs to be configured to point to the correct directory:

1. **Login to cPanel** (Hostgator)
   - URL: https://gator4207.hostgator.com:2083/
   - Username: dionros
   - Password: Seiretsu@12

2. **Go to "Subdomains"** (under Domains section)

3. **Create/Edit Subdomain:**
   - Subdomain: `api`
   - Domain: `creditmonkey.com`
   - Document Root: `/home4/dionros/public_html/api.creditmonkey/public`
   - ⚠️ **Important:** Must point to `/public` directory, not just `/api.creditmonkey`

4. **SSL Certificate:**
   - Go to "SSL/TLS Status" in cPanel
   - Enable AutoSSL for `creditmonkey.com`
   - Or install Let's Encrypt certificate

---

## API Endpoints

### Base URL
```
https://creditmonkey.com
```

### Lead Submission
```http
POST /api/leads
Content-Type: application/json
Accept: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "state": "California",
  "message": "I need help with credit repair",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "credit-repair"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead captured successfully",
  "lead_id": 123
}
```

---

## Admin Access

### Admin Panel
```
https://creditmonkey.com/admin
```

### Default Credentials
- **Email:** admin@creditmonkey.com
- **Password:** password123
- ⚠️ **Change this immediately after first login!**

---

## Testing the API

### Test Command
```bash
curl -X POST https://creditmonkey.com/api/leads \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "555-1234",
    "state": "California",
    "message": "Testing API endpoint"
  }'
```

### Expected Response
```json
{
  "success": true,
  "message": "Lead captured successfully",
  "lead_id": 1
}
```

---

## Deployment Commands

### Deploy Backend Updates
```bash
./deploy-backend.sh
```

### Manual Deployment Steps
```bash
# SSH into server
ssh dionros@108.179.232.14

# Navigate to backend directory
cd /home4/dionros/public_html/api.creditmonkey

# Pull latest changes (if using git)
git pull origin main

# Install dependencies
php composer.phar install --no-dev --optimize-autoloader

# Run migrations
php artisan migrate --force

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
chmod -R 755 .
chmod -R 775 storage bootstrap/cache
```

---

## Troubleshooting

### API Returns 404
- Verify subdomain points to `/public` directory
- Check `.htaccess` files are present
- Verify mod_rewrite is enabled

### Database Connection Error
- Verify database credentials in `.env`
- Ensure `DB_HOST=localhost` (not IP address)
- Test: `php artisan migrate:status`

### Permission Errors
```bash
cd /home4/dionros/public_html/api.creditmonkey
chmod -R 755 .
chmod -R 775 storage bootstrap/cache
```

### Clear All Caches
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

## Next Steps

1. ✅ Configure subdomain in cPanel (Point to `/public` directory)
2. ✅ Enable SSL for creditmonkey.com
3. ✅ Test API endpoint
4. ✅ Update admin password
5. ✅ Deploy frontend with updated API endpoint
6. ✅ Monitor lead submissions in database/admin panel

---

## File Structure

```
/home4/dionros/public_html/api.creditmonkey/
├── .env                       # Environment configuration
├── .htaccess                  # Redirect to public/
├── artisan                    # Laravel CLI
├── composer.json              # PHP dependencies
├── composer.phar              # Composer binary
├── app/
│   └── Http/
│       └── Controllers/
│           ├── LeadController.php
│           ├── CreditCaseController.php
│           └── Auth/
├── config/                    # Configuration files
├── database/
│   └── migrations/           # Database migrations
├── public/                    # ⚠️ Subdomain must point here!
│   ├── index.php             # Laravel entry point
│   ├── .htaccess             # URL rewriting
│   └── test.php              # Test file
├── resources/
│   └── views/
├── routes/
│   ├── api.php               # API routes
│   └── web.php               # Web routes
├── storage/                   # Logs, cache, sessions
│   ├── logs/
│   ├── framework/
│   └── app/
└── vendor/                    # Composer packages
```

---

## Environment Configuration

### Production Settings (.env)
```env
APP_NAME="Credit Monkey Backend"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://creditmonkey.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=dionros_credit-monkey
DB_USERNAME=dionros_credit-monkey
DB_PASSWORD=Seiretsu@12

SESSION_DOMAIN=.creditmonkey.com
```

---

## Support

For backend issues:
1. Check logs: `/home4/dionros/public_html/api.creditmonkey/storage/logs/laravel.log`
2. Run diagnostics: `php artisan about`
3. Test database: `php artisan migrate:status`
4. Check routes: `php artisan route:list`

---

**Deployment Status:** ✅ COMPLETE
**Date:** February 3, 2026
**Backend Version:** Laravel 12.49.0
**PHP Version:** 8.3.28
