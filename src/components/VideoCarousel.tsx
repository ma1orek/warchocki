import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { useT } from '../lib/i18n'

/* Karuzela filmików UGC — pionowe klipy fanów (stories/TikToki) z produktami.
   Autoplay MUTED tylko gdy kafel jest w kadrze (IntersectionObserver), tap =
   dźwięk on/off. Poziomy scroll-snap + strzałki. Lekkie (preload none). */

const VIDS = Array.from({ length: 20 }, (_, i) => `/ugc-video/vid-${String(i + 1).padStart(2, '0')}`)

function Clip({ base }: { base: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { v.play().catch(() => {}) } else { v.pause() }
      },
      { threshold: 0.6 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <div
      onClick={() => { const v = ref.current; if (!v) return; v.muted = !v.muted; setMuted(v.muted); if (v.paused) v.play().catch(() => {}) }}
      style={{ position: 'relative', cursor: 'pointer', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: '#000', boxShadow: '0 18px 44px rgba(0,0,0,0.5)' }}
    >
      <video
        ref={ref}
        src={`${base}.mp4`}
        poster={`${base}.jpg`}
        muted
        loop
        playsInline
        preload="none"
        style={{ display: 'block', width: '100%', aspectRatio: '9 / 16', objectFit: 'cover', background: '#000' }}
      />
      {/* wskaźnik dźwięku */}
      <div style={{ position: 'absolute', bottom: 10, right: 10, width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15, pointerEvents: 'none' }}>
        {muted ? '🔇' : '🔊'}
      </div>
    </div>
  )
}

export default function VideoCarousel({ heading, sub, standalone = false }: { heading?: string; sub?: string; standalone?: boolean }) {
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
            {VIDS.map((base) => (
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
