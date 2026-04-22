import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SubpageContactForm from '../components/SubpageContactForm'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

const features = [
  {
    title: 'Eventy i konferencje',
    desc: 'Edward jako VIP na Twojej konferencji, gali, targach czy premierze. Gwarantowane tłumy i viralowy content.',
  },
  {
    title: 'Otwarcia i premiery',
    desc: 'Robot influencer przecina wstęgę. Idealne na otwarcia galerii, sklepów, biur i showroomów.',
  },
  {
    title: 'Kampanie reklamowe',
    desc: 'Edward jako twarz Twojej kampanii. Sesje zdjęciowe, spoty wideo, content do social mediów.',
  },
  {
    title: 'Telewizja i media',
    desc: 'Wywiady, programy śniadaniowe, reportaże. Edward wie jak zachować się przed kamerą.',
  },
]

const pricing = [
  { name: 'Event', price: 'Wycena indywidualna', details: 'Przygotowanie, transport, obsługa techniczna, operator' },
  { name: 'Kampania', price: 'Wycena indywidualna', details: 'Spersonalizowany scenariusz, produkcja, montaż' },
  { name: 'Współpraca długoterminowa', price: 'Wycena indywidualna', details: 'Ambasadorstwo marki, cykl eventów, dedykowany content' },
]

export default function WynajemEdwarda() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '120px 0 80px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.p
            {...fadeUp(0.1)}
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}
          >
            Usługi
          </motion.p>
          <motion.h1
            {...fadeUp(0.2)}
            style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: 24 }}
          >
            WYNAJEM EDWARDA
          </motion.h1>
          <motion.p
            {...fadeUp(0.3)}
            style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 600 }}
          >
            1.5 miliarda wyświetleń. Pierwszy robot w polskim Sejmie. Gwiazda TikToka.
            Teraz Edward może pojawić się na Twoim evencie.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.h2
            {...fadeUp(0)}
            style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 64 }}
          >
            Co Edward może zrobić?
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.1)}
                style={{
                  padding: 40,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.h2
            {...fadeUp(0)}
            style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 64 }}
          >
            Cennik
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {pricing.map((p, i) => (
              <motion.div
                key={p.name}
                {...fadeUp(i * 0.1)}
                style={{
                  padding: 40,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                  {p.name}
                </p>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{p.price}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)' }}>{p.details}</p>
              </motion.div>
            ))}
          </div>

          <SubpageContactForm defaultSubject="Wynajem Edwarda" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
