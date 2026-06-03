import { SiteConfig } from '../types';

export function Hero({ siteConfig, onExploreServices, onBookNow }: { siteConfig: SiteConfig; onExploreServices:()=>void; onBookNow:()=>void }) {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#07111f]">
      <img
        src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1900&auto=format&fit=crop"
        alt="Fast Service renovation and MEP"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07111f]/90 via-[#07111f]/62 to-[#07111f]/15" />

      <div className="relative z-10 flex min-h-[88vh] items-center px-5 pt-24 pb-16 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <span className="mb-5 inline-block text-xs font-extrabold uppercase tracking-[0.22em] text-[#93c5fd] sm:text-sm">
            Fast Service Electro Mechanical
          </span>

          <h1 className="text-[42px] font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-[56px] lg:text-[72px]">
            Building Better
            <br />
            Spaces.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
            MEP, renovation and maintenance services for villas, offices and
            commercial properties across the UAE.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onBookNow}
              className="rounded-full bg-[#1E4ED8] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-blue-500/20 hover:bg-[#3B82F6]"
            >
              Get a Quote
            </button>
            <button
              onClick={onExploreServices}
              className="rounded-full border border-white/18 bg-white/10 px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur hover:bg-white/16"
            >
              View Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
