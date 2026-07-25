import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import Volume1CoreServices from './components/Volume1CoreServices';
import Volume2AIVision from './components/Volume2AIVision';
import Volume3SmartCollar from './components/Volume3SmartCollar';
import Volume4HealthSOS from './components/Volume4HealthSOS';
import Volume5ArchitectureDoc from './components/Volume5ArchitectureDoc';
import { ShieldAlert, CheckCircle, X, BellRing, LayoutDashboard, MapPin, Sparkles, Radio, Heart, Cpu, Wifi, Battery } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [sosDispatched, setSosDispatched] = useState(false);
  const [notificationToast, setNotificationToast] = useState(null);

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

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'collar', label: 'GPS Collar', icon: Radio },
    { id: 'ai', label: 'AI Studio', icon: Sparkles },
    { id: 'services', label: 'Services', icon: MapPin },
    { id: 'sos', label: 'SOS & QR', icon: Heart },
  ];

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

      {/* App Mobile Header */}
      <div className="app-header">
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
            <Radio style={{ width: '16px', height: '16px' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', color: 'white', lineHeight: '1' }}>PetConnect AI</h2>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Smart Collar App</span>
          </div>
        </div>

        <button onClick={triggerSOS} className="btn-sos">
          <ShieldAlert style={{ width: '14px', height: '14px' }} /> SOS
        </button>
      </div>

      {/* Real-Time Notification Toast */}
      {notificationToast && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '12px',
          right: '12px',
          zIndex: 90,
          background: 'rgba(13, 19, 35, 0.98)',
          border: '1px solid rgba(239, 68, 68, 0.6)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4)'
        }}>
          <BellRing style={{ width: '20px', height: '20px', color: '#f87171' }} />
          <div style={{ flex: 1 }}>
            <h5 style={{ fontSize: '0.8rem', color: '#fca5a5' }}>{notificationToast.title}</h5>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{notificationToast.message}</p>
          </div>
          <button onClick={() => setNotificationToast(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)' }}>
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      )}

      {/* Mobile App Body */}
      <div className="app-body">
        {activeTab === 'dashboard' && (
          <DashboardOverview 
            petData={petData} 
            collarState={collarState} 
            onNavigate={(tab) => setActiveTab(tab)} 
          />
        )}
        {activeTab === 'collar' && (
          <Volume3SmartCollar 
            collarState={collarState} 
            setCollarState={setCollarState} 
            onTriggerImpact={handleTriggerImpact} 
          />
        )}
        {activeTab === 'ai' && <Volume2AIVision />}
        {activeTab === 'services' && <Volume1CoreServices petData={petData} />}
        {activeTab === 'sos' && <Volume4HealthSOS petData={petData} onTriggerSOS={triggerSOS} />}
        {activeTab === 'analytics' && <Volume5ArchitectureDoc />}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav-bar">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon style={{ width: '20px', height: '20px' }} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

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
