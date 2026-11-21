// warchocki.pl: negocjacja treści dla agentów AI (21.11.2026). Żądanie strony głównej (/, /en, /<kod>/) z nagłówkiem
// Accept, w którym text/markdown stoi przed text/html (albo bez text/html), dostaje wersję Markdown (/index.md, /en.md,
// /<kod>/index.md, generuje je scripts/prerender.mjs). Przeglądarki wysyłają text/html pierwsze, więc dostają HTML jak dotąd.
// Lista adresów = 54 wersje z scripts/lang/langs.mjs (nowy język = dopisać tutaj).
const wantsMarkdown = (accept) => {
  const a = (accept || '').toLowerCase()
  const md = a.indexOf('text/markdown')
  if (md < 0) return false
  const html = a.indexOf('text/html')
  return html < 0 || md < html
}

const mdPathOf = (p) => {
  if (p === '/') return '/index.md'
  if (p === '/en') return '/en.md'
  const code = p.split('/').filter(Boolean)[0]
  return `/${code}/index.md`
}

export default async (request, context) => {
  if (wantsMarkdown(request.headers.get('accept'))) {
    const url = new URL(request.url)
    const res = await fetch(new URL(mdPathOf(url.pathname), url.origin))
    if (res.ok) {
      const canonical = url.pathname.length > 1 && !url.pathname.endsWith('/') && url.pathname !== '/en' ? `${url.pathname}/` : url.pathname
      return new Response(res.body, {
        status: 200,
        headers: {
          'content-type': 'text/markdown; charset=utf-8',
          vary: 'Accept',
          'cache-control': 'public, max-age=0, must-revalidate',
          link: `<${url.origin}${canonical}>; rel="canonical"`,
        },
      })
    }
  }
  const res = await context.next()
  res.headers.append('vary', 'Accept')
  return res
}

export const config = {
  path: ["/","/en","/de","/de/","/fr","/fr/","/it","/it/","/es","/es/","/nl","/nl/","/pt","/pt/","/sv","/sv/","/da","/da/","/no","/no/","/fi","/fi/","/et","/et/","/lv","/lv/","/lt","/lt/","/uk","/uk/","/cs","/cs/","/sk","/sk/","/hu","/hu/","/ro","/ro/","/bg","/bg/","/hr","/hr/","/sl","/sl/","/el","/el/","/ca","/ca/","/eu","/eu/","/gl","/gl/","/cy","/cy/","/ga","/ga/","/mt","/mt/","/lb","/lb/","/is","/is/","/tr","/tr/","/sq","/sq/","/sr","/sr/","/bs","/bs/","/mk","/mk/","/ka","/ka/","/hy","/hy/","/az","/az/","/ru","/ru/","/ar","/ar/","/he","/he/","/zh","/zh/","/ja","/ja/","/ko","/ko/","/hi","/hi/","/id","/id/","/ms","/ms/","/th","/th/","/vi","/vi/","/en-us","/en-us/","/es-la","/es-la/","/pt-br","/pt-br/"],
}
