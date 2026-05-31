import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DinoLogo from './DinoLogo'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

export default function DinoPromo() {
  const m = useIsMobile()
  const { t, locale } = useT()

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
        padding: m ? 16 : 20,
        borderRadius: 18,
        background: 'linear-gradient(135deg, rgba(52,169,58,0.16) 0%, rgba(255,255,255,0.04) 45%, rgba(226,59,59,0.14) 100%)',
        border: '1px solid rgba(255,255,255,0.14)',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* "NEW" ribbon */}
      <div
        style={{
          position: 'absolute', top: 14, right: -34, transform: 'rotate(45deg)',
          background: '#34a93a', color: '#fff', fontSize: 10, fontWeight: 800,
          letterSpacing: '0.18em', padding: '4px 40px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        {t('dinoNew')}
      </div>

      <div style={{ display: 'flex', gap: m ? 14 : 18, alignItems: 'stretch' }}>
        {/* product photo */}
        <div style={{ flexShrink: 0, width: m ? 84 : 104 }}>
          <img
            src="/produkty-duo.jpg"
            alt={t('dinoFlavor1') + ' & ' + t('dinoFlavor2')}
            style={{
              width: '100%',
              height: m ? 120 : 138,
              objectFit: 'cover',
              borderRadius: 14,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.35)',
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5fc065' }}>
              {t('dinoKicker')}
            </span>
          </div>

          <p style={{ fontSize: m ? 16 : 19, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 10 }}>
            {t('dinoTitle')}
          </p>

          {/* DINO logo */}
          <div style={{ marginBottom: 10 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', borderRadius: 8, padding: '5px 10px' }}>
              <DinoLogo height={18} />
            </span>
          </div>

          {/* flavors + no sugar badge */}
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
            to={localizedPath('/produkty', locale)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 12, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {t('dinoCta')}
            <motion.svg
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const }}
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </motion.svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
