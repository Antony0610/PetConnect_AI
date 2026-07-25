import React, { useState } from 'react';
import { Sparkles, Camera, Search, Bot, Activity, HeartHandshake, ShieldAlert, Fingerprint, Upload, CheckCircle2, RefreshCw, FileText } from 'lucide-react';

export default function Volume2AIVision() {
  const [activeTab, setActiveTab] = useState('identity');

  // Multi-Biometric Scanner States
  const [faceImage, setFaceImage] = useState('/collar_hero.jpg');
  const [noseImage, setNoseImage] = useState('/ai_matcher.jpg');
  const [bodyImage, setBodyImage] = useState('/collar_hero.jpg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);

  // Biometric Similarity Scores
  const [biometricScores, setBiometricScores] = useState({
    faceScore: 94.2,
    noseScore: 98.6,
    coatScore: 91.5,
    bodyScore: 93.0,
    overallMatch: 96.7,
    statusText: 'Verified Unique Biometric Identity Profile (95%+ Match)'
  });

  // Lost Pet Finder Matcher State
  const [similarityScore] = useState(94.2);

  // Pet Care Assistant RAG State
  const [ragQuery, setRagQuery] = useState('');
  const [ragLogs, setRagLogs] = useState([
    { query: "Where is Bruno right now?", reply: "Bruno is currently 420 meters from home and walking. Collar battery level is 74%.", source: "Live GPS Telemetry" },
    { query: "When is Bruno's next core vaccination?", reply: "Bruno's next Rabies Core vaccination is due on September 12.", source: "Verified Health Passport" }
  ]);

  // Adoption Matcher State
  const [adoptionResults] = useState([
    { breed: 'Golden Retriever', score: 92, reason: 'Gentle temperament & high family compatibility' },
    { breed: 'Beagle', score: 89, reason: 'Compact size suitable for apartments' },
    { breed: 'Labrador Retriever', score: 88, reason: 'Highly energetic & easy to train' }
  ]);

  // Emergency Rescue Priority State
  const [strayCondition, setStrayCondition] = useState('Road Accident');
  const [priorityScore, setPriorityScore] = useState(95);

  const handleRunBiometricAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setBiometricScores({
        faceScore: (92 + Math.random() * 6).toFixed(1),
        noseScore: (96 + Math.random() * 3).toFixed(1),
        coatScore: (90 + Math.random() * 5).toFixed(1),
        bodyScore: (91 + Math.random() * 4).toFixed(1),
        overallMatch: 97.4,
        statusText: 'Biometric Identity Verified (High Confidence)'
      });
    }, 1200);
  };

  const handleImageUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'face') setFaceImage(url);
      if (type === 'nose') setNoseImage(url);
      if (type === 'body') setBodyImage(url);
    }
  };

  const handleSendRAGQuery = (e) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;

    let reply = `Regarding Bruno: Ensure adequate exercise and fresh water. Consult Dr. Sarah Jenkins if symptoms develop.`;
    let source = `PetCare AI Engine`;

    if (ragQuery.toLowerCase().includes('where') || ragQuery.toLowerCase().includes('gps')) {
      reply = `Bruno is currently 420 meters from home and walking. Collar battery level is 74%.`;
      source = `Live GPS Telemetry`;
    } else if (ragQuery.toLowerCase().includes('vaccin')) {
      reply = `Bruno's next Rabies Core vaccination is due on September 12.`;
      source = `Verified Health Passport`;
    }

    setRagLogs(prev => [...prev, { query: ragQuery, reply, source }]);
    setRagQuery('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Sleek Clean Feature Navigation Tabs */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'identity', label: 'Biometric Pet ID' },
          { id: 'matcher', label: 'Lost Pet Matcher' },
          { id: 'assistant', label: 'AI Assistant' },
          { id: 'activity', label: 'Activity Tracker' },
          { id: 'adoption', label: 'Adoption Scorer' },
          { id: 'rescue', label: 'Rescue Priority' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === tab.id ? '#a5b4fc' : 'var(--text-muted)',
              border: activeTab === tab.id ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid var(--border-glass)',
              padding: '6px 8px',
              borderRadius: '8px',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Biometric Pet ID Scanner (Drag & Drop Photo Uploader + Multi-Biometric Analyzer) */}
      {activeTab === 'identity' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Fingerprint style={{ color: '#818cf8', width: '18px', height: '18px' }} />
            Multi-Biometric Pet ID Scanner
          </h4>

          {/* Interactive 3-Photo Upload Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
            {/* Photo 1: Facial Recognition */}
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '10px', padding: '8px', textAlign: 'center', position: 'relative' }}>
              <img src={faceImage} alt="Facial Scan" style={{ width: '100%', height: '65px', objectFit: 'cover', borderRadius: '6px', marginBottom: '4px' }} />
              <label style={{ display: 'block', fontSize: '0.62rem', color: '#a5b4fc', cursor: 'pointer', fontWeight: 600 }}>
                📷 Front Face
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload('face', e)} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Photo 2: Nose Print Texture */}
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '10px', padding: '8px', textAlign: 'center', position: 'relative' }}>
              <img src={noseImage} alt="Nose Print" style={{ width: '100%', height: '65px', objectFit: 'cover', borderRadius: '6px', marginBottom: '4px' }} />
              <label style={{ display: 'block', fontSize: '0.62rem', color: '#34d399', cursor: 'pointer', fontWeight: 600 }}>
                👃 Nose Print
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload('nose', e)} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Photo 3: Full Body Coat Pattern */}
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '10px', padding: '8px', textAlign: 'center', position: 'relative' }}>
              <img src={bodyImage} alt="Full Body" style={{ width: '100%', height: '65px', objectFit: 'cover', borderRadius: '6px', marginBottom: '4px' }} />
              <label style={{ display: 'block', fontSize: '0.62rem', color: '#38bdf8', cursor: 'pointer', fontWeight: 600 }}>
                🐕 Full Body
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload('body', e)} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Run Biometric Analysis Action Button */}
          <button 
            onClick={handleRunBiometricAnalysis}
            disabled={isAnalyzing}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', padding: '8px', marginBottom: '12px' }}
          >
            {isAnalyzing ? "Extracting Biometric Features..." : "Analyze & Generate Biometric Identity"}
          </button>

          {/* Analysis Results Breakdown */}
          {analysisComplete && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>FACE EMBEDDING</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>{biometricScores.faceScore}%</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>NOSE PRINT</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399' }}>{biometricScores.noseScore}%</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>COAT PATTERN</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a5b4fc' }}>{biometricScores.coatScore}%</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>BODY SHAPE</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c084fc' }}>{biometricScores.bodyScore}%</p>
                </div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>✓ {biometricScores.statusText}</span>
                <strong style={{ fontSize: '0.85rem', color: '#34d399' }}>{biometricScores.overallMatch}%</strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Lost Pet Finder Matcher */}
      {activeTab === 'matcher' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search style={{ color: '#ec4899', width: '18px', height: '18px' }} />
            Lost Pet Facial Feature Matcher
          </h4>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '10px 0' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img src="/collar_hero.jpg" alt="Missing Report" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Missing Report</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ fontSize: '1rem', color: '#34d399' }}>{similarityScore}%</strong>
              <p style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>Similarity</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img src="/ai_matcher.jpg" alt="Sighted Photo" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Public Sighting</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. AI Assistant */}
      {activeTab === 'assistant' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bot style={{ color: '#38bdf8', width: '18px', height: '18px' }} />
            PetCare AI Conversational Assistant
          </h4>

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
              placeholder="Ask PetCare AI (e.g. Where is Bruno?)..."
              value={ragQuery}
              onChange={e => setRagQuery(e.target.value)}
              style={{ flex: 1, background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ fontSize: '0.75rem', padding: '6px 10px' }}>Ask</button>
          </form>
        </div>
      )}

      {/* 4. Activity Tracker */}
      {activeTab === 'activity' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity style={{ color: '#c084fc', width: '18px', height: '18px' }} />
            Activity & Motion Tracker
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', textAlign: 'center' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>WALKING</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399' }}>42 Mins</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>RUNNING</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a5b4fc' }}>12 Mins</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>SLEEPING</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>9.5 Hours</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Adoption Scorer */}
      {activeTab === 'adoption' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HeartHandshake style={{ color: '#34d399', width: '18px', height: '18px' }} />
            Adoption Breed Matchmaker
          </h4>
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

      {/* 6. Rescue Priority */}
      {activeTab === 'rescue' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert style={{ color: '#ef4444', width: '18px', height: '18px' }} />
            Stray Rescue Priority Dispatcher
          </h4>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '3px' }}>Stray Animal Emergency Condition</label>
            <select 
              value={strayCondition}
              onChange={e => setStrayCondition(e.target.value)}
              style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
            >
              <option value="Road Accident">Road Accident / Severe Fracture (High Priority)</option>
              <option value="Abandoned Litter">Abandoned Litter (Medium Priority)</option>
            </select>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <span style={{ fontSize: '0.7rem', color: '#fca5a5' }}>PRIORITY DISPATCH SCORE: </span>
            <strong style={{ fontSize: '0.9rem', color: '#f87171' }}>{priorityScore} / 100 (Immediate Dispatch)</strong>
          </div>
        </div>
      )}
    </div>
  );
}
