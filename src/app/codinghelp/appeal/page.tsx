'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './appeal.module.css';

type FormState = {
  username: string;
  userId: string;
  reason: string;
  why: string;
  extra: string;
};

const EMPTY: FormState = {
  username: '',
  userId: '',
  reason: '',
  why: '',
  extra: '',
};

export default function AppealPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setErrorMsg('');

    try {
      const res = await fetch('/api/codinghelp/appeal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Image
            src="/codinghelp/ch.png"
            alt="r/CodingHelp logo"
            width={72}
            height={72}
            className={styles.logo}
            priority
          />
          <h1 className={styles.brand}>r/CodingHelp</h1>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <h2 className={styles.title}>Ban Appeal Form</h2>
          <hr className={styles.rule} />
          <p className={styles.subtitle}>Use this to appeal a ban.</p>
          <hr className={styles.rule} />

          {status === 'success' && (
            <div className={`${styles.alert} ${styles.alertSuccess}`}>
              Your appeal has been submitted. The moderation team has been
              notified and will review it. You can close this page.
            </div>
          )}
          {status === 'error' && (
            <div className={`${styles.alert} ${styles.alertError}`}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Discord identity */}
            <div className={styles.field}>
              <label htmlFor="username" className={styles.label}>
                Discord Username
                <span className={styles.required}>*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="e.g. erinskidds"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="userId" className={styles.label}>
                Discord User ID
                <span className={styles.required}>*</span>
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                required
                inputMode="numeric"
                pattern="\d{17,20}"
                title="Your Discord User ID is a 17-20 digit number."
                value={form.userId}
                onChange={handleChange}
                placeholder="e.g. 123456789012345678"
                className={styles.input}
              />
              <details className={styles.help}>
                <summary className={styles.helpSummary}>
                  How do I find my Discord User ID?
                </summary>
                <ol className={styles.helpList}>
                  <li>
                    Open Discord and go to{' '}
                    <strong>User Settings</strong> (the gear icon next to your
                    name).
                  </li>
                  <li>
                    Open <strong>Advanced</strong> and turn on{' '}
                    <strong>Developer Mode</strong>.
                  </li>
                  <li>
                    Close settings, then{' '}
                    <strong>right-click your own username</strong> (or tap your
                    avatar on mobile).
                  </li>
                  <li>
                    Click <strong>Copy User ID</strong> and paste it here.
                  </li>
                </ol>
                <p className={styles.helpNote}>
                  Your User ID is a long number (17-20 digits). This is required
                  so we can confirm your account and process your appeal.
                </p>
              </details>
            </div>

            {/* Question 1 */}
            <div className={styles.field}>
              <label htmlFor="reason" className={styles.label}>
                1. Why did you get muted/banned?
                <span className={styles.required}>*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                rows={4}
                value={form.reason}
                onChange={handleChange}
                placeholder="Answer here.."
                className={styles.textarea}
              />
            </div>

            {/* Question 2 */}
            <div className={styles.field}>
              <label htmlFor="why" className={styles.label}>
                2. Why do you believe your appeal should be accepted?
                <span className={styles.required}>*</span>
              </label>
              <textarea
                id="why"
                name="why"
                required
                rows={4}
                value={form.why}
                onChange={handleChange}
                placeholder="Answer here.."
                className={styles.textarea}
              />
            </div>

            {/* Question 3 */}
            <div className={styles.field}>
              <label htmlFor="extra" className={styles.label}>
                3. Is there anything else you would like for us to know?
              </label>
              <textarea
                id="extra"
                name="extra"
                rows={4}
                value={form.extra}
                onChange={handleChange}
                placeholder="Answer here.."
                className={styles.textarea}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submit}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
