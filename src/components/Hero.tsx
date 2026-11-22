import { ChevronDown } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
// The opening section of the home page: a large heading, a brief description,
// an animated background, and a scroll button that jumps down to the myths.
//
// To edit the copy shown here, change the heading or paragraph text below.
// ---------------------------------------------------------------------------

export default function Hero() {
  // Smoothly scroll to the myths grid section.
  const scrollToMyths = () => {
    document.getElementById('myths')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
      <AnimatedBackground />

      <div className="relative z-10 animate-fadeUp">
        {/* Ornamental divider above the heading */}
        <div className="mx-auto mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/70" />
          <span className="font-rune text-sm tracking-[0.45em] text-gold-300/80">
            ✦ WELCOME, SEEKER ✦
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/70" />
        </div>

        {/* Main title — ornate carved font with ethereal glow */}
        <h2 className="font-rune animate-etherGlow text-4xl font-bold leading-tight text-gold-shimmer sm:text-6xl md:text-7xl lg:text-8xl">
          The Library
          <span className="mt-2 block text-amethyst-300/90">of Myths</span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl font-body text-lg leading-relaxed text-gold-200/70 sm:text-xl">
          Within these endless shelves dwell the tales of gods and monsters, of
          tricksters and heroes, of worlds made and unmade. Gather close to the
          candlelight and read — for the old stories remember what the world has
          forgotten.
        </p>

        {/* Scroll button */}
        <button
          onClick={scrollToMyths}
          className="group mx-auto mt-14 flex flex-col items-center gap-3 text-gold-300/80 transition-colors hover:text-gold-300"
        >
          <span className="font-rune text-xs tracking-[0.4em] transition-all duration-300 group-hover:tracking-[0.5em] group-hover:text-gold-200">
            ⟢ ENTER THE STACKS ⟣
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 bg-ink-800/60 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-gold-300/80 group-hover:shadow-[0_0_24px_rgba(236,207,110,0.4)]">
            <ChevronDown className="h-5 w-5 animate-floatUp" />
          </span>
        </button>
      </div>
    </section>
  );
}
