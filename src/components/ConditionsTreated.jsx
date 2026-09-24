import React, { useState } from 'react';
import { Search, Sparkles, Activity, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

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
    description: 'A bulge in the wall of a brain artery. Many are discovered incidentally. Some can rupture, causing a life-threatening bleed. Understanding the risk factors and available treatments can help patients and families make informed decisions.'
  },
  {
    id: 'stroke',
    category: 'Emergency Care',
    categoryTag: 'Stroke & Clots',
    title: 'Stroke',
    image: strokeImg,
    description: 'A sudden interruption of blood supply to part of the brain. Ischaemic stroke — caused by a clot — accounts for most cases. Knowing the warning signs and acting within the treatment window can make a significant difference to outcomes.'
  },
  {
    id: 'avm',
    category: 'Vascular Shunts',
    categoryTag: 'AVM & Shunts',
    title: 'Brain AVM (Arteriovenous Malformation)',
    image: avmImg,
    description: 'An abnormal tangle of blood vessels in the brain, present from birth, in which arteries and veins are directly connected without the usual network of capillaries. AVMs can bleed, cause seizures, or produce headaches.'
  },
  {
    id: 'carotid',
    category: 'Arterial Bleeding',
    categoryTag: 'Brain Arteries',
    title: 'Carotid & Vertebral Artery Disease',
    image: carotidImg,
    description: 'Narrowing or blockage of the main arteries supplying the brain, usually due to atherosclerosis. This is one of the leading preventable causes of stroke. It often produces no symptoms until a TIA or stroke occurs.'
  },
  {
    id: 'venous',
    category: 'Venous & CSF',
    categoryTag: 'Venous & Pressure',
    title: 'Venous Sinus Stenosis & IIH',
    image: venousImg,
    description: 'Narrowing of the brain\'s venous drainage channels can raise pressure inside the skull, causing persistent headaches, pulsatile tinnitus, and visual disturbances. This condition is often underdiagnosed, particularly in young women.'
  },
  {
    id: 'spinal',
    category: 'Spinal & Skull Base',
    categoryTag: 'Spinal Cord',
    title: 'Spinal Vascular Malformations',
    image: spinalImg,
    description: 'Abnormal blood vessel connections within or around the spinal cord. These conditions are rare and frequently misdiagnosed for years. Progressive leg weakness and bladder changes are common presentations.'
  },
  {
    id: 'headneck',
    category: 'Spinal & Skull Base',
    categoryTag: 'Face & Neck',
    title: 'Head & Neck Vascular Disorders',
    image: headNeckImg,
    description: 'A group of vascular conditions affecting the face, skull base, and neck — including carotid-cavernous fistulas, scalp AVMs, and vascular causes of recurrent nosebleeds. Symptoms vary widely depending on which vessels are involved.'
  },
  {
    id: 'tumor',
    category: 'Spinal & Skull Base',
    categoryTag: 'Skull Base Tumors',
    title: 'Tumor Embolization',
    image: tumorImg,
    description: 'Certain brain and skull-base tumours have a rich blood supply that makes surgery risky. Embolization before surgery reduces this blood supply, making the operation safer and more effective. It is a preparatory procedure, not a standalone treatment for the tumour itself.'
  },
  {
    id: 'davf',
    category: 'Vascular Shunts',
    categoryTag: 'AVM & Shunts',
    title: 'Dural Arteriovenous Fistulas (dAVFs)',
    image: avmImg,
    description: 'An abnormal connection between an artery and a vein in the coverings of the brain or spine. dAVFs can cause a whooshing sound in the ear, headaches, and, if untreated, bleeding. They are often treatable entirely through endovascular embolization.'
  },
  {
    id: 'ccf',
    category: 'Vascular Shunts',
    categoryTag: 'Eye & Orbit',
    title: 'Carotid-Cavernous Fistulas (CCFs)',
    image: ccfImg,
    description: 'An abnormal connection between the carotid artery and the venous network behind the eye. A CCF can cause a red, bulging, or pulsating eye and visual disturbance. It can be closed from the inside using endovascular techniques.'
  },
  {
    id: 'mma',
    category: 'Emergency Care',
    categoryTag: 'Brain Bleeds',
    title: 'MMA Embolization',
    image: mmaImg,
    description: 'Embolization of the middle meningeal artery is a newer endovascular technique used to treat certain chronic brain bleeds (chronic subdural haematoma) and some cases of unremitting headache. It addresses the source of the problem through a tiny catheter, often avoiding open surgery.'
  },
  {
    id: 'csf',
    category: 'Venous & CSF',
    categoryTag: 'CSF Leaks',
    title: 'CSF Leak & CSF-Venous Fistula',
    image: csfImg,
    description: 'A leak of cerebrospinal fluid can cause severe positional headaches that are often missed for years. When the cause is a CSF-venous fistula, it can be treated with a precise, minimally invasive embolization — sealing the leak and relieving the headache.'
  }
];

export default function ConditionsTreated() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Brain Arteries',
    'Stroke & Clots',
    'AVM & Shunts',
    'Spinal Cord',
    'Venous & Pressure'
  ];

  const filteredConditions = conditionsData.filter(item => {
    const matchesTab = activeTab === 'All' || item.categoryTag === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section 
      id="conditions-treated" 
      className="py-20 relative overflow-hidden"
      style={{
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
                  onClick={() => setActiveTab(cat)}
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
          
          {filteredConditions.map((item) => (
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
                  marginTop: '20px',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <a href="#booking" style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--accent-teal)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none'
                  }}>
                    Consult Specialist
                    <ArrowRight size={14} />
                  </a>

                  <a href="#treatments" style={{
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    textDecoration: 'none'
                  }}>
                    Learn Options
                  </a>
                </div>
              </div>

            </div>
          ))}

        </div>

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
