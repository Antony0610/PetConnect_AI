import React, { useState } from 'react';
import { Sparkles, Camera, Search, Bot, Activity, HeartHandshake, ShieldAlert, Cpu, Fingerprint, Layers, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Volume2AIVision() {
  const [activeModule, setActiveModule] = useState('module_a');

  // MODULE A: Multi-Biometric Identity
  const [biometricPetName, setBiometricPetName] = useState('Bruno');
  const [biometricResults, setBiometricResults] = useState({
    face: '94.2%',
    nose: '98.6%',
    coat: '91.5%',
    body: '93.0%',
    overall: '96.7%',
    decision: 'CONFIRMED SAME PET (95%+ Match Threshold)'
  });

  // MODULE B: Lost Pet Search
  const [similarityScore] = useState(94.2);

  // MODULE C: RAG Assistant
  const [ragQuery, setRagQuery] = useState('');
  const [ragLogs, setRagLogs] = useState([
    { query: "Where is Bruno?", reply: "Bruno is currently 420 meters from home and is walking. Battery level is 74%.", source: "Retrieved from Live ESP32 GPS Telemetry" },
    { query: "When is Bruno's next vaccination?", reply: "Bruno's next vaccination (Rabies Core) is due on 12 September.", source: "Retrieved from Verified Vaccination Database Table" }
  ]);

  // MODULE E: Adoption Scorer
  const [houseSize, setHouseSize] = useState('Apartment');
  const [adoptionResults, setAdoptionResults] = useState([
    { breed: 'Golden Retriever', score: 92, reason: 'High child friendliness & affectionate' },
    { breed: 'Beagle', score: 89, reason: 'Moderate size suitable for apartments' },
    { breed: 'Labrador Retriever', score: 88, reason: 'Highly trainable companion' }
  ]);

  // MODULE F: Rescue Priority Scorer
  const [rescueCondition, setRescueCondition] = useState('Road Accident');
  const [priorityResult, setPriorityResult] = useState({
    score: 95,
    tier: 'HIGH PRIORITY DISPATCH',
    action: 'Immediate Dispatch to Nearest 24/7 Vet Clinic & Volunteer'
  });

  const handleSendRAGQuery = (e) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;

    let reply = `Regarding Bruno: Maintain regular exercise and fresh water. Consult your vet if symptoms persist.`;
    let source = `Gemma 3 / Phi-3 Mini RAG General Knowledge`;

    if (ragQuery.toLowerCase().includes('where') || ragQuery.toLowerCase().includes('gps')) {
      reply = `Bruno is currently 420 meters from home and is walking. Battery level is 74%.`;
      source = `Retrieved from Live ESP32 GPS Telemetry Table`;
    } else if (ragQuery.toLowerCase().includes('vaccin')) {
      reply = `Bruno's next vaccination (Rabies Core) is due on 12 September.`;
      source = `Retrieved from Verified Vaccination Database Table`;
    }

    setRagLogs(prev => [...prev, { query: ragQuery, reply, source }]);
    setRagQuery('');
  };

  const handleCalculatePriority = () => {
    if (rescueCondition.toLowerCase().includes('accident') || rescueCondition.toLowerCase().includes('fracture')) {
      setPriorityResult({
        score: 95,
        tier: 'HIGH PRIORITY DISPATCH',
        action: 'Immediate Dispatch to Nearest 24/7 Vet Clinic & Volunteer'
      });
    } else {
      setPriorityResult({
        score: 65,
        tier: 'MEDIUM PRIORITY',
        action: 'Standard Volunteer Assignment'
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* 6 AI Modules Selector Tabs */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'module_a', label: 'Mod A: Multi-Biometric Identity' },
          { id: 'module_b', label: 'Mod B: Lost Pet AI' },
          { id: 'module_c', label: 'Mod C: RAG Assistant' },
          { id: 'module_d', label: 'Mod D: Activity ML' },
          { id: 'module_e', label: 'Mod E: Adoption AI' },
          { id: 'module_f', label: 'Mod F: Rescue Priority' }
        ].map(mod => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            style={{
              flex: 1,
              background: activeModule === mod.id ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255, 255, 255, 0.04)',
              color: activeModule === mod.id ? '#a5b4fc' : 'var(--text-muted)',
              border: activeModule === mod.id ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid var(--border-glass)',
              padding: '6px 8px',
              borderRadius: '8px',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {mod.label}
          </button>
        ))}
      </div>

      {/* MODULE A: AI Pet Identity (Multi-Biometric Identification) */}
      {activeModule === 'module_a' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Fingerprint style={{ color: '#818cf8', width: '18px', height: '18px' }} />
            MODULE A – AI Pet Identity (Multi-Biometric Fusion)
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Combines 4 Biological Modalities: ArcFace Face (512d) + Vision Transformer Nose Print (1024d) + EfficientNet Coat (256d) + YOLOv8 Body Shape (128d).
          </p>

          {/* Biometric Fusion Breakdown Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>FACE SIMILARITY (512d)</span>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>{biometricResults.face}</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>NOSE PRINT (1024d)</span>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#34d399' }}>{biometricResults.nose}</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>COAT PATTERN (256d)</span>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#a5b4fc' }}>{biometricResults.coat}</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>BODY SHAPE (128d)</span>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#c084fc' }}>{biometricResults.body}</p>
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>FUSED OVERALL MATCH SCORE</span>
              <strong style={{ fontSize: '0.85rem', color: '#34d399' }}>{biometricResults.overall}</strong>
            </div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399' }}>✓ {biometricResults.decision}</p>
          </div>
        </div>
      )}

      {/* MODULE B: Lost Pet AI */}
      {activeModule === 'module_b' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search style={{ color: '#ec4899', width: '18px', height: '18px' }} />
            MODULE B – Lost Pet AI Search Engine
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Public uploads found pet photo -> AI Feature Extractor computes Cosine Similarity against all missing reports -> Ranks Top 10 matches & dispatches GPS notification.
          </p>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img src="/collar_hero.jpg" alt="Missing" style={{ width: '100%', height: '85px', objectFit: 'cover', borderRadius: '8px' }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Missing Report</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontSize: '1rem', color: '#34d399' }}>{similarityScore}%</strong>
              <p style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>Cosine Match</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img src="/ai_matcher.jpg" alt="Found" style={{ width: '100%', height: '85px', objectFit: 'cover', borderRadius: '8px' }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Public Finder Sighted</span>
            </div>
          </div>
        </div>
      )}

      {/* MODULE C: PetConnect AI Assistant (RAG Engine) */}
      {activeModule === 'module_c' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bot style={{ color: '#38bdf8', width: '18px', height: '18px' }} />
            MODULE C – PetConnect AI Assistant (Gemma 3 / Phi-3 Mini RAG)
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Retrieval-Augmented Generation (RAG) querying live pet database records (GPS, Activity, Vaccination, Prescriptions) before rendering conversational responses.
          </p>

          <div style={{ height: '150px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '8px', overflowY: 'auto', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ragLogs.map((log, idx) => (
              <div key={idx} style={{ background: 'rgba(30, 41, 70, 0.8)', padding: '8px', borderRadius: '8px', fontSize: '0.75rem' }}>
                <p style={{ color: '#a5b4fc', fontWeight: 600 }}>Q: {log.query}</p>
                <p style={{ color: '#f8fafc', margin: '2px 0' }}>{log.reply}</p>
                <span style={{ fontSize: '0.65rem', color: '#34d399' }}>📍 {log.source}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendRAGQuery} style={{ display: 'flex', gap: '6px' }}>
            <input 
              type="text"
              placeholder="Ask RAG assistant (e.g. Where is Bruno?)..."
              value={ragQuery}
              onChange={e => setRagQuery(e.target.value)}
              style={{ flex: 1, background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ fontSize: '0.75rem', padding: '6px 10px' }}>Query RAG</button>
          </form>
        </div>
      )}

      {/* MODULE D: Activity Intelligence */}
      {activeModule === 'module_d' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity style={{ color: '#c084fc', width: '18px', height: '18px' }} />
            MODULE D – Activity Intelligence (MPU6050 ML Classifier)
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            ESP32 Accelerometer vector classification into Walking, Running, Sleeping, Resting, Fall Spike, and Inactive states.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>WALK TIME</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399' }}>42 Mins</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>RUN TIME</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a5b4fc' }}>12 Mins</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>REST / SLEEP</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>9.5 Hours</p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE E: AI Adoption Recommendation */}
      {activeModule === 'module_e' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HeartHandshake style={{ color: '#34d399', width: '18px', height: '18px' }} />
            MODULE E – AI Adoption Recommendation Engine
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Decision Tree / Random Forest model scoring breed compatibility based on house size, working hours, experience, and children.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {adoptionResults.map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.8rem', color: '#f8fafc' }}>{item.breed}</strong>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{item.reason}</p>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>{item.score}% Match</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE F: Rescue Priority Engine */}
      {activeModule === 'module_f' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert style={{ color: '#ef4444', width: '18px', height: '18px' }} />
            MODULE F – Rescue Priority Engine
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Calculates 0 - 100 Priority Dispatch Scores based on Injury Severity, GPS Distance, Volunteer Availability & Weather.
          </p>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '3px' }}>Stray Animal Condition</label>
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

          <button onClick={handleCalculatePriority} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem', padding: '6px' }}>
            Calculate Priority Score
          </button>

          <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.7rem', color: '#fca5a5' }}>CALCULATED PRIORITY SCORE</span>
              <strong style={{ fontSize: '1rem', color: '#f87171' }}>{priorityResult.score} / 100</strong>
            </div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fca5a5', marginTop: '2px' }}>{priorityResult.tier}: {priorityResult.action}</p>
          </div>
        </div>
      )}
    </div>
  );
}
