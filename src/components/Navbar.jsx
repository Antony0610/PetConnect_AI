import React from 'react';
import { ShieldAlert, Cpu, Heart, Activity, Radio, MapPin, Sparkles, LayoutDashboard, UserCheck, Stethoscope, Users, Shield } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, activeRole, setActiveRole, onTriggerSOS, collarOnline }) {
  const tabs = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'collar', title: 'GPS Collar', icon: Radio },
    { id: 'ai', title: 'AI Studio', icon: Sparkles },
    { id: 'services', title: 'Services', icon: MapPin },
    { id: 'sos', title: 'SOS & Passport', icon: Heart },
    { id: 'role_view', title: `${activeRole.toUpperCase()} View`, icon: UserCheck }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(5, 8, 17, 0.85)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '12px 20px'
    }}>
      {/* Top Brand & Role Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Activity style={{ width: '18px', height: '18px' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white', lineHeight: '1' }}>PetConnect AI</h1>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>RBAC Multi-Role Ecosystem</span>
          </div>
        </div>

        {/* Role Selector Dropdown */}
        <select
          value={activeRole}
          onChange={(e) => {
            setActiveRole(e.target.value);
            setActiveTab('role_view');
          }}
          style={{
            background: 'rgba(99, 102, 241, 0.2)',
            color: '#a5b4fc',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            borderRadius: '10px',
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: 700,
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="owner">🐶 Role: Pet Owner</option>
          <option value="vet">🩺 Role: Veterinarian</option>
          <option value="volunteer">🦺 Role: Rescue Volunteer</option>
          <option value="admin">🛡️ Role: Administrator</option>
        </select>
      </div>

      {/* Navigation Bar Pills */}
      <div style={{
        display: 'flex',
        gap: '6px',
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
                flex: 1,
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))' 
                  : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#a5b4fc' : 'var(--text-muted)',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                padding: '6px 8px',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon style={{ width: '14px', height: '14px', color: isActive ? '#818cf8' : 'var(--text-dim)' }} />
              {tab.title}
            </button>
          );
        })}
      </div>
    </header>
  );
}
