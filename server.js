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
  'heroSlides',
  'treatments',
  'testimonials',
  'patientStories',
  'blogs',
  'customSections',
  'galleryImages',
  'bookings'
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
    { upsert: true, new: true }
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

// ─── Nodemailer Transporter ────────────────────────────────────────────────────
// Uses Gmail SMTP with App Password (NOT regular Gmail password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  pool: true,
  maxConnections: 3,
  auth: {
    user: (process.env.GMAIL_USER || '').trim(),
    pass: (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '')
  }
});

transporter.verify((error) => {
  if (error) {
    console.error('❌ Nodemailer connection failed:', error.message);
  } else {
    console.log('✅ Nodemailer ready — Gmail SMTP connected');
  }
});

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
  const { subjectLine, patientName, patientPhone, patientEmail, messageBody, bookingDetails } = req.body || {};

  if (!subjectLine || !patientName || !messageBody) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const senderUser = (process.env.GMAIL_USER || '').trim();
  const doctorTarget = (process.env.DOCTOR_EMAIL || senderUser).trim();
  const validReplyTo = patientEmail && typeof patientEmail === 'string' && patientEmail.includes('@')
    ? patientEmail.trim()
    : senderUser;

  const mailOptions = {
    from: `"Dr. Dewansh Website" <${senderUser}>`,
    to: doctorTarget,
    replyTo: validReplyTo,
    subject: subjectLine,
    text: messageBody,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #0891b2, #0e7490); padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 18px;">Dr. Dewansh Mishra — Patient Notification</h2>
          <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 13px;">Brain &amp; Spine Vascular Specialist</p>
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
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 6px; border-left: 4px solid #0891b2;">
            <pre style="white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 13px; color: #334155; margin: 0; line-height: 1.6;">${messageBody}</pre>
          </div>
          <p style="margin-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
            This is an automated notification from Dr. Dewansh Mishra's patient portal.
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to Doctor! Message ID: ${info.messageId}`);
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

      const patientMailOptions = {
        from: `"Dr. Dewansh Mishra" <${senderUser}>`,
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
        const patientInfo = await transporter.sendMail(patientMailOptions);
        console.log(`✅ Confirmation email sent to patient: ${patientInfo.messageId} | To: ${patientRecipient}\n`);
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

  res.json({
    status: 'ok',
    server: 'Dr. Dewansh CMS + Email Server',
    port: PORT,
    mongodb: mongoStatus,
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? `connected (${process.env.CLOUDINARY_CLOUD_NAME})` : 'not configured',
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
  console.log(`\n🚀 CMS + Email Server running on http://localhost:${PORT}`);
  console.log(`   Gmail User  : ${process.env.GMAIL_USER || '⚠️  Not set in .env'}`);
  console.log(`   Doctor Email: ${process.env.DOCTOR_EMAIL || process.env.GMAIL_USER || '⚠️  Not set in .env'}`);
  console.log(`   MongoDB     : ${process.env.MONGODB_URI ? '✅ URI configured' : '⚠️  Not set in .env'}`);
  console.log(`   Cloudinary  : ${process.env.CLOUDINARY_CLOUD_NAME ? `✅ ${process.env.CLOUDINARY_CLOUD_NAME}` : '⚠️  Not set in .env'}\n`);
});
