import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SubpageContactForm from '../components/SubpageContactForm'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

const robots = [
  {
    name: 'Unitree G1',
    desc: 'Humanoidalny robot 132cm. Chodzenie, interakcje z ludźmi, asystent w retailu i na eventach.',
    specs: ['132 cm wzrostu', '35 kg wagi', 'Do 2h pracy na baterii', 'MERA OS AI'],
  },
  {
    name: 'Unitree H1',
    desc: 'Zaawansowany humanoid do zadań przemysłowych. Logistyka, inspekcje, przenoszenie obiektów.',
    specs: ['180 cm wzrostu', '70 kg wagi', 'Do 4h pracy na baterii', 'Pełna autonomia'],
  },
  {
    name: 'Flota robotów',
    desc: 'Wiele jednostek do dużych eventów, targów, centrów handlowych. Koordynacja przez MERA OS.',
    specs: ['Dowolna liczba jednostek', 'Centralne zarządzanie', 'Dedykowany operator', 'Wsparcie 24/7'],
  },
]

const useCases = [
  'Eventy i targi', 'Centra handlowe', 'Logistyka i magazyny',
  'Ochrona obiektów', 'Retail i obsługa klienta', 'Marketing i promocja',
]

export default function WynajemRobotow() {
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
            WYNAJEM ROBOTÓW
          </motion.h1>
          <motion.p {...fadeUp(0.3)} style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 600 }}>
            Dostarczamy roboty humanoidalne Unitree z autorskim oprogramowaniem MERA OS.
            Pełna konfiguracja, transport i obsługa techniczna.
          </motion.p>
        </div>
      </section>

      {/* Robots */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 64 }}>
            Nasza flota
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {robots.map((r, i) => (
              <motion.div key={r.name} {...fadeUp(i * 0.1)} style={{ padding: 40, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{r.name}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>{r.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {r.specs.map((s) => (
                    <li key={s} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 64 }}>
            Zastosowania
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {useCases.map((uc, i) => (
              <motion.div key={uc} {...fadeUp(i * 0.05)} style={{ padding: '32px 40px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: 16, fontWeight: 600 }}>{uc}</p>
              </motion.div>
            ))}
          </div>

          <SubpageContactForm defaultSubject="Wynajem robotów" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
