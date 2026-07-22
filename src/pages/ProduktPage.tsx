import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StoreLogos from '../components/StoreLogos'
import DinoLogo from '../components/DinoLogo'
import LazyVideo from '../components/LazyVideo'
import NapojeSocial from '../components/NapojeSocial'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'
import { getProduct, products } from '../lib/products'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

export default function ProduktPage() {
  const { slug } = useParams()
  const m = useIsMobile()
  const { t, locale } = useT()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const packY = useTransform(scrollYProgress, [0, 1], [0, m ? 60 : 140])

  const product = getProduct(slug || '')
  if (!product) return <Navigate to={localizedPath('/produkty', locale)} replace />

  // Kategorie: lody (Edwardzik/Biedronka) vs mus (saszetka, gramy) vs napój (butelka, ml).
  const isLody = product.category === 'lody'
  const isMus = !isLody && !!product.volume?.pl.includes('g')
  const catOf = (p: typeof product) => (p.category === 'lody' ? 'lody' : p.volume?.pl.includes('g') ? 'mus' : 'napoj')
  const other = products.find((p) => p.slug !== product.slug && catOf(p) === catOf(product))!
  const nutrition = product.nutrition[locale]

  const facts = isLody
    ? [
        locale === 'pl' ? 'MEGA strzelający cukier w polewie' : 'MEGA popping sugar in the coating',
        locale === 'pl' ? 'Płynne nadzienie w środku' : 'Liquid filling inside',
        locale === 'pl' ? 'Lody NORDIS × Edward Warchocki' : 'NORDIS × Edward Warchocki ice cream',
      ]
    : isMus
    ? [t('prodFactPasteurised'), locale === 'pl' ? '100% owoców' : '100% fruit', t('prodFactNatural')]
    : [t('prodFactPasteurised'), t('prodFactConcentrate'), t('prodFactNatural')]

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <Navbar />

      {/* themed ambient glow (lighter on mobile to avoid GPU jank) */}
      <div aria-hidden style={{ position: 'absolute', top: -200, right: -200, width: m ? 320 : 600, height: m ? 320 : 600, borderRadius: '50%', background: product.accent, filter: m ? 'blur(80px)' : 'blur(160px)', opacity: 0.18, pointerEvents: 'none' }} />
      {!m && <div aria-hidden style={{ position: 'absolute', top: 400, left: -250, width: 600, height: 600, borderRadius: '50%', background: product.accent2, filter: 'blur(170px)', opacity: 0.13, pointerEvents: 'none' }} />}

      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', padding: m ? '110px 0 40px' : '140px 0 80px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0.05)} style={{ marginBottom: m ? 24 : 36 }}>
            <Link to={localizedPath('/produkty', locale)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
              <span style={{ fontSize: 16 }}>←</span> {t('prodBack')}
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1.1fr 0.9fr', gap: m ? 24 : 60, alignItems: 'center' }}>
            {/* text */}
            <div style={{ order: m ? 2 : 1 }}>
              <motion.p {...fadeUp(0.1)} style={{ fontSize: m ? 12 : 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: product.accent, marginBottom: 16 }}>
                {product.flavor[locale]}
              </motion.p>
              <motion.h1 {...fadeUp(0.18)} style={{ fontSize: m ? 30 : 'clamp(34px, 4.5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 22 }}>
                {product.name[locale]}
              </motion.h1>
              <motion.p {...fadeUp(0.26)} style={{ fontSize: m ? 15 : 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 540, marginBottom: 28 }}>
                {product.intro[locale]}
              </motion.p>

              <motion.div {...fadeUp(0.34)} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 30 }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: isLody ? '#3a1200' : '#0a2e0c', background: isLody ? '#ffd23c' : '#5fc065', borderRadius: 24, padding: '8px 16px' }}>
                  {isLody ? (locale === 'pl' ? '💥 MEGA strzelający' : '💥 MEGA popping') : t('prodHeroBadge')}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', border: `1px solid ${product.accent}66`, borderRadius: 24, padding: '8px 16px' }}>
                  + {product.vitamin[locale]}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 24, padding: '8px 16px' }}>
                  {product.volume?.[locale] ?? '500 ml'}
                </span>
              </motion.div>

              {/* dostępność: lody = Biedronka, napoje = DINO/Kaufland/Auchan/SPAR, musy = TYLKO Dino */}
              {isLody ? (
                <motion.div {...fadeUp(0.42)}>
                  <img src="/biedronka-badge.png" alt={locale === 'pl' ? 'Dostępne w Biedronce' : 'Available at Biedronka'} loading="lazy" decoding="async" style={{ height: m ? 74 : 96, width: 'auto', filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.5))' }} />
                </motion.div>
              ) : (
                <motion.div {...fadeUp(0.42)} style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 44, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                    {isMus ? (locale === 'pl' ? 'Dostępny w sklepach Dino' : 'Available at Dino stores') : t('prodAvailTitle')}
                  </span>
                  {isMus
                    ? <span style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', borderRadius: 6, padding: '4px 9px' }}><DinoLogo height={14} /></span>
                    : <StoreLogos height={16} />}
                </motion.div>
              )}
            </div>

            {/* packshot */}
            <motion.div style={{ order: m ? 1 : 2, position: 'relative', display: 'flex', justifyContent: 'center', y: m ? 0 : packY }}>
              {/* conic glow - rotates on desktop, static on mobile to avoid GPU jank */}
              <motion.div
                aria-hidden
                animate={m ? undefined : { rotate: 360 }}
                transition={m ? undefined : { duration: 24, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', width: m ? 300 : 460, height: m ? 300 : 460, top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', borderRadius: '50%', background: `conic-gradient(from 0deg, ${product.accent}55, transparent 30%, ${product.accent2}44, transparent 70%, ${product.accent}55)`, filter: m ? 'blur(36px)' : 'blur(50px)', opacity: 0.7, pointerEvents: 'none' }}
              />
              <motion.img
                src={isLody ? (product.mainPhoto ?? product.packshot) : product.packshot}
                alt={product.flavor[locale]}
                loading="eager"
                decoding="async"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={m ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: [0, -14, 0] }}
                transition={m ? { duration: 0.6, delay: 0.15 } : { opacity: { duration: 0.8, delay: 0.2 }, scale: { duration: 0.8, delay: 0.2 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
                style={isLody
                  ? { position: 'relative', zIndex: 2, width: '100%', maxWidth: m ? 360 : 480, aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 24, boxShadow: `0 40px 80px ${product.glow}, 0 20px 46px rgba(0,0,0,0.55)` }
                  : { position: 'relative', zIndex: 2, height: m ? 360 : 540, width: 'auto', objectFit: 'contain', borderRadius: 20, filter: `drop-shadow(0 40px 70px ${product.glow})` }}
              />
            </motion.div>
          </div>

          {/* facts strip */}
          <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexWrap: 'wrap', gap: m ? 10 : 0, marginTop: m ? 36 : 64, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {facts.map((f, i) => (
              <div key={f} style={{ flex: m ? '1 1 100%' : 1, display: 'flex', alignItems: 'center', gap: 12, paddingLeft: !m && i > 0 ? 28 : 0, borderLeft: !m && i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: product.accent, flexShrink: 0, boxShadow: `0 0 10px ${product.accent}` }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{f}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VIDEO showcase (musy nie mają jeszcze wideo - sekcja znika) */}
      {product.video && (
        <section style={{ position: 'relative', padding: m ? '20px 0 50px' : '40px 0 100px' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
            <motion.div {...fadeUp(0.1)} style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: `1px solid ${product.accent}33`, maxWidth: 920, margin: '0 auto', boxShadow: `0 30px 80px ${product.glow}` }}>
              <LazyVideo src={product.video} poster={product.packshot} />
              <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.4)', pointerEvents: 'none' }} />
            </motion.div>
          </div>
        </section>
      )}

      {/* DETAILS - nutrition + ingredients/storage */}
      <section style={{ position: 'relative', padding: m ? '20px 0 70px' : '40px 0 110px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '0.85fr 1.15fr', gap: m ? 32 : 56, marginTop: m ? 40 : 64 }}>
            {/* Nutrition table */}
            <motion.div {...fadeUp(0)}>
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '18px 20px', background: product.accent, color: '#101010' }}>
                  <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em' }}>{t('prodNutritionTitle')}</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{product.volume?.pl.includes('g') ? (locale === 'pl' ? 'w 100 g produktu' : 'per 100 g') : t('prodNutritionSub')}</span>
                </div>
                <div>
                  {nutrition.map((row, i) => (
                    <div
                      key={row.label}
                      style={{
                        display: 'flex', justifyContent: 'space-between', gap: 16,
                        padding: row.sub ? '9px 20px 9px 34px' : '11px 20px',
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <span style={{ fontSize: row.sub ? 12 : 13, fontWeight: row.sub ? 400 : 600, color: row.sub ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)' }}>{row.label}</span>
                      <span style={{ fontSize: row.sub ? 12 : 13, fontWeight: row.sub ? 400 : 700, color: row.sub ? 'rgba(255,255,255,0.55)' : '#fff', whiteSpace: 'nowrap' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: 11, lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginTop: 12 }}>{t('prodNutritionNote')}</p>
            </motion.div>

            {/* Ingredients + storage */}
            <motion.div {...fadeUp(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: product.accent, marginBottom: 12 }}>{t('prodIngredientsTitle')}</h3>
                <p style={{ fontSize: m ? 15 : 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)' }}>{product.ingredients[locale]}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 24 }}>
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: product.accent, marginBottom: 12 }}>{t('prodBestBeforeTitle')}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>{isLody ? (locale === 'pl' ? 'Data i numer partii: nadruk z tyłu opakowania.' : 'Date and batch number: printed on the back of the package.') : isMus ? (locale === 'pl' ? 'Data i numer partii w środkowej części opakowania.' : 'Date and batch number in the middle part of the pouch.') : t('prodBestBefore')}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: product.accent, marginBottom: 12 }}>{t('prodStorageTitle')}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>{product.storage[locale]}</p>
                </div>
              </div>

              {/* producer / deposit strip */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: m ? 16 : 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ flex: '1 1 220px' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>{t('prodProducer')}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{isLody ? 'NORDIS Chłodnie Polskie Sp. z o.o., ul. Zimna 1a, 65-707 Zielona Góra' : t('prodProducerVal')}</p>
                </div>
                {/* kaucja dotyczy tylko butelek - musy/lody bez kaucji */}
                {!isMus && !isLody && (
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>{t('prodDeposit')}</p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{t('prodDepositVal')}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <NapojeSocial />

      {/* CTA - other flavor + DINO */}
      <section style={{ position: 'relative', padding: m ? '60px 0 80px' : '90px 0 120px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 24, alignItems: 'stretch' }}>
            {/* DINO block */}
            <motion.div {...fadeUp(0)} style={{ borderRadius: 22, padding: m ? 28 : 40, background: isLody ? 'linear-gradient(135deg, rgba(255,210,60,0.16), rgba(255,255,255,0.03))' : 'linear-gradient(135deg, rgba(52,169,58,0.18), rgba(255,255,255,0.03))', border: isLody ? '1px solid rgba(255,210,60,0.35)' : '1px solid rgba(95,192,101,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
              {isLody
                ? <img src="/biedronka-badge.png" alt="Biedronka" loading="lazy" decoding="async" style={{ height: 78, width: 'auto', alignSelf: 'flex-start' }} />
                : isMus
                ? <span style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', background: '#fff', borderRadius: 8, padding: '6px 12px' }}><DinoLogo height={18} /></span>
                : <StoreLogos height={20} />}
              <h3 style={{ fontSize: m ? 24 : 30, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{isLody ? (locale === 'pl' ? 'Szukaj w zamrażarkach Biedronki' : 'Find it in Biedronka freezers') : t('prodCtaTitle')}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>
                {isLody
                  ? (locale === 'pl' ? 'Lody EDWARDZIK czekają w zamrażarkach sklepów Biedronka w całej Polsce. Człowieku, spróbuj obu smaków - zanim się rozejdą.' : 'EDWARDZIK ice creams are waiting in Biedronka freezers across Poland. Try both flavours - before they are gone.')
                  : isMus
                  ? (locale === 'pl' ? 'Musy owocowe czekają na półkach sklepów Dino w całej Polsce. Sprawdź oba smaki.' : 'The fruit pouches are waiting on the shelves of Dino stores across Poland. Try both flavors.')
                  : t('prodCtaDesc')}
              </p>
            </motion.div>

            {/* Other flavor */}
            <motion.div {...fadeUp(0.12)}>
              <Link to={localizedPath(`/produkty/${other.slug}`, locale)}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: m ? 16 : 24, height: '100%', borderRadius: 22, padding: m ? 24 : 32, overflow: 'hidden', background: `radial-gradient(120% 140% at 90% 10%, ${other.glow}, rgba(255,255,255,0.02) 55%)`, border: `1px solid ${other.accent}44` }}
                onMouseEnter={(e) => { const im = e.currentTarget.querySelector('img'); if (im) im.style.transform = 'translateY(-6px) rotate(-2deg)' }}
                onMouseLeave={(e) => { const im = e.currentTarget.querySelector('img'); if (im) im.style.transform = 'translateY(0) rotate(0)' }}
              >
                <img src={isLody ? (other.mainPhoto ?? other.packshot) : other.packshot} alt={other.flavor[locale]} loading="lazy" decoding="async" style={isLody
                  ? { width: m ? 130 : 150, height: m ? 130 : 150, objectFit: 'cover', borderRadius: 14, transition: 'transform 0.4s ease', boxShadow: `0 18px 34px ${other.glow}`, flexShrink: 0 }
                  : { height: m ? 130 : 170, width: 'auto', objectFit: 'contain', borderRadius: 12, transition: 'transform 0.4s ease', filter: `drop-shadow(0 18px 30px ${other.glow})` }} />
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>{t('prodOther')}</p>
                  <p style={{ fontSize: m ? 18 : 22, fontWeight: 700, letterSpacing: '-0.01em', color: '#fff', marginBottom: 12 }}>{other.flavor[locale]}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: other.accent }}>
                    {t('productsCardCta')} →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
