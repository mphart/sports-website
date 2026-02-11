import { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home'
import StandingsPage from './pages/standings'
import SchedulePage from './pages/schedule'
import TeamsPage from './pages/teams'
import WatchPage from './pages/watch'
import NewsPage from './pages/news'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'

import Header from './components/header'
import Footer from './components/footer'
import { MainPageSection } from './components/section'

function App() {
  const [user, setUser] = useState({})

  const startYear = 2000
  const currYear = new Date().getFullYear()

  const UserContext = createContext({})

  const standingsPaths = []
  for (let i = startYear; i <= currYear + 1; i++) {
    standingsPaths.push(<Route path={i + "/division"} element={<StandingsPage season={i} group="division" />} />)
    standingsPaths.push(<Route path={i + "/conference"} element={<StandingsPage season={i} group="conference" />} />)
    standingsPaths.push(<Route path={i + "/league"} element={<StandingsPage season={i} group="league" />} />)
  }

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/standings">
            <Route index element={<StandingsPage season={currYear} group="conference" />} />
            {standingsPaths.map((standings) => standings)}
          </Route>
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<p>404: Not Found</p>} />
        </Routes>
        <Footer />
      </Router>
    </UserContext.Provider>
  )
}

export default App
