import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WynajemEdwarda from './pages/WynajemEdwarda'
import WynajemRobotow from './pages/WynajemRobotow'
import PromocjaSocialMedia from './pages/PromocjaSocialMedia'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wynajem-edwarda" element={<WynajemEdwarda />} />
        <Route path="/wynajem-robotow" element={<WynajemRobotow />} />
        <Route path="/promocja-social-media" element={<PromocjaSocialMedia />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
