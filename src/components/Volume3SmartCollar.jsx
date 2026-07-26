import React, { useState, useEffect } from 'react';
import { Radio, MapPin, Zap, Activity, AlertOctagon, Volume2, Play, Pause, Compass, Signal, Battery, RefreshCw, ShieldCheck, Layers, ZoomIn, ZoomOut, VolumeX, Lightbulb, Navigation } from 'lucide-react';

export default function Volume3SmartCollar({ collarState, setCollarState, onTriggerImpact }) {
  const [geofenceRadius, setGeofenceRadius] = useState(350);
  const [mapMode, setMapMode] = useState('satellite'); // 'satellite' | 'terrain' | 'night'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isBuzzerActive, setIsBuzzerActive] = useState(false);
  const [buzzerTone, setBuzzerTone] = useState('High-Pitch Alarm (3kHz)');
  const [ledMode, setLedMode] = useState('Off'); // 'Off' | 'Strobe Flash' | 'Constant Glow'
  
  const [isReplayingRoute, setIsReplayingRoute] = useState(false);
  const [replayProgress, setReplayProgress] = useState(0);

  // Dynamic Gyroscope Pitch/Roll/Yaw simulation
  const [gyro, setGyro] = useState({ roll: 12.4, pitch: -4.2, yaw: 184.0, state: 'Walking' });

  // Route Playback Effect
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

  // Telemetry Stream Effect
  useEffect(() => {
    let interval;
    if (collarState.isStreaming) {
      interval = setInterval(() => {
        setCollarState(prev => {
          const newLat = +(prev.lat + (Math.random() - 0.5) * 0.0002).toFixed(5);
          const newLng = +(prev.lng + (Math.random() - 0.5) * 0.0002).toFixed(5);
          
          const distMeters = Math.sqrt(Math.pow((newLat - 10.0234) * 111000, 2) + Math.pow((newLng - 76.3456) * 111000, 2));
          const isBreached = distMeters > geofenceRadius;

          const ax = +(0.12 + (Math.random() - 0.5) * 0.15).toFixed(2);
          const ay = +(-0.05 + (Math.random() - 0.5) * 0.15).toFixed(2);
          const az = +(0.98 + (Math.random() - 0.5) * 0.08).toFixed(2);

          const isRunning = Math.abs(ax) > 0.22;
          setGyro({
            roll: +(10 + Math.random() * 5).toFixed(1),
            pitch: +(-2 + Math.random() * 4).toFixed(1),
            yaw: +(180 + Math.random() * 10).toFixed(1),
            state: isRunning ? 'Running' : 'Walking'
          });

          return {
            ...prev,
            lat: newLat,
            lng: newLng,
            geofenceBreached: isBreached,
            accelX: ax,
            accelY: ay,
            accelZ: az,
            lastUpdated: new Date().toLocaleTimeString()
          };
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [collarState.isStreaming, geofenceRadius]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* 1. Enhanced Map Viewport & Telemetry */}
      <div className="app-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Radio style={{ color: '#5EEAD4', width: '18px', height: '18px' }} />
            High-Precision GPS Satellite Tracker
          </h4>
          <span className={collarState.geofenceBreached ? "status-pill status-alert" : "status-pill status-online"}>
            {collarState.geofenceBreached ? '🚨 BREACH ALERT' : '✓ Safe Zone'}
          </span>
        </div>

        {/* Map View Controls bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['satellite', 'terrain', 'night'].map(mode => (
              <button
                key={mode}
                onClick={() => setMapMode(mode)}
                style={{
                  background: mapMode === mode ? 'rgba(15, 118, 110, 0.35)' : 'rgba(255,255,255,0.04)',
                  color: mapMode === mode ? '#5EEAD4' : 'var(--text-muted)',
                  border: mapMode === mode ? '1px solid #0F766E' : '1px solid var(--border-glass)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: '4px', padding: '2px 6px', cursor: 'pointer' }}>
              <ZoomIn style={{ width: '12px', height: '12px' }} />
            </button>
            <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: '4px', padding: '2px 6px', cursor: 'pointer' }}>
              <ZoomOut style={{ width: '12px', height: '12px' }} />
            </button>
          </div>
        </div>

        {/* Interactive Satellite Map Viewport */}
        <div style={{
          height: '200px',
          borderRadius: '16px',
          background: mapMode === 'satellite' ? '#040814' : mapMode === 'terrain' ? '#0b1610' : '#020409',
          backgroundImage: mapMode === 'satellite' 
            ? 'radial-gradient(circle at 50% 50%, rgba(15, 118, 110, 0.2) 0%, rgba(4, 8, 20, 0.96) 75%)'
            : mapMode === 'terrain'
            ? 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15) 0%, rgba(11, 22, 16, 0.96) 75%)'
            : 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(2, 4, 9, 0.98) 75%)',
          border: collarState.geofenceBreached ? '2px solid #EF4444' : '1px solid var(--border-glass)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.3s ease'
        }}>
          {/* Map Grid Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          {/* Polyline Route Trail */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <path 
              d="M 50 140 Q 120 80, 220 100 T 320 60" 
              fill="none" 
              stroke="#5EEAD4" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
              opacity="0.6" 
            />
          </svg>

          {/* Safe Geofence Boundary Circle */}
          <div style={{
            position: 'absolute',
            width: `${(geofenceRadius / 350) * 130}px`,
            height: `${(geofenceRadius / 350) * 130}px`,
            borderRadius: '50%',
            border: '2px dashed rgba(94, 234, 212, 0.6)',
            background: 'rgba(15, 118, 110, 0.12)',
            transition: 'all 0.4s ease'
          }} />

          {/* Pet Marker Pin with Pulse Halo */}
          <div style={{
            position: 'absolute',
            transform: collarState.geofenceBreached ? 'translate(60px, -45px)' : 'translate(0, 0)',
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10
          }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: collarState.geofenceBreached ? '#EF4444' : '#0F766E',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: collarState.geofenceBreached ? '0 0 22px #EF4444' : '0 0 18px #5EEAD4',
              border: '2px solid white'
            }}>
              <MapPin style={{ width: '18px', height: '18px' }} />
            </div>
            <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.88)', color: '#5EEAD4', padding: '2px 8px', borderRadius: '6px', marginTop: '4px', fontWeight: 600 }}>
              Bruno [{collarState.lat}, {collarState.lng}]
            </span>
          </div>

          {/* Map Floating HUD */}
          <div style={{ position: 'absolute', top: '8px', left: '10px', display: 'flex', gap: '6px', fontSize: '0.62rem' }}>
            <span style={{ background: 'rgba(0,0,0,0.7)', color: '#5EEAD4', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Signal style={{ width: '10px', height: '10px' }} /> 14 Satellites (3D Fix)
            </span>
            <span style={{ background: 'rgba(0,0,0,0.7)', color: '#FF7A59', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Navigation style={{ width: '10px', height: '10px' }} /> 3.4 km/h • 45° NE
            </span>
          </div>
        </div>

        {/* Geofence Radius Slider */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Geofence Boundary Range:</span>
          <strong style={{ color: '#5EEAD4' }}>{geofenceRadius} meters</strong>
        </div>
        <input 
          type="range" 
          min="100" 
          max="1000" 
          step="50"
          value={geofenceRadius}
          onChange={e => setGeofenceRadius(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#0F766E', marginBottom: '10px' }}
        />

        {/* 24-Hour Route Replay */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>24h Breadcrumb Route History</span>
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

      {/* 2. Enhanced MPU6050 Accelerometer & Remote Beacon Module */}
      {/* 2. Enhanced MPU6050 Motion Vector & Remote Beacon Controls */}
      <div className="app-card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity style={{ color: '#FF7A59', width: '18px', height: '18px' }} />
          MPU6050 Motion Sensor &amp; Remote Beacon
        </h4>

        {/* 6-DOF Motion Vector Readings */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '10px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>ACCEL X</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#5EEAD4' }}>{collarState.accelX} g</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>ACCEL Y</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#5EEAD4' }}>{collarState.accelY} g</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>ACCEL Z</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#5EEAD4' }}>{collarState.accelZ} g</p>
          </div>
        </div>

        {/* Gyroscope Pitch/Roll/Yaw & Motion State */}
        <div style={{ background: 'rgba(15, 118, 110, 0.15)', padding: '8px 10px', borderRadius: '10px', border: '1px solid rgba(94, 234, 212, 0.3)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>ORIENTATION (ROLL / PITCH / YAW)</span>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f8fafc' }}>
              Roll: {gyro.roll}° | Pitch: {gyro.pitch}° | Yaw: {gyro.yaw}°
            </p>
          </div>
          <span style={{ fontSize: '0.7rem', background: 'rgba(94, 234, 212, 0.2)', color: '#5EEAD4', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
            State: {gyro.state}
          </span>
        </div>

        {/* Remote Beacon & Sound Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Buzzer Tone</label>
              <select value={buzzerTone} onChange={e => setBuzzerTone(e.target.value)} style={{ width: '100%', background: '#040712', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '5px', color: 'white', fontSize: '0.7rem', outline: 'none' }}>
                <option value="High-Pitch Alarm (3kHz)">High-Pitch (3kHz)</option>
                <option value="Soft Chirp (1.5kHz)">Soft Chirp (1.5kHz)</option>
                <option value="Emergency Siren">Emergency Siren</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '2px' }}>LED Flash Beacon</label>
              <select value={ledMode} onChange={e => setLedMode(e.target.value)} style={{ width: '100%', background: '#040712', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '5px', color: 'white', fontSize: '0.7rem', outline: 'none' }}>
                <option value="Off">Off</option>
                <option value="Strobe Flash">Strobe Flash (Night)</option>
                <option value="Constant Glow">Constant Glow</option>
              </select>
            </div>
          </div>

          <button 
            onClick={() => setIsBuzzerActive(!isBuzzerActive)} 
            className="btn-secondary" 
            style={{ justifyContent: 'center' }}
          >
            <Volume2 style={{ width: '15px', height: '15px' }} />
            {isBuzzerActive ? `Sounding (${buzzerTone}) & LED ${ledMode}...` : "Trigger Find-My-Pet Speaker & LED"}
          </button>
          
          <button onClick={onTriggerImpact} className="btn-sos" style={{ justifyContent: 'center' }}>
            <AlertOctagon style={{ width: '15px', height: '15px' }} /> Simulate Collision / Fall Impact Spike
          </button>
        </div>
      </div>
    </div>
  );
}
