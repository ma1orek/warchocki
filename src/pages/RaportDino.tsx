import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DinoLogo from '../components/DinoLogo'
import LazyVideo from '../components/LazyVideo'
import NapojeSocial from '../components/NapojeSocial'
import useIsMobile from '../hooks/useIsMobile'
import { napojeMedia, ugcScreens } from '../lib/napojeMedia'

const fmt = (n: number) => n.toLocaleString('pl-PL')

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

// Cross-platform totals (TikTok + Instagram + YouTube + X + Facebook), first two weeks
const films = [
  { title: 'kto pił', src: '/dino-promo-1.mp4', poster: '/dino-promo-1.jpg', views: 2270000, likes: '77,8 tys.' },
  { title: 'Moje napoje od dzisiaj w Dino', src: '/dino-promo-2.mp4', poster: '/dino-promo-2.jpg', views: 1830000, likes: '64 tys.' },
  { title: 'barca czy real?', src: '/dino-promo-3.mp4', poster: '/dino-promo-3.jpg', views: 660000, likes: '21,2 tys.' },
]

export default function RaportDino() {
  const m = useIsMobile()
  const PLATFORMS = ['TikTok', 'Instagram', 'YouTube', 'X', 'Facebook']
  const ugcHalf = Math.ceil(ugcScreens.length / 2)
  const ugcA = ugcScreens.slice(0, ugcHalf)
  const ugcB = ugcScreens.slice(ugcHalf)

  const Stat = ({ big, label, sub, accent }: { big: string; label: string; sub?: string; accent?: boolean }) => (
    <div style={{ flex: '1 1 170px', padding: m ? '20px 16px' : '28px 24px', borderRadius: 16, background: accent ? 'linear-gradient(150deg, rgba(52,169,58,0.16), rgba(255,255,255,0.02))' : 'rgba(255,255,255,0.03)', border: `1px solid ${accent ? 'rgba(95,192,101,0.35)' : 'rgba(255,255,255,0.08)'}` }}>
      <div style={{ fontSize: m ? 30 : 42, fontWeight: 800, letterSpacing: '-0.03em', color: accent ? '#7dd17f' : '#fff', lineHeight: 1 }}>{big}</div>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginTop: 10 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{sub}</div>}
    </div>
  )

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <Navbar />
      <div aria-hidden style={{ position: 'absolute', top: -180, right: -160, width: m ? 320 : 560, height: m ? 320 : 560, borderRadius: '50%', background: '#34a93a', filter: 'blur(150px)', opacity: 0.16, pointerEvents: 'none' }} />

      {/* HERO */}
      <section style={{ position: 'relative', padding: m ? '110px 0 50px' : '150px 0 70px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7dd17f', border: '1px solid rgba(95,192,101,0.4)', borderRadius: 30, padding: '8px 16px' }}>
              Pierwsze dwa tygodnie kampanii
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', borderRadius: 8, padding: '6px 12px' }}><DinoLogo height={20} /></span>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} style={{ fontSize: m ? 34 : 'clamp(40px, 6vw, 76px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02, marginBottom: 20 }}>
            EDWARD WARCHOCKI<br /><span style={{ color: '#7dd17f' }}>×</span> DINO
          </motion.h1>
          <motion.p {...fadeUp(0.16)} style={{ fontSize: m ? 16 : 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', maxWidth: 660, marginBottom: 40 }}>
            Pierwszy w Polsce robot-influencer i jego napoje bez dodatku cukru - dostępne w całej sieci DINO.
            Tak wyglądają liczby <strong style={{ color: '#fff' }}>już po pierwszych dwóch tygodniach</strong>. A to dopiero początek.
          </motion.p>

          <motion.div {...fadeUp(0.24)} style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Stat big="10 mln+" label="Wyświetleń kampanii" sub="filmy + reposty, 5 platform" accent />
            <Stat big="5 mln+" label="Zasięg postów własnych" sub="o napojach i DINO" accent />
            <Stat big="5 mln+" label="Zasięg UGC + media" sub="setki filmów od fanów" accent />
            <Stat big="163 tys.+" label="Polubienia" sub="łącznie pod filmami" />
          </motion.div>
        </div>
      </section>

      {/* FILMS — "to dopiero początek" */}
      <section style={{ position: 'relative', padding: m ? '40px 0' : '60px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: m ? 28 : 44 }}>
            <h2 style={{ fontSize: m ? 28 : 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>A to dopiero początek</h2>
            <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', maxWidth: 640 }}>
              Kilka filmów, a takie liczby. Łącznie <strong style={{ color: '#7dd17f' }}>ponad 10 mln</strong> wyświetleń w pierwsze dwa tygodnie. Najlepsze wciąż przed nami.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {films.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.1)} style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ position: 'relative', background: '#000' }}>
                  <LazyVideo src={f.src} poster={f.poster} style={{ maxWidth: m ? 320 : '100%', margin: '0 auto' }} />
                </div>
                <div style={{ padding: 18 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>„{f.title}"</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    <Chip icon="▶" val={fmt(f.views)} label="wyświetleń" />
                    <Chip icon="❤" val={f.likes} label="polubień" />
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                    {PLATFORMS.map((p) => <Tag key={p}>{p}</Tag>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FALA UGC — main stats */}
      <section style={{ position: 'relative', padding: m ? '40px 0' : '70px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Fala UGC</p>
            <h2 style={{ fontSize: m ? 24 : 'clamp(24px, 3.2vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 18, maxWidth: 820 }}>
              Setki filmików tworzonych przez fanów z napojami Edwarda Warchockiego
            </h2>
            <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: 720 }}>
              Klienci i fani sami nagrywają napoje Edwarda - przy półce w sklepie, taniec przed Dino, wspólne zdjęcia -
              bardzo często <strong style={{ color: '#fff' }}>z oznaczeniami DINO</strong>. Każdy taki klip to darmowa reklama marki
              trafiająca do tysięcy ludzi. Poniżej realne komentarze i pełna lista mediów, które napisały o napojach.
            </p>
          </motion.div>
        </div>

        {/* UGC wall — real posts from people */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: m ? 24 : 32 }}>
          <UgcRow items={ugcA} dir="left" duration={m ? 42 : 62} h={m ? 150 : 210} />
          <UgcRow items={ugcB} dir="right" duration={m ? 46 : 68} h={m ? 150 : 210} />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          {/* estimate block */}
          <motion.div {...fadeUp(0.1)} style={{ marginTop: 28, padding: m ? 22 : 30, borderRadius: 16, background: 'linear-gradient(150deg, rgba(52,169,58,0.14), rgba(255,255,255,0.02))', border: '1px solid rgba(95,192,101,0.3)' }}>
            <h3 style={{ fontSize: m ? 19 : 24, fontWeight: 800, marginBottom: 12 }}>Łączny zasięg UGC + media: <span style={{ color: '#7dd17f' }}>5 mln+</span></h3>
            <p style={{ fontSize: m ? 14 : 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
              To nie są pojedyncze nagrania - to <strong style={{ color: '#fff' }}>setki filmów</strong> nakręconych przez klientów i fanów,
              żyjących równolegle na TikToku, Instagramie, YouTubie, X i Facebooku. Każdy z marką DINO w tle, każdy za darmo. I to wszystko w dwa tygodnie.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {PLATFORMS.map((p) => (
                <span key={p} style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 22, padding: '7px 14px' }}>{p}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comments + media (reused) */}
      <NapojeSocial />

      {/* SUMMARY */}
      <section style={{ position: 'relative', padding: m ? '50px 0 70px' : '80px 0 110px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ borderRadius: 22, padding: m ? 28 : 48, background: 'linear-gradient(150deg, rgba(52,169,58,0.18), rgba(255,255,255,0.03))', border: '1px solid rgba(95,192,101,0.3)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', borderRadius: 30, padding: '8px 16px', marginBottom: 20 }}><DinoLogo height={24} /></span>
            <h2 style={{ fontSize: m ? 24 : 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 18 }}>
              Napój, który sam się reklamuje
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
              {[
                '10 mln+ wyświetleń kampanii w pierwsze dwa tygodnie',
                'Kilka milionów zasięgu UGC - setki filmów od fanów na 5 platformach',
                `${napojeMedia.length}+ publikacji w mediach o napojach (od Press.pl po Wiadomości Handlowe)`,
                'Realne reakcje: „polecam, bo próbowałem", „będę kupował w najbliższym Dino"',
                'Organiczny, darmowy UGC z marką DINO w tle - bez kosztów mediowych',
                'A to dopiero początek - kampania właśnie się rozkręca',
              ].map((line) => (
                <li key={line} style={{ display: 'flex', gap: 12, fontSize: m ? 14 : 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
                  <span style={{ color: '#7dd17f', flexShrink: 0, fontWeight: 800 }}>✓</span>{line}
                </li>
              ))}
            </ul>
            <a href="https://contactform.bitrix24.site/EdwardBiznes/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 26px', borderRadius: 12, background: '#fff', color: '#000', fontSize: 14, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Porozmawiajmy o współpracy
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </motion.div>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 24, lineHeight: 1.6 }}>
            Dane wyświetleń i polubień zliczone z kanałów Edwarda (TikTok, Instagram, YouTube, X, Facebook) za pierwsze dwa tygodnie kampanii (czerwiec 2026).
            Zasięg UGC szacowany na podstawie wolumenu filmów publikowanych przez klientów i fanów.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Chip({ icon, val, label }: { icon: string; val: string; label: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '7px 12px' }}>
      <span style={{ fontSize: 12 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{val}</span>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{label}</span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 6, padding: '3px 7px' }}>{children}</span>
}

function UgcRow({ items, dir, duration, h }: { items: string[]; dir: 'left' | 'right'; duration: number; h: number }) {
  const doubled = [...items, ...items]
  return (
    <div className="kom-row" style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)', maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)' }}>
      <div className="kom-track" style={{ animation: `marquee-${dir} ${duration}s linear infinite` }}>
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="UGC z napojem Edwarda Warchockiego" loading="lazy" decoding="async" style={{ height: h, width: 'auto', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0, display: 'block', objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  )
}
