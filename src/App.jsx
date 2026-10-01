import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsINR from './components/WhatIsINR';
import ScanOpinionEstimator from './components/ScanOpinionEstimator';
import ConditionsTreated from './components/ConditionsTreated';
import SymptomsWarning from './components/SymptomsWarning';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import PatientStories from './components/PatientStories';
import Blog from './components/Blog';
import SecondOpinion from './components/SecondOpinion';
import BookingModal from './components/BookingModal';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [view, setView] = useState('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#booking') {
        setIsBookingModalOpen(true);
        return;
      }
      if (hash === '#contact') {
        setIsContactModalOpen(true);
        return;
      }
      if (hash === '#second-opinion' || hash === '#submit-report-form') {
        setView('second-opinion');
        if (hash === '#second-opinion') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (hash === '#submit-report-form') {
          setTimeout(() => {
            const el = document.getElementById('submit-report-form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else if (hash === '#gallery' || hash === '#media') {
        setView('gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#patient-stories' || hash === '#stories') {
        setView('patient-stories');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#blog' || hash.startsWith('#blog-')) {
        setView('blog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenSecondOpinion = () => {
    window.location.hash = '#second-opinion';
    setView('second-opinion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGallery = () => {
    window.location.hash = '#gallery';
    setView('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPatientStories = () => {
    window.location.hash = '#patient-stories';
    setView('patient-stories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBlog = () => {
    window.location.hash = '#blog';
    setView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100%',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Background overlays for visual aesthetics */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '600px',
        background: 'radial-gradient(ellipse at top, rgba(6, 182, 212, 0.08) 0%, rgba(var(--primary-rgb), 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Global shell layout */}
      <Navbar
        onOpenSecondOpinion={handleOpenSecondOpinion}
        onOpenGallery={handleOpenGallery}
        onOpenPatientStories={handleOpenPatientStories}
        onOpenBlog={handleOpenBlog}
        onOpenBookingModal={handleOpenBookingModal}
        onOpenContactModal={handleOpenContactModal}
        onBackHome={handleBackToHome}
        isSecondOpinion={view === 'second-opinion'}
        isGallery={view === 'gallery'}
        isPatientStories={view === 'patient-stories'}
        isBlog={view === 'blog'}
      />

      <main style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        {view === 'second-opinion' ? (
          <SecondOpinion onBack={handleBackToHome} onOpenBookingModal={handleOpenBookingModal} />
        ) : view === 'gallery' ? (
          <Gallery onBack={handleBackToHome} isPage={true} onOpenBookingModal={handleOpenBookingModal} />
        ) : view === 'patient-stories' ? (
          <PatientStories onBack={handleBackToHome} isPage={true} onOpenBookingModal={handleOpenBookingModal} />
        ) : view === 'blog' ? (
          <Blog onBack={handleBackToHome} onOpenBookingModal={handleOpenBookingModal} />
        ) : (
          <>
            <Hero onOpenSecondOpinion={handleOpenSecondOpinion} onOpenBookingModal={handleOpenBookingModal} />
            <WhatIsINR onOpenBookingModal={handleOpenBookingModal} />
            <ScanOpinionEstimator onOpenBookingModal={handleOpenBookingModal} />
            <ConditionsTreated onOpenBookingModal={handleOpenBookingModal} />
            <SymptomsWarning onOpenBookingModal={handleOpenBookingModal} />
            <About onOpenBookingModal={handleOpenBookingModal} />
            <Testimonials />
          </>
        )}
      </main>

      <Footer onOpenBookingModal={handleOpenBookingModal} onOpenSecondOpinion={handleOpenSecondOpinion} onOpenContactModal={handleOpenContactModal} />

      {/* Global Smart Booking Pop-Up Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Global Contact Pop-Up Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}

export default App;
