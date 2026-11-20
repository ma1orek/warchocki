// warchocki.pl: tłumaczy podstrony i produkty (fragmenty z wyrenderowanych polskich stron, scripts/lang/sub.mjs)
// na 53 języki (en i 52 z scripts/lang/langs.mjs) modelem Claude Sonnet 5.5 i zapisuje scripts/lang/sub/<kod>.json
// (klucz = polski tekst). Uzupełnia tylko brakujące fragmenty, więc po zmianie treści strony wystarczy uruchomić go jeszcze raz.
// Wymaga świeżego buildu (dist/ z polskimi stronami): npm run build && node scripts/lang-fill-sub.mjs [de fr ...]
// Klucz: env ANTHROPIC_API_KEY albo odczyt z Netlify w repo merarobotics; nigdzie nie jest zapisywany ani drukowany.
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import Anthropic from '@anthropic-ai/sdk'
import { LANGS } from './lang/langs.mjs'
import { subPaths, mainHtml, segments, SUB_BASE, subTexts, CONTACT_PL } from './lang/sub.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'scripts', 'lang', 'sub')
const MERA_REPO = process.env.MERA_REPO || 'C:/Users/idzik/merarobotics'
const MODEL = 'claude-sonnet-5-5', BATCH = 140, PARALLEL = Number(process.env.LANG_PARALLEL) || 8, ROUNDS = 3
const { products } = await import(pathToFileURL(join(ROOT, 'dist-ssr', 'entry-server.js')).href)

// Wszystkie fragmenty: menu, tytuły i opisy stron, treść
export function allSegments() {
  const seg = [...SUB_BASE.map(([, n]) => n)]
  for (const p of subPaths(products)) {
    const h = readFileSync(join(ROOT, 'dist', `${p.slice(1)}.html`), 'utf8')
    const title = h.match(/<title>([^<]*)<\/title>/)?.[1], desc = h.match(/<meta name="description" content="([^"]*)"/)?.[1]
    const d = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    if (title) seg.push(d(title))
    if (desc) seg.push(d(desc))
    seg.push(...segments(mainHtml(h, { contactBlock: CONTACT_PL })))
  }
  return [...new Set(seg)]
}

const NAMES = ['Edward Warchocki', 'Edward', 'MERA Robotics', 'MERA OS', 'MERA EVENTS', 'MERA RENT', 'DINO', 'Biedronka', 'Biedronce', 'Kaufland', 'Auchan', 'SPAR', 'POLOmarket', 'Media Expert', 'TikTok', 'Instagram', 'YouTube', 'Facebook', 'Unitree', 'Reuters', 'Rolex', 'Fortuna']
const nums = (s) => s.match(/\d+/g) || []
function problems(code, src, t) {
  const p = []
  if (!t || !t.trim()) return ['empty']
  if (/[\u2012-\u2015]/.test(t)) p.push('long dash forbidden (use comma, colon or hyphen)')
  for (const n of new Set(nums(src))) if (!nums(t).includes(n) && !(['zh', 'ja', 'ko'].includes(code) && /miliard|mld/.test(src))) p.push(`number ${n} missing (Western digits)`)
  for (const n of NAMES) if (src.includes(n) && !/^(Biedronce|Edward)$/.test(n) && !t.includes(n)) p.push(`keep "${n}" in Latin script`)
  return p
}

function apiKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY
  const k = execSync('npx netlify-cli env:get ANTHROPIC_API_KEY', { cwd: MERA_REPO, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().split(/\r?\n/).pop().trim()
  if (!/^sk-ant-/.test(k)) throw new Error('brak ANTHROPIC_API_KEY (env ani Netlify)')
  return k
}

const SCHEMA = { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { i: { type: 'integer' }, t: { type: 'string' } }, required: ['i', 't'], additionalProperties: false } } }, required: ['items'], additionalProperties: false }
function system(L) {
  const base = L.base ? LANGS.find((x) => x.code === L.base) : null
  return `You localise the website of Edward Warchocki (warchocki.pl) from Polish into ${L.enName} (${L.hreflang}). Edward is a real humanoid robot (Unitree G1) and a Polish social media influencer run by MERA Robotics. The site describes his services (booking him for events, campaigns), campaign reports and his own products sold in Polish stores (drinks, fruit mousses, ice cream, drink concentrates, a school collection).

Input items: i, pl (the Polish source)${base ? `, and base: the approved ${base.enName} text (this is a regional variant: keep base wherever it is natural in ${L.enName}, change only regional spelling, vocabulary and form of address)` : ''}. Items come in page order: consecutive items are often parts of one sentence split by bold text or links, so translate each fragment so that the fragments read correctly one after another.

Rules:
- Natural ${L.enName} written by a native editor. Edward speaks in the first person with humour; keep his tone. His catchphrase "No i elegancko" stays in Polish. "Człowieku" (how he addresses people) becomes the natural equivalent of "Human" / "Dude" in ${L.enName}.
- Translate faithfully: add no facts, claims, numbers or prices, and remove none. Keep every number with Western digits, including amounts such as 0,50 zł (you may use the decimal separator of the language).
- Keep these names in Latin script exactly: ${NAMES.filter((n) => n !== 'Biedronce').join(', ')}, Pol’and’Rock, Edwardzik, Dych Dziki, Sejm names of TV shows. Store names are Polish chains: do not translate them.
- Ingredient lists, allergens, nutrition labels and storage instructions: translate precisely, keep E-numbers, percentages and units.
- Never use the characters U+2012, U+2013, U+2014 or U+2015. Use a comma, colon, parentheses or a plain hyphen.
- Short UI labels (buttons, headings in capitals) stay short; keep capitals where the source is in capitals.
- Return one item per input item with the same i.`
}

async function translate(client, L, items) {
  const stream = client.beta.messages.stream({
    model: MODEL, max_tokens: 32000, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default',
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: SCHEMA } },
    system: [{ type: 'text', text: system(L), cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: JSON.stringify(items) }],
  })
  const msg = await stream.finalMessage()
  if (msg.stop_reason === 'refusal') throw new Error('refusal')
  if (msg.stop_reason === 'max_tokens') throw new Error('max_tokens')
  return JSON.parse(msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('')).items
}

async function fill(client, L, segs) {
  const file = join(OUT, `${L.code}.json`)
  const have = subTexts(L.code)
  const base = L.base ? subTexts(L.base) : null
  let todo = segs.filter((s) => !have[s])
  const failed = []
  for (let r = 1; r <= ROUNDS && todo.length; r++) {
    const next = []
    for (let k = 0; k < todo.length; k += BATCH) {
      const chunk = todo.slice(k, k + BATCH)
      const items = chunk.map((pl, i) => ({ i, pl, ...(base && base[pl] ? { base: base[pl] } : {}), ...(r > 1 && failed[pl] ? { previous: failed[pl].t, problems: failed[pl].p } : {}) }))
      const out = await translate(client, L, items)
      for (const { i, t } of out) {
        const pl = chunk[i]
        if (!pl) continue
        const p = problems(L.code, pl, t)
        if (p.length) { failed[pl] = { t, p }; next.push(pl) } else have[pl] = t
      }
      for (const pl of chunk) if (!have[pl] && !next.includes(pl)) next.push(pl)
      writeFileSync(file, JSON.stringify(have, null, 1) + '\n')
    }
    todo = next
  }
  return `${L.code}: ${segs.filter((s) => have[s]).length}/${segs.length}${todo.length ? ` (bez tłumaczenia: ${todo.length})` : ''}`
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  mkdirSync(OUT, { recursive: true })
  const segs = allSegments()
  const asked = process.argv.slice(2).filter((a) => !a.startsWith('--'))
  const todo = LANGS.filter((L) => L.code !== 'pl' && (!asked.length || asked.includes(L.code)))
  console.log(`lang-fill-sub: ${segs.length} fragmentów, ${todo.length} języków`)
  const client = new Anthropic({ apiKey: apiKey() })
  for (const wave of [todo.filter((L) => !L.base), todo.filter((L) => L.base)]) {
    const queue = [...wave]
    await Promise.all(Array.from({ length: PARALLEL }, async () => {
      while (queue.length) {
        const L = queue.shift()
        try { console.log(await fill(client, L, segs)) } catch (e) { console.error(`${L.code}: BŁĄD ${e.message}`) }
      }
    }))
  }
}
