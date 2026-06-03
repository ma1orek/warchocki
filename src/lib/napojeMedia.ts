// Articles specifically about the Edward Warchocki drink (napój) launch in DINO.
export type MediaItem = { source: string; title: string; url: string; domain: string }

export const napojeMedia: MediaItem[] = [
  { source: 'Wiadomości Handlowe', title: 'Robot influencer podbija sklepy Dino. Edward Warchocki z własną linią napojów', url: 'https://www.wiadomoscihandlowe.pl/najwieksze-sieci-handlowe/dino/robot-influencer-wchodzi-do-dino-edward-warchocki-debiutuje-z-wlasna-marka-napojow-2535512', domain: 'wiadomoscihandlowe.pl' },
  { source: "Spider's Web", title: 'Robot jest już prawdziwym celebrytą. Będzie miał własny napój', url: 'https://spidersweb.pl/2026/05/robot-edward-warchocki-wlasny-napoj.html', domain: 'spidersweb.pl' },
  { source: 'WP Finanse', title: 'Edward Warchocki rzuca rękawicę Wojankowi. Nowy napój wchodzi na rynek', url: 'https://finanse.wp.pl/edward-warchocki-rzuca-rekawice-wojankowi-nowy-napoj-wchodzi-na-rynek-7291189784803552a', domain: 'wp.pl' },
  { source: 'INNPoland', title: 'Napoje Edwarda Warchockiego już w sklepach. Znana sieć ubiegła Żabkę', url: 'https://innpoland.pl/226531,napoje-edwarda-warchockiego-juz-w-sklepach-znana-siec-ubiegla-zabke', domain: 'innpoland.pl' },
  { source: 'Press.pl', title: 'Robot influencer Edward Warchocki z firmą Fortuna wprowadza własną linię napojów', url: 'https://www.press.pl/tresc/93367,robot-influencer-edward-warchocki-z-firma-fortuna-wprowadza-wlasna-linie-napojow', domain: 'press.pl' },
  { source: 'Marketing przy Kawie', title: 'Robot-influencer Edward Warchocki debiutuje z własną linią napojów w sieci Dino', url: 'https://marketingprzykawie.pl/espresso/robot-edward-warchocki-debiutuje-z-linia-napojow-w-dino/', domain: 'marketingprzykawie.pl' },
  { source: 'NowyMarketing', title: 'Humanoidalny celebryta Edward Warchocki z własnymi napojami', url: 'https://nowymarketing.pl/humanoidalny-celebryta-edward-warchocki-z-wlasnymi-napojami/', domain: 'nowymarketing.pl' },
  { source: 'dlahandlu.pl', title: 'Półki w Dino nie będą takie same. Debiutuje słynny robot', url: 'https://www.dlahandlu.pl/zakupy/polki-w-dino-nie-beda-takie-same-debiutuje-slynny-robot,171052.html', domain: 'dlahandlu.pl' },
  { source: 'Telepolis', title: 'Edward Warchocki w Dino. To upadek społeczeństwa', url: 'https://www.telepolis.pl/tech/sprzet/edward-warchocki-w-dino-to-upadek-spoleczenstwa', domain: 'telepolis.pl' },
  { source: 'Fajne Gotowanie', title: 'Dino stawia na AI. Napoje sygnowane przez robota już w sprzedaży', url: 'https://fajnegotowanie.pl/aktualnosci/promocje/dino-stawia-na-ai-napoje-sygnowane-przez-robota-juz-w-sprzedazy/', domain: 'fajnegotowanie.pl' },
  { source: 'kb.pl', title: 'Humanoidalny robot AI trafił na sklepowe półki. Klienci Dino przecierają oczy ze zdumienia', url: 'https://kb.pl/aktualnosci/promocje/dino-stawia-na-ai-napoje-sygnowane-przez-robota-juz-w-sprzedazy_fg/', domain: 'kb.pl' },
  { source: 'BOOP.pl', title: 'Nie uwierzycie. Edward Warchocki został twarzą picia', url: 'https://boop.pl/rozrywka/nie-uwierzycie-edward-warchocki-zostal-twarza-picia', domain: 'boop.pl' },
  { source: 'Pułtusk News', title: 'Znany robot Edward Warchocki spotkał się z właścicielami Grupy Polmlek', url: 'https://pultusk.news/aktualnosci/znany-robot-edward-warchocki-spotkal-sie-z-wlascicielami-grupy-polmlek/', domain: 'pultusk.news' },
]

// 20 real TikTok comment screenshots about the drink.
export const komentarze: string[] = Array.from({ length: 20 }, (_, i) => `/komentarze/k${i + 1}.png`)
