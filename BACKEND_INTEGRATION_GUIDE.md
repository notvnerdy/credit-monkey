# Backend Integration Guide - Credit Monkey Forms

## Overview
This guide explains how to connect your forms to a real backend service. We've prepared the code for multiple backend options.

---

## Option 1: Formspree (Recommended - Easiest Setup)

### What is Formspree?
Formspree is a form backend service that handles form submissions without requiring your own server.

### Setup Steps:

1. **Sign up for Formspree**
   - Visit: https://formspree.io/
   - Create free account (1000 submissions/month)
   - Or upgrade to paid plan for more features

2. **Create a Form**
   - Click "New Form"
   - Name it "Credit Monkey Consultation"
   - Copy your Form ID (looks like: `xpznXXXX`)

3. **Update JavaScript**
   - Open `assets/js/script.js`
   - Find line ~380: `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';`
   - Replace `YOUR_FORM_ID` with your actual form ID
   - Example: `const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpznabcd';`

4. **Configure Email Notifications**
   - In Formspree dashboard, go to Settings
   - Add notification email: `support@creditmonkey.com`
   - Enable auto-responder (optional)
   - Customize email template

5. **Test the Form**
   - Submit a test form on your website
   - Check Formspree dashboard for submission
   - Verify email notification received

### Formspree Features:
- ✅ Email notifications
- ✅ Auto-responder emails
- ✅ Spam filtering with reCAPTCHA
- ✅ File uploads
- ✅ Webhook integration
- ✅ CSV export
- ✅ Archive all submissions

### Cost:
- Free: 1000 submissions/month
- Basic: $10/month - 5000 submissions
- Pro: $40/month - 50,000 submissions

---

## Option 2: Custom Backend (API Endpoint)

If you have your own backend server:

### Update the JavaScript:

```javascript
// In assets/js/script.js, replace submitToService function:

const submitToService = async (formData, formType) => {
    const BACKEND_ENDPOINT = 'https://api.creditmonkey.com/submit-form';
    
    try {
        const response = await fetch(BACKEND_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': 'your-api-key-here', // If using API key auth
            },
            body: JSON.stringify({
                ...formData,
                formType: formType,
                timestamp: new Date().toISOString(),
                source: window.location.href
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return { success: true, data: result };
        
    } catch (error) {
        console.error('Form submission error:', error);
        throw error;
    }
};
```

### Backend Requirements:
- Accept POST requests
- Parse JSON body
- Validate data
- Send email notifications
- Store in database (optional)
- Return JSON response

### Example Node.js Backend (Express):

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'support@creditmonkey.com',
        pass: 'your-app-password'
    }
});

// Form submission endpoint
app.post('/submit-form', async (req, res) => {
    const { firstName, lastName, email, phone, creditScore, goals, formType } = req.body;
    
    // Send email notification
    const mailOptions = {
        from: 'support@creditmonkey.com',
        to: 'leads@creditmonkey.com',
        subject: `New ${formType} Form Submission`,
        html: `
            <h2>New Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Credit Score:</strong> ${creditScore}</p>
            <p><strong>Goals:</strong> ${goals}</p>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error sending email' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## Option 3: Zapier (No Code Solution)

### Setup:

1. **Create Zapier Account**
   - Visit: https://zapier.com
   - Sign up (free tier available)

2. **Create a Webhook**
   - Create new Zap
   - Trigger: Webhooks by Zapier → Catch Hook
   - Copy the webhook URL

3. **Update JavaScript**
   ```javascript
   const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/xxxxx/yyyyy/';
   ```

4. **Configure Actions**
   - Add action: Send email via Gmail/Outlook
   - Add action: Add row to Google Sheets
   - Add action: Create CRM contact (HubSpot, Salesforce, etc.)

### Benefits:
- ✅ No coding required
- ✅ Integrate with 5000+ apps
- ✅ Visual workflow builder
- ✅ Multi-step workflows

---

## Option 4: Email Service (Mailto - Simple but Limited)

For a quick temporary solution, you can use mailto:

### Update Form Action:

```html
<form action="mailto:support@creditmonkey.com" method="POST" enctype="text/plain">
    <!-- form fields -->
</form>
```

### Limitations:
- ❌ Opens user's email client
- ❌ Poor user experience
- ❌ No validation
- ❌ Not recommended for production

---

## Recommended Setup: Formspree + Google Sheets

Best of both worlds:

1. **Formspree for form handling**
   - Handles submissions
   - Sends email notifications
   - Spam filtering

2. **Zapier Integration**
   - Connect Formspree to Google Sheets
   - Automatic spreadsheet logging
   - Easy to review submissions

3. **Setup Steps:**
   - Set up Formspree (as described above)
   - In Formspree, enable Zapier integration
   - Create Zap: Formspree → Google Sheets
   - Map form fields to spreadsheet columns

---

## Security Best Practices

### 1. Add reCAPTCHA
```html
<!-- Add to head -->
<script src="https://www.google.com/recaptcha/api.js" async defer></script>

<!-- Add to form -->
<div class="g-recaptcha" data-sitekey="your-site-key"></div>
```

### 2. Rate Limiting
```javascript
// Add to JavaScript
let lastSubmission = 0;
const RATE_LIMIT = 30000; // 30 seconds

if (Date.now() - lastSubmission < RATE_LIMIT) {
    showMessage('formMessage', 'Please wait before submitting again.', 'error');
    return;
}
lastSubmission = Date.now();
```

### 3. Input Validation
```javascript
// Add validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    showMessage('formMessage', 'Please enter a valid email.', 'error');
    return;
}

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
if (!phoneRegex.test(phone)) {
    showMessage('formMessage', 'Please enter a valid phone number.', 'error');
    return;
}
```

### 4. HTTPS Only
Ensure your site is served over HTTPS to protect form data in transit.

---

## Testing Checklist

After setup, test:
- [ ] Form submits successfully
- [ ] Email notification received
- [ ] Data captured correctly
- [ ] Error handling works
- [ ] Mobile submission works
- [ ] Spam protection active
- [ ] Auto-responder sent (if configured)
- [ ] Thank you message displays
- [ ] Validation works correctly

---

## Monitoring & Analytics

### Track Form Performance:

1. **Google Analytics Event Tracking**
```javascript
// Add after successful submission
gtag('event', 'form_submission', {
    'form_name': 'consultation',
    'form_location': window.location.pathname
});
```

2. **Formspree Analytics**
   - View submission rate
   - Monitor bounce rate
   - Track conversion funnel

3. **Set Up Alerts**
   - Email when form submissions spike
   - Alert when form fails
   - Notify on spam attempts

---

## Current Configuration

The JavaScript is currently configured with:
- ✅ Formspree integration (needs your form ID)
- ✅ Local storage backup
- ✅ Error handling
- ✅ Loading states
- ✅ Success/error messages
- ✅ Retry mechanism

**Next Step:** Sign up for Formspree and add your form ID to activate the backend!

---

## Support Resources

- **Formspree Docs:** https://help.formspree.io/
- **Zapier Help:** https://zapier.com/help
- **reCAPTCHA Setup:** https://developers.google.com/recaptcha

---

## Quick Start Command

If using Formspree:

1. Get your form ID from formspree.io
2. Run this find-and-replace in `assets/js/script.js`:
   ```
   Find: YOUR_FORM_ID
   Replace: xpzn1234 (your actual ID)
   ```
3. Test the form
4. Done! ✅

**Current Status:** Backend integration code is ready. Just add your Formspree form ID or custom endpoint!
