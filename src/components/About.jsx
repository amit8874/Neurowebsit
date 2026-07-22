import React, { useState } from 'react';
import { Award, BookOpen, HeartPulse, GraduationCap, Building2 } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('credentials');

  const tabs = [
    { id: 'credentials', label: 'Credentials', icon: <GraduationCap size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Award size={18} /> },
    { id: 'philosophy', label: 'Philosophy', icon: <HeartPulse size={18} /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'credentials':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Medical Qualifications</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(var(--primary-rgb), 0.02)' }}>
                <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-teal)' }}>DM - Neuroimaging & Intervention Neuroradiology</p>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Sree Chitra Tirunal Institute for Medical Sciences and Technology, Thiruvananthapuram, Kerala, India.
                </p>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  A national premier institute for advanced medical research and neurological specializations.
                </p>
              </div>

              <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(var(--primary-rgb), 0.02)' }}>
                <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>MD - Radiodiagnosis</p>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Advanced postgraduate degree specializing in diagnostic imaging, MRI, CT scanning, and angiographic imaging.
                </p>
              </div>

              <div style={{ padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(var(--primary-rgb), 0.02)' }}>
                <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>MBBS (Bachelor of Medicine, Bachelor of Surgery)</p>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Core medical training and clinical rotations establishing a solid foundation in human physiology and surgical practices.
                </p>
              </div>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Clinical Journey & Affiliations</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                  color: 'var(--accent-teal)',
                  flexShrink: 0
                }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>Consultant Interventional Neuroradiologist</p>
                  <p style={{ fontSize: '0.925rem', color: 'var(--accent-teal)', fontWeight: 500, margin: '2px 0 6px' }}>Apollomedics Super Speciality Hospitals, Lucknow</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Active consultant handling high-risk clinical procedures including acute mechanical thrombectomies for strokes, aneurysm coiling, embolization of cerebral AVMs, and stenting.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                  color: 'var(--text-primary)',
                  flexShrink: 0
                }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>Senior Resident & Specialist Fellow</p>
                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', fontWeight: 500, margin: '2px 0 6px' }}>Sree Chitra Tirunal Institute (SCTIMST)</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Conducted over 500+ complex cerebral diagnostic angiograms and assisted in extensive endovascular therapeutics under leading national mentors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'philosophy':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Clinical Philosophy</h3>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              "Neurological and cerebrovascular emergencies demand absolute precision, rapid decision-making, and deep empathy. By employing state-of-the-art endovascular microcatheters, we can navigate inside the blood vessels of the brain to resolve strokes, coiled aneurysms, and bleeding AVMs without open brain surgery. 
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginTop: '10px' }}>
              My mission is to deliver these sophisticated, minimally invasive treatments to patients in Lucknow and Uttar Pradesh, maximizing recovery potential and returning patients to their families with minimal disruption."
            </p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              backgroundColor: 'rgba(6, 182, 212, 0.05)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '4px solid var(--accent-teal)',
              marginTop: '12px'
            }}>
              <p style={{ fontStyle: 'italic', fontWeight: 500, fontSize: '0.925rem', color: 'var(--text-primary)', margin: 0 }}>
                "Precision guided by technology. Healing delivered with compassion." — Dr. Dewansh Mishra
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-24 relative" style={{ transition: 'background-color var(--transition-normal)' }}>
      <div className="container">
        
        {/* Section Headers */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">About The Specialist</span>
          <h2 className="section-title">Dr. Dewansh Mishra</h2>
          <p className="section-desc">
            A pioneering Neuro-Interventional Radiologist dedicated to providing advanced brain and spinal vascular solutions in Lucknow.
          </p>
        </div>

        <div className="grid grid-cols-2" style={{ gap: '64px', alignItems: 'start', marginTop: '32px' }}>
          
          {/* Left Side: Summary and Doctor Portrait Illustration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: '1.3' }}>
              Consultant Consultant at Apollomedics Super Speciality Hospitals
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Dr. Dewansh Mishra is a highly trained Interventional Neuroradiologist with a DM degree from the prestigious Sree Chitra Tirunal Institute. With a comprehensive background in Radiodiagnosis (MBBS, MD) and over 6 years of expertise, he specializes in cutting-edge endovascular techniques.
            </p>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Unlike traditional neurosurgery which requires opening the skull, Dr. Mishra accesses the brain's complex blood vessels through tiny incisions in the groin or wrist. This minimally invasive approach drastically reduces risks and speeds up recovery.
            </p>

            {/* Quick highlights checklist */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)' }} />
                <span>Endovascular Coiling</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)' }} />
                <span>Stroke Mechanical Thrombectomy</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)' }} />
                <span>Spinal AVM Embolization</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)' }} />
                <span>Carotid Artery Stenting</span>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Tabs and Credentials Detail */}
          <div className="glass-panel" style={{
            padding: '32px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            {/* Tab buttons grid */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '28px',
              gap: '8px'
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
                      gap: '8px',
                      padding: '12px 16px',
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 600 : 500,
                      border: 'none',
                      background: 'none',
                      color: isActive ? 'var(--accent-teal)' : 'var(--text-secondary)',
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

            {/* Tab content display */}
            <div style={{ minHeight: '340px' }}>
              {renderTabContent()}
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .grid-cols-2 {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
