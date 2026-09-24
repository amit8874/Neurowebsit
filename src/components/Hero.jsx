import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Star, Activity, Zap, ShieldAlert, Scan, FileSearch, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import drDewanshImg from '../assets/dr-dewansh-mishra.jpg';
import banner1Img from '../assets/banner1-.jpeg';
import banner2Img from '../assets/banner2-.jpeg';

const heroSlides = [
  {
    id: 1,
    isBannerOnly: true,
    title: "Banner 1",
    imageUrl: banner1Img
  },
  {
    id: 2,
    isBannerOnly: true,
    title: "Banner 2",
    imageUrl: banner2Img
  },
  {
    id: 3,
    badge: "Keyhole Surgery Alternative",
    title: "Aneurysm Coiling &",
    highlight: "Flow Diversion",
    subhead: "No Skull Opening Required",
    description: "Ultra-soft platinum coils and Stent-Assisted Coiling (SAC) navigate directly inside cerebral aneurysms to seal them and prevent devastating brain hemorrhage.",
    primaryCta: { text: "Aneurysm Consult", href: "#booking", icon: <Calendar size={18} /> },
    secondaryCta: { text: "Inspect Case Studies", href: "#gallery" },
    rightType: "image",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    statusBadge: { title: "Endovascular Coiling", subtext: "Platinum Micro-coils", color: "#06b6d4" },
    stats: [
      { value: "3 Days", label: "Average Hospital Stay" },
      { value: "Zero Skull Cut", label: "Minimally Invasive" },
      { value: "Flow Diverters", label: "Advanced Stenting" }
    ]
  },
  {
    id: 4,
    badge: "Sub-Millimeter Diagnostic Precision",
    title: "3D Cerebral & Spinal",
    highlight: "DSA Angiography",
    subhead: "Gold Standard Vessel Mapping",
    description: "Rotational Digital Subtraction Angiography (DSA) capturing 3D cerebrovascular architecture with sub-millimeter detail for pin-point diagnosis of blockages & shunts.",
    primaryCta: { text: "Schedule DSA Scan", href: "#booking", icon: <Scan size={18} /> },
    secondaryCta: { text: "Learn About DSA", href: "#treatments" },
    rightType: "image",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    statusBadge: { title: "Diagnostic Cath Lab", subtext: "3D Rotational Angio", color: "#10b981" },
    stats: [
      { value: "Sub-mm", label: "Spatial Resolution" },
      { value: "500+", label: "Diagnostic Scans" },
      { value: "Gold Standard", label: "Vascular Imaging" }
    ]
  },
  {
    id: 5,
    badge: "Subspecialty Academic Review",
    title: "Diagnostic Neuro-Review",
    highlight: "MRI & CT Second Opinion",
    subhead: "Comprehensive Scan Analysis",
    description: "Expert neuroradiological consultation reviewing high-resolution MRI, CT Angiography, DWI/PWI sequences, and inconclusive scans to deliver unambiguous diagnosis.",
    primaryCta: { text: "Get 2nd Opinion", href: "#booking", icon: <FileSearch size={18} /> },
    secondaryCta: { text: "Read Publications", href: "#research" },
    rightType: "image",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
    statusBadge: { title: "Subspecialty Neuro-Review", subtext: "DM Neuroradiology", color: "#8b5cf6" },
    stats: [
      { value: "DM Fellow", label: "SCTIMST Trained" },
      { value: "Multi-Modality", label: "MRI / CT / Vessel Wall" },
      { value: "Clear Clarity", label: "Diagnostic Reports" }
    ]
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play loop slider (every 4.5 seconds continuously, without stopping on hover)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Touch Swipe handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const slide = heroSlides[currentSlide];

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        paddingTop: 'calc(var(--navbar-height) + 16px)',
        paddingBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Background Blobs for depth */}
      <div className="glow-blob glow-blob-teal" style={{ top: '10%', left: '5%' }} />
      <div className="glow-blob glow-blob-blue" style={{ bottom: '15%', right: '5%' }} />

      <div className="container relative z-10" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Carousel Slide Stage */}
        {slide.isBannerOnly ? (
          <div
            key={slide.id}
            className="hero-slide-animation flex justify-center items-center"
            style={{
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              padding: '0',
              overflow: 'hidden'
            }}
          >
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'var(--bg-secondary)'
            }}>
              <img
                src={slide.imageUrl}
                alt={slide.title || "Banner"}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        ) : (
          <div key={slide.id} className="grid grid-cols-2 items-center hero-slide-animation hero-slide-stage" style={{ gap: '24px' }}>
            
            {/* Left Column: Dynamic Slide Text & CTA */}
            <div className="hero-text-col" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Top Badge */}
              <div className="flex items-center" style={{
                alignSelf: 'flex-start',
                gap: '8px',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--accent-teal)'
              }}>
                <Star size={14} fill="var(--accent-teal)" style={{ border: 'none' }} />
                <span>{slide.badge}</span>
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: '2.5rem',
                lineHeight: '1.18',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                {slide.title} <br />
                <span className="gradient-text-alt">{slide.highlight}</span> <br />
                <span style={{ fontSize: '1.9rem', opacity: 0.9 }}>{slide.subhead}</span>
              </h1>

              {/* Description */}
              <p style={{
                fontSize: '0.975rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.55',
                maxWidth: '540px',
                margin: 0
              }}>
                {slide.description}
              </p>

              {/* Specialized List Badge (if present) */}
              {slide.specialized && (
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--accent-teal)',
                  backgroundColor: 'rgba(6, 182, 212, 0.08)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  alignSelf: 'flex-start'
                }}>
                  {slide.specialized}
                </div>
              )}

              {/* Small CTA link (if present) */}
              {slide.smallCta && (
                <a href={slide.smallCta.href} style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--accent-teal)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '-4px'
                }}>
                  {slide.smallCta.text}
                </a>
              )}

              {/* Action Buttons */}
              <div className="flex" style={{ gap: '14px', marginTop: '2px' }}>
                <a href={slide.primaryCta.href} className="btn btn-primary" style={{ boxShadow: 'var(--shadow-glow)', padding: '10px 20px' }}>
                  {slide.primaryCta.icon}
                  {slide.primaryCta.text}
                </a>
                <a href={slide.secondaryCta.href} className="btn btn-secondary" style={{ padding: '10px 20px' }}>
                  {slide.secondaryCta.text}
                </a>
              </div>

              {/* Slide Specific Metrics */}
              <div className="grid grid-cols-3" style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-color)',
                gap: '12px'
              }}>
                {slide.stats.map((st, i) => (
                  <div key={i}>
                    <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }} className="gradient-text">{st.value}</h4>
                    <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>{st.label}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Slide Image / Animated SVG Frame */}
            <div className="flex justify-center hero-image-col" style={{ position: 'relative' }}>
              <div 
                className="glass-panel hero-image-panel"
                style={{
                  width: '100%',
                  maxWidth: '540px',
                  height: '460px',
                  borderRadius: 'var(--radius-lg)',
                  padding: slide.rightType === 'svg' ? '16px' : (slide.id === 1 ? '6px' : '0'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                {slide.rightType === 'svg' ? (
                  <>
                    {/* Outer decorative circle with rotate effect */}
                    <div style={{
                      position: 'absolute',
                      inset: '16px',
                      border: '1px dashed rgba(6, 182, 212, 0.25)',
                      borderRadius: '50%',
                      pointerEvents: 'none'
                    }} />

                    {/* Animated Brain and Synapses SVG */}
                    <svg 
                      viewBox="0 0 400 400" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: '90%', height: '90%' }}
                    >
                      <circle cx="200" cy="200" r="160" stroke="rgba(var(--accent-teal-rgb), 0.05)" strokeWidth="1" />
                      <circle cx="200" cy="200" r="120" stroke="rgba(var(--accent-teal-rgb), 0.08)" strokeWidth="1" />
                      <circle cx="200" cy="200" r="80" stroke="rgba(var(--accent-teal-rgb), 0.1)" strokeWidth="1" />

                      <path 
                        d="M190 60 C140 60, 90 90, 80 140 C70 190, 100 230, 90 270 C80 310, 120 340, 160 340 C180 340, 190 320, 190 300 Z" 
                        stroke="rgba(var(--accent-teal-rgb), 0.3)" 
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path 
                        d="M210 60 C260 60, 310 90, 320 140 C330 190, 300 230, 310 270 C320 310, 280 340, 240 340 C220 340, 210 320, 210 300 Z" 
                        stroke="rgba(var(--accent-teal-rgb), 0.3)" 
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path 
                        className="neuro-path"
                        d="M190 300 C150 280, 140 220, 170 180 C200 140, 120 120, 110 160 C100 200, 120 220, 140 240" 
                        stroke="var(--accent-teal)" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />

                      <path 
                        className="neuro-path"
                        d="M210 300 C250 280, 260 220, 230 180 C200 140, 280 120, 290 160 C300 200, 280 220, 260 240" 
                        stroke="var(--accent-blue)" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />

                      <circle cx="215" cy="150" r="10" stroke="#FF007F" strokeWidth="2" strokeDasharray="3,3" className="animate-pulse-slow" />
                      <circle cx="215" cy="150" r="4" fill="#FF007F" />
                    </svg>
                  </>
                ) : (
                  /* High-Res Clinical Image */
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: slide.id === 1 ? 'contain' : 'cover',
                      objectPosition: 'top center',
                      borderRadius: 'var(--radius-lg)'
                    }}
                  />
                )}

                {/* Floating Status Badge */}
                {slide.statusBadge && (
                  <div className="glass-panel hero-status-badge" style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: 'var(--shadow-lg)',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    zIndex: 5
                  }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: `${slide.statusBadge.color}22`,
                      color: slide.statusBadge.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Activity size={14} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontSize: '0.675rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500, margin: 0 }}>{slide.statusBadge.title}</p>
                      <p style={{ fontSize: '0.775rem', color: '#ffffff', fontWeight: 700, margin: 0 }}>{slide.statusBadge.subtext}</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* Carousel Controls & Indicators */}
        <div className="flex justify-between items-center hero-controls" style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-color)'
        }}>
          
          {/* Slide dots & progress indicators */}
          <div className="flex items-center" style={{ gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-teal)' }}>
              0{currentSlide + 1} <span style={{ opacity: 0.5, color: 'var(--text-muted)' }}>/ 0{heroSlides.length}</span>
            </span>

            <div className="flex" style={{ gap: '8px', marginLeft: '12px' }}>
              {heroSlides.map((s, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    title={`Slide ${idx + 1}: ${s.title}`}
                    style={{
                      width: isActive ? '32px' : '8px',
                      height: '8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isActive ? 'var(--accent-teal)' : 'var(--border-color)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      padding: 0
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Manual Left/Right Arrow Navigation */}
          <div className="flex" style={{ gap: '12px' }}>
            <button
              onClick={handlePrev}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-teal)';
                e.currentTarget.style.color = 'var(--accent-teal)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-teal)';
                e.currentTarget.style.color = 'var(--accent-teal)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>

      {/* Styled JSX for slide animation and mobile responsiveness */}
      <style>{`
        .hero-slide-animation {
          animation: heroFadeIn 0.5s ease-out forwards;
        }

        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          #hero {
            padding-top: calc(60px + 10px) !important;
            padding-bottom: 10px !important;
            min-height: auto !important;
          }
          #hero .hero-slide-stage {
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            align-items: center !important;
          }
          #hero .hero-image-col {
            order: 1 !important;
            width: 100% !important;
            margin-bottom: 2px !important;
          }
          #hero .hero-text-col {
            order: 2 !important;
            width: 100% !important;
            gap: 8px !important;
            text-align: center !important;
            align-items: center !important;
          }
          .hero-image-panel {
            max-width: 250px !important;
            height: 180px !important;
          }
          .hero-status-badge {
            padding: 4px 8px !important;
            right: 4px !important;
            bottom: 4px !important;
          }
          .hero-status-badge p {
            font-size: 0.65rem !important;
          }
          .hero-status-badge div:first-child {
            width: 20px !important;
            height: 20px !important;
          }
          #hero h1 {
            font-size: 1.35rem !important;
            line-height: 1.2 !important;
          }
          #hero h1 span:last-child {
            font-size: 1.05rem !important;
          }
          #hero p {
            font-size: 0.8rem !important;
            line-height: 1.35 !important;
            max-width: 100% !important;
          }
          #hero .btn {
            padding: 7px 14px !important;
            font-size: 0.8rem !important;
          }
          #hero .grid-cols-3 {
            margin-top: 6px !important;
            padding-top: 6px !important;
            gap: 6px !important;
          }
          #hero .grid-cols-3 h4 {
            font-size: 1.05rem !important;
          }
          #hero .grid-cols-3 p {
            font-size: 0.7rem !important;
          }
          .hero-controls {
            margin-top: 10px !important;
            padding-top: 8px !important;
            flex-direction: row !important;
            justify-content: space-between !important;
          }
        }
      `}</style>
    </section>
  );
}
