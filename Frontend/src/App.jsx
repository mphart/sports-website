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
  const startYear = 2000
  const currYear = new Date().getFullYear()

  const standingsPaths = []
  for(let i = startYear; i <= currYear+1; i++){
    standingsPaths.push(<Route path={i+"/division"} element={<StandingsPage year={i} group="division" />} />)
    standingsPaths.push(<Route path={i+"/conference"} element={<StandingsPage year={i} group="conference" />} />)
    standingsPaths.push(<Route path={i+"/league"} element={<StandingsPage year={i} group="league" />} />)
  }

  return (
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/standings">
          <Route index element={<StandingsPage year={currYear} group="conference" />} />
          {standingsPaths.map((standings) => standings)}
        </Route>

        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/news" element={<NewsPage />} />

        <Route path="*" element={<p>404: Not Found</p>} />
      </Routes>
    <Footer />
    </Router>
  )
}

export default App
