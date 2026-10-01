import React, { useState } from 'react';
import { Award, BookOpen, HeartPulse, GraduationCap, Building2, UserCheck, ShieldCheck } from 'lucide-react';
import drDewanshImg from '../assets/dr.dewan.jpeg';

export default function About() {
  const [activeTab, setActiveTab] = useState('credentials');

  const tabs = [
    { id: 'credentials', label: 'Credentials', icon: <GraduationCap size={18} /> },
    { id: 'experience', label: 'Specialization', icon: <Award size={18} /> },
    { id: 'philosophy', label: 'Research & Affiliations', icon: <BookOpen size={18} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'credentials':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            <div style={{ padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-glass)' }}>
              <p style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--accent-teal)', margin: 0 }}>DM - Neuroradiology</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
                Sree Chitra Tirunal Institute for Medical Sciences and Technology (SCTIMST), Trivandrum
              </p>
            </div>
            <div style={{ padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-glass)' }}>
              <p style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>MD - Radiodiagnosis</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
                Advanced postgraduate degree specializing in neuro-imaging & diagnostic radiology
              </p>
            </div>
            <div style={{ padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-glass)' }}>
              <p style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>MBBS</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
                Core medical degree establishing foundational clinical and surgical competence
              </p>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Building2 size={20} color="var(--accent-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.975rem', margin: 0 }}>Consultant Interventional Neuroradiologist</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--accent-teal)', fontWeight: 600, margin: '2px 0 4px' }}>Apollomedics Super Speciality Hospital, Lucknow</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  Specializing in acute mechanical thrombectomy, aneurysm coiling, flow diversion, AVM/MMA embolization, and spinal vascular interventions.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <ShieldCheck size={20} color="var(--accent-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.975rem', margin: 0 }}>6+ Years Specialized Expertise</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '2px 0 0', lineHeight: '1.5' }}>
                  Extensive clinical experience in endovascular stroke care, diagnostic 3D cerebral angiograms, and non-surgical neurovascular treatments.
                </p>
              </div>
            </div>
          </div>
        );
      case 'philosophy':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <UserCheck size={20} color="var(--accent-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.975rem', margin: 0 }}>ISVIR-UP Executive Member</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '2px 0 6px' }}>
                  Executive member of Indian Society of Vascular and Interventional Radiology (UP Chapter).
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <BookOpen size={20} color="var(--accent-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.975rem', margin: 0 }}>Research & Thesis</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '2px 0 0', lineHeight: '1.5' }}>
                  Pioneered thesis on brain dAVF neurocognitive implications, MRA role in CCF, and identified the central non-enhancement sign in carotid body tumors.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{
        paddingTop: '45px',
        paddingBottom: '36px',
        backgroundColor: 'var(--bg-primary)',
        transition: 'background-color var(--transition-normal)',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Background Blobs */}
      <div className="glow-blob glow-blob-teal" style={{ top: '15%', right: '5%', opacity: 0.1 }} />
      <div className="glow-blob glow-blob-blue" style={{ bottom: '10%', left: '5%', opacity: 0.1 }} />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag" style={{ marginBottom: '8px' }}>About The Specialist</span>
          <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '12px' }}>
            About Dr. Dewansh Mishra
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '780px', margin: 0 }}>
            Neurointervention Specialist • Apollomedics Super Speciality Hospital, Lucknow
          </p>
        </div>

        {/* 2-Column Grid: Biography & Big Full-Height Doctor Image */}
        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '40px',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          
          {/* Left Column: Detailed Biography Text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: 'left',
            justifyContent: 'center',
            minWidth: 0,
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}>
            
            <p style={{
              fontSize: '1.025rem',
              color: 'var(--text-primary)',
              lineHeight: '1.7',
              margin: 0
            }}>
              <strong>Dr. Dewansh Mishra</strong> is a Consultant Interventional Neuroradiologist at Apollomedics Super Speciality Hospital, Lucknow. He holds a <strong>DM in Neuroradiology</strong> from the prestigious <strong>SCTIMST, Trivandrum</strong>, alongside MD Radiodiagnosis and MBBS.
            </p>

            <p style={{
              fontSize: '0.975rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              margin: 0
            }}>
              With 6+ years of clinical specialization, he is an expert in keyhole neuro-interventions including mechanical thrombectomy for stroke, aneurysm coiling, flow diversion, AVM/MMA embolization, and spinal vascular care. He is an executive member of ISVIR-UP dedicated to delivering compassionate, evidence-based patient outcomes.
            </p>

            {/* Interactive Tabs Box for Credentials & Highlights */}
            <div className="glass-panel about-glass-box" style={{
              marginTop: '10px',
              padding: '20px 24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              minWidth: 0,
              overflow: 'hidden'
            }}>
              <div className="about-tabs-header" style={{
                display: 'flex',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '16px',
                gap: '6px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}>
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="about-tab-btn"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 700 : 500,
                        border: 'none',
                        background: 'none',
                        color: isActive ? 'var(--accent-teal)' : 'var(--text-muted)',
                        borderBottom: isActive ? '2px solid var(--accent-teal)' : '2px solid transparent',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        marginBottom: '-1px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ minWidth: 0, width: '100%' }}>
                {renderTabContent()}
              </div>
            </div>

          </div>

          {/* Right Column: Big Full Image of Dr. Dewansh Mishra */}
          <div style={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            minHeight: '340px',
            minWidth: 0
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              height: '100%',
              minHeight: '340px',
              maxHeight: '500px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}>
              <img
                src={drDewanshImg}
                alt="Dr. Dewansh Mishra - Neurointervention Specialist"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block'
                }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            width: 100% !important;
          }
          .about-grid > div {
            min-width: 0 !important;
            width: 100% !important;
          }
          .about-grid > div:last-child {
            min-height: 380px !important;
          }
        }
        @media (max-width: 640px) {
          #about {
            padding-top: 36px !important;
            padding-bottom: 36px !important;
            overflow-x: hidden !important;
          }
          #about .section-title {
            font-size: 1.6rem !important;
          }
          .about-grid {
            gap: 20px !important;
            width: 100% !important;
          }
          .about-grid > div {
            min-width: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .about-grid > div:last-child {
            min-height: 320px !important;
            max-height: 420px !important;
            height: 360px !important;
          }
          .about-grid img {
            object-fit: cover !important;
            object-position: center 15% !important;
          }
          .about-tabs-header {
            overflow-x: auto !important;
            white-space: nowrap !important;
            padding-bottom: 4px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            width: 100% !important;
          }
          .about-tabs-header::-webkit-scrollbar {
            display: none;
          }
          .about-tab-btn {
            padding: 6px 10px !important;
            font-size: 0.775rem !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }
          .about-glass-box {
            padding: 14px 12px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  );
}
