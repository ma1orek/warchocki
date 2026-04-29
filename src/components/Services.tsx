import { motion, useInView } from 'framer-motion'
import { useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT, localizedPath, type TranslationKey, type Locale } from '../lib/i18n'

const buildServices = (t: (k: TranslationKey) => string, locale: Locale) => [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    tag: t('svc1Tag'), title: t('svc1Title'), desc: t('svc1Desc'),
    link: localizedPath('/wynajem-edwarda', locale),
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <circle cx="8" cy="16" r="1" fill="#fff" />
        <circle cx="16" cy="16" r="1" fill="#fff" />
      </svg>
    ),
    tag: t('svc2Tag'), title: t('svc2Title'), desc: t('svc2Desc'),
    link: localizedPath('/wynajem-robotow', locale),
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    tag: t('svc3Tag'), title: t('svc3Title'), desc: t('svc3Desc'),
    link: localizedPath('/promocja-social-media', locale),
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    tag: t('svc4Tag'), title: t('svc4Title'), desc: t('svc4Desc'),
    link: 'https://merarobotics.com',
    external: true as const,
  },
]

type Service = ReturnType<typeof buildServices>[number]

function ServiceCard({ service, index, learnMore }: { service: Service; index: number; learnMore: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  const cardStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
    backdropFilter: 'blur(16px)',
    transition: 'all 0.3s ease',
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    cursor: 'default',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }} />
      <div style={{ marginBottom: 24 }}>{service.icon}</div>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>
        {service.tag}
      </p>
      <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
        {service.title}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', marginBottom: 32, flex: 1 }}>
        {service.desc}
      </p>
      {'external' in service && service.external ? (
        <a
          href={service.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff', transition: 'opacity 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {learnMore} <span style={{ fontSize: 18 }}>&rarr;</span>
        </a>
      ) : (
        <Link
          to={service.link}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff', transition: 'opacity 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {learnMore} <span style={{ fontSize: 18 }}>&rarr;</span>
        </Link>
      )}
    </motion.div>
  )
}

function ContactInline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { locale } = useT()

  const isEn = locale === 'en'
  const fanLabel = isEn ? 'For fans' : 'Dla fanów'
  const fanCta = isEn ? 'Write to Edward' : 'Napisz do Edwarda'
  const fanDesc = isEn ? 'Got something to say? Want to chat? Edward reads every message.' : 'Masz coś do powiedzenia? Chcesz pogadać? Edek czyta każdą wiadomość.'
  const bizLabel = isEn ? 'For business' : 'Dla biznesu'
  const bizCta = isEn ? 'Business inquiry' : 'Zapytaj o współpracę'
  const bizDesc = isEn ? 'Events, campaigns, sponsorships, ambassadorships — let\'s do something big together.' : 'Eventy, kampanie, sponsoringi, ambasadorstwa — zróbmy coś dużego razem.'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      id="kontakt"
      style={{ marginTop: 80, scrollMarginTop: 100 }}
    >
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h3 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}>
          {isEn ? 'CONTACT EDWARD' : 'KONTAKT Z EDWARDEM'}
        </h3>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 600, margin: '0 auto' }}>
          {isEn
            ? "Choose your path: a quick hello as a fan, or serious business talk."
            : "Wybierz swoją ścieżkę: szybkie cześć od fana, albo poważna gadka biznesowa."}
        </p>
      </div>

      <div className="contact-cta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        <ContactCard
          href="https://contactform.bitrix24.site/Napiszdoedwarda/"
          label={fanLabel}
          cta={fanCta}
          desc={fanDesc}
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          }
        />
        <ContactCard
          href="https://contactform.bitrix24.site/EdwardBiznes/"
          label={bizLabel}
          cta={bizCta}
          desc={bizDesc}
          dark
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
            </svg>
          }
        />
      </div>

      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>
          {isEn ? 'Or call' : 'Lub zadzwoń'}
        </p>
        <a
          href="tel:+48666666245"
          style={{ fontSize: 22, fontWeight: 700, color: '#fff', transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          +48 666 666 245
        </a>
      </div>
    </motion.div>
  )
}

function ContactCard({ href, label, cta, desc, icon, dark = false }: { href: string; label: string; cta: string; desc: string; icon: React.ReactNode; dark?: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: '40px 36px',
        background: dark ? '#fff' : 'rgba(255,255,255,0.03)',
        color: dark ? '#000' : '#fff',
        border: dark ? '1px solid #fff' : '1px solid rgba(255,255,255,0.12)',
        overflow: 'hidden',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        minHeight: 240,
      }}
    >
      {/* Animated shimmer */}
      <motion.div
        animate={hovered ? { x: ['-120%', '120%'] } : { x: '-120%' }}
        transition={{ duration: 1.2, ease: 'easeInOut' as const }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60%',
          height: '100%',
          background: dark
            ? 'linear-gradient(120deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%)'
            : 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <motion.div
            animate={hovered ? { rotate: [0, -8, 8, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.35)' }}>
            {label}
          </p>
        </div>
      </div>

      <h3 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, position: 'relative', zIndex: 2 }}>
        {cta}
      </h3>

      <p style={{ fontSize: 15, lineHeight: 1.6, color: dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)', flex: 1, position: 'relative', zIndex: 2 }}>
        {desc}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', position: 'relative', zIndex: 2 }}>
        <span>{cta}</span>
        <motion.span
          animate={hovered ? { x: 6 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ display: 'inline-block', fontSize: 18 }}
        >
          →
        </motion.span>
      </div>
    </motion.a>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const { t, locale } = useT()
  const services = buildServices(t, locale)

  return (
    <section id="uslugi" className="services-section" style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            {t('servicesTag')}
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em' }}>
            {t('servicesTitle')}
          </h2>
        </motion.div>

        {/* 4 cards */}
        <div className="services-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} learnMore={t('svcLearnMore')} />
          ))}
        </div>

        {/* Contact + pricing */}
        <ContactInline />
      </div>
    </section>
  )
}
