import React, { useState } from 'react';
import { Lock, Stethoscope, Users, Shield, AlertCircle, ArrowLeft } from 'lucide-react';

export default function RoleLoginModal({ onAuthenticate }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const roleConfig = {
    owner: {
      title: "Pet Owner Portal",
      desc: "Track pet GPS, AI symptom chat, QR health passport",
      icon: Lock,
      color: "#6366f1",
      idLabel: "Owner Email or Mobile Number",
      idPlaceholder: "owner@petconnect.ai",
      passLabel: "Account Passcode / OTP",
      defaultId: "owner@petconnect.ai",
      defaultPass: "owner123"
    },
    vet: {
      title: "Veterinarian Practitioner",
      desc: "Medical history, prescriptions, lab reports & SOS",
      icon: Stethoscope,
      color: "#34d399",
      idLabel: "Medical Board License ID",
      idPlaceholder: "VET-2026-8891",
      passLabel: "Practitioner Security PIN",
      defaultId: "VET-2026-8891",
      defaultPass: "vetpass99"
    },
    volunteer: {
      title: "Rescue Volunteer",
      desc: "Stray rescue missions, upload photos & foster care",
      icon: Users,
      color: "#ec4899",
      idLabel: "Rescue Volunteer Badge Serial ID",
      idPlaceholder: "VOL-RESCUE-4421",
      passLabel: "NGO Security Passcode",
      defaultId: "VOL-RESCUE-4421",
      defaultPass: "volpass77"
    },
    admin: {
      title: "Administrator",
      desc: "User management, approvals, AI logs & broadcasts",
      icon: Shield,
      color: "#818cf8",
      idLabel: "System Admin Email",
      idPlaceholder: "admin@petconnect.ai",
      passLabel: "2FA Master Security Token",
      defaultId: "admin@petconnect.ai",
      defaultPass: "admin999"
    }
  };

  const handleSelectRole = (key) => {
    setSelectedRole(key);
    setIdentifier(roleConfig[key].defaultId);
    setPassword(roleConfig[key].defaultPass);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      if (!identifier.trim() || !password.trim()) {
        setErrorMessage("Please enter credential identifier and passcode.");
        return;
      }

      onAuthenticate(selectedRole, {
        badgeId: identifier,
        verifiedAt: new Date().toLocaleTimeString()
      });
    }, 600);
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 100,
      background: 'rgba(3, 6, 13, 0.95)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="app-card" style={{
        width: '100%',
        maxWidth: '390px',
        position: 'relative'
      }}>
        {/* Step 1: Role Selection Grid */}
        {!selectedRole ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>Sign In to PetConnect AI</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Select your verified role to lock and unlock your workspace
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.entries(roleConfig).map(([key, config]) => {
                const IconComp = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectRole(key)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${config.color}44`,
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: `${config.color}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: config.color
                    }}>
                      <IconComp style={{ width: '20px', height: '20px' }} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 700 }}>{config.title}</h4>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{config.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Step 2: Credential Verification Form */
          <div>
            <button 
              onClick={() => setSelectedRole(null)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}
            >
              <ArrowLeft style={{ width: '14px', height: '14px' }} /> Back to Role Selection
            </button>

            {(() => {
              const config = roleConfig[selectedRole];
              const IconComp = config.icon;
              return (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: `${config.color}22`,
                      border: `1px solid ${config.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 8px',
                      color: config.color
                    }}>
                      <IconComp style={{ width: '22px', height: '22px' }} />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', color: '#f8fafc' }}>{config.title} Verification</h3>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Enter your license or security credentials</p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                        {config.idLabel}
                      </label>
                      <input 
                        type="text"
                        value={identifier}
                        onChange={e => setIdentifier(e.target.value)}
                        style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '8px', color: 'white', fontSize: '0.78rem', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                        {config.passLabel}
                      </label>
                      <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '8px', color: 'white', fontSize: '0.78rem', outline: 'none' }}
                      />
                    </div>

                    {errorMessage && (
                      <p style={{ color: '#f87171', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertCircle style={{ width: '13px', height: '13px' }} /> {errorMessage}
                      </p>
                    )}

                    <button 
                      type="submit" 
                      className="btn-primary"
                      disabled={isVerifying}
                      style={{ justifyContent: 'center', fontSize: '0.78rem', padding: '10px', marginTop: '6px', background: config.color }}
                    >
                      {isVerifying ? "Authenticating Session..." : `Sign In as ${config.title}`}
                    </button>
                  </form>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
