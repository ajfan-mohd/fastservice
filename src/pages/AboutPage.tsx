import { SiteConfig, Testimonial } from '../types';
import { CeoNote } from '../components/CeoNote';
export function AboutPage({
  siteConfig,
  testimonials,
  onNavigate,
}: {
  siteConfig: SiteConfig;
  testimonials: Testimonial[];
  onNavigate: (page: string) => void;
}) {
  return (
    <>
      <section className="min-h-[82vh] bg-[#07111f] pt-32 pb-20 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-[#1E4ED8]">
              About Fast Service
            </p>

            <h1 className="text-[38px] font-extrabold leading-[1] tracking-[-0.045em] sm:text-[50px] lg:text-[62px]">
              We make property work easier.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/70">
              Fast Service Contracting LLc helps property owners,
              tenants, offices and building managers handle renovation,
              maintenance and MEP work with less stress.
            </p>

            <button
              onClick={() => onNavigate('contact')}
              className="mt-10 rounded-full bg-[#1E4ED8] px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-[#07111f]"
            >
              Talk to our team
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop"
            alt="Fast Service work"
            className="h-[520px] w-full rounded-xl object-cover"
          />
        </div>
      </section>
  <CeoNote /> 
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-[#1E4ED8]">
            Our Story
          </p>

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#07111f] lg:text-[48px]">
              From small maintenance jobs to complete project support.
            </h2>

            <div className="space-y-6 text-lg leading-8 text-slate-600">
              <p>
                We started by solving everyday property problems: electrical
                repairs, plumbing work, AC issues, painting and maintenance.
              </p>

              <p>
                Over time, clients trusted us with bigger scopes — villa
                renovation, office fit-out, building MEP, flooring, joinery,
                landscaping and outdoor works.
              </p>

              <p>
                Today, our focus is still the same: clear communication,
                practical solutions and clean finishing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-[#1E4ED8]">
            How We Are Different
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', 'Simple Language', 'We explain the work clearly without confusing technical words.'],
              ['02', 'Single Team', 'You do not need to manage different people for every small work.'],
              ['03', 'Neat Work', 'We care about site cleanliness, finishing and final handover.'],
              ['04', 'Fast Response', 'We support urgent maintenance needs when quick action matters.'],
            ].map(([num, title, text]) => (
              <div key={title} className="rounded-xl bg-white p-7 shadow-sm">
                <span className="text-sm font-black text-[#1E4ED8]">
                  {num}
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-[#07111f]">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111f] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1E4ED8]">
              Our Foundation
            </p>

            <h2 className="mt-4 text-[32px] font-extrabold tracking-[-0.04em] lg:text-[48px]">
              Mission, Vision & Values
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              [
                'Mission',
                'Deliver Reliable Solutions',
                'To provide reliable, high-quality, and affordable contracting services that help clients complete their projects with confidence.',
              ],
              [
                'Vision',
                "Become UAE's Trusted Partner",
                "To become one of the trusted contracting companies in the UAE, known for quality work, timely delivery, and professional service.",
              ],
              [
                'Values',
                'Built On Integrity',
                'We believe in honesty, accountability, safety, respect and delivering every project with professionalism and attention to detail.',
              ],
            ].map(([label, title, text]) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/5 p-8"
              >
                <span className="text-sm font-black uppercase tracking-[0.2em] text-[#1E4ED8]">
                  {label}
                </span>

                <h3 className="mt-4 text-2xl font-extrabold">{title}</h3>

                <p className="mt-4 leading-8 text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop"
            alt="Renovation"
            className="h-[520px] w-full rounded-xl object-cover"
          />

          <div className="flex flex-col justify-center">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-[#1E4ED8]">
              What We Handle
            </p>

            <h2 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#07111f] lg:text-[48px]">
              One team for many property needs.
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Electrical Works',
                'Plumbing Works',
                'AC & Ventilation',
                'Villa Renovation',
                'Office Fit-Out',
                'Painting Works',
                'Flooring Works',
                'Landscaping',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-800"
                >
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="mt-10 w-fit rounded-full bg-[#07111f] px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#1E4ED8]"
            >
              View Services
            </button>
          </div>
        </div>
      </section>
    </>
  );
}