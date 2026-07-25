import React, { useState } from 'react';
import { Heart, QrCode, ShieldAlert, Users, PlusCircle, Download } from 'lucide-react';

export default function Volume4HealthSOS({ petData, onTriggerSOS }) {
  const [strayReports, setStrayReports] = useState([
    { id: 1, type: "Injured Stray Dog", location: "Sector 4 Metro Pillar 42", status: "Volunteer Assigned" },
    { id: 2, type: "Abandoned Cat Basket", location: "Greenwood Park Entrance", status: "Pending" }
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Digital QR Passport Card */}
      <div className="app-card" style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <QrCode style={{ color: '#34d399', width: '16px', height: '16px' }} />
          Digital QR Health Passport
        </h4>

        <div style={{
          width: '100px',
          height: '100px',
          background: 'white',
          borderRadius: '12px',
          padding: '8px',
          margin: '0 auto 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
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
          </svg>
        </div>

        <h4 style={{ fontSize: '1.1rem', color: '#f8fafc' }}>{petData.name}</h4>
        <p style={{ fontSize: '0.75rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
          QR ID: PETCONNECT-992014
        </p>

        <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}>
          <Download style={{ width: '14px', height: '14px' }} /> Save Passport Badge
        </button>
      </div>

      {/* SOS Emergency Action Card */}
      <div className="app-card" style={{ border: '1px solid rgba(239, 68, 68, 0.4)', textAlign: 'center' }}>
        <h4 style={{ fontSize: '0.95rem', color: '#f87171', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldAlert style={{ width: '16px', height: '16px' }} />
          Emergency SOS Broadcast
        </h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Broadcast Bruno's live GPS collar location to all nearby emergency vet clinics.
        </p>
        <button onClick={onTriggerSOS} className="btn-sos" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
          DISPATCH EMERGENCY SOS
        </button>
      </div>

      {/* Stray & Rescue Community Reports */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Users style={{ color: '#ec4899', width: '16px', height: '16px' }} />
          Stray Animal Welfare Feed
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {strayReports.map(rep => (
            <div key={rep.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <strong style={{ color: '#f8fafc' }}>{rep.type}</strong>
                <span style={{ fontSize: '0.68rem', color: '#fbbf24' }}>{rep.status}</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>📍 {rep.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
