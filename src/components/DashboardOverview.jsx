import React from 'react';
import { Shield, Radio, Activity, Sparkles, CheckCircle2, Zap, Bell, Stethoscope, MapPin, Heart } from 'lucide-react';

export default function DashboardOverview({ petData, collarState, onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Pet Header Profile Card */}
      <div className="app-card" style={{
        background: 'linear-gradient(135deg, rgba(18, 26, 47, 0.95), rgba(30, 41, 70, 0.85))',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            padding: '2px',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'
          }}>
            <img src="/collar_hero.jpg" alt="Bruno" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'white' }}>{petData.name}</h3>
              <span className="status-pill status-online">ESP32 Online</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{petData.breed} • {petData.age} Yrs</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>CHIP: {petData.microchip}</p>
          </div>
        </div>

        {/* Quick Action Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button onClick={() => onNavigate('collar')} className="btn-primary" style={{ justifyContent: 'center' }}>
            <Radio style={{ width: '15px', height: '15px' }} /> GPS Tracker
          </button>
          <button onClick={() => onNavigate('ai')} className="btn-secondary" style={{ justifyContent: 'center' }}>
            <Sparkles style={{ width: '15px', height: '15px', color: '#c084fc' }} /> AI Health Scan
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="app-card" style={{ padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>BATTERY</span>
            <Zap style={{ color: '#10b981', width: '15px', height: '15px' }} />
          </div>
          <h4 style={{ fontSize: '1.4rem', color: '#34d399' }}>{collarState.battery}%</h4>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>30s Active Stream</p>
        </div>

        <div className="app-card" style={{ padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>SAFE ZONE</span>
            <Shield style={{ color: collarState.geofenceBreached ? '#ef4444' : '#6366f1', width: '15px', height: '15px' }} />
          </div>
          <h4 style={{ fontSize: '1.1rem', color: collarState.geofenceBreached ? '#f87171' : '#818cf8' }}>
            {collarState.geofenceBreached ? 'Breached!' : 'Inside 300m'}
          </h4>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Radius: 300m</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity style={{ color: '#c084fc', width: '16px', height: '16px' }} />
          Today's Activity & Motion Stats
        </h4>

        <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>DISTANCE</span>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#a5b4fc' }}>3.2 km</p>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-glass)', borderRight: '1px solid var(--border-glass)', padding: '0 16px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>WALK TIME</span>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#34d399' }}>42 mins</p>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>SLEEP</span>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>9.5 hrs</p>
          </div>
        </div>
      </div>

      {/* Recent Alerts Feed */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Bell style={{ color: '#ec4899', width: '16px', height: '16px' }} />
          Recent Telemetry Log
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { title: "GPS Telemetry Sync", desc: "10.02345 N, 76.34567 E", time: "Just now" },
            { title: "MPU6050 Motion", desc: "Classified as 'Walking'", time: "3m ago" },
            { title: "Geofence Check", desc: "Inside 300m Safe Radius", time: "12m ago" }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.03)',
              padding: '10px 12px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h5 style={{ fontSize: '0.82rem', color: '#f8fafc' }}>{item.title}</h5>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
