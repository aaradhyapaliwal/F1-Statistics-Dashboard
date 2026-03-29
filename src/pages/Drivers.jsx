import { useState, useMemo } from 'react';
import {
  Search,
  Star,
  X,
  Trophy,
  Award,
  Target,
  Zap,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { DRIVERS, TEAM_COLORS, RACE_HISTORY } from '../data/mockData';

export default function Drivers() {
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('All');
  const [sortBy, setSortBy] = useState('position');
  const [favorites, setFavorites] = useState(new Set());
  const [selectedDriver, setSelectedDriver] = useState(null);

  const teams = ['All', ...new Set(DRIVERS.map((d) => d.team))];

  const filtered = useMemo(() => {
    let list = [...DRIVERS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.firstName.toLowerCase().includes(q) ||
          d.lastName.toLowerCase().includes(q) ||
          d.team.toLowerCase().includes(q)
      );
    }
    if (teamFilter !== 'All') {
      list = list.filter((d) => d.team === teamFilter);
    }
    list.sort((a, b) => {
      if (sortBy === 'position') return a.position - b.position;
      if (sortBy === 'points') return b.points - a.points;
      if (sortBy === 'name') return a.lastName.localeCompare(b.lastName);
      return 0;
    });
    return list;
  }, [search, teamFilter, sortBy]);

  const toggleFav = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Generate mock lap time trend per driver
  const lapTimeTrend = useMemo(() => {
    if (!selectedDriver) return [];
    const data = [];
    for (let i = 1; i <= 20; i++) {
      data.push({
        lap: i,
        time: +(72 + Math.random() * 3 + (i === 1 ? 4 : 0)).toFixed(3),
      });
    }
    return data;
  }, [selectedDriver]);

  return (
    <div className="slide-up">
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-box" style={{ minWidth: 220 }}>
          <Search size={16} />
          <input
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {teams.map((t) => (
            <button
              key={t}
              className={`filter-btn ${teamFilter === t ? 'active' : ''}`}
              onClick={() => setTeamFilter(t)}
            >
              {t === 'All' ? 'All Teams' : t}
            </button>
          ))}
        </div>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginLeft: 'auto' }}
        >
          <option value="position">Sort: Position</option>
          <option value="points">Sort: Points</option>
          <option value="name">Sort: Name</option>
        </select>
      </div>

      {/* Driver Grid */}
      <div className="driver-grid stagger">
        {filtered.map((d) => {
          const tc = TEAM_COLORS[d.team] || { primary: '#888' };
          return (
            <div
              key={d.id}
              className="driver-card slide-up"
              onClick={() => setSelectedDriver(d)}
            >
              <div className="team-stripe" style={{ background: tc.primary }} />
              <div className="driver-card-top">
                <div
                  className="driver-avatar"
                  style={{ background: tc.primary, color: tc.secondary || '#fff' }}
                >
                  {d.number}
                </div>
                <div className="driver-info">
                  <h3>
                    <span>{d.firstName} </span>
                    {d.lastName.toUpperCase()}
                  </h3>
                  <div className="team-name">{d.team}</div>
                </div>
                <span className="driver-position">P{d.position}</span>
              </div>
              <div className="driver-stats">
                <div className="driver-stat">
                  <div className="label">Points</div>
                  <div className="value">{d.points}</div>
                </div>
                <div className="driver-stat">
                  <div className="label">Wins</div>
                  <div className="value">{d.wins}</div>
                </div>
                <div className="driver-stat">
                  <div className="label">Podiums</div>
                  <div className="value">{d.podiums}</div>
                </div>
                <div className="driver-stat">
                  <div className="label">Poles</div>
                  <div className="value">{d.poles}</div>
                </div>
              </div>
              <div className="driver-card-actions">
                <span
                  style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                >
                  {d.country}
                </span>
                <button
                  className={`fav-btn ${favorites.has(d.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(d.id);
                  }}
                >
                  <Star size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Driver Detail Modal */}
      {selectedDriver && (
        <div className="modal-overlay" onClick={() => setSelectedDriver(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  className="driver-avatar"
                  style={{
                    background:
                      TEAM_COLORS[selectedDriver.team]?.primary || '#888',
                    width: 48,
                    height: 48,
                    fontSize: '1rem',
                  }}
                >
                  {selectedDriver.number}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                    {selectedDriver.firstName}{' '}
                    {selectedDriver.lastName.toUpperCase()}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {selectedDriver.team} · #{selectedDriver.number} ·{' '}
                    {selectedDriver.country}
                  </p>
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedDriver(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {/* Stats */}
              <div className="stat-grid" style={{ marginBottom: 24 }}>
                <div
                  className="stat-card"
                  style={{ padding: 16, textAlign: 'center' }}
                >
                  <Trophy size={20} color="#FFD700" />
                  <div
                    className="stat-value"
                    style={{ fontSize: '1.5rem', marginTop: 4 }}
                  >
                    {selectedDriver.wins}
                  </div>
                  <div className="stat-label">Wins</div>
                </div>
                <div
                  className="stat-card"
                  style={{ padding: 16, textAlign: 'center' }}
                >
                  <Award size={20} color="#C0C0C0" />
                  <div
                    className="stat-value"
                    style={{ fontSize: '1.5rem', marginTop: 4 }}
                  >
                    {selectedDriver.podiums}
                  </div>
                  <div className="stat-label">Podiums</div>
                </div>
                <div
                  className="stat-card"
                  style={{ padding: 16, textAlign: 'center' }}
                >
                  <Target size={20} color="#e10600" />
                  <div
                    className="stat-value"
                    style={{ fontSize: '1.5rem', marginTop: 4 }}
                  >
                    {selectedDriver.poles}
                  </div>
                  <div className="stat-label">Poles</div>
                </div>
                <div
                  className="stat-card"
                  style={{ padding: 16, textAlign: 'center' }}
                >
                  <Zap size={20} color="#a855f7" />
                  <div
                    className="stat-value"
                    style={{ fontSize: '1.5rem', marginTop: 4 }}
                  >
                    {selectedDriver.fastestLaps}
                  </div>
                  <div className="stat-label">Fastest Laps</div>
                </div>
              </div>

              {/* Race History Chart */}
              <div className="chart-card">
                <h3>
                  <Trophy size={16} /> Race History (2025)
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={RACE_HISTORY}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.06)"
                    />
                    <XAxis
                      dataKey="race"
                      tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                    />
                    <YAxis
                      reversed
                      domain={[1, 20]}
                      tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Bar
                      dataKey="position"
                      fill={
                        TEAM_COLORS[selectedDriver.team]?.primary || '#e10600'
                      }
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Lap Time Trend */}
              <div className="chart-card">
                <h3>
                  <Zap size={16} /> Lap Time Trend (Last Race)
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={lapTimeTrend}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.06)"
                    />
                    <XAxis
                      dataKey="lap"
                      tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                    />
                    <YAxis
                      domain={['auto', 'auto']}
                      tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke={
                        TEAM_COLORS[selectedDriver.team]?.primary || '#e10600'
                      }
                      strokeWidth={2}
                      dot={false}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
