import { useEffect, useRef, useState, type CSSProperties } from 'react'

// Osadzony film (TikTok, Facebook) ładuje się dopiero, gdy jego miejsce jest na ekranie (21.11.2026): przy otwarciu strony
// nie ma ciasteczek stron trzecich ani ciężkich skryptów odtwarzaczy (Lighthouse: dobre praktyki, wydajność).
// Bez JavaScriptu (statyczne wersje językowe z prerenderu) zostaje link do filmu z tym samym tytułem.
type Props = { src: string; href?: string; title: string; allow?: string; allowFullScreen?: boolean; style?: CSSProperties }

export default function LazyIframe({ src, href, title, allow, allowFullScreen, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setOn(true); return }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setOn(true); io.disconnect() }
    }, { rootMargin: '0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  if (on) return <iframe src={src} title={title} allow={allow} allowFullScreen={allowFullScreen} scrolling="no" style={style} />
  return (
    <div ref={ref} style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <a href={href || src} target="_blank" rel="noopener" style={{ color: '#fff', fontSize: 15, fontWeight: 700, textDecoration: 'underline', padding: 16, textAlign: 'center' }}>
        <span aria-hidden="true">▶ </span>{title}
      </a>
    </div>
  )
}
