import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import EdekDlaKazdego from '../components/EdekDlaKazdego'
import TikTokGallery from '../components/TikTokGallery'
import Articles from '../components/Articles'
import Services from '../components/Services'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      <Navbar />
      <Hero />
      <Timeline />
      <EdekDlaKazdego />
      <TikTokGallery />
      <Articles />
      <Services />
      <Footer />
    </div>
  )
}
