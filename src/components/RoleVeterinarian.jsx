import React, { useState } from 'react';
import { Stethoscope, FileText, PlusCircle, CheckCircle2, ShieldAlert, Upload, Syringe, Pill } from 'lucide-react';

export default function RoleVeterinarian({ petData, activeSubTab }) {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, med: "Amoxicillin 250mg", dosage: "1 tablet twice daily", notes: "Take after meals for 7 days", vet: "Dr. Sarah Jenkins" },
    { id: 2, med: "Flea & Tick Topical", dosage: "1 applicator", notes: "Monthly preventative treatment", vet: "Dr. Sarah Jenkins" }
  ]);

  const [newMed, setNewMed] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const [vaccines, setVaccines] = useState([
    { id: 1, name: "Rabies Vaccine (Annual)", date: "15 Jan 2026", expiry: "15 Jan 2027", status: "Valid" },
    { id: 2, name: "DHPP Core Vaccine", date: "04 Nov 2025", expiry: "04 Nov 2026", status: "Valid" }
  ]);

  const handleAddPrescription = (e) => {
    e.preventDefault();
    if (!newMed.trim()) return;
    setPrescriptions(prev => [
      { id: Date.now(), med: newMed, dosage: newDosage, notes: newNotes, vet: "Dr. Sarah Jenkins (You)" },
      ...prev
    ]);
    setNewMed(''); setNewDosage(''); setNewNotes('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header Banner */}
      <div className="app-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.95))', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Stethoscope style={{ color: '#34d399', width: '18px', height: '18px' }} />
            Veterinarian Clinical Portal
          </h3>
          <span className="status-pill status-online">Dr. Sarah Jenkins</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Active Patient: <strong>{petData.name} ({petData.breed})</strong> • Microchip: {petData.microchip}
        </p>
      </div>

      {/* Tab 1: Access Medical History */}
      {(activeSubTab === 'medical_history' || !activeSubTab) && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText style={{ color: '#818cf8', width: '16px', height: '16px' }} />
            Access Patient Medical History
          </h4>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem' }}>
            <p style={{ color: '#f8fafc', fontWeight: 600 }}>Routine Annual Checkup Completed</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', marginTop: '2px' }}>Weight: 28.4 kg • Temperature: 101.5 °F • Heart Rate: 84 bpm (Normal)</p>
          </div>
        </div>
      )}

      {/* Tab 2: Prescriptions */}
      {activeSubTab === 'prescriptions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="app-card">
            <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Pill style={{ color: '#a5b4fc', width: '16px', height: '16px' }} />
              Issue New Electronic Prescription
            </h4>
            <form onSubmit={handleAddPrescription} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input 
                type="text" 
                placeholder="Medication name..." 
                value={newMed} 
                onChange={e => setNewMed(e.target.value)}
                style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
              />
              <input 
                type="text" 
                placeholder="Dosage & Frequency..." 
                value={newDosage} 
                onChange={e => setNewDosage(e.target.value)}
                style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
              />
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', fontSize: '0.75rem', padding: '6px' }}>
                <PlusCircle style={{ width: '13px', height: '13px' }} /> Add Prescription
              </button>
            </form>
          </div>

          <div className="app-card">
            <h4 style={{ fontSize: '0.88rem', marginBottom: '8px' }}>Issued Prescriptions</h4>
            {prescriptions.map(item => (
              <div key={item.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '6px', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.8rem', color: '#a5b4fc' }}>{item.med}</strong>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{item.dosage} • Prescribed by {item.vet}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Update Vaccinations */}
      {activeSubTab === 'vaccinations' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Syringe style={{ color: '#34d399', width: '16px', height: '16px' }} />
            Update & Verify Vaccination Records
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {vaccines.map(v => (
              <div key={v.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#f8fafc' }}>{v.name}</strong>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Administered: {v.date} • Expiry: {v.expiry}</p>
                </div>
                <span style={{ fontSize: '0.68rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                  ✓ {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Upload Reports */}
      {activeSubTab === 'reports' && (
        <div className="app-card">
          <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Upload style={{ color: '#38bdf8', width: '16px', height: '16px' }} />
            Upload Clinical Lab Reports & Diagnostics
          </h4>
          <div style={{ border: '2px dashed rgba(255,255,255,0.15)', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <Upload style={{ width: '24px', height: '24px', color: 'var(--text-dim)', margin: '0 auto 6px' }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Drag & drop PDF / DICOM lab scan files</p>
            <button className="btn-secondary" style={{ marginTop: '8px', fontSize: '0.72rem', padding: '6px 12px' }}>Browse Files</button>
          </div>
        </div>
      )}

      {/* Tab 5: Emergency Requests */}
      {activeSubTab === 'emergencies' && (
        <div className="app-card" style={{ border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#f87171', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 style={{ width: '16px', height: '16px' }} />
            Respond to Emergency & Approve Medical Requests
          </h4>
          <div style={{ background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem' }}>
            <p style={{ color: '#fca5a5', fontWeight: 600 }}>🚨 Emergency Broadcast Active: Bruno (Golden Retriever)</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', marginTop: '2px' }}>GPS Collar Coordinates: 10.02345 N, 76.34567 E</p>
            <button className="btn-primary" style={{ marginTop: '8px', fontSize: '0.72rem', padding: '6px 10px', background: '#ef4444' }}>
              Accept Emergency Dispatch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
