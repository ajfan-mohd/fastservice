import { PageHero } from '../components/PageHero';
import { ServicesList } from '../components/ServicesList';
import { ServiceDetail } from '../components/ServiceDetail';
import { ContactForm } from '../components/ContactForm';
import { Service, SiteConfig } from '../types';

export function ServicesPage({
  services,
  selectedService,
  siteConfig,
  prefilledService,
  onNavigate,
  onBookService,
  onBookingSubmitted,
}: {
  services: Service[];
  selectedService: Service | null | undefined;
  siteConfig: SiteConfig;
  prefilledService: string | null;
  onNavigate: (page: string, serviceId?: string | null) => void;
  onBookService: (name: string) => void;
  onBookingSubmitted: () => void;
}) {
  if (selectedService) {
    return (
      <>
        <ServiceDetail
          service={selectedService}
          onBack={() => onNavigate('services')}
          onBookService={onBookService}
        />

        <ContactForm
          siteConfig={siteConfig}
          services={services}
          prefilledServiceName={prefilledService}
          onBookingSubmitted={onBookingSubmitted}
        />
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Choose the service you need."
        text="Browse all Fast Service solutions. Each service has a dedicated detail page with scope, benefits and enquiry option."
        image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1800&auto=format&fit=crop"
      />

      <ServicesList
        services={services}
        onSelectService={(id) => onNavigate('services', id)}
        onBookService={onBookService}
      />

      <ContactForm
        siteConfig={siteConfig}
        services={services}
        prefilledServiceName={prefilledService}
        onBookingSubmitted={onBookingSubmitted}
      />
    </>
  );
}