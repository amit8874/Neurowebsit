import React, { useState, useEffect, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const mediaItems = [
  {
    id: 1,
    type: 'image',
    category: 'Consultation',
    title: 'Patient Diagnostic Consultation',
    description: 'Dr. Dewansh Mishra reviews brain vascular mapping results on high-resolution screens with a patient, explaining the details of the treatment plan.',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    type: 'video',
    category: 'Diagnostics',
    title: '3D Cerebral Angiography Run',
    description: 'A rotational digital subtraction angiography (DSA) displaying the complex, three-dimensional cerebrovascular structure for precise target routing.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-magnetic-resonance-imaging-of-a-human-brain-41551-large.mp4',
  },
  {
    id: 3,
    type: 'image',
    category: 'Technology',
    title: 'Apollomedics Angio Cath Lab',
    description: 'The state-of-the-art hybrid Cath Lab at Apollomedics Super Speciality Hospitals in Lucknow, featuring advanced flat-panel imaging for safe microcatheter guidance.',
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    type: 'video',
    category: 'Stroke Care',
    title: 'Stroke Workstation Analysis',
    description: 'Clinical evaluation of perfusion diffusion mismatch on MRI brain scans to identify viable penumbra and determine eligibility for mechanical thrombectomy.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-doctor-analyzing-a-brain-mri-on-a-computer-screen-41552-large.mp4',
  },
  {
    id: 5,
    type: 'image',
    category: 'Neurovascular',
    title: 'Endovascular Aneurysm Coiling Prep',
    description: 'High-resolution MRI scan showing a cerebral aneurysm prior to treatment. Coiling fills the aneurysm to prevent rupture without requiring invasive open-skull surgery.',
    url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    type: 'video',
    category: 'Microcatheter Procedure',
    title: 'Endovascular Navigation Simulation',
    description: 'Demonstrations of delicate micro-guide wire control and microcatheter navigation in a vascular model, simulating steps of aneurysm treatment or stenting.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-surgeons-in-surgical-gloves-during-an-operation-41554-large.mp4',
  }
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const lightboxVideoRef = useRef(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextMedia();
      if (e.key === 'ArrowLeft') prevMedia();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = ''; // Unlock background scroll
  };

  const nextMedia = () => {
    setLightboxIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setLightboxIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  // Render a single media item card
  const renderCard = (item, originalIndex, setPrefix) => {
    const isVideo = item.type === 'video';

    return (
      <div
        key={`${item.id}-${setPrefix}`}
        className="gallery-card interactive-card"
        onClick={() => openLightbox(originalIndex)}
        style={{
          position: 'relative',
          width: '380px',
          height: '250px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          cursor: 'pointer',
          flexShrink: 0,
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
        }}
      >
        {/* Media Preview */}
        {isVideo ? (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <video
              src={item.url}
              muted
              autoPlay
              loop
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
            />
            {/* Play overlay button */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              zIndex: 3
            }}>
              <Play size={16} fill="#ffffff" style={{ marginLeft: '2px' }} />
            </div>
          </div>
        ) : (
          <img
            src={item.url}
            alt={item.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* Floating Category Badge */}
        <span style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          backgroundColor: isVideo ? 'rgba(6, 182, 212, 0.9)' : 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          padding: '4px 10px',
          borderRadius: 'var(--radius-sm)',
          zIndex: 2,
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          {item.category}
        </span>

        {/* Hover Hover Overlay Indicator */}
        <div className="gallery-hover-indicator" style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity var(--transition-fast)',
          zIndex: 3
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-lg)',
            fontWeight: 600,
            fontSize: '0.875rem',
            border: '1px solid var(--border-color)',
            transform: 'translateY(10px)',
            transition: 'transform var(--transition-fast)'
          }}>
            <Eye size={16} style={{ color: 'var(--accent-teal)' }} />
            <span>Inspect Case</span>
          </div>
        </div>

        {/* Dark bottom details overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(12, 17, 34, 0.9) 0%, rgba(12, 17, 34, 0.4) 60%, transparent 100%)',
          padding: '20px 20px 16px',
          color: '#ffffff',
          textAlign: 'left',
          zIndex: 2
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: 700,
            margin: 0,
            color: '#ffffff',
            fontFamily: 'var(--font-heading)'
          }}>
            {item.title}
          </h4>
          <p style={{
            fontSize: '0.775rem',
            color: 'rgba(255, 255, 255, 0.75)',
            marginTop: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 400
          }}>
            {item.description}
          </p>
        </div>
      </div>
    );
  };

  const activeMedia = lightboxIndex !== null ? mediaItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 relative" style={{
      backgroundColor: 'var(--bg-secondary)',
      transition: 'background-color var(--transition-normal), border-color var(--transition-normal)',
      borderBottom: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      {/* Visual background enhancements */}
      <div className="glow-blob glow-blob-blue" style={{ bottom: '-10%', left: '5%' }} />
      <div className="glow-blob glow-blob-teal" style={{ top: '-10%', right: '5%', opacity: 0.15 }} />

      <div className="container relative z-10" style={{ maxWidth: '100%', paddingLeft: 0, paddingRight: 0 }}>
        
        {/* Section Headers */}
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingLeft: '24px', paddingRight: '24px' }}>
          <span className="section-tag">Media & Case Studies</span>
          <h2 className="section-title">Clinical Gallery & Procedures</h2>
          <p className="section-desc">
            Explore photos and high-definition recordings of clinical operations, professional diagnostics, and interventional neuroradiology setups.
          </p>
        </div>

        {/* Continuous Loop Marquee Container */}
        <div 
          className="marquee-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            paddingTop: '20px',
            paddingBottom: '20px',
            cursor: 'grab'
          }}
        >
          {/* Faded edges gradients for premium glass transition */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '150px',
            background: 'linear-gradient(to right, var(--bg-secondary) 0%, transparent 100%)',
            zIndex: 5,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '150px',
            background: 'linear-gradient(to left, var(--bg-secondary) 0%, transparent 100%)',
            zIndex: 5,
            pointerEvents: 'none'
          }} />

          {/* Scrolling Track */}
          <div 
            className={`marquee-track ${isPaused ? 'paused' : ''}`}
            style={{
              display: 'flex',
              gap: '24px',
              width: 'max-content',
            }}
          >
            {/* Set 1 */}
            {mediaItems.map((item, index) => renderCard(item, index, 'set1'))}
            {/* Set 2 (Duplicated for seamless loop) */}
            {mediaItems.map((item, index) => renderCard(item, index, 'set2'))}
            {/* Set 3 (Duplicated once more for ultra-wide setups to eliminate gaps) */}
            {mediaItems.map((item, index) => renderCard(item, index, 'set3'))}
          </div>
        </div>

        {/* Small hint under gallery */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', gap: '24px' }}>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)' }} />
            Hover to pause scrolling
          </p>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)' }} />
            Click card to inspect case details
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 10, 19, 0.9)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn var(--transition-fast) ease-out'
          }}
        >
          {/* Modal Content Box (Click shouldn't close) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1000px',
              backgroundColor: 'var(--bg-glass)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'scaleUp var(--transition-normal) cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Top Toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: 'rgba(var(--primary-rgb), 0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#ffffff',
                  backgroundColor: 'var(--accent-teal)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  {activeMedia.category}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Case Study {lightboxIndex + 1} of {mediaItems.length}
                </span>
              </div>
              
              <button
                onClick={closeLightbox}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.05)'}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Media Body & Details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              minHeight: '400px',
              maxHeight: '75vh',
            }}
            className="lightbox-grid"
            >
              {/* Media Preview Box */}
              <div style={{
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {activeMedia.type === 'video' ? (
                  <video
                    ref={lightboxVideoRef}
                    src={activeMedia.url}
                    controls
                    autoPlay
                    loop
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                )}

                {/* Left/Right Floating Arrows for Quick Navigation */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-teal)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.7)'}
                  aria-label="Previous case"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-teal)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.7)'}
                  aria-label="Next case"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Text Description Box */}
              <div style={{
                padding: '36px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflowY: 'auto',
                backgroundColor: 'var(--bg-secondary)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--accent-teal)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    Case Details
                  </span>
                  
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    lineHeight: '1.25',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-primary)'
                  }}>
                    {activeMedia.title}
                  </h3>

                  <div style={{ width: '40px', height: '3px', backgroundColor: 'var(--accent-teal)', borderRadius: 'var(--radius-full)' }} />
                  
                  <p style={{
                    fontSize: '0.975rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    fontWeight: 400
                  }}>
                    {activeMedia.description}
                  </p>
                </div>

                {/* Additional Clinical Context Info Footer */}
                <div style={{
                  marginTop: '32px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    <strong>Facility:</strong> Apollomedics Super Speciality Hospital, Lucknow
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    <strong>Specialist:</strong> Dr. Dewansh Mishra (DM Neuroradiology)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styled JSX Styles for animations and edge cases */}
      <style>{`
        /* Continuous loop track styles */
        .marquee-track {
          animation: loop-marquee 35s linear infinite;
        }

        .marquee-track.paused {
          animation-play-state: paused;
        }

        @keyframes loop-marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }

        /* Hover Zoom Indicator Trigger */
        .gallery-card:hover .gallery-hover-indicator {
          opacity: 1 !important;
        }
        
        .gallery-card:hover .gallery-hover-indicator > div {
          transform: translateY(0) !important;
        }

        /* Video element overlay hover adjustments */
        .gallery-card:hover img, .gallery-card:hover video {
          transform: scale(1.06);
          transition: transform var(--transition-slow) cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-card img, .gallery-card video {
          transition: transform var(--transition-normal) ease;
        }

        /* Lightbox animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Lightbox responsiveness */
        @media (max-width: 868px) {
          .lightbox-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            max-height: 85vh !important;
            overflow-y: auto !important;
          }

          .lightbox-grid video, .lightbox-grid img {
            height: 250px !important;
            object-fit: cover !important;
          }
        }
      `}</style>
    </section>
  );
}
