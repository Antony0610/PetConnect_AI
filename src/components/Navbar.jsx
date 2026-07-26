import React from 'react';
import { Activity, ShieldAlert, Lock, LogOut } from 'lucide-react';

export default function Navbar({ 
  currentRole, 
  onLockRole, 
  activeTab, 
  setActiveTab,
  onOpenSosModal
}) {
  return (
    <div style={{ background: 'rgba(8, 12, 24, 0.95)', borderBottom: '1px solid var(--border-glass)', padding: '10px 14px', backdropFilter: 'blur(20px)' }}>
      {/* Top Header Bar matching user's design image */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        {/* Left: Brand Logo & Subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #6366f1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'white' }}>
            <Activity style={{ width: '16px', height: '16px', margin: 'auto' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <strong style={{ fontSize: '0.92rem', color: '#f8fafc', fontWeight: 800, letterSpacing: '-0.02em' }}>PetConnect AI</strong>
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '1px 6px', borderRadius: '999px', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                PRO ECOSYSTEM
              </span>
            </div>
            <p style={{ fontSize: '0.58rem', color: 'var(--text-dim)', fontWeight: 500 }}>Next-Gen AI + ESP32 Telemetry &amp; Health</p>
          </div>
        </div>

        {/* Right: ESP32 Stream Status & SOS Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '3px 8px', borderRadius: '999px', fontSize: '0.62rem', fontWeight: 700 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }}></span>
            ESP32 Stream Active
          </span>
          <button 
            onClick={onOpenSosModal}
            className="btn-sos" 
            style={{ padding: '4px 10px', fontSize: '0.65rem', borderRadius: '8px' }}
          >
            <ShieldAlert style={{ width: '12px', height: '12px' }} /> SOS
          </button>
        </div>
      </div>

      {/* Role Session Lock Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '5px 10px', borderRadius: '10px', marginTop: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Lock style={{ width: '12px', height: '12px', color: '#a5b4fc' }} />
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Session Locked: <strong style={{ color: '#f8fafc' }}>{currentRole}</strong></span>
        </div>
        <button 
          onClick={onLockRole}
          style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.35)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.62rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <LogOut style={{ width: '10px', height: '10px' }} /> Lock &amp; Switch Role
        </button>
      </div>
    </div>
  );
}
