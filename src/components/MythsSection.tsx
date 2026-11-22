import { useEffect, useState } from 'react';
import { Flame, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Myth } from '../data/myths';
import MythCard from './MythCard';

// ---------------------------------------------------------------------------
// MythsSection
// ---------------------------------------------------------------------------
// The main content of the home page. It fetches the myths from the Supabase
// `myths` table and renders a responsive grid of MythCard components.
//
// HOW TO ADD A CARD:
//   Insert a new row into the `myths` table (e.g. via a SQL migration or the
//   Supabase dashboard). A card will appear here automatically — this grid
//   maps over whatever the database returns.
//
// HOW TO CHANGE THE GRID LAYOUT:
//   Edit the grid classes on the `<div>` below (e.g. `sm:grid-cols-2`
//   or `lg:grid-cols-4`) to show more or fewer cards per row.
// ---------------------------------------------------------------------------

interface MythsSectionProps {
  onRead: (myth: Myth) => void;
}

export default function MythsSection({ onRead }: MythsSectionProps) {
  const [myths, setMyths] = useState<Myth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('myths')
        .select('*')
        .order('sort_order', { ascending: true });
      if (cancelled) return;
      if (error) {
        setError('The shelves could not be reached. Try again in a moment.');
      } else {
        setMyths(data ?? []);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="myths" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-14 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-amethyst-400/70" />
            <Flame className="h-5 w-5 text-gold-400" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-amethyst-400/70" />
          </div>
          <h2 className="font-rune text-3xl font-bold text-gold-shimmer sm:text-4xl">
            The Myths Collection
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-lg italic text-gold-200/50">
            Tales bound in shadow and fire, gathered from every corner of the
            ancient world. Choose a volume and open its pages.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gold-300/70">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="mt-4 font-rune text-sm tracking-wide text-gold-300/70">
              The scribes are gathering the volumes...
            </p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="h-8 w-8 text-amethyst-400" />
            <p className="mt-4 max-w-md font-rune text-sm tracking-wide text-gold-200/60">
              {error}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && myths.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Flame className="h-8 w-8 text-gold-400/50" />
            <p className="mt-4 font-rune text-sm tracking-wide text-gold-200/50">
              The shelves stand empty. No myths have been recorded yet.
            </p>
          </div>
        )}

        {/* Responsive grid of myth cards */}
        {!loading && myths.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {myths.map((myth, index) => (
              <MythCard
                key={myth.id}
                myth={myth}
                index={index}
                onRead={onRead}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
