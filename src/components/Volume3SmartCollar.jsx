import React, { useState, useEffect } from 'react';
import { Radio, MapPin, Zap, Activity, AlertOctagon, Volume2, Play, Pause, Compass, Signal, Battery, RefreshCw, ShieldCheck } from 'lucide-react';

export default function Volume3SmartCollar({ collarState, setCollarState, onTriggerImpact }) {
  const [geofenceRadius, setGeofenceRadius] = useState(350);
  const [isBuzzerActive, setIsBuzzerActive] = useState(false);
  const [isReplayingRoute, setIsReplayingRoute] = useState(false);
  const [replayProgress, setReplayProgress] = useState(0);

  // Simulated Route Playback Effect
  useEffect(() => {
    let timer;
    if (isReplayingRoute) {
      timer = setInterval(() => {
        setReplayProgress(prev => {
          if (prev >= 100) {
            setIsReplayingRoute(false);
            return 0;
          }
          return prev + 10;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isReplayingRoute]);

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
            <Radio style={{ color: '#5EEAD4', width: '18px', height: '18px' }} />
            Live ESP32 GPS Satellite Telemetry
          </h4>
          <span className={collarState.geofenceBreached ? "status-pill status-alert" : "status-pill status-online"}>
            {collarState.geofenceBreached ? '🚨 GEOFENCE BREACH' : '✓ Safe Zone'}
          </span>
        </div>

        {/* Interactive Satellite Map Viewport */}
        <div style={{
          height: '180px',
          borderRadius: '16px',
          background: '#040814',
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(15, 118, 110, 0.15) 0%, rgba(4, 8, 20, 0.95) 75%)',
          border: collarState.geofenceBreached ? '2px solid #EF4444' : '1px solid var(--border-glass)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Map Grid Lines */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          {/* Home Safe Geofence Circle */}
          <div style={{
            position: 'absolute',
            width: `${(geofenceRadius / 350) * 120}px`,
            height: `${(geofenceRadius / 350) * 120}px`,
            borderRadius: '50%',
            border: '2px dashed rgba(94, 234, 212, 0.6)',
            background: 'rgba(15, 118, 110, 0.12)',
            transition: 'all 0.4s ease'
          }}></div>

          {/* Animated Pet Location Radar Dot */}
          <div style={{
            position: 'absolute',
            transform: collarState.geofenceBreached ? 'translate(55px, -40px)' : 'translate(0, 0)',
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: collarState.geofenceBreached ? '#EF4444' : '#0F766E',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: collarState.geofenceBreached ? '0 0 20px #EF4444' : '0 0 16px #5EEAD4',
              border: '2px solid white'
            }}>
              <MapPin style={{ width: '16px', height: '16px' }} />
            </div>
            <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.85)', color: '#5EEAD4', padding: '2px 8px', borderRadius: '6px', marginTop: '4px', fontWeight: 600 }}>
              Bruno [{collarState.lat}, {collarState.lng}]
            </span>
          </div>

          {/* Top Map HUD */}
          <div style={{ position: 'absolute', top: '8px', left: '10px', display: 'flex', gap: '8px', fontSize: '0.62rem', color: 'var(--text-dim)' }}>
            <span style={{ background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Signal style={{ width: '10px', height: '10px', color: '#5EEAD4' }} /> 14 Satellites
            </span>
            <span style={{ background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Compass style={{ width: '10px', height: '10px', color: '#FF7A59' }} /> 3.4 km/h
            </span>
          </div>
        </div>

        {/* Geofence Radius Adjustment Slider */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Safe Geofence Radius:</span>
          <strong style={{ color: '#5EEAD4' }}>{geofenceRadius} meters</strong>
        </div>
        <input 
          type="range" 
          min="100" 
          max="1000" 
          step="50"
          value={geofenceRadius}
          onChange={e => setGeofenceRadius(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#0F766E', marginBottom: '12px' }}
        />

        {/* 24-Hour Breadcrumb Location History Replay */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>24-Hour Route Breadcrumb Replay</span>
            <button 
              onClick={() => setIsReplayingRoute(!isReplayingRoute)}
              style={{ background: 'rgba(94, 234, 212, 0.15)', color: '#5EEAD4', border: '1px solid rgba(94, 234, 212, 0.3)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              {isReplayingRoute ? <Pause style={{ width: '11px', height: '11px' }} /> : <Play style={{ width: '11px', height: '11px' }} />}
              {isReplayingRoute ? `Replaying ${replayProgress}%` : "Play Route Replay"}
            </button>
          </div>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${replayProgress}%`, height: '100%', background: '#5EEAD4', transition: 'width 0.3s linear' }} />
          </div>
        </div>
      </div>

      {/* Hardware Sensors & Remote Controls */}
      <div className="app-card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity style={{ color: '#FF7A59', width: '16px', height: '16px' }} />
          MPU6050 Accelerometer &amp; Remote Beacon
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '12px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 6px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>ACCEL X</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#5EEAD4' }}>{collarState.accelX} g</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 6px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>ACCEL Y</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#5EEAD4' }}>{collarState.accelY} g</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 6px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>ACCEL Z</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#5EEAD4' }}>{collarState.accelZ} g</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setIsBuzzerActive(!isBuzzerActive)} 
            className="btn-secondary" 
            style={{ justifyContent: 'center' }}
          >
            <Volume2 style={{ width: '15px', height: '15px' }} />
            {isBuzzerActive ? "Buzzer Sounding & LED Flashing..." : "Trigger Find-My-Pet Sound/LED"}
          </button>
          <button onClick={onTriggerImpact} className="btn-sos" style={{ justifyContent: 'center' }}>
            <AlertOctagon style={{ width: '15px', height: '15px' }} /> Simulate Accident Impact Spike
          </button>
        </div>
      </div>
    </div>
  );
}
