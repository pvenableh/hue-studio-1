/**
 * Sends the visitor-facing "we received your request" confirmation email from
 * Nuxt via SendGrid.
 *
 * This is Hue's own branded confirmation, independent of Directus/Earnest — it
 * replaces the old Earnest "Request Notification" flow's customer-facing email.
 * The HTML comes from emails/compiled/request-confirmation.html (built from
 * emails/request-confirmation.mjml via `pnpm emails:build`) and is inlined into
 * ./emailTemplates by scripts/build-emails.mjs.
 *
 * Safe to call fire-and-forget: it never throws — failures are logged so a mail
 * problem can never break a form submission.
 */
import type { H3Event } from 'h3'
import sgMail from '@sendgrid/mail'
import { requestConfirmationHtml } from './emailTemplates'

export interface RequestConfirmationData {
  /** Human label for the request kind, e.g. "Contact", "Brand Analysis" */
  request_type: string
  first_name?: string | null
  /** Recipient — the visitor who submitted the form */
  email: string
}

function fillTemplate(html: string, values: Record<string, string>): string {
  return html
    .replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (_, key) => values[key] ?? '')
    // Drop any placeholder the data didn't provide so nothing leaks to the inbox.
    .replace(/\{\{\s*[a-z_]+\s*\}\}/gi, '')
}

/** A gentle, on-brand request-type phrase for the body copy. */
function friendlyType(type: string): string {
  const t = (type || '').trim().toLowerCase()
  if (!t || t === 'contact') return ''
  return t
}

export async function sendRequestConfirmation(
  event: H3Event,
  data: RequestConfirmationData,
): Promise<void> {
  const config = useRuntimeConfig(event)
  const apiKey = config.sendgridApiKey as string

  if (!apiKey) {
    console.warn('[sendRequestConfirmation] SENDGRID_API_KEY not set — skipping confirmation')
    return
  }

  try {
    const siteUrl = (config.public.siteUrl as string || 'https://huestudios.com').replace(/\/$/, '')
    const firstName = (data.first_name || '').trim() || 'there'
    const typePhrase = friendlyType(data.request_type)

    const html = fillTemplate(requestConfirmationHtml, {
      first_name: firstName,
      // Trailing space so the copy reads "your request" or "your brand analysis request"
      request_type: typePhrase ? `${typePhrase} ` : '',
      cta_url: `${siteUrl}/portfolio`,
    })

    sgMail.setApiKey(apiKey)
    await sgMail.send({
      to: data.email,
      from: config.notifyFromEmail as string,
      replyTo: 'contact@huestudios.com',
      subject: `Thanks, ${firstName} — we've received your request`,
      html,
      trackingSettings: {
        clickTracking: { enable: true, enableText: false },
        openTracking: { enable: true },
      },
    })
  } catch (err: any) {
    // Never let a mail failure bubble up into the submission response.
    console.error('[sendRequestConfirmation] failed to send:', err?.response?.body ?? err?.message ?? err)
  }
}
