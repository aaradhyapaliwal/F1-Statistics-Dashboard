import { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Clock, Circle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import {
  generateLapData,
  TIRE_STRATEGY,
  PIT_STOPS,
  TEAM_COLORS,
} from '../data/mockData';

const DRIVER_COLORS = {
  VER: '#3671C6',
  NOR: '#FF8000',
  LEC: '#E8002D',
  SAI: '#E8002D',
  HAM: '#27F4D2',
};

export default function RaceAnalytics() {
  const lapData = useMemo(() => generateLapData(), []);
  const [selectedDrivers, setSelectedDrivers] = useState(['VER', 'NOR', 'LEC']);

  const toggleDriver = (drv) => {
    setSelectedDrivers((prev) =>
      prev.includes(drv) ? prev.filter((d) => d !== drv) : [...prev, drv]
    );
  };

  const pitChartData = PIT_STOPS.map((p) => ({
    ...p,
    label: `${p.driver} (Lap ${p.lap})`,
    z: p.duration * 20,
  }));

  return (
    <div className="slide-up">
      {/* Lap Time Chart */}
      <div className="chart-card">
        <h3>
          <TrendingUp size={16} /> Lap Time vs Lap Number
        </h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {Object.keys(DRIVER_COLORS).map((drv) => (
            <button
              key={drv}
              className={`filter-btn ${selectedDrivers.includes(drv) ? 'active' : ''}`}
              style={{
                borderColor: selectedDrivers.includes(drv)
                  ? DRIVER_COLORS[drv]
                  : 'var(--border-color)',
                background: selectedDrivers.includes(drv)
                  ? DRIVER_COLORS[drv]
                  : 'var(--bg-input)',
                color: selectedDrivers.includes(drv) ? '#fff' : 'var(--text-secondary)',
              }}
              onClick={() => toggleDriver(drv)}
            >
              {drv}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={lapData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="lap"
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              label={{ value: 'Lap', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)', fontSize: 12 }}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              label={{ value: 'Time (s)', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                fontSize: 12,
                backdropFilter: 'blur(10px)',
              }}
            />
            <Legend />
            {selectedDrivers.map((drv) => (
              <Line
                key={drv}
                type="monotone"
                dataKey={drv}
                stroke={DRIVER_COLORS[drv] || '#888'}
                strokeWidth={2}
                dot={false}
                animationDuration={1200}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tire Strategy */}
      <div className="chart-card">
        <h3>
          <Circle size={16} /> Tire Strategy
        </h3>
        <div className="tire-viz">
          {TIRE_STRATEGY.map((entry) => (
            <div key={entry.driver} className="tire-viz-row">
              <span className="tire-viz-driver">{entry.driver}</span>
              <div className="tire-viz-bar">
                {entry.stints.map((stint, i) => {
                  const totalLaps = 52;
                  const width = ((stint.endLap - stint.startLap + 1) / totalLaps) * 100;
                  return (
                    <div
                      key={i}
                      className="tire-viz-stint"
                      style={{
                        width: `${width}%`,
                        background: stint.color,
                      }}
                      title={`${stint.tire} compound — Lap ${stint.startLap}-${stint.endLap}`}
                    >
                      {stint.tire} ({stint.startLap}-{stint.endLap})
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          display: 'flex',
          gap: 16,
          marginTop: 16,
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          fontWeight: 600,
        }}>
          <span>
            <span style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              background: '#FF3333',
              borderRadius: 2,
              marginRight: 4,
              verticalAlign: 'middle',
            }} />
            Soft
          </span>
          <span>
            <span style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              background: '#FFD700',
              borderRadius: 2,
              marginRight: 4,
              verticalAlign: 'middle',
            }} />
            Medium
          </span>
          <span>
            <span style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              background: '#FFFFFF',
              borderRadius: 2,
              marginRight: 4,
              verticalAlign: 'middle',
            }} />
            Hard
          </span>
        </div>
      </div>

      {/* Pit Stop Timeline */}
      <div className="chart-card">
        <h3>
          <Clock size={16} /> Pit Stop Timeline
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="lap"
              name="Lap"
              type="number"
              domain={[0, 55]}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              label={{ value: 'Lap', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)', fontSize: 12 }}
            />
            <YAxis
              dataKey="duration"
              name="Duration"
              unit="s"
              domain={[1.5, 3]}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              label={{ value: 'Duration (s)', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 12 }}
            />
            <ZAxis dataKey="z" range={[60, 200]} />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value, name) => {
                if (name === 'Duration') return [`${value}s`, name];
                return [value, name];
              }}
              labelFormatter={(val) => `Lap ${val}`}
            />
            <Scatter
              data={pitChartData}
              fill="#e10600"
              shape="circle"
              animationDuration={1000}
            />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Pit Stop Details Table */}
        <div style={{ marginTop: 16 }}>
          <table className="standings-table" style={{ fontSize: '0.82rem' }}>
            <thead>
              <tr>
                <th>Lap</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {PIT_STOPS.map((p, i) => {
                const tc = TEAM_COLORS[p.team] || { primary: '#888' };
                return (
                  <tr key={i}>
                    <td style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      {p.lap}
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      <span className="team-color-dot" style={{ background: tc.primary }} />
                      {p.driver}
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{p.team}</td>
                    <td>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: p.duration <= 2.0 ? '#a855f7' : p.duration <= 2.3 ? '#00e676' : 'var(--text-primary)',
                      }}>
                        {p.duration}s
                      </span>
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
