import { ClipboardCheck, FileText, HardHat, Handshake, Sparkles } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

const steps = [
  ['01', 'Site Visit', 'We check the location and understand the requirement clearly.', ClipboardCheck],
  ['02', 'Quotation', 'You get a simple scope, timeline and price before work starts.', FileText],
  ['03', 'Execution', 'Our team completes the work with clean site management.', HardHat],
  ['04', 'Handover', 'Final checking, finishing and clear project handover.', Handshake],
];

export function ProcessSection() {
  return (
    <section className="premium-section bg-[#07111f] py-16 lg:py-24 text-white grid-pattern">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(30,78,216,.22),transparent_32%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 items-end mb-12">
          <SectionHeader eyebrow="How We Work" title="Simple steps. Better results." text="No complicated process. We keep the project clear from first call to final handover." light />
          <div className="hidden lg:flex justify-end"><Sparkles className="text-[#1E4ED8]" size={54} /></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(([no, title, desc, Icon]: any, index) => (
            <article key={title} className={`premium-card fade-up ${index ? 'fade-up-delay-1' : ''} glass rounded-xl p-6 min-h-[250px]`}>
              <div className="flex items-center justify-between mb-10">
                <span className="text-[#1E4ED8] font-black tracking-widest">{no}</span>
                <span className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center"><Icon size={22} /></span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">{title}</h3>
              <p className="text-sm text-slate-300 leading-6 mt-3">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
