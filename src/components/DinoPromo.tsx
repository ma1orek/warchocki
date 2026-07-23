import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'
import { products } from '../lib/products'
import { boldDino } from '../lib/boldDino'

/* HERO SHOWCASE — jeden duży produkt (spójna karta) + rail miniatur wszystkich
   produktów pod spodem (mnogość + szybkie przeskakiwanie). Auto co 5s. */

const AUTO_MS = 5000

export default function DinoPromo() {
  const m = useIsMobile()
  const { t, locale } = useT()
  const pl = locale === 'pl'

  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const count = products.length

  const go = (next: number) => {
    const n = ((next % count) + count) % count
    setDir(n > index || (index === count - 1 && n === 0) ? 1 : -1)
    setIndex(n)
  }

  useEffect(() => {
    const iv = setInterval(() => go(index + 1), AUTO_MS)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const p = products[index]
  const isLody = p.category === 'lody'
  const isMus = !isLody && !!p.volume?.pl.includes('g')
  const store = isLody ? 'Biedronka' : isMus ? 'Dino' : 'Dino · Kaufland · Auchan · SPAR · POLOmarket'

  const chip = (label: string, color: string, solid = false) => (
    <span key={label} style={solid
      ? { fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1c1c04', background: color, borderRadius: 22, padding: '5px 11px' }
      : { fontSize: 10, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color, border: `1px solid ${color}80`, borderRadius: 22, padding: '5px 11px' }}>
      {label}
    </span>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' as const }}
      style={{ position: 'relative', maxWidth: m ? 500 : 680, marginBottom: 24 }}
    >
      {/* KARTA GŁÓWNA — spójny rozmiar, zmienia się treść */}
      <div style={{
        position: 'relative',
        borderRadius: 22,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.14)',
        background: 'linear-gradient(150deg, rgba(20,20,16,0.62) 0%, rgba(8,8,8,0.55) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 24px 70px rgba(0,0,0,0.5)',
      }}>
        {/* akcentowa poświata w tle, w kolorze produktu */}
        <motion.div aria-hidden key={p.slug + '-glow'} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
          style={{ position: 'absolute', top: -60, right: -40, width: 260, height: 260, borderRadius: '50%', background: p.accent, filter: 'blur(90px)', pointerEvents: 'none' }} />

        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={p.slug}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 40 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ position: 'relative', display: 'grid', gridTemplateColumns: m ? '1fr' : '0.82fr 1fr', gap: m ? 4 : 20, alignItems: 'center', padding: m ? 16 : 22 }}
          >
            {/* zdjęcie */}
            <Link to={localizedPath(`/produkty/${p.slug}`, locale)} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <img
                src={p.mainPhoto ?? p.packshot}
                alt={p.flavor[locale]}
                loading="lazy"
                decoding="async"
                style={p.mainPhoto
                  ? { width: '100%', maxWidth: m ? 300 : 260, aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 16, boxShadow: `0 20px 44px ${p.glow}` }
                  : { width: 'auto', maxWidth: '100%', height: m ? 210 : 240, objectFit: 'contain', filter: `drop-shadow(0 18px 34px ${p.glow})` }}
              />
            </Link>

            {/* treść */}
            <div style={{ textAlign: m ? 'center' : 'left', paddingTop: m ? 8 : 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap', justifyContent: m ? 'center' : 'flex-start' }}>
                {p.isNew && <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.12em', color: '#fff', background: '#e23b3b', borderRadius: 14, padding: '4px 10px' }}>{t('dinoNew')}</span>}
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: p.accent }}>{boldDino(store)}</span>
              </div>
              <h3 style={{ fontSize: m ? 21 : 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.14, marginBottom: 4 }}>
                {p.name[locale]}
              </h3>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 24 : 27, fontWeight: 700, color: p.accent, lineHeight: 1, marginBottom: 14, transform: 'rotate(-2deg)', transformOrigin: m ? 'center' : 'left center' }}>
                {isLody ? (pl ? 'człowieku, to jest smak lata!' : 'the taste of summer!') : p.flavor[locale].toLowerCase()}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18, justifyContent: m ? 'center' : 'flex-start' }}>
                {isLody ? chip(pl ? '💥 MEGA strzelający' : '💥 MEGA popping', '#ffd23c', true) : chip(t('dinoNoSugar'), '#5fc065', true)}
                {chip('+ ' + p.vitamin[locale], 'rgba(255,255,255,0.75)')}
                {chip(p.volume?.[locale] ?? '500 ml', 'rgba(255,255,255,0.75)')}
              </div>
              <Link to={localizedPath(`/produkty/${p.slug}`, locale)} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '12px 24px', borderRadius: 40, background: '#fff', color: '#000', fontSize: 12.5, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                {t('productsCardCta')}
                <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RAIL MINIATUR — wszystkie produkty, aktywny podświetlony */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 2 }}>
        {products.map((sp, i) => {
          const active = i === index
          return (
            <button
              key={sp.slug}
              aria-label={sp.flavor[locale]}
              onClick={() => go(i)}
              style={{
                position: 'relative', flexShrink: 0,
                width: m ? 52 : 60, height: m ? 52 : 60, borderRadius: 12,
                border: active ? `2px solid ${sp.accent}` : '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)', cursor: 'pointer', padding: 0, overflow: 'hidden',
                opacity: active ? 1 : 0.55, transition: 'opacity 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = active ? '1' : '0.55')}
            >
              <img src={sp.mainPhoto ?? sp.packshot} alt="" loading="lazy" decoding="async"
                style={{ width: '100%', height: '100%', objectFit: sp.mainPhoto ? 'cover' : 'contain', padding: sp.mainPhoto ? 0 : 4 }} />
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
