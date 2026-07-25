import React, { useState } from 'react';
import { Lock, Stethoscope, Users, Shield, AlertCircle, ArrowLeft, Eye, EyeOff, UserPlus, CheckCircle2 } from 'lucide-react';

export default function RoleLoginModal({ onAuthenticate }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState(null);
  
  // Login Form States
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Registration Form States
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regExtraField, setRegExtraField] = useState(''); // Pet Name / Clinic Name / NGO / Admin Key
  const [regPassword, setRegPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleConfig = {
    owner: {
      title: "Pet Owner",
      desc: "Track pet GPS, AI symptom chat, QR health passport",
      icon: Lock,
      color: "#6366f1",
      idLabel: "Owner Email or Mobile",
      idPlaceholder: "owner@petconnect.ai",
      passLabel: "Account Passcode / OTP",
      extraLabel: "Primary Pet Name & Breed",
      extraPlaceholder: "e.g. Bruno (Golden Retriever)",
      defaultId: "owner@petconnect.ai",
      defaultPass: "owner123"
    },
    vet: {
      title: "Veterinarian",
      desc: "Medical history, prescriptions, lab reports & SOS",
      icon: Stethoscope,
      color: "#34d399",
      idLabel: "Medical Board License ID",
      idPlaceholder: "VET-2026-8891",
      passLabel: "Practitioner Security PIN",
      extraLabel: "Veterinary Clinic / Hospital Name",
      extraPlaceholder: "e.g. Metro Veterinary ER",
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
      extraLabel: "NGO / Animal Welfare Organization",
      extraPlaceholder: "e.g. Central Stray Welfare NGO",
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
      extraLabel: "Master Admin Authorization Key",
      extraPlaceholder: "ADM-KEY-99812",
      defaultId: "admin@petconnect.ai",
      defaultPass: "admin999"
    }
  };

  const handleSelectRole = (key) => {
    setSelectedRole(key);
    setIdentifier(roleConfig[key].defaultId);
    setPassword(roleConfig[key].defaultPass);
    setShowPassword(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regFullName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMessage("Please fill out all required registration fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`✓ Registration submitted for ${roleConfig[selectedRole].title}! Authenticating session...`);
      
      setTimeout(() => {
        onAuthenticate(selectedRole, {
          badgeId: regEmail,
          verifiedAt: new Date().toLocaleTimeString()
        });
      }, 1000);
    }, 800);
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
              <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>PetConnect AI Security Gate</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Select a role to Sign In or Register a new account
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
          /* Step 2: Sign In / Register Tabs & Form */
          <div>
            <button 
              onClick={() => setSelectedRole(null)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}
            >
              <ArrowLeft style={{ width: '14px', height: '14px' }} /> Back to Role Selection
            </button>

            {(() => {
              const config = roleConfig[selectedRole];
              const IconComp = config.icon;
              return (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: `${config.color}22`,
                      border: `1px solid ${config.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 6px',
                      color: config.color
                    }}>
                      <IconComp style={{ width: '20px', height: '20px' }} />
                    </div>
                    <h3 style={{ fontSize: '1.05rem', color: '#f8fafc' }}>{config.title} Portal</h3>
                  </div>

                  {/* Mode Toggle Pills: Sign In vs Register */}
                  <div style={{ display: 'flex', background: 'rgba(0,0,0,0.4)', padding: '3px', borderRadius: '8px', marginBottom: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      style={{
                        flex: 1,
                        background: authMode === 'login' ? config.color : 'transparent',
                        color: authMode === 'login' ? 'white' : 'var(--text-muted)',
                        border: 'none',
                        padding: '5px 0',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      style={{
                        flex: 1,
                        background: authMode === 'register' ? config.color : 'transparent',
                        color: authMode === 'register' ? 'white' : 'var(--text-muted)',
                        border: 'none',
                        padding: '5px 0',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Register New {config.title}
                    </button>
                  </div>

                  {/* FORM 1: LOGIN */}
                  {authMode === 'login' && (
                    <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '3px' }}>
                          {config.idLabel}
                        </label>
                        <input 
                          type="text"
                          value={identifier}
                          onChange={e => setIdentifier(e.target.value)}
                          style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '3px' }}>
                          {config.passLabel}
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input 
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 32px 6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                          >
                            {showPassword ? <EyeOff style={{ width: '14px', height: '14px' }} /> : <Eye style={{ width: '14px', height: '14px' }} />}
                          </button>
                        </div>
                      </div>

                      {errorMessage && (
                        <p style={{ color: '#f87171', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <AlertCircle style={{ width: '12px', height: '12px' }} /> {errorMessage}
                        </p>
                      )}

                      <button 
                        type="submit" 
                        className="btn-primary"
                        disabled={isSubmitting}
                        style={{ justifyContent: 'center', fontSize: '0.75rem', padding: '8px', marginTop: '4px', background: config.color }}
                      >
                        {isSubmitting ? "Authenticating..." : `Sign In as ${config.title}`}
                      </button>
                    </form>
                  )}

                  {/* FORM 2: NEW USER REGISTRATION */}
                  {authMode === 'register' && (
                    <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Full Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Dr. Alex Mercer"
                          value={regFullName} 
                          onChange={e => setRegFullName(e.target.value)}
                          style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Email</label>
                          <input 
                            type="email" 
                            placeholder="alex@petconnect.ai"
                            value={regEmail} 
                            onChange={e => setRegEmail(e.target.value)}
                            style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Phone</label>
                          <input 
                            type="text" 
                            placeholder="+1 555-0199"
                            value={regPhone} 
                            onChange={e => setRegPhone(e.target.value)}
                            style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '2px' }}>{config.extraLabel}</label>
                        <input 
                          type="text" 
                          placeholder={config.extraPlaceholder}
                          value={regExtraField} 
                          onChange={e => setRegExtraField(e.target.value)}
                          style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Set Account Password</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={regPassword} 
                          onChange={e => setRegPassword(e.target.value)}
                          style={{ width: '100%', background: '#04060c', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '6px 8px', color: 'white', fontSize: '0.75rem', outline: 'none' }}
                        />
                      </div>

                      {errorMessage && (
                        <p style={{ color: '#f87171', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <AlertCircle style={{ width: '12px', height: '12px' }} /> {errorMessage}
                        </p>
                      )}

                      {successMessage && (
                        <p style={{ color: '#34d399', fontSize: '0.72rem', fontWeight: 600 }}>{successMessage}</p>
                      )}

                      <button 
                        type="submit" 
                        className="btn-primary"
                        disabled={isSubmitting}
                        style={{ justifyContent: 'center', fontSize: '0.75rem', padding: '8px', marginTop: '4px', background: config.color }}
                      >
                        {isSubmitting ? "Creating Account..." : `Register & Create ${config.title}`}
                      </button>
                    </form>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
