import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Volume1CoreServices from './components/Volume1CoreServices';
import Volume2AIVision from './components/Volume2AIVision';
import Volume3SmartCollar from './components/Volume3SmartCollar';
import Volume4HealthSOS from './components/Volume4HealthSOS';
import Volume5ArchitectureDoc from './components/Volume5ArchitectureDoc';
import { ShieldAlert, CheckCircle, X, BellRing, Radio, Sparkles } from 'lucide-react';

export default function App() {
  const [activeVolume, setActiveVolume] = useState(1);
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
      title: "🚨 EMERGENCY SOS BROADCAST ACTIVE",
      message: "GPS Coordinates & Medical QR sent to 32 nearby Vets and Rescue Volunteers!"
    });
    setTimeout(() => setShowSOSModal(false), 2500);
  };

  const handleTriggerImpact = () => {
    setCollarState(prev => ({
      ...prev,
      accelX: 4.82, // Impact spike
      accelY: 3.91,
      accelZ: 8.12,
      activity: "Impact / Sudden Fall"
    }));

    setNotificationToast({
      title: "⚠️ ACCIDENT / Sudden Impact Detected!",
      message: "ESP32 Accelerometer recorded 8.1g spike followed by static state. Check Bruno immediately!"
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar 
        activeVolume={activeVolume} 
        setActiveVolume={setActiveVolume} 
        onTriggerSOS={triggerSOS}
        collarOnline={collarState.isStreaming}
      />

      {/* Notification Toast */}
      {notificationToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          backdropFilter: 'blur(20px)',
          padding: '16px 20px',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(239, 68, 68, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          maxWidth: '420px',
          animation: 'slideIn 0.3s ease'
        }}>
          <div style={{
            background: 'rgba(239, 68, 68, 0.2)',
            padding: '10px',
            borderRadius: '50%',
            color: '#f87171'
          }}>
            <BellRing style={{ width: '24px', height: '24px' }} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#fca5a5' }}>{notificationToast.title}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{notificationToast.message}</p>
          </div>
          <button 
            onClick={() => setNotificationToast(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', marginLeft: 'auto' }}
          >
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '24px 16px 40px'
      }}>
        {activeVolume === 1 && <Volume1CoreServices petData={petData} />}
        {activeVolume === 2 && <Volume2AIVision />}
        {activeVolume === 3 && (
          <Volume3SmartCollar 
            collarState={collarState} 
            setCollarState={setCollarState} 
            onTriggerImpact={handleTriggerImpact} 
          />
        )}
        {activeVolume === 4 && <Volume4HealthSOS petData={petData} onTriggerSOS={triggerSOS} />}
        {activeVolume === 5 && <Volume5ArchitectureDoc />}
      </main>

      {/* SOS Modal Dialog */}
      {showSOSModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="glass-card" style={{
            maxWidth: '480px',
            width: '100%',
            padding: '28px',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            textAlign: 'center',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowSOSModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>

            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '2px solid #ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#ef4444',
              boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
            }}>
              <ShieldAlert style={{ width: '32px', height: '32px' }} />
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#fca5a5', marginBottom: '8px' }}>
              Confirm Emergency SOS Broadcast?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              This will trigger a real-time dispatch of Bruno's GPS collar telemetry 
              (10.02345 N, 76.34567 E) and Digital Health Passport to nearby emergency clinics.
            </p>

            {sosDispatched ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '12px', borderRadius: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <CheckCircle style={{ width: '20px', height: '20px' }} />
                SOS Successfully Dispatched!
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={() => setShowSOSModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={confirmSOSDispatch} className="btn-danger">
                  Dispatch Emergency Alert
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-light)',
        background: 'rgba(7, 9, 19, 0.9)',
        padding: '16px 24px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-dim)'
      }}>
        PetConnect AI Platform (5 Volumes Specification) • B.Tech CSE Final Year Project Infrastructure • Built with React & Vite
      </footer>
    </div>
  );
}
