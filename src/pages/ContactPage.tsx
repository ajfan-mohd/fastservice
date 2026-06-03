import { PageHero } from '../components/PageHero';
import { ContactForm } from '../components/ContactForm';
import { Service, SiteConfig } from '../types';

export function ContactPage({ siteConfig, services, prefilledService, onBookingSubmitted }: { siteConfig: SiteConfig; services: Service[]; prefilledService: string | null; onBookingSubmitted: () => void }) {
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you need. We will guide you." text="Send your requirement for site visit, quotation, renovation, MEP work or maintenance support." image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1800" />
      <ContactForm siteConfig={siteConfig} services={services} prefilledServiceName={prefilledService} onBookingSubmitted={onBookingSubmitted} />
    </>
  );
}
