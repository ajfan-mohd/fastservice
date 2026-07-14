import { Service } from '../types';

export function ServiceDetail({
  service,
  onBack,
  onBookService,
}: {
  service: Service;
  onBack: () => void;
  onBookService: (name: string) => void;
}) {
  const gallery = (
    service.images?.length ? service.images : [{ url: service.imageUrl, caption: service.title }]
  ).slice(0, 4);

  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 font-bold text-[#1E4ED8] hover:gap-3 transition-all"
        >
          ← Back to Services
        </button>

        {/* Header */}
        <p className="text-[#1E4ED8] font-bold mb-3 uppercase tracking-wide text-sm">
          {service.category}
        </p>
        <h1 className="text-3xl lg:text-5xl font-black mb-8 text-[#0A1628] max-w-3xl">
          {service.title}
        </h1>

        {/* 2x2 image grid */}
        <div className="grid grid-cols-2 gap-3 mb-12">
          {gallery.map((img: { url: string; caption: string }, i: number) => (
            <div
              key={img.url + i}
              className={`relative rounded-xl overflow-hidden bg-slate-100 aspect-[4/3] ${
                gallery.length === 1 ? 'col-span-2' : ''
              } ${gallery.length === 3 && i === 0 ? 'col-span-2' : ''}`}
            >
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                  <p className="text-white text-sm font-semibold">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          {/* Left: description + features + requirements */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-3">
              About This Service
            </h2>
            <p className="text-slate-600 leading-8 mb-10">{service.longDescription}</p>

            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-3">
              What's Included
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {service.features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 font-semibold text-slate-700 text-sm"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1E4ED8]/10 text-[#1E4ED8] flex items-center justify-center text-xs">
                    ✓
                  </span>
                  {f}
                </div>
              ))}
            </div>

            {service.requirements?.length ? (
              <>
                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-3">
                  What You'll Need
                </h2>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <ul className="grid gap-2.5">
                    {service.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-sm text-amber-900">
                        <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : null}
          </div>

          {/* Right: sticky booking card */}
          <div className="lg:sticky lg:top-8 rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-400 font-semibold uppercase tracking-wide mb-1">
              Pricing
            </p>
            <p className="font-bold text-[#0A1628] text-lg mb-5">{service.priceInfo}</p>
            <button
              onClick={() => onBookService(service.title)}
              className="w-full px-7 py-4 bg-[#0A1628] text-white rounded-full font-bold hover:bg-[#1E4ED8] transition-colors"
            >
              Request This Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}