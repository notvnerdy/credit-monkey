# Backend API Integration - Deployment Guide

## ✅ What's Been Done

### Backend Setup (Laravel API)
- ✅ Laravel 12 backend scaffolded in `/backend` directory
- ✅ Lead capture API endpoint: `POST /api/leads`
- ✅ Authentication system (Sanctum) for admin access
- ✅ Database migrations created for:
  - `leads` - Lead capture with UTM tracking
  - `credit_cases` - Case management
  - `case_notes` - Case activity notes
  - `case_documents` - Document uploads
  - `personal_access_tokens` - API authentication
- ✅ Models created with relationships
- ✅ Controllers for all CRUD operations
- ✅ CORS configured for cross-origin requests

### Frontend Integration
- ✅ All forms updated to POST to `/backend/public/api/leads`
- ✅ UTM parameter tracking from URL
- ✅ State detection from URL path
- ✅ Form handlers with loading states and error messages
- ✅ LocalStorage backup when API fails

### Forms Integrated
1. Contact form (`contact-us.html`)
2. Quick consultation modal (all pages with `quickConsultForm`)
3. Newsletter signup (footer on all pages)
4. Main consultation form (if exists on homepage)

## 🗄️ Database Configuration

### Local Development (SQLite)
```env
DB_CONNECTION=sqlite
```
The SQLite database is already created at `backend/database/database.sqlite`

### Production (MySQL)
```env
DB_CONNECTION=mysql
DB_HOST=108.179.232.14
DB_PORT=3306
DB_DATABASE=dionros_credit-monkey
DB_USERNAME=dionros_credit-monkey
DB_PASSWORD=Seiretsu@12
```

## 🚀 Deployment Steps

### Option 1: Deploy Backend to Same Directory (Recommended)

The backend is already configured to deploy with the main site:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Laravel backend API integration"
   git push origin main
   ```

2. **GitHub Actions will automatically:**
   - Deploy all files including `backend/` directory
   - Copy `.env.production` to `.env` on server
   - Run `composer install --no-dev`
   - Execute database migrations
   - Set proper permissions

3. **API Endpoint:**
   ```
   https://creditmonkey.com/backend/public/api/leads
   ```

4. **Admin Login:**
   ```
   Email: admin@creditmonkey.com
   Password: password123
   ```

### Option 2: Deploy Backend to Separate Directory (cm-backend)

If you want backend in a separate directory:

1. **Create directory on server via FTP/SSH:**
   ```bash
   mkdir /home4/dionros/cm-backend
   ```

2. **Update frontend API endpoint in `assets/js/script.js`:**
   ```javascript
   const API_ENDPOINT = window.location.hostname === 'localhost' 
       ? 'http://localhost:8000/api/leads'
       : 'https://creditmonkey.com/backend-api/leads'; // or subdomain
   ```

3. **Set up subdomain or proxy:**
   - Create subdomain: `api.creditmonkey.com` → `/home4/dionros/cm-backend/public`
   - OR nginx/Apache rewrite: `/backend-api/*` → `/cm-backend/public/api/*`

## 🧪 Local Testing

### 1. Start Laravel Server
```bash
cd backend
php artisan serve --port=8000
```

### 2. Open Test Page
Open `api-test.html` in browser or visit: `http://localhost:8000/api-test.html`

### 3. Test API Directly
```bash
curl -X POST http://localhost:8000/api/leads \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "(555) 123-4567",
    "state": "California",
    "message": "Test message",
    "utm_source": "test",
    "utm_medium": "curl"
  }'
```

### 4. Check Database
```bash
cd backend
php artisan tinker
>>> App\Models\Lead::all();
>>> App\Models\Lead::count();
```

## 🔒 Admin Authentication

### API Endpoints (Protected with Sanctum)

**Login:**
```bash
POST /api/auth/login
Body: { "email": "admin@creditmonkey.com", "password": "password123" }
Response: { "token": "..." }
```

**Get Cases:**
```bash
GET /api/cases
Header: Authorization: Bearer {token}
```

**Create Case:**
```bash
POST /api/cases
Header: Authorization: Bearer {token}
Body: { "lead_id": 1, "status": "new", "summary": "..." }
```

**Add Note:**
```bash
POST /api/cases/1/notes
Header: Authorization: Bearer {token}
Body: { "body": "Case note content" }
```

**Upload Document:**
```bash
POST /api/cases/1/documents
Header: Authorization: Bearer {token}
Body: FormData with file
```

## 📊 API Response Examples

### Success Response
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "state": "California",
  "message": "Interested in credit repair",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "credit-repair-2024",
  "utm_term": null,
  "utm_content": null,
  "created_at": "2026-02-03T12:34:56.000000Z",
  "updated_at": "2026-02-03T12:34:56.000000Z"
}
```

### Error Response
```json
{
  "message": "The email field is required.",
  "errors": {
    "email": ["The email field is required."],
    "phone": ["The phone field is required."]
  }
}
```

## 🔧 Server Requirements

### PHP Requirements
- PHP 8.2 or higher
- Required Extensions:
  - BCMath
  - Ctype
  - Fileinfo
  - JSON
  - Mbstring
  - OpenSSL
  - PDO
  - Tokenizer
  - XML

### Composer
Check if Composer is available on server:
```bash
ssh dionros@108.179.232.14
composer --version
```

If not available, dependencies are already included in deployment.

### File Permissions
```bash
cd /home4/dionros/credit-monkey/backend
chmod -R 755 storage bootstrap/cache
chmod -R 777 storage/logs storage/framework
```

## 🐛 Troubleshooting

### Issue: API returns 404
**Solution:** Ensure `.htaccess` is present in `backend/public/`:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

### Issue: CORS errors
**Solution:** Check `backend/config/cors.php` allows your domain:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['https://creditmonkey.com', 'https://www.creditmonkey.com'],
```

### Issue: Database connection failed
**Solution:** 
1. Verify database credentials in `.env`
2. Check if server IP is whitelisted in MySQL
3. Test connection: `php artisan tinker` then `DB::connection()->getPdo();`

### Issue: 500 Internal Server Error
**Solution:**
1. Check logs: `backend/storage/logs/laravel.log`
2. Enable debug mode temporarily: `APP_DEBUG=true` in `.env`
3. Clear cache: `php artisan cache:clear && php artisan config:clear`

## 📈 Next Steps

### Immediate
1. ✅ Forms integrated with API
2. ⏳ Test forms on local server
3. ⏳ Deploy to production
4. ⏳ Test on live site
5. ⏳ Monitor `leads` table for submissions

### Future Enhancements
- [ ] Email notifications on new leads
- [ ] Admin dashboard for case management
- [ ] Automated lead assignment
- [ ] Document preview and download
- [ ] Case status tracking timeline
- [ ] Client portal for document uploads
- [ ] SMS notifications with Twilio
- [ ] CRM integration (Salesforce, HubSpot)

## 🔐 Security Checklist

- [x] CORS configured properly
- [x] API authentication with Sanctum
- [x] Password hashing with bcrypt
- [x] SQL injection protection (Eloquent ORM)
- [x] XSS protection (Laravel sanitization)
- [x] CSRF protection (Sanctum)
- [ ] Rate limiting on API endpoints
- [ ] SSL certificate (HTTPS)
- [ ] Environment variables secured
- [ ] Database backups configured
- [ ] Error logging without sensitive data

## 📞 Support

For issues with backend integration:
1. Check Laravel logs: `backend/storage/logs/laravel.log`
2. Check server error logs
3. Review GitHub Actions deployment logs
4. Test API with Postman or curl

## 🎉 Success Metrics

Monitor these after deployment:
- Lead capture rate (forms submitted successfully)
- API response time (should be < 500ms)
- Error rate (should be < 1%)
- Database growth (leads per day)
- Form abandonment rate

---

**Last Updated:** February 3, 2026  
**Backend Version:** Laravel 12.49.0  
**API Version:** 1.0.0
