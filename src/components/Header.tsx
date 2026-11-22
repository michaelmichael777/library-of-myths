import { BookOpen, ScrollText } from 'lucide-react';
import { navigate, type Page } from '../router';

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
// A fixed navigation bar shown on every page. It contains the site title,
// its subtitle, and links to the Home and Contact pages.
//
// HOW TO CHANGE THE NAV LINKS:
//   Edit the `links` array below — add or remove objects with
//   { label, page } to add or remove navigation links.
// ---------------------------------------------------------------------------

const links: { label: string; page: Page }[] = [
  { label: 'Library', page: 'home' },
  { label: 'Contact', page: 'contact' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-40 w-full">
      <div className="border-b border-gold-faint bg-ink-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Site title block */}
          <button
            onClick={() => navigate('home')}
            className="group flex items-center gap-3 text-left"
          >
            <BookOpen className="h-7 w-7 text-gold-400 transition-transform duration-500 group-hover:rotate-6" />
            <div>
              <h1 className="font-rune text-lg font-bold tracking-wide text-gold-shimmer sm:text-xl">
                ✦ Library of Myths ✦
              </h1>
              <p className="font-rune text-[0.6rem] tracking-[0.25em] text-gold-200/60 sm:text-xs">
                MYTHS & LEGENDS FROM AROUND THE WORLD
              </p>
            </div>
          </button>

          {/* Navigation links */}
          <nav className="flex items-center gap-2">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className="group flex items-center gap-1.5 rounded-md px-3 py-2 font-rune text-xs tracking-[0.2em] text-gold-200/80 transition-colors hover:text-gold-300"
              >
                <ScrollText className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
