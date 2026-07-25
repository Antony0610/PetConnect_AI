import React from 'react';
import { Activity, Radio, Sparkles, MapPin, Heart, Stethoscope, Syringe, Pill, FileText, CheckSquare, Users, Flag, Camera, AlertCircle, Home, Shield, UserCheck, FileSearch, Cpu, Megaphone, Lock, ShieldCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, activeRole, authSessions, onRequestRoleChange }) {
  // Role-specific Navigation Tabs
  const roleTabsMap = {
    owner: [
      { id: 'dashboard', title: 'Pet Profile', icon: Activity },
      { id: 'collar', title: 'GPS Tracker', icon: Radio },
      { id: 'ai', title: 'AI Assistant', icon: Sparkles },
      { id: 'services', title: 'Book Vet', icon: MapPin },
      { id: 'sos', title: 'Passport & SOS', icon: Heart }
    ],
    vet: [
      { id: 'medical_history', title: 'Medical History', icon: Stethoscope },
      { id: 'prescriptions', title: 'Prescriptions', icon: Pill },
      { id: 'vaccinations', title: 'Vaccinations', icon: Syringe },
      { id: 'reports', title: 'Lab Reports', icon: FileText },
      { id: 'emergencies', title: 'Emergency Requests', icon: CheckSquare }
    ],
    volunteer: [
      { id: 'rescue_requests', title: 'Rescue Requests', icon: Users },
      { id: 'active_missions', title: 'Active Missions', icon: Flag },
      { id: 'verify_photos', title: 'Upload Images', icon: Camera },
      { id: 'report_stray', title: 'Report Injured', icon: AlertCircle },
      { id: 'foster_care', title: 'Foster Care', icon: Home }
    ],
    admin: [
      { id: 'user_mgmt', title: 'User Management', icon: Shield },
      { id: 'volunteer_approvals', title: 'Approve Volunteers', icon: UserCheck },
      { id: 'system_reports', title: 'System Reports', icon: FileSearch },
      { id: 'ai_logs', title: 'AI System Logs', icon: Cpu },
      { id: 'broadcasts', title: 'Broadcasts & Analytics', icon: Megaphone }
    ]
  };

  const currentTabs = roleTabsMap[activeRole] || roleTabsMap.owner;
  const isCurrentRoleVerified = !!authSessions[activeRole];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(5, 8, 17, 0.95)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '10px 16px'
    }}>
      {/* Top Header: Brand & Clean Role Verification Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Activity style={{ width: '16px', height: '16px' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1rem', fontWeight: 800, color: 'white', lineHeight: '1' }}>PetConnect AI</h1>
            <span style={{ fontSize: '0.62rem', color: isCurrentRoleVerified ? '#34d399' : '#fbbf24', display: 'flex', alignItems: 'center', gap: '3px' }}>
              {isCurrentRoleVerified ? <ShieldCheck style={{ width: '10px', height: '10px' }} /> : <Lock style={{ width: '10px', height: '10px' }} />}
              {isCurrentRoleVerified ? 'Verified Credentials' : 'Auth Required'}
            </span>
          </div>
        </div>

        {/* Clean Role Selector Dropdown (Triggers Verification Challenge) */}
        <select
          value={activeRole}
          onChange={(e) => onRequestRoleChange(e.target.value)}
          style={{
            background: isCurrentRoleVerified ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.25)',
            color: isCurrentRoleVerified ? '#34d399' : '#a5b4fc',
            border: isCurrentRoleVerified ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(99, 102, 241, 0.4)',
            borderRadius: '8px',
            padding: '4px 8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="owner">Pet Owner {authSessions.owner ? '✓' : '🔒'}</option>
          <option value="vet">Veterinarian {authSessions.vet ? '✓' : '🔒'}</option>
          <option value="volunteer">Rescue Volunteer {authSessions.volunteer ? '✓' : '🔒'}</option>
          <option value="admin">Administrator {authSessions.admin ? '✓' : '🔒'}</option>
        </select>
      </div>

      {/* Role-Specific Nav Tabs */}
      <div style={{
        display: 'flex',
        gap: '4px',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        {currentTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(139, 92, 246, 0.35))' 
                  : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#a5b4fc' : 'var(--text-muted)',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                padding: '6px 6px',
                borderRadius: '8px',
                fontSize: '0.68rem',
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
              <Icon style={{ width: '13px', height: '13px', color: isActive ? '#818cf8' : 'var(--text-dim)' }} />
              {tab.title}
            </button>
          );
        })}
      </div>
    </header>
  );
}
