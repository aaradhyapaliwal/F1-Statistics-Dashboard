import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Timer,
  BarChart3,
  Sun,
  Moon,
  Bell,
  Search,
  Menu,
  X,
  Flag,
} from 'lucide-react';
import { RACE_EVENTS } from '../data/mockData';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/drivers', label: 'Drivers', icon: Users },
  { path: '/teams', label: 'Teams', icon: Building2 },
  { path: '/live', label: 'Live Timing', icon: Timer },
  { path: '/analytics', label: 'Race Analytics', icon: BarChart3 },
];

export default function Layout({ children }) {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Simulate race event notifications
  useEffect(() => {
    const idx = Math.floor(Math.random() * RACE_EVENTS.length);
    const timer = setTimeout(() => {
      const evt = RACE_EVENTS[idx];
      setNotifications((prev) => [{ ...evt, id: Date.now() }, ...prev].slice(0, 5));
    }, 3000);
    const interval = setInterval(() => {
      const i = Math.floor(Math.random() * RACE_EVENTS.length);
      const evt = RACE_EVENTS[i];
      setNotifications((prev) => [{ ...evt, id: Date.now() }, ...prev].slice(0, 5));
    }, 15000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const pageTitles = {
    '/': { title: 'DASHBOARD', sub: 'Monaco Grand Prix — Race Control' },
    '/drivers': { title: 'DRIVERS', sub: '2025 Season — All Drivers' },
    '/teams': { title: 'CONSTRUCTORS', sub: '2025 Season — Team Standings' },
    '/live': { title: 'LIVE TIMING', sub: 'Real-time Race Data' },
    '/analytics': { title: 'RACE ANALYTICS', sub: 'Performance & Strategy' },
  };

  const current = pageTitles[location.pathname] || pageTitles['/'];

  return (
    <div className="app-layout">
      {/* Sidebar Overlay for mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Flag size={22} color="#e10600" />
          <span className="sidebar-logo">F1 HQ</span>
          <span className="sidebar-badge">LIVE</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="theme-toggle" onClick={toggleTheme}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
            <div className={`theme-switch ${theme === 'light' ? 'active' : ''}`} />
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-content">
        <header className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button className="mobile-burger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h1 className="page-title">{current.title}</h1>
              <p className="page-subtitle">{current.sub}</p>
            </div>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <Search size={16} />
              <input placeholder="Search drivers, teams..." />
            </div>
            <button
              className="icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={18} />
              {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
            </button>
          </div>
        </header>

        <div className="page-content fade-in" key={location.pathname}>
          {children}
        </div>
      </main>

      {/* Notification Banner */}
      {showNotifications && notifications.length > 0 && (
        <div className="notification-banner">
          {notifications.slice(0, 3).map((n, i) => (
            <div key={n.id + '-' + i} className="notification">
              <div
                className="notification-icon"
                style={{
                  background:
                    n.type === 'flag'
                      ? 'rgba(0,230,118,0.15)'
                      : n.type === 'fastest'
                      ? 'rgba(168,85,247,0.15)'
                      : n.type === 'pitstop'
                      ? 'rgba(0,212,255,0.15)'
                      : 'rgba(255,140,0,0.15)',
                }}
              >
                {n.type === 'flag' ? (
                  <Flag size={16} color="#00e676" />
                ) : n.type === 'fastest' ? (
                  <Timer size={16} color="#a855f7" />
                ) : (
                  <BarChart3 size={16} color="#00d4ff" />
                )}
              </div>
              <span className="notification-text">{n.message}</span>
              <span className="notification-time">{n.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
