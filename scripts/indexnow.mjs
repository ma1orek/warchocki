// warchocki.pl: zgłasza adresy z produkcyjnej sitemapy do IndexNow (Bing, Yandex, Seznam, Naver; api.indexnow.org
// przekazuje zgłoszenie pozostałym wyszukiwarkom protokołu). Klucz jest publiczny: public/<klucz>.txt.
// Uruchom po wdrożeniu: node scripts/indexnow.mjs [--only-new]   (--only-new: tylko strony językowe /<kod>/)
import { STATIC_LANGS } from './lang/langs.mjs'

const HOST = 'warchocki.pl'
const KEY = '362984f88cdaeadb00c1f030f721ead2'
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
  'https://search.seznam.cz/indexnow',
  'https://searchadvisor.naver.com/indexnow',
]

const keyRes = await fetch(`https://${HOST}/${KEY}.txt`)
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) throw new Error('indexnow: plik klucza na produkcji nie odpowiada')

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
let urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (process.argv.includes('--only-new')) urls = urls.filter((u) => STATIC_LANGS.some((L) => u === `https://${HOST}${L.path}`))
urls.push(`https://${HOST}/llms.txt`, `https://${HOST}/llms-full.txt`)
console.log(`indexnow: ${urls.length} adresów`)

const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls })
for (const ep of ENDPOINTS) {
  try {
    const r = await fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body })
    console.log(`${ep}: ${r.status} ${r.statusText}`)
  } catch (e) {
    console.log(`${ep}: błąd ${e.message}`)
  }
}
