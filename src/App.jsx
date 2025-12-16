import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import SelectRoute from './pages/SelectRoute'
import LiveTracking from './pages/LiveTracking'
import RoutesPage from './pages/Routes'
import Support from './pages/Support'
import Complaints from './pages/Complaints'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<SelectRoute />} />
            <Route path="/live-tracking" element={<LiveTracking />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="/complaints" element={<Complaints />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
