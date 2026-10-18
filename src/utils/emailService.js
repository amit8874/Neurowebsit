// ─── Email Service (Nodemailer via Express backend) ──────────────────────────
// All emails are sent through server.js (Express + Nodemailer)
// The backend runs on http://localhost:3001 (or VITE_EMAIL_SERVER_URL in .env)
// ─────────────────────────────────────────────────────────────────────────────

import { API_BASE } from './apiConfig';

const EMAIL_API_URL = API_BASE;

/**
 * Send an email directly to the doctor's Gmail via Nodemailer backend.
 * @param {string} subjectLine  - Email subject line
 * @param {string} patientName  - Patient full name
 * @param {string} patientPhone - Patient phone number
 * @param {string} patientEmail - Patient email (or 'N/A')
 * @param {string} messageBody  - Full formatted message body
 */
export async function sendDoctorEmail({
  subjectLine,
  patientName,
  patientPhone,
  patientEmail,
  messageBody,
  bookingDetails
}) {
  try {
    const response = await fetch(`${EMAIL_API_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subjectLine,
        patientName,
        patientPhone,
        patientEmail: patientEmail || 'Not provided',
        messageBody,
        bookingDetails
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Doctor email sent via Nodemailer:', result.messageId);
      return true;
    } else {
      console.warn('⚠️ Nodemailer server error:', result.error);
      return false;
    }
  } catch (err) {
    console.warn('⚠️ Email server unreachable:', err.message);
    return false;
  }
}
