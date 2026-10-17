import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, Sparkles, User } from 'lucide-react';
import { useData } from '../context/DataContext';

// Single Review Card — smart layout: 50|50 if image, 100% if no image
function ReviewCard({ rev, animClass }) {
  const hasImage = rev.image && rev.image.trim() !== '';

  return (
    <div
      className={`interactive-card review-slide-card ${animClass}`}
      style={{
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: hasImage ? 'row' : 'column',
        minHeight: '220px',
        position: 'relative',
      }}
    >
      {/* LEFT: Patient Image (only if image exists) */}
      {hasImage && (
        <div
          style={{
            width: '50%',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
            minHeight: '200px',
          }}
        >
          <img
            src={rev.image}
            alt={rev.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {/* Gradient overlay on right edge so text blends nicely */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40px',
            height: '100%',
            background: 'linear-gradient(to right, transparent, var(--bg-primary))',
          }} />
        </div>
      )}

      {/* RIGHT (or full): Review Content */}
      <div
        style={{
          flex: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Background Quote */}
        <Quote
          size={56}
          style={{
            position: 'absolute',
            top: '10px',
            right: '14px',
            opacity: 0.06,
            color: 'var(--accent-teal)',
            pointerEvents: 'none',
          }}
        />

        <div>
          {/* Stars + Treatment Tag */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            <div style={{ display: 'flex', color: '#fbbf24', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  fill={i < (rev.stars || 5) ? '#fbbf24' : 'transparent'}
                  color={i < (rev.stars || 5) ? '#fbbf24' : '#64748b'}
                  style={{ border: 'none' }}
                />
              ))}
            </div>
            {rev.treatment && (
              <span style={{
                fontSize: '0.725rem',
                fontWeight: 700,
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                color: 'var(--accent-teal)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              }}>
                {rev.treatment}
              </span>
            )}
          </div>

          {/* Review Text */}
          <p style={{
            fontSize: '0.925rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.65',
            fontStyle: 'italic',
            margin: 0,
            fontWeight: 400,
          }}>
            "{rev.text}"
          </p>
        </div>

        {/* Author Details */}
        <div style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          {/* Show avatar initials circle only when NO image */}
          {!hasImage && (
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '13px',
              fontWeight: '800',
              color: '#fff',
            }}>
              {rev.name ? rev.name.charAt(0).toUpperCase() : <User size={14} />}
            </div>
          )}
          <div>
            <h4 style={{
              fontSize: '0.975rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0,
            }}>
              {rev.name}
            </h4>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              {rev.relation} • Verified Review ({rev.date})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { testimonials: contextReviews } = useData();
  const reviewsData = contextReviews || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (reviewsData.length > 0 && currentIndex >= reviewsData.length) {
      setCurrentIndex(0);
    }
  }, [reviewsData.length, currentIndex]);

  // Auto-play
  useEffect(() => {
    if (isPaused || reviewsData.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused, reviewsData.length]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 35) handleNext();
    else if (distance < -35) handlePrev();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const total = reviewsData.length;
  const avgRatingScore = total > 0
    ? (reviewsData.reduce((acc, curr) => acc + Number(curr.stars || 5), 0) / total).toFixed(1)
    : '5.0';
  const roundedRating = Math.round(Number(avgRatingScore));

  // Desktop: show up to 2 cards side by side (reviews are longer now)
  const visibleDesktopReviews = total > 0 ? [
    reviewsData[currentIndex % total],
    reviewsData[(currentIndex + 1) % total],
  ] : [];

  // Mobile: 1 card
  const activeMobileReview = total > 0 ? reviewsData[currentIndex % total] : null;

  return (
    <section
      id="reviews"
      className="relative overflow-hidden"
      style={{
        paddingTop: '45px',
        paddingBottom: '45px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambience */}
      <div className="glow-blob glow-blob-teal" style={{ top: '15%', right: '5%', opacity: 0.12 }} />
      <div className="glow-blob glow-blob-blue" style={{ bottom: '10%', left: '5%', opacity: 0.1 }} />

      <div className="container relative z-10" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 16px', boxSizing: 'border-box' }}>

        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '28px' }}>
          <div className="flex items-center" style={{
            gap: '8px',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            fontSize: '0.825rem',
            fontWeight: 700,
            color: 'var(--accent-teal)',
            marginBottom: '10px',
          }}>
            <Sparkles size={14} fill="var(--accent-teal)" />
            <span>PATIENT TESTIMONIALS</span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.3rem', marginBottom: '10px' }}>
            Patient Reviews &amp; Healing Stories
          </h2>

          <p style={{
            fontSize: '1.025rem',
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            lineHeight: '1.6',
            margin: 0,
          }}>
            Read verified experiences and feedback from patients and families treated by <strong>Dr. Dewansh Mishra</strong>.
          </p>
        </div>

        {/* Rating Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div className="glass-panel" style={{
            padding: '10px 24px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-glass)',
          }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{avgRatingScore}</span>
            <div style={{ display: 'flex', color: '#fbbf24', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < roundedRating ? '#fbbf24' : 'transparent'}
                  color={i < roundedRating ? '#fbbf24' : '#64748b'}
                  style={{ border: 'none' }}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              ({total} Verified {total === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            <CheckCircle size={16} color="var(--accent-teal)" />
            <span>Verified Patient Feedback</span>
          </div>
        </div>

        {/* Slider Stage */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}
        >

          {/* ===== DESKTOP: 2 cards side-by-side ===== */}
          <div className="desktop-reviews-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            width: '100%',
            boxSizing: 'border-box',
          }}>
            {visibleDesktopReviews.map((rev, idx) =>
              rev && (
                <ReviewCard
                  key={`desktop-${rev.id}-${idx}-${currentIndex}`}
                  rev={rev}
                  animClass="review-slide-card"
                />
              )
            )}
          </div>

          {/* ===== MOBILE: 1 card ===== */}
          {activeMobileReview && (
            <div className="mobile-review-single" style={{ display: 'none', width: '100%', boxSizing: 'border-box' }}>
              <ReviewCard
                key={`mobile-${activeMobileReview.id}-${currentIndex}`}
                rev={activeMobileReview}
                animClass="review-slide-card"
              />
            </div>
          )}
        </div>

        {/* Controls & Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
          <button
            onClick={handlePrev}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '38px', height: '38px', borderRadius: '50%',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)', cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-teal)'; e.currentTarget.style.color = 'var(--accent-teal)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>

          <div style={{ display: 'flex', gap: '6px' }}>
            {reviewsData.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: isActive ? '24px' : '8px',
                    height: '8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isActive ? 'var(--accent-teal)' : 'var(--border-color)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '38px', height: '38px', borderRadius: '50%',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)', cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-teal)'; e.currentTarget.style.color = 'var(--accent-teal)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            aria-label="Next review"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>

      <style>{`
        @keyframes reviewFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .review-slide-card {
          animation: reviewFadeIn 0.45s ease-out forwards;
        }
        @media (max-width: 768px) {
          .desktop-reviews-grid { display: none !important; }
          .mobile-review-single { display: block !important; }
          #reviews .section-title { font-size: 1.6rem !important; }
          .review-slide-card { flex-direction: column !important; }
          .review-slide-card > div:first-child {
            width: 100% !important;
            height: 200px !important;
          }
        }
      `}</style>
    </section>
  );
}
