DAVID'S INSURANCE — CRM SECRET-ONLY FIX

You already uploaded the DOB + calendar patch, so this ZIP ONLY updates:
app/api/quote/route.ts

It does NOT replace app/contact/page.tsx, so your DOB typing + calendar stays exactly as-is.

The CRM route accepts any of these Vercel environment variable names:
- PACIFICA_CRM_WEBHOOK_SECRET
- LEAD_WEBHOOK_SECRET
- SMARTFINANCIAL_WEBHOOK_SECRET

After uploading, redeploy the David's Insurance Vercel project.
