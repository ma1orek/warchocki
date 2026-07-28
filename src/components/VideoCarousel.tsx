import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { useT } from '../lib/i18n'

/* Karuzela filmików UGC — pionowe klipy fanów (stories/TikToki) z produktami.
   Autoplay MUTED tylko gdy kafel jest w kadrze (IntersectionObserver), tap =
   dźwięk on/off. Poziomy scroll-snap + strzałki. Lekkie (preload none). */

// 50 klipów; kolejność ręczna — najładniejsze (jasne, czytelny produkt) na przodzie.
const ORDER = [
  17, 20, 44, 15, 30, 13, 48, 27, 28, 22,
  18, 8, 2, 6, 26, 34, 19, 33, 21, 7,
  36, 46, 50, 25, 3, 12, 10, 11, 24, 40,
  4, 9, 14, 16, 23, 29, 31, 32, 35, 37,
  38, 39, 41, 42, 43, 45, 47, 49, 5, 1,
]
const VIDS = ORDER.map((n) => `/ugc-video/vid-${String(n).padStart(2, '0')}`)

function Clip({ base }: { base: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      // pauzuj wszystkie inne, żeby grał tylko jeden
      document.querySelectorAll<HTMLVideoElement>('video[data-ugc]').forEach((o) => { if (o !== v) o.pause() })
      v.muted = false
      // fallback: jeśli przeglądarka odmówi z dźwiękiem, zagraj wyciszone
      v.play().catch(() => { v.muted = true; v.play().catch(() => {}) })
    } else {
      v.pause()
    }
  }

  return (
    <div
      onClick={toggle}
      style={{ position: 'relative', cursor: 'pointer', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: '#000', boxShadow: '0 18px 44px rgba(0,0,0,0.5)' }}
    >
      <video
        ref={ref}
        data-ugc=""
        src={`${base}.mp4`}
        poster={`${base}.jpg`}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        style={{ display: 'block', width: '100%', aspectRatio: '9 / 16', objectFit: 'cover', background: '#000' }}
      />
      {/* przycisk PLAY na posterze — znika gdy gra */}
      {!playing && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent 40%)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', border: '1.5px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 24, marginLeft: 4 }}>▶</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function VideoCarousel({ heading, sub, standalone = false, items }: { heading?: string; sub?: string; standalone?: boolean; items?: string[] }) {
  const list = items ?? VIDS
  const m = useIsMobile()
  const { locale } = useT()
  const pl = locale === 'pl'
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('div')?.getBoundingClientRect().width ?? 260
    el.scrollBy({ left: dir * (card + 16) * (m ? 1 : 2), behavior: 'smooth' })
  }

  const arrow: React.CSSProperties = {
    width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 20, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
  }

  return (
    <section style={{ position: 'relative', padding: m ? '70px 0' : '110px 0', borderTop: standalone ? 'none' : '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: 30, left: -140, width: m ? 300 : 460, height: m ? 300 : 460, borderRadius: '50%', background: '#7b3fe4', filter: 'blur(150px)', opacity: 0.12, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: m ? 30 : 44 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c4b5fd', marginBottom: 14 }}>
            {pl ? 'FILMIKI OD LUDZI' : 'CLIPS FROM PEOPLE'}
          </p>
          <h2 style={{ fontSize: m ? 30 : 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            {heading ?? (pl ? 'Ludzie kręcą filmiki z produktami' : 'People film clips with the products')}
          </h2>
          <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 620, margin: '0 auto' }}>
            {sub ?? (pl
              ? 'Prawdziwe stories i TikToki fanów z lodami EDWARDZIK, musami i napojami. Kliknij, żeby włączyć dźwięk.'
              : 'Real fan stories and TikToks with EDWARDZIK ice cream, pouches and drinks. Tap for sound.')}
          </p>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex', gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory',
              paddingBottom: 6, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
            }}
            className="vc-track"
          >
            {list.map((base) => (
              <div key={base} style={{ flex: `0 0 ${m ? '76%' : '230px'}`, scrollSnapAlign: 'start' }}>
                <Clip base={base} />
              </div>
            ))}
          </div>
          <style>{`.vc-track::-webkit-scrollbar{display:none}`}</style>

          {!m && (
            <>
              <button aria-label="Poprzedni" onClick={() => scrollBy(-1)} style={{ ...arrow, position: 'absolute', left: -22, top: '50%', transform: 'translateY(-50%)', zIndex: 3 }}>‹</button>
              <button aria-label="Następny" onClick={() => scrollBy(1)} style={{ ...arrow, position: 'absolute', right: -22, top: '50%', transform: 'translateY(-50%)', zIndex: 3 }}>›</button>
            </>
          )}
        </div>

        {m && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 16 }}>
            <button aria-label="Poprzedni" onClick={() => scrollBy(-1)} style={arrow}>‹</button>
            <button aria-label="Następny" onClick={() => scrollBy(1)} style={arrow}>›</button>
          </div>
        )}

        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', textAlign: 'center', marginTop: 22 }}>
          {pl ? 'Filmiki opublikowane przez fanów, oznaczające @edwardwarchocki.' : 'Clips published by fans, tagging @edwardwarchocki.'}
        </p>
      </div>
    </section>
  )
}
