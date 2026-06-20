import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudioHeader from '../components/StudioHeader';
import StudioFooter from '../components/StudioFooter';
import { STUDIO_CONTACT_EMAIL } from '../content/studio';

/**
 * Set this to your Formspree endpoint (https://formspree.io) to enable form submission.
 * Example: 'https://formspree.io/f/xpwrqabc'
 * When empty, the form falls back to opening a pre-filled email.
 */
const FORMSPREE_ENDPOINT = '';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'mt-2 w-full border-b bg-transparent pb-3 text-sm outline-none transition-colors duration-150';

const labelClass = 'block text-[10px] font-bold uppercase tracking-[0.25em]';

const StudioIntakePage: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!FORMSPREE_ENDPOINT) {
      const body = Array.from(data.entries())
        .map(([k, v]) => `${String(k)}: ${String(v)}`)
        .join('\n');
      window.location.href = `mailto:${STUDIO_CONTACT_EMAIL}?subject=${encodeURIComponent('Studio Inquiry')}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="ba-studio min-h-screen">
      <StudioHeader />

      <main className="px-4 pb-28 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">

          {status === 'success' ? (
            <div className="py-24 text-center">
              <h1
                className="font-serif text-4xl font-normal"
                style={{ color: 'var(--ba-studio-text)' }}
              >
                Got it.
              </h1>
              <p
                className="mt-4 text-sm font-light leading-relaxed"
                style={{ color: 'var(--ba-studio-text-muted)' }}
              >
                We'll review your inquiry and follow up within a few business days.
              </p>
              <Link
                to="/studio"
                className="mt-10 inline-block text-[10px] font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-70"
                style={{ color: 'var(--ba-studio-text-faint)' }}
              >
                ← Back to Studio
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <Link
                  to="/studio"
                  className="text-[10px] font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-70"
                  style={{ color: 'var(--ba-studio-text-faint)' }}
                >
                  ← Studio
                </Link>
                <h1
                  className="mt-6 font-serif text-4xl font-normal md:text-5xl"
                  style={{ color: 'var(--ba-studio-text)' }}
                >
                  Tell us about your business.
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <label
                    htmlFor="name"
                    className={labelClass}
                    style={{ color: 'var(--ba-studio-text-muted)' }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputClass}
                    style={{
                      borderColor: 'var(--ba-studio-border)',
                      color: 'var(--ba-studio-text)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={labelClass}
                    style={{ color: 'var(--ba-studio-text-muted)' }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    style={{
                      borderColor: 'var(--ba-studio-border)',
                      color: 'var(--ba-studio-text)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className={labelClass}
                    style={{ color: 'var(--ba-studio-text-muted)' }}
                  >
                    Phone{' '}
                    <span style={{ opacity: 0.4 }}>(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass}
                    style={{
                      borderColor: 'var(--ba-studio-border)',
                      color: 'var(--ba-studio-text)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="business"
                    className={labelClass}
                    style={{ color: 'var(--ba-studio-text-muted)' }}
                  >
                    Business name
                  </label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    required
                    className={inputClass}
                    style={{
                      borderColor: 'var(--ba-studio-border)',
                      color: 'var(--ba-studio-text)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className={labelClass}
                    style={{ color: 'var(--ba-studio-text-muted)' }}
                  >
                    What kind of business
                  </label>
                  <input
                    id="type"
                    name="type"
                    type="text"
                    required
                    placeholder="e.g. tattoo studio, streetwear brand, piercing collective"
                    className={`${inputClass} placeholder:opacity-25`}
                    style={{
                      borderColor: 'var(--ba-studio-border)',
                      color: 'var(--ba-studio-text)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className={labelClass}
                    style={{ color: 'var(--ba-studio-text-muted)' }}
                  >
                    What do you need help with
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    style={{
                      borderColor: 'var(--ba-studio-border)',
                      color: 'var(--ba-studio-text)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="referral"
                    className={labelClass}
                    style={{ color: 'var(--ba-studio-text-muted)' }}
                  >
                    How did you find us{' '}
                    <span style={{ opacity: 0.4 }}>(optional)</span>
                  </label>
                  <input
                    id="referral"
                    name="referral"
                    type="text"
                    className={inputClass}
                    style={{
                      borderColor: 'var(--ba-studio-border)',
                      color: 'var(--ba-studio-text)',
                    }}
                  />
                </div>

                {status === 'error' && (
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: '#e07070' }}
                  >
                    Something went wrong. You can reach us directly at{' '}
                    <a
                      href={`mailto:${STUDIO_CONTACT_EMAIL}`}
                      className="underline underline-offset-2"
                    >
                      {STUDIO_CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="rounded-full border px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    borderColor: 'var(--ba-studio-accent)',
                    color: 'var(--ba-studio-accent)',
                  }}
                >
                  {status === 'submitting' ? 'Sending…' : 'Submit inquiry'}
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <StudioFooter />
    </div>
  );
};

export default StudioIntakePage;
