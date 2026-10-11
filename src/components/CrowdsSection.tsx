import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { useT } from '../lib/i18n'

// Tłumy na wydarzeniach z Edwardem: zdjęcia w public/tlumy (wybór Bartosza z 11.10.2026).
const PHOTOS: { src: string; w: number; h: number }[] = [
  { src: 'tlum-01.webp', w: 961, h: 1200 },
  { src: 'tlum-02.webp', w: 961, h: 1200 },
  { src: 'tlum-03.webp', w: 961, h: 1200 },
  { src: 'tlum-04.webp', w: 961, h: 1200 },
  { src: 'tlum-05.webp', w: 1200, h: 800 },
  { src: 'tlum-06.webp', w: 1200, h: 800 },
  { src: 'tlum-07.webp', w: 1200, h: 800 },
  { src: 'tlum-08.webp', w: 1200, h: 800 },
  { src: 'tlum-09.webp', w: 1200, h: 800 },
  { src: 'tlum-10.webp', w: 1200, h: 800 },
  { src: 'tlum-11.webp', w: 1200, h: 800 },
  { src: 'tlum-12.webp', w: 1200, h: 800 },
  { src: 'tlum-13.webp', w: 1200, h: 800 },
  { src: 'tlum-14.webp', w: 1200, h: 800 },
  { src: 'tlum-15.webp', w: 1200, h: 800 },
  { src: 'tlum-16.webp', w: 800, h: 1200 },
  { src: 'tlum-17.webp', w: 900, h: 1200 },
  { src: 'tlum-18.webp', w: 1200, h: 800 },
  { src: 'tlum-19.webp', w: 961, h: 1200 },
  { src: 'tlum-20.webp', w: 1200, h: 805 },
  { src: 'tlum-21.webp', w: 1200, h: 799 },
  { src: 'tlum-22.webp', w: 1200, h: 799 },
  { src: 'tlum-23.webp', w: 1200, h: 799 },
  { src: 'tlum-24.webp', w: 829, h: 466 },
]

export default function CrowdsSection() {
  const m = useIsMobile()
  const { locale } = useT()
  const isEn = locale === 'en'

  return (
    <section id="tlumy" style={{ position: 'relative', padding: m ? '80px 0' : '120px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: m ? 36 : 56 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            {isEn ? 'Edward live' : 'Edward na żywo'}
          </p>
          <h2 style={{ fontSize: m ? 28 : 'clamp(28px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>
            {isEn ? 'CROWDS' : 'TŁUMY'}
          </h2>
          <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', maxWidth: 640, margin: '0 auto' }}>
            {isEn
              ? 'Schools, shopping malls, embassies, picnics and sports events: wherever I show up, people gather.'
              : 'Szkoły, galerie, ambasady, pikniki i zawody sportowe: gdzie się pojawię, tam zbierają się ludzie.'}
          </p>
        </motion.div>
        <div style={{ columnCount: m ? 2 : 4, columnGap: m ? 10 : 16 }}>
          {PHOTOS.map((p, i) => (
            <motion.img
              key={p.src}
              src={`/tlumy/${p.src}`}
              width={p.w}
              height={p.h}
              loading="lazy"
              decoding="async"
              alt={isEn ? 'Crowd at an event with Edward Warchocki' : 'Tłum na wydarzeniu z Edwardem Warchockim'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min((i % 4) * 0.06, 0.2) }}
              style={{ width: '100%', height: 'auto', display: 'block', marginBottom: m ? 10 : 16, borderRadius: 14, breakInside: 'avoid' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
