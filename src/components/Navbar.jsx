import React from 'react';
import { ShieldAlert, Cpu, Heart, Activity, Radio, MapPin, Sparkles, LayoutDashboard } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onTriggerSOS, collarOnline }) {
  const tabs = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', title: 'Services & GIS Map', icon: MapPin },
    { id: 'ai', title: 'AI Studio', icon: Sparkles },
    { id: 'collar', title: 'Smart Collar IoT', icon: Radio },
    { id: 'sos', title: 'SOS & Passport', icon: Heart },
    { id: 'analytics', title: 'Analytics', icon: Cpu }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(5, 8, 17, 0.85)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '14px 28px'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)'
          }}>
            <Activity style={{ color: 'white', width: '26px', height: '26px' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800 }} className="gradient-title">PetConnect AI</h1>
              <span className="status-pill status-online" style={{ fontSize: '0.7rem' }}>PRO ECOSYSTEM</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Next-Gen AI + ESP32 Smart Collar Telemetry & Health Platform
            </p>
          </div>
        </div>

        {/* Live ESP32 Status Pill & Emergency SOS Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '8px 16px',
            borderRadius: '999px',
            border: '1px solid var(--border-glass)',
            fontSize: '0.8rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: collarOnline ? '#10b981' : '#f59e0b',
              boxShadow: collarOnline ? '0 0 12px #10b981' : 'none'
            }}></span>
            <span style={{ color: 'var(--text-muted)' }}>ESP32 Stream:</span>
            <strong style={{ color: collarOnline ? '#34d399' : '#fbbf24' }}>
              {collarOnline ? '30s Active' : 'Offline'}
            </strong>
          </div>

          <button 
            onClick={onTriggerSOS}
            className="action-btn-danger"
            style={{ padding: '9px 20px', fontSize: '0.85rem' }}
          >
            <ShieldAlert style={{ width: '18px', height: '18px' }} />
            EMERGENCY SOS
          </button>
        </div>
      </div>

      {/* Modern Navigation Pills */}
      <div style={{
        maxWidth: '1440px',
        margin: '16px auto 0',
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.25))' 
                  : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#a5b4fc' : 'var(--text-muted)',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                padding: '9px 18px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 16px rgba(99, 102, 241, 0.25)' : 'none'
              }}
            >
              <Icon style={{ width: '17px', height: '17px', color: isActive ? '#818cf8' : 'var(--text-dim)' }} />
              {tab.title}
            </button>
          );
        })}
      </div>
    </header>
  );
}
