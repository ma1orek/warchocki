// warchocki.pl: tłumaczy teksty strony Edwarda (scripts/lang/pl.json + en.json) na 52 pozostałe języki z scripts/lang/langs.mjs
// modelem Claude Sonnet 5.5 i zapisuje scripts/lang/<kod>.json. Te pliki są w repo; build (prerender) ich nie tłumaczy, tylko czyta.
// Warianty regionalne (en-us, es-la, pt-br) dostają tekst języka bazowego i zmieniają tylko to, co w regionie brzmi inaczej,
// więc idą po swoich językach bazowych. Walidator sprawdza klucze, liczby, nazwy własne i długie myślniki; błędy wracają do modelu.
// Uruchom: node scripts/lang-fill.mjs [de fr ...] [--force]   (bez kodów: brakujące pliki; --force: nadpisz istniejące)
// Klucz: env ANTHROPIC_API_KEY albo odczyt z Netlify w repo merarobotics (npx netlify-cli env:get); nigdzie nie jest zapisywany ani drukowany.
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Anthropic from '@anthropic-ai/sdk'
import { LANGS, lang } from './lang/langs.mjs'

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'lang')
const MERA_REPO = process.env.MERA_REPO || 'C:/Users/idzik/merarobotics'
const MODEL = 'claude-sonnet-5-5', PARALLEL = Number(process.env.LANG_PARALLEL) || 8, ROUNDS = 3
const read = (code) => JSON.parse(readFileSync(join(DIR, `${code}.json`), 'utf8').replace(/^\uFEFF/, ''))
const PL = read('pl'), EN = read('en')

// Frazy z audytu (podpowiedzi Google, 20.11.2026, docs/seo-54-jezyki-audyt.md): tak ludzie szukają filmu z dzikami
const SEARCH_HINTS = {
  de: 'Roboter jagt Wildschweine, Roboter verjagt Wildschweine (Warschau, Polen), humanoider Roboter Wildschweine, Roboter-Influencer',
  it: 'robot scaccia cinghiali, robot insegue cinghiali (Varsavia, Polonia), robot umanoide cinghiali, robot influencer',
  fr: 'robot chasse les sangliers, robot sangliers Varsovie / Pologne, robot influenceur',
  nl: 'robot jaagt wilde zwijnen weg, robot wilde zwijnen Warschau',
  es: 'robot persigue jabalíes, robot jabalíes Varsovia, robot humanoide influencer',
}

const KEYS = Object.keys(EN).filter((k) => k !== 'faq')
const SCHEMA = {
  type: 'object',
  properties: {
    ...Object.fromEntries(KEYS.map((k) => [k, { type: 'string' }])),
    nameLocal: { type: 'string' },
    faq: { type: 'array', items: { type: 'object', properties: { q: { type: 'string' }, a: { type: 'string' } }, required: ['q', 'a'], additionalProperties: false } },
  },
  required: [...KEYS, 'nameLocal', 'faq'],
  additionalProperties: false,
}

function apiKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY
  const k = execSync('npx netlify-cli env:get ANTHROPIC_API_KEY', { cwd: MERA_REPO, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().split(/\r?\n/).pop().trim()
  if (!/^sk-ant-/.test(k)) throw new Error('brak ANTHROPIC_API_KEY (env ani Netlify)')
  return k
}

// ── Walidator ────────────────────────────────────────────────────────────────────────────────
const NAMES = ['Edward Warchocki', 'MERA Robotics', 'MERA OS', 'MERA EVENTS', 'MERA RENT', 'Unitree G1']
const MEDIA = ['Reuters', 'CNN', 'BBC News', 'CBS News', 'Channel 4 News', 'Fox Business']
const nums = (s) => (s.match(/\d+/g) || [])
const CJK_BILLION = { zh: ['30'], ja: ['30'], ko: ['30'] } // 3 mld = 30亿 / 30億 / 30억
function problems(code, t) {
  const out = []
  const all = [...KEYS.map((k) => [k, t[k], EN[k]]), ...t.faq.flatMap((f, i) => [[`faq${i}.q`, f.q, EN.faq[i]?.q], [`faq${i}.a`, f.a, EN.faq[i]?.a]])]
  if (t.faq.length !== EN.faq.length) out.push(`faq: ${t.faq.length} pozycji zamiast ${EN.faq.length}`)
  for (const [k, v, src] of all) {
    if (!v || !v.trim()) { out.push(`${k}: puste`); continue }
    if (/[\u2012-\u2015]/.test(v)) out.push(`${k}: long dash (U+2012-U+2015) is forbidden, use a comma, colon or hyphen`)
    for (const n of new Set(nums(src || ''))) {
      const ok = nums(v).includes(n) || (n === '3' && (CJK_BILLION[code] || []).some((x) => nums(v).includes(x)))
      if (!ok) out.push(`${k}: number ${n} from the source is missing (keep Western digits)`)
    }
    for (const name of [...NAMES, ...MEDIA]) {
      if (!(src || '').includes(name) || v.includes(name)) continue
      // W tekście języki fleksyjne odmieniają nazwisko (Edwarda Warchockega); w title i h1 wymagany jest mianownik
      if (name === 'Edward Warchocki' && /Edwar\p{L}*\s+Warchock\p{L}*/u.test(v)) continue
      out.push(`${k}: keep "${name}" exactly as written (Latin script)`)
    }
  }
  for (const k of ['title', 'h1']) if (!t[k].includes('Edward Warchocki')) out.push(`${k}: must contain "Edward Warchocki"`)
  if (t.title.length > 90) out.push(`title: ${t.title.length} characters, keep it under 75`)
  if (t.description.length > 200) out.push(`description: ${t.description.length} characters, keep it under 170`)
  return out
}

function system(L) {
  const base = L.base ? lang(L.base) : null
  return `You localise the website of Edward Warchocki (warchocki.pl) into ${L.enName} (${L.hreflang}). Edward is a real humanoid robot (Unitree G1) and social media influencer run by MERA Robotics, a company from Warsaw, Poland. In April 2026 a video of Edward chasing wild boars on a street in Warsaw went viral worldwide.

Input: the Polish source (pl, the meaning) and the English version (en, a model of meaning and length)${base ? `, plus base: the approved ${base.enName} text. This is a regional variant: return base unchanged wherever it is natural in ${L.enName}, and change only spelling, vocabulary, grammar and form of address that differ in this region` : ''}. Return the same keys with the text in ${L.enName}.

Goal: people in this language search for Edward with phrases like "robot influencer", "robot chasing wild boars (in Warsaw / Poland)", "humanoid robot wild boars", "is the robot chasing wild boars video real" and "Edward Warchocki". Write title, description, h1, videoH and the FAQ questions the way a native speaker would type these searches, so the page matches them naturally.${SEARCH_HINTS[L.code] ? ` Real searches in this language: ${SEARCH_HINTS[L.code]}.` : ''}

Rules:
- Natural, idiomatic ${L.enName} written by a native editor, not a word-for-word translation. Address the reader in the form usual on websites in this language.
- Facts only from the source. Add no claims, no superlatives (no "most popular", "first", "best" as statements), no numbers, no prices, no promises. The FAQ question about the most popular robot influencer stays a question, and its answer gives only the numbers and media from the source.
- Keep these names exactly, in Latin script: ${[...NAMES, ...MEDIA].join(', ')}, Bartosz Idzik, Radosław Grzelaczyk, Rolex, TikTok, Instagram, YouTube, Facebook, X, DINO, Biedronka, Polsat, @edwardwarchocki, @EdwardWarchocki. TV show titles „Dzień Dobry TVN” and „Taniec z Gwiazdami” stay in Polish, in this language's quotation marks.
- Translate institutions by meaning: Sejm = the Polish parliament, KPRM = Chancellery of the Prime Minister of Poland, Ministerstwo Cyfryzacji = Ministry of Digital Affairs.
- Warsaw, Poland and wild boars: use the usual words of this language.
- nameLocal: if this language is not normally written in Latin script, the usual transliteration of "Edward Warchocki" in its script; in the lead, write "Edward Warchocki" followed by that transliteration in parentheses once. For Latin-script languages nameLocal is an empty string.
- Digits stay Western Arabic (0-9). Keep every number from the source. "3 billion" may be written the way this language groups large numbers (for example 30亿 in Chinese), but with digits.
- Never use the characters U+2012, U+2013, U+2014 or U+2015 (long dashes). Use a comma, colon, parentheses or a plain hyphen.
- Punctuation follows the norm of the language and script (for example 。，？ in Chinese and Japanese, ، and ؟ in Arabic, । in Hindi).
- title under 70 characters if possible, description 120-160 characters.
- fullSitePl and fullSiteEn: link labels to the full website in Polish and in English; name the language in ${L.enName}.
- The FAQ has exactly ${EN.faq.length} items in the same order.`
}

async function translate(client, L, prev) {
  const base = L.base ? read(L.base) : null
  const user = { pl: PL, en: EN, ...(base ? { base } : {}), ...(prev ? { previous: prev.t, problems: prev.problems } : {}) }
  const stream = client.beta.messages.stream({
    model: MODEL, max_tokens: 32000, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default',
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: SCHEMA } },
    system: system(L),
    messages: [{ role: 'user', content: (prev ? 'Fix exactly the listed problems in previous and return the full corrected text.\n' : '') + JSON.stringify(user) }],
  })
  const msg = await stream.finalMessage()
  if (msg.stop_reason === 'refusal') throw new Error('refusal')
  if (msg.stop_reason === 'max_tokens') throw new Error('max_tokens')
  const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('')
  return JSON.parse(text)
}

async function fill(client, L) {
  let prev = null
  for (let r = 1; r <= ROUNDS; r++) {
    const t = await translate(client, L, prev)
    const p = problems(L.code, t)
    if (!p.length) {
      writeFileSync(join(DIR, `${L.code}.json`), JSON.stringify(t, null, 2) + '\n')
      return `${L.code}: OK (runda ${r})`
    }
    prev = { t, problems: p }
  }
  throw new Error(`${L.code}: po ${ROUNDS} rundach nadal błędy: ${prev.problems.join('; ')}`)
}

const args = process.argv.slice(2), force = args.includes('--force')
const asked = args.filter((a) => !a.startsWith('--'))
const todo = LANGS.filter((L) => !['pl', 'en'].includes(L.code))
  .filter((L) => (asked.length ? asked.includes(L.code) : force || !existsSync(join(DIR, `${L.code}.json`))))
if (!todo.length) { console.log('lang-fill: nic do zrobienia'); process.exit(0) }
const client = new Anthropic({ apiKey: apiKey() })
// Najpierw języki bazowe, potem warianty regionalne (czytają gotowy plik bazowy)
const waves = [todo.filter((L) => !L.base), todo.filter((L) => L.base)]
let failed = 0
for (const wave of waves) {
  const queue = [...wave]
  await Promise.all(Array.from({ length: PARALLEL }, async () => {
    while (queue.length) {
      const L = queue.shift()
      try { console.log(await fill(client, L)) } catch (e) { failed++; console.error(`${L.code}: BŁĄD ${e.message}`) }
    }
  }))
}
console.log(`lang-fill: ${todo.length - failed}/${todo.length} gotowe`)
process.exit(failed ? 1 : 0)
