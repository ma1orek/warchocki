import { motion } from 'framer-motion'
import SocialLinks from './SocialLinks'
import DinoPromo from './DinoPromo'
import useIsMobile from '../hooks/useIsMobile'
import { useT } from '../lib/i18n'


export default function Hero() {
  const m = useIsMobile()
  const stacked = useIsMobile(1100)
  const { t, locale } = useT()
  const stats = [
    { value: '~3B', label: t('heroStatViews') },
    { value: locale === 'en' ? 'MILLIONS' : 'MILIONY', label: t('heroStatPeople') },
    { value: '70+', label: t('heroStatRobot') },
  ]

  return (
    <section
      id="o-mnie"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video autoPlay loop muted playsInline preload="metadata" poster="/hero-bg-poster.webp" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.28) contrast(1.1) grayscale(0.45) blur(2px)', transform: 'scale(1.03)' }}>
          <source src="/hero-bg-lekki.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.92) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: m ? '110px 20px 70px' : '130px 48px 90px', width: '100%',
        display: 'grid', gridTemplateColumns: stacked ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 560px)', gap: stacked ? 36 : 72, alignItems: 'center' }}>
        <div style={{ minWidth: 0 }}>
          <p className="fu" style={{ animationDelay: '0.2s',  fontSize: m ? 13 : 14, fontWeight: 500, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.62)', marginBottom: m ? 16 : 24 }}>
            {t('heroGreeting')}
          </p>

          {/* logo z czarnym prostokątem (znak marki, tak ma zostać) */}
          <h1 className="fu" style={{ animationDelay: '0.4s',  margin: 0, marginBottom: 14, marginLeft: m ? -6 : -12, fontSize: 'inherit', lineHeight: 0 }}>
            <img src="/Layer_1 (1) 1.png" alt="EDWARD WARCHOCKI" width={949} height={311} style={{ width: '100%', maxWidth: m ? 320 : 600, height: 'auto', display: 'block' }} />
          </h1>

          <p className="fu" style={{ animationDelay: '0.5s',  fontSize: m ? 'clamp(17px, 5vw, 22px)' : 'clamp(20px, 2.2vw, 30px)', fontWeight: 300, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.72)', marginBottom: m ? 24 : 32, maxWidth: 560 }}>
            {t('heroSubtitle')}
          </p>

          <div className="fu" style={{ animationDelay: '0.6s',  display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, marginBottom: m ? 28 : 36 }}>
            {/* CTA do warchockishop.pl zdjęte - sklep chwilowo nie działa */}
            <a href="#produkty" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: m ? '14px 24px' : '16px 32px', background: '#fff', color: '#000', flex: m ? '1 1 100%' : 'none' }}>
              {locale === 'pl' ? 'Zobacz produkty' : 'See the products'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </a>
            <a href="/wspolpraca" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: m ? '13px 24px' : '15px 30px', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', flex: m ? '1 1 100%' : 'none' }}>
              {t('heroCtaBiz')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
            </a>
          </div>

          <div className="fu" style={{ animationDelay: '0.7s' }}>
            <SocialLinks size={m ? 'normal' : 'large'} />
          </div>

          <div className="fu" style={{ animationDelay: '0.9s',  display: 'flex', flexWrap: 'wrap', gap: m ? 24 : 48, marginTop: m ? 32 : 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: m ? 28 : 36, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>{stat.value}</div>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* produkty: osobna kolumna po prawej (na telefonie pod tekstem) */}
        <DinoPromo />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}
        style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(255,255,255,0.62)' }}>{t('heroScroll')}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
