import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'
import { products, type Product } from '../lib/products'
import StoreLogos from './StoreLogos'

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)
  const m = useIsMobile()
  const { t, locale } = useT()
  const isLody = product.category === 'lody'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={localizedPath(`/produkty/${product.slug}`, locale)}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: m ? 'column' : 'row',
          alignItems: 'center',
          gap: m ? 8 : 24,
          padding: m ? '28px 24px 32px' : '36px 40px',
          borderRadius: 22,
          overflow: 'hidden',
          background: `radial-gradient(120% 140% at 80% 0%, ${product.glow} 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.02) 100%)`,
          border: `1px solid ${hovered ? `${product.accent}66` : 'rgba(255,255,255,0.08)'}`,
          transition: 'border-color 0.3s ease, transform 0.3s ease',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          minHeight: m ? 'auto' : 300,
        }}
      >
        {/* glow blob */}
        <motion.div
          aria-hidden
          animate={hovered ? { scale: 1.15, opacity: 0.55 } : { scale: 1, opacity: 0.35 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', top: '-30%', right: m ? '-20%' : '-5%', width: 260, height: 260,
            borderRadius: '50%', background: product.accent, filter: 'blur(80px)', pointerEvents: 'none',
          }}
        />

        {/* packshot */}
        <motion.div
          animate={hovered ? { y: -8, rotate: -2 } : { y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}
        >
          <img
            src={product.mainPhoto ?? product.packshot}
            alt={product.flavor[locale]}
            loading="lazy"
            decoding="async"
            style={product.mainPhoto
              ? {
                  width: m ? 230 : 260,
                  height: m ? 230 : 260,
                  objectFit: 'cover',
                  borderRadius: 18,
                  boxShadow: `0 24px 50px ${product.glow}, 0 14px 30px rgba(0,0,0,0.5)`,
                }
              : {
                  height: m ? 240 : 290,
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: 16,
                  filter: `drop-shadow(0 24px 40px ${product.glow})`,
                }}
          />
        </motion.div>

        {/* text */}
        <div style={{ position: 'relative', zIndex: 2, flex: 1, textAlign: m ? 'center' : 'left' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: product.accent, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8, justifyContent: m ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
            {product.isNew && (
              <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.12em', color: '#fff', background: '#e23b3b', borderRadius: 14, padding: '4px 10px' }}>
                {t('dinoNew')}
              </span>
            )}
            {product.flavor[locale]}
          </p>
          <h3 style={{ fontSize: m ? 20 : 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 14, color: '#fff' }}>
            {product.name[locale]}
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: m ? 'center' : 'flex-start', marginBottom: 22 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: isLody ? '#3a1200' : '#0a2e0c', background: isLody ? '#ffd23c' : '#5fc065', borderRadius: 20, padding: '5px 11px' }}>
              {isLody ? (locale === 'pl' ? '💥 MEGA strzelający' : '💥 MEGA popping') : t('productsNoSugar')}
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 20, padding: '5px 11px' }}>
              + {product.vitamin[locale]}
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 20, padding: '5px 11px' }}>
              {product.volume?.[locale] ?? t('productsVolume')}
            </span>
            {product.isNew && (
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: isLody ? '#7a0c0c' : '#0a2e0c', background: isLody ? '#ffe14d' : '#7dd17f', borderRadius: 20, padding: '5px 11px' }}>
                {isLody ? (locale === 'pl' ? 'Dostępne w Biedronce' : 'Available at Biedronka') : t('productsInDino')}
              </span>
            )}
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff' }}>
            {t('productsCardCta')}
            <motion.span animate={hovered ? { x: 6 } : { x: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ display: 'inline-block', fontSize: 18, color: product.accent }}>
              →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Produkty({ showStoreLogos = false, standalone = false }: { showStoreLogos?: boolean; standalone?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const m = useIsMobile()
  const { t } = useT()

  return (
    <section id="produkty" style={{ position: 'relative', padding: m ? '80px 0' : '120px 0', borderTop: standalone ? 'none' : '1px solid rgba(255,255,255,0.08)', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: m ? 48 : 64 }}
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

          {/* store availability strip: DINO, Kaufland, Auchan, SPAR (hidden on homepage) */}
          {showStoreLogos && (
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 40, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                {t('productsAvail')}
              </span>
              <StoreLogos height={18} align="center" />
            </div>
          )}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 20 : 24 }}>
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
