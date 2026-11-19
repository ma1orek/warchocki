// Zapis zapytania z formularza /wspolpraca do CRM MERA (19.11.2026): POST https://merarobotics.com/api/public/v1/inquiries.
// Do tej pory formularz szedł tylko mailem (FormSubmit) i do rejestru `leads`, więc zapytania firm nie miały rekordu ani zadania
// w CRM. Teraz zapytania handlowe trafiają tam ze źródłem „warchocki.pl”; mail zostaje jako zapas.
// Kategoria „Fan” to nie zapytanie handlowe: zostaje w mailu i w rejestrze `leads`, bez rekordu i bez zadania dla zespołu.
// Automatyczne potwierdzenie MERA EVENTS nie idzie do osób z warchocki.pl (serwer wysyła je tylko ze stron MERA EVENTS).
import { visitSource } from './visitSource'

const ENDPOINT = 'https://merarobotics.com/api/public/v1/inquiries'

// Kategoria formularza -> usługa w CRM (lista usług: /api/public/v1/services). null = bez rekordu w CRM.
const SERVICE: Record<string, { service: string; event_type?: string } | null> = {
  Eventy: { service: 'events' },
  Urodziny: { service: 'events' },
  'Szkoła': { service: 'events', event_type: 'school' },
  Reklama: { service: 'campaign' },
  Media: { service: 'media' },
  Fan: null,
  '': { service: 'media' }, // bez kategorii: „Media i współpraca”
}

export type CrmFields = { type: string; company: string; firstName: string; lastName: string; position: string; phone: string; email: string; term: string; message: string }

export const crmService = (type: string) => (type in SERVICE ? SERVICE[type] : SERVICE[''])

// „15.06.2027”, „15/06/2027” albo „2027-06-15” -> „2027-06-15”; opis słowny („Q3”, „czerwiec”) zostaje tylko w treści
export function isoDate(term: string): string {
  const t = term.trim()
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t) || (() => { const d = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(t); return d ? [d[0], d[3], d[2].padStart(2, '0'), d[1].padStart(2, '0')] : null })()
  if (!m) return ''
  const iso = `${m[1]}-${m[2]}-${m[3]}`
  const ok = Number.isFinite(Date.parse(iso)) && new Date(iso).toISOString().slice(0, 10) === iso
  return ok ? iso : ''
}

export function crmPayload(f: CrmFields) {
  const cfg = crmService(f.type)
  if (!cfg) return null
  const message = [
    `Formularz warchocki.pl: ${f.type || 'bez kategorii'}`,
    f.position && `Stanowisko: ${f.position}`,
    f.term && `Termin (jak wpisał klient): ${f.term}`,
    f.message,
  ].filter(Boolean).join('\n').slice(0, 4000)
  return {
    ...cfg,
    lang: 'pl',
    date: isoDate(f.term),
    message,
    contact: { name: `${f.firstName} ${f.lastName}`.trim(), email: f.email, phone: f.phone, company: f.company },
    actor: 'human',
    contact_permission: true, // pod przyciskiem: wysłanie zapytania = zgoda na kontakt zwrotny
    attribution: { page: location.origin + location.pathname, referrer: document.referrer || '', ...visitSource() },
    website: '',
  }
}

const uuid = () => (window.crypto?.randomUUID ? window.crypto.randomUUID() : `wpl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}${Math.random().toString(36).slice(2, 10)}`)

/** true = CRM potwierdził zapis; false = kategoria bez rekordu albo błąd (formularz ma jeszcze ścieżkę mailową). */
export async function sendToCrm(f: CrmFields): Promise<boolean> {
  const payload = crmPayload(f)
  if (!payload) return false
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': uuid() },
      body: JSON.stringify(payload),
    })
    if (!res.ok) return false
    const j = await res.json().catch(() => null)
    return j?.status === 'received'
  } catch {
    return false
  }
}
