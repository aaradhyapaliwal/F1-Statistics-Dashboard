import { useState, useEffect } from 'react';
import {
  Zap,
  Trophy,
  Flag,
  Gauge,
  TrendingUp,
  Timer,
  Circle,
} from 'lucide-react';
import {
  DRIVERS,
  TEAMS,
  CURRENT_RACE,
  HIGHLIGHTS,
  TEAM_COLORS,
} from '../data/mockData';

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false);
  const [currentLap, setCurrentLap] = useState(CURRENT_RACE.lap);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrentLap((prev) => (prev < CURRENT_RACE.totalLaps ? prev + 1 : prev));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!loaded) {
    return (
      <div className="stat-grid stagger">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton skeleton-card slide-up" />
        ))}
      </div>
    );
  }

  const topDrivers = [...DRIVERS].sort((a, b) => a.position - b.position).slice(0, 10);
  const topTeams = [...TEAMS].sort((a, b) => a.position - b.position);
  const maxTeamPoints = Math.max(...topTeams.map((t) => t.points));

  return (
    <div className="slide-up">
      {/* Race Status Banner */}
      <div className="race-status">
        <div>
          <div className="race-name">{CURRENT_RACE.name}</div>
          <div className="race-detail">{CURRENT_RACE.circuit} — {CURRENT_RACE.location}</div>
        </div>
        <div className="race-detail">
          Round {CURRENT_RACE.round}/{CURRENT_RACE.totalRounds}
        </div>
        <span className={`race-flag flag-${CURRENT_RACE.flagStatus.toLowerCase()}`}>
          {CURRENT_RACE.flagStatus} FLAG
        </span>
        <div className="lap-progress">
          <span className="lap-text">Lap {currentLap}/{CURRENT_RACE.totalLaps}</span>
          <div className="lap-bar">
            <div
              className="lap-bar-fill"
              style={{ width: `${(currentLap / CURRENT_RACE.totalLaps) * 100}%` }}
            />
          </div>
        </div>
        <div className="race-detail" style={{ marginLeft: 'auto' }}>
          <span style={{ marginRight: 12 }}>🌤 {CURRENT_RACE.weather} {CURRENT_RACE.temperature}</span>
          <span>Track: {CURRENT_RACE.trackTemp}</span>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="stat-grid stagger">
        <div className="stat-card slide-up">
          <div className="stat-glow" style={{ background: '#a855f7' }} />
          <div className="stat-icon" style={{ background: 'rgba(168,85,247,0.15)' }}>
            <Zap size={20} color="#a855f7" />
          </div>
          <div className="stat-label">Fastest Lap</div>
          <div className="stat-value" style={{ color: '#a855f7' }}>
            {HIGHLIGHTS.fastestDriver.time}
          </div>
          <div className="stat-detail">{HIGHLIGHTS.fastestDriver.name}</div>
        </div>

        <div className="stat-card slide-up">
          <div className="stat-glow" style={{ background: '#00d4ff' }} />
          <div className="stat-icon" style={{ background: 'rgba(0,212,255,0.15)' }}>
            <Circle size={20} color="#00d4ff" />
          </div>
          <div className="stat-label">Tire Strategy</div>
          <div className="stat-value" style={{ color: '#00d4ff' }}>
            {HIGHLIGHTS.tireStrategy.soft + HIGHLIGHTS.tireStrategy.medium + HIGHLIGHTS.tireStrategy.hard}
          </div>
          <div className="stat-detail">
            <span style={{ color: '#FF3333' }}>S:{HIGHLIGHTS.tireStrategy.soft}</span>
            {' · '}
            <span style={{ color: '#FFD700' }}>M:{HIGHLIGHTS.tireStrategy.medium}</span>
            {' · '}
            <span>H:{HIGHLIGHTS.tireStrategy.hard}</span>
          </div>
        </div>

        <div className="stat-card slide-up">
          <div className="stat-glow" style={{ background: '#ff8c00' }} />
          <div className="stat-icon" style={{ background: 'rgba(255,140,0,0.15)' }}>
            <Gauge size={20} color="#ff8c00" />
          </div>
          <div className="stat-label">Pit Stops</div>
          <div className="stat-value" style={{ color: '#ff8c00' }}>
            {HIGHLIGHTS.pitStops.total}
          </div>
          <div className="stat-detail">
            Avg {HIGHLIGHTS.pitStops.avgTime} · Fastest {HIGHLIGHTS.pitStops.fastestStop.time}
          </div>
        </div>

        <div className="stat-card slide-up">
          <div className="stat-glow" style={{ background: '#00e676' }} />
          <div className="stat-icon" style={{ background: 'rgba(0,230,118,0.15)' }}>
            <Flag size={20} color="#00e676" />
          </div>
          <div className="stat-label">DRS Zones</div>
          <div className="stat-value" style={{ color: '#00e676' }}>
            {HIGHLIGHTS.drsZones}
          </div>
          <div className="stat-detail">Active detection zones</div>
        </div>
      </div>

      {/* Two-column: Driver Standings + Constructor Standings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Driver Standings Top 10 */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Driver Standings</h2>
            <span className="race-detail">Top 10</span>
          </div>
          <table className="standings-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {topDrivers.map((d) => {
                const tc = TEAM_COLORS[d.team] || { primary: '#888' };
                return (
                  <tr key={d.id}>
                    <td>
                      <span
                        className={`pos-badge ${d.position <= 3 ? `p${d.position}` : ''}`}
                      >
                        {d.position}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      <span className="team-color-dot" style={{ background: tc.primary }} />
                      {d.firstName} <strong>{d.lastName.toUpperCase()}</strong>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {d.team}
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                        {d.points}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Constructor Standings */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Constructor Standings</h2>
          </div>
          <table className="standings-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>Points</th>
                <th style={{ width: 120 }}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {topTeams.map((t) => {
                const tc = TEAM_COLORS[t.name] || { primary: '#888' };
                return (
                  <tr key={t.id}>
                    <td>
                      <span
                        className={`pos-badge ${t.position <= 3 ? `p${t.position}` : ''}`}
                      >
                        {t.position}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      <span className="team-color-dot" style={{ background: tc.primary }} />
                      {t.name}
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                        {t.points}
                      </span>
                    </td>
                    <td>
                      <div className="points-bar">
                        <div
                          className="points-bar-fill"
                          style={{
                            width: `${(t.points / maxTeamPoints) * 100}%`,
                            background: tc.primary,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
