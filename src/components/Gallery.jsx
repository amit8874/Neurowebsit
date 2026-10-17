import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, Play, Pause } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Gallery({ onBack, isPage = false, onOpenBookingModal }) {
  const { galleryImages: contextGallery } = useData();
  const galleryImages = contextGallery || [];

  // Triple array for seamless infinite looping
  const displayImages = galleryImages.length > 0 ? [...galleryImages, ...galleryImages, ...galleryImages] : [];
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll loop
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Initialize scroll position in the middle set of images
    if (container.scrollLeft === 0) {
      container.scrollLeft = container.scrollWidth / 3;
    }

    let animId;
    const speed = 0.8; // Smooth slow continuous sliding speed

    const step = () => {
      if (!isHovered && !isDragging && !isPaused && container) {
        container.scrollLeft += speed;
        
        // Loop back seamlessly when scrolling past middle boundary
        const oneThird = container.scrollWidth / 3;
        if (container.scrollLeft >= oneThird * 2) {
          container.scrollLeft -= oneThird;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += oneThird;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, isDragging, isPaused]);

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

  // Drag handlers for mouse & touch
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    if (Math.abs(walk) > 5) {
      setDragMoved(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const activeMedia = lightboxIndex !== null ? galleryImages[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="py-20 relative"
      style={{
        minHeight: isPage ? '100vh' : 'auto',
        paddingTop: isPage ? 'calc(var(--navbar-height) + 20px)' : '70px',
        paddingBottom: '70px',
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

      <div className="container relative z-10" style={{ maxWidth: '1400px' }}>

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-tag" style={{ marginBottom: '10px' }}>Clinical Media & Gallery</span>
          <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '12px' }}>
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

        {/* Carousel Container with Floating Controls */}
        <div 
          style={{ position: 'relative', width: '100%' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
        >
          {/* Left Arrow Button */}
          <button
            onClick={scrollPrev}
            aria-label="Previous gallery images"
            style={{
              position: 'absolute',
              left: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#0f172a',
              border: '2px solid #06b6d4',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease'
            }}
            className="gallery-nav-btn"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={scrollNext}
            aria-label="Next gallery images"
            style={{
              position: 'absolute',
              right: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#0f172a',
              border: '2px solid #06b6d4',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
              transition: 'all 0.2s ease'
            }}
            className="gallery-nav-btn"
          >
            <ChevronRight size={24} />
          </button>

          {/* Auto-Slide Play/Pause Toggle Indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '12px'
          }}>
            <button
              onClick={() => setIsPaused(!isPaused)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isPaused ? <Play size={14} color="#34d399" /> : <Pause size={14} color="#38bdf8" />}
              {isPaused ? 'Resume Auto-Slide' : 'Pause Auto-Slide'}
            </button>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              • Drag or swipe to scroll photos
            </span>
          </div>

          {/* Horizontally Scrollable Photo Track (4-5 Photos visible on desktop) */}
          <div
            ref={scrollRef}
            className="gallery-track"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              display: 'flex',
              gap: '18px',
              overflowX: 'auto',
              scrollBehavior: isDragging ? 'auto' : 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '12px 6px',
              cursor: isDragging ? 'grabbing' : 'grab',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {displayImages.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="gallery-slide-card"
                onClick={() => {
                  if (!dragMoved) {
                    openLightbox(index % galleryImages.length);
                  }
                }}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Hover Indicator Overlay */}
                <div className="gallery-hover-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
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
                    backgroundColor: 'rgba(6, 182, 212, 0.95)',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}>
                    <ZoomIn size={16} />
                    <span>View Image</span>
                  </div>
                </div>

                {/* Bottom Label Tag */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(7, 11, 20, 0.9) 0%, transparent 100%)',
                  padding: '16px 14px 10px',
                  color: '#ffffff',
                  textAlign: 'left'
                }}>
                  <p style={{ fontSize: '0.825rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                    Clinical Photo #{item.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 10, 19, 0.94)',
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

      {/* Responsive Carousel Styling */}
      <style>{`
        .gallery-track::-webkit-scrollbar {
          display: none !important;
        }
        .gallery-slide-card {
          flex: 0 0 calc(20% - 14.4px); /* Displays 5 photos at a time on desktop! */
          min-width: 220px;
          height: 230px;
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
        }
        .gallery-slide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(6, 182, 212, 0.25);
          border-color: #06b6d4;
        }
        .gallery-slide-card:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
        .gallery-slide-card:hover img {
          transform: scale(1.08) !important;
        }
        .gallery-nav-btn:hover {
          background-color: #06b6d4 !important;
          color: #070b14 !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        @media (max-width: 1280px) {
          .gallery-slide-card {
            flex: 0 0 calc(25% - 13.5px); /* 4 photos at a time */
          }
        }
        @media (max-width: 992px) {
          .gallery-slide-card {
            flex: 0 0 calc(33.333% - 12px); /* 3 photos at a time */
          }
        }
        @media (max-width: 640px) {
          .gallery-slide-card {
            flex: 0 0 calc(50% - 9px); /* 2 photos at a time on mobile */
            height: 180px;
          }
          .gallery-nav-btn {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
