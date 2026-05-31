import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

export default function DinoPromo() {
  const m = useIsMobile()
  const { t, locale } = useT()
  const to = localizedPath('/produkty', locale)

  /* ---------- MOBILE: flyer-style banner with cut-out bottles ---------- */
  if (m) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' as const }}
        style={{
          position: 'relative',
          maxWidth: 540,
          marginBottom: 24,
          borderRadius: 22,
          overflow: 'hidden',
          background: 'linear-gradient(150deg, #fff7e6 0%, #ffffff 45%, #ffe6e6 100%)',
          boxShadow: '0 18px 50px rgba(0,0,0,0.45)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {/* "NEW" corner ribbon */}
        <div style={{ position: 'absolute', top: 16, right: -36, transform: 'rotate(45deg)', background: '#34a93a', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', padding: '5px 44px', boxShadow: '0 2px 10px rgba(0,0,0,0.25)', zIndex: 4 }}>
          {t('dinoNew')}
        </div>

        <div style={{ padding: '18px 18px 20px' }}>
          {/* kicker */}
          <div style={{ marginBottom: 10, paddingRight: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2e8a33', lineHeight: 1.25 }}>
              {t('dinoKicker')}
            </span>
          </div>

          <p style={{ fontSize: 21, fontWeight: 800, color: '#161616', letterSpacing: '-0.01em', lineHeight: 1.12 }}>
            {t('dinoTitle')}
          </p>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: 26, fontWeight: 700, color: '#2e8a33', lineHeight: 1, marginTop: 2, marginBottom: 14, transform: 'rotate(-3deg)', transformOrigin: 'left center' }}>
            {t('dinoTagline')}
          </p>

          {/* two bottle tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            {[
              { img: '/gru.png', label: t('dinoFlavor1'), color: '#e8a900' },
              { img: '/trsu.png', label: t('dinoFlavor2'), color: '#e23b3b' },
            ].map((b) => (
              <div key={b.label} style={{ borderRadius: 14, overflow: 'hidden', background: '#fff', border: `2px solid ${b.color}33`, boxShadow: '0 6px 18px rgba(0,0,0,0.10)' }}>
                <div style={{ height: 4, background: b.color }} />
                <img src={b.img} alt={b.label} loading="lazy" decoding="async" style={{ width: '100%', height: 150, objectFit: 'contain', display: 'block', background: '#fff' }} />
                <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 800, letterSpacing: '0.02em', color: b.color, padding: '6px 4px 9px' }}>{b.label}</p>
              </div>
            ))}
          </div>

          {/* no-sugar badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', background: '#34a93a', borderRadius: 22, padding: '7px 16px', boxShadow: '0 4px 12px rgba(52,169,58,0.35)' }}>
              {t('dinoNoSugar')}
            </span>
          </div>

          {/* CTA */}
          <Link to={to} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', padding: '14px 18px', borderRadius: 14, background: '#161616', color: '#fff', fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {t('dinoCta')}
            <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const }}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </motion.svg>
          </Link>
        </div>
      </motion.div>
    )
  }

  /* ---------- DESKTOP: dark banner with duo product photo ---------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' as const }}
      whileHover={{ y: -4 }}
      style={{
        position: 'relative',
        maxWidth: 540,
        marginBottom: 24,
        padding: 20,
        borderRadius: 18,
        background: 'linear-gradient(135deg, rgba(52,169,58,0.16) 0%, rgba(255,255,255,0.04) 45%, rgba(226,59,59,0.14) 100%)',
        border: '1px solid rgba(255,255,255,0.14)',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ position: 'absolute', top: 14, right: -34, transform: 'rotate(45deg)', background: '#34a93a', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', padding: '4px 40px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
        {t('dinoNew')}
      </div>

      <div style={{ display: 'flex', gap: 18, alignItems: 'stretch' }}>
        <div style={{ flexShrink: 0, width: 104 }}>
          <img
            src="/produkty-duo.jpg"
            alt={t('dinoFlavor1') + ' & ' + t('dinoFlavor2')}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: 138, objectFit: 'cover', borderRadius: 14, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.35)' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5fc065', marginBottom: 8 }}>
            {t('dinoKicker')}
          </span>

          <p style={{ fontSize: 19, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 4 }}>
            {t('dinoTitle')}
          </p>

          <p style={{ fontFamily: "'Caveat', cursive", fontSize: 26, fontWeight: 700, color: '#5fc065', lineHeight: 1, marginBottom: 12, transform: 'rotate(-3deg)', transformOrigin: 'left center' }}>
            {t('dinoTagline')}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'auto' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: '#ffd34d', border: '1px solid rgba(255,211,77,0.4)', borderRadius: 20, padding: '4px 9px' }}>
              {t('dinoFlavor1')}
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: '#ff7a6b', border: '1px solid rgba(255,122,107,0.4)', borderRadius: 20, padding: '4px 9px' }}>
              {t('dinoFlavor2')}
            </span>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0a2e0c', background: '#5fc065', borderRadius: 20, padding: '4px 9px' }}>
              {t('dinoNoSugar')}
            </span>
          </div>

          <Link
            to={to}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 12, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {t('dinoCta')}
            <motion.svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const }}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </motion.svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
