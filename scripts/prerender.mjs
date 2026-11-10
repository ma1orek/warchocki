// Prerender warchocki.pl (krok `npm run build` po `vite build` i `vite build --ssr`).
// Dla każdej trasy z App.tsx zapisuje statyczny HTML z treścią strony (renderToString), własnym <title>,
// opisem, canonical, hreflang, Open Graph, JSON-LD (MERA Robotics + Edward Warchocki) i blokiem faktów.
// W przeglądarce main.tsx robi createRoot().render(), więc React podmienia ten HTML na żywą aplikację:
// ludzie widzą stronę jak dotąd, a boty bez JS (GPTBot, ClaudeBot, PerplexityBot) dostają treść.
// Pliki: / -> dist/index.html, /wynajem-edwarda -> dist/wynajem-edwarda.html (Netlify serwuje bez .html).
// Generuje też dist/sitemap.xml. Fakty tylko z scripts/seo-facts.mjs.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import {
  SITE, MERA, MERA_EVENTS, MERA_EVENTS_EDWARD, MERA_RENT, MERA_OS, REUTERS,
  ORG, ORG_ID, EDWARD_ID, EDWARD_SAME_AS, PROFILES, DEFINITION, FACTS,
} from './seo-facts.mjs'

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
  {
    path: '/', lang: 'pl', alt: '/en',
    title: 'Edward Warchocki, robot humanoidalny MERA Robotics | warchocki.pl',
    description: 'Edward Warchocki to robot humanoidalny (Unitree G1) prowadzony przez MERA Robotics. Rozmawia dzięki MERA OS w ponad 70 językach. Rezerwacja na eventy: MERA EVENTS i MERA RENT.',
  },
  {
    path: '/en', lang: 'en', alt: '/',
    title: 'Edward Warchocki, humanoid robot by MERA Robotics | warchocki.pl',
    description: 'Edward Warchocki is a humanoid robot (Unitree G1) run by MERA Robotics. He talks thanks to MERA OS in more than 70 languages. Book him for events via MERA EVENTS and MERA RENT.',
  },
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
  // Angielskie adresy podstron, których treść jest po polsku: canonical na polską wersję
  { path: '/en/wspolpraca', lang: 'pl', canonical: '/wspolpraca', sameAs: '/wspolpraca' },
  { path: '/en/wynajem-edwarda', lang: 'pl', canonical: '/wynajem-edwarda', sameAs: '/wynajem-edwarda' },
  { path: '/en/wynajem-robotow', lang: 'pl', canonical: '/wynajem-robotow', sameAs: '/wynajem-robotow' },
  { path: '/en/promocja-social-media', lang: 'pl', canonical: '/promocja-social-media', sameAs: '/promocja-social-media' },
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

const abs = (path) => SITE + (path === '/' ? '/' : path)

// ── JSON-LD ──────────────────────────────────────────────────────────────────────────────────
function jsonLd(page) {
  const lang = page.lang
  const organization = {
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
  const edward = {
    '@type': 'Brand', '@id': EDWARD_ID, name: 'Edward Warchocki', alternateName: 'Edek',
    description: lang === 'en' ? DEFINITION.en : DEFINITION.pl,
    url: `${SITE}/`, logo: `${SITE}/favicon.svg`, sameAs: EDWARD_SAME_AS,
    subjectOf: [{ '@type': 'CreativeWork', name: 'Reuters: Edward Warchocki', url: REUTERS }],
  }
  const website = {
    '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'warchocki.pl',
    alternateName: 'Edward Warchocki', inLanguage: ['pl', 'en'], publisher: { '@id': ORG_ID }, about: { '@id': EDWARD_ID },
  }
  const webpage = {
    '@type': 'WebPage', '@id': `${abs(page.canonical)}#webpage`, url: abs(page.canonical), name: page.title, description: page.description,
    inLanguage: lang, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': EDWARD_ID }, publisher: { '@id': ORG_ID },
    significantLink: [MERA_EVENTS, MERA_EVENTS_EDWARD, MERA_RENT, MERA],
  }
  return { '@context': 'https://schema.org', '@graph': [organization, edward, website, webpage] }
}

// ── Blok faktów (w #root, React go podmienia; widzą go boty bez JS i ludzie bez JS) ─────────────
function factsBlock(lang) {
  const t = lang === 'en'
    ? { h: 'Edward Warchocki and MERA Robotics', book: 'Book Edward for an event', mera: 'MERA Robotics', os: 'MERA OS', profiles: 'Edward’s profiles', contact: 'Contact', reuters: 'Reuters on Edward', aria: 'About Edward Warchocki' }
    : { h: 'Edward Warchocki i MERA Robotics', book: 'Zarezerwuj Edwarda na wydarzenie', mera: 'MERA Robotics', os: 'MERA OS', profiles: 'Profile Edwarda', contact: 'Kontakt', reuters: 'Reuters o Edwardzie', aria: 'O Edwardzie Warchockim' }
  const facts = (lang === 'en' ? FACTS.en : FACTS.pl).map((f) => `<li>${esc(f)}</li>`).join('')
  const links = [
    [`${t.book}: MERA EVENTS`, MERA_EVENTS_EDWARD],
    ['MERA EVENTS (merarobotics.com/events)', MERA_EVENTS],
    ['MERA RENT (mera.rent)', MERA_RENT],
    [`${t.mera} (merarobotics.com)`, MERA],
    [t.os, MERA_OS],
    [t.reuters, REUTERS],
  ].map(([label, href]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`).join('')
  const profiles = PROFILES.map(([label, href]) => `<a href="${esc(href)}" rel="me">${esc(label)}</a>`).join(' · ')
  return `<section id="o-edwardzie" aria-label="${esc(t.aria)}" style="max-width:900px;margin:0 auto;padding:48px 20px;color:#bbb;background:#000;font-family:'Space Grotesk',system-ui,sans-serif;line-height:1.6">`
    + `<h2 style="color:#fff">${esc(t.h)}</h2>`
    + `<p>${esc(lang === 'en' ? DEFINITION.en : DEFINITION.pl)}</p>`
    + `<ul>${facts}</ul><ul>${links}</ul>`
    + `<p>${esc(t.profiles)}: ${profiles}</p>`
    + `<p>${esc(t.contact)}: <a href="mailto:${ORG.email}">${ORG.email}</a>, ${esc(ORG.legalName)}, KRS ${ORG.krs}, ${esc(ORG.address.street)}, ${ORG.address.postalCode} ${ORG.address.city}.</p>`
    + `</section>`
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
  if (page.alt && page.canonical === page.path) {
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
    .replace('<div id="root"></div>', `<div id="root">${app}${factsBlock(page.lang)}</div>`)
  if (!html.includes(`<title>${esc(page.title)}</title>`) || !html.includes('application/ld+json') || !html.includes('id="o-edwardzie"')) {
    throw new Error(`prerender: szablon dist/index.html nie pasuje (${page.path})`)
  }
  return html
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

// sitemap.xml: tylko adresy kanoniczne, z parami hreflang
const today = new Date().toISOString().slice(0, 10)
const canonicalPages = PAGES.filter((p) => p.canonical === p.path)
const urls = canonicalPages.map((p) => {
  const alt = p.alt
    ? `\n    <xhtml:link rel="alternate" hreflang="${p.lang}" href="${abs(p.path)}"/>\n    <xhtml:link rel="alternate" hreflang="${p.lang === 'pl' ? 'en' : 'pl'}" href="${abs(p.alt)}"/>`
    : ''
  return `  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${today}</lastmod>${alt}\n  </url>`
})
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`)

console.log(`prerender: ${PAGES.length} stron, sitemap: ${canonicalPages.length} adresów`)
