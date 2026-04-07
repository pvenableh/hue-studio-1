# Analytics Dashboard Setup

Instructions for authorizing the GA4 analytics dashboard at `/analytics`.

---

## Prerequisites

- A Google Cloud project (create one at [console.cloud.google.com](https://console.cloud.google.com) if needed)
- Admin access to the huestudios.com GA4 property

---

## Step 1 — Enable the Google Analytics Data API

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services → Enable APIs and Services**
4. Search for **Google Analytics Data API**
5. Click **Enable**

---

## Step 2 — Create a Service Account

1. In the same Google Cloud project, go to **IAM & Admin → Service Accounts**
2. Click **Create Service Account**
3. Name it `huestudios-analytics` (or any name you prefer)
4. Click through to finish (no optional permissions needed)
5. Click the newly created service account
6. Go to the **Keys** tab
7. Click **Add Key → Create new key → JSON**
8. Download the JSON key file — keep this safe, you'll need it in Step 4

---

## Step 3 — Grant the Service Account Access to GA4

1. Go to your GA4 property at [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (gear icon, bottom-left)
3. Under Account, click **Account Access Management**
4. Click the **+** button → **Add users**
5. Paste the service account email address (found in the JSON key file under `client_email` — it ends in `@...gserviceaccount.com`)
6. Set the role to **Viewer**
7. Click **Add**

---

## Step 4 — Find Your GA4 Property ID

1. In GA4, go to **Admin → Property Settings**
2. Copy the **Property ID** — this is a numeric value like `123456789`
3. This is NOT the measurement ID that starts with `G-`

---

## Step 5 — Add Environment Variables

Add these to your `.env` file (never commit this file):

```env
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
GA4_PROPERTY_ID=123456789
ANALYTICS_PASSWORD=your-chosen-password
```

### Notes on each variable

- **GOOGLE_SERVICE_ACCOUNT_JSON** — The entire contents of the downloaded JSON key file, minified to a single line. Open the file, select all, and paste it as one line.
- **GA4_PROPERTY_ID** — The numeric property ID from Step 4.
- **ANALYTICS_PASSWORD** — The password required to access the `/analytics` page. Choose something secure.

---

## Step 6 — Restart and Verify

1. Restart the dev server (`pnpm dev`)
2. Navigate to `/analytics`
3. Enter the password you set in `ANALYTICS_PASSWORD`
4. The dashboard should load with live data within 1-2 seconds

### Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| 500 error after login | Invalid `GOOGLE_SERVICE_ACCOUNT_JSON` | Check the JSON is valid and on a single line in `.env` |
| 500 error — "GA4_PROPERTY_ID not set" | Missing env var | Add `GA4_PROPERTY_ID` to `.env` and restart |
| Data loads but all panels show zero | No matching events in the last 30 days | This is expected if the site hasn't had US traffic or form events yet |
| 403 from Google API | Service account lacks access | Repeat Step 3 — make sure the service account email has Viewer role on the GA4 property |
| "Wrong password" on correct password | Env var not loaded | Restart the dev server after changing `.env` |

---

## What the Dashboard Shows

All data is filtered to **United States traffic only** (to exclude spam from other countries).

- **Scorecard row** — Total leads, form starts, conversion rate, and form errors (last 30 days)
- **Daily Leads chart** — Line chart of `form_success` events per day
- **Funnel Health** — form_start → form_submit → form_success → form_error with drop-off percentages
- **Leads by Source** — Top 10 traffic sources ranked by conversions
- **Top Converting Pages** — Top 10 pages ranked by conversions

---

## Files Reference

| File | Purpose |
|---|---|
| `server/api/analytics.get.ts` | Server route that queries the GA4 Data API |
| `server/api/analytics-auth.post.ts` | Password validation endpoint |
| `app/components/AnalyticsDashboard.vue` | Dashboard UI component |
| `app/pages/analytics.vue` | Password-gated page at `/analytics` |
