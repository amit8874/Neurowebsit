import React, { useState } from 'react';
import { Award, BookOpen, HeartPulse, GraduationCap, Building2, UserCheck, ShieldCheck } from 'lucide-react';
import drDewanshImg from '../assets/dr-dewansh-mishra.jpg';

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
      className="py-20 relative overflow-hidden"
      style={{
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
          alignItems: 'stretch'
        }}>
          
          {/* Left Column: Detailed Biography Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', justifyContent: 'center' }}>
            
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              lineHeight: '1.75',
              margin: 0
            }}>
              <strong>Dr. Dewansh Mishra</strong> is a highly skilled Interventional Neuroradiologist with an <strong>MBBS</strong> and <strong>MD in Radiodiagnosis</strong>, and a <strong>DM in Neuroradiology</strong> from the prestigious <strong>Sree Chitra Tirunal Institute for Medical Sciences and Technology (SCTIMST), Trivandrum</strong>. With over 6 years of experience in radiology, including specialized training in diagnostic and interventional neuroradiology, he has expertise in the management of stroke, brain aneurysms, vascular malformations (AVMs, dAVFs), spinal vascular disorders, and craniofacial vascular malformations. Dr. Mishra is proficient in advanced endovascular procedures such as mechanical thrombectomy, aneurysm coiling, flow diversion, and embolization therapies including AVM embolization and MMA embolization.
            </p>

            <p style={{
              fontSize: '1.025rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.75',
              margin: 0
            }}>
              His postdoctoral thesis focused on brain dural arteriovenous fistulas and cognitive function analysis, highlighting the neurocognitive implications of these vascular lesions. Dr. Mishra has also contributed significantly to neuroradiological research, including a study on the role of MRA in carotid-cavernous fistulas (CCF), and has identified the central non-enhancement sign in imaging of carotid body tumors, aiding in improved diagnostic accuracy.
            </p>

            <p style={{
              fontSize: '1.025rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.75',
              margin: 0
            }}>
              An executive member of <strong>ISVIR-UP (Indian Society of Vascular and Interventional Radiology – Uttar Pradesh chapter)</strong>, Dr. Mishra actively participates in academic initiatives and training programs. He is dedicated to delivering compassionate, evidence-based, and minimally invasive care aimed at improving neurological health and patient outcomes.
            </p>

            {/* Interactive Tabs Box for Credentials & Highlights */}
            <div className="glass-panel" style={{
              marginTop: '10px',
              padding: '20px 24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                display: 'flex',
                borderBottom: '1px solid var(--border-color)',
                marginBottom: '16px',
                gap: '6px'
              }}>
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
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
                        marginBottom: '-1px'
                      }}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div>
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
            minHeight: '620px'
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              height: '100%',
              minHeight: '620px',
              maxHeight: '750px',
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
                  objectFit: 'contain',
                  objectPosition: 'center top',
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
            gap: 32px !important;
          }
          .about-grid > div:last-child {
            min-height: 480px !important;
          }
        }
        @media (max-width: 640px) {
          #about .section-title {
            font-size: 1.7rem !important;
          }
          .about-grid > div:last-child {
            min-height: 380px !important;
          }
        }
      `}</style>
    </section>
  );
}
