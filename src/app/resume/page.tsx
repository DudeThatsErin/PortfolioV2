import CertificatesSection from '@/components/CertificatesSection';

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
          className="inline-block mx-4 border-2 border-[var(--accent-teal)] text-[var(--accent-teal)] bg-transparent font-mono text-[16px] rounded-[5px] px-5 py-[10px] transition-all hover:bg-[var(--accent-teal)] hover:text-[var(--black)] focus-visible:outline-[3px] focus-visible:outline-[var(--focus-outline)] focus-visible:outline-offset-2"
        >
          <i className="fa-solid fa-download"></i> Download PDF Resume
        </a>

        <a
          href="/assets/ErinSkiddsResume.docx?v=3"
          download
          className="inline-block mx-4 border-2 border-[var(--accent-teal)] text-[var(--accent-teal)] bg-transparent font-mono text-[16px] rounded-[5px] px-5 py-[10px] transition-all hover:bg-[var(--accent-teal)] hover:text-[var(--black)] focus-visible:outline-[3px] focus-visible:outline-[var(--focus-outline)] focus-visible:outline-offset-2"
        >
          <i className="fa-solid fa-file-word"></i> Download Word Resume
        </a>
      </div>

      {/* PDF Preview */}
      <div className="mt-8 [&_iframe]:block [&_iframe]:mx-auto [&_iframe]:w-[1000px] [&_iframe]:h-[600px] [&_iframe]:max-w-full [&_iframe]:shadow-[0_4px_8px_rgba(0,0,0,0.2)] max-[900px]:[&_iframe]:w-full max-[479px]:hidden">
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

      <CertificatesSection />
    </main>
  );
}
