/**
 * Sends the internal "new request" notification email from Nuxt via SendGrid.
 *
 * Replaces the Directus flow that previously fired on `requests` creation.
 * The HTML body comes from emails/compiled/request-notification.html (built
 * from emails/request-notification.mjml via `pnpm emails:build`) and is
 * mounted as a server asset (see nitro.serverAssets in nuxt.config.ts).
 *
 * Safe to call fire-and-forget: it never throws — failures are logged so a
 * mail problem can never break a form submission.
 */
import type { H3Event } from 'h3'
import sgMail from '@sendgrid/mail'
import { requestNotificationHtml } from './emailTemplates'

export interface RequestNotificationData {
  /** Human label for the request kind, e.g. "Contact", "Brand Analysis" */
  request_type: string
  first_name?: string | null
  last_name?: string | null
  email: string
  phone?: string | null
  company?: string | null
  title?: string | null
  /** Already-joined project string */
  project?: string | null
  budget?: string | null
  contact_preference?: string | null
  explanation?: string | null
  /** Directus item id, used to build the admin deep link */
  requestId?: string | number | null
}

const EMPTY = '—'

function fillTemplate(html: string, values: Record<string, string>): string {
  return html
    .replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (_, key) => values[key] ?? '')
    // Drop any placeholder the data didn't provide so nothing leaks to the inbox.
    .replace(/\{\{\s*[a-z_]+\s*\}\}/gi, '')
}

/**
 * Builds the notification HTML from the compiled template + request data.
 * Returns null if the compiled template asset is missing.
 */
export async function renderRequestNotification(
  event: H3Event,
  data: RequestNotificationData,
): Promise<{ html: string; subject: string; fullName: string } | null> {
  const config = useRuntimeConfig(event)
  const template = requestNotificationHtml

  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ').trim()
  const adminBase = (config.public.directusUrl as string).replace(/\/$/, '')
  const adminUrl = data.requestId
    ? `${adminBase}/admin/content/requests/${data.requestId}`
    : `${adminBase}/admin/content/requests`

  const html = fillTemplate(template, {
    request_type: data.request_type,
    full_name: fullName || EMPTY,
    email: data.email,
    phone: data.phone || EMPTY,
    company: data.company || EMPTY,
    title: data.title || EMPTY,
    project: data.project || EMPTY,
    budget: data.budget || EMPTY,
    contact_preference: data.contact_preference || EMPTY,
    explanation: data.explanation || EMPTY,
    date_submitted: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'America/New_York',
    }),
    admin_url: adminUrl,
    unsubscribe_url: '#',
  })

  return {
    html,
    subject: `New ${data.request_type} request${fullName ? ` — ${fullName}` : ''}`,
    fullName,
  }
}

export async function sendRequestNotification(
  event: H3Event,
  data: RequestNotificationData,
): Promise<void> {
  const config = useRuntimeConfig(event)
  const apiKey = config.sendgridApiKey as string

  if (!apiKey) {
    console.warn('[sendRequestNotification] SENDGRID_API_KEY not set — skipping notification')
    return
  }

  try {
    const rendered = await renderRequestNotification(event, data)
    if (!rendered) return

    const { html, subject } = rendered

    sgMail.setApiKey(apiKey)
    await sgMail.send({
      to: config.notifyToEmail as string,
      from: config.notifyFromEmail as string,
      replyTo: data.email,
      subject,
      html,
      trackingSettings: {
        clickTracking: { enable: true, enableText: false },
        openTracking: { enable: true },
      },
    })
  } catch (err: any) {
    // Never let a mail failure bubble up into the submission response.
    console.error('[sendRequestNotification] failed to send:', err?.response?.body ?? err?.message ?? err)
  }
}
