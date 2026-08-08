# Campora Nigeria — Off-Campus Student Housing Platform (Waitlist Landing Page)

**Campora Nigeria** is a brand new digital platform built specifically for students in Nigerian Universities, Polytechnics, and Colleges of Education. Campora solves the ubiquitous off-campus student housing problem in Nigeria — eliminating fake agent scams, unverified hostel listings, inflated inspection fees, and misleading gate proximity claims.

This repository contains the official early access waitlist landing page for **Campora Nigeria**.

---

## 🌟 Key Features

1. **Pre-Launch Focus & Identity**
   - Clean, high-converting pre-launch landing page for collecting student leads across Nigerian campuses.
   - Strictly contains no fake property listings, focusing 100% on platform value proposition, trust guarantees, and user lead acquisition.

2. **Full Nigerian Tertiary Institution Database (170+ Campuses)**
   - Includes Federal Universities (UNILAG, UI, OAU, FUTA, ABU, UNN, etc.)
   - State Universities (LASU, OOU, LAUTECH, EKSU, DELSU, etc.)
   - Private Universities (Covenant, Afe Babalola, Babcock, Nile, etc.)
   - Polytechnics (YABATECH, Ilaro, MAPOLY, Auchi, Nekede, etc.)
   - Colleges of Education across all 36 States and the Federal Capital Territory (FCT).
   - Fast instant search and category filter pills (Federal, State, Private, Polytechnic, College of Education).

3. **Student Waitlist Intake Form**
   - Captures: Full Name, Email, WhatsApp / Phone Number, Nigerian Institution, Level of Study (B.Sc, ND/HND, PGD/M.Sc, JUPEB, NCE), Gender, Off-Campus Move-In Timeline, Annual Budget Range in Naira (₦), and Referral Source.

4. **Instant Queue Position & Referral Engine**
   - Generates a unique referral link (`?ref=CAMPORA-...`) upon signup.
   - Provides a one-click WhatsApp share button pre-filled with student referral messaging.
   - Look up waitlist spot anytime using Email or Phone number.

5. **Admin Dashboard**
   - View total waitlist counts, institution distribution breakdown, budget distribution, and top referral sources.
   - Export waitlist records directly to CSV for campaign outreach.

---

## 📋 Full Prompt & Specification (Google Spreadsheet Integration)

If you are recreating this landing page or deploying it to integrate with **Google Sheets** (instead of Firebase/Firestore), use the exact prompt specification below:

```text
Build a pre-launch waitlist landing page for "Campora Nigeria" — a new off-campus student housing platform connecting students across 170+ Nigerian Universities, Polytechnics, and Colleges of Education with verified off-campus hostels near campus gates.

KEY REQUIREMENTS:
1. DESIGN & BRANDING:
   - Modern, high-converting Nigerian student brand identity using Slate (#0F172A) and Teal (#0D9488) accents on a warm neutral background (#FAF9F6).
   - Plus Jakarta Sans typography pairing with bold visual rhythm.
   - Include custom Campora favicon badge and meta social tags in index.html.

2. PAGE STRUCTURE:
   - Sticky Header with Campora logo, navigation links ("What We Do", "How It Works", "FAQ"), "Check My Spot" button, and "Join Waitlist" CTA.
   - Hero Section: Clear headline ("The smart way to find student housing in Nigeria. Zero scams. Physical verification."), status badge ("Early Access Waitlist Open"), free student guarantees, and interactive campus hub selector pills (UNILAG, UI, OAU, FUTA, LASU, YABATECH, ABU).
   - Platform Overview ("What We Are & What We Do"): Highlighting the problem (fake agent scams, inflated inspection fees, misleading photos) vs. the Campora solution (physical property verification, honest video walkthroughs, transparent Naira pricing, exact gate walk times).
   - How It Works: 3-step student onboarding breakdown.
   - FAQ Section: Accordion answering common questions (launch dates, supported institutions, 100% free for students, agent verification).
   - Priority Access Waitlist Form:
     * Full Name, Email, WhatsApp Phone Number.
     * Comprehensive Nigerian Tertiary Institution selector with category tabs (Federal, State, Private, Poly, College of Ed) and live search filter.
     * Level of Study (Undergraduate, ND/HND, Postgraduate, JUPEB/Foundation, NCE).
     * Housing Budget in Naira (Under ₦150k, ₦150k-₦250k, ₦250k-₦400k, ₦400k-₦600k, ₦600k+).
     * Off-Campus Move-In Timeline & Referral Source.
   - Success Screen: Displays waitlist position, generated unique referral link (?ref=...), and one-click WhatsApp sharing.
   - Admin Analytics Drawer: Password-protected modal showing total signups, university distribution chart/breakdown, budget ranges, and CSV export.

3. GOOGLE SPREADSHEET INTEGRATION SETUP:
   - Route waitlist submissions to a Google Spreadsheet webhook WITHOUT timestamp or email columns.
   - Create a Google Apps Script linked to your Google Sheet:
     
     function doPost(e) {
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       if (sheet.getLastRow() === 0) {
         sheet.appendRow([
           "Full Name", "Phone Number", "Institution / Campus", "Level of Study",
           "Gender", "Budget Range", "Move-In Timeline", "Referral Source",
           "Referral Code", "Referred By Code", "Queue Position"
         ]);
       }
       var data = JSON.parse(e.postData.contents);
       sheet.appendRow([
         data.fullName,
         data.phone || '',
         data.university,
         data.level,
         data.gender || '',
         data.accommodationNeed,
         data.accommodationTimeline,
         data.referralSource,
         data.referralCode,
         data.referredBy || '',
         data.position
       ]);
       return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
         .setMimeType(ContentService.MimeType.JSON);
     }

   - In the frontend code, send `fetch(GOOGLE_APPS_SCRIPT_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(formData) })` to record submissions directly into Google Spreadsheet.
```

---

## 🛠️ Project Setup & Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation
```bash
# Clone repository
git clone https://github.com/your-org/campora-nigeria.git
cd campora-nigeria

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

---

## 📄 License
© 2026 Campora Nigeria. All Rights Reserved.
