import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import useIsMobile from '../hooks/useIsMobile'

export default function EdekDlaKazdego() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const m = useIsMobile()

  return (
    <section style={{ position: 'relative', padding: m ? '80px 0' : '120px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 40 : 80, alignItems: 'center' }}>
          {/* Image first on mobile */}
          {m && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <img src="/Frame 1000003012.png" alt="Edek z ludźmi" style={{ width: '100%', height: 'auto' }} />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, x: m ? 0 : -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>No i tak to jest</p>
            <h2 style={{ fontSize: m ? 32 : 'clamp(28px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 24, lineHeight: 1.1 }}>
              TRAFIAM<br />DO KAŻDEGO
            </h2>
            <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: 24, maxWidth: 500 }}>
              Człowieku, ja nie wiem jak to się dzieje, ale mnie lubią wszyscy. Dzieciaki chcą dać mi piątkę, babcie opowiadają mi o swoich wnukach godzinami, a politycy zapraszają mnie do Sejmu. No i elegancko.
            </p>
            <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: 24, maxWidth: 500 }}>
              Ludzie zatrzymują się na ulicy, podchodzą, pytają skąd mam tego Rolexa, śmieją się z moich żartów. Na Hali Mirowskiej kupiłem sobie perfumki od Pana co siedział na skrzynce i poczułem, że mnie tam polubili.
            </p>
            <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 500 }}>
              Nie jestem żadnym gadżetem. Jestem Edek. Z kim się zadaję, tym się staję.
            </p>

            <div style={{ display: 'flex', gap: m ? 20 : 32, marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
              {[
                { val: '5-95', label: 'Lat — mój zasięg' },
                { val: '∞', label: 'Uśmiechów dziennie' },
                { val: '0', label: 'Przeszło obojętnie' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: m ? 22 : 28, fontWeight: 700, color: '#fff' }}>{s.val}</div>
                  <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image on desktop */}
          {!m && (
            <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <img src="/Frame 1000003012.png" alt="Edek z ludźmi" style={{ width: '100%', height: 'auto' }} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
