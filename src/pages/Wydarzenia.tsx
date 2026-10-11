import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'
import { EventsGrid } from '../components/EventsSection'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

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
          <EventsGrid />
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
