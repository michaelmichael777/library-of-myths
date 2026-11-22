import { useEffect } from 'react';
import { X, ScrollText } from 'lucide-react';
import type { Myth } from '../data/myths';
import MythArt from './MythArt';

// ---------------------------------------------------------------------------
// ReadModal
// ---------------------------------------------------------------------------
// A full-screen modal that shows the full text of a myth. It appears when a
// card's "Read" button is clicked, and closes via the X button, the
// backdrop, or the Escape key.
//
// HOW TO CUSTOMIZE:
//   The modal reads everything from the `myth` prop (which comes from the
//   database), so changing the story happens in the `myths` table. To adjust
//   the modal's look, edit the Tailwind classes on the panel below.
// ---------------------------------------------------------------------------

interface ReadModalProps {
  myth: Myth | null;
  onClose: () => void;
}

export default function ReadModal({ myth, onClose }: ReadModalProps) {
  // Close the modal when the Escape key is pressed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (myth) {
      window.addEventListener('keydown', onKey);
      // Prevent the page behind from scrolling while the modal is open.
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [myth, onClose]);

  if (!myth) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={myth.title}
    >
      {/* Dark backdrop — click anywhere to close */}
      <div
        className="absolute inset-0 bg-ink-900/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative max-h-[88vh] w-full max-w-2xl animate-modalIn overflow-y-auto rounded-2xl border border-gold-300/40 bg-ink-800/95 shadow-[0_0_60px_rgba(138,95,214,0.3)]">
        {/* Artwork header band */}
        <div className="relative h-32 w-full overflow-hidden rounded-t-2xl">
          <MythArt artwork={myth.artwork} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-800 to-transparent" />

          {/* Close (X) button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-ink-900/70 text-gold-300 transition-all duration-300 hover:rotate-90 hover:border-gold-300 hover:text-gold-100 hover:shadow-[0_0_16px_rgba(236,207,110,0.5)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-8 sm:p-10">
          <span className="flex items-center gap-2 font-rune text-xs tracking-[0.3em] text-amethyst-300/80">
            <ScrollText className="h-4 w-4" />
            {myth.culture} · by {myth.author}
          </span>

          <h2 className="mt-4 font-rune text-3xl font-bold text-gold-shimmer sm:text-4xl">
            {myth.title}
          </h2>

          {/* Decorative divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold-400/60" />
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
          </div>

          <p className="font-body text-lg leading-relaxed text-gold-200/80 sm:text-xl">
            {myth.story}
          </p>

          <button
            onClick={onClose}
            className="mt-8 rounded-md border border-gold-400/40 px-5 py-2 font-rune text-xs tracking-[0.2em] text-gold-300 transition-all duration-300 hover:border-gold-300 hover:text-gold-100 hover:shadow-[0_0_18px_rgba(195,147,43,0.4)]"
          >
            Close the Tome
          </button>
        </div>
      </div>
    </div>
  );
}
