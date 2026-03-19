import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar            from '@/components/Navbar';
import Home              from '@/pages/Home';
import CollectionPage    from '@/pages/CollectionPage';
import BookConsultation  from '@/pages/BookConsultation';
import About             from '@/pages/About';
import Process           from '@/pages/Process';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/"                  element={<Home />} />
          <Route path="/collections/:slug" element={<CollectionPage />} />
          <Route path="/book"              element={<BookConsultation />} />
          <Route path="/about"             element={<About />} />
          <Route path="/process"           element={<Process />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
