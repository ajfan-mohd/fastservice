import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { ServicesList } from '../components/ServicesList';
import { GalleryGrid } from '../components/GalleryGrid';
import { ContactForm } from '../components/ContactForm';
import { ClientsPartners } from '../components/ClientsPartners';
import { Testimonials } from '../components/Testimonials';
import { StatsStrip } from '../components/StatsStrip';
import { ProcessSection } from '../components/ProcessSection';
import { Service, GalleryItem, SiteConfig, Testimonial } from '../types';

export function HomePage({ siteConfig, services, galleryItems, testimonials, prefilledService, onNavigate, onBookService, onBookingSubmitted }: {
  siteConfig: SiteConfig;
  services: Service[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  prefilledService: string | null;
  onNavigate: (page: string, serviceId?: string | null) => void;
  onBookService: (name: string) => void;
  onBookingSubmitted: () => void;
}) {
  return (
    <>
      <Hero siteConfig={siteConfig} onExploreServices={() => onNavigate('services')} onBookNow={() => onBookService('General Consultation')} />
      <StatsStrip />
      <About siteConfig={siteConfig} onNavigateToContact={() => onNavigate('contact')} />
      <ServicesList services={services.slice(0, 6)} onSelectService={(id) => onNavigate('services', id)} onBookService={onBookService} />
      <GalleryGrid items={galleryItems.slice(0, 6)} />
      <ProcessSection />
      <ClientsPartners />
      <Testimonials testimonials={testimonials} />
      <ContactForm siteConfig={siteConfig} services={services} prefilledServiceName={prefilledService} onBookingSubmitted={onBookingSubmitted} />
    </>
  );
}
