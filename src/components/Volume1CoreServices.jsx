import React, { useState } from 'react';
import { MapPin, Navigation, Stethoscope, ShoppingBag, Search, Phone, Compass, Award } from 'lucide-react';

export default function Volume1CoreServices({ petData }) {
  const [mapFilter, setMapFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { id: 1, name: "Metro Veterinary Hospital & ER", type: "vet", dist: "1.2 km", rating: "4.9 ★", phone: "+1 555-0192", address: "Sector 4", status: "Open 24/7" },
    { id: 2, name: "Paws & Whiskers Clinic", type: "vet", dist: "2.8 km", rating: "4.8 ★", phone: "+1 555-0144", address: "Healing Way", status: "Closes 9 PM" },
    { id: 3, name: "Happy Tails Grooming Spa", type: "shop", dist: "0.8 km", rating: "4.7 ★", phone: "+1 555-0188", address: "Luxury Pet Blvd", status: "Open Now" },
    { id: 4, name: "Central Animal Rescue Shelter", type: "shelter", dist: "3.5 km", rating: "4.9 ★", phone: "+1 555-0133", address: "Rescue Lane", status: "Open" }
  ];

  const filteredServices = services.filter(s => {
    const matchesFilter = mapFilter === 'all' || s.type === mapFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Search Header */}
      <div className="app-card" style={{ padding: '14px' }}>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', width: '15px', height: '15px' }} />
          <input 
            type="text"
            placeholder="Search vets, groomers, shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-glass)',
              borderRadius: '10px',
              padding: '8px 10px 8px 32px',
              color: 'white',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'vet', 'shop', 'shelter'].map((filter) => (
            <button
              key={filter}
              onClick={() => setMapFilter(filter)}
              style={{
                flex: 1,
                background: mapFilter === filter ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                color: mapFilter === filter ? '#a5b4fc' : 'var(--text-muted)',
                border: '1px solid var(--border-glass)',
                padding: '5px 0',
                borderRadius: '8px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* GIS Simulated Map Render */}
      <div style={{
        height: '160px',
        borderRadius: '16px',
        background: '#040914',
        border: '1px solid var(--border-glass)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15 }}>
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#6366f1" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div style={{ position: 'absolute', top: '30%', left: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: '#ef4444', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Stethoscope style={{ width: '14px', height: '14px' }} />
          </div>
          <span style={{ fontSize: '0.62rem', background: 'rgba(0,0,0,0.8)', padding: '1px 4px', borderRadius: '4px', marginTop: '2px' }}>Metro Vet</span>
        </div>

        <div style={{ position: 'absolute', top: '55%', left: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: '#10b981', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Navigation style={{ width: '12px', height: '12px' }} />
          </div>
          <span style={{ fontSize: '0.62rem', background: 'rgba(0,0,0,0.8)', padding: '1px 4px', borderRadius: '4px', marginTop: '2px' }}>Bruno</span>
        </div>
      </div>

      {/* Services List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredServices.map(item => (
          <div key={item.id} className="app-card" style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h5 style={{ fontSize: '0.85rem', color: '#f8fafc' }}>{item.name}</h5>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{item.address} • {item.dist}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24' }}>{item.rating}</span>
              <a href={`tel:${item.phone}`} style={{ display: 'block', fontSize: '0.7rem', color: '#818cf8', textDecoration: 'none', marginTop: '2px' }}>
                Call Clinic
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
