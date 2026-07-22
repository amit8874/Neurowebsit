import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Treatments from './components/Treatments';
import Publications from './components/Publications';
import Testimonials from './components/Testimonials';
import Scheduler from './components/Scheduler';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
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
      <Navbar />
      
      <main style={{ flex: 1, zIndex: 1 }}>
        <Hero />
        <About />
        <Gallery />
        <Treatments />
        <Publications />
        <Testimonials />
        <Scheduler />
      </main>

      <Footer />
    </div>
  );
}

export default App;
