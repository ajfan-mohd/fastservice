import { useState, useEffect } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Service, SiteConfig } from '../types';
import { addBooking } from '../data';

export function ContactForm({ siteConfig, services, prefilledServiceName, onBookingSubmitted }: { siteConfig: SiteConfig; services: Service[]; prefilledServiceName?: string | null; onBookingSubmitted:()=>void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', serviceType: '', message: '' });
  useEffect(() => { if (prefilledServiceName) setForm(f => ({ ...f, serviceType: prefilledServiceName })); }, [prefilledServiceName]);
  const submit = (e: any) => { e.preventDefault(); addBooking(form); setForm({ name: '', email: '', phone: '', serviceType: '', message: '' }); onBookingSubmitted(); alert('Request saved. The team can view it in Admin.'); };
  const contactItems = [['Phone', siteConfig.phone, Phone], ['Email', siteConfig.email, Mail], ['Location', siteConfig.address, MapPin]];

  return (
    <section id="contact-section" className="premium-section grid-pattern py-16 lg:py-24 bg-[#07111f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(30,78,216,.22),transparent_30%),linear-gradient(135deg,#07111f,#0d1b2f)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-start">
        <div className="fade-up">
          <p className="eyebrow">Contact</p>
          <h2 className="display-title text-white">Start with a free quote.</h2>
          <p className="text-slate-300 leading-8 mb-8 max-w-xl mt-6">Send your requirement and the Fast Service team will contact you for site visit, quotation or maintenance support.</p>
          <div className="space-y-4">
            {contactItems.map(([label, value, Icon]: any) => <div key={label} className="glass rounded-xl p-5 flex gap-4 items-start premium-card">
              <span className="h-12 w-12 rounded-xl bg-[#1E4ED8] flex items-center justify-center shrink-0"><Icon size={21}/></span>
              <div><b>{label}</b><p className="text-slate-300 text-sm mt-1">{value}</p></div>
            </div>)}
          </div>
          <a className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#25D366] text-white rounded-full font-black hover:scale-105 hover:shadow-lg hover:shadow-green-500/20" href="https://wa.me/971XXXXXXXX" target="_blank"><MessageCircle size={18}/> WhatsApp Now</a>
        </div>
        <form onSubmit={submit} className="premium-card fade-up fade-up-delay-2 bg-white text-slate-900 rounded-xl p-6 lg:p-8 space-y-4 border border-white/10 shadow-2xl">
          <div className="mb-2"><h3 className="text-2xl font-black tracking-tight">Project Enquiry</h3><p className="text-slate-500 text-sm mt-1">Fill this form. We will contact you soon.</p></div>
          <div className="grid sm:grid-cols-2 gap-4"><input required placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#1E4ED8]"/><input required placeholder="Phone / WhatsApp" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#1E4ED8]"/></div>
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#1E4ED8]"/>
          <select required value={form.serviceType} onChange={e => setForm({ ...form, serviceType: e.target.value })} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-[#1E4ED8]"><option value="">Select service</option>{services.map(s => <option key={s.id}>{s.title}</option>)}</select>
          <textarea required placeholder="Project details" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 min-h-36 outline-none focus:border-[#1E4ED8]"/>
          <button className="w-full p-4 bg-[#1E4ED8] text-white rounded-xl font-black hover:bg-[#07111f] hover:shadow-lg hover:shadow-blue-500/20">Send Request</button>
        </form>
      </div>
    </section>
  );
}
