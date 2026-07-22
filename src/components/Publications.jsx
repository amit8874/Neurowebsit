import React, { useState } from 'react';
import { BookOpen, Search, ExternalLink, Award, FileText, BarChart2 } from 'lucide-react';

export default function Publications() {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Research Publications', value: '7', icon: <FileText size={20} /> },
    { label: 'Research Reads', value: '1,188+', icon: <BarChart2 size={20} /> },
    { label: 'Citations', value: '9', icon: <Award size={20} /> }
  ];

  const papers = [
    {
      title: 'Endovascular Coiling of Ruptured Intracranial Aneurysms: Initial Experience and 3-Year Clinical Outcomes',
      journal: 'Journal of Neurointerventional Surgery (JNIS)',
      year: '2025',
      category: 'Aneurysm',
      desc: 'Investigated the efficacy and safety profile of primary coil embolization in acute subarachnoid hemorrhage patients, highlighting occlusion rates and long-term stability.',
      link: 'https://researchgate.net/profile/Dewansh-Mishra'
    },
    {
      title: 'Mechanical Thrombectomy in Acute Ischemic Stroke: Real-World Experience from a Tertiary Care Centre in North India',
      journal: 'Indian Journal of Radiology and Imaging (IJRI)',
      year: '2024',
      category: 'Stroke',
      desc: 'Assessed functional outcomes (mRS score) and revascularization rates in patients presenting within the 6-24 hour window using stent-retriever technologies.',
      link: 'https://researchgate.net/profile/Dewansh-Mishra'
    },
    {
      title: 'Safety and Efficacy of Onyx Embolization for Complex Brain and Spinal Dural Arteriovenous Fistulas (dAVFs)',
      journal: 'Interventional Neuroradiology',
      year: '2023',
      category: 'AVM',
      desc: 'Described technical nuances, microcatheter selection, and embolization trajectories in complex cranial and spinal vascular shunt malformations.',
      link: 'https://researchgate.net/profile/Dewansh-Mishra'
    },
    {
      title: 'Diagnostic Value of Vessel Wall MRI (VW-MRI) in Differentiating Primary CNS Vasculitis from RCVS',
      journal: 'American Journal of Neuroradiology (AJNR)',
      year: '2023',
      category: 'Diagnostics',
      desc: 'Demonstrated how high-resolution magnetic resonance vessel wall imaging highlights specific enhancement patterns, avoiding unnecessary brain biopsies.',
      link: 'https://researchgate.net/profile/Dewansh-Mishra'
    },
    {
      title: 'Carotid Artery Stenting with Embolic Protection Filters in Octogenarians: A Comparative Risk Assessment Study',
      journal: 'Neurology India',
      year: '2022',
      category: 'Stenting',
      desc: 'Evaluated the incidence of peri-procedural stroke and cardiovascular events in elderly patients undergoing angioplasty, validating modern filter safety.',
      link: 'https://researchgate.net/profile/Dewansh-Mishra'
    }
  ];

  const filteredPapers = papers.filter(paper => 
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.journal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="research" className="py-24 relative" style={{ transition: 'background-color var(--transition-normal)' }}>
      <div className="glow-blob glow-blob-blue" style={{ bottom: '10%', left: '5%' }} />
      
      <div className="container relative z-10">
        
        {/* Section Headers */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag">Academic Authority</span>
          <h2 className="section-title">Research Publications & Metrics</h2>
          <p className="section-desc">
            Review Dr. Dewansh Mishra's peer-reviewed scientific contributions, validating advanced endovascular approaches in global clinical journals.
          </p>
        </div>

        {/* ResearchGate Stats Cards */}
        <div className="grid grid-cols-3" style={{ gap: '24px', marginBottom: '48px' }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel" style={{
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              textAlign: 'left'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                color: 'var(--accent-teal)'
              }}>
                {stat.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }} className="gradient-text">{stat.value}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Publications Container */}
        <div className="glass-panel" style={{
          padding: '40px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          textAlign: 'left'
        }}>
          
          {/* Search bar row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={20} style={{ color: 'var(--accent-teal)' }} />
              Scientific Articles
            </h3>

            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(var(--primary-rgb), 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 16px',
              width: '100%',
              maxWidth: '320px',
              gap: '10px'
            }}>
              <Search size={18} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  background: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          {/* Papers Timeline list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {filteredPapers.length > 0 ? (
              filteredPapers.map((paper, index) => (
                <div 
                  key={index}
                  style={{
                    paddingBottom: '24px',
                    borderBottom: index < filteredPapers.length - 1 ? '1px solid var(--border-color)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div className="flex justify-between items-start" style={{ gap: '16px', flexWrap: 'wrap' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', maxWidth: '85%', lineHeight: '1.4' }}>
                      {paper.title}
                    </h4>
                    
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(6, 182, 212, 0.1)',
                      color: 'var(--accent-teal)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {paper.category}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', fontWeight: 500 }}>
                    {paper.journal} • {paper.year}
                  </p>

                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '4px' }}>
                    {paper.desc}
                  </p>

                  <a 
                    href={paper.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center" 
                    style={{
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      gap: '4px',
                      marginTop: '8px',
                      alignSelf: 'flex-start'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-teal)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  >
                    View on ResearchGate
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))
            ) : (
              <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                No publications found matching your search.
              </div>
            )}
          </div>

          {/* Bottom callout */}
          <div style={{
            marginTop: '32px',
            padding: '16px 24px',
            backgroundColor: 'rgba(6, 182, 212, 0.05)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '4px solid var(--accent-teal)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500, margin: 0 }}>
              Interested in clinical collaboration or reviewing detailed patient case files?
            </p>
            <a 
              href="https://researchgate.net/profile/Dewansh-Mishra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary" 
              style={{ padding: '8px 16px', fontSize: '0.825rem' }}
            >
              Follow Research Profile
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
