import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

/* SLIDER na hero — POJEDYNCZA karta zmieniająca się automatycznie (PC i mobile):
   NAPOJE (4 sieci) → MUSY (Dino) → LODY EDWARDZIK (NOWOŚĆ, Biedronka).
   Strzałki + kropki, auto co 5s. */

const AUTO_MS = 5000

export default function DinoPromo() {
  const m = useIsMobile()
  const { t, locale } = useT()
  const pl = locale === 'pl'
  const to = localizedPath('/produkty', locale)

  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const cardStyle = {
    position: 'relative' as const,
    padding: m ? 18 : 20,
    borderRadius: 20,
    overflow: 'hidden' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    background: 'linear-gradient(155deg, rgba(22,24,16,0.5) 0%, rgba(10,10,10,0.42) 52%, rgba(24,16,17,0.5) 100%)',
    border: '1px solid rgba(255,255,255,0.14)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
    minHeight: m ? 'auto' : 430,
  }

  const kicker = (text: string) => (
    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7dd17f', lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
      {text}
    </span>
  )

  const titleBlock = (title: string, tagline: string) => (
    <>
      <p style={{ fontSize: m ? 19 : 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.12, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
        {title}
      </p>
      <p style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 24 : 26, fontWeight: 700, color: '#7dd17f', lineHeight: 1, marginTop: 2, transform: 'rotate(-3deg)', transformOrigin: 'left center', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
        {tagline}
      </p>
    </>
  )

  const photo = (src: string, alt: string, glow: string) => (
    <div style={{ position: 'relative', width: '100%' }}>
      <div aria-hidden style={{ position: 'absolute', inset: '10% 14%', borderRadius: '50%', background: glow, filter: 'blur(26px)', pointerEvents: 'none' }} />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ position: 'relative', display: 'block', width: '100%', maxHeight: m ? 200 : 230, objectFit: 'contain', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))' }}
      />
    </div>
  )

  const chip = (label: string, color: string, solid = false) => (
    <span key={label} style={solid
      ? { fontSize: 10.5, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#0a2e0c', background: color, borderRadius: 22, padding: '5px 11px' }
      : { fontSize: 10.5, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color, border: `1px solid ${color}80`, borderRadius: 22, padding: '5px 11px' }}>
      {label}
    </span>
  )

  const cta = (
    <Link to={to} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', padding: '12px 18px', borderRadius: 13, background: '#fff', color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 'auto' }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
      {t('dinoCta')}
      <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const }}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </motion.svg>
    </Link>
  )

  const ribbon = (
    <div style={{ position: 'absolute', top: 16, right: -36, transform: 'rotate(45deg)', background: '#e23b3b', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', padding: '5px 44px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 4 }}>
      {t('dinoNew')}
    </div>
  )

  const chipsRow = (children: React.ReactNode) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>{children}</div>
  )

  // ── SLAJDY ──
  const slides = [
    {
      key: 'napoje',
      accent: '#f7c948',
      render: () => (
        <div style={cardStyle}>
          <div style={{ marginBottom: 10 }}>{photo('/napoje-duo.webp', t('dinoFlavor1') + ' & ' + t('dinoFlavor2'), 'radial-gradient(ellipse at center, rgba(247,201,72,0.22), rgba(226,59,59,0.16) 55%, transparent 72%)')}</div>
          <div style={{ marginBottom: 6 }}>{kicker(t('dinoKicker'))}</div>
          <div style={{ marginBottom: 12 }}>{titleBlock(t('dinoTitle'), t('dinoTagline'))}</div>
          {chipsRow(<>
            {chip(t('dinoFlavor1'), '#ffd34d')}
            {chip(t('dinoFlavor2'), '#ff8170')}
            {chip(t('dinoNoSugar'), '#5fc065', true)}
          </>)}
          {cta}
        </div>
      ),
    },
    {
      key: 'musy',
      accent: '#ff9f43',
      render: () => (
        <div style={cardStyle}>
          {ribbon}
          <div style={{ marginBottom: 10 }}>{photo('/musy-cutout.png', t('musFlavor1') + ' & ' + t('musFlavor2'), 'radial-gradient(ellipse at center, rgba(255,159,67,0.24), rgba(195,210,67,0.18) 55%, transparent 72%)')}</div>
          <div style={{ marginBottom: 6, paddingRight: 46 }}>{kicker(t('musKicker'))}</div>
          <div style={{ marginBottom: 12 }}>{titleBlock(t('musTitle'), t('musTagline'))}</div>
          {chipsRow(<>
            {chip(t('musFlavor1'), '#ffb066')}
            {chip(t('musFlavor2'), '#d3e06b')}
            {chip(t('dinoNoSugar'), '#5fc065', true)}
          </>)}
          {cta}
        </div>
      ),
    },
    {
      key: 'lody',
      accent: '#ffd23c',
      render: () => (
        <div style={cardStyle}>
          {ribbon}
          <div style={{ position: 'relative', display: 'flex', gap: 8, marginBottom: 10 }}>
            <div aria-hidden style={{ position: 'absolute', inset: '10% 14%', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.24), rgba(139,212,42,0.18) 55%, transparent 72%)', filter: 'blur(26px)', pointerEvents: 'none' }} />
            <img src="/edwardzik-main-popcorn.jpg" alt={pl ? 'EDWARDZIK czekolada i popcorn' : 'EDWARDZIK chocolate & popcorn'} loading="lazy" decoding="async"
              style={{ position: 'relative', width: 'calc(50% - 4px)', maxHeight: m ? 200 : 230, objectFit: 'cover', borderRadius: 12, filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))' }} />
            <img src="/edwardzik-main-truskawka.jpg" alt={pl ? 'EDWARDZIK truskawka i limonka' : 'EDWARDZIK strawberry & lime'} loading="lazy" decoding="async"
              style={{ position: 'relative', width: 'calc(50% - 4px)', maxHeight: m ? 200 : 230, objectFit: 'cover', borderRadius: 12, filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))' }} />
          </div>
          <div style={{ marginBottom: 6, paddingRight: 46 }}>{kicker(pl ? 'NOWOŚĆ - LODY W BIEDRONCE' : 'NEW - ICE CREAM AT BIEDRONKA')}</div>
          <div style={{ marginBottom: 12 }}>{titleBlock(
            pl ? 'Lody EDWARDZIK wjechały do Biedronki' : 'EDWARDZIK ice cream hits Biedronka',
            pl ? 'człowieku, to jest smak lata!' : 'the taste of summer!'
          )}</div>
          {chipsRow(<>
            {chip(pl ? 'CZEKOLADA I POPCORN' : 'CHOCOLATE & POPCORN', '#f5a623')}
            {chip(pl ? 'TRUSKAWKA I LIMONKA' : 'STRAWBERRY & LIME', '#8bd42a')}
            {chip(pl ? '💥 MEGA STRZELAJĄCY' : '💥 MEGA POPPING', '#ffd23c', true)}
          </>)}
          {cta}
        </div>
      ),
    },
  ]

  const count = slides.length
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

  const arrowStyle: React.CSSProperties = {
    width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.45)', color: '#fff', fontSize: 18, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' as const }}
      style={{ position: 'relative', maxWidth: m ? 540 : 560, marginBottom: 24 }}
    >
      <div style={{ overflow: 'hidden', borderRadius: 20 }}>
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={slides[index].key}
            custom={dir}
            initial={{ opacity: 0, x: dir * 70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 70 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {slides[index].render()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* strzałki + kropki */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 12 }}>
        <button aria-label="Poprzedni" onClick={() => go(index - 1, -1)} style={arrowStyle}>‹</button>
        <div style={{ display: 'flex', gap: 7 }}>
          {slides.map((s, i) => (
            <button
              key={s.key}
              aria-label={s.key}
              onClick={() => go(i, i > index ? 1 : -1)}
              style={{
                width: i === index ? 24 : 8, height: 8, borderRadius: 8, border: 'none', cursor: 'pointer',
                background: i === index ? s.accent : 'rgba(255,255,255,0.25)',
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
