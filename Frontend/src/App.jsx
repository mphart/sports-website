import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home'
import StandingsPage from './pages/standings'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="standings" element={<StandingsPage />} />
        <Route path="*" element={<p>404: Not Found</p>} />
      </Routes>
    </Router>
  )
}

export default App
