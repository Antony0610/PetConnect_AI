import React, { useState } from 'react';
import { Heart, QrCode, ShieldAlert, Users, PlusCircle, Check, AlertTriangle, Download, Phone } from 'lucide-react';

export default function Volume4HealthSOS({ petData, onTriggerSOS }) {
  const [activeTab, setActiveTab] = useState('passport');
  const [strayReports, setStrayReports] = useState([
    { id: 1, type: "Injured Stray Dog", location: "Sector 4 Metro Pillar 42", status: "Volunteer Assigned", time: "10 mins ago", reporter: "Alex M." },
    { id: 2, type: "Abandoned Cat Basket", location: "Greenwood Park Entrance", status: "Open / Pending", time: "25 mins ago", reporter: "Priya S." }
  ]);

  const [newStrayType, setNewStrayType] = useState('Injured Stray Animal');
  const [newStrayLoc, setNewStrayLoc] = useState('');

  const handleReportStray = (e) => {
    e.preventDefault();
    if (!newStrayLoc.trim()) return;

    setStrayReports(prev => [
      { id: Date.now(), type: newStrayType, location: newStrayLoc, status: "Open / Dispatched", time: "Just now", reporter: "You (Verified User)" },
      ...prev
    ]);
    setNewStrayLoc('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: '6px' }}>
            <Heart style={{ width: '12px', height: '12px' }} /> Volume 4 Specification
          </div>
          <h2 style={{ fontSize: '1.5rem' }}>Emergency SOS, Health Passport & Community Rescue</h2>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { id: 'passport', label: '1. QR Health Passport' },
            { id: 'sos', label: '2. Emergency SOS Dispatch' },
            { id: 'stray', label: '3. Stray & Rescue Network' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === tab.id ? '#a5b4fc' : 'var(--text-muted)',
                border: '1px solid var(--border-light)',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Digital Pet Health Passport & QR Code */}
      {activeTab === 'passport' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* Printable QR Code Passport Card */}
          <div className="glass-card" style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.85))',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div className="badge badge-primary" style={{ marginBottom: '12px' }}>Official Digital QR Health Passport</div>
            
            <div style={{
              width: '140px',
              height: '140px',
              background: 'white',
              borderRadius: '16px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)'
            }}>
              {/* Simulated SVG QR Code */}
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="#070913">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />
                
                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />
                
                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />
                
                <rect x="40" y="40" width="20" height="20" />
                <rect x="65" y="65" width="25" height="25" />
                <rect x="35" y="15" width="15" height="15" />
              </svg>
            </div>

            <h3 style={{ fontSize: '1.4rem', color: '#f8fafc' }}>{petData.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>{petData.breed} • Owner: John Doe</p>
            <p style={{ fontSize: '0.75rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
              QR ID: PETCONNECT-QR-992014
            </p>

            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <Download style={{ width: '16px', height: '16px' }} /> Download QR Tag Badge (PDF / Image)
            </button>
          </div>

          {/* Vaccination & Medical History Records */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <QrCode style={{ color: '#34d399', width: '20px', height: '20px' }} />
              Vaccination & Medical History
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: 'Rabies Vaccination', date: '15 Jan 2026', status: 'Valid (Expires Jan 2027)', vet: 'Dr. Sarah Jenkins' },
                { title: 'DHPP Core Vaccine', date: '04 Nov 2025', status: 'Valid', vet: 'Metro Vet Clinic' },
                { title: 'Deworming & Parasite Prevention', date: '10 Dec 2025', status: 'Completed', vet: 'Metro Vet Clinic' }
              ].map((rec, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255,255,255,0.03)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#f8fafc' }}>{rec.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Administered: {rec.date} • {rec.vet}</p>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                    ✓ {rec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Emergency SOS Dispatch */}
      {activeTab === 'sos' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert style={{ color: '#ef4444', width: '20px', height: '20px' }} />
              Single-Tap Emergency SOS Dispatch Center
            </h3>
            <span className="badge badge-danger">Live Broadcast Protocol</span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Pressing Emergency SOS instantly transmits Bruno's live collar GPS coordinates, owner details, 
            and QR medical passport to all 32 nearby veterinary hospitals and registered rescue volunteers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h4 style={{ color: '#f87171', fontSize: '0.95rem', marginBottom: '4px' }}>Automated Hospital Alert</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nearest 24/7 ER Vet Clinics notified instantly with directions.</p>
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <h4 style={{ color: '#a5b4fc', fontSize: '0.95rem', marginBottom: '4px' }}>Volunteer Dispatch</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nearby volunteers within 3 km radius receive push notification.</p>
            </div>
          </div>

          <button 
            onClick={onTriggerSOS}
            className="btn-danger"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
          >
            <ShieldAlert style={{ width: '22px', height: '22px' }} />
            TRIGGER LIVE EMERGENCY SOS NOW
          </button>
        </div>
      )}

      {/* TAB 3: Stray & Rescue Network */}
      {activeTab === 'stray' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Submit Stray Report */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusCircle style={{ color: '#818cf8', width: '20px', height: '20px' }} />
              Report Injured Stray or Abandoned Animal
            </h3>

            <form onSubmit={handleReportStray} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Issue Type</label>
                <select 
                  value={newStrayType} 
                  onChange={e => setNewStrayType(e.target.value)}
                  style={{ width: '100%', background: '#04060c', color: 'white', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '8px', outline: 'none' }}
                >
                  <option>Injured Stray Animal</option>
                  <option>Abandoned Pet</option>
                  <option>Stray Feeding Zone Registration</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Location / Landmark</label>
                <input 
                  type="text" 
                  placeholder="e.g. Near City Mall Gate 2..."
                  value={newStrayLoc}
                  onChange={e => setNewStrayLoc(e.target.value)}
                  style={{ width: '100%', background: '#04060c', color: 'white', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                Submit Community Rescue Ticket
              </button>
            </form>
          </div>

          {/* Active Stray Reports */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users style={{ color: '#ec4899', width: '20px', height: '20px' }} />
              Community Rescue Dispatch Stream
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {strayReports.map(rep => (
                <div key={rep.id} style={{
                  background: 'rgba(255,255,255,0.03)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#f8fafc' }}>{rep.type}</h4>
                    <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 600 }}>{rep.status}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 {rep.location}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>Reported by: {rep.reporter} • {rep.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
