import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'
import { products, type Product } from '../lib/products'
import StoreLogos from './StoreLogos'

/* MOJE PRODUKTY — SLIDER: jeden produkt na raz (PC i mobile), auto-przewijanie
   + strzałki + kropki. Main photo = bogata wizualizacja (mainPhoto), fallback
   packshot. Klik w slajd / CTA → podstrona produktu. */

const AUTO_MS = 6000

function Slide({ product, locale, t, m }: { product: Product; locale: 'pl' | 'en'; t: ReturnType<typeof useT>['t']; m: boolean }) {
  const isLody = product.category === 'lody'
  const photo = product.mainPhoto ?? product.packshot
  const availability = isLody
    ? (locale === 'pl' ? 'Dostępne w Biedronce' : 'Available at Biedronka')
    : product.isNew
    ? t('productsInDino')
    : null

  return (
    <Link
      to={localizedPath(`/produkty/${product.slug}`, locale)}
      style={{
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '1.05fr 0.95fr',
        gap: m ? 18 : 48,
        alignItems: 'center',
        padding: m ? '22px 20px 28px' : '36px 44px',
        borderRadius: 24,
        overflow: 'hidden',
        background: `radial-gradient(130% 150% at 85% 0%, ${product.glow} 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${product.accent}44`,
        minHeight: m ? 'auto' : 440,
      }}
    >
      {/* main photo */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div aria-hidden style={{ position: 'absolute', inset: '12% 16%', borderRadius: '50%', background: product.accent, filter: 'blur(70px)', opacity: 0.3, pointerEvents: 'none' }} />
        <img
          src={photo}
          alt={product.flavor[locale]}
          loading="lazy"
          decoding="async"
          style={product.mainPhoto
            ? { position: 'relative', width: '100%', maxWidth: m ? 420 : 480, aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 20, boxShadow: `0 30px 70px ${product.glow}, 0 16px 40px rgba(0,0,0,0.55)` }
            : { position: 'relative', width: 'auto', maxWidth: '100%', height: m ? 250 : 330, objectFit: 'contain', filter: `drop-shadow(0 24px 44px ${product.glow})` }}
        />
      </div>

      {/* text */}
      <div style={{ textAlign: m ? 'center' : 'left' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: product.accent, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, justifyContent: m ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
          {product.isNew && (
            <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.12em', color: '#fff', background: '#e23b3b', borderRadius: 14, padding: '4px 10px' }}>
              {t('dinoNew')}
            </span>
          )}
          {product.flavor[locale]}
        </p>
        <h3 style={{ fontSize: m ? 24 : 34, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 14, color: '#fff' }}>
          {product.name[locale]}
        </h3>
        <p style={{ fontSize: m ? 14 : 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', marginBottom: 20, maxWidth: 520, marginLeft: m ? 'auto' : 0, marginRight: m ? 'auto' : 0 }}>
          {product.intro[locale]}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: m ? 'center' : 'flex-start', marginBottom: 24 }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: isLody ? '#3a1200' : '#0a2e0c', background: isLody ? '#ffd23c' : '#5fc065', borderRadius: 20, padding: '5px 11px' }}>
            {isLody ? (locale === 'pl' ? '💥 MEGA strzelający' : '💥 MEGA popping') : t('productsNoSugar')}
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 20, padding: '5px 11px' }}>
            + {product.vitamin[locale]}
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 20, padding: '5px 11px' }}>
            {product.volume?.[locale] ?? t('productsVolume')}
          </span>
          {availability && (
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: isLody ? '#7a0c0c' : '#0a2e0c', background: isLody ? '#ffe14d' : '#7dd17f', borderRadius: 20, padding: '5px 11px' }}>
              {availability}
            </span>
          )}
        </div>

        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: m ? '12px 22px' : '14px 28px', borderRadius: 40, background: '#fff', color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
          {t('productsCardCta')}
          <span style={{ fontSize: 17, lineHeight: 1 }}>→</span>
        </span>
      </div>
    </Link>
  )
}

export default function Produkty({ showStoreLogos = false, standalone = false }: { showStoreLogos?: boolean; standalone?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const m = useIsMobile()
  const { t, locale } = useT()

  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const count = products.length

  const go = (next: number, direction: number) => {
    setDir(direction)
    setIndex(((next % count) + count) % count)
  }

  // auto-przewijanie; każdy ruch (auto i ręczny) resetuje timer przez dep [index]
  useEffect(() => {
    const iv = setInterval(() => go(index + 1, 1), AUTO_MS)
    return () => clearInterval(iv)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const product = products[index]

  const arrowStyle: React.CSSProperties = {
    width: m ? 40 : 48, height: m ? 40 : 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.45)', color: '#fff', fontSize: 20, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
  }

  return (
    <section id="produkty" style={{ position: 'relative', padding: m ? '80px 0' : '120px 0', borderTop: standalone ? 'none' : '1px solid rgba(255,255,255,0.08)', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: m ? 36 : 52 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            {t('productsTag')}
          </p>
          <h2 style={{ fontSize: m ? 32 : 'clamp(28px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 20 }}>
            {t('productsTitle')}
          </h2>
          <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 620, margin: '0 auto 22px' }}>
            {t('productsIntro')}
          </p>

          {showStoreLogos && (
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 40, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                {t('productsAvail')}
              </span>
              <StoreLogos height={18} align="center" />
            </div>
          )}
        </motion.div>

        {/* SLIDER */}
        <div style={{ position: 'relative' }}>
          <div style={{ overflow: 'hidden', borderRadius: 24 }}>
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={product.slug}
                custom={dir}
                initial={{ opacity: 0, x: dir * (m ? 60 : 120) }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -dir * (m ? 60 : 120) }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <Slide product={product} locale={locale} t={t} m={m} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* strzałki */}
          {m ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 16 }}>
              <button aria-label="Poprzedni" onClick={() => go(index - 1, -1)} style={arrowStyle}>‹</button>
              <button aria-label="Następny" onClick={() => go(index + 1, 1)} style={arrowStyle}>›</button>
            </div>
          ) : (
            <>
              <button aria-label="Poprzedni" onClick={() => go(index - 1, -1)} style={{ ...arrowStyle, position: 'absolute', left: -24, top: '50%', transform: 'translateY(-50%)', zIndex: 3 }}>‹</button>
              <button aria-label="Następny" onClick={() => go(index + 1, 1)} style={{ ...arrowStyle, position: 'absolute', right: -24, top: '50%', transform: 'translateY(-50%)', zIndex: 3 }}>›</button>
            </>
          )}

          {/* kropki */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: m ? 14 : 20 }}>
            {products.map((p, i) => (
              <button
                key={p.slug}
                aria-label={p.flavor[locale]}
                onClick={() => go(i, i > index ? 1 : -1)}
                style={{
                  width: i === index ? 26 : 8, height: 8, borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: i === index ? p.accent : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease', padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
