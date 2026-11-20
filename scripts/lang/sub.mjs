// warchocki.pl: podstrony i produkty w 54 językach (od 20.11.2026, prośba Bartosza: „wszystkie strony i produkty
// jak strona główna”). Źródłem jest polska strona wyrenderowana przez prerender (ten sam HTML, te same zdjęcia
// i style). Z niej bierzemy treść między menu a stopką, tłumaczymy teksty (węzły tekstowe i alt/title/aria-label)
// i składamy statyczną stronę /<kod>/<adres> bez JavaScriptu. Tłumaczenia: scripts/lang/sub/<kod>.json
// (klucz = polski tekst), uzupełnia je scripts/lang-fill-sub.mjs. Brak tłumaczenia fragmentu = polski tekst
// i ostrzeżenie; brak ponad 3% fragmentów = strona w tym języku pominięta.
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { LANGS, lang as langOf } from './langs.mjs'

const DIR = dirname(fileURLToPath(import.meta.url))
export const SITE = 'https://warchocki.pl'

// Adresy podstron (polskie) i krótkie nazwy do menu
export const SUB_BASE = [
  ['/wynajem-edwarda', 'Wynajem Edwarda'],
  ['/wynajem-robotow', 'Wynajem robotów'],
  ['/promocja-social-media', 'Kampanie w social mediach'],
  ['/produkty', 'Produkty'],
  ['/raport-dino', 'Raport kampanii DINO'],
  ['/raport-polandrock', 'Raport Pol’and’Rock'],
  ['/wspolpraca', 'Współpraca'],
]
export const subPaths = (products) => [...SUB_BASE.map(([p]) => p), ...products.map((p) => `/produkty/${p.slug}`)]

// Angielskie strony React z angielską treścią zostają (produkty); pozostałe /en/... budujemy statycznie
export const EN_REACT = (path) => path === '/produkty' || path.startsWith('/produkty/')
export const langPath = (code, path) => (code === 'pl' ? path : code === 'en' ? `/en${path}` : `/${code}${path}`)
export const abs = (path) => SITE + path

export function subTexts(code) {
  const f = join(DIR, 'sub', `${code}.json`)
  return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8').replace(/^﻿/, '')) : {}
}

// ── HTML: dekodowanie i kodowanie ────────────────────────────────────────────────────────────
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, '\'').replace(/&#39;/g, '\'').replace(/&nbsp;/g, ' ')
const encText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const encAttr = (s) => encText(s).replace(/"/g, '&quot;')
const worth = (s) => /\p{L}/u.test(s) && !/^(https?:|mailto:|\/)/.test(s) && !/^@[\w.]+$/.test(s)

// Treść strony między menu a stopką, bez formularza (bez JS nie działa) i bez stanów początkowych animacji
export function mainHtml(distHtml, { contactBlock = '' } = {}) {
  let h = distHtml.slice(distHtml.indexOf('<div id="root">') + '<div id="root">'.length, distHtml.indexOf('<section id="o-edwardzie"'))
  const n0 = h.indexOf('<nav'), n1 = h.indexOf('</nav>')
  if (n0 >= 0 && n1 > n0) h = h.slice(0, n0) + h.slice(n1 + 6)
  const f0 = h.lastIndexOf('<footer'), f1 = h.lastIndexOf('</footer>')
  if (f0 >= 0 && f1 > f0) h = h.slice(0, f0) + h.slice(f1 + 9)
  h = h.replace(/<form[\s\S]*?<\/form>/g, contactBlock)
  h = h.replace(/<script[\s\S]*?<\/script>/g, '')
  // framer-motion: initial={{ opacity: 0, y: 30 }} = treść niewidoczna bez JS
  h = h.replace(/style="([^"]*)"/g, (m, st) => {
    if (!/opacity:0(;|$)/.test(st)) return m
    const out = st.split(';').filter((d) => d && !/^opacity:0$/.test(d) && !/^transform:/.test(d) && !/^filter:blur/.test(d)).join(';')
    return `style="${out}"`
  })
  return h
}

// Fragmenty do tłumaczenia w kolejności występowania (teksty i atrybuty), bez powtórzeń
export function segments(html) {
  const out = []
  let skip = 0
  for (const tok of html.split(/(<[^>]+>)/)) {
    if (!tok) continue
    if (tok[0] === '<') {
      if (/^<(script|style)\b/i.test(tok)) skip++
      else if (/^<\/(script|style)>/i.test(tok)) skip = Math.max(0, skip - 1)
      for (const m of tok.matchAll(/\s(alt|title|aria-label|placeholder)="([^"]*)"/g)) {
        const t = dec(m[2]).trim()
        if (worth(t)) out.push(t)
      }
      continue
    }
    if (skip) continue
    const t = dec(tok).trim()
    if (worth(t)) out.push(t)
  }
  return [...new Set(out)]
}

// Podmiana tekstów na tłumaczenia; zwraca HTML i liczbę braków
export function translateHtml(html, tr) {
  let missing = 0, total = 0
  const T = (raw) => {
    const t = dec(raw), core = t.trim()
    if (!worth(core)) return null
    total++
    const x = tr[core]
    if (!x) { missing++; return null }
    return t.replace(core, x)
  }
  let skip = 0
  const parts = html.split(/(<[^>]+>)/).map((tok) => {
    if (!tok) return tok
    if (tok[0] === '<') {
      if (/^<(script|style)\b/i.test(tok)) skip++
      else if (/^<\/(script|style)>/i.test(tok)) skip = Math.max(0, skip - 1)
      return tok.replace(/(\s(?:alt|title|aria-label|placeholder)=")([^"]*)"/g, (m, a, v) => { const x = T(v); return x == null ? m : `${a}${encAttr(x)}"` })
    }
    if (skip) return tok
    const x = T(tok)
    return x == null ? tok : encText(x)
  })
  return { html: parts.join(''), missing, total }
}

// Linki wewnętrzne na wersję w tym języku
export function localizeLinks(html, code, paths) {
  const set = new Set(paths)
  return html.replace(/href="(\/[^"#?]*)([#?][^"]*)?"/g, (m, p, rest = '') => {
    const clean = p.replace(/\/$/, '') || '/'
    if (clean === '/') return `href="${code === 'pl' ? '/' : code === 'en' ? '/en' : `/${code}/`}${rest}"`
    if (set.has(clean)) return `href="${langPath(code, clean)}${rest}"`
    return m
  })
}

// Blok kontaktu zamiast formularza (polskie źródło; adresy podstawia render)
export const CONTACT_PL = '<div style="display:flex;flex-direction:column;gap:18px;font-size:18px"><p>Napisz do nas: <a href="mailto:contact@merarobotics.com">contact@merarobotics.com</a></p><p><a href="{{EVENTS}}">Zarezerwuj Edwarda na wydarzenie w MERA EVENTS</a></p><p><a href="{{RENT}}">Sprawdź termin w MERA RENT</a></p></div>'

export { LANGS, langOf }
