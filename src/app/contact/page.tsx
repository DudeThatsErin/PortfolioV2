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
    <main className="min-h-screen px-6 pt-32 pb-20" role="main" aria-labelledby="contact-heading">
      <div className="max-w-2xl mx-auto">
        <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-slate-100 mb-8 font-raleway">
          <span className="text-emerald-400 font-mono text-lg mr-2">05.</span>
          Get In Touch...
        </h2>
        
        <p className="text-lg text-slate-300 leading-relaxed mb-8">
          You can contact Erin at any of the following locations, as well as filling out the form below:
        </p>
        
        <blockquote className="border-l-4 border-emerald-400 pl-6 mb-12 bg-slate-800/30 py-4 rounded-r">
          <p className="text-slate-300">
            You can manually send Erin an email at{' '}
            <a 
              href="mailto:erin.skidds@gmail.com" 
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              erin.skidds@gmail.com
            </a>
          </p>
        </blockquote>

        {/* Contact Form */}
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          aria-labelledby="contact-form-heading"
        >
          <h3 id="contact-form-heading" className="visually-hidden">Contact Form</h3>
          
          {submitStatus === 'success' && (
            <div className="bg-emerald-900/30 border border-emerald-400 text-emerald-300 px-4 py-3 rounded">
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
              className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded text-slate-100 placeholder-slate-400 focus:border-emerald-400 focus:outline-none transition-colors"
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
              className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded text-slate-100 placeholder-slate-400 focus:border-emerald-400 focus:outline-none transition-colors"
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
              className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded text-slate-100 placeholder-slate-400 focus:border-emerald-400 focus:outline-none transition-colors resize-vertical"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3 border-2 border-emerald-400 text-emerald-400 rounded font-mono hover:bg-emerald-400/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </main>
  );
}
