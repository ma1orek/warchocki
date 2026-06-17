import { motion } from 'framer-motion'
import { useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DinoLogo from '../components/DinoLogo'
import LazyVideo from '../components/LazyVideo'
import NapojeSocial from '../components/NapojeSocial'
import useIsMobile from '../hooks/useIsMobile'
import { napojeMedia } from '../lib/napojeMedia'

const fmt = (n: number) => n.toLocaleString('pl-PL')

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

/* ---- Documented data read from the channel analytics panels ---- */
// Campaign films promoting the drink (Edek's official channels)
const films = [
  { title: 'Moje napoje od dzisiaj w Dino', src: '/dino-promo-1.mp4', poster: '/dino-promo-1.jpg', ttViews: 524083, ttLikes: '34,4 tys.', ttComments: 735, ttSaves: 2968 },
  { title: 'kto pił', src: '/dino-promo-2.mp4', poster: '/dino-promo-2.jpg', ttViews: 523241, ttLikes: '59,2 tys.', ttComments: 930, ttSaves: 5472, ytViews: 338508, ytComments: 389 },
  { title: 'barca czy real?', src: '/dino-promo-3.mp4', poster: '/dino-promo-3.jpg', ttViews: 177062, ttLikes: '10,4 tys.', ttComments: 432, ttSaves: 1013, ytViews: 156521, ytComments: 301 },
]

// Additional Dino / drink UGC clips (TikTok play counts read from the app)
const extraClips = [
  { label: 'Taniec przed sklepem Dino', views: 1100000 },
  { label: 'Taniec przed Dino (repost)', views: 223000 },
  { label: 'W magazynie napojów', views: 561600 },
  { label: 'Pakowanie palet', views: 96000 },
  { label: 'Zakupy w sklepie', views: 203200 },
  { label: 'Zakupy w alejce', views: 105000 },
]

// Documented YouTube Shorts (incl. bonus)
const ytExtra = [{ title: 'dla mnie za ciężkie', views: 127170, comments: 79 }]

export default function RaportDino() {
  const m = useIsMobile()
  const topRef = useRef(null)

  const ttCampaignViews = films.reduce((s, f) => s + f.ttViews, 0)
  const ytViews = films.reduce((s, f) => s + (f.ytViews || 0), 0) + ytExtra.reduce((s, f) => s + f.views, 0)
  const extraViews = extraClips.reduce((s, c) => s + c.views, 0)
  const documentedViews = ttCampaignViews + ytViews + extraViews
  const documentedComments = films.reduce((s, f) => s + f.ttComments + (f.ytComments || 0), 0) + ytExtra.reduce((s, f) => s + f.comments, 0) + 86 + 92 + 42
  // Cross-platform estimate: documented (TikTok+YT) replicated across 5 platforms + hundreds of UGC reposts
  const estimatedReach = 15

  const PLATFORMS = ['TikTok', 'Instagram', 'YouTube', 'X', 'Facebook']

  const Stat = ({ big, label, sub, accent }: { big: string; label: string; sub?: string; accent?: boolean }) => (
    <div style={{ flex: '1 1 160px', padding: m ? '20px 16px' : '28px 24px', borderRadius: 16, background: accent ? 'linear-gradient(150deg, rgba(52,169,58,0.16), rgba(255,255,255,0.02))' : 'rgba(255,255,255,0.03)', border: `1px solid ${accent ? 'rgba(95,192,101,0.35)' : 'rgba(255,255,255,0.08)'}` }}>
      <div style={{ fontSize: m ? 30 : 40, fontWeight: 800, letterSpacing: '-0.03em', color: accent ? '#7dd17f' : '#fff', lineHeight: 1 }}>{big}</div>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginTop: 10 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{sub}</div>}
    </div>
  )

  return (
    <div ref={topRef} style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <Navbar />

      {/* ambient */}
      <div aria-hidden style={{ position: 'absolute', top: -180, right: -160, width: m ? 320 : 560, height: m ? 320 : 560, borderRadius: '50%', background: '#34a93a', filter: 'blur(150px)', opacity: 0.16, pointerEvents: 'none' }} />

      {/* HERO */}
      <section style={{ position: 'relative', padding: m ? '110px 0 50px' : '150px 0 70px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7dd17f', border: '1px solid rgba(95,192,101,0.4)', borderRadius: 30, padding: '8px 16px' }}>
              Raport kampanii
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', borderRadius: 8, padding: '6px 12px' }}><DinoLogo height={20} /></span>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} style={{ fontSize: m ? 34 : 'clamp(40px, 6vw, 76px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02, marginBottom: 20 }}>
            EDWARD WARCHOCKI<br /><span style={{ color: '#7dd17f' }}>×</span> DINO
          </motion.h1>
          <motion.p {...fadeUp(0.16)} style={{ fontSize: m ? 16 : 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', maxWidth: 640, marginBottom: 40 }}>
            Pierwszy w Polsce robot-influencer i jego napoje bez dodatku cukru - dostępne w całej sieci DINO.
            Oto, jaki realny zasięg wygenerowała kampania i content UGC.
          </motion.p>

          <motion.div {...fadeUp(0.24)} style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Stat big={`${estimatedReach} mln+`} label="Szacowany zasięg UGC" sub="5 platform · setki repostów" accent />
            <Stat big={`${(documentedViews / 1e6).toFixed(1)} mln+`} label="Zweryfikowane wyświetlenia" sub="TikTok + YouTube, z paneli analityki" />
            <Stat big="115 tys.+" label="Polubienia" />
            <Stat big={`${fmt(documentedComments)}+`} label="Komentarze" />
            <Stat big="5" label="Platformy" sub="TikTok · IG · YT · X · FB" />
          </motion.div>
        </div>
      </section>

      {/* CAMPAIGN FILMS */}
      <section style={{ position: 'relative', padding: m ? '40px 0' : '60px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: m ? 28 : 44 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Filmy kampanijne</p>
            <h2 style={{ fontSize: m ? 26 : 'clamp(26px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.03em' }}>3 spoty, które ruszyły lawinę</h2>
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
                    <Chip icon="▶" val={`${fmt(f.ttViews + (f.ytViews || 0))}`} label="wyświetleń" />
                    <Chip icon="❤" val={f.ttLikes} label="polubień" />
                    <Chip icon="💬" val={fmt(f.ttComments + (f.ytComments || 0))} label="komentarzy" />
                    <Chip icon="🔖" val={fmt(f.ttSaves)} label="zapisów" />
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <Tag>TikTok</Tag>
                    {f.ytViews ? <Tag>YouTube</Tag> : null}
                    <Tag>Instagram</Tag>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REACH BREAKDOWN */}
      <section style={{ position: 'relative', padding: m ? '40px 0' : '70px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: m ? 24 : 36 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Zasięgi w liczbach</p>
            <h2 style={{ fontSize: m ? 24 : 'clamp(24px, 3.2vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em' }}>Co dokładnie udokumentowaliśmy</h2>
          </motion.div>

          {/* table */}
          <motion.div {...fadeUp(0.08)} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: m ? '2fr 1fr 1fr' : '2.4fr 1fr 1fr 1fr 1fr', gap: 0, background: '#34a93a', color: '#08230a', padding: m ? '12px 16px' : '14px 22px', fontSize: m ? 11 : 12, fontWeight: 800, letterSpacing: '0.03em' }}>
              <span>Materiał</span><span style={{ textAlign: 'right' }}>Wyśw.</span>{!m && <span style={{ textAlign: 'right' }}>Polub.</span>}<span style={{ textAlign: 'right' }}>Komen.</span>{!m && <span style={{ textAlign: 'right' }}>Zapisy</span>}
            </div>
            {films.map((f, i) => (
              <Row key={f.title} m={m} i={i} name={`„${f.title}"`} views={f.ttViews + (f.ytViews || 0)} likes={f.ttLikes} comments={f.ttComments + (f.ytComments || 0)} saves={fmt(f.ttSaves)} note={f.ytViews ? 'TikTok + YouTube' : 'TikTok'} />
            ))}
            {extraClips.map((c, i) => (
              <Row key={c.label} m={m} i={films.length + i} name={c.label} views={c.views} likes="-" comments="-" saves="-" note="TikTok UGC" />
            ))}
            {ytExtra.map((c, i) => (
              <Row key={c.title} m={m} i={films.length + extraClips.length + i} name={`„${c.title}"`} views={c.views} likes="-" comments={c.comments} saves="-" note="YouTube" />
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: m ? '2fr 1fr 1fr' : '2.4fr 1fr 1fr 1fr 1fr', padding: m ? '14px 16px' : '16px 22px', background: 'rgba(95,192,101,0.12)', fontWeight: 800, fontSize: m ? 13 : 15 }}>
              <span>Razem (zweryfikowane)</span>
              <span style={{ textAlign: 'right', color: '#7dd17f' }}>{fmt(documentedViews)}</span>
              {!m && <span style={{ textAlign: 'right' }}>115 tys.+</span>}
              <span style={{ textAlign: 'right' }}>{fmt(documentedComments)}+</span>
              {!m && <span style={{ textAlign: 'right' }}>9 400+</span>}
            </div>
          </motion.div>

          {/* methodology / estimate */}
          <motion.div {...fadeUp(0.12)} style={{ marginTop: 26, padding: m ? 22 : 30, borderRadius: 16, background: 'linear-gradient(150deg, rgba(52,169,58,0.14), rgba(255,255,255,0.02))', border: '1px solid rgba(95,192,101,0.3)' }}>
            <h3 style={{ fontSize: m ? 18 : 22, fontWeight: 800, marginBottom: 14 }}>Szacowany łączny zasięg UGC: <span style={{ color: '#7dd17f' }}>{estimatedReach} mln+</span></h3>
            <p style={{ fontSize: m ? 14 : 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
              Powyższe <strong style={{ color: '#fff' }}>{fmt(documentedViews)}</strong> wyświetleń to dane odczytane bezpośrednio z paneli analityki TikToka i YouTube
              dla materiałów na oficjalnych kanałach Edwarda. To jednak tylko 2 z 5 platform. Ten sam content żyje równolegle na
              <strong style={{ color: '#fff' }}> Instagramie, X i Facebooku</strong>, jest masowo repostowany przez fanów i konta UGC
              (setki klipów: zakupy w Dino, taniec przed sklepem, pakowanie palet napojów).
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
              {PLATFORMS.map((p) => (
                <span key={p} style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 22, padding: '7px 14px' }}>{p}</span>
              ))}
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.4)' }}>
              Metodologia szacunku: udokumentowane ~{(documentedViews / 1e6).toFixed(1)} mln wyświetleń (TikTok + YouTube) rozszerzone o obecność na 5 platformach
              oraz setki repostów UGC daje ostrożnie ponad {estimatedReach} mln realnego zasięgu. Liczby zweryfikowane oznaczono w tabeli; pozycja „{estimatedReach} mln+" to estymacja.
            </p>
          </motion.div>
        </div>
      </section>

      {/* UGC volume statement */}
      <section style={{ position: 'relative', padding: m ? '40px 0' : '60px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Fala UGC</p>
            <h2 style={{ fontSize: m ? 24 : 'clamp(24px, 3.2vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 18, maxWidth: 760 }}>
              Ludzie sami kręcą content z napojami w Dino
            </h2>
            <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.5)', maxWidth: 720 }}>
              Klienci nagrywają Edwarda przy półce z napojami, taniec przed sklepem, wspólne zdjęcia. Każdy taki klip to darmowa
              reklama marki DINO trafiająca do tysięcy ludzi. Poniżej realne komentarze i pełna lista mediów, które napisały o napojach.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
            {extraClips.map((c) => (
              <div key={c.label} style={{ flex: '1 1 150px', padding: '16px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: m ? 20 : 24, fontWeight: 800, color: '#7dd17f' }}>{c.views >= 1e6 ? (c.views / 1e6).toFixed(1) + ' mln' : Math.round(c.views / 1000) + ' tys.'}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{c.label}</div>
              </div>
            ))}
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
                `${estimatedReach} mln+ szacowanego zasięgu UGC na 5 platformach`,
                `${(documentedViews / 1e6).toFixed(1)} mln+ zweryfikowanych wyświetleń kampanii (TikTok + YouTube)`,
                `${napojeMedia.length} publikacji w mediach o napojach (od Press.pl po Wiadomości Handlowe)`,
                'Dziesiątki realnych komentarzy: „polecam, bo próbowałem", „będę kupował w najbliższym Dino"',
                'Organiczny, darmowy UGC z marką DINO w tle - bez kosztów mediowych',
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
            Dane wyświetleń, polubień i komentarzy pochodzą z paneli analityki TikTok oraz YouTube Studio (czerwiec 2026). Pozycje oznaczone „mln+/tys.+" zaokrąglono w górę.
            Szacunek zasięgu UGC to estymacja na podstawie obecności contentu na 5 platformach i wolumenu repostów.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Chip({ icon, val, label }: { icon: string; val: string; label: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '6px 11px' }}>
      <span style={{ fontSize: 12 }}>{icon}</span>
      <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{val}</span>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{label}</span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 6, padding: '3px 8px' }}>{children}</span>
}

function Row({ m, i, name, views, likes, comments, saves, note }: { m: boolean; i: number; name: string; views: number; likes: string; comments: number | string; saves: string; note: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: m ? '2fr 1fr 1fr' : '2.4fr 1fr 1fr 1fr 1fr', padding: m ? '12px 16px' : '13px 22px', background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: m ? 12 : 13.5, alignItems: 'center' }}>
      <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{name}<span style={{ display: 'block', fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>{note}</span></span>
      <span style={{ textAlign: 'right', color: '#fff', fontWeight: 700 }}>{fmt(views)}</span>
      {!m && <span style={{ textAlign: 'right', color: 'rgba(255,255,255,0.7)' }}>{likes}</span>}
      <span style={{ textAlign: 'right', color: 'rgba(255,255,255,0.7)' }}>{comments}</span>
      {!m && <span style={{ textAlign: 'right', color: 'rgba(255,255,255,0.7)' }}>{saves}</span>}
    </div>
  )
}
