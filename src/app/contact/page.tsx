'use client';

import Heading from '@/components/contact/heading';
import Intro from '@/components/contact/intro';
import EmailBlock from '@/components/contact/EmailBlock';
import Form from '@/components/contact/form';
import Resume from '@/components/contact/resume';
import CertificatesSection from '@/components/CertificatesSection';

export default function ContactPage() {
  return (
    <main className="flex flex-col about-content" role="main">
      <section className="flex flex-col space-y-6">
        <Heading id="contact-heading">
          04. Get In Touch
        </Heading>

        <Intro />
        <EmailBlock />
        <Form />
      </section>

      <Resume />

      <CertificatesSection />
    </main>
  );
}