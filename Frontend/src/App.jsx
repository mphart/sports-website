import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home'
import StandingsPage from './pages/standings'
import SchedulePage from './pages/schedule'
import TeamsPage from './pages/teams'
import WatchPage from './pages/watch'
import NewsPage from './pages/news'

import Header from './components/header'
import Footer from './components/footer'

function App() {
  return (
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="standings" element={<StandingsPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="watch" element={<WatchPage />} />
        <Route path="news" element={<NewsPage />} />

        <Route path="*" element={<p>404: Not Found</p>} />
      </Routes>
    <Footer />
    </Router>
  )
}

export default App
