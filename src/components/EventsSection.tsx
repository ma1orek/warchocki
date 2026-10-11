import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { useT } from '../lib/i18n'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

// Relacje organizatorów z wydarzeń z Edwardem - oficjalne embedy postów z Facebooka
// (zdjęcia ładują się prosto z FB, bez kopiowania plików).
type FbPost = { author: string; place: string; url: string }
export const FB_POSTS: FbPost[] = [
  { author: 'Forum Gliwice', place: 'Centrum handlowe · Gliwice', url: 'https://www.facebook.com/100064326625738/posts/1568916441929228/' },
  { author: 'Ambasada Chin w Polsce', place: 'Warszawa', url: 'https://www.facebook.com/100082257171677/posts/1041172345301328/' },
  { author: 'INVEST in EDU', place: 'Firmy dla Przyszłości', url: 'https://www.facebook.com/100076065885878/posts/1144636791415173/' },
  { author: 'Powiatowe Centrum Kultury i Aktywności', place: 'Powiat Miński', url: 'https://www.facebook.com/61580030862144/posts/122145844389001028/' },
  { author: 'Szkoła Podstawowa im. M. Kopernika', place: 'Dobrzyca', url: 'https://www.facebook.com/100063621070248/posts/1718866376910715/' },
  { author: 'Zespół Placówek Specjalnych', place: 'Pleszew', url: 'https://www.facebook.com/100056245998780/posts/1739050341313149/' },
  { author: 'OSP Obrzycko', place: 'Straż pożarna · Obrzycko', url: 'https://www.facebook.com/100008235540122/posts/4469136553370819/' },
  { author: 'Tomasz Marcinek', place: 'Triathlon', url: 'https://www.facebook.com/100046240843928/posts/1765660541651957/' },
]

const embedSrc = (url: string) =>
  'https://www.facebook.com/plugins/post.php?href=' + encodeURIComponent(url) + '&show_text=true&width=350'

export function EventsGrid() {
  const m = useIsMobile()
  const { locale } = useT()
  const isEn = locale === 'en'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(330px, 1fr))', gap: m ? 20 : 28 }}>
      {FB_POSTS.map((p, i) => (
        <motion.div key={p.url} {...fadeUp(Math.min(i * 0.05, 0.3))}
          style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{p.author}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p.place}</div>
          </div>
          <iframe
            src={embedSrc(p.url)}
            title={p.author}
            loading="lazy"
            style={{ width: '100%', height: 560, border: 'none', background: '#fff', display: 'block' }}
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
          <a href={p.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 16px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(255,255,255,0.06)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
            {isEn ? 'See post on Facebook' : 'Zobacz post na Facebooku'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H8M17 7V16" /></svg>
          </a>
        </motion.div>
      ))}
    </div>
  )
}

export default function EventsSection() {
  const m = useIsMobile()
  const { locale } = useT()
  const isEn = locale === 'en'

  return (
    <section id="wydarzenia" style={{ position: 'relative', padding: m ? '80px 0' : '120px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: m ? 40 : 64 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            {isEn ? 'Edward on tour across Poland' : 'Edward w trasie po Polsce'}
          </p>
          <h2 style={{ fontSize: m ? 28 : 'clamp(28px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>
            {isEn ? 'EVENTS' : 'WYDARZENIA'}
          </h2>
          <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', maxWidth: 640, margin: '0 auto' }}>
            {isEn
              ? 'Schools, shopping malls, embassies, culture centers, sports events - wherever I show up, there are crowds. See what the organizers themselves posted.'
              : 'Szkoły, galerie, ambasady, domy kultury, zawody sportowe - gdzie się pojawię, tam tłumy. Zobacz, co sami organizatorzy wrzucili po moich wizytach.'}
          </p>
        </motion.div>
        <EventsGrid />
      </div>
    </section>
  )
}
