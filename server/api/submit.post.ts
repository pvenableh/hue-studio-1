/**
 * Server-side form submission handler
 *
 * Proxies website form submissions to Directus using the static token.
 * Four submission types:
 *   - "contact"    → creates contact + lead + request (high-intent)
 *   - "audit"      → creates contact + lead + request (mid-funnel)
 *   - "subscribe"  → creates/upserts contact + mailing list subscription (top-of-funnel)
 *   - "meeting"    → creates contact + lead + meeting_request (highest-intent)
 *
 * The static token never reaches the client.
 */

const HUE_ORG_ID = '423f5e7e-e14c-4348-9fea-89ba5c6b9d96'
const DEFAULT_MAILING_LIST_ID = 1

interface SubmitPayload {
  type: 'contact' | 'audit' | 'subscribe' | 'meeting'
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  company?: string
  title?: string
  project?: string
  explanation?: string
  budget?: string
  contact_preference?: string
  // Audit-specific
  audit_answers?: Record<string, string>
  // Subscribe-specific
  list_id?: number
  // Meeting-specific
  meeting_type?: string
  preferred_date?: string
  preferred_time?: string
  duration?: number
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.directusUrl as string
  const token = config.directusStaticToken

  if (!token) {
    throw createError({ statusCode: 500, message: 'Directus token not configured' })
  }

  const body = await readBody<SubmitPayload>(event)

  if (!body?.email) {
    throw createError({ statusCode: 400, message: 'Email is required' })
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  // Helper to POST to Directus
  async function directusCreate<T = any>(collection: string, data: Record<string, any>): Promise<T> {
    const res = await $fetch<{ data: T }>(`${baseUrl}/items/${collection}`, {
      method: 'POST',
      headers,
      body: data,
    })
    return res.data
  }

  // Helper to find existing contact by email
  async function findContactByEmail(email: string): Promise<any | null> {
    const res = await $fetch<{ data: any[] }>(`${baseUrl}/items/contacts`, {
      headers,
      params: {
        'filter[email][_eq]': email.toLowerCase().trim(),
        'fields': 'id,first_name,last_name,email',
        'limit': 1,
      },
    })
    return res.data?.[0] ?? null
  }

  // Step 1: Upsert contact
  let contact = await findContactByEmail(body.email)

  if (!contact) {
    contact = await directusCreate('contacts', {
      status: 'published',
      first_name: body.first_name || null,
      last_name: body.last_name || null,
      email: body.email.toLowerCase().trim(),
      phone: body.phone || null,
      company: body.company || null,
      title: body.title || null,
      category: 'prospect',
      email_subscribed: true,
      source: 'website',
    })
  }

  const contactId = contact.id

  // Route by submission type
  if (body.type === 'subscribe') {
    // Top-of-funnel: just add to mailing list
    const listId = body.list_id ?? DEFAULT_MAILING_LIST_ID

    try {
      await directusCreate('mailing_list_contacts', {
        list_id: listId,
        contact_id: contactId,
        subscribed: true,
        date_subscribed: new Date().toISOString(),
        source: 'website_footer',
      })
    } catch (e: any) {
      // If they're already subscribed, that's fine
      if (!e?.data?.errors?.[0]?.message?.includes('unique')) {
        throw e
      }
    }

    return { success: true, type: 'subscribe' }
  }

  // Meeting request: highest-intent — creates contact + lead + meeting_request
  if (body.type === 'meeting') {
    const lead = await directusCreate('leads', {
      status: 'new',
      priority: 'high',
      lead_score: 80,
      source: 'website',
      project_type: 'Strategy Session',
      notes: body.explanation || null,
      related_contact: contactId,
      next_follow_up: new Date().toISOString().split('T')[0],
    })

    await directusCreate('lead_activities', {
      lead: lead.id,
      contact: contactId,
      activity_type: 'meeting',
      activity_date: new Date().toISOString(),
      subject: 'Meeting Request via Website',
      description: `${body.first_name || 'Visitor'} requested a ${body.meeting_type || 'strategy'} session${body.preferred_date ? ` on ${body.preferred_date}` : ''}${body.preferred_time ? ` at ${body.preferred_time}` : ''}.`,
      outcome: 'positive',
      next_action: 'Confirm meeting and send calendar invite',
      next_action_date: new Date().toISOString().split('T')[0],
    })

    await directusCreate('meeting_requests', {
      status: 'published',
      request_status: 'pending',
      meeting_type: body.meeting_type || 'consultation',
      requested_date: body.preferred_date ? new Date(body.preferred_date).toISOString() : null,
      preferred_time: body.preferred_time || null,
      duration_minutes: body.duration || 30,
      notes: body.explanation || null,
      guest_name: [body.first_name, body.last_name].filter(Boolean).join(' '),
      guest_email: body.email,
      guest_phone: body.phone || null,
      guest_company: body.company || null,
      source: 'website',
    })

    // Also subscribe to newsletter
    try {
      await directusCreate('mailing_list_contacts', {
        list_id: DEFAULT_MAILING_LIST_ID,
        contact_id: contactId,
        subscribed: true,
        date_subscribed: new Date().toISOString(),
        source: 'website_meeting_request',
      })
    } catch { /* already subscribed */ }

    return { success: true, type: 'meeting', leadId: lead.id, contactId }
  }

  // For contact + audit: create lead, request, and log activity

  // Map budget strings to numeric estimates and determine priority
  const budgetMap: Record<string, number> = {
    'under-15k': 10000,
    '15k-30k': 22500,
    '30k-50k': 40000,
    '50k-plus': 75000,
    'retainer': 5000,
  }
  const isAudit = body.type === 'audit'
  const estimatedValue = body.budget ? budgetMap[body.budget] ?? null : null
  const priority = isAudit ? 'medium' : (estimatedValue && estimatedValue >= 30000 ? 'high' : 'medium')
  const projectType = isAudit ? 'Brand Analysis' : (body.project || 'General Inquiry')

  // Step 2: Create lead
  const nextFollowUp = new Date()
  nextFollowUp.setDate(nextFollowUp.getDate() + (isAudit ? 3 : 1))

  const lead = await directusCreate('leads', {
    status: 'new',
    priority,
    lead_score: isAudit ? 50 : 65,
    source: 'website',
    project_type: projectType,
    estimated_value: estimatedValue,
    timeline: 'flexible',
    notes: body.explanation || null,
    related_contact: contactId,
    next_follow_up: nextFollowUp.toISOString().split('T')[0],
  })

  // Step 3: Log lead activity
  await directusCreate('lead_activities', {
    lead: lead.id,
    contact: contactId,
    activity_type: isAudit ? 'note' : 'email received',
    activity_date: new Date().toISOString(),
    subject: isAudit ? 'Brand Analysis Request via Website' : 'Strategy Session Request via Website',
    description: body.explanation || `${body.first_name || 'Visitor'} submitted a ${isAudit ? 'brand analysis' : 'contact'} form from the website.`,
    outcome: 'positive',
    next_action: isAudit ? 'Review analysis answers and prepare response' : 'Schedule strategy session',
    next_action_date: nextFollowUp.toISOString().split('T')[0],
  })

  // Step 4: Create request as audit trail
  await directusCreate('requests', {
    status: 'published',
    first_name: body.first_name || null,
    last_name: body.last_name || null,
    email: body.email,
    phone: body.phone || null,
    company: body.company || null,
    title: body.title || null,
    project: body.project ? [body.project] : (isAudit ? ['Branding / Strategy'] : null),
    explanation: body.explanation || null,
    budget: body.budget || null,
    contact_preference: body.contact_preference || null,
    date_submitted: new Date().toISOString(),
  })

  // Step 5: Also subscribe to newsletter if it's a contact form
  if (!isAudit) {
    try {
      await directusCreate('mailing_list_contacts', {
        list_id: DEFAULT_MAILING_LIST_ID,
        contact_id: contactId,
        subscribed: true,
        date_subscribed: new Date().toISOString(),
        source: 'website_contact_form',
      })
    } catch {
      // Already subscribed — fine
    }
  }

  return { success: true, type: body.type, leadId: lead.id, contactId }
})
