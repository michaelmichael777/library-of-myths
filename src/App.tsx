import { useHashRoute } from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
// The root component. It renders the shared Header and Footer around the
// current "page" (Home or Contact), chosen by the hash-based router.
// The outer flex column keeps the Footer pinned to the bottom of the page.
// ---------------------------------------------------------------------------

export default function App() {
  const page = useHashRoute();

  return (
    <div className="flex min-h-screen flex-col bg-ink-900 text-gold-100">
      <Header />
      <div className="flex flex-1 flex-col">
        {page === 'contact' ? <ContactPage /> : <HomePage />}
      </div>
      <Footer />
    </div>
  );
}
