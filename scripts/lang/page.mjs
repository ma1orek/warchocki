// warchocki.pl: strony Edwarda w 52 językach (/<kod>/) jako statyczny HTML bez JavaScriptu oraz wspólne węzły JSON-LD
// (Edward, film z dzikami, FAQ) i zestaw hreflang 54 wersji dla stron głównych / i /en. Teksty: scripts/lang/<kod>.json
// (pl i en piszemy ręcznie, resztę tłumaczy scripts/lang-fill.mjs). Fakty tylko z scripts/seo-facts.mjs.
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE, MERA, MERA_RENT, MERA_OS, REUTERS, ORG, ORG_ID, EDWARD_ID, EDWARD_SAME_AS, PROFILES, BOARS_VIDEO,
} from '../seo-facts.mjs'
import { LANGS, STATIC_LANGS, X_DEFAULT } from './langs.mjs'

const DIR = dirname(fileURLToPath(import.meta.url))
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
export const abs = (path) => SITE + (path === '/' ? '/' : path)

export function texts(code) {
  const file = join(DIR, `${code}.json`)
  if (!existsSync(file)) return null
  return JSON.parse(readFileSync(file, 'utf8').replace(/^﻿/, ''))
}

// Wersje, które mają teksty (pl i en zawsze; pozostałe, gdy jest plik). Build nie pada bez pliku, ale prerender to zgłasza.
export const READY_LANGS = LANGS.filter((L) => texts(L.code))

// ── hreflang ─────────────────────────────────────────────────────────────────────────────────
export function hreflangTags() {
  return [
    ...READY_LANGS.map((L) => `<link rel="alternate" hreflang="${L.hreflang}" href="${abs(L.path)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${abs(X_DEFAULT)}" />`,
  ]
}
export function hreflangSitemap() {
  return [
    ...READY_LANGS.map((L) => `\n    <xhtml:link rel="alternate" hreflang="${L.hreflang}" href="${abs(L.path)}"/>`),
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(X_DEFAULT)}"/>`,
  ].join('')
}

// ── JSON-LD ──────────────────────────────────────────────────────────────────────────────────
export const VIDEO_ID = `${SITE}/#film-dziki`
export function videoNode(t) {
  return {
    '@type': 'VideoObject', '@id': VIDEO_ID, name: t.videoName, description: t.videoDesc,
    thumbnailUrl: [BOARS_VIDEO.thumbnail], uploadDate: BOARS_VIDEO.uploadDate, duration: BOARS_VIDEO.duration,
    contentUrl: BOARS_VIDEO.url, embedUrl: BOARS_VIDEO.embed, inLanguage: 'pl', about: { '@id': EDWARD_ID },
    contentLocation: { '@type': 'Place', name: 'Warszawa, Polska' },
  }
}
export function faqNode(url, t) {
  return {
    '@type': 'FAQPage', '@id': `${url}#faq`, url,
    mainEntity: t.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}
export function edwardNode(description, t) {
  return {
    '@type': 'Brand', '@id': EDWARD_ID, name: 'Edward Warchocki',
    alternateName: ['Edek', ...(t && t.nameLocal ? [t.nameLocal] : [])],
    description, url: `${SITE}/`, logo: `${SITE}/favicon.svg`, image: `${SITE}/tlumy/tlum-01.webp`, sameAs: EDWARD_SAME_AS,
    subjectOf: [{ '@type': 'CreativeWork', name: 'Reuters: Edward Warchocki', url: REUTERS }, { '@id': VIDEO_ID }],
  }
}

// ── Strona statyczna /<kod>/ ─────────────────────────────────────────────────────────────────
const CSS = `
:root{--bg:#000;--fg:#f2f2f2;--mut:#b8b8b8;--acc:#E3F1FF;--acc2:#B9DCFF;--line:#222}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 "Space Grotesk",system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans","Noto Sans Arabic","Noto Sans Hebrew","Noto Sans JP","Noto Sans SC","Noto Sans KR","Noto Sans Devanagari","Noto Sans Thai","Noto Sans Georgian","Noto Sans Armenian",sans-serif}
a{color:var(--acc2)}a:hover{color:#fff}
.w{max-width:1040px;margin:0 auto;padding:0 16px}
header{border-bottom:1px solid var(--line)}
header .w{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:60px}
.brand{color:#fff;font-weight:700;text-decoration:none;letter-spacing:.02em}
details.lang{position:relative}details.lang summary{cursor:pointer;list-style:none;color:var(--mut);padding:8px 12px;border:1px solid var(--line);border-radius:0}
details.lang summary::-webkit-details-marker{display:none}
details.lang[open] ul{position:absolute;inset-inline-end:0;z-index:5;background:#0b0b0b;border:1px solid var(--line);max-height:70vh;overflow:auto;width:min(260px,80vw)}
details.lang ul,.langs{list-style:none;margin:0;padding:8px}details.lang li a{display:block;padding:4px 8px;text-decoration:none}
.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;padding:48px 0}
.kick{color:var(--acc2);font-size:.9rem;letter-spacing:.06em;text-transform:uppercase;margin:0 0 8px}
h1{font-size:clamp(2rem,5vw,3.4rem);line-height:1.1;margin:0 0 20px}
h2{font-size:clamp(1.4rem,3vw,2rem);line-height:1.2;margin:0 0 14px}
h3{font-size:1.1rem;margin:22px 0 6px}
p{margin:0 0 14px;color:var(--fg)}.mut{color:var(--mut)}
.hero img{width:100%;height:auto;display:block}
.cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}
.btn{display:inline-block;padding:12px 18px;background:var(--acc);color:#000;text-decoration:none;font-weight:600}
.btn.o{background:transparent;color:var(--acc);border:1px solid var(--acc)}
section.s{padding:40px 0;border-top:1px solid var(--line)}
.vid{display:grid;grid-template-columns:240px 1fr;gap:28px;align-items:start}
.vid a.th{display:block;position:relative}.vid a.th img{width:100%;height:auto;display:block}
.vid a.th span{position:absolute;inset:0;display:grid;place-items:center;font-size:3rem;color:#fff;text-shadow:0 2px 12px #000}
.langs{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:4px 16px;padding:0}
.langs a{text-decoration:none}.langs a[aria-current]{color:#fff;font-weight:700}
footer{border-top:1px solid var(--line);padding:32px 0 48px;color:var(--mut);font-size:.92rem}
@media (max-width:760px){.hero,.vid{grid-template-columns:1fr}.hero{padding:28px 0;gap:24px}.vid{gap:16px}.vid a.th{max-width:240px}}
`.replace(/\n/g, '')

const GTAG = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-5WJ0SLHCZV"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5WJ0SLHCZV');</script>`

export function langPage(L, t, orgNode, websiteNode, subNav = '') {
  const url = abs(L.path)
  const bookUrl = MERA + (L.edward || L.events)
  const rentUrl = `${MERA_RENT}/${L.code}/`
  const graph = [
    orgNode,
    edwardNode(t.lead, t),
    websiteNode,
    {
      '@type': 'WebPage', '@id': `${url}#webpage`, url, name: t.title, description: t.description, inLanguage: L.hreflang,
      isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': EDWARD_ID }, publisher: { '@id': ORG_ID },
      primaryImageOfPage: `${SITE}/tlumy/tlum-01.webp`, video: { '@id': VIDEO_ID }, significantLink: [bookUrl, rentUrl, MERA],
    },
    videoNode(t),
    { ...faqNode(url, t), inLanguage: L.hreflang },
  ]
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  const head = [
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-video-preview:-1" />`,
    ...hreflangTags(),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="warchocki.pl" />`,
    `<meta property="og:locale" content="${L.locale}" />`,
    `<meta property="og:title" content="${esc(t.title)}" />`,
    `<meta property="og:description" content="${esc(t.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/tlumy/tlum-01.webp" />`,
    `<meta property="og:image:alt" content="${esc(t.imgAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@edwardwarchocki" />`,
    `<link rel="author" href="${MERA}" />`,
    `<script type="application/ld+json">${ld}</script>`,
  ].join('\n    ')

  const langList = () => READY_LANGS.map((x) => `<li><a href="${x.path}" hreflang="${x.hreflang}" lang="${x.hreflang}"${x.code === L.code ? ' aria-current="page"' : ''}>${esc(x.name)}</a></li>`).join('')
  const faq = t.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')
  const profiles = PROFILES.map(([label, href]) => `<li><a href="${href}" rel="me">${label}</a></li>`).join('')

  return `<!doctype html>
<html lang="${L.hreflang}" dir="${L.rtl ? 'rtl' : 'ltr'}">
  <head>
    <meta charset="UTF-8" />
    ${GTAG}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(t.title)}</title>
    <meta name="description" content="${esc(t.description)}" />
    ${head}
    <style>${CSS}</style>
  </head>
  <body>
    <header><div class="w">
      <a class="brand" href="${L.path}">warchocki.pl</a>
      <details class="lang"><summary aria-label="${esc(t.langsH)}">${esc(L.name)} ▾</summary><ul>${langList()}</ul></details>
    </div></header>
    <main>
      <div class="w hero">
        <div>
          <p class="kick">${esc(t.kicker)}</p>
          <h1>${esc(t.h1)}</h1>
          <p>${esc(t.lead)}</p>
          <div class="cta"><a class="btn" href="${bookUrl}">${esc(t.bookEvents)}</a><a class="btn o" href="#film">${esc(t.videoH)}</a></div>
        </div>
        <img src="/tlumy/tlum-01-600.webp" width="600" height="750" alt="${esc(t.imgAlt)}" fetchpriority="high" />
      </div>
      <section class="s" id="film"><div class="w vid">
        <a class="th" href="${BOARS_VIDEO.url}" rel="noopener"><img src="${BOARS_VIDEO.thumbnail}" width="480" height="360" alt="${esc(t.videoName)}" loading="lazy" /><span aria-hidden="true">▶</span></a>
        <div>
          <h2>${esc(t.videoH)}</h2>
          <p>${esc(t.videoP)}</p>
          <p><a href="${BOARS_VIDEO.url}" rel="noopener">${esc(t.videoCta)}</a> · <a href="${REUTERS}" rel="noopener">${esc(t.reuters)}</a></p>
        </div>
      </div></section>
      <section class="s"><div class="w">
        <h2>${esc(t.reachH)}</h2>
        <p>${esc(t.reachP)}</p>
        <h2 style="margin-top:28px">${esc(t.mediaH)}</h2>
        <p>${esc(t.mediaP)}</p>
        <p class="mut">${esc(t.productsP)}</p>
      </div></section>
      <section class="s" id="faq"><div class="w">
        <h2>${esc(t.faqH)}</h2>
        ${faq}
      </div></section>
      <section class="s" id="wydarzenia"><div class="w">
        <h2>${esc(t.bookH)}</h2>
        <p>${esc(t.bookP)}</p>
        <div class="cta"><a class="btn" href="${bookUrl}">${esc(t.bookEvents)}</a><a class="btn o" href="${rentUrl}">${esc(t.bookRent)}</a></div>
      </div></section>
${subNav ? `      <section class="s"><div class="w"><p>${subNav}</p></div></section>\n` : ''}      <section class="s"><div class="w">
        <h2>${esc(t.profilesH)}</h2>
        <ul class="langs">${profiles}</ul>
      </div></section>
      <section class="s"><div class="w">
        <h2>${esc(t.langsH)}</h2>
        <ul class="langs">${langList()}</ul>
      </div></section>
    </main>
    <footer><div class="w">
      ${subNav ? `<p>${subNav}</p>` : ''}
      <p><a href="/">${esc(t.fullSitePl)}</a> · <a href="/en">${esc(t.fullSiteEn)}</a> · <a href="${MERA}">MERA Robotics</a> · <a href="${MERA_OS}">MERA OS</a></p>
      <p>${esc(t.contactH)}: <a href="mailto:${ORG.email}">${ORG.email}</a>, ${esc(ORG.legalName)}, KRS ${ORG.krs}, NIP ${ORG.nip}, ${esc(ORG.address.street)}, ${ORG.address.postalCode} ${ORG.address.city}.</p>
    </div></footer>
  </body>
</html>
`
}

export { STATIC_LANGS }

// ── Podstrona /<kod>/<adres> (scripts/lang/sub.mjs) ─────────────────────────────────────────
const SUB_CSS = `
.wh{position:sticky;top:0;z-index:50;background:#000;border-bottom:1px solid #222;font-family:"Space Grotesk",system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans",sans-serif}
.wh .w{max-width:1200px;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:60px}
.wh a.b{color:#fff;font-weight:700;text-decoration:none}
.wh nav{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:14px}.wh nav a{color:#B9DCFF;text-decoration:none}
.wh details{position:relative}.wh summary{cursor:pointer;list-style:none;color:#bbb;padding:8px 12px;border:1px solid #222}
.wh summary::-webkit-details-marker{display:none}
.wh details[open] ul{position:absolute;inset-inline-end:0;top:100%;z-index:60;background:#0b0b0b;border:1px solid #222;max-height:70vh;overflow:auto;width:min(260px,80vw);list-style:none;margin:0;padding:8px}
.wh li a{display:block;padding:4px 8px;color:#B9DCFF;text-decoration:none}.wh li a[aria-current]{color:#fff;font-weight:700}
.wf{border-top:1px solid #222;background:#000;color:#aaa;font:15px/1.6 "Space Grotesk",system-ui,sans-serif;padding:28px 0 40px}
.wf .w{max-width:1200px;margin:0 auto;padding:0 16px}.wf a{color:#B9DCFF}
@media (max-width:760px){.wh nav{display:none}}
`.replace(/\n/g, '')

export function subPage({ L, url, title, description, bodyHtml, hreflang, alternates, cssTags, graph, nav, homeHref, contact }) {
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  const langs = alternates.map((a) => `<li><a href="${a.path}" hreflang="${a.hreflang}" lang="${a.hreflang}"${a.current ? ' aria-current="page"' : ''}>${esc(a.name)}</a></li>`).join('')
  return `<!doctype html>
<html lang="${L.hreflang}" dir="${L.rtl ? 'rtl' : 'ltr'}">
  <head>
    <meta charset="UTF-8" />
    ${GTAG}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    ${hreflang.join('\n    ')}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="warchocki.pl" />
    <meta property="og:locale" content="${L.locale}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE}/tlumy/tlum-01.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="author" href="${MERA}" />
    ${cssTags}
    <style>${SUB_CSS}</style>
    <script type="application/ld+json">${ld}</script>
  </head>
  <body style="background:#000">
    <header class="wh"><div class="w">
      <a class="b" href="${homeHref}">warchocki.pl</a>
      <nav>${nav}</nav>
      <details><summary>${esc(L.name)} ▾</summary><ul>${langs}</ul></details>
    </div></header>
    <main>${bodyHtml}</main>
    <footer class="wf"><div class="w">
      <p>${nav.replace(/<\/a><a/g, '</a> · <a')}</p>
      <p><a href="${MERA}">MERA Robotics</a> · <a href="${MERA_OS}">MERA OS</a> · ${contact}: <a href="mailto:${ORG.email}">${ORG.email}</a>, ${esc(ORG.legalName)}, KRS ${ORG.krs}, ${esc(ORG.address.street)}, ${ORG.address.postalCode} ${ORG.address.city}.</p>
    </div></footer>
  </body>
</html>
`
}
