import { useState, useEffect } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Service, SiteConfig } from '../types';
import { addBooking } from '../data.supabase';

export function ContactForm({
  siteConfig,
  services,
  prefilledServiceName,
  onBookingSubmitted,
}: {
  siteConfig: SiteConfig;
  services: Service[];
  prefilledServiceName?: string | null;
  onBookingSubmitted: () => void | Promise<void>;
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  });

  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledServiceName) {
      setForm((f) => ({ ...f, serviceType: prefilledServiceName }));
    }
  }, [prefilledServiceName]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await addBooking(form);

      setForm({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        message: '',
      });

      await onBookingSubmitted();

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error('Booking submit error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber =
    siteConfig.whatsappNumber?.replace(/[^\d]/g, '') || '971XXXXXXXX';

  const contactItems = [
    ['Phone', siteConfig.phone, Phone],
    ['Email', siteConfig.email, Mail],
    ['Location', siteConfig.address, MapPin],
  ];

  return (
    <section
      id="contact-section"
      className="premium-section grid-pattern bg-[#07111f] py-16 text-white lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(30,78,216,.22),transparent_30%),linear-gradient(135deg,#07111f,#0d1b2f)]" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div className="fade-up">
          <p className="eyebrow">Contact</p>

          <h2 className="display-title text-white">
            Start with a free quote.
          </h2>

          <p className="mb-8 mt-6 max-w-xl leading-8 text-slate-300">
            Send your requirement and the Fast Service team will contact you for
            site visit, quotation or maintenance support.
          </p>

          <div className="space-y-4">
            {contactItems.map(([label, value, Icon]: any) => (
              <div
                key={label}
                className="premium-card glass flex items-start gap-4 rounded-xl p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E4ED8]">
                  <Icon size={21} />
                </span>

                <div>
                  <b>{label}</b>
                  <p className="mt-1 text-sm text-slate-300">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-black text-white hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            WhatsApp Now
          </a>
        </div>

        <form
          onSubmit={submit}
          className="premium-card fade-up fade-up-delay-2 space-y-4 rounded-xl border border-white/10 bg-white p-6 text-slate-900 shadow-2xl lg:p-8"
        >
          <div className="mb-2">
            <h3 className="text-2xl font-black tracking-tight">
              Project Enquiry
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Fill this form. We will contact you soon.
            </p>
          </div>

          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700">
              Request submitted successfully. Our team will contact you soon.
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#1E4ED8]"
            />

            <input
              required
              placeholder="Phone / WhatsApp"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#1E4ED8]"
            />
          </div>

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#1E4ED8]"
          />

          <select
            required
            value={form.serviceType}
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#1E4ED8]"
          >
            <option value="">Select service</option>

            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>

          <textarea
            required
            placeholder="Project details"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="min-h-36 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-[#1E4ED8]"
          />

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#1E4ED8] p-4 font-black text-white hover:bg-[#07111f] hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>
    </section>
  );
}