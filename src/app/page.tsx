import Link from 'next/link';

export default function Home() {
  return (
    <main className="index-content" role="main" aria-label="Introduction">
      <h1 className="visually-hidden">Erin Skidds - Full-Stack Engineer</h1>
      <p className="hello">Hello, my name is</p>
      <h2 className="name">Erin Skidds.</h2>
      <p className="iam">I'm a <strong>Full-Stack Engineer</strong> who works on both front-end and back-end code. I have a passion for bots/AI and website development.</p>

      <p className="shortabout">I also have over 5 years of professional experience in Full-Stack Development. In Back-End Development I am most skilled in C++/C#, Python, PHP, and JavaScript. In Front-End development I am most skilled in HTML, CSS, JavaScript, and TypeScript. I specialize in building bots/AI, learning how to connect language learning models to those bots, and website development.</p>

      <Link href="/contact" className="contact-link">
        <button className="contact" aria-label="Get in touch with Erin">Get in Touch</button>
      </Link>
    </main>
  );
}
