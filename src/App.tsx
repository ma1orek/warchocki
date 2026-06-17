import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import WynajemEdwarda from './pages/WynajemEdwarda'
import WynajemRobotow from './pages/WynajemRobotow'
import PromocjaSocialMedia from './pages/PromocjaSocialMedia'
import ProduktyPage from './pages/ProduktyPage'
import ProduktPage from './pages/ProduktPage'
import RaportDino from './pages/RaportDino'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wynajem-edwarda" element={<WynajemEdwarda />} />
        <Route path="/wynajem-robotow" element={<WynajemRobotow />} />
        <Route path="/promocja-social-media" element={<PromocjaSocialMedia />} />
        <Route path="/produkty" element={<ProduktyPage />} />
        <Route path="/produkty/:slug" element={<ProduktPage />} />
        <Route path="/raport-dino" element={<RaportDino />} />
        <Route path="/dino" element={<RaportDino />} />
        <Route path="/en" element={<Home />} />
        <Route path="/en/wynajem-edwarda" element={<WynajemEdwarda />} />
        <Route path="/en/wynajem-robotow" element={<WynajemRobotow />} />
        <Route path="/en/promocja-social-media" element={<PromocjaSocialMedia />} />
        <Route path="/en/produkty" element={<ProduktyPage />} />
        <Route path="/en/produkty/:slug" element={<ProduktPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
