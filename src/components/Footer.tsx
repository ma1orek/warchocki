import SocialLinks from './SocialLinks'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { useT, localizedPath } from '../lib/i18n'

export default function Footer() {
  const m = useIsMobile()
  const { locale } = useT()

  return (
    <footer style={{ position: 'relative', padding: m ? '40px 0' : '64px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', alignItems: m ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 20, marginBottom: 24 }}>
          <Link to={localizedPath('/', locale)} style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/Layer_1 (1) 1.png" alt="Edward Warchocki" style={{ height: m ? 24 : 32, width: 'auto' }} />
          </Link>
          <SocialLinks />
        </div>

        <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', alignItems: m ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 12, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>&copy; 2026 WARCHOCKI.PL</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: m ? 14 : 22, flexWrap: 'wrap' }}>
            <a href="https://merarobotics.com" target="_blank" rel="noopener noreferrer" aria-label="MERA Robotics" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600, letterSpacing: '.12em' }}>
              <img src="/mera-mark.svg" alt="" width={22} height={24} style={{ height: 24, width: 'auto' }} />
              MERA ROBOTICS
            </a>
            {[
              ['merarobotics.com', 'https://merarobotics.com'],
              ['MERA OS', 'https://merarobotics.com/aplikacja/'],
              ['MERA RENT', 'https://mera.rent'],
              ['MERA SHOP', locale === 'pl' ? 'https://merarobotics.com/pl/sklep' : 'https://merarobotics.com/en/shop'],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
