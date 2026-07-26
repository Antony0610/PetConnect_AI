import React, { useState } from 'react';
import { Users, Flag, Camera, AlertCircle, Home, Upload, ShieldAlert, Zap } from 'lucide-react';

export default function RoleRescueVolunteer({ activeSubTab }) {
  const [missions, setMissions] = useState([
    { id: 1, title: "Injured Stray Dog (Leg Fracture)", location: "Sector 4 Metro Pillar 42", status: "Pending Acceptance", reporter: "Alex M.", imageUploaded: false, priorityScore: 95 },
    { id: 2, title: "Abandoned Puppy Litter", location: "Greenwood Park Entrance", status: "Assigned (You)", reporter: "Priya S.", imageUploaded: true, priorityScore: 65 }
  ]);

  const [rescueCondition, setRescueCondition] = useState('Road Accident');
  const [calculatedPriority, setCalculatedPriority] = useState({ score: 95, tier: 'HIGH PRIORITY DISPATCH' });

  const handleAcceptMission = (id) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status: "In Progress (Assigned to You)" } : m));
  };

  const handleUploadImage = (id) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, imageUploaded: true, status: "Rescued / Photo Verified" } : m));
  };

  const handleEvaluatePriority = () => {
    if (rescueCondition.includes('Accident') || rescueCondition.includes('Fracture')) {
      setCalculatedPriority({ score: 95, tier: 'HIGH PRIORITY DISPATCH (Immediate Dispatch)' });
    } else {
      setCalculatedPriority({ score: 65, tier: 'MEDIUM PRIORITY (Standard Routing)' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header Banner */}
      <div className="app-card" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(15, 23, 42, 0.95))', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users style={{ color: '#ec4899', width: '18px', height: '18px' }} />
            Rescue Volunteer Station
          </h3>
          <span className="status-pill status-online">Alex M. (Volunteer)</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Coordinate local stray animal rescues, evaluate rescue priority scores, and manage foster care placements.
        </p>
      </div>

      {/* Tab 1: View Rescue Requests & Rescue Priority Dispatch Engine */}
      {(activeSubTab === 'rescue_requests' || !activeSubTab) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Rescue Priority Dispatch Engine */}
          <div className="app-card">
            <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap style={{ color: '#ef4444', width: '16px', height: '16px' }} />
              AI Rescue Priority Dispatch Calculator
            </h4>
            
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '3px' }}>Evaluate Stray Animal Condition</label>
              <select 
                value={rescueCondition}
                onChange={e => setRescueCondition(e.target.value)}
                style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
              >
                <option value="Road Accident">Road Accident / Severe Fracture (High Priority)</option>
                <option value="Abandoned Litter">Abandoned Litter (Medium Priority)</option>
                <option value="Minor Scratch">Minor Scratch (Low Priority)</option>
              </select>
            </div>

            <button onClick={handleEvaluatePriority} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem', padding: '6px' }}>
              Calculate Rescue Priority Score
            </button>

            <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#fca5a5' }}>PRIORITY SCORE: <strong style={{ color: '#ef4444' }}>{calculatedPriority.score}/100</strong></span>
              <span style={{ fontSize: '0.68rem', color: '#fca5a5', fontWeight: 700 }}>{calculatedPriority.tier}</span>
            </div>
          </div>

          <div className="app-card">
            <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users style={{ color: '#ec4899', width: '16px', height: '16px' }} />
              Community Rescue Requests
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {missions.map(m => (
                <div key={m.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#f8fafc' }}>{m.title}</strong>
                    <span style={{ fontSize: '0.68rem', color: m.priorityScore >= 80 ? '#ef4444' : '#fbbf24', fontWeight: 700 }}>
                      Score: {m.priorityScore}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>📍 {m.location} • Reporter: {m.reporter}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Accept Rescue Mission */}
      {activeSubTab === 'active_missions' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flag style={{ color: '#34d399', width: '16px', height: '16px' }} />
            Accept & Manage Rescue Missions
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {missions.map(m => (
              <div key={m.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                <strong style={{ fontSize: '0.82rem', color: '#f8fafc' }}>{m.title}</strong>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', margin: '2px 0 6px' }}>Status: {m.status}</p>

                {m.status.includes('Pending') ? (
                  <button onClick={() => handleAcceptMission(m.id)} className="btn-primary" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>
                    Accept Rescue Mission
                  </button>
                ) : (
                  <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>Assigned to You ✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Upload Rescue Images */}
      {activeSubTab === 'verify_photos' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Camera style={{ color: '#a5b4fc', width: '16px', height: '16px' }} />
            Upload Rescue Photos & Field Verification
          </h4>
          <div style={{ border: '2px dashed rgba(255,255,255,0.15)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <Upload style={{ width: '22px', height: '22px', color: 'var(--text-dim)', margin: '0 auto 4px' }} />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upload rescue photo proof for Mission #1</p>
            <button onClick={() => handleUploadImage(1)} className="btn-primary" style={{ marginTop: '6px', fontSize: '0.72rem', padding: '5px 10px' }}>
              Upload Rescue Photo
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Report Injured Animal */}
      {activeSubTab === 'report_stray' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle style={{ color: '#ef4444', width: '16px', height: '16px' }} />
            Report Injured Animal / Stray Dispatch
          </h4>
          <input type="text" placeholder="Location details..." style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', marginBottom: '6px', outline: 'none' }} />
          <input type="text" placeholder="Injury description..." style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', marginBottom: '6px', outline: 'none' }} />
          <button className="btn-sos" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem' }}>Submit Stray Dispatch Report</button>
        </div>
      )}

      {/* Tab 5: Coordinate Foster Care */}
      {activeSubTab === 'foster_care' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Home style={{ color: '#38bdf8', width: '16px', height: '16px' }} />
            Coordinate Foster Care Placement
          </h4>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem' }}>
            <p style={{ color: '#a5b4fc', fontWeight: 600 }}>Greenwood Foster Home #1</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>Capacity: 2 Dogs • Status: 1 Spot Available</p>
          </div>
        </div>
      )}
    </div>
  );
}
