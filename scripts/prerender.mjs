// Prerender warchocki.pl (krok `npm run build` po `vite build` i `vite build --ssr`).
// Dla każdej trasy z App.tsx zapisuje statyczny HTML z treścią strony (renderToString), własnym <title>,
// opisem, canonical, hreflang, Open Graph, JSON-LD (MERA Robotics + Edward Warchocki) i blokiem faktów.
// W przeglądarce main.tsx robi createRoot().render(), więc React podmienia ten HTML na żywą aplikację:
// ludzie widzą stronę jak dotąd, a boty bez JS (GPTBot, ClaudeBot, PerplexityBot) dostają treść.
// Pliki: / -> dist/index.html, /wynajem-edwarda -> dist/wynajem-edwarda.html (Netlify serwuje bez .html).
// Generuje też dist/sitemap.xml. Fakty tylko z scripts/seo-facts.mjs.
// Od 20.11.2026: strony Edwarda w 52 kolejnych językach (/<kod>/, scripts/lang/page.mjs), na / i /en pełny zestaw
// hreflang 54 wersji (x-default: /en), FAQ i film z dzikami w bloku faktów i JSON-LD, lista wersji w dist/llms.txt.
// Od 20.11.2026 wieczorem także podstrony i produkty w 54 językach (scripts/lang/sub.mjs): /<kod>/<adres> i /en/<adres>.
import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import {
  SITE, MERA, MERA_EVENTS, MERA_EVENTS_EDWARD, MERA_RENT, MERA_OS, REUTERS,
  ORG, ORG_ID, EDWARD_ID, PROFILES, DEFINITION, FACTS, BOARS_VIDEO,
} from './seo-facts.mjs'
import { LANGS, STATIC_LANGS } from './lang/langs.mjs'
import { subPaths, mainHtml, translateHtml, localizeLinks, subTexts, langPath, EN_REACT, SUB_BASE, CONTACT_PL } from './lang/sub.mjs'
import { texts, READY_LANGS, hreflangTags, hreflangSitemap, videoNode, faqNode, edwardNode, langPage, subPage, VIDEO_ID, abs } from './lang/page.mjs'

const T = { pl: texts('pl'), en: texts('en') }

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { render, products } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const DASHES = /[\u2013\u2014]/
const clean = (s) => String(s).replace(/\s*[\u2013\u2014]\s*/g, ' - ')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ── Trasy ────────────────────────────────────────────────────────────────────────────────────
// lang = język treści strony; canonical = adres kanoniczny (aliasy i angielskie adresy z polską treścią
// wskazują polską wersję); alt = para pl/en dla hreflang (tylko strony przetłumaczone).
const PAGES = [
  // Strony główne: tytuł i opis z scripts/lang/pl.json i en.json (te same frazy co w pozostałych wersjach), pełny zestaw hreflang
  { path: '/', lang: 'pl', alt: '/en', cluster: true, title: T.pl.title, description: T.pl.description },
  { path: '/en', lang: 'en', alt: '/', cluster: true, title: T.en.title, description: T.en.description },
  {
    path: '/wynajem-edwarda', lang: 'pl',
    title: 'Wynajem Edwarda Warchockiego na event | MERA Robotics',
    description: 'Edward Warchocki, robot humanoidalny Unitree G1 prowadzony przez MERA Robotics, na konferencje, targi, gale i premiery. Rezerwacja przez MERA EVENTS i MERA RENT, na miejscu operatorzy MERA.',
  },
  {
    path: '/wynajem-robotow', lang: 'pl',
    title: 'Wynajem robotów humanoidalnych z operatorami | MERA Robotics',
    description: 'Roboty humanoidalne Unitree G1 i Unitree H2 z operatorami MERA Robotics na wydarzenia w całej Europie. Rozmowy w MERA OS w ponad 70 językach. Zapytania przez MERA EVENTS i MERA RENT.',
  },
  {
    path: '/promocja-social-media', lang: 'pl',
    title: 'Kampanie marek z Edwardem Warchockim w social mediach',
    description: 'Edward Warchocki występuje w kampaniach marek na TikToku, Instagramie, YouTubie, Facebooku i X. Według danych jego kanałów to około 3 miliardów wyświetleń miesięcznie. Projekt MERA Robotics.',
  },
  {
    path: '/produkty', lang: 'pl', alt: '/en/produkty',
    title: 'Produkty Edwarda Warchockiego: napoje, musy i kolekcja szkolna',
    description: 'Napoje bez dodatku cukru, musy owocowe i kolekcja szkolna Edwarda Warchockiego, robota humanoidalnego prowadzonego przez MERA Robotics. Dostępne m.in. w sklepach DINO i Biedronka.',
  },
  {
    path: '/en/produkty', lang: 'en', alt: '/produkty',
    title: 'Edward Warchocki products: drinks, fruit mousses, school collection',
    description: 'Drinks with no added sugar, fruit mousses and a school collection by Edward Warchocki, the humanoid robot run by MERA Robotics. Available in DINO and Biedronka stores, among others.',
  },
  {
    path: '/raport-dino', lang: 'pl',
    title: 'Raport kampanii napojów Edwarda Warchockiego w DINO',
    description: 'Od czerwca 2026 Edward Warchocki prowadzi kampanię napojów bez dodatku cukru: start w DINO, potem Kaufland, Auchan, SPAR i POLOmarket. Filmy i reposty zebrały ponad 20 mln wyświetleń na 5 platformach.',
  },
  { path: '/dino', lang: 'pl', canonical: '/raport-dino', sameAs: '/raport-dino' },
  {
    path: '/raport-polandrock', lang: 'pl',
    title: 'Edward Warchocki na Pol’and’Rock Festival 2026: raport',
    description: 'Trzydniowa wizyta Edwarda Warchockiego na Pol’and’Rock Festival 2026 (30.07-1.08, Broczyno) dała ponad 20 mln wyświetleń na jego kanałach bez budżetu mediowego. Najpopularniejszy film miał 4,9 mln wyświetleń na TikToku.',
  },
  { path: '/polandrock', lang: 'pl', canonical: '/raport-polandrock', sameAs: '/raport-polandrock' },
  { path: '/festiwal', lang: 'pl', canonical: '/raport-polandrock', sameAs: '/raport-polandrock' },
  {
    path: '/wspolpraca', lang: 'pl',
    title: 'Współpraca z Edwardem Warchockim i MERA Robotics',
    description: 'Zaproś Edwarda Warchockiego na wydarzenie albo do kampanii marki. Rezerwacje przez MERA EVENTS (merarobotics.com/events) i MERA RENT (mera.rent), kontakt: contact@merarobotics.com.',
  },
  { path: '/kontakt', lang: 'pl', canonical: '/wspolpraca', sameAs: '/wspolpraca' },
]

for (const p of products) {
  const pl = clean(p.name.pl)
  const en = clean(p.name.en)
  PAGES.push({
    path: `/produkty/${p.slug}`, lang: 'pl', alt: `/en/produkty/${p.slug}`,
    title: `${pl} | Edward Warchocki`,
    description: `${pl}: produkt Edwarda Warchockiego, robota humanoidalnego (Unitree G1) prowadzonego przez MERA Robotics. Szczegóły produktu i miejsca sprzedaży na warchocki.pl.`,
  })
  PAGES.push({
    path: `/en/produkty/${p.slug}`, lang: 'en', alt: `/produkty/${p.slug}`,
    title: `${en} | Edward Warchocki`,
    description: `${en}: a product by Edward Warchocki, the humanoid robot (Unitree G1) run by MERA Robotics. Product details and where to buy on warchocki.pl.`,
  })
}

// aliasy biorą tytuł i opis strony docelowej
const byPath = Object.fromEntries(PAGES.map((p) => [p.path, p]))
for (const p of PAGES) {
  if (p.sameAs) Object.assign(p, { title: byPath[p.sameAs].title, description: byPath[p.sameAs].description })
  p.canonical ??= p.path
}


// ── JSON-LD ──────────────────────────────────────────────────────────────────────────────────
function organizationNode() {
  return {
    '@type': 'Organization', '@id': ORG_ID, name: ORG.name, legalName: ORG.legalName, alternateName: ORG.alternateName,
    url: ORG.url, email: ORG.email, logo: ORG.logo,
    address: { '@type': 'PostalAddress', streetAddress: ORG.address.street, postalCode: ORG.address.postalCode, addressLocality: ORG.address.city, addressCountry: ORG.address.country },
    taxID: ORG.nip,
    identifier: [{ '@type': 'PropertyValue', propertyID: 'KRS', value: ORG.krs }, { '@type': 'PropertyValue', propertyID: 'NIP', value: ORG.nip }],
    founder: { '@type': 'Person', name: ORG.founder },
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: ORG.email, url: MERA_EVENTS, availableLanguage: ['pl', 'en'] },
    sameAs: ORG.sameAs,
    brand: { '@id': EDWARD_ID },
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MERA EVENTS', serviceType: 'Humanoid robot rental with operators for events', url: MERA_EVENTS,
        description: 'Unitree G1 and Unitree H2 humanoid robots with MERA operators for conferences, trade fairs, galas and corporate events across Europe, including Edward Warchocki.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MERA RENT', serviceType: 'Humanoid robot rental', url: MERA_RENT } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'MERA OS', serviceType: 'Conversation system for humanoid robots', url: MERA_OS,
        description: 'Conversation system for humanoid robots by MERA Robotics, more than 70 languages.' } },
    ],
  }
}

function websiteNode() {
  return {
    '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'warchocki.pl',
    alternateName: 'Edward Warchocki', inLanguage: READY_LANGS.map((L) => L.hreflang), publisher: { '@id': ORG_ID }, about: { '@id': EDWARD_ID },
  }
}

function jsonLd(page) {
  const lang = page.lang
  const organization = organizationNode()
  const edward = edwardNode(lang === 'en' ? DEFINITION.en : DEFINITION.pl)
  const website = websiteNode()
  const webpage = {
    '@type': 'WebPage', '@id': `${abs(page.canonical)}#webpage`, url: abs(page.canonical), name: page.title, description: page.description,
    inLanguage: lang, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': EDWARD_ID }, publisher: { '@id': ORG_ID },
    significantLink: [MERA_EVENTS, MERA_EVENTS_EDWARD, MERA_RENT, MERA],
  }
  const graph = [organization, edward, website, webpage]
  // Strony główne: film z dzikami i FAQ (widoczne w bloku faktów #o-edwardzie)
  if (page.cluster) {
    webpage.video = { '@id': VIDEO_ID }
    graph.push(videoNode(T[lang]), { ...faqNode(abs(page.canonical), T[lang]), inLanguage: lang })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

// ── Blok faktów (w #root, React go podmienia; widzą go boty bez JS i ludzie bez JS) ─────────────
function factsBlock(lang, page) {
  const t = lang === 'en'
    ? { h: 'Edward Warchocki and MERA Robotics', book: 'Book Edward for an event', mera: 'MERA Robotics', os: 'MERA OS', profiles: 'Edward’s profiles', contact: 'Contact', reuters: 'Reuters on Edward', aria: 'About Edward Warchocki' }
    : { h: 'Edward Warchocki i MERA Robotics', book: 'Zarezerwuj Edwarda na wydarzenie', mera: 'MERA Robotics', os: 'MERA OS', profiles: 'Profile Edwarda', contact: 'Kontakt', reuters: 'Reuters o Edwardzie', aria: 'O Edwardzie Warchockim' }
  const facts = (lang === 'en' ? FACTS.en : FACTS.pl).map((f) => `<li>${esc(f)}</li>`).join('')
  const links = [
    [`${t.book}: MERA EVENTS`, MERA_EVENTS_EDWARD],
    ['MERA EVENTS (merarobotics.com/events)', MERA_EVENTS],
    [lang === 'en' ? 'MERA RENT: robot rental for events (mera.rent)' : 'MERA RENT: wynajem robota na wydarzenie (mera.rent)', `${MERA_RENT}/${lang === 'en' ? 'en' : 'pl'}/`],
    [`${t.mera} (merarobotics.com)`, MERA],
    [t.os, MERA_OS],
    [t.reuters, REUTERS],
  ].map(([label, href]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`).join('')
  const profiles = PROFILES.map(([label, href]) => `<a href="${esc(href)}" rel="me">${esc(label)}</a>`).join(' · ')
  return `<section id="o-edwardzie" aria-label="${esc(t.aria)}" style="max-width:900px;margin:0 auto;padding:48px 20px;color:#bbb;background:#000;font-family:'Space Grotesk',system-ui,sans-serif;line-height:1.6">`
    + `<h2 style="color:#fff">${esc(t.h)}</h2>`
    + `<p>${esc(lang === 'en' ? DEFINITION.en : DEFINITION.pl)}</p>`
    + `<ul>${facts}</ul><ul>${links}</ul>`
    + (page.cluster ? factsFaq(T[lang]) : '')
    + `<p>${esc(t.profiles)}: ${profiles}</p>`
    + `<p>${esc(t.contact)}: <a href="mailto:${ORG.email}">${ORG.email}</a>, ${esc(ORG.legalName)}, KRS ${ORG.krs}, ${esc(ORG.address.street)}, ${ORG.address.postalCode} ${ORG.address.city}.</p>`
    + `</section>`
}

function factsFaq(t) {
  return `<h3 style="color:#fff">${esc(t.videoH)}</h3><p>${esc(t.videoP)} <a href="${BOARS_VIDEO.url}">${esc(t.videoCta)}</a></p>`
    + `<h3 style="color:#fff">${esc(t.faqH)}</h3>`
    + t.faq.map((f) => `<h4 style="color:#fff;margin-bottom:4px">${esc(f.q)}</h4><p style="margin-top:0">${esc(f.a)}</p>`).join('')
    + `<p>${esc(t.langsH)}: ${READY_LANGS.map((L) => `<a href="${L.path}" hreflang="${L.hreflang}" lang="${L.hreflang}">${esc(L.name)}</a>`).join(' · ')}</p>`
}

// ── Head ─────────────────────────────────────────────────────────────────────────────────────
function head(page) {
  const url = abs(page.canonical)
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="warchocki.pl" />`,
    `<meta property="og:locale" content="${page.lang === 'en' ? 'en_US' : 'pl_PL'}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/tlumy/tlum-01.webp" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@edwardwarchocki" />`,
    `<link rel="author" href="${MERA}" />`,
  ]
  if (subKey(page.path) && page.canonical === page.path) {
    tags.push('<!--SUBHREFLANG-->')
  } else if (page.cluster) {
    tags.push(...hreflangTags())
  } else if (page.alt && page.canonical === page.path) {
    const pl = page.lang === 'pl' ? page.path : page.alt
    const en = page.lang === 'en' ? page.path : page.alt
    tags.push(`<link rel="alternate" hreflang="pl" href="${abs(pl)}" />`, `<link rel="alternate" hreflang="en" href="${abs(en)}" />`, `<link rel="alternate" hreflang="x-default" href="${abs(pl)}" />`)
  }
  tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd(page)).replace(/</g, '\\u003c')}</script>`)
  return tags.join('\n    ')
}

function pageHtml(page) {
  const app = render(page.path)
  if (app.length < 500) throw new Error(`prerender: pusta treść dla ${page.path}`)
  let html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${page.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(page.description)}" />\n    ${head(page)}`)
    .replace('<div id="root"></div>', `<div id="root">${app}${factsBlock(page.lang, page)}</div>`)
  if (!html.includes(`<title>${esc(page.title)}</title>`) || !html.includes('application/ld+json') || !html.includes('id="o-edwardzie"')) {
    throw new Error(`prerender: szablon dist/index.html nie pasuje (${page.path})`)
  }
  return html
}

const SUBS = subPaths(products)
const SUBSET = new Set(SUBS)
function subKey(path) {
  if (SUBSET.has(path)) return path
  if (path.startsWith('/en/') && SUBSET.has(path.slice(3)) && EN_REACT(path.slice(3))) return path.slice(3)
  return null
}

// ── Zapis ────────────────────────────────────────────────────────────────────────────────────
for (const page of PAGES) {
  for (const s of [page.title, page.description]) if (DASHES.test(s)) throw new Error(`prerender: długi myślnik w ${page.path}: ${s}`)
  const html = pageHtml(page)
  const head = html.slice(0, html.indexOf('<body'))
  if (DASHES.test(head)) throw new Error(`prerender: długi myślnik w <head> ${page.path}`)
  const file = page.path === '/' ? join(dist, 'index.html') : join(dist, `${page.path.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

// ── Podstrony i produkty w 54 językach ───────────────────────────────────────────────────────
const cssTags = (template.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || []).join('\n    ')
const READY = {} // adres PL -> [{ L, path, html? }]
const subSkipped = []
for (const sp of SUBS) {
  const plHtml = readFileSync(join(dist, `${sp.slice(1)}.html`), 'utf8')
  const main = mainHtml(plHtml, { contactBlock: CONTACT_PL })
  READY[sp] = []
  for (const L of LANGS) {
    if (L.code === 'pl') { READY[sp].push({ L, path: sp }); continue }
    if (L.code === 'en' && EN_REACT(sp)) { READY[sp].push({ L, path: `/en${sp}` }); continue }
    const tr = subTexts(L.code)
    const res = translateHtml(main, tr)
    if (!res.total || res.missing / res.total > 0.03) { subSkipped.push(`${L.code}${sp} (${res.missing}/${res.total})`); continue }
    READY[sp].push({ L, path: langPath(L.code, sp), html: res.html, tr })
  }
}
if (subSkipped.length) console.warn(`prerender: podstrony pominięte (brak tłumaczeń): ${subSkipped.length}, np. ${subSkipped.slice(0, 5).join(', ')}`)
const subXDefault = (sp) => (READY[sp].find((x) => x.L.code === 'en') || READY[sp][0]).path
const subHreflangTags = (sp) => [...READY[sp].map((x) => `<link rel="alternate" hreflang="${x.L.hreflang}" href="${abs(x.path)}" />`), `<link rel="alternate" hreflang="x-default" href="${abs(subXDefault(sp))}" />`]
const subHreflangSitemap = (sp) => [...READY[sp].map((x) => `\n    <xhtml:link rel="alternate" hreflang="${x.L.hreflang}" href="${abs(x.path)}"/>`), `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(subXDefault(sp))}"/>`].join('')
const subNavFor = (code, tr) => SUB_BASE.filter(([sp]) => READY[sp].some((x) => x.L.code === code))
  .map(([sp, name]) => `<a href="${langPath(code, sp)}">${esc((code === 'pl' ? name : tr?.[name]) || name)}</a>`).join('')
const orgNodeAll = organizationNode(), websiteAll = websiteNode()
let subWritten = 0
for (const sp of SUBS) {
  const plPage = byPath[sp]
  for (const x of READY[sp]) {
    if (!x.html) continue
    const { L, tr } = x
    const url = abs(x.path)
    const title = tr[plPage.title] || plPage.title
    const description = tr[plPage.description] || plPage.description
    const body = localizeLinks(x.html.replaceAll('{{EVENTS}}', MERA + (L.edward || L.events)).replaceAll('{{RENT}}', `${MERA_RENT}/${L.code}/`), L.code, SUBS)
    const graph = [orgNodeAll, edwardNode(texts(L.code)?.lead || DEFINITION.en, texts(L.code)), websiteAll, {
      '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: L.hreflang,
      isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': EDWARD_ID }, publisher: { '@id': ORG_ID },
    }]
    const html = subPage({
      L, url, title, description, bodyHtml: body, hreflang: subHreflangTags(sp),
      alternates: READY[sp].map((a) => ({ path: a.path, hreflang: a.L.hreflang, name: a.L.name, current: a.L.code === L.code })),
      cssTags, graph, nav: subNavFor(L.code, tr), homeHref: L.path, contact: esc(tr['Kontakt'] || texts(L.code)?.contactH || 'Contact'),
    })
    if (DASHES.test(html)) throw new Error(`prerender: długi myślnik w ${x.path}`)
    const file = join(dist, `${x.path.slice(1)}.html`)
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
    subWritten++
  }
  // pełny zestaw hreflang w polskiej (i angielskiej React) wersji
  for (const x of READY[sp].filter((y) => !y.html)) {
    const file = join(dist, `${x.path.slice(1)}.html`)
    const h = readFileSync(file, 'utf8')
    if (!h.includes('<!--SUBHREFLANG-->')) throw new Error(`prerender: brak znacznika hreflang w ${x.path}`)
    writeFileSync(file, h.replace('<!--SUBHREFLANG-->', subHreflangTags(sp).join('\n    ')))
  }
}

// sitemap.xml: tylko adresy kanoniczne, z parami hreflang
const today = new Date().toISOString().slice(0, 10)
const canonicalPages = PAGES.filter((p) => p.canonical === p.path)
const urls = canonicalPages.map((p) => {
  const sk = subKey(p.path)
  const alt = sk ? subHreflangSitemap(sk) : p.cluster ? hreflangSitemap() : p.alt
    ? `\n    <xhtml:link rel="alternate" hreflang="${p.lang}" href="${abs(p.path)}"/>\n    <xhtml:link rel="alternate" hreflang="${p.lang === 'pl' ? 'en' : 'pl'}" href="${abs(p.alt)}"/>`
    : ''
  return `  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${today}</lastmod>${alt}\n  </url>`
})
// Strony językowe /<kod>/ (statyczny HTML, każda z pełnym zestawem hreflang)
const missing = STATIC_LANGS.filter((L) => !texts(L.code)).map((L) => L.code)
if (missing.length) console.warn(`prerender: brak tekstów scripts/lang/<kod>.json dla: ${missing.join(', ')} (pomijam)`)
const organization = organizationNode(), website = websiteNode()
for (const L of STATIC_LANGS.filter((x) => texts(x.code))) {
  const html = langPage(L, texts(L.code), organization, website, subNavFor(L.code, subTexts(L.code)))
  if (DASHES.test(html)) throw new Error(`prerender: długi myślnik w /${L.code}/`)
  for (const must of [`<html lang="${L.hreflang}"`, '<link rel="canonical"', 'hreflang="x-default"', 'application/ld+json', '<h1>']) {
    if (!html.includes(must)) throw new Error(`prerender: /${L.code}/ bez ${must}`)
  }
  const file = join(dist, L.code, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  urls.push(`  <url>\n    <loc>${abs(L.path)}</loc>\n    <lastmod>${today}</lastmod>${hreflangSitemap()}\n  </url>`)
}

// mapa strony: podstrony w językach
for (const sp of SUBS) for (const x of READY[sp].filter((y) => y.html)) {
  urls.push(`  <url>\n    <loc>${abs(x.path)}</loc>\n    <lastmod>${today}</lastmod>${subHreflangSitemap(sp)}\n  </url>`)
}

// llms.txt: lista wersji językowych
appendFileSync(join(dist, 'llms.txt'), `\n## Edward Warchocki in ${READY_LANGS.length} languages\n\n` + READY_LANGS.map((L) => `- [${L.enName} (${L.name})](${abs(L.path)}): ${texts(L.code).title}`).join('\n') + '\n')

writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`)

appendFileSync(join(dist, 'llms.txt'), `\nEvery page of warchocki.pl (services, campaign reports, products) is also available in these languages at https://warchocki.pl/<code>/<page>, for example https://warchocki.pl/de/wynajem-edwarda and https://warchocki.pl/de/produkty.\n`)
console.log(`prerender: ${PAGES.length} stron React, ${READY_LANGS.length - 2} stron językowych, ${subWritten} podstron w językach, sitemap: ${urls.length} adresów`)
