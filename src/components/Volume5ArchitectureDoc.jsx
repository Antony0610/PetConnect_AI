import React, { useState } from 'react';
import { Cpu, Database, Server, Layers, Award, CheckCircle2, Shield, Code, GitBranch } from 'lucide-react';

export default function Volume5ArchitectureDoc() {
  const [selectedSchema, setSelectedSchema] = useState('pets');

  const schemas = {
    pets: `-- PostgreSQL 'pets' table schema
CREATE TABLE pets (
    pet_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age_years NUMERIC(4, 1),
    weight_kg NUMERIC(5, 2),
    collar_hardware_id VARCHAR(50) UNIQUE,
    qr_passport_code VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    telemetry: `-- PostgreSQL 'gps_telemetry' table schema
CREATE TABLE gps_telemetry (
    log_id BIGSERIAL PRIMARY KEY,
    collar_id VARCHAR(50) NOT NULL,
    latitude NUMERIC(9, 6) NOT NULL,
    longitude NUMERIC(9, 6) NOT NULL,
    battery_pct INT CHECK (battery_pct BETWEEN 0 AND 100),
    speed_kmh NUMERIC(5, 2),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_telemetry_collar_time ON gps_telemetry(collar_id, timestamp DESC);`,
    activity: `-- PostgreSQL 'activity_logs' table schema
CREATE TABLE activity_logs (
    activity_id BIGSERIAL PRIMARY KEY,
    pet_id UUID REFERENCES pets(pet_id),
    activity_type VARCHAR(30) CHECK (activity_type IN ('walking', 'running', 'resting', 'sleeping')),
    duration_seconds INT NOT NULL,
    accel_variance NUMERIC(6, 3),
    logged_date DATE DEFAULT CURRENT_DATE
);`,
    alerts: `-- PostgreSQL 'alerts' table schema
CREATE TABLE alerts (
    alert_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID REFERENCES pets(pet_id),
    alert_type VARCHAR(50) NOT NULL, -- 'GEOFENCE_BREACH', 'IMPACT_DETECTED', 'INACTIVITY'
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`
  };

  const scorecard = [
    { title: "Software & Web Engineering", score: "10 / 10", desc: "Full-stack React + Node/Django architecture with real-time WebSocket streaming." },
    { title: "AI & Computer Vision", score: "9.5 / 10", desc: "MobileNet Breed/Symptom Scanner + Siamese Lost Pet Feature Matcher + NLP Triage." },
    { title: "IoT Hardware Integration", score: "8.5 / 10", desc: "ESP32 C++ Microcontroller + NEO-6M GPS + MPU6050 Accelerometer firmware." },
    { title: "GIS & Location Services", score: "9.0 / 10", desc: "Real-time geofencing, radius breach calculation & OpenStreetMap integration." },
    { title: "Overall B.Tech Project Value", score: "9.5 / 10", desc: "Exceptionally strong candidate for Project Expo, Placements & Research Publication." }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Hero */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div className="badge badge-primary" style={{ marginBottom: '8px' }}>
          <Award style={{ width: '12px', height: '12px' }} /> Volume 5 Specification
        </div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
          Master System Architecture & Evaluation Scorecard
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Comprehensive blueprint detailing backend REST/WebSocket microservices, database schemas, 
          and full-stack deployment specifications for PetConnect AI.
        </p>
      </div>

      {/* Evaluation Scorecard */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award style={{ color: '#fbbf24', width: '20px', height: '20px' }} />
          Final Year CSE Project Evaluation Scorecard
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {scorecard.map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.03)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '0.95rem', color: '#f8fafc' }}>{item.title}</h4>
                <strong style={{ fontSize: '1rem', color: '#34d399' }}>{item.score}</strong>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: '1.4' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Database Schema Inspector */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database style={{ color: '#818cf8', width: '20px', height: '20px' }} />
            PostgreSQL Relational Database Schemas
          </h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['pets', 'telemetry', 'activity', 'alerts'].map(sch => (
              <button
                key={sch}
                onClick={() => setSelectedSchema(sch)}
                style={{
                  background: selectedSchema === sch ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedSchema === sch ? '#a5b4fc' : 'var(--text-muted)',
                  border: '1px solid var(--border-light)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {sch}
              </button>
            ))}
          </div>
        </div>

        <div className="code-box" style={{ minHeight: '200px' }}>
          {schemas[selectedSchema]}
        </div>
      </div>
    </div>
  );
}
