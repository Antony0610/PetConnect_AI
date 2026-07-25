import React, { useState, useEffect } from 'react';
import { Radio, MapPin, Zap, Activity, AlertOctagon, Volume2, Play, Pause } from 'lucide-react';

export default function Volume3SmartCollar({ collarState, setCollarState, onTriggerImpact }) {
  const [geofenceRadius, setGeofenceRadius] = useState(300);
  const [isBuzzerActive, setIsBuzzerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (collarState.isStreaming) {
      interval = setInterval(() => {
        setCollarState(prev => {
          const newLat = +(prev.lat + (Math.random() - 0.5) * 0.0002).toFixed(5);
          const newLng = +(prev.lng + (Math.random() - 0.5) * 0.0002).toFixed(5);
          
          const distMeters = Math.sqrt(Math.pow((newLat - 10.0234) * 111000, 2) + Math.pow((newLng - 76.3456) * 111000, 2));
          const isBreached = distMeters > geofenceRadius;

          return {
            ...prev,
            lat: newLat,
            lng: newLng,
            geofenceBreached: isBreached,
            accelX: +(0.12 + (Math.random() - 0.5) * 0.1).toFixed(2),
            accelY: +(-0.05 + (Math.random() - 0.5) * 0.1).toFixed(2),
            accelZ: +(0.98 + (Math.random() - 0.5) * 0.05).toFixed(2),
            lastUpdated: new Date().toLocaleTimeString()
          };
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [collarState.isStreaming, geofenceRadius]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Live Map & Radius Controls */}
      <div className="app-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Radio style={{ color: '#38bdf8', width: '16px', height: '16px' }} />
            ESP32 GPS Collar Telemetry
          </h4>
          <span className={collarState.geofenceBreached ? "status-pill status-alert" : "status-pill status-online"}>
            {collarState.geofenceBreached ? 'Breached!' : 'Safe Zone'}
          </span>
        </div>

        {/* Simulated Map Container */}
        <div style={{
          height: '150px',
          borderRadius: '12px',
          background: '#040914',
          border: collarState.geofenceBreached ? '2px solid #ef4444' : '1px solid var(--border-glass)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'absolute',
            width: `${(geofenceRadius / 300) * 100}px`,
            height: `${(geofenceRadius / 300) * 100}px`,
            borderRadius: '50%',
            border: '2px dashed rgba(99, 102, 241, 0.6)',
            background: 'rgba(99, 102, 241, 0.05)'
          }}></div>

          <div style={{
            position: 'absolute',
            transform: collarState.geofenceBreached ? 'translate(45px, -35px)' : 'translate(0, 0)',
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: collarState.geofenceBreached ? '#ef4444' : '#10b981',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: collarState.geofenceBreached ? '0 0 16px #ef4444' : '0 0 10px #10b981'
            }}>
              <Radio style={{ width: '14px', height: '14px' }} />
            </div>
            <span style={{ fontSize: '0.62rem', background: 'rgba(0,0,0,0.8)', padding: '1px 6px', borderRadius: '4px', marginTop: '2px' }}>
              Bruno ({collarState.lat}, {collarState.lng})
            </span>
          </div>
        </div>

        {/* Geofence Radius Slider */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Geofence Radius:</span>
          <strong style={{ color: '#a5b4fc' }}>{geofenceRadius}m</strong>
        </div>
        <input 
          type="range" 
          min="100" 
          max="1000" 
          step="50"
          value={geofenceRadius}
          onChange={e => setGeofenceRadius(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#6366f1' }}
        />
      </div>

      {/* Motion Vectors & Buttons */}
      <div className="app-card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>MPU6050 Accelerometer & Motion Controls</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '12px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Accel X</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#38bdf8' }}>{collarState.accelX} g</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Accel Y</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#38bdf8' }}>{collarState.accelY} g</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Accel Z</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#38bdf8' }}>{collarState.accelZ} g</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setIsBuzzerActive(!isBuzzerActive)} 
            className="btn-secondary" 
            style={{ justifyContent: 'center' }}
          >
            <Volume2 style={{ width: '15px', height: '15px' }} />
            {isBuzzerActive ? "Buzzer Sounding..." : "Trigger Find-My-Pet Sound/LED"}
          </button>
          <button onClick={onTriggerImpact} className="btn-sos" style={{ justifyContent: 'center' }}>
            <AlertOctagon style={{ width: '15px', height: '15px' }} /> Simulate Accident Impact Spike
          </button>
        </div>
      </div>
    </div>
  );
}
