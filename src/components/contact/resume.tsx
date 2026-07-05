export default function ResumeSection() {
  return (
    <section className="mt-16 space-y-6">
      <h2 className="text-2xl font-semibold">Resume</h2>

      <p className="text-neutral-300">
        Download my resume to learn more about my experience and qualifications.
      </p>

      <div className="flex gap-6 justify-center">
        <a href="/assets/ErinSkiddsResume.pdf?v=9" download>
          <button className="px-4 py-2 border rounded border-[var(--accent-teal)] text-[var(--accent-teal)]">
            Download PDF
          </button>
        </a>

        <a href="/assets/ErinSkiddsResume.docx?v=9" download>
          <button className="px-4 py-2 border rounded border-[var(--accent-teal)] text-[var(--accent-teal)]">
            Download Word
          </button>
        </a>
      </div>

      <div className="h-[600px] w-full mt-6">
        <iframe
          src="/assets/ErinSkiddsResume.pdf?v=9"
          className="w-full h-full border rounded border-[var(--border-color)]"
          title="Resume Preview"
        />
      </div>
    </section>
  );
}