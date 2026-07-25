import React, { useState } from 'react';
import { Shield, Users, Stethoscope, BellRing, Cpu, Activity, CheckCircle2, AlertOctagon, Megaphone } from 'lucide-react';

export default function RoleAdministrator() {
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "David K.", email: "david@rescue.org", status: "Pending Approval" },
    { id: 2, name: "Sarah M.", email: "sarah@pets.org", status: "Approved" }
  ]);

  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleApproveVolunteer = (id) => {
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status: "Approved" } : v));
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMsg('');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header Banner */}
      <div className="app-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(15, 23, 42, 0.95))', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield style={{ color: '#818cf8', width: '20px', height: '20px' }} />
            Administrator Control Center
          </h3>
          <span className="status-pill status-online">Super Admin</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Manage platform user roles, approve veterinary clinics, verify volunteers, and broadcast system notifications.
        </p>
      </div>

      {/* Approve Rescue Volunteers */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Users style={{ color: '#ec4899', width: '16px', height: '16px' }} />
          Rescue Volunteer Verification Queue
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {volunteers.map(v => (
            <div key={v.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.82rem', color: '#f8fafc' }}>{v.name}</strong>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{v.email} • Status: {v.status}</p>
              </div>

              {v.status === 'Pending Approval' ? (
                <button onClick={() => handleApproveVolunteer(v.id)} className="btn-primary" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>
                  Approve Volunteer
                </button>
              ) : (
                <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>Verified ✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast Notifications to All Users */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Megaphone style={{ color: '#38bdf8', width: '16px', height: '16px' }} />
          Broadcast Push Notification to Platform
        </h4>

        <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Type broadcast message (e.g. Rabies Drive at Metro Center)..." 
            value={broadcastMsg}
            onChange={e => setBroadcastMsg(e.target.value)}
            style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '8px', color: 'white', fontSize: '0.78rem', outline: 'none' }}
          />
          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', fontSize: '0.78rem', padding: '8px' }}>
            Send System Broadcast
          </button>
        </form>

        {broadcastSent && (
          <p style={{ color: '#34d399', fontSize: '0.75rem', marginTop: '6px', fontWeight: 600 }}>
            ✓ Push notification broadcasted to all registered users!
          </p>
        )}
      </div>

      {/* Manage AI Logs & Analytics */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Cpu style={{ color: '#a5b4fc', width: '16px', height: '16px' }} />
          AI & Telemetry System Audit Log
        </h4>
        <div className="code-box" style={{ fontSize: '0.72rem' }}>
          [AUDIT] 1,248 Active Collars Synced<br/>
          [AI SCAN] 342 Breed Inferences Processed Today<br/>
          [LLM SYMPTOM] 89 Triage Queries Responded
        </div>
      </div>
    </div>
  );
}
