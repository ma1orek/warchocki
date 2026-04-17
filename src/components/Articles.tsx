import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import useIsMobile from '../hooks/useIsMobile'
import { useT } from '../lib/i18n'

const articles = [
  // Worldwide
  { source: 'BBC News', title: 'Humanoid robot Edward Warchocki filmed chasing wild boars in Warsaw', url: 'https://worldnews.whatfinger.com/2026/04/15/the-humanoid-robot-known-as-edward-warchocki-was-filmed-chasing-boars-in-warsaw-poland-bbcnews', domain: 'bbc.co.uk' },
  { source: 'CNN', title: 'Robot chases wild boars in Warsaw — viral video', url: 'https://edition.cnn.com/2026/04/15/world/video/robot-chases-wild-boars-ldn-digvid-vrtc', domain: 'cnn.com' },
  { source: 'Reuters', title: 'Polish humanoid robot Edward Warchocki chases wild boars', url: 'https://www.facebook.com/Reuters/posts/a-video-of-a-humanoid-polish-robot-named-edward-warchocki-chasing-wild-boars-thr/1519503256707068/', domain: 'reuters.com' },
  { source: 'Euronews', title: 'Humanoid robot chases wild boars in Polish capital Warsaw', url: 'https://www.euronews.com/video/2026/04/16/humanoid-robot-chases-wild-boars-in-the-polish-capital-warsaw', domain: 'euronews.com' },
  { source: 'Fox Business', title: 'Viral video shows humanoid robot chasing wild boars off street', url: 'https://www.foxbusiness.com/technology/viral-video-shows-humanoid-robot-chasing-wild-boars-off-street-bizarre-encounter', domain: 'foxbusiness.com' },
  { source: 'ABC News', title: 'Humanoid robot chasing wild boars in Poland goes viral', url: 'https://abcnews.com/video/132039369/', domain: 'abcnews.com' },
  { source: 'NBC News', title: 'Meet Edward Warchocki, the humanoid robot chasing wild boars', url: 'https://www.facebook.com/NBCNews/posts/meet-edward-warchocki-a-humanoid-robot-used-to-chase-a-group-of-wild-boars-in-po/1331091965549332/', domain: 'nbcnews.com' },
  { source: 'CTV News', title: 'Edward the humanoid robot chases wild boars out of Warsaw', url: 'https://www.ctvnews.ca/toronto/video/2026/04/15/edward-the-humanoid-robot-chases-wild-boars-out-of-warsaw-neighbourhood/', domain: 'ctvnews.ca' },
  { source: 'Yahoo', title: 'Humanoid Robot Edward Chases Boars in Viral Video', url: 'https://www.yahoo.com/entertainment/tv/articles/humanoid-robot-edward-chases-boars-060356830.html', domain: 'yahoo.com' },
  { source: 'Futurism', title: 'Video Shows Humanoid Robot Chasing a Pack of Wild Boars', url: 'https://futurism.com/robots-and-machines/humanoid-robot-chasing-wild-boars', domain: 'futurism.com' },
  { source: 'Interesting Engineering', title: 'Humanoid robot chases boars in unusual AI showcase', url: 'https://interestingengineering.com/ai-robotics/humanoid-robot-chases-boars-in-poland', domain: 'interestingengineering.com' },
  { source: "Men's Journal", title: 'Humanoid Robot Edward Chases Boars in Viral Video', url: 'https://www.mensjournal.com/news/humanoid-robot-edward-chases-boars-warsaw-poland-viral-video', domain: 'mensjournal.com' },
  { source: 'The Standard HK', title: 'Edward Warchocki becomes unexpected wild boar deterrent', url: 'https://www.thestandard.com.hk/social-buzz/article/329520/Humanoid-robot-Edward-Warchocki-becomes-unexpected-wild-boar-deterrent-in-Warsaw', domain: 'thestandard.com.hk' },
  { source: 'The Print (India)', title: "Poland's newest influencer is a robot. Chasing boars, speaking in Parliament", url: 'https://theprint.in/feature/polands-newest-influencer-is-a-robot-hes-chasing-boars-speaking-in-parliament/2906369/', domain: 'theprint.in' },
  { source: 'Asianet Newsable', title: "Humanoid Robot 'Edward' Chases Wild Boars in Poland — viral", url: 'https://newsable.asianetnews.com/world/watch-humanoid-robot-edward-chases-wild-boars-in-poland-video-goes-viral-articleshow-nvgabqu', domain: 'asianetnews.com' },
  { source: 'Business Today', title: 'Humanoid Robot Chases Wild Boars — viral video from Poland', url: 'https://www.businesstoday.in/bt-tv/short-video/watch-humanoid-robot-chases-wild-boars-viral-video-from-poland-525798-2026-04-15', domain: 'businesstoday.in' },
  { source: 'Euro Weekly News', title: 'Could robots solve Europe\'s wild boar problem?', url: 'https://euroweeklynews.com/2026/04/16/could-robots-solve-europes-growing-wild-boar-problem-warsaw-experiment-goes-viral/', domain: 'euroweeklynews.com' },
  { source: 'GreenMe', title: "Warsaw experiment goes viral — humanoid robot vs boars", url: 'https://www.greenmemag.com/animals/whats-this-story-about-the-humanoid-robot-chasing-wild-boars-away-from-the-city-center-warsaw-experiment-goes-viral/', domain: 'greenmemag.com' },
  { source: 'The Online Citizen', title: 'Robot „herding" wild boars in Poland revealed as marketing stunt', url: 'https://theonlinecitizen.com/2026/04/14/robot-herding-wild-boars-in-poland-revealed-as-marketing-stunt', domain: 'theonlinecitizen.com' },
  { source: "What's The Jam", title: "Humanoid robot dubbed 'influencer' spotted chasing boars", url: 'https://whatsthejam.com/world-news/humanoid-robot-dubbed-influencer-spotted-chasing-wild-boars-in-surreal-scene/', domain: 'whatsthejam.com' },
  { source: 'Mrkt30', title: 'Who is Edward Warchocki: the Robot Taking Over Warsaw', url: 'https://mrkt30.com/who-is-edward-warchocki-the-robot-taking-over-warsaw/', domain: 'mrkt30.com' },
  { source: 'ABC News 4', title: 'Morning Buzz: Humanoid robot goes viral chasing wild boars', url: 'https://abcnews4.com/news/local/morning-buzz-humanoid-robot-goes-viral-for-chasing-off-wild-boars-in-poland-trending-ai-science-fiction-shocking-bizarre-edward-warchocki-warsaw', domain: 'abcnews4.com' },
  { source: 'Modern Ghana', title: 'BBC: Humanoid robot Edward Warchocki filmed in Warsaw', url: 'https://www.modernghana.com/videonews/bbc/1/636520/', domain: 'modernghana.com' },
  { source: 'The Gateway Pundit', title: 'Watch: Humanoid Robot Chases Pack of Wild Boars', url: 'https://www.thegatewaypundit.com/2026/04/watch-humanoid-robot-chases-pack-wild-boars-viral/', domain: 'thegatewaypundit.com' },
  // Polish
  { source: 'Dzień Dobry TVN', title: 'Autonomiczny robot stał się influencerem', url: 'https://dziendobry.tvn.pl/styl-zycia/edward-warchocki-autonomiczny-robot-stal-sie-influencerem-st8943884', domain: 'dziendobry.tvn.pl' },
  { source: 'Polsat News', title: 'Humanoidalny robot zaproszony do Sejmu przez Konfederację', url: 'https://www.polsatnews.pl/wiadomosc/2026-03-25/pierwszy-robot-w-polskim-parlamencie-wnosze-o-podwyzszenie-pensji/', domain: 'polsatnews.pl' },
  { source: 'Polsat News', title: 'Wyjątkowy gość w studiu. Robot AI chce mieć takie same prawa jak człowiek', url: 'https://www.polsatnews.pl/wiadomosc/2026-04-04/nietypowy-gosc-w-studiu-parlament-robot-ai-chce-miec-takie-same-prawa-jak-czlowiek/', domain: 'polsatnews.pl' },
  { source: 'Money.pl', title: '„Polski" robot podbił Sejm. Dzieło chińskiej inżynierii', url: 'https://www.money.pl/gospodarka/polski-robot-podbil-sejm-dzielo-chinskiej-inzynierii-producent-idzie-na-gielde-7268420451186784a.html', domain: 'money.pl' },
  { source: 'Money.pl', title: 'Robot w parlamencie. Kancelaria Sejmu zabiera głos', url: 'https://www.money.pl/biznes/robot-w-parlamencie-kancelaria-sejmu-zabiera-glos-7268532322936960a.html', domain: 'money.pl' },
  { source: 'GeekWeek / Interia', title: 'Robot humanoidalny w Sejmie — zachwycił polityków', url: 'https://geekweek.interia.pl/roboty/news-robot-humanoidalny-w-sejmie-edward-warchocki-zachwycil-polit,nId,23317834', domain: 'interia.pl' },
  { source: 'Spider\'s Web', title: 'Kupił robota w cenie auta i zaczepia ludzi', url: 'https://spidersweb.pl/2026/03/robot-edward-warchocki-tiktok.html', domain: 'spidersweb.pl' },
  { source: 'Spider\'s Web', title: 'Tyle kosztuje robot z polskiego TikToka', url: 'https://spidersweb.pl/2026/03/edward-warchocki-robot-aliexpress-promocja.html', domain: 'spidersweb.pl' },
  { source: 'Spider\'s Web', title: 'Robot nękał kobietę. Musiała interweniować policja', url: 'https://spidersweb.pl/2026/03/robot-nekal-kobiete-musiala-interweniowac-policja.html', domain: 'spidersweb.pl' },
  { source: 'Super Express', title: 'Ten robot może „przejąć" cały świat', url: 'https://www.se.pl/wiadomosci/exclusive/kim-jest-edward-warchocki-ten-robot-wkrotce-moze-przejac-caly-swiat-aa-Wy7X-jH7J-JUZZ.html', domain: 'se.pl' },
  { source: 'Super Express', title: 'Minister finansów przybił piątkę z robotem!', url: 'https://www.se.pl/wiadomosci/lekkie/minister-finansow-przybil-piatke-z-robotem-edward-warchocki-wdziera-sie-na-polityczne-salony-aa-uzPx-ueAT-iTaY.html', domain: 'se.pl' },
  { source: 'Super Express', title: 'Nietypowy gość Konfederacji w Sejmie', url: 'https://polityka.se.pl/wiadomosci/nietypowy-gosc-konfederacji-w-sejmie-robot-edward-warchocki-rozmawial-z-politykami-aa-kH9A-U9vC-rHEa.html', domain: 'se.pl' },
  { source: 'Android.com.pl', title: 'Kulisy projektu Edward Warchocki', url: 'https://android.com.pl/tech/1025893-kim-tak-naprawde-jest-edward-warchocki/', domain: 'android.com.pl' },
  { source: 'Wiadomości WP', title: '„Wnoszę o podwyżki dla Straży Marszałkowskiej"', url: 'https://wiadomosci.wp.pl/slynny-robot-w-sejmie-wnosze-o-podwyzki-dla-strazy-marszalkowskiej-7268098198516289v', domain: 'wp.pl' },
  { source: 'Wiadomości WP', title: '„To wy powinniście się czuć samotni"', url: 'https://wiadomosci.wp.pl/robot-rozmawial-z-politykami-w-sejmie-to-wy-powinniscie-sie-czuc-samotni-7268143357768257v', domain: 'wp.pl' },
  { source: 'Bankier.pl', title: 'Robot w polskim Sejmie wygłosił „orędzie"', url: 'https://www.bankier.pl/wiadomosc/Robot-humanoidalny-w-polskim-Sejmie-Nazywa-sie-Edward-Warchocki-i-wyglosil-oredzie-9104007.html', domain: 'bankier.pl' },
  { source: 'Techoteka', title: 'Pierwszy polski robot influencer', url: 'https://techoteka.pl/tech-news/edward-warchocki-robot-influencer/', domain: 'techoteka.pl' },
  { source: 'BOOP.PL', title: 'Robot „zatrzymany przez policję". Ta nie wiedziała, co robić', url: 'https://boop.pl/rozrywka/robot-edward-warchocki-zatrzymany-przez-policje-ta-nie-wiedziala-co-robic', domain: 'boop.pl' },
  { source: 'BOOP.PL', title: 'Promocja na Edwarda Warchockiego. Cena spadła o 13 tysięcy', url: 'https://boop.pl/rozne/promocja-na-edwarda-warchockiego-cena-spadla-o-ponad-13-tysiecy-zlotych', domain: 'boop.pl' },
  { source: 'Digimania', title: 'Robot-influencer podbija internet. Co to za humanoid?', url: 'https://www.digimania.pl/blog/2026/03/12/edward-warchocki-robot-influencer-co-to/', domain: 'digimania.pl' },
  { source: 'Grupa SEO', title: 'Edward Warchocki — kim jest?', url: 'https://grupa-seo.pl/edward-warchocki-kim-jest/', domain: 'grupa-seo.pl' },
  { source: 'Do Rzeczy', title: 'Słynny robot wygłosił „orędzie" w Sejmie', url: 'https://dorzeczy.pl/opinie/864778/w-sejmie-pojawil-sie-slynny-robot-edward-warchocki.html', domain: 'dorzeczy.pl' },
  { source: 'Goniec.pl', title: 'Politycy zdębieli. Wyciągali telefony', url: 'https://goniec.pl/niebywale-kto-pojawil-sie-dzis-w-sejmie-politycy-wyciagali-telefony-i-nagrywali-mt-wwi-250326', domain: 'goniec.pl' },
  { source: 'VOX FM', title: 'Czy maszyny zastąpią nas w pracy?', url: 'https://www.voxfm.pl/rozrywka/robot-edward-warchocki-robi-furore-w-sieci-czy-maszyny-wkrotce-zastapia-nas-w-pracy-aa-hAJ7-A44C-HvkT.html', domain: 'voxfm.pl' },
  { source: 'BiznesAlert', title: 'Robot za 115 tys. zł zaczepia Polaków', url: 'https://biznesalert.pl/robot-za-115-tys-zl-zaczepia-polakow-kto-go-wypuscil-na-ulice/', domain: 'biznesalert.pl' },
]

function ArticleCard({ article, index, isMobile }: { article: (typeof articles)[0]; index: number; isMobile: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a ref={ref} href={article.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: isMobile ? '14px 16px' : '18px 22px',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.2s ease',
      }}>
      <img src={`https://www.google.com/s2/favicons?domain=${article.domain}&sz=64`} alt=""
        style={{ width: isMobile ? 22 : 28, height: isMobile ? 22 : 28, borderRadius: 4, flexShrink: 0, filter: hovered ? 'brightness(1.2)' : 'brightness(0.8)', transition: 'filter 0.2s ease' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>{article.source}</p>
        <h3 style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600, lineHeight: 1.4, color: hovered ? '#fff' : 'rgba(255,255,255,0.7)' }}>{article.title}</h3>
      </div>
      <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.15)', flexShrink: 0 }}>&rarr;</span>
    </motion.a>
  )
}

export default function Articles() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const m = useIsMobile()
  const { t } = useT()

  return (
    <section id="media" style={{ position: 'relative', padding: m ? '80px 0' : '120px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: m ? '0 20px' : '0 48px' }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: m ? 40 : 64 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>{t('articlesTag')}</p>
          <h2 style={{ fontSize: m ? 28 : 'clamp(28px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>{t('articlesTitle')}</h2>
          <p style={{ fontSize: m ? 15 : 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', maxWidth: 600, margin: '0 auto' }}>
            {t('articlesDesc')}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: 2, gridAutoRows: '1fr' }}>
          {articles.map((article, i) => (
            <ArticleCard key={article.url} article={article} index={i} isMobile={m} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>{t('articlesMore')}</p>
        </motion.div>
      </div>
    </section>
  )
}
