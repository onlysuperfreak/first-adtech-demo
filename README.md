# Bronx Pro Renovations Landing Page Demo

Bronx Pro Renovations is a fictional local contractor landing page built with plain HTML, CSS, and JavaScript. It is designed as a professional portfolio demo for a home renovation business serving homeowners in the Bronx and lower Westchester.

The page is structured like a real lead-generation website for services such as kitchen remodeling, bathroom remodeling, basement finishing, drywall repair, painting, and general home renovation work.

## Business Problem

Local contractors often rely on phone calls, referrals, and paid ads to generate new project leads. When a homeowner clicks an ad, the landing page needs to quickly answer a few important questions:

- Does this contractor handle the type of work I need?
- Do they serve my area?
- Can I trust them enough to request an estimate?
- Is it easy to call or submit my project details?

This demo solves that problem by giving homeowners a clear, focused page with strong calls to action, trust-building copy, service details, project examples, testimonials, FAQs, and a working front-end lead form.

## Features

- Responsive landing page for desktop and mobile
- Sticky header with business name, phone number, and quote CTA
- Hero section with clear homeowner-focused messaging
- Service cards for kitchen, bathroom, basement, drywall, painting, and general renovation work
- Why-choose-us section with trust-focused copy
- Before/after project gallery using placeholder images
- Lead capture form with front-end validation
- Success and error messages without refreshing the page
- UTM tracking simulation for ad attribution
- Saved lead dashboard using `localStorage`
- Lead reporting section with:
  - Total leads
  - Leads by service type
  - Leads by traffic source
  - Most recent leads
  - Clear demo leads button
- FAQ accordion behavior
- Smooth scrolling and polished hover/focus states

## How The Lead Form Works

The form is handled entirely in `script.js`.

When a visitor submits the form:

1. JavaScript prevents the page from refreshing.
2. The required fields are checked:
   - Name
   - Phone
   - Service needed
   - Zip code
   - Project details
3. If anything is missing, the page shows a clean error message and highlights the missing fields.
4. If the form is valid, JavaScript creates a lead object with the submitted details.
5. The lead is saved to `localStorage`.
6. The lead object is logged in the browser console.
7. A success message is shown below the form.
8. The form clears after submission.
9. If the dashboard is open, it updates automatically.

This makes the page feel like a real lead capture experience while staying fully front-end only.

## How UTM Tracking Works

The project includes a basic ad tracking simulation.

When the page loads, JavaScript checks the URL for common UTM parameters:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`

Example URL:

```text
index.html?utm_source=google&utm_medium=cpc&utm_campaign=kitchen_remodel&utm_content=bronx_ad
```

If UTM values are found, they are stored in `localStorage`. When a visitor submits the lead form, those tracking values are attached to the lead.

If no UTM values are found, the lead is marked as:

```text
direct/unknown
```

The saved lead dashboard then shows where each lead came from, such as Google Ads, Facebook, email, or direct traffic.

## How localStorage Is Used

This project uses `localStorage` to simulate a simple browser-based database.

Two types of data are stored:

- Submitted leads
- Captured UTM tracking values

Because `localStorage` only exists in the visitor's browser, this is not a production lead storage method. It is useful for a demo because it shows how the front-end logic works without needing a server, database, or third-party integration.

The "Clear Demo Leads" button removes saved demo leads from `localStorage`, but it does not clear the captured UTM visit data.

## Project Files

- `index.html` contains the page structure and content.
- `styles.css` contains the responsive layout, visual design, form styling, and dashboard styling.
- `script.js` contains form validation, lead saving, UTM tracking, FAQ behavior, and dashboard reporting.

## How This Could Become A Real Client Project

This demo could be expanded into a real contractor landing page by replacing the placeholder business details with verified client information, including:

- Real phone number and email address
- Real service area
- Actual license and insurance details
- Real project photos
- Real testimonials or reviews
- Real privacy policy and terms
- Analytics and conversion tracking
- Live form delivery

For a contractor running paid ads, this type of page could become a dedicated campaign landing page for Google Ads, Meta Ads, local SEO, or direct mail QR codes.

## Suggested Next Steps

To turn this into a production-ready client project, the form should be connected to a real lead delivery system.

Good next steps include:

- Send form submissions to the business owner's email
- Save leads to Google Sheets
- Connect leads to a CRM such as HubSpot, Jobber, Housecall Pro, or GoHighLevel
- Store leads in a backend database
- Add spam protection
- Add Google Analytics or another analytics platform
- Add Google Ads conversion tracking
- Add call tracking for phone leads
- Add a thank-you page after form submission
- Add photo upload support for project requests
- Replace placeholder images with real project photos

## Demo Note

Bronx Pro Renovations is a fictional demo business. This project was created to show how a simple, conversion-focused landing page can help a local service business capture and understand homeowner leads.
