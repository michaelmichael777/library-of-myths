import { useMemo } from 'react';

// ---------------------------------------------------------------------------
// AnimatedBackground
// ---------------------------------------------------------------------------
// Renders the atmospheric effects behind the hero section: a deep starfield,
// drifting glowing particles, and two slow-moving mist veils.
//
// This component is purely decorative and needs no props.
// To change the NUMBER of stars or particles, edit the two constants below.
// ---------------------------------------------------------------------------

const STAR_COUNT = 80;
const PARTICLE_COUNT = 18;

export default function AnimatedBackground() {
  // Build the star and particle fields once, with stable random positions,
  // so they don't reshuffle on every render.
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 3,
      })),
    [],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 12,
        duration: Math.random() * 8 + 8,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep radial glow behind everything */}
      <div className="absolute inset-0 bg-radial-gold" />

      {/* Mist veils drifting left and right */}
      <div className="absolute -inset-x-10 top-1/4 h-64 animate-mistMove bg-[radial-gradient(ellipse_at_center,rgba(138,95,214,0.12)_0%,transparent_60%)] blur-2xl" />
      <div
        className="absolute -inset-x-10 bottom-0 h-72 animate-mistMove bg-[radial-gradient(ellipse_at_center,rgba(195,147,43,0.1)_0%,transparent_60%)] blur-2xl"
        style={{ animationDelay: '6s' }}
      />

      {/* Twinkling stars */}
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="absolute rounded-full bg-gold-100 animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: '0 0 4px rgba(253, 243, 211, 0.6)',
          }}
        />
      ))}

      {/* Floating glowing particles */}
      {particles.map((p, i) => (
        <span
          key={`particle-${i}`}
          className="absolute rounded-full animate-drift"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background:
              'radial-gradient(circle, rgba(236,207,110,0.9) 0%, rgba(236,207,110,0.1) 60%, transparent 70%)',
          }}
        />
      ))}
    </div>
  );
}
