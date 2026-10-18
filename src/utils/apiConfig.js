/**
 * Universal API Base URL Resolution
 * 
 * In production (on Render, custom domains, mobile devices, etc.), using an empty string ''
 * (relative URL) guarantees that all API requests (/api/data, /api/bookings, /api/send-email)
 * hit the exact same server that served the website.
 * This completely eliminates:
 * - Domain spelling errors (e.g. drdewansmishra vs drdewanshmishra)
 * - DNS resolution failures (ENOTFOUND)
 * - CORS errors between www and non-www
 * 
 * During local Vite development (localhost:5173), it falls back to port 3001 where server.js runs.
 */
export const getApiBase = () => {
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocal) {
      return ''; // Relative path in production: /api/...
    }
  }
  return (import.meta.env.VITE_EMAIL_SERVER_URL || 'http://localhost:3001').replace(/\/+$/, '');
};

export const API_BASE = getApiBase();
