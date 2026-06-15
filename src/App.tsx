import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { Header } from './components/Header';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLogin } from './pages/AdminLogin';

import {
  Service,
  GalleryItem,
  Booking,
  SiteConfig,
  Testimonial,
  ClientLogo,
} from './types';

import {
  getServices,
  getGallery,
  getBookings,
  getSiteConfig,
  getTestimonials,
  getClients,
} from './data.supabase';

function AppContent() {
  const navigate = useNavigate();

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [prefilledService, setPrefilledService] = useState<string | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem('admin_logged_in') === 'true'
  );

  const syncData = async () => {
    try {
      setIsLoading(true);

      const [
        servicesData,
        galleryData,
        bookingsData,
        testimonialsData,
        clientsData,
        configData,
      ] = await Promise.all([
        getServices(),
        getGallery(),
        getBookings(),
        getTestimonials(),
        getClients(),
        getSiteConfig(),
      ]);

      setServices(servicesData);
      setGalleryItems(galleryData);
      setBookings(bookingsData);
      setTestimonials(testimonialsData);
      setClients(clientsData);
      setSiteConfig(configData);
    } catch (error) {
      console.error('Failed to load Supabase data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncData();
  }, []);

  const nav = (page: string, serviceId: string | null = null) => {
    setSelectedServiceId(serviceId);

    const routes: Record<string, string> = {
      home: '/',
      about: '/about',
      services: '/services',
      gallery: '/gallery',
      contact: '/contact',
      admin: '/admin',
    };

    navigate(routes[page] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const book = (name: string) => {
    setPrefilledService(name);
    navigate('/contact');

    setTimeout(() => {
      document.getElementById('contact-section')?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);
  };

 if (!siteConfig) {
  return null;
}

  const selected = selectedServiceId
    ? services.find((s) => s.id === selectedServiceId) || null
    : null;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header siteConfig={siteConfig} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                siteConfig={siteConfig}
                services={services}
                galleryItems={galleryItems}
                testimonials={testimonials}
                clients={clients}
                prefilledService={prefilledService}
                onNavigate={nav}
                onBookService={book}
                onBookingSubmitted={syncData}
              />
            }
          />

          <Route
            path="/about"
            element={
              <AboutPage
                siteConfig={siteConfig}
                testimonials={testimonials}
                onNavigate={nav}
              />
            }
          />

          <Route
            path="/services"
            element={
              <ServicesPage
                services={services}
                selectedService={selected}
                siteConfig={siteConfig}
                prefilledService={prefilledService}
                onNavigate={nav}
                onBookService={book}
                onBookingSubmitted={syncData}
              />
            }
          />

          <Route
            path="/gallery"
            element={<GalleryPage items={galleryItems} />}
          />

          <Route
            path="/contact"
            element={
              <ContactPage
                siteConfig={siteConfig}
                services={services}
                prefilledService={prefilledService}
                onBookingSubmitted={syncData}
              />
            }
          />

          <Route
            path="/admin"
            element={
              isAdminLoggedIn ? (
                <AdminPanel
                  services={services}
                  galleryItems={galleryItems}
                  bookings={bookings}
                  siteConfig={siteConfig}
                  testimonials={testimonials}
                  clients={clients}
                  onRefreshData={syncData}
                />
              ) : (
                <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
              )
            }
          />
        </Routes>
      </main>

      <Footer siteConfig={siteConfig} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}