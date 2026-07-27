import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { useT } from '../lib/i18n'

/* Ściana opinii — anonimowe wycinki prawdziwych wiadomości i komentarzy o
   produktach Edwarda (lody EDWARDZIK, napoje, musy). Nagłówki z nickami/
   avatarami przycięte — zostaje sam tekst pochwały. Masonry (CSS columns). */

const OPINIE = [
  '/ugc-musy/op-dm-01.jpg', // masz strasznie pyszne musy
  '/ugc-musy/op-tt-07.jpg', // te lody to hit tego lata
  '/ugc-musy/op-dm-03.jpg', // czekoladowo popcornowy i mega dobry
  '/ugc-musy/op-tt-01.jpg', // czekolada popcorn takie dobre
  '/ugc-musy/op-dm-04.jpg', // Przepyszne Lody + 100 na 100
  '/ugc-musy/op-tt-05.jpg', // napoj truskawka jagoda pyszny
  '/ugc-musy/op-tt-03.jpg', // twoje lody są przepyszne
  '/ugc-musy/op-dm-02.jpg', // picie i mus mega dobre
  '/ugc-musy/op-tt-08.jpg', // musy mega pycha jabłko gruszka
  '/ugc-musy/op-tt-02.jpg', // popcorn czekoladą pyszny
  '/ugc-musy/op-tt-04.jpg', // twoje lody super polecam
  '/ugc-musy/op-tt-06.jpg', // przepyszne lody szczerze
]

export default function Opinie({
  heading,
  sub,
  standalone = false,
  limit,
}: { heading?: string; sub?: string; standalone?: boolean; limit?: number }) {
  const m = useIsMobile()
  const { locale } = useT()
  const pl = locale === 'pl'
  const items = limit ? OPINIE.slice(0, limit) : OPINIE

  return (
    <section id="opinie" style={{ position: 'relative', padding: m ? '70px 0' : '110px 0', borderTop: standalone ? 'none' : '1px solid rgba(255,255,255,0.08)', scrollMarginTop: 80 }}>
      <div aria-hidden style={{ position: 'absolute', top: 40, right: -120, width: m ? 280 : 440, height: m ? 280 : 440, borderRadius: '50%', background: '#e23b3b', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: m ? 34 : 48 }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f9a8d4', marginBottom: 14 }}>
            {pl ? 'PRAWDZIWE OPINIE' : 'REAL OPINIONS'}
          </p>
          <h2 style={{ fontSize: m ? 30 : 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            {heading ?? (pl ? 'Co ludzie piszą do Edwarda' : 'What people write to Edward')}
          </h2>
          <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', maxWidth: 620, margin: '0 auto' }}>
            {sub ?? (pl
              ? 'Prawdziwe wiadomości i komentarze od ludzi. Bez nazwisk - tylko to, co napisali o produktach. No i elegancko.'
              : 'Real messages and comments from people. No names - just what they wrote about the products.')}
          </p>
        </motion.div>

        {/* masonry */}
        <div style={{ columnCount: m ? 1 : 3, columnGap: 16 }}>
          {items.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              style={{ breakInside: 'avoid', marginBottom: 16, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', boxShadow: '0 14px 34px rgba(0,0,0,0.4)' }}
            >
              <img src={src} alt={pl ? 'Opinia o produktach Edwarda' : 'Opinion about Edward products'} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto' }} />
            </motion.div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', textAlign: 'center', marginTop: 22, lineHeight: 1.6 }}>
          {pl
            ? 'Autentyczne wiadomości i komentarze od odbiorców. Dane identyfikujące (nicki, zdjęcia) zostały usunięte.'
            : 'Authentic messages and comments from the audience. Identifying data (handles, photos) has been removed.'}
        </p>
      </div>
    </section>
  )
}
