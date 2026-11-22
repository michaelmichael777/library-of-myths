// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
// A footer pinned to the bottom of the page (via the flex layout in App).
// It shows the site name and year. To change the text, edit the lines below.
// ---------------------------------------------------------------------------

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gold-faint bg-ink-900/90">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center">
        <p className="font-rune text-sm tracking-[0.3em] text-gold-300/70">
          ✦ Library of Myths, 2026 ✦
        </p>
        <p className="mt-1 font-rune text-[0.65rem] tracking-[0.2em] text-gold-200/40">
          GUARDED BY SCRIBES WHO REMEMBER THE OLD DARK
        </p>
      </div>
    </footer>
  );
}
