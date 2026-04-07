# GA4 Reporting & Lead Generation Setup Guide

Step-by-step instructions for configuring Google Analytics 4 reports, audiences, and lead generation tracking for huestudios.com.

---

## Prerequisites

- GA4 property with measurement ID set in `NUXT_PUBLIC_GTAG_ID`
- Admin access to the GA4 property
- The `useTracking` composable deployed (fires all custom events listed below)

### Custom Events Reference

| Event | Parameters | Fired When |
|---|---|---|
| `form_start` | `form_type` (contact/audit/subscribe) | User focuses the first form field |
| `form_submit` | `form_type` | Submit button clicked (before API call) |
| `form_success` | `form_type` | Server returns success |
| `form_error` | `form_type`, `error_message` | Server returns error |
| `portfolio_filter` | `filter_type`, `filter_value` | Filter chip clicked on /portfolio |
| `portfolio_item_view` | `item_slug`, `item_title` | Portfolio card clicked |
| `case_study_view` | `case_study_url`, `case_study_title`, `industry` | /case-studies/[url] page loads |
| `cta_click` | `cta_label`, `cta_location` | Any CTA button clicked |
| `package_view` | `package_name`, `package_price` | Service package card enters viewport |
| `industry_page_view` | `industry_slug`, `industry_name` | /industries/[slug] page loads |
| `scroll_depth` | `page_path`, `depth_percent` (25/50/75/100) | User scrolls past threshold |

---

## Step 1 — Mark Conversion Events

Conversion events tell GA4 which interactions represent business value. Without this step, all events are treated equally.

1. Go to **GA4 Admin** (gear icon, bottom-left)
2. Under your property, click **Events** (in the Data display section)
3. Find `form_success` in the event list (it will appear after the first event fires in production)
4. Toggle the **Mark as key event** switch to ON
5. Repeat for `cta_click`

> **Why these two?** `form_success` is your primary lead conversion (someone completed a form). `cta_click` is a secondary engagement signal (someone showed intent but hasn't converted yet). Marking them as key events enables conversion reporting, attribution modeling, and audience building around these actions.

If `form_success` hasn't appeared yet (no production traffic), you can create it manually:

1. On the Events page, click **Create event**
2. Event name: `form_success`
3. No conditions needed (the event is already named correctly from the composable)
4. Save, then mark it as a key event

---

## Step 2 — Register Custom Dimensions

Custom dimensions let you filter and break down reports by your event parameters (like `form_type` or `industry_name`). Without this step, those parameters exist in raw data but can't be used in standard reports.

1. Go to **GA4 Admin → Custom definitions**
2. Click **Create custom dimension** for each row below:

| Dimension name | Scope | Event parameter |
|---|---|---|
| Form Type | Event | `form_type` |
| Error Message | Event | `error_message` |
| Filter Type | Event | `filter_type` |
| Filter Value | Event | `filter_value` |
| Item Slug | Event | `item_slug` |
| Item Title | Event | `item_title` |
| Case Study URL | Event | `case_study_url` |
| Case Study Title | Event | `case_study_title` |
| Industry | Event | `industry` |
| CTA Label | Event | `cta_label` |
| CTA Location | Event | `cta_location` |
| Package Name | Event | `package_name` |
| Package Price | Event | `package_price` |
| Industry Slug | Event | `industry_slug` |
| Industry Name | Event | `industry_name` |
| Page Path (scroll) | Event | `page_path` |
| Depth Percent | Event | `depth_percent` |

> **Note:** GA4 free properties allow up to 50 event-scoped custom dimensions. This list uses 17.

---

## Step 3 — Build the Lead Conversion Funnel

This funnel shows where prospects drop off between first interaction and form completion.

1. Go to **Explore** (left sidebar)
2. Click **Blank** to create a new exploration
3. Name it: `Lead Conversion Funnel`
4. In the **Tab Settings** panel, change Technique to **Funnel exploration**
5. Under **Steps**, add:
   - Step 1: Event = `form_start`
   - Step 2: Event = `form_submit`
   - Step 3: Event = `form_success`
6. Under **Breakdown**, add the `form_type` dimension
7. Click **Apply**

### Reading the funnel

- **Step 1 → Step 2 drop-off**: People who started filling out the form but never hit submit. If this is high (over 50%), the form may be too long or confusing.
- **Step 2 → Step 3 drop-off**: People who submitted but got an error. Cross-reference with `form_error` events to diagnose.
- **Breakdown by form_type**: Compare contact vs. audit vs. subscribe funnels separately. The audit form is longer, so expect a higher drop-off there.

---

## Step 4 — Build the Portfolio-to-Lead Funnel

This funnel tracks the full journey from browsing work to becoming a lead.

1. Create a new **Funnel exploration**
2. Name it: `Portfolio to Lead`
3. Steps:
   - Step 1: Event = `portfolio_item_view`
   - Step 2: Event = `cta_click`
   - Step 3: Event = `form_start`
   - Step 4: Event = `form_success`
4. Make the funnel **open** (toggle at the top) so users can enter at any step
5. Breakdown by `cta_location` to see which CTAs drive the most conversions

---

## Step 5 — Create a Traffic & Engagement Report

This free-form exploration shows which traffic sources and pages drive the most engagement.

1. Create a new **Free form** exploration
2. Name it: `Traffic & Engagement`
3. Add these **Dimensions** (click the + next to Dimensions):
   - Session source / medium
   - Page path
   - Device category
4. Add these **Metrics**:
   - Sessions
   - Key events (this counts your marked conversions)
   - Session key event rate
   - Engagement rate
5. Drag **Session source / medium** to Rows
6. Drag **Sessions**, **Key events**, and **Session key event rate** to Values
7. Sort by **Key events** descending

### Variations to build

- **Swap Rows to Page path**: See which pages lead to the most conversions
- **Swap Rows to Device category**: Compare mobile vs. desktop conversion rates
- **Add a filter**: Event name = `form_success`, then break down by `form_type` to see which form type converts best per source

---

## Step 6 — Create a Scroll Depth Report

This shows how far users read on key pages, helping you decide where to place CTAs.

1. Create a new **Free form** exploration
2. Name it: `Scroll Depth by Page`
3. Dimensions: `page_path` (custom), `depth_percent` (custom)
4. Metrics: Event count, Total users
5. Rows: `page_path`
6. Columns: `depth_percent`
7. Values: Event count
8. Filter: Event name exactly matches `scroll_depth`

### How to use this

- If most users on `/creative-services` only reach 25%, the package cards at the top are the only thing being seen — consider moving the CTA higher.
- If `/case-studies/[url]` pages regularly hit 75-100%, users are deeply engaged — these pages should have a strong CTA near the bottom.
- Compare scroll depth before and after any page layout changes to measure impact.

---

## Step 7 — Build Audiences for Retargeting

Audiences group users by behavior. Once created, they can be synced to Google Ads for remarketing campaigns.

### Audience 1: Form Abandoners

Users who started a form but never completed it.

1. Go to **GA4 Admin → Audiences**
2. Click **New audience → Create a custom audience**
3. Name: `Form Abandoners`
4. Condition group 1 (Include): Event = `form_start`
5. Add exclusion group: Event = `form_success`
6. Membership duration: **7 days**
7. Save

> **Use case:** Retarget these users with Google Ads showing a simplified message like "Still thinking it over? Book a 15-minute call — no pitch decks."

### Audience 2: High-Intent Visitors

Users who viewed case studies AND service packages in the same session.

1. Create a custom audience
2. Name: `High-Intent Visitors`
3. Condition: Event = `case_study_view` AND Event = `package_view`
4. Scope: **Within the same session**
5. Membership duration: **30 days**
6. Save

> **Use case:** These users are comparing your work and pricing. Retarget with testimonials or a "Book a Strategy Session" ad.

### Audience 3: Industry-Specific Prospects

Users who viewed a specific industry page (create one per target industry).

1. Create a custom audience
2. Name: `Prospects — Government`
3. Condition: Event = `industry_page_view` where `industry_slug` = `government-community-development`
4. Exclude: Event = `form_success`
5. Membership duration: **30 days**
6. Save
7. Repeat for other industries (architecture, real estate, professional services, technology)

> **Use case:** Run industry-specific ad campaigns. A government prospect sees government-related case studies in the retargeting ad, not generic creative work.

### Audience 4: Engaged Non-Converters

Users who scrolled deep on multiple pages but never submitted a form.

1. Create a custom audience
2. Name: `Engaged Non-Converters`
3. Condition: Event = `scroll_depth` where `depth_percent` >= 75 (at least 2 occurrences)
4. Exclude: Event = `form_success`
5. Membership duration: **14 days**
6. Save

> **Use case:** These users consumed your content thoroughly. They may need a different CTA — try "Download our capabilities deck" instead of "Book a call."

---

## Step 8 — Connect Audiences to Google Ads

1. Go to **GA4 Admin → Product links → Google Ads links**
2. Click **Link** and select your Google Ads account
3. Enable **Personalized advertising**
4. Save

Once linked, all audiences created in Step 7 automatically appear in Google Ads under **Tools → Audience manager**. You can then use them in campaign targeting.

---

## Step 9 — Build a Looker Studio Dashboard

Looker Studio (free) gives you a live dashboard you can share with your team.

1. Go to [lookerstudio.google.com](https://lookerstudio.google.com)
2. Click **Create → Report**
3. Add data source: **Google Analytics 4** → select your property
4. Build these panels:

### Panel 1: Daily Leads

- Chart type: **Time series**
- Dimension: Date
- Metric: Key events (filtered to `form_success`)
- Breakdown: `form_type`

### Panel 2: Leads by Source

- Chart type: **Table**
- Dimension: Session source / medium
- Metrics: Sessions, Key events, Session key event rate
- Sort by: Key events descending

### Panel 3: Funnel Health (Scorecard row)

Four scorecards side by side:

| Scorecard | Metric | Filter |
|---|---|---|
| Form Starts | Event count | event_name = `form_start` |
| Form Submits | Event count | event_name = `form_submit` |
| Form Successes | Event count | event_name = `form_success` |
| Form Errors | Event count | event_name = `form_error` |

### Panel 4: Top Converting Pages

- Chart type: **Table**
- Dimension: Page path
- Metrics: Sessions, Key events
- Sort by: Key events descending
- Filter: Key events > 0

### Panel 5: Industry Demand

- Chart type: **Bar chart**
- Dimension: `industry_name` (custom dimension)
- Metric: Event count
- Filter: event_name = `industry_page_view`

> **Tip:** Add a date range control at the top of the dashboard so you can compare periods (e.g., this month vs. last month).

---

## Step 10 — A/B Testing with GA4 Data

GA4 doesn't have a built-in A/B testing tool (Google Optimize was sunset in 2023), but the events you have make it straightforward to measure tests.

### Simple before/after test

1. Make one change at a time (e.g., change the homepage CTA from "Start Your Free Analysis" to "Get Your Brand Score")
2. Note the date of the change
3. In a Free form exploration, compare `cta_click` counts where `cta_location` = `homepage_audit_cta` for the two date ranges
4. Also compare downstream `form_success` counts to ensure the new CTA doesn't just get clicks but also converts

### Using a testing tool with GA4

If you use a tool like Convert, AB Tasty, or VWO:

1. The testing tool assigns users to variants and sends a custom event to GA4 (e.g., `experiment_variant` with parameter `variant_name`)
2. In GA4, create a Free form exploration filtered by `variant_name`
3. Compare `form_success` rates between variant A and variant B
4. Use the audiences from Step 7 as targeting criteria for experiments

### What to test (prioritized by impact)

1. **CTA copy on homepage hero** — Measure via `cta_click` where `cta_location` = `homepage_hero`
2. **Contact form length** — Remove optional fields, measure `form_start` → `form_success` rate
3. **Package pricing display** — Test showing vs. hiding prices, measure `package_view` → `cta_click` rate
4. **Brand analysis page headline** — Measure `form_start` rate for `audit` form type
5. **Portfolio page layout** — Compare `scroll_depth` and `portfolio_item_view` counts

---

## Step 11 — Enable GA4 DebugView for Verification

Use this to confirm events are firing correctly before analyzing data.

1. Install the **Google Analytics Debugger** Chrome extension
2. Enable the extension (click the icon, it turns orange)
3. Go to **GA4 Admin → DebugView**
4. Open your site in the same Chrome browser
5. You should see events appearing in real-time as you interact with the site

### Verification checklist

- [ ] Load the homepage → `scroll_depth` events appear at 25/50/75/100 as you scroll
- [ ] Click "Start Your Free Analysis" → `cta_click` with `cta_location` = `homepage_audit_cta`
- [ ] Navigate to /contact → click the First Name field → `form_start` with `form_type` = `contact`
- [ ] Fill out and submit the contact form → `form_submit` then `form_success` (or `form_error`)
- [ ] Navigate to /portfolio → click a project card → `portfolio_item_view` with slug and title
- [ ] Navigate to /creative-services → scroll to packages → `package_view` events for each card
- [ ] Navigate to /industries/[any] → `industry_page_view` with slug and name
- [ ] Navigate to /case-studies/[any] → `case_study_view` with URL, title, and industry

---

## Ongoing Maintenance

### Weekly

- Check the Looker Studio dashboard for lead volume trends
- Review `form_error` events for any new submission failures

### Monthly

- Review the scroll depth report — if a page's average depth drops, investigate content changes
- Check audience sizes in GA4 — if "Form Abandoners" is growing faster than "Form Successes," the form experience needs attention
- Compare conversion rates by source/medium to adjust ad spend

### Quarterly

- Review the full portfolio-to-lead funnel for structural drop-offs
- Evaluate which industries are generating the most page views vs. leads (high views + low leads = content gap)
- Archive or update audiences that are no longer relevant
