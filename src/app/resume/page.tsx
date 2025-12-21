export default function ResumePage() {
  return (
    <main className="about-content" role="main" aria-labelledby="resume-heading">
      <h1 id="resume-heading" className="numbered-heading">
        06. Resume
      </h1>
      
      <p>Download my resume to learn more about my experience and qualifications.</p>
      
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <a
          href="/assets/ErinSkiddsResume.pdf?v=3"
          download
          style={{ margin: '0 1rem' }}
        >
          <button className="contact">
            <i className="fa-solid fa-download"></i> Download PDF Resume
          </button>
        </a>
        
        <a
          href="/assets/ErinSkiddsResume.docx?v=3"
          download
          style={{ margin: '0 1rem' }}
        >
          <button className="contact">
            <i className="fa-solid fa-file-word"></i> Download Word Resume
          </button>
        </a>
      </div>

      {/* PDF Preview */}
      <div className="pdf-preview">
        <iframe
          src="/assets/ErinSkiddsResume.pdf?v=3"
          width="100%"
          height="100%"
          style={{
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius)',
            marginTop: '2rem'
          }}
          title="Erin Skidds Resume Preview"
        >
        </iframe>
      </div>
    </main>
  );
}
