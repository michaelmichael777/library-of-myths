import { useState } from 'react';
import { Feather, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

// ---------------------------------------------------------------------------
// ContactPage
// ---------------------------------------------------------------------------
// A standalone page (its own file) where visitors can send a message to the
// library's scribes. The form is front-end only — no database is used — so
// it shows a confirmation on submit rather than sending anything real.
//
// HOW TO CUSTOMIZE:
//   - Change the contact details (email, location) in the `details` array.
//   - Change the confirmation text shown after submitting in the state below.
// ---------------------------------------------------------------------------

const details = [
  { icon: Mail, label: 'Inkwell', value: 'scribe@libraryofmyths.ancient' },
  { icon: MapPin, label: 'Sanctum', value: 'The Forgotten Wing, Between Worlds' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend on this site — we simply acknowledge the message.
    setSent(true);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-32">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold" />
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 animate-glowPulse rounded-full bg-amethyst-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400/70" />
            <Feather className="h-5 w-5 text-gold-400" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400/70" />
          </div>
          <h2 className="font-rune text-4xl font-bold text-gold-shimmer sm:text-5xl">
            Address the Scribes
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg italic text-gold-200/60">
            Have a tale to share, or a question for the keepers of these
            shelves? Leave a message at the reading desk and we shall answer by
            candlelight.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact details panel */}
          <div className="flex flex-col gap-6 rounded-2xl border border-gold-faint bg-ink-800/60 p-8 backdrop-blur-sm">
            {details.map((d) => (
              <div key={d.label} className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/40 bg-ink-700/60 text-gold-300">
                  <d.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-rune text-xs tracking-[0.3em] text-amethyst-300/80">
                    {d.label}
                  </p>
                  <p className="mt-1 font-body text-lg italic text-gold-200/80">
                    {d.value}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-auto border-t border-gold-faint pt-6">
              <p className="font-body text-sm italic leading-relaxed text-gold-200/40">
                The library keeps no hours. Its doors open to any who carry a
                question and the patience to read.
              </p>
            </div>
          </div>

          {/* Message form */}
          <div className="rounded-2xl border border-gold-faint bg-ink-800/60 p-8 backdrop-blur-sm">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-gold-400" />
                <h3 className="mt-4 font-rune text-2xl font-bold text-gold-200">
                  Your message has been sealed
                </h3>
                <p className="mt-2 max-w-sm font-body text-lg italic text-gold-200/60">
                  The scribes have received your words. When the candles burn
                  low, an answer shall find its way to you.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-md border border-gold-400/40 px-5 py-2 font-rune text-xs tracking-[0.2em] text-gold-300 transition-all duration-300 hover:border-gold-300 hover:text-gold-100 hover:shadow-[0_0_18px_rgba(195,147,43,0.4)]"
                >
                  Write Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your Name">
                    <input
                      type="text"
                      required
                      placeholder="Wanderer"
                      className="contact-input"
                    />
                  </Field>
                  <Field label="Your Inkwell">
                    <input
                      type="email"
                      required
                      placeholder="you@realm.ancient"
                      className="contact-input"
                    />
                  </Field>
                </div>
                <Field label="Subject">
                  <input
                    type="text"
                    required
                    placeholder="A tale I wish to share..."
                    className="contact-input"
                  />
                </Field>
                <Field label="Your Message">
                  <textarea
                    required
                    rows={5}
                    placeholder="Speak your mind, traveler..."
                    className="contact-input resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  className="group mt-2 flex items-center justify-center gap-2 rounded-md border border-gold-400/50 bg-gold-500/10 px-6 py-3 font-rune text-sm tracking-[0.2em] text-gold-300 transition-all duration-300 hover:border-gold-300 hover:bg-gold-500/20 hover:text-gold-100 hover:shadow-[0_0_24px_rgba(195,147,43,0.5)]"
                >
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  Send by Raven
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// A labelled form field wrapper, used above.
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-rune text-xs tracking-[0.3em] text-amethyst-300/80">
        {label}
      </span>
      {children}
    </label>
  );
}
