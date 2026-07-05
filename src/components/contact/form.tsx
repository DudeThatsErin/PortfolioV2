'use client';

import { useState } from 'react';
import type { ContactFormData, SubmitStatus } from './types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact.form.submit',
        source: 'portfolio',
        data: formData,
      }),
    });

    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
  } catch {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl" aria-label="Contact form">
        {submitStatus === 'success' && (
            <div
                role="status"
                aria-live="polite"
                aria-label="Contact form submission successful"
                className="p-4 rounded border border-accent-teal bg-indigo-dye text-accent-teal"
            >
                Thank you for your message! I'll get back to you soon.
            </div>
        )}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Full Name*"
        className="h-14 px-4 bg-[rgba(131,212,197,0.05)] border-2 border-[var(--accent-teal)] rounded text-[var(--gainsboro)] font-mono placeholder:text-[rgba(131,212,197,0.5)] focus:bg-[rgba(131,212,197,0.1)] focus:border-white outline-none"
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Email Address*"
        className="h-14 px-4 bg-[rgba(131,212,197,0.05)] border-2 border-[var(--accent-teal)] rounded text-[var(--gainsboro)] font-mono placeholder:text-[rgba(131,212,197,0.5)] focus:bg-[rgba(131,212,197,0.1)] focus:border-white outline-none"
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={6}
        placeholder="Your Message*"
        className="min-h-[150px] px-4 py-3 bg-[rgba(131,212,197,0.05)] border-2 border-[var(--accent-teal)] rounded text-[var(--gainsboro)] font-mono placeholder:text-[rgba(131,212,197,0.5)] focus:bg-[rgba(131,212,197,0.1)] focus:border-white outline-none resize-y"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 border-2 border-[var(--accent-teal)] rounded-full text-[var(--accent-teal)] font-mono hover:bg-[rgba(131,212,197,0.1)] disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}