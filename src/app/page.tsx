import Link from 'next/link';

export default function Home() {
  return (
    <main className="index-content" role="main" aria-label="Introduction">
      <h1 className="visually-hidden">Erin Skidds - Full-Stack Engineer</h1>
      <p className="hello">Hello, my name is</p>
      <h2 className="name">Erin Skidds.</h2>
      <p className="iam">I'm a <strong>Full-Stack Engineer</strong> who works on both front-end and back-end code. I have a passion for bot/ai development.</p>

      <p className="shortabout">I have over 5 years of professional experience in Full-Stack Development. I am most skilled with Back-End Development in Python, PHP, and Back-End JavaScript. I specialize in building bots, learning how to connect language learning models to those bots, and websites.</p>

      <Link href="/contact" className="contact-link">
        <button className="contact" aria-label="Get in touch with Erin">Get in Touch</button>
      </Link>
    </main>
  );
}
