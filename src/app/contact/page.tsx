'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="about-content" role="main" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="numbered-heading">
        05. Get In Touch
      </h2>
        
      <p style={{ marginBottom: '2rem' }}>
        You can contact Erin at any of the following locations, as well as filling out the form below:
      </p>
      
      <blockquote style={{ 
        borderLeft: '4px solid var(--accent-teal)', 
        paddingLeft: '1.5rem', 
        marginBottom: '2rem',
        backgroundColor: 'rgba(131, 212, 197, 0.05)',
        padding: '1rem 1rem 1rem 1.5rem',
        borderRadius: '0 4px 4px 0'
      }}>
        <p>
          You can manually send Erin an email at{' '}
          <a 
            href="mailto:erin.skidds@gmail.com" 
            style={{ color: 'var(--accent-teal)', textDecoration: 'none' }}
          >
            erin.skidds@gmail.com
          </a>
        </p>
      </blockquote>

      {/* Contact Form */}
      <form 
        onSubmit={handleSubmit} 
        className="contact-form"
        aria-labelledby="contact-form-heading"
      >
        <h3 id="contact-form-heading" className="visually-hidden">Contact Form</h3>
        
        {submitStatus === 'success' && (
          <div style={{
            backgroundColor: 'rgba(131, 212, 197, 0.1)',
            border: '1px solid var(--accent-teal)',
            color: 'var(--accent-teal)',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1.5rem'
          }}>
            Thank you for your message! I'll get back to you soon.
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="name" className="visually-hidden">Full Name (required)</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name*"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            className="contact-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="visually-hidden">Email Address (required)</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address*"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            className="contact-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message" className="visually-hidden">Message (required)</label>
          <textarea
            name="message"
            id="message"
            placeholder="Your Message*"
            value={formData.message}
            onChange={handleChange}
            required
            aria-required="true"
            rows={6}
            className="contact-input contact-textarea"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="contact-button"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </main>
  );
}
