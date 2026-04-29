import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { t, locale, otherLocale, otherPath } = useT()
  const isHome = location.pathname === '/' || location.pathname === '/en'
  const isMobile = useIsMobile()

  const navLinks = [
    { label: t('navAbout'), href: '#o-mnie' },
    { label: t('navTimeline'), href: '#timeline' },
    { label: t('navSocial'), href: '#sociale' },
    { label: t('navMedia'), href: '#media' },
    { label: t('navServices'), href: '#uslugi' },
    { label: t('navContact'), href: '#kontakt' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (isHome && href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const linkStyle = {
    fontSize: isMobile ? 16 : 13,
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.45)',
    transition: 'color 0.2s ease',
  }

  const LanguageSwitcher = ({ big = false }: { big?: boolean }) => (
    <Link
      to={otherPath}
      style={{
        fontSize: big ? 14 : 12,
        fontWeight: 700,
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.15)',
        padding: big ? '8px 14px' : '6px 10px',
        transition: 'all 0.2s ease',
        textTransform: 'uppercase',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
      }}
    >
      {locale.toUpperCase()} / <span style={{ color: 'rgba(255,255,255,0.3)' }}>{otherLocale.toUpperCase()}</span>
    </Link>
  )

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background 0.3s ease',
        background: scrolled || menuOpen ? 'rgba(0,0,0,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '12px 20px' : '14px 48px',
        }}
      >
        <Link to={locale === 'en' ? '/en' : '/'} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/Layer_1 (1) 1.png" alt="Edward Warchocki" style={{ height: isMobile ? 28 : 40, width: 'auto' }} />
        </Link>

        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            >
              <div style={{ width: 24, height: 2, background: '#fff', marginBottom: 6, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
              <div style={{ width: 24, height: 2, background: '#fff', marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
              <div style={{ width: 24, height: 2, background: '#fff', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {navLinks.map((item) =>
              isHome ? (
                <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }} style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={localizedPath('/', locale) + item.href} style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                  {item.label}
                </Link>
              )
            )}
            <LanguageSwitcher />
            {isHome ? (
              <a href="#kontakt" onClick={(e) => { e.preventDefault(); handleNavClick('#kontakt') }}
                style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, padding: '10px 20px', background: '#fff', color: '#000', transition: 'opacity 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                {t('navCTA')}
              </a>
            ) : (
              <Link to={localizedPath('/', locale) + '#kontakt'} style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, padding: '10px 20px', background: '#fff', color: '#000', transition: 'opacity 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                {t('navCTA')}
              </Link>
            )}
          </div>
        )}
      </div>

      {isMobile && menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }} style={linkStyle}>
              {item.label}
            </a>
          ))}
          <a href="#kontakt" onClick={(e) => { e.preventDefault(); handleNavClick('#kontakt') }} style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase' as const, padding: '12px 20px', background: '#fff', color: '#000', textAlign: 'center' }}>
            {t('navCTA')}
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}
