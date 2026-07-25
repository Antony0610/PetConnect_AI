import React from 'react';
import { ShieldAlert, Cpu, Heart, Activity, Radio, MapPin, Sparkles } from 'lucide-react';

export default function Navbar({ activeVolume, setActiveVolume, onTriggerSOS, collarOnline }) {
  const volumes = [
    { id: 1, title: "Vol 1: Core Ecosystem", icon: MapPin },
    { id: 2, title: "Vol 2: AI & CV Suite", icon: Sparkles },
    { id: 3, title: "Vol 3: Smart Pet Collar (IoT)", icon: Radio },
    { id: 4, title: "Vol 4: SOS & QR Passport", icon: Heart },
    { id: 5, title: "Vol 5: Master Architecture", icon: Cpu }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 9, 19, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
          }}>
            <Activity style={{ color: 'white', width: '24px', height: '24px' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }} className="gradient-text">PetConnect AI</h1>
              <span className="badge badge-primary">5-Volume Edition</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Integrated AI + IoT Smart Pet Platform & Collar Ecosystem
            </p>
          </div>
        </div>

        {/* Status Indicators & SOS Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid var(--border-light)',
            fontSize: '0.8rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: collarOnline ? '#10b981' : '#f59e0b',
              boxShadow: collarOnline ? '0 0 10px #10b981' : 'none'
            }}></span>
            <span style={{ color: 'var(--text-muted)' }}>ESP32 Collar:</span>
            <strong style={{ color: collarOnline ? '#34d399' : '#fbbf24' }}>
              {collarOnline ? 'Online (30s Stream)' : 'Simulating'}
            </strong>
          </div>

          <button 
            onClick={onTriggerSOS}
            className="btn-danger"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <ShieldAlert style={{ width: '18px', height: '18px' }} />
            EMERGENCY SOS
          </button>
        </div>
      </div>

      {/* Volume Tabs */}
      <div style={{
        maxWidth: '1400px',
        margin: '14px auto 0',
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {volumes.map((vol) => {
          const Icon = vol.icon;
          const isActive = activeVolume === vol.id;
          return (
            <button
              key={vol.id}
              onClick={() => setActiveVolume(vol.id)}
              style={{
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.25))' 
                  : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#a5b4fc' : 'var(--text-muted)',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.2)' : 'none'
              }}
            >
              <Icon style={{ width: '16px', height: '16px', color: isActive ? '#818cf8' : 'var(--text-dim)' }} />
              {vol.title}
            </button>
          );
        })}
      </div>
    </header>
  );
}
