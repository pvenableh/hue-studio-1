# Hue — Lead-Capture & Business-Performance Audit

**Date:** 2026-06-30 · **Data window:** Last 90 days (US traffic), vs. prior 90 days · **Source:** GA4 via `/api/analytics`

> Scope: conversion performance, lead-capture flow, language/voice, and the text-vs-visuals balance on the marketing site. Numbers are live from GA4; qualitative findings come from a full flow map of `app/`.

---

## TL;DR

The site looks polished and holds attention reasonably well, but **it is not converting.** Over the last 90 days it produced **1 lead** (`form_success`) from ~250 real users. The problem is not traffic quality — the right people (Florida + New York) are showing up and engaging with the *work*. The problem is the **path from interest → contact**, plus **measurement that can't currently tell us what's working.**

Three things, in priority order:
1. **Fix tracking** so success = actual leads and CTA performance is measurable. (Today it isn't.)
2. **Cut form friction** — the funnel collapses at the form, not before it.
3. **Lean harder into work-first** — the data already proves it out-converts prose.

---

## 1. The numbers (last 90 days, US)

| Metric | This period | Prior 90 days | Read |
|---|---|---|---|
| Sessions | 387 | 389 | Flat |
| Active users | 254 | 306 | ↓ |
| Engagement rate | 34.4% | 42.4% | ↓ |
| Avg. session duration | 3m 51s | 4m 56s | ↓ |
| **Form starts** | **20** | **2** | ↑ (intent rising) |
| **Form submits** | **2** | 0 | — |
| **Leads (`form_success`)** | **1** | **0** | **Critical** |

**The funnel:** `form_start 20 → form_submit 2 → form_success 1`.
- Only **~5% of sessions** even reach a form start (20 / 387).
- Of those, **90% abandon before submitting** (20 → 2).
- Net: **~1 lead per quarter.** This is the headline problem.

The rise in form starts (2 → 20) is encouraging — recent CTA work is creating *intent* — but that intent is dying inside the forms.

---

## 2. Critical finding: measurement is misconfigured

Before optimizing, the instrumentation has to be trustworthy. Right now it isn't:

- **GA4 "conversions" ≠ leads.** GA4 reports 54 conversions on `/case-studies`, 30 on `/portfolio`, 13 on `/` — while actual leads = **1**. Some non-lead event is flagged as a conversion in GA4, so every "conversion" chart overstates success by ~50×. **Action:** redefine the GA4 key event to `form_success` (+ `meeting`/`audit` submits) only.
- **CTA performance is invisible.** `cta_click`, `portfolio_item_view`, and `case_study_view` fire with `cta_label` / `cta_location` / `item_title` params, but those **custom dimensions aren't registered in GA4**, so the breakdowns come back empty. We literally cannot see which CTA or which location converts. **Action:** register the custom dimensions in GA4 Admin so the events we already send become analyzable. (This also unlocks measuring the new sticky CTA and case-study bridge.)
- **Bot/datacenter traffic is inflating volume.** Top "cities" include Ashburn VA, Council Bluffs IA, and Boardman OR — all cloud datacenters, all at **0% engagement**. Real engaged traffic is meaningfully lower than 387. **Action:** enable GA4 bot filtering / exclude known datacenter regions for clean reporting.

**Until these are fixed, we're optimizing blind.** This is the cheapest, highest-leverage work on the list.

---

## 3. Where the conversion breaks (and why)

The 20 → 2 collapse points at **form friction**, which the qualitative flow map corroborates:

- **Contact form:** 7 fields (incl. budget, industry, project-type dropdowns).
- **Brand Perception Analysis:** 13 fields across 3 sections.
- **Meeting modal:** name, email, company, meeting type, date, time, notes.

For a first touch from a cold visitor, that's a lot of commitment before any value is returned. The intent exists (20 starts); the ask is too big.

**Recommendations (highest impact first):**
1. **Make the first step tiny.** Lead with a 1–2 field capture (name + email, or just email) and *progressively profile* afterward. The existing `InlineCapture` component already does this — it just isn't on the high-traffic pages. Put a low-friction capture on the home page and at the end of `/portfolio` and `/case-studies` (the pages that already engage best — see §4).
2. **Split the long forms into steps.** Contact and Brand-Analysis should reveal fields progressively, not present a wall. Perceived effort drops sharply; completion rises.
3. **Put social proof next to the ask.** No testimonials/logos sit beside the primary CTAs today. A single client logo strip or one-line result next to a form measurably lifts completion.
4. **Default to the lowest-friction conversion.** "Book a Call" (modal) and the free Brand Analysis are softer asks than a full project brief — surface them first, treat the long contact form as the path for already-warm visitors.

**Already shipped this session that addresses this** (validate once tracking is fixed):
- Persistent **sticky "Book a Call"** CTA (appears after the hero, hides at the footer).
- **Conversion bridge** right after the case studies (peak-interest moment).
- **Work-first reorder** so proof comes before prose.

---

## 4. Audience & content: the good news

- **Right people, right markets.** Highest-engagement cities are **Pompano Beach (70%), Miami Gardens (78%), New York (16%)** — exactly Hue's footprint. The targeting is working; the audience just isn't being converted.
- **Work out-engages words — decisively.** Engagement by landing page: **Portfolio 55%, Case Studies 40%**, vs. **Home 37%, About 20%** (80% bounce). This is direct evidence for the work-first redesign. **Double down:** lead with work everywhere, keep compressing prose (the reveal-on-interaction pattern we added is the right move — extend it to About and Services).
- **Desktop-dominant:** 80% desktop / 20% mobile / <1% tablet — a B2B signature. Mobile polish still matters for referral clicks, but design decisions should be desktop-first.

---

## 5. Top-of-funnel: discovery is thin

- **Channel mix:** 65% direct (253/387), one strong referral (**Miami Beach Chamber**, 29 sessions / good engagement), and only **~27 organic-search sessions in 90 days** — weak SEO presence. (`vercel.com` referrals are deploy-preview noise, not real visitors.)
- **Emerging signal:** `chatgpt.com` referrals are appearing — AI-search discovery is starting. Worth leaning into (clear, well-structured content the models can cite).
- **Implications:**
  - The Portfolio and Case Study pages already engage well *and* are your best SEO assets — invest in their search visibility.
  - Nurture the Chamber relationship; it's the one referral channel that works.
  - Volume itself is a constraint (~250 real users/quarter). Even a great conversion rate on this traffic is a handful of leads — so **traffic growth and conversion fixes both matter**, but conversion + measurement come first because they're cheap and currently broken.

---

## 6. Language & voice

The voice is a genuine asset: confident, editorial, low-pressure — the italic-accent word ("Design with *Purpose*"), "no pitch decks — just a conversation," specific reassurances ("Free. Confidential. No obligation."). **Keep it.** Notes:
- It leans toward *brand poetry* over *visitor clarity* in places (e.g., the philosophy quote). Pair every evocative line with one plain-language "here's what you get."
- CTA labels are good but inconsistent in commitment level ("Schedule a Discovery Call" vs "Book a Call" vs "Start Your Free Analysis"). Standardize on a soft primary ("Book a Call") and reserve the heavy ask for warm pages.
- The reassurance language belongs *next to the forms themselves*, not only in surrounding copy.

---

## Prioritized action list

| # | Action | Effort | Impact | Owner |
|---|---|---|---|---|
| 1 | Redefine GA4 key event to real leads; register `cta_*` / `item_title` custom dimensions; enable bot filtering | Low | **High** (unblocks all measurement) | Analytics |
| 2 | Add low-friction capture (1–2 fields) on Home, Portfolio, Case Studies | Med | **High** | Web |
| 3 | Split Contact + Brand-Analysis into progressive steps | Med | High | Web |
| 4 | Add social proof beside primary CTAs | Low | Med | Web |
| 5 | Validate sticky CTA + bridge against clean funnel data | Low | Med | Analytics |
| 6 | Extend reveal-on-interaction / work-first to About + Services | Med | Med | Web |
| 7 | SEO investment in Portfolio + Case Study pages; nurture Chamber + AI-referral channels | High | Med (longer horizon) | Marketing |

**Bottom line:** the redesign instincts are right and the audience is right. The blockers are (1) you can't currently measure what converts, and (2) the forms ask too much, too soon. Fix those two and the work-first momentum we've built should start producing real leads.

---

*Generated from live GA4 data on 2026-06-30. Re-run `/api/analytics?range=90d` to refresh. Figures reflect US traffic.*
