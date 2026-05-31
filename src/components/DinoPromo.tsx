import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import DinoLogo from './DinoLogo'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

/* Animated juice liquid — two flowing wave layers + rising bubbles, clipped to a panel. */
function LiquidPanel({ height }: { height: number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: 14,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a1205 0%, #120a0a 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {/* empty space above liquid */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
          <defs>
            <linearGradient id="juiceGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd34d" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c4a" />
            </linearGradient>
            <linearGradient id="juiceGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f7c948" />
              <stop offset="100%" stopColor="#e23b3b" />
            </linearGradient>
          </defs>

          {/* back wave */}
          <motion.path
            fill="url(#juiceGrad2)"
            opacity={0.55}
            animate={{ x: [0, -200] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            d="M0 48 C 50 30, 90 66, 140 48 C 190 30, 230 66, 280 48 C 330 30, 370 66, 400 48 L 400 120 L 0 120 Z"
          />
          {/* front wave */}
          <motion.path
            fill="url(#juiceGrad)"
            animate={{ x: [-200, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            d="M0 60 C 40 46, 80 78, 120 60 C 160 44, 200 78, 240 60 C 280 46, 320 78, 360 60 C 400 44, 440 78, 480 60 L 480 120 L 0 120 Z"
          />
        </svg>
      </div>

      {/* rising bubbles */}
      {[
        { left: '22%', size: 5, dur: 3.2, delay: 0 },
        { left: '46%', size: 7, dur: 4.1, delay: 0.8 },
        { left: '63%', size: 4, dur: 2.8, delay: 1.5 },
        { left: '80%', size: 6, dur: 3.6, delay: 0.4 },
      ].map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -height * 0.78, opacity: [0, 0.8, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: 8,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.55)',
            boxShadow: '0 0 6px rgba(255,255,255,0.4)',
          }}
        />
      ))}

      {/* glossy highlight */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(180deg, rgba(255,255,255,0.10), transparent)' }} />

      {/* center mark */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
        <span style={{ fontSize: 30 }}>🧃</span>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: '#fff' }}>500 ml</span>
      </div>
    </div>
  )
}

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
        <div style={{ flexShrink: 0, width: m ? 76 : 92 }}>
          <LiquidPanel height={m ? 120 : 138} />
        </div>

        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5fc065' }}>
              {t('dinoKicker')}
            </span>
          </div>

          <p style={{ fontSize: m ? 16 : 19, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 8 }}>
            {t('dinoTitle')}
          </p>

          {/* availability row with DINO logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>{t('dinoAvail')}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', borderRadius: 7, padding: '3px 8px' }}>
              <DinoLogo height={16} />
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
