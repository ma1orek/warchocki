import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'
import { products, storeOf } from '../lib/products'
import { boldDino } from '../lib/boldDino'

/* HERO SHOWCASE: duża scena z jednym produktem (zdjęcie u góry, opis pod spodem),
   strzałki i licznik, pod kartą pasek miniatur wszystkich produktów, który sam
   przewija się do aktywnego. Auto co 5 s, zatrzymuje się pod kursorem. */

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

  const [paused, setPaused] = useState(false)
  const rail = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (paused) return
    const iv = setInterval(() => go(index + 1), AUTO_MS)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused])

  // pasek miniatur przewija się sam do aktywnego produktu (tylko pasek, nie strona)
  useEffect(() => {
    const r = rail.current, b = r?.children[index] as HTMLElement | undefined
    if (r && b) r.scrollTo({ left: b.offsetLeft - r.clientWidth / 2 + b.offsetWidth / 2, behavior: 'smooth' })
  }, [index])

  const p = products[index]
  const isLody = p.category === 'lody'
  const isSzkola = p.category === 'szkola'
  const st = storeOf(p)
  const store = st === 'biedronka'
    ? (pl ? 'Tylko w Biedronce' : 'Only at Biedronka')
    : st === 'dino-biedronka'
    ? 'Dino · Biedronka'
    : st === 'dino'
    ? 'Dino'
    : st === 'mediaexpert'
    ? 'Media Expert'
    : 'Dino · Kaufland · Auchan · SPAR · POLOmarket'

  const chip = (label: string, color: string, solid = false) => (
    <span key={label} style={solid
      ? { fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1c1c04', background: color, borderRadius: 22, padding: '5px 11px' }
      : { fontSize: 10, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color, border: `1px solid ${color}80`, borderRadius: 22, padding: '5px 11px' }}>
      {label}
    </span>
  )

  const arrow = (d: number) => (
    <button type="button" aria-label={d < 0 ? (pl ? 'Poprzedni produkt' : 'Previous product') : (pl ? 'Następny produkt' : 'Next product')} onClick={() => go(index + d)}
      style={{ position: 'absolute', top: '50%', [d < 0 ? 'left' : 'right']: 12, transform: 'translateY(-50%)', zIndex: 3, width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(0,0,0,0.45)', color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d={d < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} /></svg>
    </button>
  )
  const stageH = m ? 240 : 320

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' as const }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', width: '100%', maxWidth: 560, margin: '0 auto' }}
    >
      <div style={{
        position: 'relative',
        borderRadius: 28,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(10,10,10,0.72)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: '0 30px 90px rgba(0,0,0,0.6)',
      }}>
        {/* SCENA: zdjęcie produktu na poświacie w jego kolorze */}
        <div style={{ position: 'relative', height: stageH, overflow: 'hidden', background: '#0b0b0b' }}>
          <motion.div aria-hidden key={p.slug + '-glow'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 60%, ${p.glow} 0%, rgba(0,0,0,0) 62%)`, pointerEvents: 'none' }} />
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div key={p.slug} custom={dir}
              initial={{ opacity: 0, x: dir * 50, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -dir * 50, scale: 0.96 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: 0 }}>
              <Link to={localizedPath(`/produkty/${p.slug}`, locale)} style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}>
                <img src={p.mainPhoto ?? p.packshot} alt={p.flavor[locale]} decoding="async"
                  style={p.mainPhoto
                    ? { width: '100%', height: '100%', objectFit: 'cover' }
                    : { width: 'auto', maxWidth: '80%', height: stageH - 36, objectFit: 'contain', filter: `drop-shadow(0 22px 40px ${p.glow})` }} />
              </Link>
            </motion.div>
          </AnimatePresence>
          <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 90, background: 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.92) 100%)', pointerEvents: 'none', zIndex: 2 }} />
          {arrow(-1)}
          {arrow(1)}
          {p.isNew && <span style={{ position: 'absolute', top: 14, left: 14, zIndex: 3, fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: '#fff', background: '#e23b3b', borderRadius: 14, padding: '5px 11px' }}>{t('dinoNew')}</span>}
          <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 3, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.75)', background: 'rgba(0,0,0,0.45)', borderRadius: 14, padding: '5px 11px', fontVariantNumeric: 'tabular-nums' }}>
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </div>
        </div>

        {/* OPIS */}
        <div style={{ position: 'relative', padding: m ? '14px 18px 20px' : '16px 26px 26px', minHeight: m ? 190 : 196 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={p.slug + '-txt'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.accent, marginBottom: 8 }}>{boldDino(store)}</div>
              <h3 style={{ fontSize: m ? 22 : 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.12, marginBottom: 4 }}>
                {p.name[locale]}
              </h3>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 24 : 28, fontWeight: 700, color: p.accent, lineHeight: 1.05, marginBottom: 14 }}>
                {isLody ? (pl ? 'człowieku, to jest smak lata!' : 'the taste of summer!') : isSzkola ? (pl ? 'człowieku, do szkoły z Edkiem!' : 'back to school with Edek!') : p.flavor[locale].toLowerCase()}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {isLody ? chip(pl ? 'MEGA strzelający' : 'MEGA popping', '#ffd23c', true) : isSzkola ? chip('Back to School', '#35dfe0', true) : chip(t('dinoNoSugar'), '#5fc065', true)}
                  {p.vitamin && chip('+ ' + p.vitamin[locale], 'rgba(255,255,255,0.75)')}
                  {chip(p.volume?.[locale] ?? '500 ml', 'rgba(255,255,255,0.75)')}
                </div>
                <Link to={localizedPath(`/produkty/${p.slug}`, locale)} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 24px', borderRadius: 40, background: '#fff', color: '#000', fontSize: 12.5, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', flex: m ? '1 1 100%' : 'none', justifyContent: 'center' }}>
                  {isSzkola ? (pl ? 'Zobacz kolekcję' : 'See the collection') : t('productsCardCta')}
                  <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* PASEK MINIATUR: wszystkie produkty, aktywny podświetlony, bez paska przewijania */}
      <div ref={rail} className="no-sb" style={{ position: 'relative', display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', scrollbarWidth: 'none', padding: '2px 0',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0, #000 28px, #000 calc(100% - 28px), transparent 100%)' }}>
        {products.map((sp, i) => {
          const active = i === index
          return (
            <button
              key={sp.slug}
              type="button"
              aria-label={sp.flavor[locale]}
              aria-current={active ? 'true' : undefined}
              onClick={() => go(i)}
              style={{
                position: 'relative', flexShrink: 0,
                width: m ? 50 : 56, height: m ? 50 : 56, borderRadius: 14,
                border: active ? `2px solid ${sp.accent}` : '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(10,10,10,0.7)', cursor: 'pointer', padding: 0, overflow: 'hidden',
                opacity: active ? 1 : 0.5, transform: active ? 'scale(1)' : 'scale(0.92)', transition: 'opacity 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
              }}
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
