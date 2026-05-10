import { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ApartmentList from './components/ApartmentList';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingFlow from './components/BookingFlow';
import type { Apartment } from './hooks/useApartments';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleSelectApartment = useCallback((apartment: Apartment) => {
    setSelectedApartment(apartment);
  }, []);

  const handleCloseBooking = useCallback(() => {
    setSelectedApartment(null);
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedApartment(null);
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <Hero onExplore={() => handleNavigate('apartments')} />

      <ApartmentList onSelectApartment={handleSelectApartment} />

      <About />

      <Contact />

      <Footer />

      {selectedApartment && (
        <BookingFlow
          apartment={selectedApartment}
          onClose={handleCloseBooking}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}

export default App;
