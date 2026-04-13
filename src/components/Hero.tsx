import { motion } from 'framer-motion'
import SocialLinks from './SocialLinks'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  const m = useIsMobile()
  const { t, locale } = useT()
  const stats = [
    { value: '500M+', label: t('heroStatViews') },
    { value: locale === 'en' ? 'MILLIONS' : 'MILIONY', label: t('heroStatPeople') },
    { value: '#1', label: t('heroStatRobot') },
  ]

  return (
    <section
      id="o-mnie"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) contrast(1.15) grayscale(0.3)' }}>
          <source src="/ANIMATE_BLINK_BLINK_202603291951.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: m ? '120px 20px 60px' : '140px 48px 80px', width: '100%' }}>
        <div style={{ maxWidth: 750 }}>
          <motion.p {...fadeUp(0.2)} style={{ fontSize: m ? 13 : 14, fontWeight: 500, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.4)', marginBottom: m ? 20 : 28 }}>
            {t('heroGreeting')}
          </motion.p>

          <motion.div {...fadeUp(0.4)} style={{ marginBottom: 16 }}>
            <img src="/Layer_1 (1) 1.png" alt="EDWARD WARCHOCKI" style={{ width: '100%', maxWidth: m ? 320 : 650, height: 'auto' }} />
          </motion.div>

          <motion.p {...fadeUp(0.5)} style={{ fontSize: m ? 'clamp(16px, 5vw, 22px)' : 'clamp(18px, 2.5vw, 30px)', fontWeight: 300, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
            {t('heroSubtitle')}
          </motion.p>
          <motion.p {...fadeUp(0.55)} style={{ marginBottom: 24 }}>
            <a href="https://merarobotics.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2, transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
              MERA OS &bull; merarobotics.com
            </a>
          </motion.p>

          <motion.p {...fadeUp(0.6)} style={{ fontSize: m ? 15 : 17, lineHeight: 1.7, maxWidth: 520, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
            {t('heroDescription')}
          </motion.p>

          <motion.div {...fadeUp(0.7)} style={{ marginBottom: 32 }}>
            <SocialLinks size={m ? 'normal' : 'large'} />
          </motion.div>

          <motion.div {...fadeUp(0.8)} style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: 12 }}>
            <a href={localizedPath('/wynajem-edwarda', locale)} style={{ display: 'inline-flex', justifyContent: 'center', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: m ? '14px 24px' : '16px 32px', background: '#fff', color: '#000', transition: 'all 0.2s ease' }}>
              {t('heroCta1')}
            </a>
            <a href="#timeline" style={{ display: 'inline-flex', justifyContent: 'center', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: m ? '14px 24px' : '16px 32px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', transition: 'all 0.2s ease' }}>
              {t('heroCta2')}
            </a>
          </motion.div>

          <motion.div {...fadeUp(1.0)} style={{ display: 'flex', flexWrap: 'wrap', gap: m ? 24 : 48, marginTop: m ? 40 : 64, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: m ? 28 : 36, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>{stat.value}</div>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.6 }}
        style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(255,255,255,0.25)' }}>{t('heroScroll')}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
