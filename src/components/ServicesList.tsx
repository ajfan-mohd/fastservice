import { ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { IconResolver } from './IconResolver';

const groups = [
  {
    title: 'Residential',
    desc: 'Villa, apartment, kitchen, painting and flooring works.',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Office',
    desc: 'Fit-out, partitions, ceiling, MEP and finishing.',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Commercial',
    desc: 'MEP, maintenance, external painting and support.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Outdoor',
    desc: 'Landscape, interlock, parking shades and exterior works.',
    img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop',
  },
];

export function ServicesList({
  services,
  onSelectService,
  onBookService,
}: {
  services: Service[];
  onSelectService: (id: string) => void;
  onBookService: (name: string) => void;
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-[#1E4ED8]" />
              <span className="text-xs font-black uppercase tracking-[0.28em] text-[#1E4ED8]">Services</span>
            </div>
            <h2 className="text-[34px] font-black leading-[1] tracking-[-0.045em] text-[#07111f] sm:text-[46px] lg:text-[56px]">
              Services Built
              <br />
              Around Your Needs
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-600 lg:ml-auto">
            From renovation and MEP works to maintenance and outdoor projects,
            explore our complete range of services and choose the support your
            property needs.
          </p>
        </div>

        <div className="mb-14">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-[0.22em] text-[#07111f]">Service Categories</h3>
            <span className="hidden text-sm text-slate-500 sm:block">Main areas we work on</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g, i) => (
              <article key={g.title} className="group relative h-[290px] overflow-hidden rounded-xl bg-[#07111f] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(7,17,31,0.20)] lg:h-[315px]">
                <img src={g.img} alt={g.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/95 via-[#07111f]/30 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-[#1E4ED8] px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg">Category 0{i + 1}</span>
                <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-all duration-500 group-hover:-translate-y-1">
                  <h3 className="text-3xl font-black tracking-[-0.04em]">{g.title}</h3>
                  <p className="mt-3 max-w-[260px] text-sm leading-6 text-white/75">{g.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-[#f6f8fb] p-4 lg:p-7">
          <div className="mb-7 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#1E4ED8]">All Services</p>
              <h3 className="text-[28px] font-black leading-none tracking-[-0.04em] text-[#07111f] lg:text-[40px]">Select what you need</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">Click details to open the inner service page or enquire directly from the card.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#1E4ED8]/30 hover:shadow-xl">
                <div className="relative h-52 overflow-hidden">
                  <img src={s.imageUrl} alt={s.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/80 via-[#07111f]/10 to-transparent" />
                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1E4ED8] shadow-lg"><IconResolver name={s.iconName} className="h-5 w-5" /></span>
                  <span className="absolute right-4 top-4 rounded-full bg-[#1E4ED8] px-3 py-1 text-xs font-bold text-white">{s.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-black tracking-[-0.02em] text-[#07111f]">{s.title}</h3>
                  <p className="mb-5 text-sm leading-6 text-slate-600">{s.shortDescription}</p>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => onSelectService(s.id)} className="inline-flex items-center gap-2 rounded-full bg-[#07111f] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1E4ED8]">Details <ArrowRight size={15} /></button>
                    <button onClick={() => onBookService(s.title)} className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#1E4ED8] hover:text-[#1E4ED8]">Enquire</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
