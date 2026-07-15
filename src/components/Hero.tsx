import { SiteConfig } from '../types';

export function Hero({
  siteConfig,
  onExploreServices,
  onBookNow,
}: {
  siteConfig: SiteConfig;
  onExploreServices: () => void;
  onBookNow: () => void;
}) {
  return (
    <section className="relative min-h-[82vh] overflow-hidden bg-[#07111f]">
      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroZoomIn {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }
        .hero-img {
          animation: heroZoomIn 7s ease-out forwards;
        }
        .hero-fade {
          opacity: 0;
          animation: heroFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-fade-1 { animation-delay: 0.15s; }
        .hero-fade-2 { animation-delay: 0.3s; }
        .hero-fade-3 { animation-delay: 0.5s; }
        .hero-fade-4 { animation-delay: 0.68s; }
      `}</style>

      <img
        src={siteConfig.heroImage}
        alt={siteConfig.heroTitle}
        width={1900}
        height={1200}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="hero-img absolute inset-0 h-full w-full object-cover"
      />

      {/* Left-to-right blend for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07111f]/62 via-[#07111f]/28 to-transparent" />
      {/* Soft top fade so it meets the header cleanly */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07111f]/40 to-transparent" />
      {/* Soft bottom fade so it flows into the next section instead of a hard cut */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07111f]/70 to-transparent" />

      <div className="relative z-10 flex min-h-[82vh] items-center px-5 pb-20 pt-24 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <span className="hero-fade hero-fade-1 mb-5 inline-block text-xs font-extrabold uppercase tracking-[0.22em] text-[#93c5fd] sm:text-sm">
            {siteConfig.heroEyebrow}
          </span>

          <h1 className="hero-fade hero-fade-2 text-[42px] font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-[56px] lg:text-[72px]">
            {siteConfig.heroTitle}
          </h1>

          <p className="hero-fade hero-fade-3 mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
            {siteConfig.heroSubtitle}
          </p>

          <div className="hero-fade hero-fade-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onBookNow}
              className="rounded-full bg-[#1E4ED8] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 hover:scale-105 hover:bg-[#3B82F6]"
            >
              Get a Free Quote
            </button>

            <button
              onClick={onExploreServices}
              className="rounded-full border border-white/18 bg-white/10 px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur transition-transform duration-300 hover:scale-105 hover:bg-white/16"
            >
              View Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}