import React, { useState } from 'react';
import { Cpu, Database, Server, Activity, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

export default function Volume5ArchitectureDoc() {
  const [selectedTable, setSelectedTable] = useState('telemetry');

  const tableQueries = {
    telemetry: `SELECT * FROM gps_telemetry WHERE collar_id = 'ESP32-COLLAR-88' ORDER BY timestamp DESC LIMIT 5;`,
    activity: `SELECT activity_type, SUM(duration_seconds) FROM activity_logs WHERE pet_id = 'bruno' GROUP BY activity_type;`,
    alerts: `SELECT * FROM alerts WHERE pet_id = 'bruno' AND is_resolved = false;`
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* System Health Overview */}
      <div className="app-card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Cpu style={{ color: '#818cf8', width: '16px', height: '16px' }} />
          System Telemetry & Health Hub
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>SERVER LATENCY</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399' }}>24 ms</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>STREAM FREQUENCY</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a5b4fc' }}>30 Seconds</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>DATA THROUGHPUT</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>1.2 KB/s</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>UPTIME</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399' }}>99.9%</p>
          </div>
        </div>
      </div>

      {/* Database Query Simulator */}
      <div className="app-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Database style={{ color: '#38bdf8', width: '16px', height: '16px' }} />
            Relational DB Telemetry Explorer
          </h4>

          <div style={{ display: 'flex', gap: '4px' }}>
            {['telemetry', 'activity', 'alerts'].map(tbl => (
              <button
                key={tbl}
                onClick={() => setSelectedTable(tbl)}
                style={{
                  background: selectedTable === tbl ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedTable === tbl ? '#a5b4fc' : 'var(--text-muted)',
                  border: '1px solid var(--border-glass)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.68rem',
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {tbl}
              </button>
            ))}
          </div>
        </div>

        <div className="code-box">
          {tableQueries[selectedTable]}
        </div>
      </div>
    </div>
  );
}
