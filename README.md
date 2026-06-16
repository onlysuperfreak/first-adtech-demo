# Bronx Pro Renovations Landing Page Demo

Live demo: https://onlysuperfreak.github.io/first-adtech-demo/

Bronx Pro Renovations is a fictional local contractor website built as a portfolio demo. It shows how a lead-generation landing page can help a home renovation business capture quote requests and understand which marketing campaigns are bringing in leads.

The project is built with plain HTML, CSS, and JavaScript. It is intentionally simple and beginner-friendly, while still demonstrating real business concepts such as campaign tracking, form capture, and dashboard reporting.

## Project Purpose

This demo represents a landing page for a local contractor that offers services like kitchen remodeling, bathroom remodeling, basement finishing, drywall repair, painting, and general renovation work.

The goal is to show how a small service business could use a focused landing page to turn website visitors into leads. Instead of sending paid ad traffic to a generic homepage, the business can send visitors to a page that explains the services, builds trust, and makes it easy to request an estimate.

## Business Problem It Solves

Local contractors often spend money on Google Ads, Facebook Ads, referrals, flyers, or local search traffic, but they may not know which source is generating actual customer inquiries.

This demo helps solve that problem by showing how a landing page can:

- Present the contractor's services clearly
- Encourage homeowners to call or request a quote
- Capture project details through a form
- Save basic campaign tracking information with each lead
- Show a simple business owner dashboard for reviewing lead activity

For a real business, this kind of setup can help answer important questions like:

- Which ads are generating quote requests?
- Which services are people asking about most?
- Are leads coming from paid ads, social media, or direct traffic?
- What recent inquiries need follow-up?

## Features

- Responsive landing page that works on desktop and mobile
- Clear hero section with calls to action
- Service cards for common contractor jobs
- Project example gallery
- Trust-focused copy, testimonials, and FAQ section
- Quote request form with front-end validation
- UTM tracking for basic campaign attribution
- `localStorage` lead capture for demo purposes
- Business owner dashboard showing saved lead activity
- Dashboard breakdowns for total leads, services requested, traffic sources, and recent inquiries
- Clear demo leads button for resetting saved browser data

## How The Demo Works

When someone submits the quote form, the JavaScript checks the required fields, creates a lead record, and saves it in the browser using `localStorage`.

If the visitor arrived with UTM parameters in the URL, those campaign values are saved and attached to the lead. This simulates how a real landing page might track whether a lead came from Google Ads, Facebook Ads, email, or another campaign.

Because this is a front-end portfolio demo, the form does not send data to a real business. The saved leads only exist in the visitor's browser.

## How To Test UTM Tracking

Use this live test URL:

https://onlysuperfreak.github.io/first-adtech-demo/?utm_source=google&utm_medium=cpc&utm_campaign=kitchen_remodeling

To test the tracking:

1. Open the live UTM test URL above.
2. Submit the quote request form with sample information.
3. Scroll to the demo dashboard section.
4. Click the button to show the lead dashboard if it is not already open.
5. Confirm that the submitted lead includes the traffic source from the UTM values.

The demo tracks these UTM fields when they are present:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`

If no UTM values are found, the lead is marked as `direct/unknown`.

## Business Owner Dashboard

The dashboard is included to show how a contractor or office manager could quickly review lead activity without needing to inspect raw form data.

The dashboard shows:

- Total saved leads
- Leads by service type
- Leads by traffic source
- Most recent lead submissions

This is only a browser-based demo, but it illustrates the type of reporting a real client might want from a campaign landing page.

## Project Files

- `index.html` contains the page content and structure.
- `styles.css` contains the responsive layout and visual styling.
- `script.js` handles form validation, UTM tracking, lead saving, dashboard updates, and FAQ behavior.

## How This Could Be Expanded For A Real Client

For a real contractor or local service business, this demo could be expanded with production-ready lead handling and marketing integrations.

Possible upgrades include:

- Email notifications when a new quote request is submitted
- Saving leads automatically to Google Sheets
- CRM integration with tools such as HubSpot, Jobber, Housecall Pro, or GoHighLevel
- Backend database storage for secure lead management
- Paid ad tracking for Google Ads, Meta Ads, and other platforms
- Google Analytics or another analytics platform
- Conversion tracking for form submissions and phone calls
- Spam protection for the quote form
- A thank-you page after form submission
- Real project photos, verified reviews, and real business contact information

## Demo Note

Bronx Pro Renovations is a fictional business created for portfolio demonstration purposes. This project shows how a conversion-focused landing page can help a local service business capture leads and understand where those leads came from.