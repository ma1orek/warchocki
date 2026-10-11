import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

// Relacje organizatorów z wydarzeń z Edwardem - oficjalne embedy postów z Facebooka
// (zdjęcia ładują się prosto z FB, bez kopiowania plików).
type FbPost = { author: string; place: string; url: string }
const FB_POSTS: FbPost[] = [
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

export default function Wydarzenia() {
  const m = useIsMobile()
  const { locale } = useT()
  const isEn = locale === 'en'

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <Navbar />
      <div aria-hidden style={{ position: 'absolute', top: -180, right: -160, width: m ? 320 : 560, height: m ? 320 : 560, borderRadius: '50%', background: '#7b3fe4', filter: 'blur(150px)', opacity: 0.16, pointerEvents: 'none' }} />

      {/* HERO */}
      <section style={{ position: 'relative', padding: m ? '110px 0 40px' : '150px 0 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b794f6', border: '1px solid rgba(123,63,228,0.5)', borderRadius: 30, padding: '8px 16px' }}>
              {isEn ? 'Edward on tour across Poland' : 'Edward w trasie po Polsce'}
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} style={{ fontSize: m ? 34 : 'clamp(40px, 6vw, 76px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02, marginBottom: 20 }}>
            {isEn ? 'EVENTS' : 'WYDARZENIA'}
          </motion.h1>
          <motion.p {...fadeUp(0.16)} style={{ fontSize: m ? 16 : 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', maxWidth: 680 }}>
            {isEn
              ? 'Schools, shopping malls, embassies, culture centers, sports events - Edward travels all over Poland and draws crowds everywhere he goes. See what the organizers themselves posted after his visits.'
              : 'Szkoły, galerie handlowe, ambasady, domy kultury, zawody sportowe - Edward jeździ po całej Polsce i wszędzie robi tłumy. Zobacz, co sami organizatorzy opublikowali po jego wizytach.'}
          </motion.p>
        </div>
      </section>

      {/* POSTY ORGANIZATORÓW */}
      <section style={{ position: 'relative', padding: m ? '30px 0 50px' : '40px 0 80px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: m ? '30px 20px 0' : '50px 48px 0' }}>
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
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', padding: m ? '20px 0 70px' : '30px 0 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', textAlign: 'center' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontSize: m ? 26 : 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            {isEn ? 'Want Edward at your event?' : 'Chcesz Edwarda na swoim wydarzeniu?'}
          </motion.h2>
          <motion.p {...fadeUp(0.08)} style={{ fontSize: m ? 15 : 17, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.6 }}>
            {isEn
              ? 'Conferences, openings, galas, school visits - guaranteed crowds and content that makes itself.'
              : 'Konferencje, otwarcia, gale, wizyty w szkołach - gwarantowane tłumy i content, który robi się sam.'}
          </motion.p>
          <motion.div {...fadeUp(0.16)}>
            <Link to={localizedPath('/wynajem-edwarda', locale)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 28px', borderRadius: 12, background: '#fff', color: '#000', fontSize: 14, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {isEn ? 'Hire Edward' : 'Wynajmij Edwarda'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
