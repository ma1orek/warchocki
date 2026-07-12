import { useEffect, useRef, useState, type CSSProperties } from 'react'

/* Loads/plays the video only once it scrolls near the viewport - keeps heavy
   mp4s from blocking first paint and interactivity on mobile. */
export default function LazyVideo({ src, poster, style }: { src: string; poster?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ width: '100%', ...style }}>
      {show ? (
        <video autoPlay loop muted playsInline preload="auto" poster={poster} style={{ width: '100%', height: 'auto', display: 'block' }}>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      )}
    </div>
  )
}
