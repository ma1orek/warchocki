import { motion } from 'framer-motion'
import { useState } from 'react'
import { useT } from '../lib/i18n'

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
      <motion.div
        animate={hovered ? { x: ['-120%', '120%'] } : { x: '-120%' }}
        transition={{ duration: 1.2, ease: 'easeInOut' as const }}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '60%', height: '100%',
          background: dark
            ? 'linear-gradient(120deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%)'
            : 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
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
        >→</motion.span>
      </div>
    </motion.a>
  )
}

export default function SubpageContactForm({ defaultSubject: _ }: { defaultSubject?: string }) {
  const { locale } = useT()
  const isEn = locale === 'en'

  const fanLabel = isEn ? 'For fans' : 'Dla fanów'
  const fanCta = isEn ? 'Write to Edward' : 'Napisz do Edwarda'
  const fanDesc = isEn ? 'Got something to say? Want to chat? Edward reads every message.' : 'Masz coś do powiedzenia? Chcesz pogadać? Edek czyta każdą wiadomość.'
  const bizLabel = isEn ? 'For business' : 'Dla biznesu'
  const bizCta = isEn ? 'Business inquiry' : 'Zapytaj o współpracę'
  const bizDesc = isEn ? "Events, campaigns, sponsorships, ambassadorships — let's do something big together." : 'Eventy, kampanie, sponsoringi, ambasadorstwa — zróbmy coś dużego razem.'

  return (
    <div id="kontakt" style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.08)', scrollMarginTop: 100 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 14, lineHeight: 1.15 }}>
          {isEn ? 'CONTACT EDWARD' : 'KONTAKT Z EDWARDEM'}
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto' }}>
          {isEn ? 'Choose your path: a quick hello as a fan, or serious business talk.' : 'Wybierz swoją ścieżkę: szybkie cześć od fana, albo poważna gadka biznesowa.'}
        </p>
      </div>

      <div className="contact-cta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        <ContactCard
          href="https://contactform.bitrix24.site/Napiszdoedwarda/"
          label={fanLabel}
          cta={fanCta}
          desc={fanDesc}
          icon={
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
            </svg>
          }
        />
      </div>

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>
          {isEn ? 'Or call' : 'Lub zadzwoń'}
        </p>
        <a href="tel:+48666666245" style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>
          +48 666 666 245
        </a>
      </div>
    </div>
  )
}
