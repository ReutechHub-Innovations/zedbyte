Changelog / Follow-up (FU)

Summary of UI/UX fixes (applied):

- Contact information updated to Zambian company details:
  - Primary phone: 0970067982
  - Secondary phone: 0769963307
  - Email: zedbytesoluttions@gmail.com
  - WhatsApp CTA now uses the primary Zambian number (+260970067982)
- Footer:
  - Rewritten and restyled to a single, polished footer.
  - Shows both phone numbers and the new email.
- Admin access:
  - Removed the public "Admin" link from the header so the admin login is not visible in navigation.
  - Added a secret admin login path at `/z-login` and protected the dashboard route with a private route check.
- Duplicate footer:
  - Removed duplicate Footer render from `Home.jsx` (Footer is rendered by `App.jsx`).
- Contrast & layout:
  - Improved global theme and card colors for stronger contrast (see `client/src/styles/globals.css`).
  - Updated About, Projects, Contact and Home page layouts for cleaner sections, modern cards, and consistent spacing.
  - Added a sitewide light/dark toggle in the header for a stronger user experience.
- WhatsApp quick-action:
  - Floating WhatsApp button included at app-level; default now points at the Zambian number.

Follow-up / next steps (recommended):

1. Replace placeholder graphics and photos with brand assets (logo, hero image).
2. Hook the contact form to the backend API (create endpoint `/api/contact` and validate/send emails).
3. Secure admin routes with environment-based auth and move login behind a secret path or VPN for production.
4. Run accessibility audits (axe/lighthouse) and fix color-contrast issues that remain for specific color-blind palettes.
5. Review `package.json` and fix any vulnerabilities reported by `npm audit` before deployment.

How to test locally:

1. Start the backend:

   cd server
   npm install
   npm start

2. Start the client:

   cd client
   npm install
   npm start

3. Visit http://localhost:3000 and verify:
   - Header no longer shows "Admin" link
   - Only one footer present
   - Footer displays new email and both phone numbers
   - WhatsApp button opens chat with +260970067982 (mobile or web)
   - Contact page shows updated contact details and improved layout

If you'd like, I can now:
- Wire the contact form to the backend and add server-side email sending, or
- Hide the admin route behind a secret path (e.g., `/s3cr3t-admin-login`) and add basic auth.


