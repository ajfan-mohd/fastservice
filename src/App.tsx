import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { Service, GalleryItem, Booking, SiteConfig, Testimonial } from './types';
import { getServices, getGallery, getBookings, getSiteConfig, getTestimonials } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [prefilledService, setPrefilledService] = useState<string | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);

  const syncLocalState = () => {
    setServices(getServices());
    setGalleryItems(getGallery());
    setBookings(getBookings());
    setTestimonials(getTestimonials());
    setSiteConfig(getSiteConfig());
  };

  useEffect(() => { syncLocalState(); }, []);

  const nav = (page: string, serviceId: string | null = null) => {
    setSelectedServiceId(serviceId);
    setCurrentPage(page);
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const book = (name: string) => {
    setPrefilledService(name);
    setCurrentPage('contact');
    setIsAdminView(false);
    setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  if (!siteConfig) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  const selected = selectedServiceId ? services.find(s => s.id === selectedServiceId) : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header siteConfig={siteConfig} currentPage={currentPage} onNavigate={nav} isAdmin={isAdminView} onToggleAdminView={() => setIsAdminView(v => !v)} />
      <main>
        {isAdminView ? (
          <AdminPanel services={services} galleryItems={galleryItems} bookings={bookings} siteConfig={siteConfig} testimonials={testimonials} onRefreshData={syncLocalState} />
        ) : (
          <>
            {currentPage === 'home' && <HomePage siteConfig={siteConfig} services={services} galleryItems={galleryItems} testimonials={testimonials} prefilledService={prefilledService} onNavigate={nav} onBookService={book} onBookingSubmitted={syncLocalState} />}
            {currentPage === 'about' && <AboutPage siteConfig={siteConfig} testimonials={testimonials} onNavigate={nav} />}
            {currentPage === 'services' && <ServicesPage services={services} selectedService={selected} siteConfig={siteConfig} prefilledService={prefilledService} onNavigate={nav} onBookService={book} onBookingSubmitted={syncLocalState} />}
            {currentPage === 'gallery' && <GalleryPage items={galleryItems} />}
            {currentPage === 'contact' && <ContactPage siteConfig={siteConfig} services={services} prefilledService={prefilledService} onBookingSubmitted={syncLocalState} />}
          </>
        )}
      </main>
      <Footer siteConfig={siteConfig} onNavigate={nav} />
    </div>
  );
}
