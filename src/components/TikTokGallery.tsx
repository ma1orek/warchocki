import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import SocialLinks from './SocialLinks'
import useIsMobile from '../hooks/useIsMobile'
import { useT } from '../lib/i18n'

const tiktokVideos = [
  '7613540882662296854',
  '7627845549282118945',
  '7614906652290043158',
]

export default function TikTokGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const m = useIsMobile()
  const { t } = useT()

  useEffect(() => {
    const existing = document.getElementById('tiktok-embed-script')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.id = 'tiktok-embed-script'
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const mediaPresence = [
    'BBC News', 'CNN', 'Reuters', 'Fox News', 'NBC News', 'ABC News',
    'CTV News', 'Euronews', 'Yahoo', 'The Print (India)',
    'The Standard (Hong Kong)', 'Business Today', 'Asianet Newsable',
    'Modern Ghana', 'Euro Weekly News', 'Futurism',
    'Interesting Engineering', "Men's Journal", 'GreenMe',
    'Dzień Dobry TVN', 'Polsat News', 'Radio VOX FM', 'Radio ZET',
    'Money.pl', 'Wiadomości WP', 'Interia', 'Spider\'s Web',
    'Super Express', 'Bankier.pl', 'BiznesAlert', 'Do Rzeczy',
    'Techoteka', 'Android.com.pl', 'Goniec.pl', 'BOOP.PL',
    'Digimania', 'Grupa SEO', '...i wiele innych',
  ]

  return (
    <section id="sociale" style={{ position: 'relative', padding: m ? '80px 0' : '120px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>{t('socialTag')}</p>
          <h2 style={{ fontSize: m ? 28 : 'clamp(28px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>{t('socialTitle')}</h2>
          <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', maxWidth: 600, margin: '0 auto 32px' }}>
            {t('socialDesc')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <SocialLinks size={m ? 'normal' : 'large'} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 16px', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ width: '100%', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 8 }}>{t('socialMediaLabel')}</p>
            {mediaPresence.map((media) => (
              <span key={media} style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{media}</span>
            ))}
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 24, textAlign: 'center' }}>
          {t('socialTikTokLabel')}
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 16 : 24 }}>
          {tiktokVideos.map((videoId, index) => (
            <motion.div key={videoId} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              style={{ display: 'flex', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: 12, minHeight: m ? 400 : 500 }}>
              <blockquote className="tiktok-embed" cite={`https://www.tiktok.com/@edwardwarchocki/video/${videoId}`} data-video-id={videoId}
                style={{ maxWidth: 605, minWidth: 250, margin: 0, borderLeft: 'none', padding: 0 }}>
                <section>
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.tiktok.com/@edwardwarchocki/video/${videoId}`}
                    style={{ display: 'block', textAlign: 'center', paddingTop: 160, color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                    {t('socialLoading')}
                  </a>
                </section>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
