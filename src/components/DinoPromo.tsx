import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

/* Translucent on-brand banner built around the cut-out duo photo.
   Mobile: stacked. Desktop: image left, text right (compact). */
export default function DinoPromo() {
  const m = useIsMobile()
  const { t, locale } = useT()
  const to = localizedPath('/produkty', locale)

  const kicker = (
    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7dd17f', lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
      {t('dinoKicker')}
    </span>
  )

  const titleBlock = (
    <>
      <p style={{ fontSize: m ? 20 : 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.12, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
        {t('dinoTitle')}
      </p>
      <p style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 26 : 28, fontWeight: 700, color: '#7dd17f', lineHeight: 1, marginTop: 2, transform: 'rotate(-3deg)', transformOrigin: 'left center', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
        {t('dinoTagline')}
      </p>
    </>
  )

  const photo = (
    <div style={{ position: 'relative', width: '100%' }}>
      <div aria-hidden style={{ position: 'absolute', inset: '10% 14%', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(247,201,72,0.22), rgba(226,59,59,0.16) 55%, transparent 72%)', filter: 'blur(26px)', pointerEvents: 'none' }} />
      <img
        src="/napoje-duo.png"
        alt={t('dinoFlavor1') + ' & ' + t('dinoFlavor2')}
        loading="lazy"
        decoding="async"
        style={{ position: 'relative', display: 'block', width: '100%', maxHeight: m ? 230 : 330, objectFit: 'contain', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))' }}
      />
    </div>
  )

  const flavors = (
    <>
      <p style={{ textAlign: m ? 'center' : 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 9 }}>
        {t('dinoTwoFlavors')}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: m ? 'center' : 'flex-start', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ffd34d', border: '1px solid rgba(255,211,77,0.5)', borderRadius: 22, padding: '6px 12px' }}>
          {t('dinoFlavor1')}
        </span>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ff8170', border: '1px solid rgba(255,129,112,0.5)', borderRadius: 22, padding: '6px 12px' }}>
          {t('dinoFlavor2')}
        </span>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0a2e0c', background: '#5fc065', borderRadius: 22, padding: '6px 12px' }}>
          {t('dinoNoSugar')}
        </span>
      </div>
    </>
  )

  const cta = (
    <Link to={to} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', padding: '12px 18px', borderRadius: 13, background: '#fff', color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
      {t('dinoCta')}
      <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const }}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </motion.svg>
    </Link>
  )

  const ribbon = (
    <div style={{ position: 'absolute', top: 16, right: -36, transform: 'rotate(45deg)', background: '#34a93a', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', padding: '5px 44px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 4 }}>
      {t('dinoNew')}
    </div>
  )

  const shellStyle = {
    position: 'relative' as const,
    maxWidth: m ? 540 : 680,
    marginBottom: 24,
    padding: m ? 18 : 22,
    borderRadius: 20,
    overflow: 'hidden' as const,
    // translucent so the hero background shows through softly
    background: 'linear-gradient(155deg, rgba(22,24,16,0.5) 0%, rgba(10,10,10,0.42) 52%, rgba(24,16,17,0.5) 100%)',
    border: '1px solid rgba(255,255,255,0.14)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
  }

  /* ---- MOBILE: stacked ---- */
  if (m) {
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' as const }} style={shellStyle}>
        {ribbon}
        <div style={{ marginBottom: 8, paddingRight: 60 }}>{kicker}</div>
        <div style={{ marginBottom: 12 }}>{titleBlock}</div>
        <div style={{ marginBottom: 12 }}>{photo}</div>
        {flavors}
        {cta}
      </motion.div>
    )
  }

  /* ---- DESKTOP: image left, text right ---- */
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' as const }} whileHover={{ y: -4 }} style={shellStyle}>
      {ribbon}
      <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
        <div style={{ flexShrink: 0, width: 290 }}>{photo}</div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 6, paddingRight: 50 }}>{kicker}</div>
          <div style={{ marginBottom: 14 }}>{titleBlock}</div>
          {flavors}
          {cta}
        </div>
      </div>
    </motion.div>
  )
}
