import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

// EDWARDZIK — sekcja promo na głównej: lody Nordis × Edward (NOWOŚĆ, Biedronka).
// Lewa: logo + copy + badge Biedronki + CTA do obu smaków. Prawa: key-visual
// "Człowieku, to jest smak lata!".
export default function EdwardzikPromo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const m = useIsMobile()
  const { locale } = useT()
  const pl = locale === 'pl'

  const flavors = [
    { slug: 'edwardzik-czekolada-popcorn', label: pl ? 'Czekolada i popcorn' : 'Chocolate & popcorn', accent: '#f5a623' },
    { slug: 'edwardzik-truskawka-limonka', label: pl ? 'Truskawka i limonka' : 'Strawberry & lime', accent: '#8bd42a' },
  ]

  return (
    <section style={{ position: 'relative', padding: m ? '70px 0' : '110px 0', borderTop: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      {/* ambient summer glow */}
      <div aria-hidden style={{ position: 'absolute', top: -160, left: '10%', width: m ? 300 : 520, height: m ? 300 : 520, borderRadius: '50%', background: '#ffd23c', filter: 'blur(150px)', opacity: 0.12, pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -200, right: '5%', width: m ? 260 : 460, height: m ? 260 : 460, borderRadius: '50%', background: '#8bd42a', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1.05fr 0.95fr', gap: m ? 36 : 64, alignItems: 'center' }}
        >
          {/* copy */}
          <div style={{ textAlign: m ? 'center' : 'left' }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ffd23c', marginBottom: 18 }}>
              {pl ? 'NOWOŚĆ · LODY' : 'NEW · ICE CREAM'}
            </p>
            {/* czarne logo na jasnej plakietce, lekko przekręcone jak na paczce */}
            <div style={{ display: 'inline-block', background: '#fff', borderRadius: 10, padding: m ? '10px 18px' : '14px 26px', transform: 'rotate(-2deg)', boxShadow: '0 18px 50px rgba(255,210,60,0.25)', marginBottom: 22 }}>
              <img src="/edwardzik-logo.png" alt="EDWARDZIK" loading="lazy" decoding="async" style={{ height: m ? 34 : 52, width: 'auto', display: 'block' }} />
            </div>
            <h2 style={{ fontSize: m ? 30 : 'clamp(30px, 4vw, 54px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 18 }}>
              {pl ? 'Człowieku, to jest smak lata!' : 'This is the taste of summer!'}
            </h2>
            <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 560, margin: m ? '0 auto 24px' : '0 0 24px' }}>
              {pl
                ? 'Lody EDWARDZIK od Nordis - z płynnym nadzieniem w środku i MEGA strzelającym cukrem na polewie. Dwa smaki: czekolada i popcorn oraz truskawka i limonka. No i elegancko.'
                : 'EDWARDZIK ice cream by Nordis - with a liquid filling inside and MEGA popping sugar on the coating. Two flavours: chocolate & popcorn and strawberry & lime.'}
            </p>

            {/* badge Biedronki */}
            <img src="/biedronka-badge.png" alt={pl ? 'Dostępne w Biedronce' : 'Available at Biedronka'} loading="lazy" decoding="async" style={{ height: m ? 84 : 104, width: 'auto', marginBottom: 26, filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.5))' }} />

            {/* CTA do obu smaków */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: m ? 'center' : 'flex-start' }}>
              {flavors.map((f) => (
                <Link
                  key={f.slug}
                  to={localizedPath(`/produkty/${f.slug}`, locale)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '13px 22px', borderRadius: 40,
                    background: 'rgba(255,255,255,0.04)', border: `1px solid ${f.accent}55`,
                    fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fff',
                    transition: 'border-color 0.25s ease, background 0.25s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = f.accent; e.currentTarget.style.background = `${f.accent}1a` }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${f.accent}55`; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: f.accent, boxShadow: `0 0 10px ${f.accent}` }} />
                  {f.label} <span style={{ color: f.accent }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* key visual (reklama) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: m ? 0 : 1.5 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{ position: 'relative', maxWidth: m ? 420 : 520, margin: '0 auto', width: '100%' }}
          >
            <img
              src="/edwardzik-plakat.jpg"
              alt={pl ? 'EDWARDZIK - Człowieku, to jest smak lata! Dostępne w Biedronce' : 'EDWARDZIK - the taste of summer! Available at Biedronka'}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', borderRadius: 20, border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 40px 90px rgba(255,210,60,0.18), 0 20px 50px rgba(0,0,0,0.6)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
