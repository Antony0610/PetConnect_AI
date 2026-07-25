import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import Volume1CoreServices from './components/Volume1CoreServices';
import Volume2AIVision from './components/Volume2AIVision';
import Volume3SmartCollar from './components/Volume3SmartCollar';
import Volume4HealthSOS from './components/Volume4HealthSOS';
import RoleVeterinarian from './components/RoleVeterinarian';
import RoleRescueVolunteer from './components/RoleRescueVolunteer';
import RoleAdministrator from './components/RoleAdministrator';
import RoleLoginModal from './components/RoleLoginModal';
import { ShieldAlert, X, BellRing, Wifi, Battery, Lock, ShieldCheck } from 'lucide-react';

export default function App() {
  // Current Locked Single-Role Session State (default null -> prompts sign in)
  const [currentSession, setCurrentSession] = useState({
    role: 'owner',
    badgeId: 'owner@petconnect.ai',
    verifiedAt: '09:41 AM'
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [sosDispatched, setSosDispatched] = useState(false);
  const [notificationToast, setNotificationToast] = useState(null);

  const roleFirstTabs = {
    owner: 'dashboard',
    vet: 'medical_history',
    volunteer: 'rescue_requests',
    admin: 'user_mgmt'
  };

  // Shared Pet Profile State
  const [petData] = useState({
    name: "Bruno",
    breed: "Golden Retriever",
    age: 3.5,
    weight: 28.4,
    microchip: "981020004812901",
    collarId: "ESP32-COLLAR-88"
  });

  // Shared IoT Smart Collar Telemetry State
  const [collarState, setCollarState] = useState({
    collarId: "ESP32-COLLAR-88",
    isStreaming: true,
    lat: 10.02345,
    lng: 76.34567,
    battery: 88,
    activity: "walking",
    accelX: 0.14,
    accelY: -0.02,
    accelZ: 0.98,
    geofenceBreached: false,
    lastUpdated: new Date().toLocaleTimeString()
  });

  const handleAuthenticateRoleSuccess = (roleKey, sessionData) => {
    setCurrentSession({
      role: roleKey,
      badgeId: sessionData.badgeId,
      verifiedAt: sessionData.verifiedAt
    });
    setActiveTab(roleFirstTabs[roleKey]);

    const roleNames = { owner: "Pet Owner", vet: "Veterinarian", volunteer: "Rescue Volunteer", admin: "Administrator" };
    setNotificationToast({
      title: "🔒 SESSION LOCKED & SIGNED IN",
      message: `Signed in as ${roleNames[roleKey]} (${sessionData.badgeId})`
    });
  };

  const handleSignOutAndLock = () => {
    setCurrentSession(null);
    setNotificationToast({
      title: "🔒 SESSION LOCKED",
      message: "Signed out. Select a role to authenticate."
    });
  };

  const triggerSOS = () => {
    setShowSOSModal(true);
    setSosDispatched(false);
  };

  const confirmSOSDispatch = () => {
    setSosDispatched(true);
    setNotificationToast({
      title: "🚨 EMERGENCY SOS BROADCASTED",
      message: "GPS & QR Passport dispatched to nearby emergency clinics!"
    });
    setTimeout(() => setShowSOSModal(false), 2200);
  };

  const handleTriggerImpact = () => {
    setCollarState(prev => ({
      ...prev,
      accelX: 4.82,
      accelY: 3.91,
      accelZ: 8.12,
      activity: "Impact / Sudden Fall"
    }));

    setNotificationToast({
      title: "⚠️ ACCIDENT / Impact Spike!",
      message: "ESP32 recorded 8.1g impact spike. Check Bruno immediately!"
    });
  };

  const activeRole = currentSession ? currentSession.role : 'owner';

  return (
    <div className="mobile-app-shell">
      {/* Mobile Top Status Bar */}
      <div className="mobile-status-bar">
        <span>9:41</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Wifi style={{ width: '13px', height: '13px' }} />
          <Battery style={{ width: '15px', height: '15px' }} />
        </div>
      </div>

      {/* Header Bar */}
      {currentSession && (
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          activeRole={activeRole}
          currentSession={currentSession}
          onSignOut={handleSignOutAndLock}
        />
      )}

      {/* Real-Time Notification Toast */}
      {notificationToast && (
        <div style={{
          position: 'absolute',
          top: '90px',
          left: '12px',
          right: '12px',
          zIndex: 90,
          background: 'rgba(13, 19, 35, 0.98)',
          border: '1px solid rgba(99, 102, 241, 0.6)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
        }}>
          <ShieldCheck style={{ width: '20px', height: '20px', color: '#34d399' }} />
          <div style={{ flex: 1 }}>
            <h5 style={{ fontSize: '0.8rem', color: '#a5b4fc' }}>{notificationToast.title}</h5>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{notificationToast.message}</p>
          </div>
          <button onClick={() => setNotificationToast(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)' }}>
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      )}

      {/* Strictly Scoped Active Role Content Body */}
      <div className="app-body">
        {currentSession ? (
          <>
            {/* 🐶 ROLE 1: PET OWNER MODULES */}
            {activeRole === 'owner' && (
              <>
                {activeTab === 'dashboard' && <DashboardOverview petData={petData} collarState={collarState} onNavigate={(tab) => setActiveTab(tab)} />}
                {activeTab === 'collar' && <Volume3SmartCollar collarState={collarState} setCollarState={setCollarState} onTriggerImpact={handleTriggerImpact} />}
                {activeTab === 'ai' && <Volume2AIVision />}
                {activeTab === 'services' && <Volume1CoreServices petData={petData} />}
                {activeTab === 'sos' && <Volume4HealthSOS petData={petData} onTriggerSOS={triggerSOS} />}
              </>
            )}

            {/* 🩺 ROLE 2: VETERINARIAN MODULES */}
            {activeRole === 'vet' && (
              <RoleVeterinarian petData={petData} activeSubTab={activeTab} />
            )}

            {/* 🦺 ROLE 3: RESCUE VOLUNTEER MODULES */}
            {activeRole === 'volunteer' && (
              <RoleRescueVolunteer activeSubTab={activeTab} />
            )}

            {/* 🛡️ ROLE 4: ADMINISTRATOR MODULES */}
            {activeRole === 'admin' && (
              <RoleAdministrator activeSubTab={activeTab} />
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <Lock style={{ width: '36px', height: '36px', color: '#6366f1', margin: '0 auto 10px' }} />
            <h4 style={{ color: 'white', marginBottom: '4px' }}>Session Locked</h4>
            <p style={{ fontSize: '0.8rem' }}>Please authenticate a role to unlock modules.</p>
          </div>
        )}
      </div>

      {/* Role Sign In / Verification Modal (Prompts when logged out) */}
      {!currentSession && (
        <RoleLoginModal 
          onAuthenticate={handleAuthenticateRoleSuccess}
        />
      )}

      {/* SOS Emergency Modal */}
      {showSOSModal && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="app-card" style={{ border: '2px solid #ef4444', textAlign: 'center', width: '100%' }}>
            <ShieldAlert style={{ width: '40px', height: '40px', color: '#ef4444', margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '1.2rem', color: '#fca5a5', marginBottom: '6px' }}>Confirm Emergency SOS?</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Broadcast Bruno's live GPS collar location to nearby emergency vet clinics.
            </p>

            {sosDispatched ? (
              <div style={{ color: '#34d399', fontWeight: 600, fontSize: '0.85rem' }}>
                ✓ SOS Dispatched Successfully!
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button onClick={() => setShowSOSModal(false)} className="btn-secondary">Cancel</button>
                <button onClick={confirmSOSDispatch} className="btn-sos">Dispatch SOS</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
