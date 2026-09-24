import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      name: 'Shweta Singh',
      relation: 'Patient\'s Daughter',
      text: 'I don’t have enough words to thank you Dr Dewansh for the care you gave my mom during her brain hemorrhage crisis. Your surgical precision and constant support saved her.',
      stars: 5,
      date: '2 weeks ago'
    },
    {
      name: 'Shubhra Singh',
      relation: 'Patient',
      text: 'He explains the problem as well as solution to the patient very nicely. He is very patient, answers all questions, and makes sure we understand every step of the endovascular treatment.',
      stars: 5,
      date: '1 month ago'
    },
    {
      name: 'Amit Kumar',
      relation: 'Patient\'s Son',
      text: 'Dr. Dewansh performed mechanical thrombectomy on my father when he suffered an acute brain stroke. His prompt intervention and clot removal saved my father from permanent paralysis. Eternal gratitude!',
      stars: 5,
      date: '3 months ago'
    },
    {
      name: 'Pooja Rawat',
      relation: 'Patient',
      text: 'Highly professional neuro-interventionalist doctor. Underwent aneurysm coiling under his care at Apollomedics. The procedure was minimally invasive and I was discharged in just three days.',
      stars: 5,
      date: '4 months ago'
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden" style={{
      backgroundColor: 'var(--bg-secondary)',
      transition: 'background-color var(--transition-normal)',
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <div className="glow-blob glow-blob-teal" style={{ top: '10%', right: '5%' }} />
      
      <div className="container relative z-10">
        
        {/* Section Headers */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Patient Satisfaction</span>
          <h2 className="section-title">Google Map Reviews & Stories</h2>
          <p className="section-desc">
            Read first-hand accounts from patients and families who experienced lifesaving neuro-vascular care under Dr. Dewansh Mishra.
          </p>
        </div>

        {/* Overall Google Badge Card */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '48px',
          flexWrap: 'wrap'
        }}>
          <div className="glass-panel" style={{
            padding: '20px 40px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>5.0</div>
            <div>
              <div style={{ display: 'flex', color: '#fbbf24', gap: '2px', marginBottom: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#fbbf24" style={{ border: 'none' }} />
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500, margin: 0 }}>
                Based on 6+ Google Reviews
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
            <CheckCircle size={18} style={{ color: 'var(--accent-teal)' }} />
            <span>100% Patient Approval & Recommendation Rate</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          
          {/* Main Slide Card */}
          <div className="glass-panel" style={{
            padding: '48px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'left'
          }}>
            {/* Giant background quotation mark */}
            <Quote size={120} style={{
              position: 'absolute',
              top: '-10px',
              left: '10px',
              opacity: 0.05,
              color: 'var(--accent-teal)',
              pointerEvents: 'none'
            }} />

            {/* Star Rating */}
            <div style={{ display: 'flex', color: '#fbbf24', gap: '4px', marginBottom: '16px' }}>
              {[...Array(reviews[activeIndex].stars)].map((_, i) => (
                <Star key={i} size={20} fill="#fbbf24" style={{ border: 'none' }} />
              ))}
            </div>

            {/* Review text */}
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-primary)',
              lineHeight: '1.7',
              fontWeight: 400,
              fontStyle: 'italic',
              marginBottom: '24px',
              position: 'relative',
              zIndex: 1
            }}>
              "{reviews[activeIndex].text}"
            </p>

            {/* User details */}
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {reviews[activeIndex].name}
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                {reviews[activeIndex].relation} • Verified Google Reviewer ({reviews[activeIndex].date})
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex" style={{
            justifyContent: 'center',
            gap: '16px',
            marginTop: '24px'
          }}>
            <button
              onClick={handlePrev}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
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
              aria-label="Previous review"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={handleNext}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
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
              aria-label="Next review"
            >
              <ChevronRight size={22} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
