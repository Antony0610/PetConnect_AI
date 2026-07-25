import React from 'react';
import { Shield, Radio, Activity, Heart, Sparkles, MapPin, Award, CheckCircle2, ArrowUpRight, Zap, Bell, Stethoscope } from 'lucide-react';

export default function DashboardOverview({ petData, collarState, onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Hero Welcome Banner */}
      <div className="glass-panel" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(13, 19, 35, 0.95), rgba(30, 41, 69, 0.85))',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'center'
      }}>
        <div>
          <div className="status-pill status-online" style={{ marginBottom: '14px' }}>
            <Activity style={{ width: '13px', height: '13px' }} /> ALL SYSTEMS ACTIVE
          </div>
          <h2 style={{ fontSize: '2.2rem', lineHeight: '1.2', marginBottom: '12px' }} className="gradient-title">
            Welcome back to {petData.name}'s Command Center
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6' }}>
            Live ESP32 telemetry streaming active. Computer vision AI, geofencing, 
            and Emergency SOS systems are armed and protecting Bruno.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('collar')} className="action-btn-primary">
              <Radio style={{ width: '18px', height: '18px' }} /> Live GPS Tracker
            </button>
            <button onClick={() => onNavigate('ai')} className="action-btn-secondary">
              <Sparkles style={{ width: '18px', height: '18px', color: '#c084fc' }} /> AI Health Scanner
            </button>
          </div>
        </div>

        {/* Hero Photo Card */}
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          height: '240px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          <img src="/collar_hero.jpg" alt="Bruno" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 30%, rgba(5, 8, 17, 0.95) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'white' }}>{petData.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{petData.breed} • {petData.age} Years</p>
              </div>
              <span className="status-pill status-online">ESP32 Paired</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>COLLAR BATTERY</span>
            <Zap style={{ color: '#10b981', width: '18px', height: '18px' }} />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#34d399' }}>{collarState.battery}%</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Estimated 48h remaining</p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>TODAY'S ACTIVITY</span>
            <Activity style={{ color: '#c084fc', width: '18px', height: '18px' }} />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#a5b4fc' }}>3.2 km</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>42 mins Walk • 12 mins Run</p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>SAFE ZONE STATUS</span>
            <Shield style={{ color: collarState.geofenceBreached ? '#ef4444' : '#6366f1', width: '18px', height: '18px' }} />
          </div>
          <h3 style={{ fontSize: '1.4rem', color: collarState.geofenceBreached ? '#f87171' : '#818cf8' }}>
            {collarState.geofenceBreached ? 'Zone Breach' : 'Inside Radius'}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Safe Radius: 300 meters</p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>VACCINATION PASSPORT</span>
            <CheckCircle2 style={{ color: '#10b981', width: '18px', height: '18px' }} />
          </div>
          <h3 style={{ fontSize: '1.4rem', color: '#f8fafc' }}>Up to Date</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Rabies valid until 2027</p>
        </div>
      </div>

      {/* Main Grid: Pet Profile Card + Recent Events Stream */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Profile Card */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield style={{ color: '#818cf8', width: '22px', height: '22px' }} />
            Pet Identity & Technical Credentials
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Microchip Serial ID</span>
              <strong style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{petData.microchip}</strong>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Paired Collar Device</span>
              <strong style={{ color: '#a5b4fc', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{petData.collarId}</strong>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Primary Veterinary Clinic</span>
              <strong style={{ color: '#f8fafc', fontSize: '0.85rem' }}>Dr. Sarah Jenkins (Metro ER)</strong>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '14px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Emergency Contact</span>
              <strong style={{ color: '#34d399', fontSize: '0.85rem' }}>+1 (555) 0192-900</strong>
            </div>
          </div>
        </div>

        {/* Activity Stream */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell style={{ color: '#ec4899', width: '22px', height: '22px' }} />
            Live System & Telemetry Log
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { title: "GPS Telemetry Sync", desc: "ESP32 streamed packet [10.02345 N, 76.34567 E]", time: "Just now", type: "info" },
              { title: "AI Motion Classification", desc: "MPU6050 accelerometer vector classified as 'Walking'", time: "3 mins ago", type: "success" },
              { title: "Geofence Check Passed", desc: "Bruno remains inside designated 300m Home Radius", time: "12 mins ago", type: "info" },
              { title: "Routine Health Scan", desc: "AI Vision Scanner verified clear skin & eyes (96.4%)", time: "1 hour ago", type: "success" }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.025)',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '1px solid var(--border-glass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: '#f8fafc' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
