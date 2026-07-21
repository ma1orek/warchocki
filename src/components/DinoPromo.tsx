import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'
import { products, type Product } from '../lib/products'

/* KARUZELA na hero — WSZYSTKIE produkty w poprzek: PC = 3 karty naraz
   (mnogość produktów!), mobile = 1. Przesuw o jedną, auto co 4s, strzałki
   + kropki. Klik/CTA → podstrona produktu. */

const AUTO_MS = 4000

export default function DinoPromo() {
  const m = useIsMobile()
  const { t, locale } = useT()
  const pl = locale === 'pl'

  const count = products.length
  const visible = m ? 1 : 3
  const maxIndex = count - visible
  const [index, setIndex] = useState(0)

  const go = (next: number) => {
    if (next > maxIndex) next = 0
    if (next < 0) next = maxIndex
    setIndex(next)
  }

  // auto-przewijanie; dep [index] resetuje timer po każdym ruchu
  useEffect(() => {
    const iv = setInterval(() => go(index + 1), AUTO_MS)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, maxIndex])

  const chip = (label: string, color: string, solid = false) => (
    <span key={label} style={solid
      ? { fontSize: 9.5, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1c1c04', background: color, borderRadius: 22, padding: '4px 9px' }
      : { fontSize: 9.5, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color, border: `1px solid ${color}80`, borderRadius: 22, padding: '4px 9px' }}>
      {label}
    </span>
  )

  const card = (p: Product) => {
    const isLody = p.category === 'lody'
    const isMus = !isLody && !!p.volume?.pl.includes('g')
    const photo = p.mainPhoto ?? p.packshot
    const kickerText = isLody
      ? (pl ? 'NOWOŚĆ - LODY W BIEDRONCE' : 'NEW - AT BIEDRONKA')
      : isMus
      ? (pl ? 'NOWOŚĆ - TYLKO W DINO' : 'NEW - ONLY AT DINO')
      : (pl ? 'DINO, KAUFLAND, AUCHAN, SPAR' : 'DINO, KAUFLAND, AUCHAN, SPAR')

    return (
      <Link
        to={localizedPath(`/produkty/${p.slug}`, locale)}
        style={{
          position: 'relative',
          height: '100%',
          padding: 14,
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(155deg, rgba(22,24,16,0.5) 0%, rgba(10,10,10,0.42) 52%, rgba(24,16,17,0.5) 100%)',
          border: '1px solid rgba(255,255,255,0.14)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 16px 46px rgba(0,0,0,0.45)',
        }}
      >
        {p.isNew && (
          <div style={{ position: 'absolute', top: 12, right: -40, transform: 'rotate(45deg)', background: '#e23b3b', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', padding: '3px 44px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 4 }}>
            {t('dinoNew')}
          </div>
        )}

        <div style={{ position: 'relative', width: '100%', marginBottom: 9 }}>
          <div aria-hidden style={{ position: 'absolute', inset: '10% 14%', borderRadius: '50%', background: p.accent, opacity: 0.22, filter: 'blur(24px)', pointerEvents: 'none' }} />
          <img
            src={photo}
            alt={p.flavor[locale]}
            loading="lazy"
            decoding="async"
            style={p.mainPhoto
              ? { position: 'relative', display: 'block', width: '100%', height: m ? 170 : 150, objectFit: 'cover', borderRadius: 11, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }
              : { position: 'relative', display: 'block', width: '100%', height: m ? 170 : 150, objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
          />
        </div>

        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.11em', textTransform: 'uppercase', color: '#7dd17f', lineHeight: 1.3, marginBottom: 5, paddingRight: p.isNew ? 30 : 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
          {kickerText}
        </span>
        <p style={{ fontSize: m ? 16 : 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.18, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
          {p.name[locale]}
        </p>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 21 : 20, fontWeight: 700, color: p.accent, lineHeight: 1, marginTop: 2, marginBottom: 9, transform: 'rotate(-2.5deg)', transformOrigin: 'left center', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
          {p.category === 'lody' ? (pl ? 'to jest smak lata!' : 'the taste of summer!') : p.flavor[locale].toLowerCase()}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 11 }}>
          {p.category === 'lody'
            ? chip(pl ? '💥 MEGA strzelający' : '💥 MEGA popping', '#ffd23c', true)
            : chip(t('dinoNoSugar'), '#5fc065', true)}
          {chip(p.volume?.[locale] ?? '500 ml', 'rgba(255,255,255,0.75)')}
        </div>

        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '10px 14px', borderRadius: 12, background: '#fff', color: '#000', fontSize: 11.5, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 'auto' }}>
          {t('productsCardCta')}
          <span style={{ fontSize: 15, lineHeight: 1 }}>→</span>
        </span>
      </Link>
    )
  }

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
      style={{ position: 'relative', maxWidth: m ? 500 : 1150, marginBottom: 24 }}
    >
      <div style={{ overflow: 'hidden', borderRadius: 18, margin: '0 -7px' }}>
        <motion.div
          animate={{ x: `-${index * (100 / visible)}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'stretch' }}
        >
          {products.map((p) => (
            <div key={p.slug} style={{ flex: `0 0 ${100 / visible}%`, boxSizing: 'border-box', padding: '0 7px', display: 'flex' }}>
              <div style={{ width: '100%' }}>{card(p)}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* strzałki + kropki */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 10 }}>
        <button aria-label="Poprzedni" onClick={() => go(index - 1)} style={arrowStyle}>‹</button>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              aria-label={`Pozycja ${i + 1}`}
              onClick={() => go(i)}
              style={{
                width: i === index ? 22 : 7, height: 7, borderRadius: 8, border: 'none', cursor: 'pointer',
                background: i === index ? products[i].accent : 'rgba(255,255,255,0.25)',
                transition: 'all 0.3s ease', padding: 0,
              }}
            />
          ))}
        </div>
        <button aria-label="Następny" onClick={() => go(index + 1)} style={arrowStyle}>›</button>
      </div>
    </motion.div>
  )
}
