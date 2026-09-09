DAVID'S INSURANCE — EMAIL + PACIFICA CRM LEAD PATCH

WHAT THIS VERSION DOES
- Customer stays on DavidsInsurance.org after pressing Submit.
- Full inquiry is emailed to davidscarinsurance@gmail.com.
- The same submission is also pushed server-to-server into Pacifica CRM as a lead.
- CRM source: David's Insurance Website
- CRM brand: David's Insurance
- CRM disposition: Received - not worked yet
- Auto/Home/Life is preserved as the lead product.
- Name, phone, email and address map into Pacifica's normal lead fields.
- DOB, VIN, vehicle/home/life details and other form fields are preserved in Pacifica's extra lead fields.
- Pacifica already has the inbound lead endpoint, so NO Pacifica CRM code change is required.
- Browser autofill remains enabled and there is no mailto: redirect.

FILES TO UPLOAD TO THE DAVID'S INSURANCE REPO
app/contact/page.tsx
app/api/quote/route.ts

DAVID'S INSURANCE VERCEL ENVIRONMENT VARIABLES

Email:
RESEND_API_KEY=<your David's Insurance Resend key>
QUOTE_FROM_EMAIL=David's Insurance Website <quotes@davidsinsurance.org>
QUOTE_TO_EMAIL=davidscarinsurance@gmail.com

Pacifica CRM:
PACIFICA_CRM_LEAD_URL=<the full Pacifica inbound-lead webhook URL>
PACIFICA_CRM_WEBHOOK_SECRET=<the same lead webhook secret configured in Pacifica CRM>

The Pacifica URL format is:
https://pacificacrm.com/api/integrations/leads?workspace=YOUR_WORKSPACE_ID&source=David%27s%20Insurance%20Website

IMPORTANT
Use the SAME workspace ID and lead webhook secret already used by your working Pacifica inbound-lead/SmartFinancial setup. That places these website leads into the same Pacifica account/workspace instead of another user's workspace.

After adding/updating the variables, redeploy DavidsInsurance.org.

BEHAVIOR IF PACIFICA IS TEMPORARILY DOWN
The website retries the CRM delivery once. If the email succeeds but Pacifica is temporarily unavailable, the customer still sees success so they do not submit duplicates; the CRM failure is written to the Vercel server logs.
