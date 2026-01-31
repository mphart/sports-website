import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home'
import StandingsPage from './pages/standings'

import Header from './components/header'
import Footer from './components/footer'

function App() {
  return (
    <>
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="standings" element={<StandingsPage />} />
        <Route path="*" element={<p>404: Not Found</p>} />
      </Routes>
    <Footer />
    </Router>
    </> 
  )
}

export default App
