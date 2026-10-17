import React, { useState } from 'react';
import { Lock, Mail, Key, Eye, EyeOff, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AdminLogin({ isOpen, onClose, onLoginSuccess, isStandalone = false }) {
  const { loginAdmin } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen && !isStandalone) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      if (res.success) {
        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess();
        if (onClose) onClose();
      } else {
        setIsLoading(false);
        setError(res.message || 'Invalid Admin Email or Password');
      }
    }, 500);
  };

  const loginCard = (
    <div
      onClick={(e) => e.stopPropagation()}
      className="glass-panel"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        border: '1.5px solid var(--border-color)',
        padding: '36px 30px',
        textAlign: 'left',
        animation: 'adminModalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      {/* Close Button if modal */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(var(--primary-rgb), 0.06)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          aria-label="Close login"
        >
          <X size={18} />
        </button>
      )}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          backgroundColor: 'rgba(6, 182, 212, 0.12)',
          color: 'var(--accent-teal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 14px',
          border: '1px solid rgba(6, 182, 212, 0.25)'
        }}>
          <Lock size={26} />
        </div>

        <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          Doctor Admin Portal
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', margin: 0 }}>
          Enter your Doctor ID and Password to manage site content
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-md)',
          color: '#ef4444',
          fontSize: '0.85rem',
          marginBottom: '20px',
          fontWeight: 600
        }}>
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Doctor Email / ID Input */}
        <div>
          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '6px' }}>
            Doctor Email / User ID *
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            backgroundColor: 'var(--bg-primary)',
            gap: '10px'
          }}>
            <Mail size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email ID..."
              style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        {/* Password Input with Eye Icon Toggle */}
        <div>
          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '6px' }}>
            Password *
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            backgroundColor: 'var(--bg-primary)',
            gap: '10px'
          }}>
            <Key size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              style={{ border: 'none', background: 'none', outline: 'none', width: '100%', color: 'var(--text-primary)', fontSize: '0.9rem' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '14px',
            marginTop: '8px',
            fontSize: '0.95rem',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          {isLoading ? 'Authenticating...' : 'Log In to Admin Dashboard'}
        </button>

      </form>
    </div>
  );

  if (isStandalone) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#070b14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {loginCard}
      </div>
    );
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 10, 19, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 99999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'adminModalFadeIn 0.25s ease-out forwards'
      }}
    >
      {loginCard}

      <style>{`
        @keyframes adminModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes adminModalScaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
