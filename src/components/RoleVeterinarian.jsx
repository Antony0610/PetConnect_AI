import React, { useState } from 'react';
import { Stethoscope, FileText, PlusCircle, CheckCircle2, ShieldAlert, Upload, Syringe, Pill } from 'lucide-react';

export default function RoleVeterinarian({ petData }) {
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Stethoscope style={{ color: '#34d399', width: '20px', height: '20px' }} />
            Veterinarian Workspace & Clinical Portal
          </h3>
          <span className="status-pill status-online">Dr. Sarah Jenkins (Licensed Vet)</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Active Patient: <strong>{petData.name} ({petData.breed})</strong> • Microchip: {petData.microchip}
        </p>
      </div>

      {/* Action 1: Add New Prescription */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Pill style={{ color: '#a5b4fc', width: '16px', height: '16px' }} />
          Issue New Electronic Prescription
        </h4>

        <form onSubmit={handleAddPrescription} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Medication name (e.g. Carprofen 75mg)..." 
            value={newMed} 
            onChange={e => setNewMed(e.target.value)}
            style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '8px', color: 'white', fontSize: '0.78rem', outline: 'none' }}
          />
          <input 
            type="text" 
            placeholder="Dosage & Frequency (e.g. 1 tab once daily)..." 
            value={newDosage} 
            onChange={e => setNewDosage(e.target.value)}
            style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '8px', color: 'white', fontSize: '0.78rem', outline: 'none' }}
          />
          <input 
            type="text" 
            placeholder="Clinical instructions & duration..." 
            value={newNotes} 
            onChange={e => setNewNotes(e.target.value)}
            style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '8px', color: 'white', fontSize: '0.78rem', outline: 'none' }}
          />
          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', fontSize: '0.78rem', padding: '8px' }}>
            <PlusCircle style={{ width: '14px', height: '14px' }} /> Add Prescription Record
          </button>
        </form>
      </div>

      {/* Active Prescriptions List */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Active Digital Prescriptions</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {prescriptions.map(item => (
            <div key={item.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.82rem', color: '#a5b4fc' }}>{item.med}</strong>
                <span style={{ fontSize: '0.7rem', color: '#34d399' }}>{item.dosage}</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>{item.notes} • Prescribed by {item.vet}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action 2: Update Vaccination Records */}
      <div className="app-card">
        <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Syringe style={{ color: '#34d399', width: '16px', height: '16px' }} />
          Verified Vaccination Records & Digital Signature
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {vaccines.map(v => (
            <div key={v.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.82rem', color: '#f8fafc' }}>{v.name}</strong>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Administered: {v.date} • Expiry: {v.expiry}</p>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', padding: '3px 8px', borderRadius: '6px' }}>
                ✓ {v.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
