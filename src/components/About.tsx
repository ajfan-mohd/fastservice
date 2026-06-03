import { ArrowRight, Check } from 'lucide-react';
import { SiteConfig } from '../types';

export function About({
  siteConfig,
  onNavigateToContact,
}: {
  siteConfig: SiteConfig;
  onNavigateToContact: () => void;
}) {
  const points = [
    'Trust & Transparency',
    'Engineering Excellence',
    '24/7 Emergency Support',
    'DEWA & DCD Approved',
    'Licensed Engineers',
    'On-Time Delivery',
  ];

  return (
    <section className="bg-[#f6f8fb] py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1500&auto=format&fit=crop"
            alt="Fast Service interior project"
            className="h-[360px] w-full rounded-xl object-cover sm:h-[430px] lg:h-[500px]"
          />

          <div className="absolute -bottom-5 right-5 rounded-lg bg-[#1E4ED8] px-7 py-6 text-center text-white shadow-xl sm:right-8">
            <strong className="block text-4xl font-black leading-none">25</strong>
            <span className="mt-2 block text-[11px] font-black uppercase leading-4 tracking-[0.18em]">
              Years of<br />Excellence
            </span>
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-8 bg-[#1E4ED8]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#1E4ED8]">About Us</span>
          </div>

          <h2 className="text-[34px] font-black uppercase leading-[1] tracking-[-0.04em] text-[#07111f] sm:text-[44px] lg:text-[52px]">
            UAE's leading <span className="text-[#1E4ED8]">electro mechanical</span> company
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700">
            Founded in 2005 by Engr. Sulaiman Mohamed Al Sheezawy, Fast Service
            Electro Mechanical Works LLC has grown into one of Dubai's most
            trusted names in MEP contracting, villa renovation, and building
            maintenance.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
            For over 25 years, we have been the go-to partner for homeowners,
            real estate developers, and businesses — delivering projects on
            time, on budget, and beyond expectations.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {points.map((item) => (
              <div key={item} className="flex items-center gap-3 border-l-2 border-[#1E4ED8] bg-white px-4 py-3.5 shadow-sm">
                <Check className="shrink-0 text-[#1E4ED8]" size={17} />
                <span className="text-sm font-extrabold text-[#07111f]">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onNavigateToContact}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#1E4ED8] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#3B82F6]"
          >
            Learn More <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
