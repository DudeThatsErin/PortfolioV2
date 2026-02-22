import { jobs } from '@/data/jobs';

export default function WorkPage() {
  return (
    <main id="work-experience" className="about-content" role="main" aria-labelledby="work-heading">
      <h2 id="work-heading" className="numbered-heading">02. Where I've Worked</h2>

      {jobs.map((job, index) => (
        <section 
          key={job.id} 
          className="section"
          aria-labelledby={`${job.id}-heading`}
        >
          <h3 id={`${job.id}-heading`}>{job.title}</h3>
          <p className="text-[var(--accent-teal)] font-semibold text-[1.1rem] mb-2 block">{job.company}</p>
          <p className="text-[var(--light-slate)] font-mono text-[0.9rem] mb-4 block">
            <time dateTime={job.startDate}>{job.startDate}</time> – <time dateTime={job.endDate}>{job.endDate}</time>
          </p>
          <ul>
            {job.responsibilities.map((responsibility, respIndex) => (
              <li key={respIndex} dangerouslySetInnerHTML={{ __html: responsibility }} />
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
