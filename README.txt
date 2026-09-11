DAVID'S INSURANCE HUMAN COPY + LINK PREVIEW

What this changes

1. Homepage copy
   The wording is shorter, more natural, and focused on helping customers find coverage that fits their needs and budget.

2. Less corporate grammar
   The long dash style is removed from the main marketing copy. Sentences are shorter and sound more like a real agent.

3. Better share preview
   When davidsinsurance.org is shared in apps that support Open Graph previews, the site now uses:
   "Save money on insurance without cutting the coverage you need."
   "Auto, home and life insurance with real help finding a rate that fits your budget."

4. Simple preview image
   Adds a 1200 x 630 social preview that says:
   "Save money. Stay covered."

5. Contact page
   The included patch changes the intro to:
   "Tell us what you need and we’ll do the work to find coverage that fits your needs and your budget. No pressure."
   It also changes the success message to:
   "Got it. David will reach out shortly."

HOW TO APPLY WITH GIT

Put DAVIDS_HUMAN_COPY_AND_LINK_PREVIEW.patch in the davidsinsurance repo root, then run:

git apply DAVIDS_HUMAN_COPY_AND_LINK_PREVIEW.patch
git add app/page.tsx app/layout.tsx app/components.tsx app/contact/page.tsx app/opengraph-image.tsx
git commit -m "Make site copy more human and improve link preview"
git push

The app/page.tsx, app/layout.tsx, app/components.tsx, and app/opengraph-image.tsx files are also included as direct replacements.
