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
    service.images?.length
      ? service.images
      : [{ url: service.imageUrl, caption: service.title }]
  ).slice(0, 4);

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 font-bold text-[#1E4ED8] transition-all hover:gap-3"
        >
          ← Back to Services
        </button>

        {/* Header */}
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#1E4ED8]">
          {service.category}
        </p>

        <h1 className="mb-8 max-w-3xl text-3xl font-black text-[#0A1628] lg:text-5xl">
          {service.title}
        </h1>

        {/* Image grid */}
        <div className="mb-12 grid grid-cols-2 gap-3">
          {gallery.map(
            (
              img: {
                url: string;
                caption: string;
              },
              i: number
            ) => (
              <div
                key={`${img.url}-${i}`}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 ${
                  gallery.length === 1 ? 'col-span-2' : ''
                } ${
                  gallery.length === 3 && i === 0 ? 'col-span-2' : ''
                }`}
              >
                <img
                  src={img.url}
                  alt={img.caption || service.title}
                  className="h-full w-full object-cover"
                />

                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                    <p className="text-sm font-semibold text-white">
                      {img.caption}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
          {/* Left content */}
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
              About This Service
            </h2>

            <p className="mb-10 leading-8 text-slate-600">
              {service.longDescription}
            </p>

            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
              What's Included
            </h2>

            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              {service.features.map((feature, index) => {
                const [title, ...descriptionParts] = feature.split('|');
                const description = descriptionParts.join('|').trim();

                return (
                  <div
                    key={`${title}-${index}`}
                    className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1E4ED8]/30 hover:bg-white hover:shadow-lg"
                  >
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#1E4ED8]/10 text-sm font-bold text-[#1E4ED8]">
                      ✓
                    </span>

                    <div>
                      <h3 className="text-sm font-bold leading-5 text-[#07111f]">
                        {title.trim()}
                      </h3>

                      {description && (
                        <p className="mt-1.5 text-xs leading-5 text-slate-500">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {service.requirements?.length ? (
              <>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
                  What You'll Need
                </h2>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <ul className="grid gap-2.5">
                    {service.requirements.map((requirement, index) => (
                      <li
                        key={`${requirement}-${index}`}
                        className="flex items-start gap-3 text-sm text-amber-900"
                      >
                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-amber-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        </span>

                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : null}
          </div>

          {/* Booking card */}
          <div className="rounded-xl border border-slate-200 p-6 lg:sticky lg:top-24">
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Pricing
            </p>

            <p className="mb-5 text-lg font-bold text-[#0A1628]">
              {service.priceInfo}
            </p>

            <button
              onClick={() => onBookService(service.title)}
              className="w-full rounded-full bg-[#0A1628] px-7 py-4 font-bold text-white transition-colors hover:bg-[#1E4ED8]"
            >
              Request This Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}