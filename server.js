import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || process.env.EMAIL_SERVER_PORT || 3001;

// ═══════════════════════════════════════════════════════════════════════════════
//  MONGODB CONNECTION
// ═══════════════════════════════════════════════════════════════════════════════
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// ─── Mongoose Schemas ──────────────────────────────────────────────────────────
// Generic key-value store: one document per data section (siteInfo, heroSlides, etc.)
const CmsDataSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const CmsData = mongoose.model('CmsData', CmsDataSchema);

// ─── Valid data keys ───────────────────────────────────────────────────────────
const VALID_KEYS = [
  'siteInfo',
  'aboutData',
  'heroSlides',
  'treatments',
  'testimonials',
  'patientStories',
  'blogs',
  'customSections',
  'galleryImages',
  'bookings',
  'second_opinions'
];

// ─── MongoDB Helpers ───────────────────────────────────────────────────────────
async function readData(key) {
  try {
    const doc = await CmsData.findOne({ key });
    return doc ? doc.data : null;
  } catch (err) {
    console.error(`❌ MongoDB read error for "${key}":`, err.message);
    return null;
  }
}

async function writeData(key, data) {
  await CmsData.findOneAndUpdate(
    { key },
    { key, data, updatedAt: new Date() },
    { upsert: true, returnDocument: 'after' }
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CLOUDINARY CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary multer storage — images go directly to Cloudinary
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'neruwebsite',           // All images stored in "neruwebsite" folder on Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }]
  }
});

const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15 MB max per image
});

// Cloudinary multer storage for Patient Medical Scans (PDF, Images, Reports up to 30MB)
const scanCloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype && file.mimetype.startsWith('image/');
    const cleanName = (file.originalname || 'scan').replace(/[^a-zA-Z0-9.-]/g, '_');
    return {
      folder: 'neruwebsite/scans',
      resource_type: isImage ? 'image' : 'raw',
      public_id: `${Date.now()}_${cleanName}`
    };
  }
});

const uploadScan = multer({
  storage: scanCloudinaryStorage,
  limits: { fileSize: 30 * 1024 * 1024 } // 30 MB max
});

// ─── Express Setup ─────────────────────────────────────────────────────────────
const app = express();
// Normalize duplicate leading slashes (e.g. //api/data -> /api/data)
app.use((req, res, next) => {
  if (req.url.startsWith('//')) {
    req.url = req.url.replace(/^\/+/, '/');
  }
  next();
});
app.use(cors());
// Support large base64 image payloads (legacy fallback — still kept for compatibility)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ─── Email Dispatcher (Resend HTTP API with Nodemailer fallback) ───────────────
// Uses Gmail SMTP for local fallback, or Resend HTTP REST API on Render free tier (port 443)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  pool: true,
  maxConnections: 3,
  auth: {
    user: (process.env.GMAIL_USER || '').trim(),
    pass: (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '')
  }
});

if (process.env.RESEND_API_KEY) {
  console.log('✅ Email Service: Resend HTTP API ready (Port 443 — Render Free Tier compatible)');
} else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
  transporter.verify((error) => {
    if (error) {
      console.warn('⚠️ Nodemailer SMTP connection failed (normal on Render free tier):', error.message);
    } else {
      console.log('✅ Nodemailer ready — Gmail SMTP connected');
    }
  });
} else {
  console.log('ℹ️  Email Service: Set RESEND_API_KEY in .env to enable email sending');
}

/**
 * Universal Email Sender:
 * 1. If RESEND_API_KEY is configured, sends via Resend HTTP API (Port 443 - never blocked by cloud firewalls).
 * 2. Otherwise falls back to Nodemailer SMTP.
 */
async function dispatchEmail({ from, to, replyTo, subject, text, html }) {
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim();

  if (resendApiKey) {
    const resendFrom = from || process.env.RESEND_FROM_EMAIL || 'Dr. Dewansh Mishra <onboarding@resend.dev>';
    const recipients = Array.isArray(to) ? to : [to];

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: resendFrom,
        to: recipients,
        reply_to: replyTo,
        subject,
        text,
        html
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || data.error || `Resend API HTTP ${response.status}`);
    }
    return { success: true, messageId: data.id, provider: 'Resend HTTP API' };
  }

  // Fallback to Nodemailer
  const info = await transporter.sendMail({ from, to, replyTo, subject, text, html });
  return { success: true, messageId: info.messageId, provider: 'Nodemailer SMTP' };
}

// ═══════════════════════════════════════════════════════════════════════════════
//  IMAGE UPLOAD API (Cloudinary)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── POST /api/upload ──────────────────────────────────────────────────────────
// Admin uploads an image → goes to Cloudinary → returns a permanent public URL
// Frontend usage: POST with multipart/form-data, field name: "image"
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided' });
    }
    const url = req.file.path; // Cloudinary URL returned by multer-storage-cloudinary
    console.log(`🖼️  [${new Date().toLocaleTimeString()}] Image uploaded to Cloudinary: ${url}`);
    res.json({ success: true, url });
  } catch (err) {
    console.error('❌ Cloudinary upload error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── POST /api/upload-scan ───────────────────────────────────────────────────
// Patient uploads a medical scan/report (PDF, JPG, PNG, DOC) -> Cloudinary
// Returns { success: true, url, name, size }
app.post('/api/upload-scan', (req, res) => {
  uploadScan.single('scan')(req, res, (err) => {
    if (err) {
      console.error('❌ Cloudinary scan upload error:', err.message);
      return res.status(500).json({ success: false, error: err.message || 'File upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No scan file received' });
    }
    const url = req.file.path || req.file.secure_url;
    const name = req.file.originalname || 'Medical_Scan';
    const size = req.file.size ? (req.file.size / 1024 / 1024).toFixed(2) + ' MB' : '';
    console.log(`📋 [${new Date().toLocaleTimeString()}] Patient Scan uploaded to Cloudinary: ${name} -> ${url}`);
    res.json({ success: true, url, name, size });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
//  DATA PERSISTENCE API (MongoDB)
//  All admin panel changes are saved here so they reflect on ALL devices/systems
// ═══════════════════════════════════════════════════════════════════════════════

// ─── GET /api/data ─────────────────────────────────────────────────────────────
// Returns all persisted CMS data (read by frontend on page load)
app.get('/api/data', async (req, res) => {
  try {
    const data = {};
    for (const key of VALID_KEYS) {
      const saved = await readData(key);
      if (saved !== null) data[key] = saved;
    }
    res.json({ success: true, data });
  } catch (err) {
    console.error('❌ GET /api/data error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── POST /api/data/:key ───────────────────────────────────────────────────────
// Save/overwrite a single data section (called by admin panel on every change)
app.post('/api/data/:key', async (req, res) => {
  const { key } = req.params;

  if (!VALID_KEYS.includes(key)) {
    return res.status(400).json({ success: false, error: `Invalid data key: "${key}"` });
  }

  if (req.body.data === undefined) {
    return res.status(400).json({ success: false, error: 'Missing "data" field in request body' });
  }

  try {
    await writeData(key, req.body.data);
    console.log(`💾 [${new Date().toLocaleTimeString()}] Saved "${key}" to MongoDB`);
    res.json({ success: true, key });
  } catch (err) {
    console.error(`❌ Failed to save ${key}:`, err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/bookings ─────────────────────────────────────────────────────────
// Returns list of confirmed bookings (date, timeSlot, consultationMode)
app.get('/api/bookings', async (req, res) => {
  try {
    const list = await readData('bookings');
    res.json({ success: true, bookings: Array.isArray(list) ? list : [] });
  } catch (err) {
    console.error('❌ Failed to fetch bookings:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── POST /api/bookings ────────────────────────────────────────────────────────
// Add a confirmed booking to the bookings list in MongoDB
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = req.body;
    if (!newBooking || !newBooking.date || !newBooking.timeSlot) {
      return res.status(400).json({ success: false, error: 'Missing booking date or timeSlot' });
    }
    const existing = (await readData('bookings')) || [];
    const updated = [newBooking, ...existing];
    await writeData('bookings', updated);
    console.log(`📅 [${new Date().toLocaleTimeString()}] Saved booking slot: ${newBooking.date} | ${newBooking.timeSlot} (${newBooking.consultationMode || 'consult'})`);
    res.json({ success: true, count: updated.length });
  } catch (err) {
    console.error('❌ Failed to save booking:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/second-opinions ──────────────────────────────────────────────────
// Returns list of all NeuroReview 2nd opinion submissions from MongoDB
app.get('/api/second-opinions', async (req, res) => {
  try {
    const list = await readData('second_opinions');
    res.json({ success: true, secondOpinions: Array.isArray(list) ? list : [] });
  } catch (err) {
    console.error('❌ Failed to fetch second opinions:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── POST /api/second-opinions ─────────────────────────────────────────────────
// Save a confirmed 2nd opinion submission with scan links to MongoDB
app.post('/api/second-opinions', async (req, res) => {
  try {
    const newSubmission = req.body;
    if (!newSubmission || !newSubmission.fullName) {
      return res.status(400).json({ success: false, error: 'Missing submission details' });
    }
    const record = {
      ...newSubmission,
      status: newSubmission.status || 'Pending Review',
      createdAt: newSubmission.createdAt || new Date().toISOString()
    };
    const existing = (await readData('second_opinions')) || [];
    const updated = [record, ...existing];
    await writeData('second_opinions', updated);
    console.log(`🧠 [${new Date().toLocaleTimeString()}] Saved NeuroReview 2nd Opinion: ${record.fullName} (Ref: ${record.id}) to MongoDB`);
    res.json({ success: true, count: updated.length, secondOpinion: record });
  } catch (err) {
    console.error('❌ Failed to save second opinion:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── PUT /api/second-opinions/:id ──────────────────────────────────────────────
// Update status/doctor notes for a second opinion
app.put('/api/second-opinions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, doctorNotes } = req.body || {};
    const list = (await readData('second_opinions')) || [];
    const updated = list.map(item =>
      item.id === id
        ? {
            ...item,
            status: status !== undefined ? status : item.status,
            doctorNotes: doctorNotes !== undefined ? doctorNotes : item.doctorNotes,
            updatedAt: new Date().toISOString()
          }
        : item
    );
    await writeData('second_opinions', updated);
    res.json({ success: true, secondOpinions: updated });
  } catch (err) {
    console.error('❌ Failed to update second opinion:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── DELETE /api/second-opinions/:id ───────────────────────────────────────────
// Delete a second opinion record
app.delete('/api/second-opinions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const list = (await readData('second_opinions')) || [];
    const updated = list.filter(item => item.id !== id);
    await writeData('second_opinions', updated);
    res.json({ success: true, count: updated.length });
  } catch (err) {
    console.error('❌ Failed to delete second opinion:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── POST /api/admin/login ─────────────────────────────────────────────────────
// Validate admin credentials (credentials controlled via .env)
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const validEmails = [
    'dewanshmishra@gmail.com',
    'admin@gmail.com',
    ...(process.env.ADMIN_EMAIL ? [process.env.ADMIN_EMAIL.toLowerCase()] : [])
  ];
  const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (validEmails.includes(email.toLowerCase().trim()) && password === validPassword) {
    console.log(`🔐 Admin login successful: ${email}`);
    res.json({ success: true });
  } else {
    console.warn(`⚠️  Failed admin login attempt: ${email}`);
    res.status(401).json({ success: false, message: 'Invalid Admin Email or Password' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
//  EMAIL API
// ═══════════════════════════════════════════════════════════════════════════════

// ─── POST /api/send-email ──────────────────────────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  const { subjectLine, patientName, patientPhone, patientEmail, messageBody, bookingDetails, recipientEmail, scanUrls } = req.body || {};

  if (!subjectLine || !patientName || !messageBody) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const senderUser = (process.env.GMAIL_USER || '').trim();
  const neuroReviewEmail = (process.env.NEUROREVIEW_EMAIL || 'neuroradiologyreview@gmail.com').trim();
  const defaultDoctorTarget = (process.env.DOCTOR_EMAIL || senderUser || 'dewanshmishra@gmail.com').trim();

  const isNeuroReview = (subjectLine && (subjectLine.toUpperCase().includes('NEUROREVIEW') || subjectLine.toUpperCase().includes('2ND OPINION') || subjectLine.toUpperCase().includes('SCAN'))) ||
                        (recipientEmail && recipientEmail.toLowerCase().includes('neuroradiologyreview'));

  const doctorTarget = (recipientEmail && recipientEmail.trim()) || (isNeuroReview ? neuroReviewEmail : defaultDoctorTarget);
  const validReplyTo = patientEmail && typeof patientEmail === 'string' && patientEmail.includes('@')
    ? patientEmail.trim()
    : (senderUser || undefined);

  const senderBrandName = isNeuroReview ? 'NeuroReview' : 'Dr. Dewansh Website';
  const doctorFrom = process.env.RESEND_API_KEY
    ? (process.env.RESEND_FROM_EMAIL || `${senderBrandName} <onboarding@resend.dev>`)
    : `"${senderBrandName}" <${senderUser}>`;

  // Format Cloudinary Scan URLs for Doctor Email (HTML + Plain text)
  const scansList = Array.isArray(scanUrls) ? scanUrls.filter(s => s && s.url) : [];
  
  let scansHtml = '';
  if (scansList.length > 0) {
    scansHtml = `
      <div style="margin: 22px 0 16px; padding: 18px 20px; background: #ecfeff; border: 2px solid #0891b2; border-radius: 8px;">
        <div style="margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 16px; color: #0e7490; font-weight: bold;">
            📁 Attached Patient Medical Scans (${scansList.length} File${scansList.length > 1 ? 's' : ''})
          </h3>
          <p style="margin: 4px 0 0; font-size: 13px; color: #334155;">
            Uploaded securely to Cloudinary storage. Click below to view or download:
          </p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          ${scansList.map((s, idx) => `
            <tr>
              <td style="padding: 8px 0; border-top: ${idx > 0 ? '1px dashed #a5f3fc' : 'none'};">
                <div style="margin-bottom: 6px;">
                  <strong style="color: #0f172a; font-size: 14px;">📄 Scan ${idx + 1}: ${s.name || 'Medical Scan'}</strong>
                  ${s.size ? `<span style="color: #64748b; font-size: 12px; margin-left: 6px;">(${s.size})</span>` : ''}
                </div>
                <div>
                  <a href="${s.url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #0891b2; color: #ffffff !important; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; font-size: 13.5px; box-shadow: 0 2px 4px rgba(8, 145, 178, 0.25);">
                    📥 View / Download Patient Scan
                  </a>
                </div>
                <div style="margin-top: 6px; font-size: 11px; color: #64748b; word-break: break-all;">
                  Direct Link: <a href="${s.url}" target="_blank" rel="noopener noreferrer" style="color: #0891b2; text-decoration: underline;">${s.url}</a>
                </div>
              </td>
            </tr>
          `).join('')}
        </table>
      </div>
    `;
  }

  let fullTextMessage = messageBody;
  if (scansList.length > 0) {
    fullTextMessage += '\n\nPATIENT SCANS (DIRECT CLOUD DOWNLOAD LINKS):\n==================================================\n' +
      scansList.map((s, i) => `${i + 1}. ${s.name || 'Scan'} (${s.size || 'N/A'})\n   Download Link: ${s.url}`).join('\n\n') +
      '\n==================================================';
  }

  const mailOptions = {
    from: doctorFrom,
    to: doctorTarget,
    replyTo: validReplyTo,
    subject: subjectLine,
    text: fullTextMessage,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #0891b2, #4f46e5); padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 18px;">${isNeuroReview ? '🧠 NeuroReview™ — 2nd Opinion on Scan' : 'Dr. Dewansh Mishra — Patient Notification'}</h2>
          <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 13px;">${isNeuroReview ? 'Dedicated Neuroradiology Review Desk (neuroradiologyreview@gmail.com)' : 'Brain & Spine Vascular Specialist'}</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="background: #f0fdfa;">
              <td style="padding: 10px 14px; font-weight: bold; color: #0891b2; width: 140px; border-bottom: 1px solid #e2e8f0;">Patient Name</td>
              <td style="padding: 10px 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${patientName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; color: #0891b2; border-bottom: 1px solid #e2e8f0;">Phone</td>
              <td style="padding: 10px 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${patientPhone}</td>
            </tr>
            <tr style="background: #f0fdfa;">
              <td style="padding: 10px 14px; font-weight: bold; color: #0891b2; border-bottom: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 10px 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${patientEmail || 'Not provided'}</td>
            </tr>
            ${isNeuroReview ? `
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; color: #6366f1; border-bottom: 1px solid #e2e8f0;">Service Desk</td>
              <td style="padding: 10px 14px; color: #4338ca; font-weight: bold; border-bottom: 1px solid #e2e8f0;">NeuroReview (${doctorTarget})</td>
            </tr>` : ''}
          </table>

          ${scansHtml}

          <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 6px; border-left: 4px solid #0891b2;">
            <pre style="white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 13px; color: #334155; margin: 0; line-height: 1.6;">${messageBody}</pre>
          </div>
          <p style="margin-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
            ${isNeuroReview ? 'This notification was dispatched to NeuroReview at ' + doctorTarget : "This is an automated notification from Dr. Dewansh Mishra's patient portal."}
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await dispatchEmail(mailOptions);
    console.log(`✅ Email sent successfully to Doctor via ${info.provider}! Message ID: ${info.messageId}`);
    console.log(`   To     : ${doctorTarget}`);
    console.log(`   Subject: ${subjectLine}\n`);

    // ─── Automated Confirmation Email to Patient (if email provided) ─────────────
    if (patientEmail && typeof patientEmail === 'string' && patientEmail.includes('@') && patientEmail.trim().toLowerCase() !== senderUser.toLowerCase()) {
      const patientRecipient = patientEmail.trim();
      const modeLabel = bookingDetails?.consultationMode === 'online'
        ? 'Online Video Consultation (11:00 AM – 07:00 PM)'
        : 'In-Person Consultation (10:00 AM – 05:00 PM)';
      const bookingId = bookingDetails?.bookingId || 'Confirmed';
      const specialization = bookingDetails?.specialization || 'Neuro-Vascular Consultation';
      const dateSlot = bookingDetails?.date && bookingDetails?.timeSlot
        ? `${bookingDetails.date} • ${bookingDetails.timeSlot}`
        : (bookingDetails?.date || 'Confirmed with Clinical Team');
      const paymentInfo = bookingDetails?.paymentId
        ? `Confirmed (${bookingDetails.feePaid || '₹500'}) • Ref: ${bookingDetails.paymentId}`
        : 'Confirmed (₹500)';

      const patientFrom = process.env.RESEND_API_KEY
        ? (process.env.RESEND_FROM_EMAIL || 'Dr. Dewansh Mishra <onboarding@resend.dev>')
        : `"Dr. Dewansh Mishra" <${senderUser}>`;

      const patientMailOptions = {
        from: patientFrom,
        to: patientRecipient,
        subject: `Appointment Confirmed: Dr. Dewansh Mishra (Ref: ${bookingId})`,
        text: `Dear ${patientName},\n\nThank you for scheduling your consultation with Dr. Dewansh Mishra. Your appointment request and consultation fee payment have been successfully confirmed.\n\nAPPOINTMENT SUMMARY:\n- Patient Name   : ${patientName}\n- Phone Number   : ${patientPhone}\n- Consultation   : ${modeLabel}\n- Specialization : ${specialization}\n- Date & Slot    : ${dateSlot}\n- Booking Ref ID : ${bookingId}\n- Payment Status : ${paymentInfo}\n\nNEXT STEPS:\n- Dr. Dewansh Mishra and the clinical team have received your booking details and will contact you directly on your phone (${patientPhone}) shortly.\n- If you have previous MRI, CT, or angiography scans/reports, please keep them ready to share during your consultation.\n\nWarm regards,\nDr. Dewansh Mishra\nBrain & Spine Vascular Specialist\nDM Neuroradiology (SCTIMST), MD, MBBS`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 8px;">
            <div style="background: linear-gradient(135deg, #0891b2, #0e7490); padding: 24px; border-radius: 8px 8px 0 0; text-align: left;">
              <h2 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">Dr. Dewansh Mishra</h2>
              <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 13px;">Brain &amp; Spine Vascular Specialist • DM Neuroradiology (SCTIMST)</p>
            </div>
            <div style="background: white; padding: 26px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; text-align: left;">
              <p style="font-size: 15px; color: #1e293b; margin-top: 0;">Dear <strong>${patientName}</strong>,</p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                Thank you for scheduling your consultation with <strong>Dr. Dewansh Mishra</strong>. Your appointment request and consultation fee payment have been successfully confirmed.
              </p>
              
              <div style="margin: 20px 0; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
                  <tr style="background: #f0fdfa;">
                    <td style="padding: 10px 14px; font-weight: bold; color: #0891b2; width: 140px; border-bottom: 1px solid #e2e8f0;">Patient Name</td>
                    <td style="padding: 10px 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${patientName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 14px; font-weight: bold; color: #0891b2; border-bottom: 1px solid #e2e8f0;">Phone Number</td>
                    <td style="padding: 10px 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${patientPhone}</td>
                  </tr>
                  <tr style="background: #f0fdfa;">
                    <td style="padding: 10px 14px; font-weight: bold; color: #0891b2; border-bottom: 1px solid #e2e8f0;">Consultation Mode</td>
                    <td style="padding: 10px 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${modeLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 14px; font-weight: bold; color: #0891b2; border-bottom: 1px solid #e2e8f0;">Specialization</td>
                    <td style="padding: 10px 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${specialization}</td>
                  </tr>
                  <tr style="background: #f0fdfa;">
                    <td style="padding: 10px 14px; font-weight: bold; color: #0891b2; border-bottom: 1px solid #e2e8f0;">Date &amp; Slot</td>
                    <td style="padding: 10px 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${dateSlot}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 14px; font-weight: bold; color: #0891b2; border-bottom: 1px solid #e2e8f0;">Booking Ref ID</td>
                    <td style="padding: 10px 14px; color: #0891b2; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${bookingId}</td>
                  </tr>
                  <tr style="background: #f0fdfa;">
                    <td style="padding: 10px 14px; font-weight: bold; color: #0891b2;">Payment Status</td>
                    <td style="padding: 10px 14px; color: #10b981; font-weight: 700;">${paymentInfo}</td>
                  </tr>
                </table>
              </div>

              <div style="background: #f8fafc; padding: 14px 16px; border-radius: 6px; border-left: 4px solid #0891b2; margin: 18px 0;">
                <p style="margin: 0 0 6px 0; font-weight: 700; font-size: 13px; color: #1e293b;">📌 Important Next Steps:</p>
                <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #475569; line-height: 1.6;">
                  <li>Dr. Dewansh Mishra and the clinical team have received your booking details and will contact you directly on your phone (<strong>${patientPhone}</strong>) shortly.</li>
                  <li>If you have previous MRI, CT, or angiography scans/reports, please keep them ready to share during your consultation.</li>
                </ul>
              </div>

              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; line-height: 1.5;">
                <p style="margin: 0 0 2px 0;">Warm regards,</p>
                <p style="margin: 0; font-weight: 700; color: #1e293b; font-size: 14px;">Dr. Dewansh Mishra</p>
                <p style="margin: 0; color: #0891b2; font-size: 12px;">Brain &amp; Spine Vascular Specialist</p>
                <p style="margin: 0; font-size: 11.5px; color: #94a3b8;">DM Neuroradiology (SCTIMST), MD, MBBS</p>
              </div>
            </div>
          </div>
        `
      };

      try {
        const patientInfo = await dispatchEmail(patientMailOptions);
        console.log(`✅ Confirmation email sent to patient via ${patientInfo.provider}: ${patientInfo.messageId} | To: ${patientRecipient}\n`);
      } catch (patientErr) {
        console.warn('⚠️ Could not send confirmation to patient email:', patientErr?.message || patientErr);
      }
    }

    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('❌ Email send error:', err?.message || err);
    if (err?.response) console.error('   SMTP Details:', err.response);
    if (err?.code) console.error('   Error Code  :', err.code);
    res.status(500).json({ success: false, error: err?.message || 'Failed to send email' });
  }
});

// ─── GET /api/health ───────────────────────────────────────────────────────────
app.get('/api/health', async (_, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  let savedKeys = [];
  try {
    const docs = await CmsData.find({}, 'key');
    savedKeys = docs.map(d => d.key);
  } catch (_) {}

  const emailProvider = process.env.RESEND_API_KEY
    ? 'Resend HTTP API (Port 443 — Render Free Tier compatible)'
    : (process.env.GMAIL_USER ? 'Nodemailer Gmail SMTP' : 'Not configured');

  res.json({
    status: 'ok',
    server: 'Dr. Dewansh CMS + Email Server',
    port: PORT,
    mongodb: mongoStatus,
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? `connected (${process.env.CLOUDINARY_CLOUD_NAME})` : 'not configured',
    emailService: emailProvider,
    savedKeys
  });
});

// ─── Serve Frontend in Production (if dist/ exists) ───────────────────────────
const distDir = join(__dirname, 'dist');
if (existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ success: false, error: 'API endpoint not found' });
    }
    res.sendFile(join(distDir, 'index.html'));
  });
}

// ─── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  const emailStatus = process.env.RESEND_API_KEY
    ? '✅ Resend HTTP API (Port 443 — Free Tier OK)'
    : (process.env.GMAIL_USER ? '⚠️  Gmail SMTP (May timeout on Render Free Tier)' : '⚠️  Not configured in .env');

  console.log(`\n🚀 CMS + Email Server running on http://localhost:${PORT}`);
  console.log(`   Email Service: ${emailStatus}`);
  console.log(`   Doctor Email : ${process.env.DOCTOR_EMAIL || process.env.GMAIL_USER || 'dewanshmishra@gmail.com'}`);
  console.log(`   MongoDB      : ${process.env.MONGODB_URI ? '✅ URI configured' : '⚠️  Not set in .env'}`);
  console.log(`   Cloudinary   : ${process.env.CLOUDINARY_CLOUD_NAME ? `✅ ${process.env.CLOUDINARY_CLOUD_NAME}` : '⚠️  Not set in .env'}\n`);
});
