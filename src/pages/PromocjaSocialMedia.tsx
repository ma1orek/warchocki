import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SocialLinks from '../components/SocialLinks'
import SubpageContactForm from '../components/SubpageContactForm'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

const platforms = [
  { name: 'TikTok', desc: 'Krótkie formy, wirale, challenge. Edek jest królem TikToka.' },
  { name: 'Instagram', desc: 'Reelsy, stories, posty. Estetyczny content z robotem influencerem.' },
  { name: 'YouTube', desc: 'Dłuższe formy, vlogi, behind the scenes. Pełna produkcja.' },
  { name: 'Facebook', desc: 'Posty, relacje z eventów, kampanie reklamowe z szerokim zasięgiem.' },
]

const services = [
  'Lokowanie produktu w filmikach Edwarda',
  'Dedykowane kampanie wiralowe na TikToku',
  'Sesje zdjęciowe z robotem influencerem',
  'Content do social mediów Twojej marki',
  'Relacje z eventów na żywo',
  'Współpraca ambasadorska długoterminowa',
]

export default function PromocjaSocialMedia() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '120px 0 80px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.p {...fadeUp(0.1)} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Usługi
          </motion.p>
          <motion.h1 {...fadeUp(0.2)} style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: 24 }}>
            PROMOCJA SOCIAL MEDIA
          </motion.h1>
          <motion.p {...fadeUp(0.3)} style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 600, marginBottom: 32 }}>
            Edward to influencer nowej ery. Ponad 500 milionów wyświetleń mówi samo za siebie.
            Zasięgi, których nie da się kupić — ale można wynająć.
          </motion.p>
          <motion.div {...fadeUp(0.4)}>
            <SocialLinks size="large" />
          </motion.div>
        </div>
      </section>

      {/* Platforms */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 64 }}>
            Platformy
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
            {platforms.map((p, i) => (
              <motion.div key={p.name} {...fadeUp(i * 0.1)} style={{ padding: 40, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{p.name}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 64 }}>
            Co oferujemy
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
            {services.map((s, i) => (
              <motion.div key={s} {...fadeUp(i * 0.05)} style={{ padding: '24px 40px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 20 }}>&#x2192;</span>
                <p style={{ fontSize: 16, fontWeight: 500 }}>{s}</p>
              </motion.div>
            ))}
          </div>

          <SubpageContactForm defaultSubject="Promocja Social Media" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
