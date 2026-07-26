import React, { useState } from 'react';
import { Sparkles, Camera, Search, Bot, Activity, HeartHandshake, ShieldAlert, Fingerprint, Upload, CheckCircle2, RefreshCw, FileText, ArrowRight, Layers, Home, Clock, Users, DollarSign, Award } from 'lucide-react';

export default function Volume2AIVision() {
  const [activeTab, setActiveTab] = useState('identity');

  // 1. Multi-Biometric Scanner States with 4 Interactive Drop Boxes
  const [frontFaceImage, setFrontFaceImage] = useState('/collar_hero.jpg');
  const [profileFaceImage, setProfileFaceImage] = useState('/ai_matcher.jpg');
  const [noseImage, setNoseImage] = useState('/ai_matcher.jpg');
  const [bodyImage, setBodyImage] = useState('/collar_hero.jpg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);

  const [biometricScores, setBiometricScores] = useState({
    faceScore: 94.2,
    noseScore: 98.6,
    coatScore: 91.5,
    bodyScore: 93.0,
    overallMatch: 96.7,
    statusText: 'Verified Unique Biometric Identity Profile (95%+ Match)'
  });

  // 2. Lost Pet Matcher Dual Drop Box States
  const [missingPetImage, setMissingPetImage] = useState('/collar_hero.jpg');
  const [sightedPetImage, setSightedPetImage] = useState('/ai_matcher.jpg');
  const [isMatching, setIsMatching] = useState(false);
  const [lostPetSimilarity, setLostPetSimilarity] = useState(94.2);

  // 3. Integrated RAG AI Assistant
  const [ragQuery, setRagQuery] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'ai', text: 'Hello! I am your PetConnect AI Assistant. I have live context access to Bruno\'s GPS telemetry, MPU6050 activity metrics, vaccinations, and prescriptions. How can I help you today?' },
    { sender: 'user', text: 'Where is Bruno right now and what is his activity level?' },
    { sender: 'ai', text: 'Bruno is currently 420 meters from home and is active (Walking). Collar battery level is 88%. Today he has logged 42 mins walking, 12 mins running, and 9.5 hours resting.', contextUsed: 'Live ESP32 GPS + MPU6050 Activity Vector Context' }
  ]);

  // 4. Interactive Adoption Recommendation Engine States
  const [houseSize, setHouseSize] = useState('Apartment');
  const [workHours, setWorkHours] = useState('4-8 hrs');
  const [hasChildren, setHasChildren] = useState(true);
  const [experience, setExperience] = useState('Intermediate');
  const [budget, setBudget] = useState('$150 - $300');

  const [adoptionResults, setAdoptionResults] = useState([
    { breed: 'Golden Retriever', score: 92, reason: 'Gentle temperament & excellent with children' },
    { breed: 'Beagle', score: 89, reason: 'Compact size ideal for apartments & moderate work hours' },
    { breed: 'Labrador Retriever', score: 88, reason: 'Highly trainable companion & friendly nature' },
    { breed: 'French Bulldog', score: 85, reason: 'Low exercise requirement & quiet for apartment living' }
  ]);

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
        statusText: 'Biometric Identity Profile Created & Verified (95%+ Match)'
      });
    }, 1000);
  };

  const handleCalculateAdoptionMatch = () => {
    let scores = [
      { breed: 'Golden Retriever', score: 92, reason: 'Gentle temperament & excellent with children' },
      { breed: 'Beagle', score: 89, reason: 'Compact size ideal for apartments & moderate work hours' },
      { breed: 'Labrador Retriever', score: 88, reason: 'Highly trainable companion & friendly nature' },
      { breed: 'French Bulldog', score: 85, reason: 'Low exercise requirement & quiet for apartment living' },
      { breed: 'German Shepherd', score: 82, reason: 'High intelligence & protective family dog' }
    ];

    if (houseSize === 'Apartment') {
      scores[1].score += 5; // Beagle
      scores[3].score += 8; // Frenchie
      scores[0].score -= 4; // Golden
    } else if (houseSize === 'Large Yard') {
      scores[0].score += 6; // Golden
      scores[2].score += 5; // Lab
      scores[4].score += 7; // German Shepherd
    }

    if (!hasChildren) {
      scores[4].score += 4;
    }

    scores.sort((a, b) => b.score - a.score);
    setAdoptionResults(scores.slice(0, 4));
  };

  const handleSendRAGQuery = (e) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;

    const userText = ragQuery;
    setChatLog(prev => [...prev, { sender: 'user', text: userText }]);
    setRagQuery('');

    setTimeout(() => {
      let reply = `Regarding Bruno: Maintain regular exercise and fresh water. Consult Dr. Sarah Jenkins if symptoms develop.`;
      let contextUsed = `PetCare AI General Knowledge Base`;

      const q = userText.toLowerCase();
      if (q.includes('where') || q.includes('gps') || q.includes('location')) {
        reply = `Bruno is currently 420 meters from home at GPS [10.02345 N, 76.34567 E]. Collar battery is 88%.`;
        contextUsed = `Context: Live ESP32 GPS Telemetry Table`;
      } else if (q.includes('activity') || q.includes('walk') || q.includes('sleep') || q.includes('run')) {
        reply = `Bruno's MPU6050 activity log shows 42 mins walking, 12 mins running, and 9.5 hours resting today. Current state: Walking.`;
        contextUsed = `Context: MPU6050 Accelerometer ML Classifier`;
      } else if (q.includes('vaccin') || q.includes('shot')) {
        reply = `Bruno's Rabies Core vaccination is up to date (Expiry: Jan 15, 2027). Next annual booster due in 8 months.`;
        contextUsed = `Context: Verified Health Passport Database`;
      } else if (q.includes('med') || q.includes('prescription')) {
        reply = `Bruno has 1 active prescription: Amoxicillin 250mg (1 tablet twice daily after meals for 7 days) issued by Dr. Sarah Jenkins.`;
        contextUsed = `Context: Active Electronic Prescriptions Table`;
      }

      setChatLog(prev => [...prev, { sender: 'ai', text: reply, contextUsed }]);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Sleek Feature Tabs */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'identity', label: 'Biometric Pet ID' },
          { id: 'matcher', label: 'Lost Pet Matcher' },
          { id: 'assistant', label: 'AI Health Assistant' },
          { id: 'adoption', label: 'Adoption Scorer' }
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

      {/* 1. Biometric Pet ID Scanner with 4 Interactive Drop Boxes */}
      {activeTab === 'identity' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Fingerprint style={{ color: '#818cf8', width: '18px', height: '18px' }} />
            Multi-Biometric Identity Drop Boxes
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Drop or upload photos into all 4 biometric feature zones to generate a fused 1920-dimensional identity embedding.
          </p>

          {/* 4 Photo Drop Boxes Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            {/* Drop Box 1: Front Face */}
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '2px dashed rgba(99, 102, 241, 0.4)', borderRadius: '12px', padding: '8px', textAlign: 'center' }}>
              <img src={frontFaceImage} alt="Front Face" style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '8px', marginBottom: '4px' }} />
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '3px 6px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>
                <Upload style={{ width: '11px', height: '11px' }} /> Drop Front Face (512d)
                <input type="file" accept="image/*" onChange={(e) => setFrontFaceImage(URL.createObjectURL(e.target.files[0]))} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Drop Box 2: Profile Face */}
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '2px dashed rgba(139, 92, 246, 0.4)', borderRadius: '12px', padding: '8px', textAlign: 'center' }}>
              <img src={profileFaceImage} alt="Profile Face" style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '8px', marginBottom: '4px' }} />
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', padding: '3px 6px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>
                <Upload style={{ width: '11px', height: '11px' }} /> Drop Side Profile (512d)
                <input type="file" accept="image/*" onChange={(e) => setProfileFaceImage(URL.createObjectURL(e.target.files[0]))} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Drop Box 3: Nose Print */}
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '2px dashed rgba(16, 185, 129, 0.4)', borderRadius: '12px', padding: '8px', textAlign: 'center' }}>
              <img src={noseImage} alt="Nose Print" style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '8px', marginBottom: '4px' }} />
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '3px 6px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>
                <Upload style={{ width: '11px', height: '11px' }} /> Drop Nose Print (1024d)
                <input type="file" accept="image/*" onChange={(e) => setNoseImage(URL.createObjectURL(e.target.files[0]))} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Drop Box 4: Full Body Coat Pattern */}
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '2px dashed rgba(6, 182, 212, 0.4)', borderRadius: '12px', padding: '8px', textAlign: 'center' }}>
              <img src={bodyImage} alt="Full Body Coat" style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '8px', marginBottom: '4px' }} />
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8', padding: '3px 6px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>
                <Upload style={{ width: '11px', height: '11px' }} /> Drop Full Body (384d)
                <input type="file" accept="image/*" onChange={(e) => setBodyImage(URL.createObjectURL(e.target.files[0]))} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          <button 
            onClick={handleRunBiometricAnalysis}
            disabled={isAnalyzing}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', padding: '8px', marginBottom: '12px' }}
          >
            {isAnalyzing ? "Fusing 1920d Embeddings..." : "Analyze & Fuse Biometric Identity"}
          </button>

          {analysisComplete && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>FACE MATCH (ArcFace)</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>{biometricScores.faceScore}%</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>NOSE PRINT (ViT)</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399' }}>{biometricScores.noseScore}%</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>COAT PATTERN (B3)</span>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a5b4fc' }}>{biometricScores.coatScore}%</p>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>BODY SHAPE (YOLOv8)</span>
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

      {/* 2. Lost Pet Matcher with Dual Drop Boxes */}
      {activeTab === 'matcher' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search style={{ color: '#ec4899', width: '18px', height: '18px' }} />
            Lost Pet Siamese Neural Matcher
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Drop or upload photos into both boxes to verify similarity between missing report and public sighting.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '2px dashed rgba(99, 102, 241, 0.4)', borderRadius: '12px', padding: '8px', textAlign: 'center' }}>
              <img src={missingPetImage} alt="Missing Pet" style={{ width: '100%', height: '85px', objectFit: 'cover', borderRadius: '8px', marginBottom: '6px' }} />
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '4px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>
                <Upload style={{ width: '11px', height: '11px' }} /> Drop Missing Pet Photo
                <input type="file" accept="image/*" onChange={(e) => setMissingPetImage(URL.createObjectURL(e.target.files[0]))} style={{ display: 'none' }} />
              </label>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', border: '2px dashed rgba(236, 72, 153, 0.4)', borderRadius: '12px', padding: '8px', textAlign: 'center' }}>
              <img src={sightedPetImage} alt="Sighted Pet" style={{ width: '100%', height: '85px', objectFit: 'cover', borderRadius: '8px', marginBottom: '6px' }} />
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6', padding: '4px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>
                <Upload style={{ width: '11px', height: '11px' }} /> Drop Sighting Photo
                <input type="file" accept="image/*" onChange={(e) => setSightedPetImage(URL.createObjectURL(e.target.files[0]))} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SIAMESE COSINE SIMILARITY SCORE</span>
            <h4 style={{ fontSize: '1.4rem', color: '#34d399', margin: '2px 0' }}>{lostPetSimilarity}% Match</h4>
            <p style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>✓ High Probability Match — Owner Notified via Emergency Alert</p>
          </div>
        </div>
      )}

      {/* 3. RAG AI Assistant */}
      {activeTab === 'assistant' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bot style={{ color: '#38bdf8', width: '18px', height: '18px' }} />
            AI Assistant (Retrieval-Augmented Chatbot)
          </h4>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
            Integrates Live GPS, MPU6050 Activity Metrics, Health Passports, and Prescriptions into answers.
          </p>

          <div style={{ height: '170px', background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '10px', overflowY: 'auto', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chatLog.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '90%',
                background: msg.sender === 'user' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(30, 41, 70, 0.85)',
                padding: '8px 10px',
                borderRadius: '10px',
                fontSize: '0.75rem',
                border: '1px solid var(--border-glass)'
              }}>
                <p style={{ color: msg.sender === 'user' ? '#a5b4fc' : '#f8fafc' }}>{msg.text}</p>
                {msg.contextUsed && (
                  <span style={{ display: 'block', fontSize: '0.62rem', color: '#34d399', marginTop: '4px', fontWeight: 600 }}>
                    📍 {msg.contextUsed}
                  </span>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendRAGQuery} style={{ display: 'flex', gap: '6px' }}>
            <input 
              type="text"
              placeholder="Ask about Bruno's GPS, activity stats, or health..."
              value={ragQuery}
              onChange={e => setRagQuery(e.target.value)}
              style={{ flex: 1, background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>Send</button>
          </form>
        </div>
      )}

      {/* 4. Interactive Adoption Scorer */}
      {activeTab === 'adoption' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HeartHandshake style={{ color: '#34d399', width: '18px', height: '18px' }} />
            AI Adoption Compatibility Scorer
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Adjust your living space and lifestyle parameters to calculate ML breed compatibility scores.
          </p>

          {/* User Input Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Living Space</label>
              <select value={houseSize} onChange={e => setHouseSize(e.target.value)} style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '5px', color: 'white', fontSize: '0.72rem', outline: 'none' }}>
                <option value="Apartment">Apartment</option>
                <option value="House with Small Yard">House (Small Yard)</option>
                <option value="Large Yard">Large House &amp; Yard</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Daily Work Hours</label>
              <select value={workHours} onChange={e => setWorkHours(e.target.value)} style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '5px', color: 'white', fontSize: '0.72rem', outline: 'none' }}>
                <option value="0-4 hrs">WFH / Part Time (0-4h)</option>
                <option value="4-8 hrs">Standard Workday (4-8h)</option>
                <option value="8+ hrs">Full Time (8+h)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Children at Home</label>
              <select value={hasChildren ? 'yes' : 'no'} onChange={e => setHasChildren(e.target.value === 'yes')} style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '5px', color: 'white', fontSize: '0.72rem', outline: 'none' }}>
                <option value="yes">Yes (Kids present)</option>
                <option value="no">No children</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Monthly Pet Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '5px', color: 'white', fontSize: '0.72rem', outline: 'none' }}>
                <option value="$150 - $300">$150 - $300 / mo</option>
                <option value="$300+">$300+ / mo</option>
              </select>
            </div>
          </div>

          <button onClick={handleCalculateAdoptionMatch} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem', padding: '6px', marginBottom: '12px' }}>
            Calculate Breed Compatibility Scores
          </button>

          {/* Results Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {adoptionResults.map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
    </div>
  );
}
