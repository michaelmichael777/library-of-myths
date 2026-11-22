import { useState } from 'react';
import Hero from '../components/Hero';
import MythsSection from '../components/MythsSection';
import ReadModal from '../components/ReadModal';
import type { Myth } from '../data/myths';

// ---------------------------------------------------------------------------
// HomePage
// ---------------------------------------------------------------------------
// The home page, assembled from the Hero, the myths grid, and the Read modal.
// It owns the state for which myth (if any) is currently open in the modal.
// ---------------------------------------------------------------------------

export default function HomePage() {
  const [activeMyth, setActiveMyth] = useState<Myth | null>(null);

  return (
    <>
      <Hero />
      <MythsSection onRead={setActiveMyth} />
      <ReadModal myth={activeMyth} onClose={() => setActiveMyth(null)} />
    </>
  );
}
