import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

// Dynamically import all jpeg images from src/assets/gallary directory
const galleryModules = import.meta.glob('../assets/gallary/*.jpeg', { eager: true, import: 'default' });

const galleryImages = Object.keys(galleryModules).map((path, index) => {
  const filename = path.split('/').pop();
  return {
    id: index + 1,
    url: galleryModules[path],
    title: `Clinical Photo ${index + 1}`,
    filename: filename
  };
});

export default function Gallery({ onBack, isPage = false }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const nextMedia = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevMedia = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const activeMedia = lightboxIndex !== null ? galleryImages[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="py-20 relative"
      style={{
        minHeight: isPage ? '100vh' : 'auto',
        paddingTop: isPage ? 'calc(var(--navbar-height) + 20px)' : '80px',
        paddingBottom: '80px',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Background Blobs */}
      <div className="glow-blob glow-blob-blue" style={{ bottom: '10%', left: '5%', opacity: 0.12 }} />
      <div className="glow-blob glow-blob-teal" style={{ top: '10%', right: '5%', opacity: 0.12 }} />

      <div className="container relative z-10">

        {/* Top Back Navigation Button (if opened as dedicated page) */}
        {isPage && onBack && (
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <button
              onClick={onBack}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              Back to Main Website
            </button>
          </div>
        )}

        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-tag" style={{ marginBottom: '10px' }}>Clinical Media & Gallery</span>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
            Clinical Procedures & Diagnostic Gallery
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            lineHeight: '1.6',
            margin: 0
          }}>
            Explore high-resolution clinical photographs, endovascular cath lab procedures, and neurovascular diagnostic case studies.
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }} className="gallery-photo-grid">
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className="interactive-card gallery-photo-card"
              onClick={() => openLightbox(index)}
              style={{
                position: 'relative',
                height: '240px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />

              {/* Hover Indicator */}
              <div className="gallery-hover-overlay" style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.45)',
                backdropFilter: 'blur(3px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity var(--transition-fast)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(6, 182, 212, 0.9)',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <ZoomIn size={16} />
                  <span>Inspect Image</span>
                </div>
              </div>

              {/* Bottom Label Tag */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 100%)',
                padding: '16px 14px 10px',
                color: '#ffffff',
                textAlign: 'left'
              }}>
                <p style={{ fontSize: '0.825rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                  Photo #{item.id}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 10, 19, 0.92)',
            backdropFilter: 'blur(16px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn var(--transition-fast) ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: 'rgba(var(--primary-rgb), 0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--accent-teal)'
                }}>
                  Photo {lightboxIndex + 1} of {galleryImages.length}
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
                  backgroundColor: 'rgba(var(--primary-rgb), 0.05)'
                }}
                aria-label="Close photo"
              >
                <X size={20} />
              </button>
            </div>

            {/* Photo Stage with Left/Right Navigation */}
            <div style={{
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              height: '70vh',
              maxHeight: '650px'
            }}>
              <img
                src={activeMedia.url}
                alt={activeMedia.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />

              {/* Prev Button */}
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
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
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
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styled JSX for Hover Trigger & Responsive Grid */}
      <style>{`
        .gallery-photo-card:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
        .gallery-photo-card:hover img {
          transform: scale(1.06) !important;
        }
        @media (max-width: 1024px) {
          .gallery-photo-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .gallery-photo-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-photo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
