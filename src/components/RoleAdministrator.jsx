import React, { useState } from 'react';
import { Shield, Users, UserCheck, FileSearch, Cpu, Megaphone } from 'lucide-react';

export default function RoleAdministrator({ activeSubTab }) {
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield style={{ color: '#818cf8', width: '18px', height: '18px' }} />
            Administrator Control Center
          </h3>
          <span className="status-pill status-online">Super Admin</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Manage users, verify veterinary clinics, approve volunteers, and monitor platform AI logs.
        </p>
      </div>

      {/* Tab 1: User Management */}
      {(activeSubTab === 'user_mgmt' || !activeSubTab) && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users style={{ color: '#818cf8', width: '16px', height: '16px' }} />
            User & Veterinarian Management
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.8rem', color: '#f8fafc' }}>Dr. Sarah Jenkins</strong>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Role: Licensed Veterinarian • Verified ✓</p>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#34d399' }}>Active</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Approve Rescue Volunteers */}
      {activeSubTab === 'volunteer_approvals' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <UserCheck style={{ color: '#ec4899', width: '16px', height: '16px' }} />
            Approve Rescue Volunteer Applications
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {volunteers.map(v => (
              <div key={v.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#f8fafc' }}>{v.name}</strong>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{v.email} • {v.status}</p>
                </div>
                {v.status === 'Pending Approval' ? (
                  <button onClick={() => handleApproveVolunteer(v.id)} className="btn-primary" style={{ fontSize: '0.68rem', padding: '3px 6px' }}>
                    Approve
                  </button>
                ) : (
                  <span style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 600 }}>Approved ✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: System Reports */}
      {activeSubTab === 'system_reports' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileSearch style={{ color: '#38bdf8', width: '16px', height: '16px' }} />
            Platform System Reports & Adoption Analytics
          </h4>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', fontSize: '0.75rem' }}>
            <p style={{ color: '#34d399', fontWeight: 600 }}>98.4% Emergency SOS Resolution Rate</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>42 Successful Pet Adoptions Processed This Month</p>
          </div>
        </div>
      )}

      {/* Tab 4: AI System Logs */}
      {activeSubTab === 'ai_logs' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu style={{ color: '#a5b4fc', width: '16px', height: '16px' }} />
            Manage AI System Audit Logs
          </h4>
          <div className="code-box" style={{ fontSize: '0.7rem' }}>
            [SYSTEM LOG] Siamese Neural Feature Matcher: 94.2% match accuracy<br/>
            [SYSTEM LOG] MobileNetV3 Classifier: 96.4% confidence breed score<br/>
            [SYSTEM LOG] LLM Triage: 89 queries processed without emergency escalations
          </div>
        </div>
      )}

      {/* Tab 5: Broadcasts & Analytics */}
      {activeSubTab === 'broadcasts' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Megaphone style={{ color: '#38bdf8', width: '16px', height: '16px' }} />
            Broadcast Notifications & System Analytics
          </h4>
          <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <input 
              type="text" 
              placeholder="Type system notification..." 
              value={broadcastMsg}
              onChange={e => setBroadcastMsg(e.target.value)}
              style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', fontSize: '0.75rem', padding: '6px' }}>
              Broadcast Notification
            </button>
          </form>

          {broadcastSent && (
            <p style={{ color: '#34d399', fontSize: '0.72rem', marginTop: '6px', fontWeight: 600 }}>
              ✓ Broadcast notification sent to all platform users!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
