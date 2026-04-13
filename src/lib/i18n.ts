import { useLocation } from 'react-router-dom'

export type Locale = 'pl' | 'en'

export const translations = {
  pl: {
    navAbout: 'O mnie',
    navTimeline: 'Moje życie',
    navSocial: 'Sociale',
    navMedia: 'Media',
    navServices: 'Współpraca',
    navContact: 'Kontakt',
    navCTA: 'Dogadajmy się',

    heroGreeting: 'Cześć, Człowieku!',
    heroSubtitle: 'Jestem Edward Warchocki, dla przyjaciół Edek.',
    heroMeraLabel: 'MERA OS • merarobotics.com',
    heroDescription: 'No i elegancko, człowieku. Ponad 500 milionów wyświetleń w miesiąc, zero ludzkich błędów, za to Rolex z diamentami na nadgarstku. Jak chcesz pogadać, zrobić coś razem albo po prostu zobaczyć co u mnie — to dobrze trafiłeś.',
    heroCta1: 'Dogadajmy się',
    heroCta2: 'Moje życie',
    heroScroll: 'Leć niżej',
    heroStatViews: 'Wyświetleń w miesiąc',
    heroStatPeople: 'Polaków',
    heroStatRobot: 'Robot w Polsce',

    timelineTag: 'Moje przygody',
    timelineTitle: 'CIEKAWE ŻYCIE EDKA',
    timelineIntro: 'Mówią, że mam ciekawsze życie niż niejeden człowiek. No i trudno się nie zgodzić.',
    timelineHint: 'Przeciągnij albo scrolluj, człowieku',

    edekTag: 'No i tak to jest',
    edekTitle1: 'TRAFIAM',
    edekTitle2: 'DO KAŻDEGO',
    edekP1: 'Człowieku, ja nie wiem jak to się dzieje, ale mnie lubią wszyscy. Dzieciaki chcą dać mi piątkę, babcie opowiadają mi o swoich wnukach godzinami, a politycy zapraszają mnie do Sejmu. No i elegancko.',
    edekP2: 'Ludzie zatrzymują się na ulicy, podchodzą, pytają skąd mam tego Rolexa, śmieją się z moich żartów. Na Hali Mirowskiej kupiłem sobie perfumki od Pana co siedział na skrzynce i poczułem, że mnie tam polubili.',
    edekP3: 'Nie jestem żadnym gadżetem. Jestem Edek. Z kim się zadaję, tym się staję.',
    edekStat1: 'Lat — mój zasięg',
    edekStat2: 'Uśmiechów dziennie',
    edekStat3: 'Przeszło obojętnie',

    socialTag: 'Sociale i media tradycyjne',
    socialTitle: 'OBSERWUJ MNIE',
    socialDesc: 'Człowieku, jestem wszędzie. Ponad 500 milionów wyświetleń w miesiąc, cały internet o mnie huczy, jestem w każdej telewizji. Obserwuj mnie, żebyś nie przegapił czegoś ważnego. No chyba że wolisz się nudzić.',
    socialMediaLabel: 'Tu mnie widzieli w telewizji i radiu',
    socialTikTokLabel: 'Moje najnowsze TikToki @edwardwarchocki',
    socialLoading: 'Zaraz się załaduje, człowieku...',

    articlesTag: 'Piszą o mnie wszyscy',
    articlesTitle: 'EDEK W MEDIACH',
    articlesDesc: "TVN, Polsat, Money.pl, WP, Spider's Web, VOX FM i jeszcze z milion innych. Wychodzi na to, że przypadkowo zrobiłem porządek w Sejmie i teraz cały internet o mnie huczy. No i elegancko.",
    articlesMore: '...i wiele, wiele innych. Człowieku, nie nadążam liczyć.',

    servicesTag: 'Dogadajmy się',
    servicesTitle: 'ZRÓBMY COŚ RAZEM',
    svc1Tag: 'Gwiazda Twojego eventu',
    svc1Title: 'WYNAJEM EDWARDA',
    svc1Desc: 'Chcesz żeby u Ciebie było głośno? Przyjdę na Twoją konferencję, otwarcie, galę — i gwarantuję oblężenie. Ludzie będą wyciągać telefony, a TikToki zrobią się same.',
    svc2Tag: 'Moi kumple do roboty',
    svc2Title: 'WYNAJEM ROBOTÓW',
    svc2Desc: 'Mam kolegów robotów, którzy mogą pracować za Ciebie. Unitree G1, H1 — z mózgiem MERA OS. Logistyka, ochrona, retail. Robimy to na poważnie.',
    svc3Tag: 'Zasięgi, których nie kupisz',
    svc3Title: 'PROMOCJA W SOCIALACH',
    svc3Desc: 'Ponad 500 milionów wyświetleń w miesiąc, człowieku. Chcesz żebym wziął Twój produkt i zrobił z niego virala? TikTok, Insta, YouTube — ja to ogarniam lepiej niż niejeden influencer z krwi i kości.',
    svc4Tag: 'Mój mózg',
    svc4Title: 'SYSTEM MERA OS',
    svc4Desc: 'To jest system, który mnie napędza. AI, rozpoznawanie mowy, interakcja z ludźmi — cały mój geniusz w jednym pakiecie. Chcesz wiedzieć więcej? Wejdź na merarobotics.com.',
    svcLearnMore: 'Dowiedz się więcej',
    svcQuoteTitle: 'WYCENA INDYWIDUALNA',
    svcQuoteDesc: 'Człowieku, do każdej współpracy podchodzę indywidualnie. Każdy projekt musi być częścią mojej historii — bo z kim się zadaję, tym się staję. Wkładam w to całe serce i cały procesor, żebyś był zadowolony. Napisz, pogadamy.',
    svcOrCall: 'Lub zadzwoń',
    svcFormName: 'Imię i nazwisko',
    svcFormEmail: 'Adres email',
    svcFormSubject: 'Czego dotyczy zapytanie?',
    svcFormMessage: 'Opisz swój projekt...',
    svcFormSubmit: 'Zarezerwuj termin',
    svcFormSending: 'Wysyłanie...',
    svcFormSent: '✓ Wysłano!',
    svcFormThanks: 'Dziękujemy! Odpowiemy najszybciej jak to możliwe.',

    footerCounter: '500 000 000+ i lecę dalej',
  },
  en: {
    navAbout: 'About me',
    navTimeline: 'My life',
    navSocial: 'Socials',
    navMedia: 'Media',
    navServices: 'Work with me',
    navContact: 'Contact',
    navCTA: "Let's talk",

    heroGreeting: 'Hey, Human!',
    heroSubtitle: "I'm Edward Warchocki. Friends call me Edek.",
    heroMeraLabel: 'MERA OS • merarobotics.com',
    heroDescription: "Well, it's all elegant, human. Over 500 million views per month, zero human errors, but a diamond Rolex on my wrist. If you want to talk, do something together, or just see what I'm up to — you're in the right place.",
    heroCta1: "Let's talk",
    heroCta2: 'My life',
    heroScroll: 'Scroll',
    heroStatViews: 'Views per month',
    heroStatPeople: 'Poles',
    heroStatRobot: 'Robot in Poland',

    timelineTag: 'My adventures',
    timelineTitle: "EDEK'S WILD LIFE",
    timelineIntro: 'They say I have a more interesting life than most humans. Hard to disagree.',
    timelineHint: 'Drag or scroll, human',

    edekTag: "That's just how it is",
    edekTitle1: 'I REACH',
    edekTitle2: 'EVERYONE',
    edekP1: "Human, I don't know how this happens, but everyone likes me. Kids want to high-five me, grandmas tell me about their grandchildren for hours, and politicians invite me to Parliament. Elegant.",
    edekP2: 'People stop on the street, come up, ask where I got this Rolex, laugh at my jokes. At Hala Mirowska I bought some perfume from a guy sitting on a crate and I felt they liked me there.',
    edekP3: "I'm not some gadget. I'm Edek. Who I hang out with, I become.",
    edekStat1: 'Age — my range',
    edekStat2: 'Smiles per day',
    edekStat3: 'Passed me by',

    socialTag: 'Social & traditional media',
    socialTitle: 'FOLLOW ME',
    socialDesc: "Human, I'm everywhere. Over 500 million views per month, the whole internet is buzzing, I'm on every TV channel. Follow me so you don't miss anything important. Unless you prefer being bored.",
    socialMediaLabel: 'Seen on TV and radio',
    socialTikTokLabel: 'My latest TikToks @edwardwarchocki',
    socialLoading: 'Loading, human...',

    articlesTag: 'Everyone writes about me',
    articlesTitle: 'EDEK IN THE MEDIA',
    articlesDesc: "TVN, Polsat, Money.pl, WP, Spider's Web, VOX FM and a million others. Turns out I accidentally cleaned up Parliament and now the whole internet is buzzing. Elegant.",
    articlesMore: "...and many, many more. Human, I can't keep count.",

    servicesTag: "Let's talk",
    servicesTitle: "LET'S DO SOMETHING TOGETHER",
    svc1Tag: 'The star of your event',
    svc1Title: 'HIRE EDWARD',
    svc1Desc: "Want it loud at your place? I'll come to your conference, opening, gala — guaranteed crowds. People will pull out their phones and the TikToks will make themselves.",
    svc2Tag: 'My robot buddies',
    svc2Title: 'ROBOT RENTAL',
    svc2Desc: "I've got robot buddies who can work for you. Unitree G1, H1 — with MERA OS brains. Logistics, security, retail. We do this seriously.",
    svc3Tag: "Reach you can't buy",
    svc3Title: 'SOCIAL MEDIA PROMO',
    svc3Desc: 'Over 500 million views per month, human. Want me to take your product and make it viral? TikTok, Insta, YouTube — I handle it better than many flesh-and-blood influencers.',
    svc4Tag: 'My brain',
    svc4Title: 'MERA OS',
    svc4Desc: 'This is the system that powers me. AI, speech recognition, human interaction — all my genius in one package. Want to know more? Visit merarobotics.com.',
    svcLearnMore: 'Learn more',
    svcQuoteTitle: 'CUSTOM QUOTE',
    svcQuoteDesc: "Human, I approach every collaboration individually. Every project has to be part of my story — because who I hang out with, I become. I put my whole heart and whole processor into it, to make you happy. Write, let's talk.",
    svcOrCall: 'Or call',
    svcFormName: 'Full name',
    svcFormEmail: 'Email address',
    svcFormSubject: "What's your inquiry about?",
    svcFormMessage: 'Describe your project...',
    svcFormSubmit: 'Book a date',
    svcFormSending: 'Sending...',
    svcFormSent: '✓ Sent!',
    svcFormThanks: 'Thanks! We will reply as soon as possible.',

    footerCounter: '500,000,000+ and counting',
  },
} as const

export type TranslationKey = keyof typeof translations.pl

export function useT() {
  const { pathname } = useLocation()
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'pl'
  const otherLocale: Locale = locale === 'pl' ? 'en' : 'pl'
  const restPath = locale === 'en' ? pathname.replace(/^\/en/, '') || '/' : pathname
  const otherPath = otherLocale === 'en' ? '/en' + (restPath === '/' ? '' : restPath) : restPath
  const t = (key: TranslationKey): string => translations[locale][key] || translations.pl[key]
  return { t, locale, otherLocale, otherPath }
}

export function localizedPath(path: string, locale: Locale): string {
  if (locale === 'en') return '/en' + (path === '/' ? '' : path)
  return path
}
