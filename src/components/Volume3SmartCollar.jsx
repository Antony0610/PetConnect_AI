import React, { useState, useEffect } from 'react';
import { Radio, MapPin, Zap, Activity, AlertOctagon, Volume2, ShieldCheck, Code, Play, Pause, RefreshCw } from 'lucide-react';

export default function Volume3SmartCollar({ collarState, setCollarState, onTriggerImpact }) {
  const [geofenceRadius, setGeofenceRadius] = useState(300); // 300 meters
  const [isBuzzerActive, setIsBuzzerActive] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // Live Telemetry Streaming Simulation Effect
  useEffect(() => {
    let interval;
    if (collarState.isStreaming) {
      interval = setInterval(() => {
        // Random slight movement jitter in GPS & MPU6050
        setCollarState(prev => {
          const newLat = +(prev.lat + (Math.random() - 0.5) * 0.0002).toFixed(5);
          const newLng = +(prev.lng + (Math.random() - 0.5) * 0.0002).toFixed(5);
          
          // Calculate distance from center (approximate)
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

  const handleToggleBuzzer = () => {
    setIsBuzzerActive(true);
    setTimeout(() => setIsBuzzerActive(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Module Title Header */}
      <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: '6px' }}>
            <Radio style={{ width: '12px', height: '12px' }} /> Volume 3 Specification
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>Smart Pet Collar (ESP32 + GPS + MPU6050 IoT Hardware)</h2>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setCollarState(prev => ({ ...prev, isStreaming: !prev.isStreaming }))}
            className={collarState.isStreaming ? "btn-secondary" : "btn-primary"}
            style={{ fontSize: '0.85rem' }}
          >
            {collarState.isStreaming ? <Pause style={{ width: '16px', height: '16px' }} /> : <Play style={{ width: '16px', height: '16px' }} />}
            {collarState.isStreaming ? "Pause Telemetry" : "Start Live Stream (30s)"}
          </button>

          <button 
            onClick={() => setShowCode(!showCode)}
            className="btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <Code style={{ width: '16px', height: '16px' }} />
            {showCode ? "Hide C++ Firmware" : "View ESP32 Firmware"}
          </button>
        </div>
      </div>

      {/* C++ Firmware Source Viewer */}
      {showCode && (
        <div className="glass-card" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '1rem', color: '#a5b4fc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code style={{ width: '18px', height: '18px' }} /> esp32_smart_collar.ino (Arduino / C++ Source)
          </h4>
          <div className="code-box" style={{ maxHeight: '220px' }}>
{`#include <WiFi.h>
#include <HTTPClient.h>
#include <TinyGPS++.h>
#include <Adafruit_MPU6050.h>

TinyGPSPlus gps;
Adafruit_MPU6050 mpu;
const char* serverUrl = "https://api.petconnect.ai/v1/telemetry";

void setup() {
  Serial.begin(115200);
  WiFi.begin("PetConnect_IoT", "secureserver");
  if (!mpu.begin()) Serial.println("Failed to find MPU6050 chip");
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    String payload = "{\\"pet_id\\":\\"bruno_01\\",\\"lat\\":" + String(gps.location.lat(), 5) + 
                     ",\\"lng\\":" + String(gps.location.lng(), 5) + 
                     ",\\"accel_z\\":" + String(a.acceleration.z) + "}";
    http.POST(payload);
    http.end();
  }
  delay(30000); // 30s Telemetry Cycle
}`}
          </div>
        </div>
      )}

      {/* Telemetry Dashboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Live GPS & Geofence Controls */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin style={{ color: '#38bdf8', width: '20px', height: '20px' }} />
              Live Telemetry & Geofence
            </h3>
            {collarState.geofenceBreached ? (
              <span className="badge badge-danger">Safe Zone Breach!</span>
            ) : (
              <span className="badge badge-success">Inside Safe Radius</span>
            )}
          </div>

          {/* Simulated Collar Map */}
          <div style={{
            height: '200px',
            borderRadius: '14px',
            background: '#040914',
            border: collarState.geofenceBreached ? '2px solid #ef4444' : '1px solid var(--border-light)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Geofence Circle Radius Visualizer */}
            <div style={{
              position: 'absolute',
              width: `${(geofenceRadius / 300) * 140}px`,
              height: `${(geofenceRadius / 300) * 140}px`,
              borderRadius: '50%',
              border: '2px dashed rgba(99, 102, 241, 0.6)',
              background: 'rgba(99, 102, 241, 0.05)',
              pointerEvents: 'none'
            }}></div>

            {/* Pet Marker */}
            <div style={{
              position: 'absolute',
              transform: collarState.geofenceBreached ? 'translate(60px, -50px)' : 'translate(0, 0)',
              transition: 'all 0.5s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: collarState.geofenceBreached ? '#ef4444' : '#10b981',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: collarState.geofenceBreached ? '0 0 20px #ef4444' : '0 0 12px #10b981'
              }}>
                <Radio style={{ width: '18px', height: '18px' }} />
              </div>
              <span style={{ fontSize: '0.7rem', background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', color: 'white' }}>
                Bruno (Collar ID: {collarState.collarId})
              </span>
            </div>

            <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              Last Sync: {collarState.lastUpdated}
            </span>
          </div>

          {/* Geofence Slider */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Virtual Safe Radius:</span>
              <strong style={{ color: '#a5b4fc' }}>{geofenceRadius} meters</strong>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <span style={{ color: 'var(--text-dim)', display: 'block' }}>LATITUDE</span>
              <strong>{collarState.lat} N</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <span style={{ color: 'var(--text-dim)', display: 'block' }}>LONGITUDE</span>
              <strong>{collarState.lng} E</strong>
            </div>
          </div>
        </div>

        {/* MPU6050 Accelerometer & Activity ML Classifier */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity style={{ color: '#ec4899', width: '20px', height: '20px' }} />
            MPU6050 Motion & ML Activity Classifier
          </h3>

          {/* Activity State Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.15))',
            padding: '16px',
            borderRadius: '14px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>CURRENT AI CLASSIFICATION</span>
              <h4 style={{ fontSize: '1.4rem', color: '#c084fc', textTransform: 'capitalize' }}>{collarState.activity}</h4>
            </div>
            <span className="badge badge-success">Random Forest Model</span>
          </div>

          {/* Accelerometer Vectors */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Accel X</span>
              <p style={{ fontWeight: 700, color: '#38bdf8' }}>{collarState.accelX} g</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Accel Y</span>
              <p style={{ fontWeight: 700, color: '#38bdf8' }}>{collarState.accelY} g</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Accel Z</span>
              <p style={{ fontWeight: 700, color: '#38bdf8' }}>{collarState.accelZ} g</p>
            </div>
          </div>

          {/* Hardware Control Triggers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={handleToggleBuzzer}
              className="btn-secondary"
              style={{
                width: '100%',
                justifyContent: 'center',
                borderColor: isBuzzerActive ? '#10b981' : 'var(--border-light)',
                background: isBuzzerActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)'
              }}
            >
              <Volume2 style={{ width: '16px', height: '16px', color: isBuzzerActive ? '#34d399' : 'white' }} />
              {isBuzzerActive ? "Buzzer Sounding & LED Blinking..." : "Trigger Find-My-Pet Sound/LED"}
            </button>

            <button 
              onClick={onTriggerImpact}
              className="btn-danger"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
            >
              <AlertOctagon style={{ width: '16px', height: '16px' }} />
              Simulate Sudden Accident / Impact Spike
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
