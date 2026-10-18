import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  User, 
  Stethoscope, 
  Star, 
  BookOpen, 
  FileText, 
  Layers, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Check, 
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Eye,
  Upload,
  Camera
} from 'lucide-react';

export default function AdminPanel({ onClose }) {
  const {
    siteInfo,
    heroSlides,
    treatments,
    testimonials,
    patientStories,
    blogs,
    customSections,
    galleryImages,
    logoutAdmin,
    updateSiteInfo,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    addTreatment,
    updateTreatment,
    deleteTreatment,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addPatientStory,
    updatePatientStory,
    deletePatientStory,
    addBlog,
    updateBlog,
    deleteBlog,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
    addGalleryImage,
    deleteGalleryImage,
    uploadImage
  } = useData();

  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState('');

  // Upload image to Cloudinary via backend, with local preview fallback
  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    try {
      if (uploadImage) {
        setNotification('⏳ Uploading image to Cloudinary...');
        const cloudinaryUrl = await uploadImage(file);
        callback(cloudinaryUrl);
        setNotification('✅ Image uploaded to Cloudinary successfully!');
        setTimeout(() => setNotification(''), 3500);
        return;
      }
    } catch (err) {
      console.warn('Cloudinary upload error, using local fallback:', err.message);
      setNotification('⚠️ Cloudinary upload issue, used local preview');
      setTimeout(() => setNotification(''), 3500);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Local state for forms
  const [infoForm, setInfoForm] = useState({ ...siteInfo });

  // Banners state
  const [newBanner, setNewBanner] = useState({ title: '', imageUrl: '' });

  // Treatments modal/form
  const [isAddingTreatment, setIsAddingTreatment] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [treatmentForm, setTreatmentForm] = useState({ title: '', category: '', description: '', features: '' });

  // Stories modal/form
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [storyForm, setStoryForm] = useState({ title: '', subtitle: '', category: '', categoryTag: '', summary: '', image: '', timeframe: '', outcome: '' });

  // Reviews modal/form
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({ name: '', relation: '', treatment: '', text: '', stars: 5, date: 'Just now', image: '' });

  // Blog form
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({ title: '', category: '', summary: '', readTime: '5 min read', author: siteInfo.doctorName, date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });

  // Custom Section form
  const [isAddingCustomSec, setIsAddingCustomSec] = useState(false);
  const [editingCustomSec, setEditingCustomSec] = useState(null);
  const [customSecForm, setCustomSecForm] = useState({ title: '', subtitle: '', content: '', badge: 'ANNOUNCEMENT', bgColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)', buttonText: 'Learn More', buttonLink: '#', isActive: true });

  // Gallery Photo form
  const [isAddingGalleryPhoto, setIsAddingGalleryPhoto] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: '', url: '' });

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // Handlers
  const handleSaveSiteInfo = (e) => {
    e.preventDefault();
    updateSiteInfo(infoForm);
    notify('Doctor & Hospital profile details updated successfully!');
  };

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!newBanner.imageUrl) return alert('Please provide an image URL');
    addHeroSlide(newBanner);
    setNewBanner({ title: '', imageUrl: '' });
    notify('Hero Banner slide added!');
  };

  const handleSaveTreatment = (e) => {
    e.preventDefault();
    const featArray = typeof treatmentForm.features === 'string'
      ? treatmentForm.features.split(',').map(f => f.trim()).filter(Boolean)
      : treatmentForm.features;

    const payload = { ...treatmentForm, features: featArray };

    if (editingTreatment) {
      updateTreatment(editingTreatment.id, payload);
      notify('Treatment updated!');
    } else {
      addTreatment(payload);
      notify('New treatment added!');
    }
    setIsAddingTreatment(false);
    setEditingTreatment(null);
    setTreatmentForm({ title: '', category: '', description: '', features: '' });
  };

  const handleSaveStory = (e) => {
    e.preventDefault();
    if (editingStory) {
      updatePatientStory(editingStory.id, storyForm);
      notify('Patient case story updated!');
    } else {
      addPatientStory(storyForm);
      notify('New patient story added!');
    }
    setIsAddingStory(false);
    setEditingStory(null);
    setStoryForm({ title: '', subtitle: '', category: '', categoryTag: '', summary: '', image: '', timeframe: '', outcome: '' });
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (editingReview) {
      updateTestimonial(editingReview.id, reviewForm);
      notify('Patient review updated!');
    } else {
      addTestimonial(reviewForm);
      notify('New patient review added!');
    }
    setIsAddingReview(false);
    setEditingReview(null);
    setReviewForm({ name: '', relation: '', treatment: '', text: '', stars: 5, date: 'Just now' });
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (editingBlog) {
      updateBlog(editingBlog.id, blogForm);
      notify('Blog article updated!');
    } else {
      addBlog(blogForm);
      notify('New blog article published!');
    }
    setIsAddingBlog(false);
    setEditingBlog(null);
    setBlogForm({ title: '', category: '', summary: '', readTime: '5 min read', author: siteInfo.doctorName, date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
  };

  const handleSaveCustomSec = (e) => {
    e.preventDefault();
    if (editingCustomSec) {
      updateCustomSection(editingCustomSec.id, customSecForm);
      notify('Custom banner section updated!');
    } else {
      addCustomSection(customSecForm);
      notify('New custom banner section added!');
    }
    setIsAddingCustomSec(false);
    setEditingCustomSec(null);
    setCustomSecForm({ title: '', subtitle: '', content: '', badge: 'ANNOUNCEMENT', bgColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)', buttonText: 'Learn More', buttonLink: '#', isActive: true });
  };

  const handleAddGalleryPhoto = (e) => {
    e.preventDefault();
    if (!galleryForm.url) return alert('Please upload an image file or paste an image URL');
    addGalleryImage(galleryForm);
    notify('Photo added to Clinical Gallery!');
    setIsAddingGalleryPhoto(false);
    setGalleryForm({ title: '', url: '' });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99999,
      backgroundColor: '#070b14',
      color: '#f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100000,
          background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '600',
          animation: 'fadeIn 0.3s ease'
        }}>
          <Check size={20} />
          {notification}
        </div>
      )}

      {/* Admin Header Navbar */}
      <header style={{
        backgroundColor: '#0f172a',
        borderBottom: '1px solid #1e293b',
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
          }}>
            DM
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Dr. Dewansh Mishra CMS
              <span style={{ fontSize: '11px', background: '#0284c7', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>Admin Portal</span>
            </h2>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Apollomedics Super Speciality Hospital, Lucknow</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              border: '1px solid #334155',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Eye size={16} /> View Live Website
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Admin Sidebar & Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{
          width: '260px',
          backgroundColor: '#0b1120',
          borderRight: '1px solid #1e293b',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'profile', label: 'Doctor & Hospital Info', icon: User },
            { id: 'banners', label: 'Hero Banners', icon: ImageIcon },
            { id: 'treatments', label: 'Treatments & Care', icon: Stethoscope },
            { id: 'stories', label: 'Patient Stories', icon: BookOpen },
            { id: 'reviews', label: 'Patient Reviews', icon: Star },
            { id: 'blogs', label: 'Blogs & Articles', icon: FileText },
            { id: 'gallery', label: 'Photo Gallery', icon: Camera },
            { id: 'custom', label: 'Custom Sections', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderLeft: isActive ? '3px solid #06b6d4' : '3px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Content Body */}
        <main style={{
          flex: 1,
          padding: '28px',
          overflowY: 'auto',
          backgroundColor: '#070b14'
        }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#f8fafc' }}>
                  Welcome Back, {siteInfo.doctorName}
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
                  Manage and customize all contents, banners, treatments, patient stories, and blog posts of your official website.
                </p>
              </div>

              {/* Stat Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                {[
                  { title: 'Hero Banners', count: heroSlides.length, icon: ImageIcon, color: '#38bdf8' },
                  { title: 'Treatments Listed', count: treatments.length, icon: Stethoscope, color: '#34d399' },
                  { title: 'Patient Case Stories', count: patientStories.length, icon: BookOpen, color: '#f43f5e' },
                  { title: 'Patient Reviews', count: testimonials.length, icon: Star, color: '#fbbf24' },
                  { title: 'Blogs & Articles', count: blogs.length, icon: FileText, color: '#a855f7' },
                  { title: 'Clinical Photo Gallery', count: galleryImages.length, icon: Camera, color: '#ec4899' },
                  { title: 'Custom Sections', count: customSections.length, icon: Layers, color: '#06b6d4' }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} style={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: '14px',
                      padding: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>{stat.title}</p>
                        <h2 style={{ margin: '6px 0 0 0', fontSize: '28px', fontWeight: '800', color: '#f8fafc' }}>{stat.count}</h2>
                      </div>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: `${stat.color}15`,
                        color: stat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={24} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions Panel */}
              <div style={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', margin: '0 0 16px 0' }}>
                  Quick Website Controls
                </h3>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setActiveTab('profile')}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#0284c7',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <User size={16} /> Edit Doctor Profile & Consultation Hours
                  </button>

                  <button
                    onClick={() => setActiveTab('banners')}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#1e293b',
                      color: '#38bdf8',
                      border: '1px solid #334155',
                      borderRadius: '10px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <ImageIcon size={16} /> Add Hero Banner Image
                  </button>

                  <button
                    onClick={() => setActiveTab('custom')}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#1e293b',
                      color: '#34d399',
                      border: '1px solid #334155',
                      borderRadius: '10px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Layers size={16} /> Add Custom Banner Announcement
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCTOR & HOSPITAL PROFILE */}
          {activeTab === 'profile' && (
            <div style={{ maxWidth: '800px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#f8fafc' }}>
                  Doctor Credentials & Hospital Contact Settings
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                  Update your display name, titles, qualification tags, hospital address, consultation hours, and fee details across the entire website.
                </p>
              </div>

              <form onSubmit={handleSaveSiteInfo} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '14px',
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '15px', color: '#38bdf8', margin: '0 0 12px 0', fontWeight: '700' }}>Doctor Profile Info</h3>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Doctor Full Name</label>
                    <input
                      type="text"
                      value={infoForm.doctorName}
                      onChange={(e) => setInfoForm({ ...infoForm, doctorName: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Sub-title / Designation</label>
                    <input
                      type="text"
                      value={infoForm.doctorTitle}
                      onChange={(e) => setInfoForm({ ...infoForm, doctorTitle: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Qualifications</label>
                    <input
                      type="text"
                      value={infoForm.doctorQual}
                      onChange={(e) => setInfoForm({ ...infoForm, doctorQual: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Experience Tag</label>
                    <input
                      type="text"
                      value={infoForm.experienceYears}
                      onChange={(e) => setInfoForm({ ...infoForm, experienceYears: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Government Institution Affiliation Tag</label>
                    <input
                      type="text"
                      value={infoForm.doctorAffiliation}
                      onChange={(e) => setInfoForm({ ...infoForm, doctorAffiliation: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Doctor Profile Photo (Upload from Device or Paste URL)</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <label style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        backgroundColor: '#0284c7',
                        color: '#fff',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}>
                        <Upload size={16} /> Choose Photo File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setInfoForm({ ...infoForm, doctorPhoto: dataUrl }))}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>or</span>
                      <input
                        type="text"
                        placeholder="Paste image web URL..."
                        value={infoForm.doctorPhoto || ''}
                        onChange={(e) => setInfoForm({ ...infoForm, doctorPhoto: e.target.value })}
                        style={{ flex: 1, padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                    </div>
                    {infoForm.doctorPhoto && (
                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={infoForm.doctorPhoto} alt="Doctor Preview" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #06b6d4' }} />
                        <span style={{ fontSize: '11px', color: '#34d399', fontWeight: '600' }}>✓ Profile photo loaded</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hospital Info */}
                <div style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '14px',
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '15px', color: '#38bdf8', margin: '0 0 12px 0', fontWeight: '700' }}>Hospital & Contact Details</h3>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Hospital Name</label>
                    <input
                      type="text"
                      value={infoForm.hospitalName}
                      onChange={(e) => setInfoForm({ ...infoForm, hospitalName: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>City</label>
                    <input
                      type="text"
                      value={infoForm.city}
                      onChange={(e) => setInfoForm({ ...infoForm, city: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Full Hospital Address</label>
                    <textarea
                      rows={2}
                      value={infoForm.hospitalAddress}
                      onChange={(e) => setInfoForm({ ...infoForm, hospitalAddress: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>OPD Contact Phone</label>
                    <input
                      type="text"
                      value={infoForm.phone}
                      onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>24x7 Stroke Helpline</label>
                    <input
                      type="text"
                      value={infoForm.emergencyPhone}
                      onChange={(e) => setInfoForm({ ...infoForm, emergencyPhone: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Doctor Email</label>
                    <input
                      type="email"
                      value={infoForm.email}
                      onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Consultation Fee (₹)</label>
                    <input
                      type="number"
                      value={infoForm.consultationFee}
                      onChange={(e) => setInfoForm({ ...infoForm, consultationFee: Number(e.target.value) })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Consultation Hours (Mon - Sat)</label>
                    <input
                      type="text"
                      value={infoForm.hoursMonSat}
                      onChange={(e) => setInfoForm({ ...infoForm, hoursMonSat: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '14px 28px',
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)'
                  }}
                >
                  <Save size={18} /> Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: HERO BANNERS */}
          {activeTab === 'banners' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#f8fafc' }}>
                  Manage Hero Slider Banners
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                  Add, update, or remove top carousel banner images shown on your website home section.
                </p>
              </div>

              {/* Add Banner Form */}
              <form onSubmit={handleAddBanner} style={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <h3 style={{ fontSize: '15px', color: '#38bdf8', margin: 0, fontWeight: '700' }}>Add New Hero Slider Banner</h3>

                {/* Banner Size Requirement Info Box */}
                <div style={{
                  backgroundColor: 'rgba(234, 179, 8, 0.08)',
                  border: '1px solid rgba(234, 179, 8, 0.35)',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '20px', lineHeight: 1 }}>📐</span>
                  <div>
                    <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: '700', color: '#fbbf24' }}>
                      Recommended Banner Image Size
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#cbd5e1', lineHeight: '1.7' }}>
                      <strong style={{ color: '#fde68a' }}>Dimensions:</strong> 1920 × 800 pixels &nbsp;|&nbsp;
                      <strong style={{ color: '#fde68a' }}>Aspect Ratio:</strong> 16:9 or 2.4:1 &nbsp;|&nbsp;
                      <strong style={{ color: '#fde68a' }}>Max File Size:</strong> 2 MB<br />
                      <strong style={{ color: '#fde68a' }}>Format:</strong> JPG or WebP (preferred for fast loading) &nbsp;|&nbsp;
                      <strong style={{ color: '#fde68a' }}>Min Width:</strong> 1280px<br />
                      <span style={{ color: '#94a3b8' }}>
                        ⚠️ Images smaller than recommended will appear stretched or blurry on large screens.
                        Keep important content (text/faces) centred to avoid edge cropping on mobile.
                      </span>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Banner Title / Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Special Clinical Facility Banner"
                      value={newBanner.title}
                      onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Banner Image (Upload File from Device or Paste URL)</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <label style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        backgroundColor: '#0284c7',
                        color: '#fff',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}>
                        <Upload size={16} /> Choose Image File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setNewBanner({ ...newBanner, imageUrl: dataUrl }))}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>or</span>
                      <input
                        type="text"
                        placeholder="Paste image web URL..."
                        value={newBanner.imageUrl}
                        onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
                        style={{ flex: 1, padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {newBanner.imageUrl && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#1e293b', padding: '10px 16px', borderRadius: '8px' }}>
                    <img src={newBanner.imageUrl} alt="Banner Preview" style={{ width: '100px', height: '55px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #06b6d4' }} />
                    <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '600' }}>✓ Banner image preview ready</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#06b6d4',
                      color: '#070b14',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={16} /> Add Banner Slide
                  </button>
                </div>
              </form>

              {/* Banners Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {heroSlides.map((slide, idx) => (
                  <div key={slide.id} style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ height: '160px', overflow: 'hidden', position: 'relative', background: '#000' }}>
                      <img
                        src={slide.imageUrl}
                        alt={slide.title || `Banner ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(0,0,0,0.7)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        Slide #{idx + 1}
                      </div>
                    </div>

                    <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700' }}>{slide.title || `Banner Slide ${idx + 1}`}</h4>
                        <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b', wordBreak: 'break-all' }}>
                          {slide.imageUrl.slice(0, 35)}...
                        </p>
                      </div>

                      {heroSlides.length > 1 && (
                        <button
                          onClick={() => deleteHeroSlide(slide.id)}
                          style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            color: '#f87171',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                          title="Delete Banner"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TREATMENTS */}
          {activeTab === 'treatments' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#f8fafc' }}>
                    Neurovascular Treatments & Services
                  </h1>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                    Manage procedures, descriptions, and highlights displayed in the conditions treated section.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingTreatment(true);
                    setEditingTreatment(null);
                    setTreatmentForm({ title: '', category: '', description: '', features: '' });
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} /> Add New Treatment
                </button>
              </div>

              {/* Inline Form / Modal for Adding/Editing */}
              {(isAddingTreatment || editingTreatment) && (
                <form onSubmit={handleSaveTreatment} style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #06b6d4',
                  borderRadius: '14px',
                  padding: '24px',
                  marginBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#38bdf8', margin: 0 }}>
                      {editingTreatment ? 'Edit Treatment' : 'Add New Treatment'}
                    </h3>
                    <button type="button" onClick={() => { setIsAddingTreatment(false); setEditingTreatment(null); setTreatmentForm({ title: '', category: '', description: '', features: '' }); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Treatment Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Mechanical Thrombectomy in Brain Stroke"
                        value={treatmentForm.title}
                        onChange={(e) => setTreatmentForm({ ...treatmentForm, title: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Category Badge</label>
                      <input
                        type="text"
                        placeholder="e.g. Emergency Stroke"
                        value={treatmentForm.category}
                        onChange={(e) => setTreatmentForm({ ...treatmentForm, category: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Detailed Description</label>
                    <textarea
                      rows={3}
                      placeholder="Brief medical explanation of the procedure..."
                      value={treatmentForm.description}
                      onChange={(e) => setTreatmentForm({ ...treatmentForm, description: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Key Highlights (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. 24x7 Cath Lab, Minimally Invasive, Fast Recovery"
                      value={Array.isArray(treatmentForm.features) ? treatmentForm.features.join(', ') : treatmentForm.features}
                      onChange={(e) => setTreatmentForm({ ...treatmentForm, features: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => { setIsAddingTreatment(false); setEditingTreatment(null); setTreatmentForm({ title: '', category: '', description: '', features: '' }); }}
                      style={{ padding: '10px 18px', backgroundColor: '#1e293b', color: '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '10px 20px', backgroundColor: '#06b6d4', color: '#070b14', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Save Treatment
                    </button>
                  </div>
                </form>
              )}

              {/* Treatments List */}
              <div style={{ display: 'grid', gap: '16px' }}>
                {treatments.map((trt) => (
                  <div key={trt.id} style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', fontSize: '11px', padding: '3px 10px', borderRadius: '12px', fontWeight: '700' }}>
                          {trt.category}
                        </span>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#f8fafc' }}>{trt.title}</h3>
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 12px 0' }}>{trt.description}</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {trt.features && trt.features.map((feat, idx) => (
                          <span key={idx} style={{ background: '#1e293b', color: '#cbd5e1', fontSize: '11px', padding: '2px 8px', borderRadius: '4px' }}>
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setIsAddingTreatment(false);
                          setEditingTreatment(trt);
                          setTreatmentForm({ title: trt.title, category: trt.category, description: trt.description, features: Array.isArray(trt.features) ? trt.features.join(', ') : trt.features });
                        }}
                        style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteTreatment(trt.id)}
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PATIENT CASE STORIES */}
          {activeTab === 'stories' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#f8fafc' }}>
                    Patient Case Stories & Miracle Recoveries
                  </h1>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                    Highlight real neuro-interventional clinical cases and successful surgical outcomes.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingStory(true);
                    setEditingStory(null);
                    setStoryForm({ title: '', subtitle: '', category: '', categoryTag: '', summary: '', image: '', timeframe: '', outcome: '' });
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} /> Add Case Story
                </button>
              </div>

              {/* Form */}
              {(isAddingStory || editingStory) && (
                <form onSubmit={handleSaveStory} style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #06b6d4',
                  borderRadius: '14px',
                  padding: '24px',
                  marginBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#38bdf8', margin: 0 }}>
                      {editingStory ? 'Edit Patient Story' : 'Add New Patient Case Story'}
                    </h3>
                    <button type="button" onClick={() => { setIsAddingStory(false); setEditingStory(null); setStoryForm({ title: '', subtitle: '', category: '', categoryTag: '', summary: '', image: '', timeframe: '', outcome: '' }); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Headline Title</label>
                      <input
                        type="text"
                        value={storyForm.title}
                        onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Brain Stroke"
                        value={storyForm.category}
                        onChange={(e) => setStoryForm({ ...storyForm, category: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Procedure Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. Emergency Thrombectomy"
                        value={storyForm.categoryTag}
                        onChange={(e) => setStoryForm({ ...storyForm, categoryTag: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Case Summary</label>
                    <textarea
                      rows={3}
                      value={storyForm.summary}
                      onChange={(e) => setStoryForm({ ...storyForm, summary: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Case Image (Upload File from Device or Paste URL)</label>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 14px',
                          backgroundColor: '#0284c7',
                          color: '#fff',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}>
                          <Upload size={14} /> Upload File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => setStoryForm({ ...storyForm, image: dataUrl }))}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="Or paste URL..."
                          value={storyForm.image}
                          onChange={(e) => setStoryForm({ ...storyForm, image: e.target.value })}
                          style={{ flex: 1, padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                          required
                        />
                      </div>
                      {storyForm.image && (
                        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={storyForm.image} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #06b6d4' }} />
                          <span style={{ fontSize: '11px', color: '#34d399', fontWeight: '600' }}>✓ Image ready</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Timeframe</label>
                      <input
                        type="text"
                        placeholder="e.g. 18 Hours Post-Stroke"
                        value={storyForm.timeframe}
                        onChange={(e) => setStoryForm({ ...storyForm, timeframe: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Outcome Result</label>
                      <input
                        type="text"
                        placeholder="e.g. Full Recovery"
                        value={storyForm.outcome}
                        onChange={(e) => setStoryForm({ ...storyForm, outcome: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => { setIsAddingStory(false); setEditingStory(null); setStoryForm({ title: '', subtitle: '', category: '', categoryTag: '', summary: '', image: '', timeframe: '', outcome: '' }); }}
                      style={{ padding: '10px 18px', backgroundColor: '#1e293b', color: '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '10px 20px', backgroundColor: '#06b6d4', color: '#070b14', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Save Case Story
                    </button>
                  </div>
                </form>
              )}

              {/* Stories list */}
              <div style={{ display: 'grid', gap: '16px' }}>
                {patientStories.map((story) => (
                  <div key={story.id} style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px'
                  }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      {story.image && (
                        <img src={story.image} alt={story.title} style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }} />
                      )}
                      <div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ background: '#0284c7', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '10px' }}>{story.category}</span>
                          <span style={{ color: '#94a3b8', fontSize: '12px' }}>{story.timeframe}</span>
                        </div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#f8fafc' }}>{story.title}</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{story.summary.slice(0, 100)}...</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setIsAddingStory(false);
                          setEditingStory(story);
                          setStoryForm({ ...story });
                        }}
                        style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deletePatientStory(story.id)}
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS */}
          {activeTab === 'reviews' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#f8fafc' }}>
                    Patient Reviews & Testimonials
                  </h1>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                    Add and edit patient testimonials and star ratings.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingReview(true);
                    setEditingReview(null);
                    setReviewForm({ name: '', relation: '', treatment: '', text: '', stars: 5, date: 'Just now', image: '' });
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} /> Add New Review
                </button>
              </div>

              {/* Form */}
              {(isAddingReview || editingReview) && (
                <form onSubmit={handleSaveReview} style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #06b6d4',
                  borderRadius: '14px',
                  padding: '24px',
                  marginBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#38bdf8', margin: 0 }}>
                      {editingReview ? 'Edit Patient Review' : 'Add New Patient Review'}
                    </h3>
                    <button type="button" onClick={() => { setIsAddingReview(false); setEditingReview(null); setReviewForm({ name: '', relation: '', treatment: '', text: '', stars: 5, date: 'Just now', image: '' }); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Patient Name</label>
                      <input
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Relation / Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. Patient's Daughter"
                        value={reviewForm.relation}
                        onChange={(e) => setReviewForm({ ...reviewForm, relation: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Treatment Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Brain Aneurysm Coiling"
                        value={reviewForm.treatment}
                        onChange={(e) => setReviewForm({ ...reviewForm, treatment: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Star Rating (1 to 5)</label>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', backgroundColor: '#1e293b', border: '1px solid #334155', padding: '6px 10px', borderRadius: '8px', height: '42px', boxSizing: 'border-box' }}>
                        {[1, 2, 3, 4, 5].map((starNum) => (
                          <button
                            key={starNum}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, stars: starNum })}
                            style={{
                              background: 'none',
                              border: 'none',
                              fontSize: '18px',
                              color: starNum <= (reviewForm.stars || 5) ? '#fbbf24' : '#475569',
                              cursor: 'pointer',
                              padding: '0 2px'
                            }}
                            title={`${starNum} Stars`}
                          >
                            ★
                          </button>
                        ))}
                        <span style={{ fontSize: '12px', color: '#fbbf24', fontWeight: '700', marginLeft: 'auto' }}>
                          {reviewForm.stars || 5}★
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Review Feedback Text</label>
                    <textarea
                      rows={3}
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  {/* Patient Photo Upload */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                      Patient Photo <span style={{ color: '#64748b', fontWeight: 400 }}>(Optional — if uploaded, card will show 50% photo | 50% review)</span>
                    </label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <label style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        backgroundColor: '#0284c7',
                        color: '#fff',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}>
                        <Upload size={15} /> Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (dataUrl) => setReviewForm({ ...reviewForm, image: dataUrl }))}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>or</span>
                      <input
                        type="text"
                        placeholder="Paste patient image URL..."
                        value={reviewForm.image || ''}
                        onChange={(e) => setReviewForm({ ...reviewForm, image: e.target.value })}
                        style={{ flex: 1, padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                      {reviewForm.image && (
                        <button
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, image: '' })}
                          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: '8px', padding: '10px 12px', cursor: 'pointer' }}
                          title="Remove photo"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                    {reviewForm.image && (
                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px', background: '#1e293b', padding: '10px 14px', borderRadius: '8px' }}>
                        <img
                          src={reviewForm.image}
                          alt="Patient preview"
                          style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '2px solid #06b6d4' }}
                        />
                        <div>
                          <p style={{ margin: 0, fontSize: '12px', color: '#34d399', fontWeight: '700' }}>✓ Photo loaded — card will show 50/50 split on website</p>
                          <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8' }}>Left half: patient photo &nbsp;|&nbsp; Right half: review text</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => { setIsAddingReview(false); setEditingReview(null); setReviewForm({ name: '', relation: '', treatment: '', text: '', stars: 5, date: 'Just now', image: '' }); }}
                      style={{ padding: '10px 18px', backgroundColor: '#1e293b', color: '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '10px 20px', backgroundColor: '#06b6d4', color: '#070b14', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Save Review
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div style={{ display: 'grid', gap: '16px' }}>
                {testimonials.map((rev) => (
                  <div key={rev.id} style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      {rev.image ? (
                        <img src={rev.image} alt={rev.name} style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #06b6d4', flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>
                          {rev.name ? rev.name.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <h4 style={{ margin: 0, fontSize: '15px', color: '#f8fafc' }}>{rev.name}</h4>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>({rev.relation})</span>
                          <div style={{ color: '#fbbf24', fontSize: '13px' }}>{"★".repeat(rev.stars || 5)}</div>
                          {rev.image && <span style={{ fontSize: '10px', background: 'rgba(6,182,212,0.15)', color: '#06b6d4', padding: '2px 7px', borderRadius: '10px', fontWeight: '700' }}>📷 Photo</span>}
                        </div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#e2e8f0' }}>"{rev.text.slice(0, 90)}{rev.text.length > 90 ? '...' : ''}"</p>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Treatment: {rev.treatment}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => { setIsAddingReview(false); setEditingReview(rev); setReviewForm({ ...rev }); }}
                        style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteTestimonial(rev.id)}
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BLOGS */}
          {activeTab === 'blogs' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#f8fafc' }}>
                    Medical Articles & Patient Blogs
                  </h1>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                    Publish educational health posts, stroke awareness articles, and neurovascular insights.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingBlog(true);
                    setEditingBlog(null);
                    setBlogForm({ title: '', category: '', summary: '', readTime: '5 min read', author: siteInfo.doctorName, date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) });
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} /> Create New Blog
                </button>
              </div>

              {/* Form */}
              {(isAddingBlog || editingBlog) && (
                <form onSubmit={handleSaveBlog} style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #06b6d4',
                  borderRadius: '14px',
                  padding: '24px',
                  marginBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#38bdf8', margin: 0 }}>
                      {editingBlog ? 'Edit Blog Article' : 'Publish New Blog Article'}
                    </h3>
                    <button type="button" onClick={() => { setIsAddingBlog(false); setEditingBlog(null); setBlogForm({ title: '', category: '', summary: '', readTime: '5 min read', author: siteInfo.doctorName, date: '' }); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Article Title</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Brain Aneurysm"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Article Summary / Abstract</label>
                    <textarea
                      rows={3}
                      value={blogForm.summary}
                      onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => { setIsAddingBlog(false); setEditingBlog(null); setBlogForm({ title: '', category: '', summary: '', readTime: '5 min read', author: siteInfo.doctorName, date: '' }); }}
                      style={{ padding: '10px 18px', backgroundColor: '#1e293b', color: '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '10px 20px', backgroundColor: '#06b6d4', color: '#070b14', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Publish Article
                    </button>
                  </div>
                </form>
              )}

              {/* Blog List */}
              <div style={{ display: 'grid', gap: '16px' }}>
                {blogs.map((b) => (
                  <div key={b.id} style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>
                          {b.category}
                        </span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{b.date} • {b.readTime}</span>
                      </div>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#f8fafc' }}>{b.title}</h3>
                      <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{b.summary}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => { setIsAddingBlog(false); setEditingBlog(b); setBlogForm({ ...b }); }}
                        style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteBlog(b.id)}
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: DYNAMIC CUSTOM SECTIONS */}
          {activeTab === 'custom' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#f8fafc' }}>
                    Dynamic Custom Website Banners & Announcements
                  </h1>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                    Create custom sections, clinic announcements, OPD updates, or special health banners anywhere on your website.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingCustomSec(true);
                    setEditingCustomSec(null);
                    setCustomSecForm({ title: '', subtitle: '', content: '', badge: 'ANNOUNCEMENT', bgColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)', buttonText: 'Learn More', buttonLink: '#', isActive: true });
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} /> Create Custom Section
                </button>
              </div>

              {/* Form */}
              {(isAddingCustomSec || editingCustomSec) && (
                <form onSubmit={handleSaveCustomSec} style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #06b6d4',
                  borderRadius: '14px',
                  padding: '24px',
                  marginBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#38bdf8', margin: 0 }}>
                      {editingCustomSec ? 'Edit Custom Section' : 'Create New Custom Section Banner'}
                    </h3>
                    <button type="button" onClick={() => { setIsAddingCustomSec(false); setEditingCustomSec(null); setCustomSecForm({ title: '', subtitle: '', content: '', badge: 'ANNOUNCEMENT', bgColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)', buttonText: 'Learn More', buttonLink: '#', isActive: true }); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Section Main Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Special Neuro-Vascular Outpatient Clinic"
                        value={customSecForm.title}
                        onChange={(e) => setCustomSecForm({ ...customSecForm, title: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Badge Header</label>
                      <input
                        type="text"
                        placeholder="e.g. OPD ANNOUNCEMENT"
                        value={customSecForm.badge}
                        onChange={(e) => setCustomSecForm({ ...customSecForm, badge: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Sub-heading</label>
                    <input
                      type="text"
                      placeholder="e.g. Comprehensive Care at Apollomedics Hospital, Lucknow"
                      value={customSecForm.subtitle}
                      onChange={(e) => setCustomSecForm({ ...customSecForm, subtitle: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Main Content / Text Details</label>
                    <textarea
                      rows={3}
                      value={customSecForm.content}
                      onChange={(e) => setCustomSecForm({ ...customSecForm, content: e.target.value })}
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Button Text</label>
                      <input
                        type="text"
                        placeholder="e.g. Book OPD Appointment"
                        value={customSecForm.buttonText}
                        onChange={(e) => setCustomSecForm({ ...customSecForm, buttonText: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Button Target Link (#booking or URL)</label>
                      <input
                        type="text"
                        placeholder="e.g. #booking"
                        value={customSecForm.buttonLink}
                        onChange={(e) => setCustomSecForm({ ...customSecForm, buttonLink: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => { setIsAddingCustomSec(false); setEditingCustomSec(null); setCustomSecForm({ title: '', subtitle: '', content: '', badge: 'ANNOUNCEMENT', bgColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)', buttonText: 'Learn More', buttonLink: '#', isActive: true }); }}
                      style={{ padding: '10px 18px', backgroundColor: '#1e293b', color: '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '10px 20px', backgroundColor: '#06b6d4', color: '#070b14', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Save Custom Section
                    </button>
                  </div>
                </form>
              )}

              {/* Custom Sections List */}
              <div style={{ display: 'grid', gap: '16px' }}>
                {customSections.map((sec) => (
                  <div key={sec.id} style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ backgroundColor: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>
                          {sec.badge || 'CUSTOM SECTION'}
                        </span>
                        <span style={{ fontSize: '12px', color: sec.isActive !== false ? '#34d399' : '#f87171' }}>
                          ● {sec.isActive !== false ? 'Active Live' : 'Hidden'}
                        </span>
                      </div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#f8fafc' }}>{sec.title}</h3>
                      <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{sec.content}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => { setIsAddingCustomSec(false); setEditingCustomSec(sec); setCustomSecForm({ ...sec }); }}
                        style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteCustomSection(sec.id)}
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: PHOTO GALLERY */}
          {activeTab === 'gallery' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 6px 0', color: '#f8fafc' }}>
                    Clinical Media & Photo Gallery
                  </h1>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                    Upload clinical photographs, cath lab procedure images, and diagnostic scans displayed on your website gallery.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingGalleryPhoto(true);
                    setGalleryForm({ title: '', url: '' });
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0284c7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={16} /> Add Gallery Photo
                </button>
              </div>

              {/* Form */}
              {isAddingGalleryPhoto && (
                <form onSubmit={handleAddGalleryPhoto} style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #06b6d4',
                  borderRadius: '14px',
                  padding: '24px',
                  marginBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#38bdf8', margin: 0 }}>
                      Add New Photo to Gallery
                    </h3>
                    <button type="button" onClick={() => { setIsAddingGalleryPhoto(false); setGalleryForm({ title: '', url: '' }); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Photo Title / Caption</label>
                      <input
                        type="text"
                        placeholder="e.g. Endovascular Cath Lab Suite"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Photo Image (Upload File from Device or Paste URL)</label>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          backgroundColor: '#0284c7',
                          color: '#fff',
                          borderRadius: '8px',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}>
                          <Upload size={16} /> Choose Photo File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => setGalleryForm({ ...galleryForm, url: dataUrl }))}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <span style={{ color: '#64748b', fontSize: '12px' }}>or</span>
                        <input
                          type="text"
                          placeholder="Paste image web URL..."
                          value={galleryForm.url}
                          onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
                          style={{ flex: 1, padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {galleryForm.url && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#1e293b', padding: '10px 16px', borderRadius: '8px' }}>
                      <img src={galleryForm.url} alt="Preview" style={{ width: '80px', height: '60px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #06b6d4' }} />
                      <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '600' }}>✓ Photo ready to publish</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => { setIsAddingGalleryPhoto(false); setGalleryForm({ title: '', url: '' }); }}
                      style={{ padding: '10px 18px', backgroundColor: '#1e293b', color: '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '10px 20px', backgroundColor: '#06b6d4', color: '#070b14', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Save Gallery Photo
                    </button>
                  </div>
                </form>
              )}

              {/* Photos Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '16px'
              }}>
                {galleryImages.map((imgItem, idx) => (
                  <div key={imgItem.id || idx} style={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ height: '140px', overflow: 'hidden', position: 'relative', background: '#000' }}>
                      <img src={imgItem.url} alt={imgItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'rgba(0,0,0,0.7)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        #{idx + 1}
                      </div>
                    </div>

                    <div style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {imgItem.title || `Photo #${idx + 1}`}
                      </span>

                      <button
                        onClick={() => deleteGalleryImage(imgItem.id)}
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.15)',
                          color: '#f87171',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          padding: '6px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                        title="Delete Photo"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
