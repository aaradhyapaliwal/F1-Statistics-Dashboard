import { useState, useEffect, useRef } from 'react';
import { Radio, Clock, Zap } from 'lucide-react';
import { LIVE_TIMING, TEAM_COLORS, CURRENT_RACE } from '../data/mockData';

export default function LiveTiming() {
  const [data, setData] = useState(LIVE_TIMING);
  const [flashRows, setFlashRows] = useState(new Set());
  const [currentLap, setCurrentLap] = useState(CURRENT_RACE.lap);
  const intervalRef = useRef(null);

  // Simulate live updates every few seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setData((prev) => {
        const updated = prev.map((row) => {
          // randomly fluctuate lap times
          const s1 = +(row.s1 + (Math.random() - 0.5) * 0.3).toFixed(3);
          const s2 = +(row.s2 + (Math.random() - 0.5) * 0.3).toFixed(3);
          const s3 = +(row.s3 + (Math.random() - 0.5) * 0.2).toFixed(3);
          const lastLap = `1:${(s1 + s2 + s3 - 4).toFixed(3)}`;
          return { ...row, s1, s2, s3, lastLap };
        });

        // Occasionally swap two adjacent positions
        if (Math.random() > 0.7) {
          const idx = Math.floor(Math.random() * (updated.length - 1));
          const tmp = { ...updated[idx] };
          updated[idx] = { ...updated[idx + 1], pos: tmp.pos };
          updated[idx + 1] = { ...tmp, pos: updated[idx + 1].pos };
          setFlashRows(new Set([updated[idx].driver, updated[idx + 1].driver]));
          setTimeout(() => setFlashRows(new Set()), 600);
        }

        return updated;
      });

      setCurrentLap((prev) => (prev < CURRENT_RACE.totalLaps ? prev + 1 : prev));
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const getSectorClass = (time, best, overall) => {
    if (time <= overall) return 'sector-purple';
    if (time <= best) return 'sector-green';
    return 'sector-yellow';
  };

  // Compute bests for color coding
  const bestS1 = Math.min(...data.map((d) => d.s1));
  const bestS2 = Math.min(...data.map((d) => d.s2));
  const bestS3 = Math.min(...data.map((d) => d.s3));
  const overallS1 = bestS1 * 0.999;
  const overallS2 = bestS2 * 0.999;
  const overallS3 = bestS3 * 0.999;

  return (
    <div className="slide-up">
      {/* Live Status Bar */}
      <div className="race-status" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Radio size={16} color="#e10600" />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#e10600',
          }}>
            LIVE
          </span>
        </div>
        <div className="race-name">{CURRENT_RACE.name}</div>
        <span className={`race-flag flag-${CURRENT_RACE.flagStatus.toLowerCase()}`}>
          {CURRENT_RACE.flagStatus}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
          <Clock size={14} color="var(--text-muted)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Auto-refreshing every 4s
          </span>
        </div>
      </div>

      {/* Timing Legend */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginBottom: 12,
        fontSize: '0.72rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>
        <span><span className="sector sector-purple" style={{ marginRight: 4 }}>■</span> Overall Best</span>
        <span><span className="sector sector-green" style={{ marginRight: 4 }}>■</span> Personal Best</span>
        <span><span className="sector sector-yellow" style={{ marginRight: 4 }}>■</span> Normal</span>
        <span style={{ marginLeft: 16 }}>
          <span className="tire-badge tire-S" style={{ width: 18, height: 18, fontSize: '0.6rem', display: 'inline-flex' }}>S</span> Soft
          {' '}
          <span className="tire-badge tire-M" style={{ width: 18, height: 18, fontSize: '0.6rem', display: 'inline-flex' }}>M</span> Medium
          {' '}
          <span className="tire-badge tire-H" style={{ width: 18, height: 18, fontSize: '0.6rem', display: 'inline-flex' }}>H</span> Hard
        </span>
      </div>

      {/* Timing Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="timing-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Team</th>
              <th>Gap</th>
              <th>Interval</th>
              <th>Last Lap</th>
              <th>S1</th>
              <th>S2</th>
              <th>S3</th>
              <th>Tire</th>
              <th>Age</th>
              <th>DRS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const tc = TEAM_COLORS[row.team] || { primary: '#888' };
              return (
                <tr
                  key={row.driver}
                  className={flashRows.has(row.driver) ? 'timing-flash' : ''}
                >
                  <td>
                    <span className={`pos-badge ${row.pos <= 3 ? `p${row.pos}` : ''}`}>
                      {row.pos}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>
                    <span className="team-color-dot" style={{ background: tc.primary }} />
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem' }}>
                      {row.driver}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    {row.team}
                  </td>
                  <td>
                    <span className="gap-value">{row.gap}</span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.interval}</td>
                  <td style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 600 }}>
                    {row.lastLap}
                  </td>
                  <td>
                    <span className={`sector ${getSectorClass(row.s1, bestS1, overallS1)}`}>
                      {row.s1.toFixed(3)}
                    </span>
                  </td>
                  <td>
                    <span className={`sector ${getSectorClass(row.s2, bestS2, overallS2)}`}>
                      {row.s2.toFixed(3)}
                    </span>
                  </td>
                  <td>
                    <span className={`sector ${getSectorClass(row.s3, bestS3, overallS3)}`}>
                      {row.s3.toFixed(3)}
                    </span>
                  </td>
                  <td>
                    <span className={`tire-badge tire-${row.tire}`}>{row.tire}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {row.tireAge}L
                  </td>
                  <td>
                    {row.drs && <span className="drs-active">DRS</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
