import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft, User, Sparkles, BookOpen, ChevronRight, Stethoscope, Share2, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import drDewanshImg from '../assets/dr.dewan.jpeg';

export default function Blog({ onBack, onOpenBookingModal }) {
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const { blogs: contextBlogs } = useData();

  const blogsData = contextBlogs.map(b => ({
    ...b,
    authorRole: b.authorRole || 'DM, Neurointervention (SCTIMST)',
    content: Array.isArray(b.content) ? b.content : [
      { type: 'paragraph', text: b.summary || '' },
      ...(typeof b.content === 'string' ? [{ type: 'paragraph', text: b.content }] : [])
    ]
  }));

  // Check URL hash for blog deep-linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog-')) {
        const id = parseInt(hash.replace('#blog-', ''), 10);
        if (id) setSelectedBlogId(id);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const activeBlog = blogsData.find((b) => b.id === selectedBlogId);

  const handleSelectBlog = (id) => {
    setSelectedBlogId(id);
    window.location.hash = `#blog-${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedBlogId(null);
    window.location.hash = '#blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      paddingTop: '30px',
      paddingBottom: '60px',
      backgroundColor: 'var(--bg-primary)',
      minHeight: '85vh',
      width: '100%'
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>

        {/* Top Breadcrumb Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px'
        }}>
          <button
            onClick={activeBlog ? handleBackToList : onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-teal)';
              e.currentTarget.style.color = 'var(--accent-teal)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <ArrowLeft size={16} />
            <span>{activeBlog ? 'Back to All Articles' : 'Back to Home'}</span>
          </button>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>Doctor's Blog & Medical Insights</span>
          </div>
        </div>

        {/* ==================== SINGLE BLOG DETAIL VIEW ==================== */}
        {activeBlog ? (
          <article className="animate-fade-in" style={{ maxWidth: '820px', margin: '0 auto' }}>
            {/* Category & Metadata */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                color: 'var(--accent-teal)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                {activeBlog.category}
              </span>

              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} /> {activeBlog.date}
              </span>

              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> {activeBlog.readTime}
              </span>
            </div>

            {/* Article Title (Simple & Elegant, Not Harsh/Bold) */}
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: '1.35',
              marginBottom: '20px',
              letterSpacing: '-0.01em'
            }}>
              {activeBlog.title}
            </h1>

            {/* Author Profile Header Box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px 20px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '32px'
            }}>
              <img
                src={drDewanshImg}
                alt={activeBlog.author}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  border: '2px solid var(--accent-teal)'
                }}
              />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {activeBlog.author}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  {activeBlog.authorRole} • Consultant Neuro-Interventional Surgery
                </p>
              </div>
            </div>

            {/* Article Content Body */}
            <div style={{ fontSize: '1.025rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
              {activeBlog.content.map((block, idx) => {
                if (block.type === 'paragraph') {
                  return (
                    <p key={idx} style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontWeight: 400 }}>
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'heading') {
                  return (
                    <h3 key={idx} style={{
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginTop: '32px',
                      marginBottom: '14px'
                    }}>
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === 'highlight') {
                  return (
                    <div key={idx} style={{
                      margin: '24px 0',
                      padding: '16px 20px',
                      backgroundColor: 'rgba(6, 182, 212, 0.06)',
                      borderLeft: '4px solid var(--accent-teal)',
                      borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      lineHeight: '1.6'
                    }}>
                      {block.text}
                    </div>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={idx} style={{ margin: '16px 0 24px 20px', paddingLeft: 0, listStyle: 'none' }}>
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          marginBottom: '10px',
                          fontSize: '0.975rem',
                          color: 'var(--text-secondary)'
                        }}>
                          <CheckCircle2 size={18} color="var(--accent-teal)" style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>

            {/* Consultation Callout Box */}
            <div style={{
              marginTop: '48px',
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Stethoscope size={32} color="var(--accent-teal)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Have Questions Regarding Your Neuro Care?
              </h3>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 20px', lineHeight: '1.5' }}>
                Schedule a direct medical consultation or second opinion review with <strong>Dr. Dewansh Mishra</strong> for personalized guidance.
              </p>
              <button
                onClick={onOpenBookingModal}
                className="btn-pill btn-blue-box-darktext"
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px 24px',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                Book Consultation With Dr. Dewansh
              </button>
            </div>

            {/* Other Articles Recommendation */}
            <div style={{ marginTop: '56px', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
                More Medical Articles
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {blogsData.filter(b => b.id !== activeBlog.id).map(other => (
                  <div
                    key={other.id}
                    onClick={() => handleSelectBlog(other.id)}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-teal)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-teal)', fontWeight: 600 }}>{other.category}</span>
                    <h4 style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)', margin: '6px 0 4px', lineHeight: '1.4' }}>
                      {other.title}
                    </h4>
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{other.readTime}</span>
                  </div>
                ))}
              </div>
            </div>

          </article>
        ) : (
          /* ==================== BLOG LIST MAIN PAGE ==================== */
          <div>
            {/* Header Header Banner */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(6, 182, 212, 0.08)',
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--accent-teal)',
                marginBottom: '12px'
              }}>
                <BookOpen size={14} />
                <span>DOCTOR'S MEDICAL BLOG & INSIGHTS</span>
              </div>

              <h1 style={{
                fontSize: '2.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '10px',
                letterSpacing: '-0.01em'
              }}>
                Articles & Health Guides
              </h1>

              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                maxWidth: '620px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Educational resources, medical insights, and surgical advancements authored by <strong>Dr. Dewansh Mishra</strong> (DM Neurointervention).
              </p>
            </div>

            {/* Blog Grid (3 Clean Cards) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {blogsData.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => handleSelectBlog(blog.id)}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-teal)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <div>
                    {/* Top Tag & Read Time */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: 'rgba(6, 182, 212, 0.1)',
                        color: 'var(--accent-teal)',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(6, 182, 212, 0.2)'
                      }}>
                        {blog.category}
                      </span>
                      <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                        {blog.readTime}
                      </span>
                    </div>

                    {/* Blog Card Title (Clean, not heavy bold) */}
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: '1.4',
                      marginBottom: '10px'
                    }}>
                      {blog.title}
                    </h3>

                    {/* Summary */}
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      margin: '0 0 20px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {blog.summary}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div style={{
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={drDewanshImg}
                        alt={blog.author}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {blog.author}
                      </span>
                    </div>

                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--accent-teal)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      Read Article <ChevronRight size={14} />
                    </span>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
