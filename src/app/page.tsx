import Link from 'next/link';

export default function Home() {
  const technologies = [
    "Languages: TypeScript, JavaScript, C#, Python, C++, ASP.NET",
    "Frontend: React, React Native, Next.js, Vue, Nuxt, Tailwind",
    "Backend: .NET, Node.js, REST APIs",
    "Testing & Validation: Playwright, Zod, Jest, Cypress",
    "Cloud & DevOps: AWS, Azure, Docker, Kubernetes, CI/CD",
    "Databases: MySQL, Postgres, Redis, DynamoDB"
  ];

  return (
    <main className="about-content" role="main" aria-label="Introduction">
      <h1 className="visually-hidden">Erin Skidds - Full-Stack Engineer</h1>
      
      <section aria-labelledby="intro-section">
        <h2 id="intro-section" className="visually-hidden">Introduction</h2>
        <p className="hello">Hello, my name is</p>
        <h2 className="name">Erin Skidds.</h2>
      <p className="iam">I'm a <strong>Full-Stack Engineer</strong> with over 5 years of professional experience in bot/AI engineering and website/application development. I've built everything from bots/AI for large online communities to enterprise web applications and backend tools for companies like Payactiv and others that are used by millions.</p>

        <div style={{ marginTop: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}><strong>Technologies I have worked with:</strong></p>
          <ul className="list" role="list" aria-label="Technologies and programming languages">
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <Link href="/contact" className="contact-link">
            <button className="contact" aria-label="Get in touch with Erin">Get in Touch</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
