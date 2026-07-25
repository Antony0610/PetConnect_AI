import React, { useState } from 'react';
import { MapPin, Navigation, Stethoscope, ShoppingBag, Shield, Compass, Search, Phone, ExternalLink, Calendar, Award } from 'lucide-react';

export default function Volume1CoreServices({ petData }) {
  const [mapFilter, setMapFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { id: 1, name: "Metro Veterinary Hospital & ER", type: "vet", dist: "1.2 km", rating: "4.9 ★", phone: "+1 555-0192", address: "452 Care Ave, Sector 4", status: "Open 24/7" },
    { id: 2, name: "Paws & Whiskers Care Clinic", type: "vet", dist: "2.8 km", rating: "4.8 ★", phone: "+1 555-0144", address: "88 Healing Way", status: "Closes 9 PM" },
    { id: 3, name: "Happy Tails Grooming Spa", type: "shop", dist: "0.8 km", rating: "4.7 ★", phone: "+1 555-0188", address: "12 Luxury Pet Blvd", status: "Open Now" },
    { id: 4, name: "Central Animal Welfare Shelter", type: "shelter", dist: "3.5 km", rating: "4.9 ★", phone: "+1 555-0133", address: "104 Rescue Lane", status: "Volunteers Welcome" },
    { id: 5, name: "Bark & Byte Pet Nutrition", type: "shop", dist: "1.9 km", rating: "4.6 ★", phone: "+1 555-0177", address: "77 Commerce St", status: "Open Now" }
  ];

  const travelLocations = [
    { name: "Pine Tree Pet Resort & Trails", type: "Hotel & Resort", rating: "4.9 ★", location: "Blue Mountain Valley", features: ["Off-leash park", "Pet pool", "Vet on call"] },
    { name: "Sunset Beach Dog Haven", type: "Public Beach", rating: "4.8 ★", location: "Coastal Highway", features: ["Freshwater wash", "Shaded cabanas", "Agility gear"] },
    { name: "Greenwood National Pet Park", type: "Park", rating: "4.9 ★", location: "Central Metro", features: ["Fenced zones", "Drinking fountains", "Waste stations"] }
  ];

  const filteredServices = services.filter(s => {
    const matchesFilter = mapFilter === 'all' || s.type === mapFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Hero Banner */}
      <div className="glass-card" style={{
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7))',
        border: '1px solid rgba(99, 102, 241, 0.2)'
      }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: '12px' }}>
            <Award style={{ width: '12px', height: '12px' }} /> Volume 1 Specification
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
            Core Ecosystem & GIS Infrastructure
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
            Centralized hub managing pet biographical profiles, verified veterinary registries, 
            GIS location services, and pet-friendly travel logistics.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>REGISTERED PETS</span>
              <strong style={{ fontSize: '1.2rem', color: '#a5b4fc' }}>1,248 Active</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>GIS VET NETWORK</span>
              <strong style={{ fontSize: '1.2rem', color: '#34d399' }}>320 Clinics</strong>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '200px' }}>
          <img 
            src="/collar_hero.jpg" 
            alt="Smart Pet Collar Hero" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(7, 9, 19, 0.9) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Active Profile: Bruno ({petData.breed})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Pet Profile Card + GIS Services Map */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Pet Profile Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield style={{ color: '#818cf8', width: '20px', height: '20px' }} />
              Pet Digital Profile
            </h3>
            <span className="badge badge-success">Verified Chip</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'center' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              padding: '3px'
            }}>
              <img 
                src="/collar_hero.jpg" 
                alt="Bruno" 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h4 style={{ fontSize: '1.3rem', color: '#f8fafc' }}>{petData.name}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{petData.breed} • {petData.age} Years</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>CHIP ID: {petData.microchip}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Weight</span>
              <p style={{ fontWeight: 700, color: '#f8fafc' }}>{petData.weight} kg</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Collar Device</span>
              <p style={{ fontWeight: 700, color: '#38bdf8' }}>{petData.collarId}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Primary Vet</span>
              <p style={{ fontWeight: 700, color: '#f8fafc' }}>Dr. Sarah Jenkins</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Last Rabies Shot</span>
              <p style={{ fontWeight: 700, color: '#34d399' }}>Jan 2026 (Valid)</p>
            </div>
          </div>
        </div>

        {/* GIS Nearby Services Map */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin style={{ color: '#38bdf8', width: '20px', height: '20px' }} />
                GIS Nearby Pet Services
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location: Metro Sector 4 (Live GPS)</p>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              {['all', 'vet', 'shop', 'shelter'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setMapFilter(filter)}
                  style={{
                    background: mapFilter === filter ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                    color: mapFilter === filter ? '#a5b4fc' : 'var(--text-muted)',
                    border: '1px solid var(--border-light)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', width: '16px', height: '16px' }} />
            <input 
              type="text"
              placeholder="Search vet clinics, groomers, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-light)',
                borderRadius: '10px',
                padding: '8px 12px 8px 36px',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Simulated Map Render */}
          <div style={{
            height: '180px',
            borderRadius: '14px',
            background: '#040914',
            border: '1px solid var(--border-light)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* SVG Map Grid Background */}
            <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15 }}>
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#6366f1" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulated Map Markers */}
            <div style={{ position: 'absolute', top: '30%', left: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#ef4444', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 12px #ef4444' }}>
                <Stethoscope style={{ width: '16px', height: '16px' }} />
              </div>
              <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>Metro Vet</span>
            </div>

            <div style={{ position: 'absolute', top: '60%', left: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#38bdf8', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <ShoppingBag style={{ width: '14px', height: '14px' }} />
              </div>
              <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>Happy Tails</span>
            </div>

            <div style={{ position: 'absolute', top: '45%', left: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#10b981', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Navigation style={{ width: '14px', height: '14px' }} />
              </div>
              <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' }}>Bruno Location</span>
            </div>

            <span className="badge badge-primary" style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
              Interactive OpenStreetMap / Google Maps Layer
            </span>
          </div>

          {/* List of Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto' }}>
            {filteredServices.map(item => (
              <div key={item.id} style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h5 style={{ fontSize: '0.85rem', color: '#f8fafc' }}>{item.name}</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{item.address} • {item.dist}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24' }}>{item.rating}</span>
                  <a href={`tel:${item.phone}`} style={{ display: 'block', fontSize: '0.7rem', color: '#818cf8', textDecoration: 'none' }}>
                    Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Planner Section */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass style={{ color: '#ec4899', width: '20px', height: '20px' }} />
          Pet-Friendly Travel Planner
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {travelLocations.map((loc, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="badge badge-primary">{loc.type}</span>
                <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700 }}>{loc.rating}</span>
              </div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{loc.name}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '12px' }}>{loc.location}</p>
              
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {loc.features.map((feat, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
