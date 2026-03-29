import { useState } from 'react';
import { Star, Users, Wrench } from 'lucide-react';
import { TEAMS, TEAM_COLORS, DRIVERS } from '../data/mockData';

export default function Teams() {
  const [favorites, setFavorites] = useState(new Set());
  const [compareA, setCompareA] = useState('');
  const [compareB, setCompareB] = useState('');

  const toggleFav = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const maxPoints = Math.max(...TEAMS.map((t) => t.points));

  const teamA = TEAMS.find((t) => t.name === compareA);
  const teamB = TEAMS.find((t) => t.name === compareB);

  const getTeamDriverPoints = (teamName) =>
    DRIVERS.filter((d) => d.team === teamName).reduce((s, d) => s + d.points, 0);
  const getTeamWins = (teamName) =>
    DRIVERS.filter((d) => d.team === teamName).reduce((s, d) => s + d.wins, 0);
  const getTeamPodiums = (teamName) =>
    DRIVERS.filter((d) => d.team === teamName).reduce((s, d) => s + d.podiums, 0);

  return (
    <div className="slide-up">
      {/* Constructor Standings Table */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Constructor Standings</h2>
        </div>
        <table className="standings-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team</th>
              <th>Drivers</th>
              <th>Power Unit</th>
              <th>Points</th>
              <th style={{ width: 140 }}>Progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...TEAMS]
              .sort((a, b) => a.position - b.position)
              .map((t) => {
                const tc = TEAM_COLORS[t.name] || { primary: '#888' };
                return (
                  <tr key={t.id}>
                    <td>
                      <span className={`pos-badge ${t.position <= 3 ? `p${t.position}` : ''}`}>
                        {t.position}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      <span className="team-color-dot" style={{ background: tc.primary }} />
                      {t.name}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {t.drivers.join(', ')}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{t.powerUnit}</td>
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
                            width: `${(t.points / maxPoints) * 100}%`,
                            background: tc.primary,
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <button
                        className={`fav-btn ${favorites.has(t.id) ? 'active' : ''}`}
                        onClick={() => toggleFav(t.id)}
                      >
                        <Star size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Team Cards Grid */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Team Profiles</h2>
        </div>
        <div className="team-grid stagger">
          {TEAMS.map((t) => {
            const tc = TEAM_COLORS[t.name] || { primary: '#888' };
            return (
              <div key={t.id} className="team-card slide-up">
                <div className="team-stripe-top" style={{ background: tc.primary }} />
                <div className="team-card-header">
                  <div className="team-logo" style={{ background: tc.primary }}>
                    {t.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="team-card-name">{t.name}</div>
                    <div className="team-card-meta">
                      <Wrench size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {t.powerUnit} · {t.base}
                    </div>
                  </div>
                </div>
                <div className="team-card-meta" style={{ marginBottom: 4 }}>
                  <Users size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  Principal: {t.principal}
                </div>
                <div className="team-card-drivers">
                  {t.drivers.map((drv) => (
                    <span key={drv} className="team-driver-chip">{drv}</span>
                  ))}
                </div>
                <div className="team-card-points">
                  <span className="team-points-label">Championship Points</span>
                  <span className="team-points-value" style={{ color: tc.primary }}>
                    {t.points}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Comparison */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Team Comparison</h2>
        </div>
        <div className="compare-select">
          <select value={compareA} onChange={(e) => setCompareA(e.target.value)}>
            <option value="">Select Team A</option>
            {TEAMS.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: 'var(--accent-red)',
            fontSize: '1.1rem',
          }}>VS</span>
          <select value={compareB} onChange={(e) => setCompareB(e.target.value)}>
            <option value="">Select Team B</option>
            {TEAMS.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        {teamA && teamB && (
          <div className="comparison-container">
            <div className="comparison-card">
              <h3 style={{
                textAlign: 'center',
                fontFamily: 'var(--font-display)',
                marginBottom: 16,
                color: TEAM_COLORS[teamA.name]?.primary || '#888',
              }}>
                {teamA.name}
              </h3>
              <div className="comparison-row">
                <span className="comparison-label">Position</span>
                <span className="comparison-value">P{teamA.position}</span>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">Points</span>
                <span className="comparison-value">{teamA.points}</span>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">Wins</span>
                <span className="comparison-value">{getTeamWins(teamA.name)}</span>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">Podiums</span>
                <span className="comparison-value">{getTeamPodiums(teamA.name)}</span>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">Power Unit</span>
                <span className="comparison-value" style={{ fontSize: '0.85rem' }}>{teamA.powerUnit}</span>
              </div>
            </div>

            <div className="comparison-vs">VS</div>

            <div className="comparison-card">
              <h3 style={{
                textAlign: 'center',
                fontFamily: 'var(--font-display)',
                marginBottom: 16,
                color: TEAM_COLORS[teamB.name]?.primary || '#888',
              }}>
                {teamB.name}
              </h3>
              <div className="comparison-row">
                <span className="comparison-label">Position</span>
                <span className="comparison-value">P{teamB.position}</span>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">Points</span>
                <span className="comparison-value">{teamB.points}</span>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">Wins</span>
                <span className="comparison-value">{getTeamWins(teamB.name)}</span>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">Podiums</span>
                <span className="comparison-value">{getTeamPodiums(teamB.name)}</span>
              </div>
              <div className="comparison-row">
                <span className="comparison-label">Power Unit</span>
                <span className="comparison-value" style={{ fontSize: '0.85rem' }}>{teamB.powerUnit}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
