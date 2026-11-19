import { motion } from 'framer-motion'
import { useT } from '../lib/i18n'

// Duży blok „Wynajmij mnie na swój event” zaraz pod hero (18.11.2026, prośba Bartosza): Edward mówi w 1. osobie,
// przycisk prowadzi na jego stronę w MERA RENT (termin i wycena w aplikacji). Bez cen; fakty jak na mera.rent.
const TXT = {
  pl: {
    eyebrow: 'Wynajem na wydarzenia',
    title: 'Wynajmij mnie na swój event!',
    lead: 'Przyjadę na Twoją galę, konferencję, targi, otwarcie albo festyn. Poprowadzę program, porozmawiam z gośćmi i zrobię z nimi zdjęcia. No i elegancko!',
    points: [
      ['Prowadzę program', 'jako robot konferansjer: zapowiadam punkty agendy i gości'],
      ['Mówię w języku gości', 'rozmawiam na żywo w ponad 70 językach'],
      ['Zdjęcia, taniec, show', 'pozuję do zdjęć i filmów, tańczę i bawię tłumy'],
      ['Przyjeżdżam z operatorem', 'MERA dowozi mnie w całej Europie, operator jest przy mnie cały czas'],
    ],
    cta: 'Sprawdź wolne terminy',
    ctaNote: 'Termin i wycenę sprawdzisz w aplikacji MERA RENT, bez zakładania konta.',
    more: 'Zobacz wszystkie roboty',
    href: 'https://mera.rent/pl/roboty/robot-influencer-edward-warchocki/',
    moreHref: 'https://mera.rent/pl/',
    stat: 'setki wydarzeń',
    statSub: 'w Polsce i za granicą',
    altMain: 'Edward Warchocki na scenie w centrum handlowym, wokół tłum gości',
    altSide: 'Edward Warchocki z gośćmi na wydarzeniu',
  },
  en: {
    eyebrow: 'Book me for events',
    title: 'Book me for your event!',
    lead: 'I will come to your gala, conference, trade fair, opening or festival. I will host the programme, talk with your guests and take photos with them.',
    points: [
      ['I host the programme', 'as a robot host: I announce agenda items and speakers'],
      ['I speak your guests’ language', 'live conversations in more than 70 languages'],
      ['Photos, dance, show', 'I pose for photos and videos, dance and entertain crowds'],
      ['I come with an operator', 'MERA brings me anywhere in Europe, an operator stays with me all the time'],
    ],
    cta: 'Check available dates',
    ctaNote: 'See dates and a quote in the MERA RENT app, no account needed.',
    more: 'See all robots',
    href: 'https://mera.rent/en/robots/robot-influencer-edward-warchocki/',
    moreHref: 'https://mera.rent/en/',
    stat: 'hundreds of events',
    statSub: 'in Poland and abroad',
    altMain: 'Edward Warchocki on stage in a shopping centre surrounded by a crowd',
    altSide: 'Edward Warchocki with guests at an event',
  },
} as const

export default function RentEdward() {
  const { locale } = useT()
  const c = TXT[locale]
  return (
    <section id="wynajmij-mnie" aria-labelledby="wynajmij-mnie-h" style={{ background: '#000', padding: 'clamp(56px, 8vw, 120px) 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rent-edward"
        style={{
          maxWidth: 1280, margin: '0 auto', borderRadius: 32, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #E3F1FF 0%, #B9DCFF 100%)', color: '#000',
          display: 'grid', gridTemplateColumns: '1.05fr 1fr', alignItems: 'stretch',
        }}
      >
        <div className="rent-edward-copy" style={{ padding: 'clamp(32px, 5vw, 72px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 18px', opacity: 0.6 }}>{c.eyebrow}</p>
          <h2 id="wynajmij-mnie-h" style={{ fontSize: 'clamp(40px, 5vw, 76px)', lineHeight: 0.95, fontWeight: 800, letterSpacing: '-0.045em', margin: '0 0 24px' }}>
            {c.title}
          </h2>
          <p style={{ fontSize: 'clamp(17px, 1.5vw, 21px)', lineHeight: 1.5, margin: '0 0 32px', maxWidth: 560, fontWeight: 500 }}>{c.lead}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px 28px' }} className="rent-edward-points">
            {c.points.map(([h, d]) => (
              <li key={h} style={{ borderTop: '2px solid rgba(0,0,0,0.85)', paddingTop: 12 }}>
                <b style={{ display: 'block', fontSize: 16, marginBottom: 4 }}>{h}</b>
                <span style={{ fontSize: 14, lineHeight: 1.45, opacity: 0.75 }}>{d}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <a href={c.href} target="_blank" rel="noopener" className="rent-edward-cta"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 60, padding: '0 32px', borderRadius: 999, background: '#000', color: '#fff', fontSize: 18, fontWeight: 700, textDecoration: 'none' }}>
              {c.cta}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href={c.moreHref} target="_blank" rel="noopener"
              style={{ display: 'inline-flex', alignItems: 'center', minHeight: 60, padding: '0 24px', borderRadius: 999, border: '2px solid #000', color: '#000', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
              {c.more}
            </a>
          </div>
          <p style={{ fontSize: 13, margin: '16px 0 0', opacity: 0.65 }}>{c.ctaNote}</p>
        </div>
        <div className="rent-edward-media" style={{ position: 'relative', minHeight: 520 }}>
          <img src="/tlumy/tlum-01.webp" srcSet="/tlumy/tlum-01-600.webp 600w, /tlumy/tlum-01.webp 961w" sizes="(max-width: 900px) 100vw, 50vw" alt={c.altMain} width={961} height={1200} decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src="/tlumy/tlum-16.webp" alt={c.altSide} width={800} height={1200} loading="lazy" decoding="async" className="rent-edward-side"
            style={{ position: 'absolute', left: 24, bottom: 24, width: '30%', height: 'auto', aspectRatio: '2 / 3', objectFit: 'cover', borderRadius: 20, border: '6px solid #E3F1FF', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }} />
          <div style={{ position: 'absolute', right: 24, top: 24, background: '#000', color: '#fff', borderRadius: 20, padding: '14px 20px', textAlign: 'right' }}>
            <b style={{ display: 'block', fontSize: 22, letterSpacing: '-0.02em' }}>{c.stat}</b>
            <span style={{ fontSize: 13, opacity: 0.7 }}>{c.statSub}</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
