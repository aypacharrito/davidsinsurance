DAVID'S INSURANCE — DIRECT QUOTE SUBMIT PATCH

WHAT THIS FIXES
- Removes the current mailto: form submission.
- Submit stays on the same page.
- Sends securely to /api/quote over HTTPS.
- Sends the full inquiry to davidscarinsurance@gmail.com.
- Shows Sending... then ✓ Request received.
- Keeps browser autofill enabled for name, DOB, phone, email, and address.
- Replying to the notification email replies directly to the customer.

FILES
app/contact/page.tsx
app/api/quote/route.ts

REQUIRED AFTER UPLOAD
In Vercel, add this Environment Variable to the DavidsInsurance.org project:
RESEND_API_KEY=<your Resend API key>

Then redeploy.

Optional:
QUOTE_TO_EMAIL=davidscarinsurance@gmail.com
QUOTE_FROM_EMAIL=David's Insurance Website <quotes@pacificacrm.com>

The current verified Resend sending domain is pacificacrm.com, so the default sender uses quotes@pacificacrm.com.
Later, after davidsinsurance.org is verified in Resend, you can change the sender to quotes@davidsinsurance.org.

UPLOAD
Unzip this ZIP first. In GitHub use Add file → Upload files and upload the contents, preserving:
app/contact/page.tsx
app/api/quote/route.ts
