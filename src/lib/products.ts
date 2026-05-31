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
  // hero / packshot + product video
  packshot: string
  video: string
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
    flavor: { pl: 'JABŁKO — GRUSZKA', en: 'APPLE — PEAR' },
    name: {
      pl: 'Napój jabłko gruszka z dodatkiem witaminy D',
      en: 'Apple & pear drink with added vitamin D',
    },
    intro: {
      pl: 'Złocisty jak jesienne słońce. Soczyste jabłko spotyka aksamitną gruszkę — z soków zagęszczonych, pasteryzowany, bez dodatku cukru. Tylko to, co naturalnie najlepsze, plus dawka witaminy D. No i elegancko.',
      en: 'Golden like autumn sun. Juicy apple meets velvety pear — from concentrated juices, pasteurised, with no added sugar. Only what is naturally best, plus a dose of vitamin D. Elegant.',
    },
    accent: '#f7c948',
    accent2: '#8bc34a',
    glow: 'rgba(247, 201, 72, 0.45)',
    packshot: '/jablko-gruszka.png',
    video: '/jablko-gruszka.mp4',
    liquid: '#e8a900',
    liquidTop: '#ffd34d',
    vitamin: { pl: 'Witamina D', en: 'Vitamin D' },
    ingredients: {
      pl: 'woda, sok jabłkowy z zagęszczonego soku jabłkowego (45 %), sok gruszkowy z zagęszczonego soku gruszkowego (5 %), barwnik — karmel, witamina D, aromat naturalny.',
      en: 'water, apple juice from apple juice concentrate (45 %), pear juice from pear juice concentrate (5 %), colour — caramel, vitamin D, natural aroma.',
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
    flavor: { pl: 'TRUSKAWKA — JAGODA', en: 'STRAWBERRY — BLUEBERRY' },
    name: {
      pl: 'Napój wieloowocowy z dodatkiem witaminy C',
      en: 'Multifruit drink with added vitamin C',
    },
    intro: {
      pl: 'Czerwień, która budzi zmysły. Dojrzała truskawka, leśna jagoda i nuta wiśni — z soków zagęszczonych, pasteryzowany, bez dodatku cukru. Orzeźwienie z dawką witaminy C. Z kim się zadaję, tym się staję.',
      en: 'A red that wakes the senses. Ripe strawberry, forest blueberry and a hint of cherry — from concentrated juices, pasteurised, with no added sugar. Refreshment with a dose of vitamin C.',
    },
    accent: '#ff5a3c',
    accent2: '#7b3fe4',
    glow: 'rgba(255, 90, 60, 0.45)',
    packshot: '/truskawka-jagoda.png',
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
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
