import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsINR from './components/WhatIsINR';
import ConditionsTreated from './components/ConditionsTreated';
import SymptomsWarning from './components/SymptomsWarning';
import About from './components/About';
import Gallery from './components/Gallery';
import Scheduler from './components/Scheduler';
import SecondOpinion from './components/SecondOpinion';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [view, setView] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#second-opinion') {
        setView('second-opinion');
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <Navbar onOpenSecondOpinion={handleOpenSecondOpinion} onBackHome={handleBackToHome} isSecondOpinion={view === 'second-opinion'} />
      
      <main style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        {view === 'second-opinion' ? (
          <SecondOpinion onBack={handleBackToHome} />
        ) : (
          <>
            <Hero onOpenSecondOpinion={handleOpenSecondOpinion} />
            <WhatIsINR />
            <ConditionsTreated />
            <SymptomsWarning />
            <About />
            <Gallery />
            <Scheduler />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
