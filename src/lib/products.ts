export type NutritionRow = { label: string; sub?: boolean; value: string }

export type Product = {
  slug: string
  flavor: { pl: string; en: string }
  name: { pl: string; en: string }
  // long marketing intro
  intro: { pl: string; en: string }
  // colors used across the product theming
  accent: string
  accent2: string
  glow: string
  // hero / packshot + product video (musy nie mają jeszcze wideo - sekcja znika)
  packshot: string
  // bogata wizualizacja (key-visual) do slidera na głównej; fallback = packshot
  mainPhoto?: string
  video?: string
  // gramatura/pojemność (default: 500 ml dla napojów)
  volume?: { pl: string; en: string }
  // NOWOŚĆ - badge na karcie + dopisek o dostępności (musy: tylko Dino)
  isNew?: boolean
  // kategoria: 'lody' (Edwardzik/Biedronka, poziomy flowpack), 'szkola' (kolekcja Back to School,
  // produkt informacyjny bez danych z etykiet) - brak = napój/mus (po volume)
  category?: 'lody' | 'szkola'
  // gdzie kupić. Brak = wyliczane: lody→biedronka, musy→dino, napoje→wszystkie sieci.
  store?: 'biedronka' | 'dino' | 'dino-biedronka' | 'all'
  // bottle juice color (used in the animated liquid)
  liquid?: string
  liquidTop?: string
  // pola spożywcze - kolekcja szkolna ich nie ma, więc opcjonalne
  vitamin?: { pl: string; en: string }
  ingredients?: { pl: string; en: string }
  storage?: { pl: string; en: string }
  energy?: string
  nutrition?: { pl: NutritionRow[]; en: NutritionRow[] }
}

export const products: Product[] = [
  // ── KOLEKCJA SZKOLNA (NOWOŚĆ 2026-08) - Back to School w Biedronce od 17.08.2026:
  // plecaki, plecakoworki, zeszyty i teczki z Edwardem. Produkt informacyjny - bez danych z etykiet.
  {
    slug: 'kolekcja-szkolna',
    category: 'szkola',
    store: 'biedronka',
    flavor: { pl: 'BACK TO SCHOOL', en: 'BACK TO SCHOOL' },
    name: {
      pl: 'Kolekcja szkolna EDWARD WARCHOCKI',
      en: 'EDWARD WARCHOCKI school collection',
    },
    intro: {
      pl: 'Edward idzie do szkoły! Plecaki, plecakoworki, zeszyty i teczki z najpopularniejszym robotem internetu - od 17 sierpnia w sklepach Biedronka w całej Polsce, w ramach akcji Back to School. A to dopiero początek: Edward już prowadzi edukacyjne transmisje na żywo dla dzieci, a od października rusza w tour po polskich szkołach. No i elegancko człowieku.',
      en: "Edward goes to school! Backpacks, drawstring bags, notebooks and folders featuring the internet's most popular robot - from August 17 at Biedronka stores across Poland as part of the Back to School campaign. And that's just the beginning: Edward already hosts educational live streams for kids, and in October he sets off on a tour of Polish schools. Elegant.",
    },
    accent: '#35dfe0',
    accent2: '#2b6bd8',
    glow: 'rgba(53, 223, 224, 0.4)',
    packshot: '/szkola-kolekcja.jpg',
    mainPhoto: '/szkola-kolekcja.jpg',
    volume: { pl: 'Plecaki · Zeszyty · Teczki', en: 'Backpacks · Notebooks · Folders' },
    isNew: true,
  },
  // ── LODY EDWARDZIK (NOWOŚĆ 2026-07) - lody na patyku 55 ml z cukrem strzelającym,
  // Nordis × Edward Warchocki, dostępne w Biedronce. Dane przepisane z realnych etykiet.
  {
    slug: 'edwardzik-czekolada-popcorn',
    category: 'lody',
    flavor: { pl: 'CZEKOLADA I POPCORN', en: 'CHOCOLATE & POPCORN' },
    name: {
      pl: 'Lody EDWARDZIK czekolada i popcorn',
      en: 'EDWARDZIK ice cream chocolate & popcorn',
    },
    intro: {
      pl: 'Człowieku, to jest smak lata! Lody o smaku popcornu, w środku płynne czekoladowe nadzienie, a na polewie MEGA strzelający cukier w czekoladzie. Kino w gębie - dosłownie strzela. No i elegancko.',
      en: 'This is the taste of summer! Popcorn flavoured ice cream with a liquid chocolate core and MEGA popping sugar in chocolate on the coating. Cinema in your mouth - it literally pops. Elegant.',
    },
    accent: '#f5a623',
    accent2: '#8b5a2b',
    glow: 'rgba(245, 166, 35, 0.45)',
    packshot: '/edwardzik-popcorn.png',
    mainPhoto: '/edwardzik-main-popcorn.jpg',
    video: '/edwardziki.mp4',
    liquid: '#6b3a1e',
    liquidTop: '#a8703f',
    volume: { pl: '55 ml', en: '55 ml' },
    isNew: true,
    vitamin: { pl: 'Płynne czekoladowe nadzienie', en: 'Liquid chocolate filling' },
    ingredients: {
      pl: 'Lody o smaku popcornu z sosem o smaku czekoladowym 6%, kolorową polewą 10% i cukrem strzelającym w czekoladzie 4%. Składniki: odtworzone mleko odtłuszczone, cukier, woda, olej kokosowy, syrop glukozowo-fruktozowy, serwatka w proszku (z mleka), olej palmowy, miazga kakaowa, tłuszcz kakaowy, mleko w proszku odtłuszczone, kakao o obniżonej zawartości tłuszczu, syrop glukozowy, emulgatory: mono- i diglicerydy kwasów tłuszczowych, lecytyny (z soi); stabilizatory: mączka chleba świętojańskiego, guma guar; koncentraty (spirulina, jabłko, marchew, hibiskus, krokosz barwierski, cytryna), dwutlenek węgla, laktoza (z mleka), skrobia modyfikowana, substancja zagęszczająca: karagen; substancje glazurujące: guma arabska, szelak; aromat naturalny, aromaty, barwnik: karoteny; sól. Produkt może zawierać orzeszki arachidowe i orzechy.',
      en: 'Popcorn flavoured ice cream with chocolate flavoured filling 6%, coloured coating 10% and chocolate-covered popping sugar 4%. Ingredients: reconstituted skimmed milk, sugar, water, coconut oil, glucose-fructose syrup, whey powder (of milk), palm oil, cocoa mass, cocoa butter, skimmed milk powder, fat-reduced cocoa, glucose syrup, emulsifiers: mono- and diglycerides of fatty acids, lecithins (of soya); stabilizers: locust bean gum, guar gum; concentrates (spirulina, apple, carrot, hibiscus, safflower, lemon), carbon dioxide, lactose (of milk), modified starch, thickener: carrageenan; glazing agents: gum arabic, shellac; natural flavouring, flavourings, colour: carotenes; salt. Product may contain peanuts and nuts.',
    },
    storage: {
      pl: 'Przechowywać w temperaturze nie wyższej niż -18°C. Najlepiej spożyć przed końcem i numer partii produkcyjnej: patrz nadruk z tyłu opakowania.',
      en: 'Store at -18°C (0°F) or below. Best before end / batch number: see the print on the back of the package.',
    },
    energy: '929 kJ / 222 kcal',
    nutrition: {
      pl: [
        { label: 'Wartość energetyczna', value: '929 kJ / 222 kcal' },
        { label: 'Tłuszcz', value: '12 g' },
        { label: 'w tym kwasy tłuszczowe nasycone', sub: true, value: '10 g' },
        { label: 'Węglowodany', value: '25 g' },
        { label: 'w tym cukry', sub: true, value: '25 g' },
        { label: 'Białko', value: '2,0 g' },
        { label: 'Sól', value: '0,09 g' },
      ],
      en: [
        { label: 'Energy', value: '929 kJ / 222 kcal' },
        { label: 'Fat', value: '12 g' },
        { label: 'of which saturates', sub: true, value: '10 g' },
        { label: 'Carbohydrate', value: '25 g' },
        { label: 'of which sugars', sub: true, value: '25 g' },
        { label: 'Protein', value: '2.0 g' },
        { label: 'Salt', value: '0.09 g' },
      ],
    },
  },
  {
    slug: 'edwardzik-truskawka-limonka',
    category: 'lody',
    flavor: { pl: 'TRUSKAWKA I LIMONKA', en: 'STRAWBERRY & LIME' },
    name: {
      pl: 'Lody EDWARDZIK truskawka i limonka',
      en: 'EDWARDZIK ice cream strawberry & lime',
    },
    intro: {
      pl: 'Truskawka jak z lata, limonka jak z kosmosu. Sorbet truskawkowy, w środku płynne limonkowe nadzienie, a na kolorowej polewie MEGA strzelający cukier o smaku limonkowym. Orzeźwienie, które strzela. Człowieku!',
      en: 'Strawberry straight from summer, lime straight from space. Strawberry sorbet with a liquid lime core and MEGA lime-flavoured popping sugar on a colourful coating. Refreshment that pops.',
    },
    accent: '#8bd42a',
    accent2: '#e23b3b',
    glow: 'rgba(139, 212, 42, 0.45)',
    packshot: '/edwardzik-truskawka.png',
    mainPhoto: '/edwardzik-main-truskawka.jpg',
    video: '/edwardziki.mp4',
    liquid: '#d8202a',
    liquidTop: '#a4e04b',
    volume: { pl: '55 ml', en: '55 ml' },
    isNew: true,
    vitamin: { pl: 'Płynne limonkowe nadzienie', en: 'Liquid lime filling' },
    ingredients: {
      pl: 'Sorbet truskawkowy z sosem o smaku cytrynowym 6%, kolorową polewą 10% i cukrem strzelającym w kolorowej polewie o smaku limonkowym 4%. Składniki: woda, cukier, sok truskawkowy 21% z zagęszczonego soku truskawkowego, olej kokosowy, olej palmowy, syrop glukozowy, tłuszcz kakaowy, mleko w proszku pełne, mleko w proszku odtłuszczone, serwatka w proszku (z mleka), regulator kwasowości: kwas cytrynowy; stabilizatory: mączka chleba świętojańskiego, guma guar, pektyny; sok cytrynowy 0,3% z zagęszczonego soku cytrynowego, sok limonkowy w proszku 0,2%, koncentraty (spirulina, jabłko, marchew, hibiskus, krokosz barwierski, cytryna), dwutlenek węgla, laktoza (z mleka), emulgator: lecytyny (z soi); substancja glazurująca: guma arabska; naturalne aromaty, aromaty, barwnik: kurkumina. Produkt może zawierać orzeszki arachidowe i orzechy.',
      en: 'Strawberry sorbet with lemon flavoured filling 6%, coloured coating 10% and popping sugar in coloured lime flavoured coating 4%. Ingredients: water, sugar, strawberry juice 21% from strawberry juice concentrate, coconut oil, palm oil, glucose syrup, cocoa butter, whole milk powder, skimmed milk powder, whey powder (of milk), acidity regulator: citric acid; stabilizers: locust bean gum, guar gum, pectins; lemon juice 0.3% from lemon juice concentrate, lime juice powder 0.2%, concentrates (spirulina, apple, carrot, hibiscus, safflower, lemon), carbon dioxide, lactose (of milk), emulsifier: lecithins (of soy); glazing agent: gum arabic; natural flavourings, flavourings, colour: curcumin. Product may contain peanuts and nuts.',
    },
    storage: {
      pl: 'Przechowywać w temperaturze nie wyższej niż -18°C. Najlepiej spożyć przed końcem i numer partii produkcyjnej: patrz nadruk z tyłu opakowania.',
      en: 'Store at -18°C (0°F) or below. Best before end / batch number: see the print on the back of the package.',
    },
    energy: '692 kJ / 165 kcal',
    nutrition: {
      pl: [
        { label: 'Wartość energetyczna', value: '692 kJ / 165 kcal' },
        { label: 'Tłuszcz', value: '7,0 g' },
        { label: 'w tym kwasy tłuszczowe nasycone', sub: true, value: '5,1 g' },
        { label: 'Węglowodany', value: '25 g' },
        { label: 'w tym cukry', sub: true, value: '24 g' },
        { label: 'Białko', value: '0,4 g' },
        { label: 'Sól', value: '0,02 g' },
      ],
      en: [
        { label: 'Energy', value: '692 kJ / 165 kcal' },
        { label: 'Fat', value: '7.0 g' },
        { label: 'of which saturates', sub: true, value: '5.1 g' },
        { label: 'Carbohydrate', value: '25 g' },
        { label: 'of which sugars', sub: true, value: '24 g' },
        { label: 'Protein', value: '0.4 g' },
        { label: 'Salt', value: '0.02 g' },
      ],
    },
  },
  // ── MULTIWITAMINA (NOWOŚĆ 2026-07) - napój wieloowocowy 500 ml z 6 witaminami,
  // dostępny TYLKO w Biedronce. Dane przepisane z realnej etykiety (Fortuna Sp. z o.o.).
  {
    slug: 'multiwitamina',
    store: 'biedronka', // NOWOŚĆ - dostępny tylko w Biedronce
    flavor: { pl: 'MULTIWITAMINA', en: 'MULTIVITAMIN' },
    name: {
      pl: 'Napój wieloowocowy multiwitamina z dodatkiem 6 witamin',
      en: 'Multifruit multivitamin drink with 6 added vitamins',
    },
    intro: {
      pl: 'Czternaście owoców w jednej butelce. Jabłko, ananas, pomarańcza, mango, banan, cytryna, passiflora, brzoskwinia, liczi, gujawa, opuncja figowa, kiwi, limetka i papaja - z soków zagęszczonych i przecierów, pasteryzowany, bez dodatku cukru. Do tego 6 witamin. Smak lata w jednym łyku. No i elegancko.',
      en: 'Fourteen fruits in one bottle. Apple, pineapple, orange, mango, banana, lemon, passion fruit, peach, lychee, guava, prickly pear, kiwi, lime and papaya - from concentrated juices and purees, pasteurised, no added sugar. Plus 6 vitamins.',
    },
    accent: '#ff9f1c',
    accent2: '#ffd23c',
    glow: 'rgba(255, 159, 28, 0.45)',
    packshot: '/multiwitamina-main.jpg',
    mainPhoto: '/multiwitamina-main.jpg',
    liquid: '#f08a00',
    liquidTop: '#ffb733',
    isNew: true,
    vitamin: { pl: '6 witamin', en: '6 vitamins' },
    ingredients: {
      pl: 'soki z soków zagęszczonych i przeciery z: jabłek (45 %), ananasów (1,9 %), pomarańczy (1,1 %), mango (0,6 %), bananów (0,4 %), brzoskwiń (0,2 %), cytryn (0,1 %), passiflory (0,1 %), liczi (0,1 %), gujawy (0,1 %), opuncji figowej (0,1 %), kiwi (0,1 %), limetki (0,1 %) i papai (0,1 %); woda, niacyna, witamina B6, kwas foliowy, witamina B12, biotyna, kwas pantotenowy, barwnik - karoteny, aromat naturalny.',
      en: 'juices from concentrated juices and purees of: apples (45 %), pineapples (1.9 %), oranges (1.1 %), mango (0.6 %), bananas (0.4 %), peaches (0.2 %), lemons (0.1 %), passion fruit (0.1 %), lychee (0.1 %), guava (0.1 %), prickly pear (0.1 %), kiwi (0.1 %), lime (0.1 %) and papaya (0.1 %); water, niacin, vitamin B6, folic acid, vitamin B12, biotin, pantothenic acid, colour - carotenes, natural aroma.',
    },
    storage: {
      pl: 'Przechowuj w temperaturze pokojowej. Chroń przed działaniem promieni słonecznych. Po otwarciu przechowuj w lodówce nie dłużej niż 48 godzin.',
      en: 'Store at room temperature. Protect from sunlight. After opening, keep refrigerated for no longer than 48 hours.',
    },
    energy: '91 kJ / 21 kcal',
    nutrition: {
      pl: [
        { label: 'Wartość energetyczna', value: '91 kJ / 21 kcal' },
        { label: 'Tłuszcz', value: '0 g' },
        { label: 'w tym kwasy tłuszczowe nasycone', sub: true, value: '0 g' },
        { label: 'Węglowodany', value: '5,1 g' },
        { label: 'w tym cukry', sub: true, value: '4,9 g' },
        { label: 'Białko', value: '0 g' },
        { label: 'Sól', value: '0 g' },
        { label: 'Niacyna', value: '1,2 mg / 7,5 %*' },
        { label: 'Witamina B6', value: '0,1 mg / 7,5 %*' },
        { label: 'Kwas foliowy', value: '15 µg / 7,5 %*' },
        { label: 'Witamina B12', value: '0,19 µg / 7,5 %*' },
        { label: 'Biotyna', value: '3,75 µg / 7,5 %*' },
        { label: 'Kwas pantotenowy', value: '0,45 mg / 7,5 %*' },
      ],
      en: [
        { label: 'Energy', value: '91 kJ / 21 kcal' },
        { label: 'Fat', value: '0 g' },
        { label: 'of which saturates', sub: true, value: '0 g' },
        { label: 'Carbohydrate', value: '5.1 g' },
        { label: 'of which sugars', sub: true, value: '4.9 g' },
        { label: 'Protein', value: '0 g' },
        { label: 'Salt', value: '0 g' },
        { label: 'Niacin', value: '1.2 mg / 7.5 %*' },
        { label: 'Vitamin B6', value: '0.1 mg / 7.5 %*' },
        { label: 'Folic acid', value: '15 µg / 7.5 %*' },
        { label: 'Vitamin B12', value: '0.19 µg / 7.5 %*' },
        { label: 'Biotin', value: '3.75 µg / 7.5 %*' },
        { label: 'Pantothenic acid', value: '0.45 mg / 7.5 %*' },
      ],
    },
  },
  {
    slug: 'jablko-gruszka',
    flavor: { pl: 'JABŁKO - GRUSZKA', en: 'APPLE - PEAR' },
    name: {
      pl: 'Napój jabłko gruszka z dodatkiem witaminy D',
      en: 'Apple & pear drink with added vitamin D',
    },
    intro: {
      pl: 'Złocisty jak jesienne słońce. Soczyste jabłko spotyka aksamitną gruszkę - z soków zagęszczonych, pasteryzowany, bez dodatku cukru. Tylko to, co naturalnie najlepsze, plus dawka witaminy D. No i elegancko.',
      en: 'Golden like autumn sun. Juicy apple meets velvety pear - from concentrated juices, pasteurised, with no added sugar. Only what is naturally best, plus a dose of vitamin D. Elegant.',
    },
    accent: '#f7c948',
    accent2: '#8bc34a',
    glow: 'rgba(247, 201, 72, 0.45)',
    packshot: '/jablko-gruszka.jpg',
    video: '/gruszka.mp4',
    liquid: '#e8a900',
    liquidTop: '#ffd34d',
    vitamin: { pl: 'Witamina D', en: 'Vitamin D' },
    ingredients: {
      pl: 'woda, sok jabłkowy z zagęszczonego soku jabłkowego (45 %), sok gruszkowy z zagęszczonego soku gruszkowego (5 %), barwnik - karmel, witamina D, aromat naturalny.',
      en: 'water, apple juice from apple juice concentrate (45 %), pear juice from pear juice concentrate (5 %), colour - caramel, vitamin D, natural aroma.',
    },
    storage: {
      pl: 'Przechowuj w temperaturze pokojowej. Chroń przed działaniem promieni słonecznych. Po otwarciu przechowuj w lodówce nie dłużej niż 48 godzin.',
      en: 'Store at room temperature. Protect from sunlight. After opening, keep refrigerated for no longer than 48 hours.',
    },
    energy: '91 kJ / 21 kcal',
    nutrition: {
      pl: [
        { label: 'Wartość energetyczna', value: '91 kJ / 21 kcal' },
        { label: 'Tłuszcz', value: '0 g' },
        { label: 'w tym kwasy tłuszczowe nasycone', sub: true, value: '0 g' },
        { label: 'Węglowodany', value: '5,2 g' },
        { label: 'w tym cukry', sub: true, value: '4,9 g' },
        { label: 'Białko', value: '0 g' },
        { label: 'Sól', value: '0 g' },
        { label: 'Witamina D', value: '0,375 µg / 7,5 %*' },
      ],
      en: [
        { label: 'Energy', value: '91 kJ / 21 kcal' },
        { label: 'Fat', value: '0 g' },
        { label: 'of which saturates', sub: true, value: '0 g' },
        { label: 'Carbohydrate', value: '5.2 g' },
        { label: 'of which sugars', sub: true, value: '4.9 g' },
        { label: 'Protein', value: '0 g' },
        { label: 'Salt', value: '0 g' },
        { label: 'Vitamin D', value: '0.375 µg / 7.5 %*' },
      ],
    },
  },
  {
    slug: 'truskawka-jagoda',
    flavor: { pl: 'TRUSKAWKA - JAGODA', en: 'STRAWBERRY - BLUEBERRY' },
    name: {
      pl: 'Napój truskawka jagoda z dodatkiem witaminy C',
      en: 'Strawberry & blueberry drink with added vitamin C',
    },
    intro: {
      pl: 'Czerwień, która budzi zmysły. Dojrzała truskawka, leśna jagoda i nuta wiśni - z soków zagęszczonych, pasteryzowany, bez dodatku cukru. Orzeźwienie z dawką witaminy C. Z kim się zadaję, tym się staję.',
      en: 'A red that wakes the senses. Ripe strawberry, forest blueberry and a hint of cherry - from concentrated juices, pasteurised, with no added sugar. Refreshment with a dose of vitamin C.',
    },
    accent: '#ff5a3c',
    accent2: '#7b3fe4',
    glow: 'rgba(255, 90, 60, 0.45)',
    packshot: '/truskawka-jagoda.jpg',
    video: '/truskawka-jagoda.mp4',
    liquid: '#d8202a',
    liquidTop: '#ff5a52',
    vitamin: { pl: 'Witamina C', en: 'Vitamin C' },
    ingredients: {
      pl: 'soki z soków zagęszczonych z: jabłek (45 %), truskawek (2 %), jagód (2 %), wiśni (1 %); woda, witamina C, aromat naturalny.',
      en: 'juices from concentrated juices of: apples (45 %), strawberries (2 %), blueberries (2 %), cherries (1 %); water, vitamin C, natural aroma.',
    },
    storage: {
      pl: 'Przechowuj w temperaturze pokojowej. Chroń przed działaniem promieni słonecznych. Po otwarciu przechowuj w lodówce nie dłużej niż 48 godzin.',
      en: 'Store at room temperature. Protect from sunlight. After opening, keep refrigerated for no longer than 48 hours.',
    },
    energy: '88 kJ / 21 kcal',
    nutrition: {
      pl: [
        { label: 'Wartość energetyczna', value: '88 kJ / 21 kcal' },
        { label: 'Tłuszcz', value: '0 g' },
        { label: 'w tym kwasy tłuszczowe nasycone', sub: true, value: '0 g' },
        { label: 'Węglowodany', value: '5,0 g' },
        { label: 'w tym cukry', sub: true, value: '4,5 g' },
        { label: 'Białko', value: '0 g' },
        { label: 'Sól', value: '0 g' },
        { label: 'Witamina C', value: '6 mg / 7,5 %*' },
      ],
      en: [
        { label: 'Energy', value: '88 kJ / 21 kcal' },
        { label: 'Fat', value: '0 g' },
        { label: 'of which saturates', sub: true, value: '0 g' },
        { label: 'Carbohydrate', value: '5.0 g' },
        { label: 'of which sugars', sub: true, value: '4.5 g' },
        { label: 'Protein', value: '0 g' },
        { label: 'Salt', value: '0 g' },
        { label: 'Vitamin C', value: '6 mg / 7.5 %*' },
      ],
    },
  },
  // ── MUSY (NOWOŚĆ 2026-07) - saszetki 200 g, 100% owoców, w Dino i w Biedronce.
  // Dane brzoskwini przepisane z realnej etykiety (tył opakowania, Fortuna Sp. z o.o.).
  {
    slug: 'mus-jablko-brzoskwinia-banan',
    store: 'dino-biedronka',
    flavor: { pl: 'JABŁKO - BRZOSKWINIA - BANAN', en: 'APPLE - PEACH - BANANA' },
    name: {
      pl: 'Mus jabłko brzoskwinia banan z dodatkiem witaminy C',
      en: 'Apple, peach & banana fruit pouch with added vitamin C',
    },
    intro: {
      pl: 'Mus, który smakuje jak lato w sadzie. Aksamitne jabłko, słoneczna brzoskwinia i kremowy banan - 100% owoców, pasteryzowany, bez dodatku cukru. Wyciskasz i jedziesz dalej. No i elegancko.',
      en: 'A pouch that tastes like summer in the orchard. Velvety apple, sunny peach and creamy banana - 100% fruit, pasteurised, no added sugar. Squeeze and go. Elegant.',
    },
    accent: '#ff9f43',
    accent2: '#f7c948',
    glow: 'rgba(255, 159, 67, 0.45)',
    packshot: '/mus-brzoskwinia.jpg',
    liquid: '#f28c28',
    liquidTop: '#ffc46b',
    volume: { pl: '200 g', en: '200 g' },
    isNew: true,
    vitamin: { pl: 'Witamina C', en: 'Vitamin C' },
    ingredients: {
      pl: 'przecier jabłkowy (70 %), przecier brzoskwiniowy (20 %), przecier bananowy (10 %), witamina C.',
      en: 'apple purée (70 %), peach purée (20 %), banana purée (10 %), vitamin C.',
    },
    storage: {
      pl: 'Przechowuj w temperaturze pokojowej. Chroń przed działaniem promieni słonecznych. Przed otwarciem wstrząśnij, po otwarciu przechowuj w lodówce nie dłużej niż 48 godzin. Uwaga: zakrętkę trzymaj poza zasięgiem dziecka.',
      en: 'Store at room temperature. Protect from sunlight. Shake before opening; after opening keep refrigerated for no longer than 48 hours. Note: keep the cap away from children.',
    },
    energy: '240 kJ / 56 kcal',
    nutrition: {
      pl: [
        { label: 'Wartość energetyczna', value: '240 kJ / 56 kcal' },
        { label: 'Tłuszcz', value: '<0,5 g' },
        { label: 'w tym kwasy tłuszczowe nasycone', sub: true, value: '<0,1 g' },
        { label: 'Węglowodany', value: '12 g' },
        { label: 'w tym cukry', sub: true, value: '11 g' },
        { label: 'Błonnik', value: '0,8 g' },
        { label: 'Białko', value: '0,6 g' },
        { label: 'Sól', value: '<0,01 g' },
        { label: 'Witamina C', value: '12 mg / 15 %*' },
      ],
      en: [
        { label: 'Energy', value: '240 kJ / 56 kcal' },
        { label: 'Fat', value: '<0.5 g' },
        { label: 'of which saturates', sub: true, value: '<0.1 g' },
        { label: 'Carbohydrate', value: '12 g' },
        { label: 'of which sugars', sub: true, value: '11 g' },
        { label: 'Fibre', value: '0.8 g' },
        { label: 'Protein', value: '0.6 g' },
        { label: 'Salt', value: '<0.01 g' },
        { label: 'Vitamin C', value: '12 mg / 15 %*' },
      ],
    },
  },
  {
    slug: 'mus-jablko-gruszka-banan',
    store: 'dino-biedronka',
    flavor: { pl: 'JABŁKO - GRUSZKA - BANAN', en: 'APPLE - PEAR - BANANA' },
    name: {
      pl: 'Mus jabłko gruszka banan z dodatkiem witaminy C',
      en: 'Apple, pear & banana fruit pouch with added vitamin C',
    },
    intro: {
      pl: 'Klasyka w najlepszym wydaniu. Soczyste jabłko, aksamitna gruszka i kremowy banan - 100% owoców, pasteryzowany, bez dodatku cukru. Idealny do torby, plecaka i na wynos. No i elegancko.',
      en: 'A classic at its best. Juicy apple, velvety pear and creamy banana - 100% fruit, pasteurised, no added sugar. Perfect for your bag, backpack and on the go. Elegant.',
    },
    accent: '#c3d243',
    accent2: '#8bc34a',
    glow: 'rgba(195, 210, 67, 0.45)',
    packshot: '/mus-gruszka.jpg',
    liquid: '#b8c437',
    liquidTop: '#e0ea7a',
    volume: { pl: '200 g', en: '200 g' },
    isNew: true,
    vitamin: { pl: 'Witamina C', en: 'Vitamin C' },
    ingredients: {
      pl: 'przecier jabłkowy (70 %), przecier gruszkowy (20 %), przecier bananowy (10 %), witamina C.',
      en: 'apple purée (70 %), pear purée (20 %), banana purée (10 %), vitamin C.',
    },
    storage: {
      pl: 'Przechowuj w temperaturze pokojowej. Chroń przed działaniem promieni słonecznych. Przed otwarciem wstrząśnij, po otwarciu przechowuj w lodówce nie dłużej niż 48 godzin. Uwaga: zakrętkę trzymaj poza zasięgiem dziecka.',
      en: 'Store at room temperature. Protect from sunlight. Shake before opening; after opening keep refrigerated for no longer than 48 hours. Note: keep the cap away from children.',
    },
    energy: '240 kJ / 56 kcal',
    nutrition: {
      pl: [
        { label: 'Wartość energetyczna', value: '240 kJ / 56 kcal' },
        { label: 'Tłuszcz', value: '<0,5 g' },
        { label: 'w tym kwasy tłuszczowe nasycone', sub: true, value: '<0,1 g' },
        { label: 'Węglowodany', value: '12 g' },
        { label: 'w tym cukry', sub: true, value: '11 g' },
        { label: 'Błonnik', value: '0,8 g' },
        { label: 'Białko', value: '0,6 g' },
        { label: 'Sól', value: '<0,01 g' },
        { label: 'Witamina C', value: '12 mg / 15 %*' },
      ],
      en: [
        { label: 'Energy', value: '240 kJ / 56 kcal' },
        { label: 'Fat', value: '<0.5 g' },
        { label: 'of which saturates', sub: true, value: '<0.1 g' },
        { label: 'Carbohydrate', value: '12 g' },
        { label: 'of which sugars', sub: true, value: '11 g' },
        { label: 'Fibre', value: '0.8 g' },
        { label: 'Protein', value: '0.6 g' },
        { label: 'Salt', value: '<0.01 g' },
        { label: 'Vitamin C', value: '12 mg / 15 %*' },
      ],
    },
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

// Gdzie kupić dany produkt (jawne pole `store` wygrywa; inaczej wg kategorii).
export const storeOf = (p: Product): 'biedronka' | 'dino' | 'dino-biedronka' | 'all' =>
  p.store ?? (p.category === 'lody' ? 'biedronka' : p.volume?.pl.includes('g') ? 'dino' : 'all')
