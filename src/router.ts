import { useEffect, useState } from 'react';

// A tiny hash-based router. It supports two "pages":
//   #/         -> the home page (hero + myths)
//   #/contact  -> the contact page
// No external dependency is needed for this small site.

export type Page = 'home' | 'contact';

export function getPageFromHash(): Page {
  return window.location.hash.replace('#/', '').startsWith('contact')
    ? 'contact'
    : 'home';
}

export function navigate(page: Page) {
  window.location.hash = page === 'home' ? '/' : '/contact';
  // Scroll back to the top whenever the page changes.
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function useHashRoute(): Page {
  const [page, setPage] = useState<Page>(getPageFromHash());

  useEffect(() => {
    const onChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return page;
}
