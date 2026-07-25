import React, { useState } from 'react';
import { Lock, ShieldCheck, Stethoscope, Users, Shield, KeyRound, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function RoleLoginModal({ targetRole, onAuthenticate, onClose }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const roleConfig = {
    owner: {
      title: "Pet Owner Portal Login",
      icon: Lock,
      color: "#6366f1",
      idLabel: "Owner Email or Mobile Number",
      idPlaceholder: "owner@petconnect.ai",
      passLabel: "Account Passcode / OTP",
      defaultId: "owner@petconnect.ai",
      defaultPass: "owner123"
    },
    vet: {
      title: "Veterinary Practitioner Verification",
      icon: Stethoscope,
      color: "#34d399",
      idLabel: "Medical Board License ID",
      idPlaceholder: "VET-2026-8891",
      passLabel: "Practitioner Security PIN",
      defaultId: "VET-2026-8891",
      defaultPass: "vetpass99"
    },
    volunteer: {
      title: "Rescue Volunteer Credential Check",
      icon: Users,
      color: "#ec4899",
      idLabel: "Rescue Volunteer Badge Serial ID",
      idPlaceholder: "VOL-RESCUE-4421",
      passLabel: "NGO Security Passcode",
      defaultId: "VOL-RESCUE-4421",
      defaultPass: "volpass77"
    },
    admin: {
      title: "Administrator Security Authentication",
      icon: Shield,
      color: "#818cf8",
      idLabel: "System Admin Email",
      idPlaceholder: "admin@petconnect.ai",
      passLabel: "2FA Master Security Token",
      defaultId: "admin@petconnect.ai",
      defaultPass: "admin999"
    }
  };

  const config = roleConfig[targetRole] || roleConfig.owner;
  const IconComponent = config.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      // Validate credentials (Demo bypass for default or non-empty input)
      if (!identifier.trim() || !password.trim()) {
        setErrorMessage("Please enter both credential identifier and security passcode.");
        return;
      }

      onAuthenticate(targetRole, {
        identifier,
        verifiedAt: new Date().toLocaleTimeString(),
        badgeId: identifier
      });
    }, 800);
  };

  const handleUseDemoCredentials = () => {
    setIdentifier(config.defaultId);
    setPassword(config.defaultPass);
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 100,
      background: 'rgba(3, 6, 13, 0.92)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="app-card" style={{
        width: '100%',
        maxWidth: '380px',
        border: `2px solid ${config.color}`,
        position: 'relative',
        boxShadow: `0 0 35px ${config.color}33`
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Header Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: `${config.color}22`,
            border: `1px solid ${config.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
            color: config.color
          }}>
            <IconComponent style={{ width: '24px', height: '24px' }} />
          </div>

          <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>{config.title}</h3>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Strict Role-Based Credential & License Verification Required
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
              {config.idLabel}
            </label>
            <input 
              type="text"
              placeholder={config.idPlaceholder}
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
              placeholder="••••••••"
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

          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button 
              type="button" 
              onClick={handleUseDemoCredentials}
              className="btn-secondary" 
              style={{ flex: 1, fontSize: '0.72rem', justifyContent: 'center' }}
            >
              Fill Demo Credentials
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isVerifying}
              style={{ flex: 1, fontSize: '0.72rem', justifyContent: 'center', background: config.color }}
            >
              {isVerifying ? "Verifying..." : "Authenticate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
