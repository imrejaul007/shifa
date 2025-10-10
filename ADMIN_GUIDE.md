# 🏥 Shifa AlHind - Admin Management Guide

## 📋 Table of Contents

1. [Accessing the Admin Panel](#accessing-the-admin-panel)
2. [Form Submissions - Where They Go](#form-submissions---where-they-go)
3. [Managing Bookings/Inquiries](#managing-bookingsinquiries)
4. [Adding & Managing Content](#adding--managing-content)
5. [Admin Panel Features](#admin-panel-features)

---

## 🔐 Accessing the Admin Panel

### Login URL

```
https://your-domain.com/admin/login
```

### Default Admin Credentials

After running the database seed (`npm run seed`), use these credentials:

| Role           | Email                      | Password      |
| -------------- | -------------------------- | ------------- |
| **Admin**      | admin@shifaalhind.com      | admin123      |
| **Editor**     | editor@shifaalhind.com     | editor123     |
| **Translator** | translator@shifaalhind.com | translator123 |

⚠️ **IMPORTANT**: Change these passwords immediately after first login!

---

## 📨 Form Submissions - Where They Go

### When Someone Fills Out a Form:

1. **Form Submission Flow:**

   ```
   User fills form → API saves to database → Creates booking record → Admin gets notified
   ```

2. **Database Storage:**
   - All form submissions are saved in the `Booking` table in PostgreSQL
   - Each submission gets a unique ID and timestamp
   - Status is set to `LEAD` by default

3. **Viewing Submissions:**
   - Go to: **Admin Panel → Bookings**
   - URL: `https://your-domain.com/admin/bookings`
   - You'll see all inquiries/bookings in a table

4. **What Gets Saved:**
   - Patient name
   - Email address
   - Phone number
   - Country of origin
   - Treatment/package/doctor/hospital (if selected)
   - Preferred dates
   - Additional notes
   - Submission timestamp

### Managing Bookings

**Admin Panel → Bookings** (`/admin/bookings`)

**Features:**

- ✅ View all form submissions
- ✅ Filter by status (LEAD, CONFIRMED, IN_TREATMENT, DISCHARGED, CANCELLED)
- ✅ Filter by country
- ✅ Search by name/email
- ✅ Update booking status
- ✅ View full booking details
- ✅ Quick actions: Email, Call, WhatsApp
- ✅ Delete old bookings

**Status Workflow:**

```
LEAD → CONFIRMED → IN_TREATMENT → DISCHARGED
       ↓
   CANCELLED (if needed)
```

---

## 🏥 Adding & Managing Content

### 1. Hospitals

**Path:** Admin Panel → Hospitals (`/admin/hospitals`)

**How to Add a New Hospital:**

1. Click "Add Hospital" button
2. Fill in the form:
   - **Basic Info:**
     - Name (English & Arabic)
     - Description (English & Arabic)
     - Address, City, Country

   - **Accreditations:**
     - Add certifications (e.g., "JCI Accredited", "NABH Certified")
     - One per line

   - **Languages Supported:**
     - Add supported languages (e.g., "English", "Arabic", "Hindi")
     - One per line

   - **Images:**
     - Add image URLs (upload to your image hosting)
     - Multiple images supported

   - **SEO:**
     - SEO Title (English & Arabic)
     - SEO Description (English & Arabic)

3. Check "Published" to make it live
4. Click "Save Hospital"

**Example Hospital Entry:**

```
Name (EN): Apollo Hospitals Bangalore
Name (AR): مستشفى أبولو بنغالور
Description (EN): Leading multispecialty hospital...
Accreditations: JCI Accredited, NABH Certified, ISO 9001
Languages: English, Arabic, Hindi, Urdu
```

---

### 2. Doctors

**Path:** Admin Panel → Doctors (`/admin/doctors`)

**How to Add a New Doctor:**

1. Click "Add Doctor" button
2. Fill in the form:
   - **Basic Info:**
     - Select Hospital
     - Name (English & Arabic)
     - Bio/Description (English & Arabic)

   - **Professional Details:**
     - Qualifications (e.g., "MBBS", "MD", "DM")
     - Specialties (e.g., "Cardiology", "Cardiac Surgery")
     - Languages spoken

   - **Consultation:**
     - Profile image URL
     - Consultation fee (USD)
     - Telemedicine available (Yes/No)

   - **SEO:**
     - SEO Title & Description (both languages)

3. Check "Published" to make it live
4. Click "Save Doctor"

**Example Doctor Entry:**

```
Hospital: Apollo Hospitals Bangalore
Name (EN): Dr. Ahmed Khan
Name (AR): د. أحمد خان
Qualifications: MBBS, MD (Cardiology), DM (Interventional Cardiology)
Specialties: Interventional Cardiology, Heart Failure, TAVR
Languages: English, Arabic, Hindi, Urdu
Consultation Fee: 150 USD
```

---

### 3. Treatments

**Path:** Admin Panel → Treatments (`/admin/treatments`)

**How to Add a New Treatment:**

1. Click "Add Treatment" button
2. Fill in the form:
   - **Basic Info:**
     - Title (English & Arabic)
     - Summary/Short description (both languages)

   - **Pricing:**
     - Minimum cost (USD)
     - Maximum cost (USD)

   - **Content Blocks (English):**

     ```json
     {
       "sections": [
         {
           "type": "heading",
           "content": "Why Choose This Treatment?"
         },
         {
           "type": "paragraph",
           "content": "Full description here..."
         },
         {
           "type": "list",
           "items": ["Item 1", "Item 2", "Item 3"]
         }
       ]
     }
     ```

   - **Content Blocks (Arabic):** Same structure in Arabic

   - **FAQ:**

     ```json
     [
       {
         "q_en": "How long is recovery?",
         "a_en": "Recovery takes 2-3 weeks...",
         "q_ar": "كم تستغرق فترة التعافي؟",
         "a_ar": "يستغرق التعافي 2-3 أسابيع..."
       }
     ]
     ```

   - **Associated Hospitals:**
     - Select hospitals that offer this treatment

3. Check "Published" to make it live
4. Click "Save Treatment"

---

### 4. Packages

**Path:** Admin Panel → Packages (`/admin/packages`)

**How to Add a New Package:**

1. Click "Add Package" button
2. Fill in the form:
   - **Basic Info:**
     - Name (English & Arabic)
     - Description (both languages)

   - **Pricing:**
     - Price (USD)
     - Currency

   - **Features:**
     ```json
     {
       "included": [
         "Surgery and hospital stay",
         "Pre-operative consultations",
         "All medications",
         "Airport pickup",
         "Accommodation assistance",
         "24/7 Arabic translator",
         "Post-discharge follow-up"
       ]
     }
     ```
     Or as an array:
     ```json
     ["Surgery and hospital stay", "Pre-operative consultations", "All medications"]
     ```

3. Check "Published" to make it live
4. Click "Save Package"

**Example Package:**

```
Name (EN): Comprehensive Care Package
Price: 7500 USD
Features:
  - Surgery and hospital stay
  - All medications
  - Airport transfer
  - Arabic translator
  - Visa assistance
  - 3 months follow-up
```

---

### 5. Blog Posts & Content Pages

**Path:** Admin Panel → Content (`/admin/content`)

**How to Add a Blog Post:**

1. Click "Add Content" button
2. Fill in the form:
   - **Type:** Select "blog" or "page"

   - **Basic Info:**
     - Title (English & Arabic)
     - Excerpt/Summary (both languages)

   - **Content (Rich Text):**
     - English content blocks (HTML/JSON)
     - Arabic content blocks (HTML/JSON)

   - **Featured Image:**
     - Upload and add image URL

   - **Author:**
     - Your name or "Shifa AlHind Team"

   - **Publishing:**
     - Publish immediately or schedule for later

3. Check "Published" to make it live
4. Click "Save Content"

**Content Block Format:**

```json
{
  "content": "<h2>Your Blog Title</h2><p>Your content here...</p>"
}
```

---

## 🎛️ Admin Panel Features

### Dashboard (`/admin/dashboard`)

- Overview of all bookings
- Recent inquiries
- Statistics and analytics
- Quick actions

### Bookings Management (`/admin/bookings`)

**Features:**

- View all form submissions
- Filter by status
- Search bookings
- Update status
- Contact patients (Email/Phone/WhatsApp)
- Delete bookings

**Booking Statuses:**

- `LEAD` - New inquiry
- `CONFIRMED` - Booking confirmed
- `IN_TREATMENT` - Patient undergoing treatment
- `DISCHARGED` - Treatment completed
- `CANCELLED` - Booking cancelled

### Hospitals Management (`/admin/hospitals`)

- Add new hospitals
- Edit existing hospitals
- Upload hospital images
- Manage accreditations
- Publish/unpublish hospitals

### Doctors Management (`/admin/doctors`)

- Add new doctors
- Assign to hospitals
- Set consultation fees
- Manage specialties
- Publish/unpublish doctors

### Treatments Management (`/admin/treatments`)

- Add new treatments
- Set pricing ranges
- Create content sections
- Add FAQs
- Associate with hospitals

### Packages Management (`/admin/packages`)

- Create packages
- Set pricing
- List included features
- Publish/unpublish packages

### Content Management (`/admin/content`)

- Blog posts
- Static pages
- FAQ pages
- Rich text editor
- Image management

---

## 🔔 Notifications (Coming Soon)

Currently, form submissions are saved to the database. You can add:

1. **Email Notifications:**
   - Edit `/src/app/api/v1/lead/route.ts`
   - Uncomment email notification code
   - Set up email service (Resend, SendGrid, etc.)

2. **WhatsApp Notifications:**
   - Integrate WhatsApp Business API
   - Send instant alerts to admin

3. **SMS Notifications:**
   - Integrate Twilio or similar
   - Get SMS for new bookings

---

## 📊 Database Access

### Direct Database Access:

1. **Using Prisma Studio:**

   ```bash
   npm run studio
   ```

   Opens a GUI at `http://localhost:5555`

2. **Using PostgreSQL Client:**
   - Connect to your Render PostgreSQL database
   - Use connection string from Render dashboard

---

## 🔒 Security Best Practices

1. **Change Default Passwords:**
   - Login with default credentials
   - Go to your profile
   - Update password immediately

2. **User Roles:**
   - **ADMIN**: Full access to everything
   - **EDITOR**: Can manage content, view bookings
   - **TRANSLATOR**: Limited access, mainly for translations

3. **Database Backups:**
   - Render automatically backs up PostgreSQL
   - Manual backup: Use Prisma or pg_dump

---

## 🚀 Quick Start Checklist

- [ ] Access admin panel: `/admin/login`
- [ ] Login with default credentials
- [ ] Change admin password
- [ ] Add your first hospital
- [ ] Add doctors to the hospital
- [ ] Create treatment pages
- [ ] Create packages
- [ ] Test booking form on website
- [ ] Check bookings in admin panel
- [ ] Update contact information
- [ ] Publish content

---

## 🆘 Common Questions

**Q: Where do form submissions go?**
A: Admin Panel → Bookings (`/admin/bookings`)

**Q: How do I add a new hospital?**
A: Admin Panel → Hospitals → Click "Add Hospital"

**Q: Can I edit content after publishing?**
A: Yes! Just click "Edit" on any item

**Q: How do I unpublish something?**
A: Edit the item and uncheck "Published"

**Q: Where are images stored?**
A: Currently, you need to host images externally (Cloudinary, AWS S3, etc.) and paste the URL

**Q: Can I add custom fields?**
A: Yes, but requires database schema changes. Contact developer.

---

## 📞 Need Help?

- Check the admin panel tooltips
- Review this guide
- Contact your development team
- Check `/docs` folder for technical documentation

---

**Version:** 1.0
**Last Updated:** 2025-10-10
