import React, { useState } from 'react';
import { Users, ShieldAlert, CheckCircle2, Upload, Home, PlusCircle, Navigation, MapPin } from 'lucide-react';

export default function RoleRescueVolunteer() {
  const [missions, setMissions] = useState([
    { id: 1, title: "Injured Stray Dog (Leg Fracture)", location: "Sector 4 Metro Pillar 42", status: "Pending Acceptance", reporter: "Alex M.", imageUploaded: false },
    { id: 2, title: "Abandoned Puppy Litter", location: "Greenwood Park Entrance", status: "Assigned (You)", reporter: "Priya S.", imageUploaded: true }
  ]);

  const handleAcceptMission = (id) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status: "In Progress (Assigned to You)" } : m));
  };

  const handleUploadImage = (id) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, imageUploaded: true, status: "Rescued / Photo Verified" } : m));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header Banner */}
      <div className="app-card" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(15, 23, 42, 0.95))', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users style={{ color: '#ec4899', width: '20px', height: '20px' }} />
            Rescue Volunteer Emergency Station
          </h3>
          <span className="status-pill status-online">Alex M. (Verified Volunteer)</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Coordinate local stray animal rescues, upload field verification photos, and manage foster care placements.
        </p>
      </div>

      {/* Rescue Missions Stream */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Active Community Rescue Missions</h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {missions.map(mission => (
            <div key={mission.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.85rem', color: '#f8fafc' }}>{mission.title}</strong>
                <span style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: 600 }}>{mission.status}</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '8px' }}>📍 {mission.location} • Reported by {mission.reporter}</p>

              <div style={{ display: 'flex', gap: '8px' }}>
                {mission.status.includes('Pending') ? (
                  <button onClick={() => handleAcceptMission(mission.id)} className="btn-primary" style={{ fontSize: '0.72rem', padding: '6px 10px' }}>
                    Accept Rescue Mission
                  </button>
                ) : (
                  <button onClick={() => handleUploadImage(mission.id)} className="btn-secondary" style={{ fontSize: '0.72rem', padding: '6px 10px' }}>
                    <Upload style={{ width: '12px', height: '12px' }} /> {mission.imageUploaded ? "Photo Verified ✓" : "Upload Rescue Photo"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Foster Placement Coordinator */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Home style={{ color: '#38bdf8', width: '16px', height: '16px' }} />
          Foster Care Placement Coordinator
        </h4>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', fontSize: '0.78rem' }}>
          <p style={{ color: '#a5b4fc', fontWeight: 600 }}>3 Active Foster Homes Available Nearby</p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginTop: '2px' }}>Greenwood Area • 1 Dog spot & 2 Cat spots available.</p>
        </div>
      </div>
    </div>
  );
}
