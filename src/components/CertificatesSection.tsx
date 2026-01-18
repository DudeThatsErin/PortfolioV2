'use client';

import { useEffect, useState } from 'react';

interface Certificate {
  filename: string;
  url: string;
  name: string;
}

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    fetch('/api/certificates')
      .then(res => res.json())
      .then(data => {
        setCertificates(data.certificates || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching certificates:', err);
        setLoading(false);
      });
  }, []);

  const openLightbox = (cert: Certificate) => {
    setSelectedCert(cert);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedCert(null);
    document.body.style.overflow = 'auto';
  };

  const navigateCert = (direction: 'prev' | 'next') => {
    if (!selectedCert) return;
    
    const currentIndex = certificates.findIndex(c => c.filename === selectedCert.filename);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex < 0) newIndex = certificates.length - 1;
    if (newIndex >= certificates.length) newIndex = 0;
    
    setSelectedCert(certificates[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateCert('prev');
      if (e.key === 'ArrowRight') navigateCert('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedCert, certificates]);

  if (loading) {
    return (
      <section className="certificates-section">
        <h2 className="numbered-heading">07. Certificates & Credentials</h2>
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading certificates...</p>
      </section>
    );
  }

  if (certificates.length === 0) {
    return null;
  }

  return (
    <>
      <section className="certificates-section">
        <h2 className="numbered-heading">07. Certificates & Credentials</h2>
        
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div
              key={cert.filename}
              className="certificate-card"
              onClick={() => openLightbox(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(cert);
                }
              }}
              aria-label={`View ${cert.name} certificate`}
            >
              <div className="certificate-image-wrapper">
                <img
                  src={`${cert.url}?v=${Date.now()}`}
                  alt={cert.name}
                  loading="lazy"
                />
                <div className="certificate-overlay">
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                  <span>Click to view</span>
                </div>
              </div>
              <div className="certificate-info">
                <h3>{cert.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {lightboxOpen && selectedCert && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            {certificates.length > 1 && (
              <>
                <button
                  className="lightbox-nav lightbox-prev"
                  onClick={() => navigateCert('prev')}
                  aria-label="Previous certificate"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  className="lightbox-nav lightbox-next"
                  onClick={() => navigateCert('next')}
                  aria-label="Next certificate"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </>
            )}
            
            <div className="lightbox-image-wrapper">
              <img
                src={`${selectedCert.url}?v=${Date.now()}`}
                alt={selectedCert.name}
              />
            </div>
            
            <div className="lightbox-caption">
              <h3>{selectedCert.name}</h3>
              <p className="lightbox-counter">
                {certificates.findIndex(c => c.filename === selectedCert.filename) + 1} / {certificates.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
