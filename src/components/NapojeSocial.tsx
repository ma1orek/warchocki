import { motion, useInView } from 'framer-motion'
import { useRef, useState, type CSSProperties } from 'react'
import useIsMobile from '../hooks/useIsMobile'
import { useT } from '../lib/i18n'
import { komentarze, napojeMedia, type MediaItem } from '../lib/napojeMedia'

const edgeMask: CSSProperties = {
  WebkitMaskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
  maskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
}

function CommentRow({ items, dir, duration, cardW }: { items: string[]; dir: 'left' | 'right'; duration: number; cardW: number }) {
  const doubled = [...items, ...items]
  return (
    <div className="kom-row" style={{ overflow: 'hidden', ...edgeMask }}>
      <div className="kom-track" style={{ animation: `marquee-${dir} ${duration}s linear infinite` }}>
        {doubled.map((src, i) => (
          <div key={i} style={{ flexShrink: 0, width: cardW, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0e0e0e', boxShadow: '0 8px 20px rgba(0,0,0,0.35)' }}>
            <img src={src} alt="Komentarz" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function MediaCard({ item }: { item: MediaItem }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: 12, padding: 20,
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 14, transition: 'all 0.25s ease', transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          style={{ borderRadius: 4, flexShrink: 0, background: '#fff' }}
        />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.source}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', flexShrink: 0 }}><path d="M7 17L17 7M17 7H8M17 7V16" /></svg>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.45, color: 'rgba(255,255,255,0.85)' }}>
        {item.title}
      </p>
    </a>
  )
}

export default function NapojeSocial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const m = useIsMobile()
  const { t } = useT()
  const half = Math.ceil(komentarze.length / 2)
  const rowA = komentarze.slice(0, half)
  const rowB = komentarze.slice(half)
  const cardW = m ? 300 : 430

  return (
    <section style={{ position: 'relative', padding: m ? '60px 0' : '100px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Comments */}
      <div ref={ref} style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px', marginBottom: m ? 28 : 40 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5fc065', marginBottom: 14 }}>{t('komTag')}</p>
          <h2 style={{ fontSize: m ? 28 : 'clamp(26px, 3.5vw, 46px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 14 }}>{t('komTitle')}</h2>
          <p style={{ fontSize: m ? 14 : 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 560, margin: '0 auto' }}>{t('komDesc')}</p>
        </motion.div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <CommentRow items={rowA} dir="left" duration={m ? 38 : 55} cardW={cardW} />
        <CommentRow items={rowB} dir="right" duration={m ? 42 : 60} cardW={cardW} />
      </div>

      {/* Media */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px', marginTop: m ? 56 : 90 }}>
        <div style={{ textAlign: 'center', marginBottom: m ? 32 : 48 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>{t('napMediaTag')}</p>
          <h2 style={{ fontSize: m ? 26 : 'clamp(24px, 3.2vw, 42px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 14 }}>{t('napMediaTitle')}</h2>
          <p style={{ fontSize: m ? 14 : 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 560, margin: '0 auto' }}>{t('napMediaDesc')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {napojeMedia.map((item) => (
            <MediaCard key={item.url} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
