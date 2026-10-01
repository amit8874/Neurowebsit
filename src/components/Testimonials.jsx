import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, Sparkles } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    name: 'Shweta Singh',
    relation: "Patient's Daughter",
    treatment: 'Brain Hemorrhage & Aneurysm',
    text: 'I don’t have enough words to thank Dr Dewansh for the care he gave my mom during her brain hemorrhage crisis. His surgical precision and constant support saved her life.',
    stars: 5,
    date: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Shubhra Singh',
    relation: 'Patient',
    treatment: 'DSA & Vascular Evaluation',
    text: 'He explains the problem as well as solution to the patient very nicely. He is very patient, answers all questions, and makes sure we understand every step of endovascular treatment.',
    stars: 5,
    date: '1 month ago'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    relation: "Patient's Son",
    treatment: 'Acute Stroke Thrombectomy',
    text: 'Dr. Dewansh performed mechanical thrombectomy on my father when he suffered an acute brain stroke. His prompt intervention and clot removal saved my father from permanent paralysis!',
    stars: 5,
    date: '3 months ago'
  },
  {
    id: 4,
    name: 'Pooja Rawat',
    relation: 'Patient',
    treatment: 'Keyhole Aneurysm Coiling',
    text: 'Highly professional neuro-interventionalist doctor. Underwent aneurysm coiling under his care. The procedure was minimally invasive and I was discharged in just three days.',
    stars: 5,
    date: '4 months ago'
  },
  {
    id: 5,
    name: 'Rajesh Sharma',
    relation: "Patient's Brother",
    treatment: 'Brain AVM Liquid Embolization',
    text: 'When my brother was diagnosed with a complex brain AVM, we were terrified. Dr. Dewansh performed liquid embolization smoothly without open surgery. An absolute lifesaver.',
    stars: 5,
    date: '5 months ago'
  },
  {
    id: 6,
    name: 'Sunita Verma',
    relation: 'Patient',
    treatment: 'Venous Sinus Stenting & IIH',
    text: 'I suffered from pulsating whooshing noise in my ear and severe headaches. Dr. Dewansh accurately diagnosed venous sinus stenosis and treated it. I am completely symptom free now!',
    stars: 5,
    date: '6 months ago'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play loop slider (advances every 3.2 seconds continuously from right to left)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 35) handleNext();
    else if (distance < -35) handlePrev();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const total = reviewsData.length;

  // 3 cards for Desktop view loop
  const visibleDesktopReviews = [
    reviewsData[currentIndex % total],
    reviewsData[(currentIndex + 1) % total],
    reviewsData[(currentIndex + 2) % total]
  ];

  // 1 card for Mobile view loop
  const activeMobileReview = reviewsData[currentIndex % total];

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
        boxSizing: 'border-box'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambience Blobs */}
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
            marginBottom: '10px'
          }}>
            <Sparkles size={14} fill="var(--accent-teal)" />
            <span>PATIENT TESTIMONIALS</span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.3rem', marginBottom: '10px' }}>
            Patient Reviews & Healing Stories
          </h2>

          <p style={{
            fontSize: '1.025rem',
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            lineHeight: '1.6',
            margin: 0
          }}>
            Read verified experiences and feedback from patients and families treated by <strong>Dr. Dewansh Mishra</strong>.
          </p>
        </div>

        {/* 5-Star Rating Summary Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '28px',
          flexWrap: 'wrap'
        }}>
          <div className="glass-panel" style={{
            padding: '10px 24px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-glass)'
          }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>5.0</span>
            <div style={{ display: 'flex', color: '#fbbf24', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#fbbf24" style={{ border: 'none' }} />
              ))}
            </div>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              (100% Patient Rating)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            <CheckCircle size={16} color="var(--accent-teal)" />
            <span>Verified Patient Feedback</span>
          </div>
        </div>

        {/* Stage Container */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}
        >

          {/* ================= DESKTOP VIEW (3 Cards Side-by-Side in Loop) ================= */}
          <div className="desktop-reviews-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {visibleDesktopReviews.map((rev, idx) => (
              <div
                key={`desktop-${rev.id}-${idx}-${currentIndex}`}
                className="interactive-card review-slide-card"
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  position: 'relative',
                  minHeight: '230px',
                  animation: 'reviewFadeIn 0.45s ease-out forwards'
                }}
              >
                {/* Background Quote Icon */}
                <Quote size={60} style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  opacity: 0.06,
                  color: 'var(--accent-teal)',
                  pointerEvents: 'none'
                }} />

                <div>
                  {/* Star Rating & Treatment Tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', color: '#fbbf24', gap: '2px' }}>
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} size={15} fill="#fbbf24" style={{ border: 'none' }} />
                      ))}
                    </div>

                    <span style={{
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(6, 182, 212, 0.1)',
                      color: 'var(--accent-teal)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(6, 182, 212, 0.2)'
                    }}>
                      {rev.treatment}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                    margin: 0,
                    fontWeight: 400
                  }}>
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Details */}
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.975rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {rev.name}
                  </h4>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                    {rev.relation} • Verified Review ({rev.date})
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* ================= MOBILE VIEW (1 Centered Card Auto-Loop) ================= */}
          <div className="mobile-review-single" style={{ display: 'none', width: '100%', boxSizing: 'border-box' }}>
            <div
              key={`mobile-${activeMobileReview.id}-${currentIndex}`}
              className="interactive-card review-slide-card"
              style={{
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                padding: '20px 20px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left',
                position: 'relative',
                minHeight: '210px',
                margin: '0 auto',
                animation: 'reviewSlideRightToLeft 0.45s ease-out forwards'
              }}
            >
              <Quote size={50} style={{
                position: 'absolute',
                top: '12px',
                right: '14px',
                opacity: 0.06,
                color: 'var(--accent-teal)',
                pointerEvents: 'none'
              }} />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ display: 'flex', color: '#fbbf24', gap: '2px' }}>
                    {[...Array(activeMobileReview.stars)].map((_, i) => (
                      <Star key={i} size={15} fill="#fbbf24" style={{ border: 'none' }} />
                    ))}
                  </div>

                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    color: 'var(--accent-teal)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(6, 182, 212, 0.2)'
                  }}>
                    {activeMobileReview.treatment}
                  </span>
                </div>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.55',
                  fontStyle: 'italic',
                  margin: 0,
                  fontWeight: 400
                }}>
                  "{activeMobileReview.text}"
                </p>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {activeMobileReview.name}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                  {activeMobileReview.relation} • Verified ({activeMobileReview.date})
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Controls & Slide Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginTop: '24px'
        }}>
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
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
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots Indicator */}
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
                    padding: 0
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
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
        @keyframes reviewSlideRightToLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .desktop-reviews-grid {
            display: none !important;
          }
          .mobile-review-single {
            display: block !important;
          }
          #reviews .section-title {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}
