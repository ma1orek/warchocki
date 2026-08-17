import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useIsMobile from '../hooks/useIsMobile'

/* RAPORT: Edward Warchocki na Pol'and'Rock Festival 2026 (30.07 - 1.08, Broczyno k. Czaplinka).
   Stylistyka „pamiętnik z festiwalu": plakatowa typografia, taśma klejąca, przekrzywione
   polaroidy, odręczne notatki (Caveat), ziarno filmowe. Dane filmów = realne liczniki
   TikToka (zaciągnięte 3.08.2026), zasięg łączny = wszystkie platformy Edwarda. */

// ── kolory festiwalowe
const RED = '#ff2f45'
const SUN = '#ffc93c'
const SKY = '#4ea3ff'

// ── 10 filmów z festiwalu (TikTok). views = licznik TikToka.
type Film = { id: string; title: string; views: number; likes: number; shares: number; brand?: string }
const films: Film[] = [
  { id: '7668037005741247777', title: 'Edward Warchocki zatrzymany', views: 4900000, likes: 475600, shares: 94400 },
  { id: '7670213332623772960', title: 'sie zresesetowałem na Pol’and’Rocku', views: 185300, likes: 7830, shares: 787, brand: 'współpraca reklamowa · Play' },
  { id: '7669136183041035553', title: 'GDZIE JEST ANDRZEJ', views: 535000, likes: 43100, shares: 9732 },
  { id: '7668014217139637537', title: 'siema odjazd', views: 349200, likes: 22300, shares: 3955 },
  { id: '7668342953487682848', title: 'to jest mój kawałek ziemi', views: 151400, likes: 7252, shares: 1519 },
  { id: '7668406759131811105', title: 'na razie tam nie wchodźcie', views: 148800, likes: 7804, shares: 1935 },
  { id: '7669067968055184673', title: 'jak sobota to', views: 105800, likes: 5463, shares: 713 },
  { id: '7668676346930842912', title: 'uratowała mnie', views: 43300, likes: 1803, shares: 309 },
  { id: '7669432443140590880', title: 'zabawa', views: 39100, likes: 2975, shares: 485 },
  { id: '7669893977750932768', title: 'ja nic takiego nie zrobiłem', views: 10500, likes: 312, shares: 29 },
  { id: '7669890084757441825', title: 'pizza czy pinsa?', views: 7774, likes: 297, shares: 4 },
]

// ── UGC: klipy fanów (odtwarzalne) + miniatury do przewijanych rzędów
const CLIPS = 76 // v01-v26 = „ładniejsze" (na przodzie), v27+ = reszta materiałów
const THUMBS = 143
// wyrzucone: kadry czarne/nieczytelne albo bez treści (same zrzuty tekstu)
const THUMBS_EXCLUDE = new Set([21, 30, 32, 36, 45, 68, 70, 77, 78, 79, 99, 101, 106, 134, 140, 141])
// wyrzucone: kadr startowy nieczytelny (ciemno/rozmyte) albo sam ekran z tekstem
const CLIPS_EXCLUDE = new Set([6, 15, 17, 21, 24, 29, 30, 37, 42, 53, 60, 69])
const clips = Array.from({ length: CLIPS }, (_, i) => i + 1)
  .filter((n) => !CLIPS_EXCLUDE.has(n))
  .map((n) => `/pnr/v/pnr-v${String(n).padStart(2, '0')}`)
const thumbs = Array.from({ length: THUMBS }, (_, i) => i + 1)
  .filter((n) => !THUMBS_EXCLUDE.has(n))
  .map((n) => `/pnr/t/pnr-t${String(n).padStart(3, '0')}.jpg`)

// polaroidy w hero — kadry ze zdjęć fanów, przycięte z ramek story (skrypt hero_crop)
const POLAROIDS = [
  { src: '/pnr/hero-1.jpg', rot: -5, x: '0%', y: '0%', w: '54%', z: 2, tape: SUN },
  { src: '/pnr/hero-2.jpg', rot: 5, x: '46%', y: '9%', w: '52%', z: 1, tape: RED },
  { src: '/pnr/hero-3.jpg', rot: -2, x: '20%', y: '48%', w: '58%', z: 3, tape: SKY },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

// ziarno filmowe — analogowy „pamiętnikowy" nalot na całą stronę
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

export default function RaportPolandRock() {
  const m = useIsMobile()

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#08070a', overflow: 'hidden' }}>
      <Navbar />

      {/* ziarno */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, backgroundImage: GRAIN, opacity: 0.05, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 5 }} />

      {/* HERO — plakat festiwalowy */}
      <section style={{ position: 'relative', padding: m ? '104px 0 46px' : '150px 0 70px', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: -220, left: '50%', transform: 'translateX(-50%)', width: m ? 620 : 1100, height: m ? 620 : 1100, borderRadius: '50%', background: `radial-gradient(circle, ${RED} 0%, rgba(255,47,69,0) 62%)`, opacity: 0.4, pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', top: 120, right: -160, width: m ? 300 : 520, height: m ? 300 : 520, borderRadius: '50%', background: SUN, filter: 'blur(160px)', opacity: 0.18, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', display: 'grid', gridTemplateColumns: m ? '1fr' : '1.15fr 0.85fr', gap: m ? 0 : 40, alignItems: 'center' }}>
          <div>
          {/* bilet / opaska */}
          <motion.div {...fadeUp(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: m ? 10 : 14, flexWrap: 'wrap', padding: m ? '9px 14px' : '11px 18px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.28)', marginBottom: m ? 22 : 30 }}>
            <Heart size={m ? 15 : 17} />
            <span style={{ fontSize: m ? 10 : 11.5, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff' }}>
              Pol'and'Rock Festival 2026
            </span>
            <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: m ? 10 : 11.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
              30.07 – 1.08 · Broczyno
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.06)} style={{ fontSize: m ? 44 : 'clamp(56px, 9vw, 132px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.88, marginBottom: m ? 18 : 26, textTransform: 'uppercase' }}>
            <span style={{ display: 'block', color: '#fff' }}>Edward</span>
            <span style={{ display: 'block', color: '#fff' }}>Warchocki</span>
            <span style={{ display: 'block', color: RED, textShadow: `0 0 60px ${RED}55` }}>na Pol'and'Rocku</span>
          </motion.h1>

          <motion.p {...fadeUp(0.12)} style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 26 : 40, fontWeight: 700, color: SUN, transform: 'rotate(-2deg)', transformOrigin: 'left center', marginBottom: m ? 20 : 28 }}>
            trzy dni na polu, jeden robot, cała Polska w telefonach
          </motion.p>

          <motion.p {...fadeUp(0.18)} style={{ fontSize: m ? 16 : 20, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', maxWidth: 720, marginBottom: m ? 34 : 46 }}>
            Pierwszy polski robot-influencer pojechał na największy festiwal w kraju i wszedł prosto w tłum.
            Bez sceny, bez barierek - między namiotami, w kolejce po jedzenie, na polu.
            Efekt: <strong style={{ color: '#fff' }}>ponad 20 mln wyświetleń</strong> z jednej wizyty,
            w naszych social mediach, na wszystkich platformach.
          </motion.p>

          {/* JEDEN wynik — łączny zasięg z festiwalu */}
          <motion.div {...fadeUp(0.24)} style={{ position: 'relative', display: 'inline-block', padding: m ? '22px 24px 24px' : '30px 40px 34px', borderRadius: 20, background: `linear-gradient(150deg, ${RED}26, rgba(255,255,255,0.02))`, border: `1px solid ${RED}55`, boxShadow: `0 26px 70px ${RED}22` }}>
            <div style={{ fontSize: m ? 62 : 'clamp(72px, 10vw, 150px)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.85, color: '#fff', textShadow: `0 0 70px ${RED}66` }}>
              20 mln<span style={{ color: RED }}>+</span>
            </div>
            <div style={{ fontSize: m ? 13 : 17, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#fff', marginTop: m ? 14 : 18 }}>
              wyświetleń z jednej wizyty
            </div>
            <div style={{ fontSize: m ? 13 : 15.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', marginTop: 6, maxWidth: 420 }}>
              łączny wynik na wszystkich socialach Edwarda - TikTok, Instagram, YouTube, Facebook i X
            </div>
          </motion.div>
          </div>

          {/* kolaż polaroidów z pola — desktop: rozrzucone, mobile: rządek z zakładką */}
          <motion.div {...fadeUp(0.3)} style={m
            ? { display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 34 }
            : { position: 'relative', height: 520 }}>
            {POLAROIDS.map((p, i) => (
              <div key={p.src} style={{
                ...(m
                  ? { width: '35%', marginLeft: i === 0 ? 0 : '-5%', zIndex: p.z }
                  : { position: 'absolute', left: p.x, top: p.y, width: p.w, zIndex: p.z }),
                transform: `rotate(${p.rot}deg)`,
                background: '#f6f3ec', padding: m ? '5px 5px 16px' : '10px 10px 34px',
                borderRadius: 3, boxShadow: '0 26px 60px rgba(0,0,0,0.65)',
              }}>
                <div aria-hidden style={{ position: 'absolute', top: m ? -8 : -11, left: '50%', transform: `translateX(-50%) rotate(${p.rot * 1.6}deg)`, width: m ? 46 : 72, height: m ? 15 : 22, background: `${p.tape}55`, border: `1px solid ${p.tape}66`, borderRadius: 2 }} />
                <img src={p.src} alt="" loading="lazy" decoding="async" style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', background: '#111' }} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* KRONIKA - 10 filmów */}
      <section style={{ position: 'relative', padding: m ? '44px 0' : '70px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: m ? 28 : 44 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED, marginBottom: 12 }}>
              Kronika z pola · {films.length} filmów
            </p>
            <h2 style={{ fontSize: m ? 30 : 'clamp(32px, 5vw, 62px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>
              Co się działo, kiedy robot<br />wszedł w tłum
            </h2>
            <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.65, color: 'rgba(255,255,255,0.5)', maxWidth: 660 }}>
              Kliknij w kadr, żeby obejrzeć film. Te same materiały żyją równolegle na TikToku,
              Instagramie, YouTubie, Facebooku i X - i to razem daje
              <strong style={{ color: SUN }}> ponad 20 mln wyświetleń</strong>.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 22 : 26 }}>
            {films.map((f, i) => (
              <FilmCard key={f.id} film={f} i={i} m={m} />
            ))}
          </div>
        </div>
      </section>

      {/* PRZERYWNIK - odręczny cytat */}
      <section style={{ position: 'relative', padding: m ? '34px 0' : '56px 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', textAlign: 'center' }}>
          <motion.p {...fadeUp(0)} style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 30 : 52, fontWeight: 700, color: '#fff', lineHeight: 1.15, transform: 'rotate(-1.2deg)' }}>
            „byłem tam, człowieku - i mam na to jakieś kilka tysięcy dowodów"
          </motion.p>
          <motion.p {...fadeUp(0.1)} style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 16 }}>
            Edward Warchocki
          </motion.p>
        </div>
      </section>

      {/* UGC - fala */}
      <section style={{ position: 'relative', padding: m ? '44px 0 20px' : '70px 0 30px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div aria-hidden style={{ position: 'absolute', top: 40, left: -160, width: m ? 320 : 520, height: m ? 320 : 520, borderRadius: '50%', background: SKY, filter: 'blur(160px)', opacity: 0.14, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: m ? 26 : 40 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: SKY, marginBottom: 12 }}>
              Fala UGC · nagrywali wszyscy
            </p>
            <h2 style={{ fontSize: m ? 30 : 'clamp(32px, 5vw, 62px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>
              Tysiące telefonów<br />wycelowanych w Edwarda
            </h2>
            <p style={{ fontSize: m ? 15 : 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', maxWidth: 700 }}>
              Na festiwalu każdy ma telefon w kieszeni - i każdy chciał mieć Edwarda u siebie na relacji.
              Stories, TikToki, rolki, wspólne zdjęcia, oznaczenia <strong style={{ color: '#fff' }}>@edwardwarchocki</strong>.
              To <strong style={{ color: '#fff' }}>tysiące filmików</strong> nagranych przez ludzi
              i <strong style={{ color: SKY }}>kolejne miliony wyświetleń</strong> - poza naszymi kanałami, za zero złotych.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.08)} style={{ display: 'flex', flexWrap: 'wrap', gap: m ? 10 : 14, marginBottom: m ? 26 : 34 }}>
            <Stat big="Tysiące" label="Filmików od ludzi" sub="stories, TikToki, rolki" color={SKY} m={m} />
            <Stat big="Miliony" label="Wyświetleń UGC" sub="poza naszymi kanałami" color={SKY} m={m} />
            <Stat big="0 zł" label="Budżetu mediowego" sub="wszystko organicznie" color={SKY} m={m} />
          </motion.div>
        </div>

        {/* przewijane rzędy miniatur */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <UgcRow items={thumbs.slice(0, 48)} dir="left" duration={m ? 90 : 130} h={m ? 132 : 184} />
          <UgcRow items={thumbs.slice(48, 96)} dir="right" duration={m ? 96 : 140} h={m ? 132 : 184} />
          <UgcRow items={thumbs.slice(96)} dir="left" duration={m ? 92 : 134} h={m ? 132 : 184} />
        </div>
      </section>

      {/* UGC - odtwarzalne klipy */}
      <ClipCarousel clips={clips} m={m} />

      {/* CO Z TEGO WYNIKA */}
      <section style={{ position: 'relative', padding: m ? '40px 0 60px' : '60px 0 90px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
          <motion.h2 {...fadeUp(0)} style={{ fontSize: m ? 26 : 'clamp(28px, 3.6vw, 46px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: m ? 22 : 32 }}>
            Co to znaczy dla marki
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 14 : 20 }}>
            {[
              { c: RED, h: 'Jedna wizyta = 20 mln+', p: 'Nie kampania, nie miesiąc emisji - trzy dni na jednym polu. Robot nie musi kupować zasięgu, bo sam jest atrakcją.' },
              { c: SUN, h: 'Ludzie nagrywają sami', p: 'Każdy telefon na festiwalu to potencjalna publikacja. Tysiące filmików fanów niosą markę dalej, bez media planu.' },
              { c: SKY, h: 'Kontent działa dłużej niż event', p: 'Filmy z festiwalu zbierają wyświetlenia jeszcze długo po zwinięciu namiotów - a licznik dalej bije.' },
            ].map((b, i) => (
              <motion.div key={b.h} {...fadeUp(i * 0.08)} style={{ padding: m ? 22 : 28, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: `1px solid ${b.c}44` }}>
                <div style={{ width: 34, height: 4, borderRadius: 3, background: b.c, marginBottom: 16 }} />
                <h3 style={{ fontSize: m ? 19 : 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>{b.h}</h3>
                <p style={{ fontSize: m ? 14 : 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{b.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', padding: m ? '10px 0 70px' : '20px 0 110px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)', textAlign: 'center' }}>
          <motion.h3 {...fadeUp(0)} style={{ fontSize: m ? 26 : 40, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>
            Chcesz Edwarda na swoim evencie?
          </motion.h3>
          <motion.p {...fadeUp(0.08)} style={{ fontSize: m ? 15 : 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
            Festiwal, targi, otwarcie sklepu, konferencja - Edward wchodzi w tłum i robi z tego kontent.
          </motion.p>
          <motion.a {...fadeUp(0.14)} href="/wspolpraca" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 28px', borderRadius: 12, background: RED, color: '#fff', fontSize: 14, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Porozmawiajmy o współpracy
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </motion.a>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', margin: '26px auto 0', lineHeight: 1.65, maxWidth: 780 }}>
            Liczby przy filmach to liczniki TikToka z 3.08.2026. Łączny zasięg (20 mln+) obejmuje wszystkie kanały Edwarda:
            TikTok, Instagram, YouTube, Facebook i X. Materiały UGC opublikowane przez uczestników festiwalu,
            oznaczające @edwardwarchocki. Pol'and'Rock Festival to znak towarowy Fundacji Wielka Orkiestra Świątecznej Pomocy -
            używamy nazwy wyłącznie informacyjnie, opisując obecność Edwarda na festiwalu.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ── elementy ─────────────────────────────────────────────── */

function Heart({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={RED} aria-hidden>
      <path d="M12 21s-8.5-5.4-8.5-11A4.7 4.7 0 0 1 12 7.2 4.7 4.7 0 0 1 20.5 10c0 5.6-8.5 11-8.5 11z" />
    </svg>
  )
}

function Stat({ big, label, sub, color, m }: { big: string; label: string; sub?: string; color: string; m: boolean }) {
  return (
    <div style={{ flex: '1 1 190px', padding: m ? '18px 16px' : '26px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}44` }}>
      <div style={{ fontSize: m ? 30 : 44, fontWeight: 800, letterSpacing: '-0.04em', color, lineHeight: 1 }}>{big}</div>
      <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: 10 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.34)', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

// Karta filmu: okładka z TikToka (self-hosted) + taśma klejąca; klik = wczytanie embeda.
function FilmCard({ film, i, m }: { film: Film; i: number; m: boolean }) {
  const [play, setPlay] = useState(false)
  const tilt = [-1.4, 0.9, -0.6, 1.2, -1.1, 0.7][i % 6]
  const tapeColor = [SUN, RED, SKY][i % 3]

  return (
    <motion.div {...fadeUp((i % 3) * 0.08)} style={{ position: 'relative', transform: `rotate(${m ? 0 : tilt}deg)` }}>
      {/* taśma */}
      <div aria-hidden style={{ position: 'absolute', top: -12, left: '50%', transform: `translateX(-50%) rotate(${tilt * 2}deg)`, width: 92, height: 24, background: `${tapeColor}3d`, border: `1px solid ${tapeColor}55`, borderRadius: 2, zIndex: 3, backdropFilter: 'blur(2px)' }} />

      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', boxShadow: '0 22px 50px rgba(0,0,0,0.55)' }}>
        <div style={{ position: 'relative', background: '#000' }}>
          {play ? (
            <iframe
              src={`https://www.tiktok.com/embed/v2/${film.id}`}
              title={film.title}
              allow="encrypted-media; fullscreen"
              scrolling="no"
              style={{ display: 'block', width: '100%', aspectRatio: '9 / 16', maxWidth: m ? 340 : '100%', margin: '0 auto', border: 'none', background: '#000' }}
            />
          ) : (
            <button
              onClick={() => setPlay(true)}
              aria-label={`Odtwórz: ${film.title}`}
              style={{ display: 'block', position: 'relative', width: '100%', padding: 0, border: 'none', background: '#000', cursor: 'pointer' }}
            >
              <img src={`/pnr/tt/${film.id}.jpg`} alt={film.title} loading="lazy" decoding="async"
                style={{ display: 'block', width: '100%', aspectRatio: '9 / 16', objectFit: 'cover', opacity: 0.94 }} />
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 45%)' }}>
                <span style={{ width: 62, height: 62, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: '1.5px solid rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22, paddingLeft: 4 }}>▶</span>
              </span>
            </button>
          )}
        </div>

        <div style={{ padding: m ? '14px 16px 16px' : '15px 18px 18px' }}>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: m ? 24 : 27, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
            „{film.title}"
          </p>
          {film.brand && (
            <span style={{ display: 'inline-block', marginTop: 10, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: SUN, border: `1px solid ${SUN}55`, borderRadius: 20, padding: '4px 10px' }}>
              {film.brand}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function UgcRow({ items, dir, duration, h }: { items: string[]; dir: 'left' | 'right'; duration: number; h: number }) {
  const doubled = [...items, ...items]
  return (
    <div className="kom-row" style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)', maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)' }}>
      <div className="kom-track" style={{ animation: `marquee-${dir} ${duration}s linear infinite` }}>
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" decoding="async"
            style={{ height: h, width: 'auto', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', flexShrink: 0, display: 'block', objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  )
}

/* Klip UGC. Dopóki nikt nie kliknie, w karcie siedzi zwykły <img loading="lazy">
   (przy ~80 klipach zestaw <video> ściągałby wszystkie postery od razu).
   Klik montuje <video> i odpala z dźwiękiem - kolejny klik pauzuje. */
function Clip({ base }: { base: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const [playing, setPlaying] = useState(false)

  const start = () => {
    setMounted(true)
    // element pojawia się w tym samym geście użytkownika -> dźwięk przechodzi
    requestAnimationFrame(() => {
      const v = ref.current
      if (!v) return
      document.querySelectorAll<HTMLVideoElement>('video[data-pnr]').forEach((o) => { if (o !== v) o.pause() })
      v.muted = false
      v.play().catch(() => { v.muted = true; v.play().catch(() => {}) })
    })
  }

  const toggle = () => {
    const v = ref.current
    if (!mounted || !v) return start()
    if (v.paused) {
      document.querySelectorAll<HTMLVideoElement>('video[data-pnr]').forEach((o) => { if (o !== v) o.pause() })
      v.muted = false
      v.play().catch(() => { v.muted = true; v.play().catch(() => {}) })
    } else {
      v.pause()
    }
  }

  return (
    <div onClick={toggle} style={{ position: 'relative', cursor: 'pointer', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: '#000', boxShadow: '0 18px 44px rgba(0,0,0,0.5)' }}>
      {mounted ? (
        <video ref={ref} data-pnr="" src={`${base}.mp4`} poster={`${base}.jpg`} loop playsInline preload="auto"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          style={{ display: 'block', width: '100%', aspectRatio: '9 / 16', objectFit: 'cover', background: '#000' }} />
      ) : (
        <img src={`${base}.jpg`} alt="" loading="lazy" decoding="async"
          style={{ display: 'block', width: '100%', aspectRatio: '9 / 16', objectFit: 'cover', background: '#000' }} />
      )}
      {!playing && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.28), transparent 42%)' }}>
          <div style={{ width: 58, height: 58, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: '1.5px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 21, paddingLeft: 4 }}>▶</div>
        </div>
      )}
    </div>
  )
}

function ClipCarousel({ clips, m }: { clips: string[]; m: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('div')?.getBoundingClientRect().width ?? 240
    el.scrollBy({ left: dir * (card + 16) * (m ? 1 : 2), behavior: 'smooth' })
  }
  const arrow: React.CSSProperties = {
    width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 20, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }

  return (
    <section style={{ position: 'relative', padding: m ? '34px 0 50px' : '50px 0 80px' }}>
      <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div {...fadeUp(0)} style={{ marginBottom: m ? 22 : 32 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: SUN, marginBottom: 12 }}>
            Filmiki od ludzi z festiwalu
          </p>
          <h3 style={{ fontSize: m ? 24 : 34, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Kliknij i posłuchaj, jak to brzmiało
          </h3>
          <p style={{ fontSize: m ? 14.5 : 16.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 640 }}>
            Tysiące zdjęć i relacji uczestników - prosto z pola. Przewijaj w bok, kliknij kadr, żeby odtworzyć z dźwiękiem.
            To, co widzisz, to tylko wycinek.
          </p>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div ref={trackRef} className="vc-track"
            style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 6, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {clips.map((base) => (
              <div key={base} style={{ flex: `0 0 ${m ? '76%' : '224px'}`, scrollSnapAlign: 'start' }}>
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
      </div>
    </section>
  )
}
