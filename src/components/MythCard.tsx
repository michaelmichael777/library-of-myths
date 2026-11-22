import { BookText, User, Sparkles } from 'lucide-react';
import type { Myth } from '../data/myths';
import MythArt from './MythArt';

// ---------------------------------------------------------------------------
// MythCard
// ---------------------------------------------------------------------------
// A single card in the myths grid. It shows the myth's artwork illustration,
// its title, culture/origin, a short description, the author, and a "Read"
// button that opens the modal.
//
// HOW TO DUPLICATE / CUSTOMIZE A CARD:
//   You do not need to edit this component to add myths. Simply add a new row
//   to the `myths` table in the database and a card will appear here
//   automatically.
//
//   To change the CARD LOOK, edit the Tailwind classes below — for example
//   adjust the hover glow on the `group` container.
// ---------------------------------------------------------------------------

interface MythCardProps {
  myth: Myth;
  onRead: (myth: Myth) => void;
  index: number;
}

export default function MythCard({ myth, onRead, index }: MythCardProps) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold-faint bg-ink-800/60 backdrop-blur-sm transition-all duration-500 hover:scale-[1.03] hover:border-gold-300/50 hover:shadow-[0_0_40px_rgba(195,147,43,0.25)]"
      style={{
        // Stagger the entrance animation so cards fade in one after another.
        animation: `fadeUp 0.7s ease-out ${index * 0.08}s both`,
      }}
    >
      {/* Artwork panel — custom SVG illustration keyed by myth.artwork */}
      <div className="relative h-48 w-full overflow-hidden">
        <MythArt
          artwork={myth.artwork}
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        />
        {/* Darkening overlay so the culture label stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/20 to-transparent" />
        {/* Decorative ember specks over the artwork on hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute left-1/4 top-1/3 h-1 w-1 animate-floatUp rounded-full bg-gold-200" />
          <div
            className="absolute right-1/3 top-1/2 h-1 w-1 animate-floatUp rounded-full bg-gold-200"
            style={{ animationDelay: '1s' }}
          />
        </div>
        {/* Culture / origin badge */}
        <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-ink-900/70 px-3 py-1 font-rune text-xs tracking-widest text-gold-300 backdrop-blur-sm">
          <Sparkles className="h-3 w-3" />
          {myth.culture}
        </span>
      </div>

      {/* Text body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-rune text-xl font-bold leading-snug text-gold-200 transition-colors group-hover:text-gold-100">
          {myth.title}
        </h3>

        <p className="mt-3 flex-1 font-body text-base leading-relaxed text-gold-200/60">
          {myth.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-gold-faint pt-4">
          <span className="flex items-center gap-2 font-rune text-sm tracking-wide text-amethyst-300/80">
            <User className="h-4 w-4" />
            {myth.author}
          </span>

          {/* Read button — opens the modal */}
          <button
            onClick={() => onRead(myth)}
            className="flex items-center gap-2 rounded-md border border-gold-400/40 bg-ink-700/60 px-4 py-2 font-rune text-xs tracking-[0.2em] text-gold-300 transition-all duration-300 hover:border-gold-300 hover:bg-gold-500/15 hover:text-gold-100 hover:shadow-[0_0_18px_rgba(195,147,43,0.4)]"
          >
            <BookText className="h-4 w-4" />
            Read
          </button>
        </div>
      </div>
    </article>
  );
}
