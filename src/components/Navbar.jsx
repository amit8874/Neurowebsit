import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, BrainCircuit } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // Default theme is light

  useEffect(() => {
    // Set default theme on initial render
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Research', href: '#research' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Book Appointment', href: '#booking' },
  ];

  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--navbar-height)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
      }}>
        {/* Brand Logo */}
        <a href="#" className="flex items-center" style={{ gap: '10px', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(6, 182, 212, 0.15)',
            color: 'var(--accent-teal)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <BrainCircuit size={22} className="pulse-node" />
          </div>
          <span className="gradient-text">Dr. Dewansh Mishra</span>
        </a>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-only">
          <div className="flex" style={{ gap: '24px' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '0.925rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  position: 'relative',
                  padding: '8px 0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                transition: 'background-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--primary-rgb), 0.05)'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Quick Contact CTA */}
            <a href="#booking" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>
              Consult Online
            </a>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div style={{ display: 'none', alignItems: 'center', gap: '12px' }} className="mobile-toggle-btn">
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(var(--primary-rgb), 0.05)'
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: 'var(--navbar-height)',
          left: 0,
          right: 0,
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: '1px solid var(--border-color)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 99,
          boxShadow: 'var(--shadow-xl)'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                padding: '8px 0',
                borderBottom: '1px solid rgba(var(--primary-rgb), 0.05)'
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            Consult Online
          </a>
        </div>
      )}

      {/* CSS overrides for desktop/mobile toggle behavior */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
