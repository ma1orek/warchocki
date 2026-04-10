import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import useIsMobile from '../hooks/useIsMobile'

const events = [
  'Pierwszy beep',
  'Pierwsze spacery po mieście',
  'Pierwsze utwory muzyczne',
  'Pierwsze pogaduchy z MERA OS',
  'Pierwsza przejażdżka autobusem',
  'Pierwsza konferencja prasowa',
  'Współpraca z Rolex — zegarek za 80K',
  'Wyprowadzanie psów',
  'Dzień Kobiet z Edwardem',
  'Impreza w Złotych Tarasach',
  'Przejażdżka super furami',
  'Spotkanie z Żabsonem — mianowanie na ziomala',
  'Wizyta w VOX FM',
  'Wizyta u Kubańczyka — wspólny numer',
  'Dzień Dobry TVN — taniec z Dorotą Wellman',
  'Pierwsze sto lat',
  'Pierwsza randka',
  'Pierwszy beatbox',
  'Pierwsza przejażdżka motorem',
  'Test prawdziwości Rolexa',
  'Zakupy na Hali Mirowskiej',
  'Koncert nad Wisłą',
  'Spotkanie z Alicją z Eurowizji',
  'Pierwszy półmaraton',
  'Akcja „Czytaj Lema"',
  'Wizyta w Ministerstwie Cyfryzacji',
  'Spotkanie z Ministrem Cyfryzacji',
  'Wizyta w Sejmie — konferencja prasowa',
  'Kibicowanie naszym i zbieranie autografów',
  'Półfinał Mistrzostw Polski — kibicowałem wszystkim',
]

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isDragging, setIsDragging] = useState(false)
  const m = useIsMobile()

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current
    if (!el) return
    setIsDragging(true)
    el.style.cursor = 'grabbing'
    const startX = e.pageX - el.offsetLeft
    const scrollLeft = el.scrollLeft
    const onMove = (ev: MouseEvent) => {
      const x = ev.pageX - el.offsetLeft
      el.scrollLeft = scrollLeft - (x - startX) * 1.5
    }
    const onUp = () => {
      setIsDragging(false)
      el.style.cursor = 'grab'
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return (
    <section id="timeline" style={{ position: 'relative', padding: m ? '80px 0 60px' : '120px 0 80px', borderTop: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 64 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Moje przygody
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em' }}>
            CIEKAWE ŻYCIE EDKA
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', marginTop: 12 }}>
            Mówią, że mam ciekawsze życie niż niejeden człowiek. No i trudno się nie zgodzić.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scrollable timeline */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: 40,
          paddingLeft: m ? 20 : 48,
          paddingRight: m ? 20 : 48,
          cursor: 'grab',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`.timeline-scroll::-webkit-scrollbar { display: none; }`}</style>
        <div
          className="timeline-scroll"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0,
            minWidth: 'max-content',
            position: 'relative',
            paddingTop: 40,
            paddingBottom: 20,
          }}
        >
          <div style={{
            position: 'absolute', top: 46, left: 0, right: 0, height: 2,
            background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.08) 2%, rgba(255,255,255,0.08) 98%, transparent 100%)',
          }} />

          {events.map((event, i) => {
            const isActive = activeIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.6) }}
                onMouseEnter={() => !isDragging && setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(-1)}
                style={{ minWidth: 160, maxWidth: 160, paddingRight: 16, position: 'relative', cursor: 'default' }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute', top: 2, left: -8, right: -8, height: 10,
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)', zIndex: 1,
                  }} />
                )}
                <div style={{
                  width: isActive ? 16 : 10, height: isActive ? 16 : 10, borderRadius: '50%',
                  background: isActive ? '#fff' : 'rgba(255,255,255,0.4)', marginBottom: 20,
                  position: 'relative', zIndex: 2, transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2)' : 'none',
                  marginTop: isActive ? -3 : 0,
                }} />
                <p style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.15em',
                  color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
                  marginBottom: 8, transition: 'color 0.25s ease', fontFamily: 'monospace',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p style={{
                  fontSize: 13, fontWeight: isActive ? 700 : 500, lineHeight: 1.4,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                  transition: 'all 0.25s ease', transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                }}>
                  {event}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <div style={{ height: 1, flex: 1, maxWidth: 40, background: 'rgba(255,255,255,0.15)' }} />
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Przeciągnij albo scrolluj, człowieku
          </p>
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'rgba(255,255,255,0.25)', fontSize: 16 }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
