// Fakty o Edwardzie i MERA Robotics dla prerenderu, JSON-LD i llms.txt.
// ŹRÓDŁO: C:\Users\idzik\merarobotics\netlify\functions\lib\seo-facts.mjs (ORG, EDWARD_ENTITY, F7, F11, F12, F30-F35, F38).
// Kopia, bo build warchocki.pl (GitHub Action) nie ma repo merarobotics. Zmiana faktu = najpierw tam, potem tutaj.
// Zasady: zero cen, zero superlatywów, zero długich myślników (prerender rzuca błąd przy U+2013 i U+2014).

export const SITE = 'https://warchocki.pl'
export const MERA = 'https://merarobotics.com'
export const MERA_EVENTS = 'https://merarobotics.com/events'
export const MERA_EVENTS_EDWARD = 'https://merarobotics.com/events/edward-warchocki'
export const MERA_RENT = 'https://mera.rent'
export const MERA_OS = 'https://merarobotics.com/aplikacja/'
export const REUTERS = 'https://x.com/Reuters/status/2044092064657199303'

export const ORG = {
  name: 'MERA Robotics',
  legalName: 'MERA ROBOTICS sp. z o.o.',
  alternateName: ['MERA', 'MeraRobotics', 'MERA ROBOTICS sp. z o.o.'],
  url: MERA,
  email: 'contact@merarobotics.com',
  logo: `${MERA}/media/blog/mera-logo.png`,
  address: { street: 'ul. Komitetu Obrony Robotników 30 lok. 96', postalCode: '02-148', city: 'Warszawa', country: 'PL' },
  krs: '0001266221',
  nip: '5223384081',
  founder: 'Bartosz Idzik',
  // ORG.sameAs z seo-facts bez profili Edwarda (te należą do encji Edwarda)
  sameAs: ['https://www.linkedin.com/company/mera-robotics/', 'https://merarobots.com'],
}

// Te same @id co na merarobotics.com (seo-entity.mjs), żeby obie strony opisywały jedną encję.
export const ORG_ID = `${MERA}/#organization`
export const EDWARD_ID = `${MERA}/#edward-warchocki`

// EDWARD_ENTITY.sameAs (bez warchocki.pl, który jest jego url); profile społecznościowe są też w SocialLinks.tsx
export const EDWARD_SAME_AS = [
  'https://pl.wikipedia.org/wiki/Edward_Warchocki',
  'https://www.wikidata.org/wiki/Q141129635',
  'https://www.wikidata.org/wiki/Q139497759',
  'https://www.tiktok.com/@edwardwarchocki',
  'https://www.instagram.com/edwardwarchocki/',
  'https://www.youtube.com/@EdwardWarchocki',
  'https://www.facebook.com/edwardwarchocki',
  'https://x.com/edwardwarchocki',
]

export const PROFILES = [
  ['TikTok', 'https://www.tiktok.com/@edwardwarchocki'],
  ['Instagram', 'https://www.instagram.com/edwardwarchocki/'],
  ['YouTube', 'https://www.youtube.com/@EdwardWarchocki'],
  ['Facebook', 'https://www.facebook.com/edwardwarchocki'],
  ['X', 'https://x.com/edwardwarchocki'],
]

// Zdania o encji (F11, F7, F30, F12, F34, F38 + rezerwacja przez MERA EVENTS i MERA RENT)
export const DEFINITION = {
  pl: 'Edward Warchocki to robot humanoidalny (Unitree G1, ok. 132 cm) prowadzony przez MERA Robotics (MERA ROBOTICS sp. z o.o., Warszawa). Rozmawia dzięki MERA OS, systemowi rozmów MERA Robotics, który obsługuje ponad 70 języków. Można go zarezerwować na wydarzenie przez MERA EVENTS i MERA RENT.',
  en: 'Edward Warchocki is a humanoid robot (Unitree G1, about 132 cm) run by MERA Robotics (MERA ROBOTICS sp. z o.o., Warsaw, Poland). He talks thanks to MERA OS, the MERA Robotics conversation system that supports more than 70 languages. He can be booked for events via MERA EVENTS and MERA RENT.',
}

export const FACTS = {
  pl: [
    'Edward Warchocki to robot humanoidalny (Unitree G1, ok. 132 cm) prowadzony przez MERA Robotics, influencer z własnym charakterem („pewny siebie, bezpośredni, z humorem”). Jego twórcami są Bartosz Idzik i Radosław Grzelaczyk.',
    'Edward rozmawia dzięki MERA OS, autorskiemu systemowi rozmów MERA Robotics. MERA OS obsługuje rozmowy w ponad 70 językach.',
    'MERA Robotics wynajmuje roboty humanoidalne z operatorami na konferencje, targi, gale i eventy firmowe w całej Europie. Edwarda można zarezerwować przez MERA EVENTS i MERA RENT.',
    'Według danych kanałów Edwarda (stan na listopad 2026) jego treści mają około 3 miliardów wyświetleń miesięcznie na TikToku, Instagramie, YouTubie, Facebooku i X.',
    'W kwietniu 2026 nagranie, na którym Edward przegania dziki na ulicy w Warszawie, obiegło świat; relacjonował je m.in. Reuters.',
    'Edward ma własne produkty w handlu: napoje bez dodatku cukru i musy owocowe (m.in. w sklepach DINO i Biedronka) oraz kolekcję szkolną w Biedronce.',
  ],
  en: [
    'Edward Warchocki is a humanoid robot (Unitree G1, about 132 cm) run by MERA Robotics, an influencer with his own character (confident, direct, with a sense of humour). He was created by Bartosz Idzik and Radosław Grzelaczyk.',
    'Edward talks thanks to MERA OS, the conversation system built by MERA Robotics. MERA OS supports conversations in more than 70 languages.',
    'MERA Robotics rents humanoid robots with operators for conferences, trade fairs, galas and corporate events across Europe. Edward can be booked via MERA EVENTS and MERA RENT.',
    'According to the data of Edward’s channels (November 2026), his content gets about 3 billion views per month on TikTok, Instagram, YouTube, Facebook and X.',
    'In April 2026 a video of Edward chasing wild boars on a street in Warsaw went around the world; it was covered by Reuters, among others.',
    'Edward has his own products in stores: drinks with no added sugar and fruit mousses (in DINO and Biedronka stores, among others) and a school collection in Biedronka.',
  ],
}
