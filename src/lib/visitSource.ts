// Źródło wizyty (19.11.2026): skąd ktoś trafił na warchocki.pl, zanim wysłał formularz współpracy.
// Dane techniczne bez identyfikatora osoby: strona odsyłająca (host i ścieżka, bez parametrów), strona wejścia,
// utm_* i identyfikatory kliknięć reklam z adresu. Pierwsze źródło zostaje, ostatnie zmienia się tylko przy wejściu
// spoza warchocki.pl. Zapis wyłącznie w pamięci sesji (sessionStorage): znika po zamknięciu karty.
// Ten sam kształt co public/mera-src.js w repo merarobotics; odbiera go /api/public/v1/inquiries (pola first_*).
const KEY = 'mera_src'
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid']
type Touch = Record<string, string | number>
let state: { f: Touch; l: Touch } | null = null

const host = (h: string) => h.replace(/^www\./, '')

export function initVisitSource() {
  if (state || typeof window === 'undefined') return
  const cur: Touch = { t: Date.now(), p: location.pathname.slice(0, 200) }
  let external = false
  try {
    const r = new URL(document.referrer)
    if (host(r.hostname) !== host(location.hostname)) { cur.r = (r.origin + r.pathname).slice(0, 300); external = true }
  } catch { /* brak strony odsyłającej */ }
  const q = new URLSearchParams(location.search)
  for (const k of PARAMS) { const v = q.get(k); if (v) { cur[k] = v.slice(0, 500); external = true } }
  let saved: { f: Touch; l: Touch } | null = null
  try { const v = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (v && v.f && v.l) saved = v } catch { /* pamięć sesji niedostępna */ }
  state = saved ? { f: saved.f, l: external ? cur : saved.l } : { f: cur, l: cur }
  try { sessionStorage.setItem(KEY, JSON.stringify(state)) } catch { /* zostaje w pamięci strony */ }
}

/** Pola do `attribution` zgłoszenia: ostatnie źródło (referrer, utm_*, identyfikatory) i pierwsze (first_*). */
export function visitSource(): Record<string, string> {
  initVisitSource()
  const out: Record<string, string> = {}
  if (!state) return out
  const { f, l } = state
  if (l.r) out.referrer = String(l.r)
  if (f.r) out.first_referrer = String(f.r)
  for (const k of PARAMS) { if (l[k]) out[k] = String(l[k]); if (f[k]) out['first_' + k] = String(f[k]) }
  out.first_page = String(f.p)
  out.first_at = new Date(Number(f.t)).toISOString().slice(0, 10)
  return out
}
