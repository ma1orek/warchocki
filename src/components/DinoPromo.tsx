import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'
import { products } from '../lib/products'

/* SLIDER na hero — WSZYSTKIE produkty po kolei, jedna kompaktowa karta na raz
   (PC i mobile). Lody pokazują wizualizacje (mainPhoto), reszta packshoty.
   Auto co 4.5s + strzałki + kropki. Klik/CTA → podstrona produktu. */

const AUTO_MS = 4500

export default function DinoPromo() {
  const m = useIsMobile()
  const { t, locale } = useT()
  const pl = locale === 'pl'

  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const count = products.length

  const go = (next: number, direction: number) => {
    setDir(direction)
    setIndex(((next % count) + count) % count)
  }

  // auto-przewijanie; dep [index] resetuje timer po każdym ruchu (auto i ręcznym)
  useEffect(() => {
    const iv = setInterval(() => go(index + 1, 1), AUTO_MS)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const p = products[index]
  const isLody = p.category === 'lody'
  const isMus = !isLody && !!p.volume?.pl.includes('g')
  const photo = p.mainPhoto ?? p.packshot

  const kickerText = isLody
    ? (pl ? 'NOWOŚĆ - LODY W BIEDRONCE' : 'NEW - ICE CREAM AT BIEDRONKA')
    : isMus
    ? t('musKicker')
    : t('dinoKicker')

  const chip = (label: string, color: string, solid = false) => (
    <span key={label} style={solid
      ? { fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1c1c04', background: color, borderRadius: 22, padding: '4px 10px' }
      : { fontSize: 10, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color, border: `1px solid ${color}80`, borderRadius: 22, padding: '4px 10px' }}>
      {label}
    </span>
  )

  const arrowStyle: React.CSSProperties = {
    width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.45)', color: '#fff', fontSize: 17, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' as const }}
      style={{ position: 'relative', maxWidth: m ? 500 : 520, marginBottom: 24 }}
    >
      <div style={{ overflow: 'hidden', borderRadius: 18 }}>
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={p.slug}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 60 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Link
              to={localizedPath(`/produkty/${p.slug}`, locale)}
              style={{
                position: 'relative',
                padding: m ? 16 : 18,
                borderRadius: 18,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(155deg, rgba(22,24,16,0.5) 0%, rgba(10,10,10,0.42) 52%, rgba(24,16,17,0.5) 100%)',
                border: '1px solid rgba(255,255,255,0.14)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
              }}
            >
              {p.isNew && (
                <div style={{ position: 'absolute', top: 14, right: -38, transform: 'rotate(45deg)', background: '#e23b3b', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', padding: '4px 44px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 4 }}>
                  {t('dinoNew')}
                </div>
              )}

              {/* photo: lody = wizualizacja (cover), reszta = packshot (contain) */}
              <div style={{ position: 'relative', width: '100%', marginBottom: 10 }}>
                <div aria-hidden style={{ position: 'absolute', inset: '10% 14%', borderRadius: '50%', background: p.accent, opacity: 0.22, filter: 'blur(26px)', pointerEvents: 'none' }} />
                <img
                  src={photo}
                  alt={p.flavor[locale]}
                  loading="lazy"
                  decoding="async"
                  style={p.mainPhoto
                    ? { position: 'relative', display: 'block', width: '100%', height: m ? 175 : 195, objectFit: 'cover', borderRadius: 12, filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))' }
                    : { position: 'relative', display: 'block', width: '100%', maxHeight: m ? 175 : 195, objectFit: 'contain', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))' }}
                />
              </div>

              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7dd17f', lineHeight: 1.3, marginBottom: 6, paddingRight: p.isNew ? 42 : 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                {kickerText}
              </span>
              <p style={{ fontSize: m ? 17 : 19, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                {p.name[locale]}
              </p>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 22 : 24, fontWeight: 700, color: p.accent, lineHeight: 1, marginTop: 2, marginBottom: 10, transform: 'rotate(-2.5deg)', transformOrigin: 'left center', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                {isLody ? (pl ? 'człowieku, to jest smak lata!' : 'the taste of summer!') : p.flavor[locale].toLowerCase()}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {isLody
                  ? chip(pl ? '💥 MEGA strzelający' : '💥 MEGA popping', '#ffd23c', true)
                  : chip(t('dinoNoSugar'), '#5fc065', true)}
                {chip('+ ' + p.vitamin[locale], 'rgba(255,255,255,0.75)')}
                {chip(p.volume?.[locale] ?? '500 ml', 'rgba(255,255,255,0.75)')}
                {isLody && chip(pl ? 'Biedronka' : 'Biedronka', '#ffe14d')}
              </div>

              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', padding: '11px 16px', borderRadius: 13, background: '#fff', color: '#000', fontSize: 12.5, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {t('productsCardCta')}
                <motion.svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const }}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </motion.svg>
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* strzałki + kropki */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 10 }}>
        <button aria-label="Poprzedni" onClick={() => go(index - 1, -1)} style={arrowStyle}>‹</button>
        <div style={{ display: 'flex', gap: 6 }}>
          {products.map((sp, i) => (
            <button
              key={sp.slug}
              aria-label={sp.flavor[locale]}
              onClick={() => go(i, i > index ? 1 : -1)}
              style={{
                width: i === index ? 22 : 7, height: 7, borderRadius: 8, border: 'none', cursor: 'pointer',
                background: i === index ? sp.accent : 'rgba(255,255,255,0.25)',
                transition: 'all 0.3s ease', padding: 0,
              }}
            />
          ))}
        </div>
        <button aria-label="Następny" onClick={() => go(index + 1, 1)} style={arrowStyle}>›</button>
      </div>
    </motion.div>
  )
}
