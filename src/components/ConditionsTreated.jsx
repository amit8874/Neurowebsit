import React, { useState } from 'react';
import { Search, Sparkles, Activity, ArrowRight, ShieldCheck, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

// Import all 12 condition asset images
import aneurysmImg from '../assets/word_media_image10.webp';
import strokeImg from '../assets/Stroke.webp';
import avmImg from '../assets/Brain_AVM_415x374.webp';
import carotidImg from '../assets/Carotid.webp';
import venousImg from '../assets/Venous-Sinus.webp';
import spinalImg from '../assets/Spianal-Vascular.webp';
import headNeckImg from '../assets/Head-and-neck.webp';
import tumorImg from '../assets/Tumor-Embolization.webp';
import ccfImg from '../assets/CCFs.webp';
import mmaImg from '../assets/MMAs.webp';
import csfImg from '../assets/CSF-Leak.webp';

const conditionsData = [
  {
    id: 'aneurysm',
    category: 'Arterial Bleeding',
    categoryTag: 'Brain Arteries',
    title: 'Brain Aneurysm',
    image: aneurysmImg,
    description: 'A bulge in a brain blood vessel. Sealed safely via keyhole coiling to prevent hemorrhage.'
  },
  {
    id: 'stroke',
    category: 'Emergency Care',
    categoryTag: 'Stroke & Clots',
    title: 'Brain Stroke',
    image: strokeImg,
    description: 'Sudden clot blocking brain blood flow. Restored urgently via mechanical thrombectomy.'
  },
  {
    id: 'avm',
    category: 'Vascular Shunts',
    categoryTag: 'AVM & Shunts',
    title: 'Brain AVM',
    image: avmImg,
    description: 'Abnormal tangle of brain blood vessels present from birth. Treated with targeted liquid embolization.'
  },
  {
    id: 'carotid',
    category: 'Arterial Bleeding',
    categoryTag: 'Brain Arteries',
    title: 'Carotid Artery Disease',
    image: carotidImg,
    description: 'Narrowing of main neck arteries supplying the brain. Managed with angioplasty & stenting.'
  },
  {
    id: 'venous',
    category: 'Venous & CSF',
    categoryTag: 'Venous & Pressure',
    title: 'Venous Sinus Stenosis & IIH',
    image: venousImg,
    description: 'Narrowing of brain drainage veins causing skull pressure, severe headaches, and pulsatile tinnitus.'
  },
  {
    id: 'spinal',
    category: 'Spinal & Skull Base',
    categoryTag: 'Spinal Cord',
    title: 'Spinal Vascular Malformations',
    image: spinalImg,
    description: 'Abnormal blood vessel connections around the spinal cord causing progressive weakness and pain.'
  },
  {
    id: 'headneck',
    category: 'Spinal & Skull Base',
    categoryTag: 'Face & Neck',
    title: 'Head & Neck Disorders',
    image: headNeckImg,
    description: 'Vascular lesions of face, scalp, and neck causing recurrent nosebleeds or vascular malformations.'
  },
  {
    id: 'tumor',
    category: 'Spinal & Skull Base',
    categoryTag: 'Skull Base Tumors',
    title: 'Tumor Embolization',
    image: tumorImg,
    description: 'Pre-operative embolization to shut off blood supply to hypervascular brain and skull base tumors.'
  },
  {
    id: 'davf',
    category: 'Vascular Shunts',
    categoryTag: 'AVM & Shunts',
    title: 'Dural AV Fistulas (dAVFs)',
    image: avmImg,
    description: 'Abnormal artery-vein connection in brain coverings, treated completely via catheter embolization.'
  },
  {
    id: 'ccf',
    category: 'Vascular Shunts',
    categoryTag: 'Eye & Orbit',
    title: 'Carotid-Cavernous Fistulas',
    image: ccfImg,
    description: 'Vascular connection behind the eye causing eye redness or bulging. Fixed via micro-coiling.'
  },
  {
    id: 'mma',
    category: 'Emergency Care',
    categoryTag: 'Brain Bleeds',
    title: 'MMA Embolization',
    image: mmaImg,
    description: 'Minimally invasive embolization for chronic subdural hematomas, avoiding open skull drainage.'
  },
  {
    id: 'csf',
    category: 'Venous & CSF',
    categoryTag: 'CSF Leaks',
    title: 'CSF Leak & Fistula',
    image: csfImg,
    description: 'Leak of spinal fluid causing positional headaches, sealed via targeted endovascular intervention.'
  }
];

export default function ConditionsTreated({ onOpenBookingModal }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    'All',
    'Brain Arteries',
    'Stroke & Clots',
    'AVM & Shunts',
    'Spinal Cord',
    'Venous & Pressure'
  ];

  const handleTabChange = (cat) => {
    setActiveTab(cat);
    setIsExpanded(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsExpanded(false);
  };

  const filteredConditions = conditionsData.filter(item => {
    const matchesTab = activeTab === 'All' || item.categoryTag === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const displayedConditions = isExpanded ? filteredConditions : filteredConditions.slice(0, 6);

  return (
    <section 
      id="conditions-treated" 
      className="relative overflow-hidden"
      style={{
        paddingTop: '45px',
        paddingBottom: '30px',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%'
      }}
    >
      {/* Background Blobs for Visual Ambience */}
      <div className="glow-blob glow-blob-teal" style={{ top: '15%', right: '2%', opacity: 0.12 }} />
      <div className="glow-blob glow-blob-blue" style={{ bottom: '10%', left: '2%', opacity: 0.12 }} />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '36px' }}>
          <div className="flex items-center" style={{
            gap: '8px',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--accent-teal)',
            marginBottom: '12px'
          }}>
            <Sparkles size={16} fill="var(--accent-teal)" />
            <span>Three Pillars of the Specialty</span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Conditions Treated Through Interventional Neuroradiology
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '820px',
            lineHeight: '1.6',
            margin: 0
          }}>
            Each condition below explains what it is, how it develops, what symptoms it causes, how it is diagnosed, and what treatment options are available. The information is written clearly for <strong>patients and families</strong>.
          </p>
        </div>

        {/* Interactive Filter Bar & Search Input */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '40px',
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'rgba(var(--primary-rgb), 0.02)',
          border: '1px solid var(--border-color)'
        }}>
          {/* Category Filter Pills */}
          <div className="flex" style={{ gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    border: isActive ? '1px solid var(--accent-teal)' : '1px solid var(--border-color)',
                    backgroundColor: isActive ? 'var(--accent-teal)' : 'var(--bg-secondary)',
                    color: isActive ? '#ffffff' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat === 'All' ? `All Conditions (${conditionsData.length})` : cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            width: '100%',
            maxWidth: '280px',
            gap: '8px'
          }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search condition or symptom..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.85rem',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        {/* 3-Column Creative Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '28px'
        }} className="conditions-creative-grid">
          
          {displayedConditions.map((item) => (
            <div
              key={item.id}
              className="interactive-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'left'
              }}
            >
              {/* Image Frame with Overlay Badge */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '210px',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px'
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.4s ease'
                  }}
                />

                {/* Category Badge Tag */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  color: '#ffffff',
                  backdropFilter: 'blur(6px)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}>
                  {item.categoryTag}
                </span>
              </div>

              {/* Card Body */}
              <div style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '10px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0,
                    fontWeight: 400
                  }}>
                    {item.description}
                  </p>
                </div>

                {/* Action Link Footer */}
                <div style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => {
                      if (onOpenBookingModal) onOpenBookingModal();
                    }}
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--accent-teal)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Book Consult
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>

        {/* See More / See Less Toggle Button */}
        {filteredConditions.length > 6 && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => {
                if (isExpanded) {
                  setIsExpanded(false);
                  const el = document.getElementById('conditions-treated');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setIsExpanded(true);
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--accent-teal)',
                color: 'var(--accent-teal)',
                backgroundColor: 'rgba(6, 182, 212, 0.06)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-teal)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.06)';
                e.currentTarget.style.color = 'var(--accent-teal)';
              }}
            >
              <span>{isExpanded ? 'See Less' : 'See More Conditions'}</span>
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}

      </div>

      {/* Styled JSX for Responsive Grid */}
      <style>{`
        .conditions-creative-grid .interactive-card:hover img {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .conditions-creative-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .conditions-creative-grid {
            grid-template-columns: 1fr !important;
          }
          #conditions-treated .section-title {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
