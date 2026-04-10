import SocialLinks from './SocialLinks'
import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'

export default function Footer() {
  const m = useIsMobile()

  return (
    <footer style={{ position: 'relative', padding: m ? '40px 0' : '64px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', alignItems: m ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 20, marginBottom: 24 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/Layer_1 (1) 1.png" alt="Edward Warchocki" style={{ height: m ? 24 : 32, width: 'auto' }} />
          </Link>
          <SocialLinks />
        </div>

        <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', alignItems: m ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 12, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>&copy; 2026 WARCHOCKI.PL</p>
            <a href="https://merarobotics.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
              MERA Robotics
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'pulse-glow 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              500 000 000+ i lecę dalej
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
