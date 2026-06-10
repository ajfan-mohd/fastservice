import { GalleryItem } from '../types';

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 lg:mb-11">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-10 bg-[#1E4ED8]" />
            <span className="text-xs font-black uppercase tracking-[0.28em] text-[#1E4ED8]">
              Our Projects
            </span>
          </div>

          <h2 className="text-[32px] font-extrabold leading-none tracking-[-0.045em] text-[#07111f] lg:text-[48px]">
            Selected Work
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
            A simple look at our renovation, MEP, maintenance and fit-out work
            across homes, offices and commercial spaces.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.slice(0, 3).map((item, index) => (
            <article
              key={item.id}
              className="group relative h-[300px] overflow-hidden rounded-xl bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:h-[330px]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                width={800}
                height={600}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-all duration-300 group-hover:-translate-y-1">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#93c5fd]">
                  {item.category}
                </p>

                <h3 className="max-w-md text-xl font-extrabold leading-tight lg:text-2xl">
                  {item.title}
                </h3>

                <p
                  className={`mt-3 max-w-md text-sm leading-6 text-white/70 transition-all duration-300 ${
                    index === 0
                      ? 'opacity-100'
                      : 'max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100'
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {items.length > 3 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.slice(3, 7).map((item) => (
              <article
                key={item.id}
                className="group relative h-[250px] overflow-hidden rounded-xl bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white transition-all duration-300 group-hover:-translate-y-1">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#93c5fd]">
                    {item.category}
                  </p>

                  <h3 className="text-lg font-extrabold leading-tight">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}