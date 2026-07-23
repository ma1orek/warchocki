import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DinoLogo from '../components/DinoLogo'
import LazyVideo from '../components/LazyVideo'
import NapojeSocial from '../components/NapojeSocial'
import Produkty from '../components/Produkty'
import useIsMobile from '../hooks/useIsMobile'
import { ugcScreens } from '../lib/napojeMedia'

const fmt = (n: number) => n.toLocaleString('pl-PL')

// 229 stories z Instagrama (1.06 - 13.07) zebrane przez usera - miniatury
// wygenerowane ffmpegiem do public/ugc-stories (story-1.jpg ... story-229.jpg).
const STORIES_COUNT = 229
const igStories = Array.from({ length: STORIES_COUNT }, (_, i) => `/ugc-stories/story-${i + 1}.jpg`)

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

// Filmy kampanii. src = lokalny mp4; tiktokId = embed prosto z TikToka.
// Liczby = wyświetlenia cross-platform (TikTok + IG + YT + X + FB).
type Film = { title: string; views: number; src?: string; poster?: string; tiktokId?: string }
const films: Film[] = [
  { title: 'spotkałem Dych Dzikiego pod sklepem', tiktokId: '7659131036550335777', views: 1290000 },
  { title: 'Ten to jest Dych Dziki', tiktokId: '7655438274923711777', views: 500000 },
  { title: 'Autopromocja z Dych Dzikim', tiktokId: '7655432061007744288', views: 2470000 },
  { title: 'kto pił', src: '/dino-promo-1.mp4', poster: '/dino-promo-1.jpg', views: 2950000 },
  { title: 'Moje napoje od dzisiaj w Dino', src: '/dino-promo-2.mp4', poster: '/dino-promo-2.jpg', views: 2380000 },
  { title: 'barca czy real?', src: '/dino-promo-3.mp4', poster: '/dino-promo-3.jpg', views: 860000 },
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
              Raport kampanii - od czerwca 2026
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', borderRadius: 8, padding: '6px 12px' }}><DinoLogo height={20} /></span>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} style={{ fontSize: m ? 34 : 'clamp(40px, 6vw, 76px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02, marginBottom: 20 }}>
            EDWARD WARCHOCKI<br /><span style={{ color: '#7dd17f' }}>×</span> DINO
          </motion.h1>
          <motion.p {...fadeUp(0.16)} style={{ fontSize: m ? 16 : 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', maxWidth: 660, marginBottom: 40 }}>
            Pierwszy w Polsce robot-influencer i jego produkty bez dodatku cukru. Kampania wystartowała w DINO,
            a napoje są już także w sieciach <strong style={{ color: '#fff' }}>Kaufland, Auchan i SPAR</strong> - do tego <strong style={{ color: '#7dd17f' }}>NOWOŚĆ: musy owocowe</strong>, dostępne w Dino. A to dopiero początek.
          </motion.p>

          <motion.div {...fadeUp(0.24)} style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Stat big="20 mln+" label="Wyświetleń kampanii" sub="filmy + reposty, 5 platform" accent />
            <Stat big="10 mln+" label="Zasięg postów własnych" sub="o napojach i DINO" accent />
            <Stat big="Dziesiątki mln" label="Zasięg UGC + media" sub="tysiące filmów od fanów" accent />
          </motion.div>
        </div>
      </section>

      {/* FILMS - "to dopiero początek" */}
      <section style={{ position: 'relative', padding: m ? '40px 0' : '60px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: m ? 28 : 44 }}>
            <h2 style={{ fontSize: m ? 28 : 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>A to dopiero początek</h2>
            <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', maxWidth: 640 }}>
              Kilka filmów, a takie liczby. Łącznie <strong style={{ color: '#7dd17f' }}>ponad 20 mln</strong> wyświetleń - a licznik dalej bije. Najlepsze wciąż przed nami.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {films.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.1)} style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
                  {f.tiktokId ? (
                    <iframe
                      src={`https://www.tiktok.com/embed/v2/${f.tiktokId}`}
                      title={f.title}
                      allow="encrypted-media; fullscreen"
                      loading="lazy"
                      scrolling="no"
                      style={{ display: 'block', width: '100%', aspectRatio: '9 / 16', maxWidth: m ? 320 : '100%', margin: '0 auto', border: 'none', background: '#000', overflow: 'hidden' }}
                    />
                  ) : (
                    <LazyVideo src={f.src!} poster={f.poster} style={{ maxWidth: m ? 320 : '100%', margin: '0 auto' }} />
                  )}
                </div>
                <div style={{ padding: 18 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>„{f.title}"</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    <Chip icon="▶" val={fmt(f.views) + '+'} label="wyświetleń" />
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

      {/* MUSY - filmiki premierowe (NOWOŚĆ w Dino) */}
      <section style={{ position: 'relative', padding: m ? '46px 0' : '70px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div aria-hidden style={{ position: 'absolute', top: 20, left: -140, width: m ? 300 : 460, height: m ? 300 : 460, borderRadius: '50%', background: '#ff9f43', filter: 'blur(150px)', opacity: 0.12, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: m ? 26 : 40 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ffb066' }}>NOWOŚĆ · MUSY OWOCOWE</span>
            <h2 style={{ fontSize: m ? 28 : 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px 0 14px' }}>Musy wjechały do Dino</h2>
            <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', maxWidth: 640 }}>
              100% owoców, bez dodatku cukru - dwa smaki na start. Zobacz premierowe filmiki z musami na wszystkich platformach Edka.
            </p>
          </motion.div>

          {/* wizualizacje musów - dwa smaki */}
          <motion.div {...fadeUp(0.08)} style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : '1fr 1fr', gap: m ? 12 : 20, marginBottom: m ? 24 : 34 }}>
            {[
              { img: '/mus-gruszka-main.jpg', label: 'Jabłko · gruszka · banan' },
              { img: '/mus-brzoskwinia-main.jpg', label: 'Jabłko · brzoskwinia · banan' },
            ].map((p) => (
              <div key={p.img} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={p.img} alt={p.label} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: m ? '20px 12px 10px' : '30px 16px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)', fontSize: m ? 11 : 13, fontWeight: 700, color: '#fff' }}>
                  {p.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* SLIDER filmików musów - wszystkie platformy */}
          <motion.div {...fadeUp(0.14)}>
            <MusVideoSlider m={m} />
          </motion.div>
        </div>
      </section>

      {/* FALA UGC - main stats */}
      <section style={{ position: 'relative', padding: m ? '40px 0' : '70px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Fala UGC</p>
            <h2 style={{ fontSize: m ? 24 : 'clamp(24px, 3.2vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 18, maxWidth: 820 }}>
              Tysiące filmików tworzonych przez fanów z napojami Edwarda Warchockiego
            </h2>
            <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: 720 }}>
              Klienci i fani sami nagrywają napoje Edwarda - przy półce w sklepie, taniec przed Dino, wspólne zdjęcia -
              bardzo często <strong style={{ color: '#fff' }}>z oznaczeniami DINO</strong>. Każdy taki klip to darmowa reklama marki
              trafiająca do tysięcy ludzi. Poniżej realne komentarze i pełna lista mediów, które napisały o napojach.
            </p>
          </motion.div>
        </div>

        {/* IG STORIES (pojedyncze slajdy) - 3 rzedy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <UgcRow items={igStories.slice(0, 77)} dir="left" duration={m ? 120 : 170} h={m ? 130 : 180} />
          <UgcRow items={igStories.slice(77, 154)} dir="right" duration={m ? 130 : 185} h={m ? 130 : 180} />
          <UgcRow items={igStories.slice(154)} dir="left" duration={m ? 125 : 178} h={m ? 130 : 180} />
        </div>

        {/* UGC wall (grupowe posty) - PONIZEJ stories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: m ? 24 : 32 }}>
          <UgcRow items={ugcA} dir="left" duration={m ? 42 : 62} h={m ? 150 : 210} />
          <UgcRow items={ugcB} dir="right" duration={m ? 46 : 68} h={m ? 150 : 210} />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          {/* estimate block */}
          <motion.div {...fadeUp(0.1)} style={{ marginTop: 28, padding: m ? 22 : 30, borderRadius: 16, background: 'linear-gradient(150deg, rgba(52,169,58,0.14), rgba(255,255,255,0.02))', border: '1px solid rgba(95,192,101,0.3)' }}>
            <h3 style={{ fontSize: m ? 19 : 24, fontWeight: 800, marginBottom: 12 }}>Łączny zasięg UGC + media: <span style={{ color: '#7dd17f' }}>dziesiątki milionów</span></h3>
            <p style={{ fontSize: m ? 14 : 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
              To nie są pojedyncze nagrania - to <strong style={{ color: '#fff' }}>setki filmów</strong> nakręconych przez klientów i fanów
              oraz <strong style={{ color: '#fff' }}>tysiące stories na Instagramie</strong>, żyjących równolegle na TikToku, Instagramie,
              YouTubie, X i Facebooku. Każdy z marką DINO w tle, każdy za darmo. A licznik dalej bije.
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

      {/* PRODUKTY - PRODUKTY EDKA (napoje + musy) */}
      <Produkty />

      {/* CTA + note */}
      <section style={{ position: 'relative', padding: m ? '20px 0 70px' : '40px 0 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', textAlign: 'center' }}>
          <a href="https://contactform.bitrix24.site/EdwardBiznes/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 28px', borderRadius: 12, background: '#fff', color: '#000', fontSize: 14, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Porozmawiajmy o współpracy
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '22px auto 0', lineHeight: 1.6, maxWidth: 760 }}>
            Dane wyświetleń zliczone z kanałów Edwarda (TikTok, Instagram, YouTube, X, Facebook) od startu kampanii (czerwiec 2026).
            Zasięg UGC szacowany na podstawie wolumenu filmów publikowanych przez klientów i fanów. Napoje dostępne w sieciach DINO, Kaufland, Auchan, SPAR i POLOmarket; musy owocowe - w sieci Dino.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Filmiki musów — jeden na raz (9:16), strzałki + kropki, auto co 7s.
// Embed dla platform które da się osadzić (TikTok/Instagram/YouTube/Facebook);
// X bez pewnego iframe → slajd-link. Wszystkie mają też przycisk „otwórz".
type MusVid = { platform: string; accent: string; embed?: string; link: string }
const MUS_VIDS: MusVid[] = [
  { platform: 'TikTok', accent: '#ff0050', embed: 'https://www.tiktok.com/embed/v2/7663466557502229792', link: 'https://www.tiktok.com/@edwardwarchocki/video/7663466557502229792' },
  { platform: 'Instagram', accent: '#e1306c', embed: 'https://www.instagram.com/p/Da5MGXuIOon/embed', link: 'https://www.instagram.com/p/Da5MGXuIOon/' },
  { platform: 'YouTube Shorts', accent: '#ff0000', embed: 'https://www.youtube.com/embed/BNoZsxeYy1E', link: 'https://www.youtube.com/shorts/BNoZsxeYy1E' },
  { platform: 'Facebook · rolka', accent: '#1877f2', embed: 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent('https://www.facebook.com/reel/27381042821578677/') + '&show_text=false&width=340&height=600', link: 'https://www.facebook.com/reel/27381042821578677/' },
  { platform: 'Facebook · film', accent: '#1877f2', embed: 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent('https://www.facebook.com/edwardwarchocki/videos/1004448792412185') + '&show_text=false&width=340&height=600', link: 'https://www.facebook.com/edwardwarchocki/videos/1004448792412185' },
  { platform: 'X', accent: '#ffffff', link: 'https://x.com/edwardwarchocki/status/2078092317425107247' },
]

function MusVideoSlider({ m }: { m: boolean }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const n = MUS_VIDS.length
  const go = (x: number) => { const nx = ((x % n) + n) % n; setDir(nx > i || (i === n - 1 && nx === 0) ? 1 : -1); setI(nx) }
  useEffect(() => { const iv = setInterval(() => go(i + 1), 7000); return () => clearInterval(iv) /* eslint-disable-next-line */ }, [i])
  const v = MUS_VIDS[i]

  const arrow: React.CSSProperties = {
    width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 19, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: m ? 8 : 18 }}>
        {!m && <button aria-label="Poprzedni" onClick={() => go(i - 1)} style={arrow}>‹</button>}
        <div style={{ position: 'relative', width: '100%', maxWidth: 340, aspectRatio: '9 / 16', borderRadius: 18, overflow: 'hidden', border: `1px solid ${v.accent}55`, background: '#000', boxShadow: `0 26px 60px rgba(0,0,0,0.55)` }}>
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={v.platform}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dir * 40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {/* etykieta platformy */}
              <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 11px', borderRadius: 20, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', color: '#fff', pointerEvents: 'none' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: v.accent }} /> {v.platform}
              </div>

              {v.embed ? (
                <iframe
                  src={v.embed}
                  title={`Musy Edwarda — ${v.platform}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  loading="lazy"
                  scrolling="no"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', background: '#000' }}
                />
              ) : (
                <a href={v.link} target="_blank" rel="noopener noreferrer"
                  style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textDecoration: 'none', background: `radial-gradient(120% 120% at 50% 0%, ${v.accent}33, rgba(0,0,0,0.9) 60%)` }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', border: `2px solid ${v.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 26 }}>▶</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Zobacz na {v.platform}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: v.accent }}>Otwórz ↗</div>
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {!m && <button aria-label="Następny" onClick={() => go(i + 1)} style={arrow}>›</button>}
      </div>

      {/* kropki + (mobile) strzałki + przycisk otwórz w platformie */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {m && <button aria-label="Poprzedni" onClick={() => go(i - 1)} style={arrow}>‹</button>}
          <div style={{ display: 'flex', gap: 7 }}>
            {MUS_VIDS.map((sv, k) => (
              <button key={sv.platform} aria-label={sv.platform} onClick={() => go(k)}
                style={{ width: k === i ? 22 : 7, height: 7, borderRadius: 8, border: 'none', cursor: 'pointer', background: k === i ? sv.accent : 'rgba(255,255,255,0.25)', transition: 'all 0.3s ease', padding: 0 }} />
            ))}
          </div>
          {m && <button aria-label="Następny" onClick={() => go(i + 1)} style={arrow}>›</button>}
        </div>
        <a href={v.link} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 40, border: `1px solid ${v.accent}66`, color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.03em' }}>
          Otwórz na {v.platform} <span style={{ opacity: 0.65 }}>↗</span>
        </a>
      </div>
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
          <img key={i} src={src} alt="" loading="lazy" decoding="async" style={{ height: h, width: 'auto', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0, display: 'block', objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  )
}
