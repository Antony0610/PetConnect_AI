import React, { useState } from 'react';
import { Sparkles, Camera, Search, HeartHandshake, Bot, RefreshCw, CheckCircle, Cpu } from 'lucide-react';

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
    skinCheck: 'Clear',
    eyeCheck: 'Normal'
  });

  // SubTab 2: Lost Pet Siamese AI Matcher
  const [similarityScore] = useState(94.2);

  // SubTab 3: Smart Adoption Recommender
  const [homeType, setHomeType] = useState('Apartment');

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
          skinCheck: 'Clear',
          eyeCheck: 'Normal'
        });
      } else {
        setScanResult({
          breed: 'Beagle',
          confidence: '94.8%',
          ageEst: '2 – 3 Years',
          healthStatus: 'Mild Irritation',
          skinCheck: 'Mild dermatitis near ear',
          eyeCheck: 'Normal'
        });
      }
    }, 1000);
  };

  const handleSendSymptom = (e) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;

    const userMsg = symptomInput;
    setChatLog(prev => [...prev, { sender: 'user', text: userMsg }]);
    setSymptomInput('');

    setTimeout(() => {
      let aiReply = "Monitor your pet closely. Ensure adequate hydration and rest.";
      if (userMsg.toLowerCase().includes('vomit') || userMsg.toLowerCase().includes('blood')) {
        aiReply = "⚠️ Urgent: Severe symptoms detected. Please contact your nearest emergency veterinarian immediately.";
      } else if (userMsg.toLowerCase().includes('eat') || userMsg.toLowerCase().includes('appetite')) {
        aiReply = "Loss of appetite can result from mild stomach upset. If inappetence continues past 24h, consult a vet.";
      }
      setChatLog(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'breed', label: 'Breed AI' },
          { id: 'lost', label: 'Siamese Matcher' },
          { id: 'adoption', label: 'Adoption AI' },
          { id: 'symptom', label: 'Health Assistant' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              flex: 1,
              background: activeSubTab === tab.id ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.04)',
              color: activeSubTab === tab.id ? '#a5b4fc' : 'var(--text-muted)',
              border: '1px solid var(--border-glass)',
              padding: '6px 8px',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'breed' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Camera style={{ color: '#818cf8', width: '16px', height: '16px' }} />
            AI Breed & Health Classifier
          </h4>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
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
                  border: selectedBreedImage === item.key ? '2px solid #6366f1' : '1px solid var(--border-glass)',
                  borderRadius: '10px',
                  padding: '6px',
                  cursor: 'pointer',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                <span style={{ fontSize: '0.7rem', marginTop: '4px', fontWeight: 600 }}>{item.name}</span>
              </button>
            ))}
          </div>

          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>DETECTED BREED</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>{scanResult.confidence}</span>
            </div>
            <h5 style={{ fontSize: '1.1rem', color: '#a5b4fc', margin: '2px 0' }}>{scanResult.breed}</h5>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Skin: {scanResult.skinCheck} • Eye: {scanResult.eyeCheck}</p>
          </div>
        </div>
      )}

      {activeSubTab === 'lost' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search style={{ color: '#ec4899', width: '16px', height: '16px' }} />
            Siamese Lost Pet Facial Matcher
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Feature Match Score: <strong style={{ color: '#34d399' }}>{similarityScore}%</strong>
          </p>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img src="/collar_hero.jpg" alt="Reported" style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
              <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Missing Report</span>
            </div>
            <span style={{ fontSize: '1rem', color: '#818cf8', fontWeight: 700 }}>VS</span>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <img src="/ai_matcher.jpg" alt="Found" style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
              <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Finder Sighted</span>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'symptom' && (
        <div className="app-card" style={{ padding: '16px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bot style={{ color: '#38bdf8', width: '16px', height: '16px' }} />
            AI Health Symptom Assistant
          </h4>

          <div style={{ height: '160px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', overflowY: 'auto', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chatLog.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: msg.sender === 'user' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(30, 41, 70, 0.8)',
                padding: '8px 10px',
                borderRadius: '10px',
                fontSize: '0.78rem'
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendSymptom} style={{ display: 'flex', gap: '6px' }}>
            <input 
              type="text" 
              placeholder="Type symptom..."
              value={symptomInput}
              onChange={e => setSymptomInput(e.target.value)}
              style={{ flex: 1, background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '8px 10px', color: 'white', fontSize: '0.78rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '8px 12px', fontSize: '0.78rem' }}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
