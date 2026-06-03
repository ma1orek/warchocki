import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Produkty from '../components/Produkty'
import NapojeSocial from '../components/NapojeSocial'

export default function ProduktyPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      <Navbar />
      <div style={{ paddingTop: 48 }}>
        <Produkty />
      </div>
      <NapojeSocial />
      <Footer />
    </div>
  )
}
