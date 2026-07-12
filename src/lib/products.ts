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
  // hero / packshot + product video (musy nie mają jeszcze wideo — sekcja znika)
  packshot: string
  video?: string
  // gramatura/pojemność (default: 500 ml dla napojów)
  volume?: { pl: string; en: string }
  // NOWOŚĆ — badge na karcie + dopisek o dostępności (musy: tylko Dino)
  isNew?: boolean
  // bottle juice color (used in the animated liquid)
  liquid: string
  liquidTop: string
  vitamin: { pl: string; en: string }
  ingredients: { pl: string; en: string }
  storage: { pl: string; en: string }
  energy: string
  nutrition: { pl: NutritionRow[]; en: NutritionRow[] }
}

export const products: Product[] = [
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
      pl: 'Napój wieloowocowy z dodatkiem witaminy C',
      en: 'Multifruit drink with added vitamin C',
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
  // ── MUSY (NOWOŚĆ 2026-07) — saszetki 200 g, 100% owoców, dostępne w Dino.
  // Dane brzoskwini przepisane z realnej etykiety (tył opakowania, Fortuna Sp. z o.o.).
  {
    slug: 'mus-jablko-brzoskwinia-banan',
    flavor: { pl: 'JABŁKO - BRZOSKWINIA - BANAN', en: 'APPLE - PEACH - BANANA' },
    name: {
      pl: 'Mus jabłko brzoskwinia banan z dodatkiem witaminy C',
      en: 'Apple, peach & banana fruit pouch with added vitamin C',
    },
    intro: {
      pl: 'Mus, który smakuje jak lato w sadzie. Aksamitne jabłko, słoneczna brzoskwinia i kremowy banan — 100% owoców, pasteryzowany, bez dodatku cukru. Wyciskasz i jedziesz dalej. No i elegancko.',
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
    flavor: { pl: 'JABŁKO - GRUSZKA - BANAN', en: 'APPLE - PEAR - BANANA' },
    name: {
      pl: 'Mus jabłko gruszka banan z dodatkiem witaminy C',
      en: 'Apple, pear & banana fruit pouch with added vitamin C',
    },
    intro: {
      pl: 'Klasyka w najlepszym wydaniu. Soczyste jabłko, aksamitna gruszka i kremowy banan — 100% owoców, pasteryzowany, bez dodatku cukru. Idealny do torby, plecaka i na wynos. No i elegancko.',
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
