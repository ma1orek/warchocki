import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

/* One dark, on-brand banner (mobile + desktop) built around the black duo photo. */
export default function DinoPromo() {
  const m = useIsMobile()
  const { t, locale } = useT()
  const to = localizedPath('/produkty', locale)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' as const }}
      whileHover={m ? undefined : { y: -4 }}
      style={{
        position: 'relative',
        maxWidth: 540,
        marginBottom: 24,
        padding: m ? 18 : 22,
        borderRadius: 20,
        overflow: 'hidden',
        background: 'linear-gradient(155deg, #15170f 0%, #0c0c0c 52%, #170f10 100%)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* "NEW" corner ribbon */}
      <div style={{ position: 'absolute', top: 16, right: -36, transform: 'rotate(45deg)', background: '#34a93a', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', padding: '5px 44px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 4 }}>
        {t('dinoNew')}
      </div>

      {/* kicker */}
      <div style={{ marginBottom: 8, paddingRight: 60 }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5fc065', lineHeight: 1.3 }}>
          {t('dinoKicker')}
        </span>
      </div>

      {/* title + handwritten tagline */}
      <p style={{ fontSize: m ? 21 : 23, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.12 }}>
        {t('dinoTitle')}
      </p>
      <p style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 27 : 30, fontWeight: 700, color: '#5fc065', lineHeight: 1, marginTop: 2, marginBottom: 12, transform: 'rotate(-3deg)', transformOrigin: 'left center' }}>
        {t('dinoTagline')}
      </p>

      {/* duo bottles photo (black bg blends into the dark card) */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <div aria-hidden style={{ position: 'absolute', inset: '12% 18%', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(247,201,72,0.18), rgba(226,59,59,0.14) 55%, transparent 72%)', filter: 'blur(24px)', pointerEvents: 'none' }} />
        <img
          src="/napoje-duo.png"
          alt={t('dinoFlavor1') + ' & ' + t('dinoFlavor2')}
          loading="lazy"
          decoding="async"
          style={{ position: 'relative', display: 'block', width: '100%', maxHeight: m ? 230 : 260, objectFit: 'contain' }}
        />
      </div>

      {/* two flavors caption */}
      <p style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>
        {t('dinoTwoFlavors')}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ffd34d', border: '1px solid rgba(255,211,77,0.45)', borderRadius: 22, padding: '6px 13px' }}>
          {t('dinoFlavor1')}
        </span>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ff7a6b', border: '1px solid rgba(255,122,107,0.45)', borderRadius: 22, padding: '6px 13px' }}>
          {t('dinoFlavor2')}
        </span>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0a2e0c', background: '#5fc065', borderRadius: 22, padding: '6px 13px' }}>
          {t('dinoNoSugar')}
        </span>
      </div>

      {/* CTA */}
      <Link to={to} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', padding: '13px 18px', borderRadius: 13, background: '#fff', color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
        {t('dinoCta')}
        <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const }}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </motion.svg>
      </Link>
    </motion.div>
  )
}
