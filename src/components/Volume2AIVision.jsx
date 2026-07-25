import React, { useState } from 'react';
import { Sparkles, Camera, Search, HeartHandshake, Bot, ShieldCheck, RefreshCw, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';

export default function Volume2AIVision() {
  const [activeSubTab, setActiveSubTab] = useState('breed');

  // SubTab 1: Breed & Health AI Scanner
  const [selectedBreedImage, setSelectedBreedImage] = useState('golden');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState({
    breed: 'Golden Retriever',
    confidence: '96.4%',
    ageEst: '3 – 4 Years',
    healthStatus: 'Healthy',
    skinCheck: 'Clear (No inflammation detected)',
    eyeCheck: 'Normal (No discharge)',
    modelUsed: 'MobileNetV3 + OpenCV Custom Classifier'
  });

  // SubTab 2: Lost Pet Siamese AI Matcher
  const [similarityScore, setSimilarityScore] = useState(94.2);

  // SubTab 3: Smart Adoption Recommender
  const [homeType, setHomeType] = useState('Apartment');
  const [workHours, setWorkHours] = useState('4-6 hours');
  const [hasKids, setHasKids] = useState('Yes');
  const [adoptionMatch, setAdoptionMatch] = useState({
    recommendedBreed: 'French Bulldog / Golden Retriever Mix',
    matchScore: '95%',
    reason: 'Gentle temperament, moderate energy suitable for apartment living with children.'
  });

  // SubTab 4: AI Symptom Chatbot
  const [symptomInput, setSymptomInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Health Assistant. Tell me what symptoms your pet is experiencing.' }
  ]);

  const handleScanImage = (imgKey) => {
    setSelectedBreedImage(imgKey);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (imgKey === 'golden') {
        setScanResult({
          breed: 'Golden Retriever',
          confidence: '96.4%',
          ageEst: '3 – 4 Years',
          healthStatus: 'Healthy',
          skinCheck: 'Clear (No inflammation detected)',
          eyeCheck: 'Normal (No discharge)',
          modelUsed: 'MobileNetV3 + OpenCV Custom Classifier'
        });
      } else if (imgKey === 'beagle') {
        setScanResult({
          breed: 'Beagle (Tri-color)',
          confidence: '94.8%',
          ageEst: '2 – 3 Years',
          healthStatus: 'Mild Irritation',
          skinCheck: 'Mild allergic dermatitis near left ear',
          eyeCheck: 'Normal',
          modelUsed: 'EfficientNet-B0 + OpenCV Classifier'
        });
      } else {
        setScanResult({
          breed: 'Domestic Short-Hair Cat',
          confidence: '98.1%',
          ageEst: '1 – 2 Years',
          healthStatus: 'Healthy',
          skinCheck: 'Clear',
          eyeCheck: 'Clear',
          modelUsed: 'MobileNetV3 Cat Architecture'
        });
      }
    }, 1200);
  };

  const handleSendSymptom = (e) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;

    const userMsg = symptomInput;
    setChatLog(prev => [...prev, { sender: 'user', text: userMsg }]);
    setSymptomInput('');

    setTimeout(() => {
      let aiReply = "Based on your description, monitor your pet closely. Ensure adequate hydration and rest.";
      if (userMsg.toLowerCase().includes('vomit') || userMsg.toLowerCase().includes('blood') || userMsg.toLowerCase().includes('collapse')) {
        aiReply = "⚠️ URGENT CARE RECOMMENDED: Severe symptoms detected. Please contact your nearest emergency veterinarian immediately. (Note: Not a substitute for professional diagnosis).";
      } else if (userMsg.toLowerCase().includes('eat') || userMsg.toLowerCase().includes('appetite')) {
        aiReply = "Loss of appetite can result from mild stomach upset or dental irritation. If inappetence persists over 24 hours, schedule a vet checkup.";
      }
      setChatLog(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Sub-Header Tabs */}
      <div className="glass-card" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
            <Cpu style={{ width: '12px', height: '12px' }} /> Volume 2 Specification
          </span>
          <h2 style={{ fontSize: '1.4rem' }}>AI & Computer Vision Intelligence Suite</h2>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'breed', label: '1. Breed & Health AI' },
            { id: 'lost', label: '2. Lost Pet Siamese AI' },
            { id: 'adoption', label: '3. Adoption Recommender' },
            { id: 'symptom', label: '4. Health LLM Assistant' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                background: activeSubTab === tab.id ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                color: activeSubTab === tab.id ? '#a5b4fc' : 'var(--text-muted)',
                border: '1px solid var(--border-light)',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* MODULE 1: Breed & Health AI Scanner */}
      {activeSubTab === 'breed' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera style={{ color: '#818cf8', width: '20px', height: '20px' }} />
              Upload / Select Pet Photo for AI Scan
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Choose a sample image or simulate a live camera capture to execute the 
              MobileNetV3 / EfficientNet vision model.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              {[
                { key: 'golden', name: 'Golden Retriever', img: '/collar_hero.jpg' },
                { key: 'beagle', name: 'Beagle', img: '/ai_matcher.jpg' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => handleScanImage(item.key)}
                  style={{
                    flex: 1,
                    background: selectedBreedImage === item.key ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255,255,255,0.03)',
                    border: selectedBreedImage === item.key ? '2px solid #6366f1' : '1px solid var(--border-light)',
                    borderRadius: '12px',
                    padding: '8px',
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.name}</span>
                </button>
              ))}
            </div>

            <div style={{
              height: '180px',
              borderRadius: '14px',
              border: '2px dashed var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {isScanning && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(7, 9, 19, 0.85)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}>
                  <RefreshCw style={{ width: '32px', height: '32px', color: '#6366f1', animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: '0.85rem', color: '#a5b4fc', marginTop: '10px' }}>Extracting Deep Features & Tensor Inference...</span>
                </div>
              )}
              <Camera style={{ width: '32px', height: '32px', color: 'var(--text-dim)', marginBottom: '8px' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Drag & drop photo or click to analyze</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles style={{ color: '#38bdf8', width: '20px', height: '20px' }} />
              AI Model Inference Output
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>DETECTED BREED</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399' }}>Confidence: {scanResult.confidence}</span>
                </div>
                <h4 style={{ fontSize: '1.4rem', color: '#a5b4fc' }}>{scanResult.breed}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Estimated Age Group: {scanResult.ageEst}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>SKIN ANOMALY SCAN</span>
                  <strong style={{ fontSize: '0.85rem', color: scanResult.healthStatus === 'Healthy' ? '#34d399' : '#fbbf24' }}>
                    {scanResult.skinCheck}
                  </strong>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>EYE INFECTION INDICATOR</span>
                  <strong style={{ fontSize: '0.85rem', color: '#34d399' }}>{scanResult.eyeCheck}</strong>
                </div>
              </div>

              <div className="code-box">
                // PyTorch Model Metadata<br/>
                Model: {scanResult.modelUsed}<br/>
                Input Resolution: 224x224x3 (RGB)<br/>
                Status: Inference Completed in 38ms
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: Lost Pet Siamese AI Matcher */}
      {activeSubTab === 'lost' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search style={{ color: '#ec4899', width: '20px', height: '20px' }} />
            Siamese Neural Network — Lost & Found Feature Matching
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
            Compares deep facial embeddings extracted from finder photos against reported missing pet records.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'center' }}>
            {/* Owner Reported */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <span className="badge badge-warning" style={{ marginBottom: '10px' }}>Owner Missing Report</span>
              <img src="/collar_hero.jpg" alt="Reported" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
              <h4 style={{ fontSize: '1rem' }}>Bruno (Golden Retriever)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Missing since: Yesterday • Sector 4</p>
            </div>

            {/* AI Cosine Match Indicator */}
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(99, 102, 241, 0.2))',
                border: '2px solid #10b981',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
              }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>{similarityScore}%</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>MATCH</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 600 }}>High Confidence Facial Match</p>
              <button className="btn-primary" style={{ marginTop: '12px', padding: '6px 14px', fontSize: '0.75rem' }}>
                Notify Pet Owner & Finder
              </button>
            </div>

            {/* Finder Uploaded */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <span className="badge badge-success" style={{ marginBottom: '10px' }}>Finder Uploaded Photo</span>
              <img src="/ai_matcher.jpg" alt="Found Pet" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
              <h4 style={{ fontSize: '1rem' }}>Sighted Near Metro Park</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Uploaded: 25 minutes ago</p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: Smart Adoption Recommender */}
      {activeSubTab === 'adoption' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HeartHandshake style={{ color: '#10b981', width: '20px', height: '20px' }} />
            AI Adoption Compatibility Matchmaker
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* Input Form */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', color: '#a5b4fc' }}>Adopter Lifestyle Inputs</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Housing Environment</label>
                  <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', background: '#04060c', color: 'white', border: '1px solid var(--border-light)', padding: '8px', borderRadius: '8px' }}>
                    <option>Apartment</option>
                    <option>Villa with Garden</option>
                    <option>Townhouse</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Daily Away Hours</label>
                  <select value={workHours} onChange={e => setWorkHours(e.target.value)} style={{ width: '100%', background: '#04060c', color: 'white', border: '1px solid var(--border-light)', padding: '8px', borderRadius: '8px' }}>
                    <option>1-3 hours (Work from home)</option>
                    <option>4-6 hours</option>
                    <option>8+ hours</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>Children Present?</label>
                  <select value={hasKids} onChange={e => setHasKids(e.target.value)} style={{ width: '100%', background: '#04060c', color: 'white', border: '1px solid var(--border-light)', padding: '8px', borderRadius: '8px' }}>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Recommendation Result */}
            <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1))', padding: '20px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <span className="badge badge-success" style={{ marginBottom: '10px' }}>Top AI Recommendation</span>
              <h4 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '4px' }}>{adoptionMatch.recommendedBreed}</h4>
              <p style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399', marginBottom: '10px' }}>
                Compatibility Index: {adoptionMatch.matchScore}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {adoptionMatch.reason}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: AI Symptom Chatbot */}
      {activeSubTab === 'symptom' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot style={{ color: '#38bdf8', width: '20px', height: '20px' }} />
            AI Pet Health Symptom Triage Assistant
          </h3>

          <div style={{
            height: '240px',
            background: 'rgba(4, 9, 20, 0.7)',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '16px'
          }}>
            {chatLog.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: msg.sender === 'user' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(30, 41, 59, 0.8)',
                color: 'white',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                border: '1px solid var(--border-light)'
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendSymptom} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Describe symptoms e.g. 'Dog is not eating food today'..." 
              value={symptomInput}
              onChange={e => setSymptomInput(e.target.value)}
              style={{
                flex: 1,
                background: '#04060c',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '10px 16px',
                color: 'white',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
            <button type="submit" className="btn-primary">Ask Assistant</button>
          </form>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            * Disclaimer: AI symptom triage is not a substitute for professional veterinary examination.
          </p>
        </div>
      )}
    </div>
  );
}
