import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';
import Teams from './pages/Teams';
import LiveTiming from './pages/LiveTiming';
import RaceAnalytics from './pages/RaceAnalytics';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/live" element={<LiveTiming />} />
          <Route path="/analytics" element={<RaceAnalytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
