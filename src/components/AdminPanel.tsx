import React, { useState } from 'react';
import {
  Service,
  GalleryItem,
  Booking,
  SiteConfig,
  Testimonial,
  ClientLogo,
} from '../types';

import {
  addService,
  updateService,
  deleteService,
  addGalleryItem,
  deleteGalleryItem,
  updateBookingStatus,
  deleteBooking,
  saveSiteConfig,
  addTestimonial,
  deleteTestimonial,
  addClient,
  deleteClient,
  uploadWebsiteImage,
} from '../data.supabase';

import { AVAILABLE_ICONS } from './IconResolver';
import {
  FolderLock,
  Wrench,
  Image as ImageIcon,
  Settings,
  Users,
  Trash2,
  Edit3,
  Save,
  MessageSquareQuote,
  Building2,
  Plus,
  LogOut,
  Phone,
  Mail,
  Sparkles,
   GripVertical,
  X,
} from 'lucide-react';

interface AdminPanelProps {
  services: Service[];
  galleryItems: GalleryItem[];
  bookings: Booking[];
  siteConfig: SiteConfig;
  testimonials: Testimonial[];
  clients: ClientLogo[];
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  services,
  galleryItems,
  bookings,
  siteConfig,
  testimonials,
  clients,
  onRefreshData,
}) => {
  type AdminTab =
    | 'bookings'
    | 'services'
    | 'gallery'
    | 'config'
    | 'testimonials'
    | 'clients';

  const [activeTab, setActiveTabState] = useState<AdminTab>(() => {
    return (localStorage.getItem('admin_active_tab') as AdminTab) || 'bookings';
  });

  const setActiveTab = (tab: AdminTab) => {
    localStorage.setItem('admin_active_tab', tab);
    setActiveTabState(tab);
  };

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Electrical');
  const [serviceShortDesc, setServiceShortDesc] = useState('');
  const [serviceLongDesc, setServiceLongDesc] = useState('');
  const [servicePriceInfo, setServicePriceInfo] = useState('');
  const [serviceIcon, setServiceIcon] = useState('Zap');
 const [serviceFeatures, setServiceFeatures] = useState<
  { title: string; description: string }[]
>([{ title: '', description: '' }]);
  const [serviceRequirements, setServiceRequirements] = useState('');

  // Up to 4 gallery photos for the service detail page, each with a caption.
  // images[0] also doubles as the cover photo (imageUrl) used in listing cards.
  const [serviceImages, setServiceImages] = useState<{ url: string; caption: string }[]>([]);

  const [gTitle, setGTitle] = useState('');
  const [gDesc, setGDesc] = useState('');
  const [gCategory, setGCategory] = useState('Renovation');
  const [gImage, setGImage] = useState('');

  const [clientName, setClientName] = useState('');
  const [clientLogo, setClientLogo] = useState('');

  const [tAuthor, setTAuthor] = useState('');
  const [tDesignation, setTDesignation] = useState('');
  const [tCompany, setTCompany] = useState('');
  const [tComment, setTComment] = useState('');
  const [tRating, setTRating] = useState(5);
  const [tCategory, setTCategory] = useState('Renovation');

  const [cfgTagline, setCfgTagline] = useState(siteConfig.tagline);
  const [cfgPhone, setCfgPhone] = useState(siteConfig.phone);
  const [cfgEmail, setCfgEmail] = useState(siteConfig.email);
  const [cfgAddress, setCfgAddress] = useState(siteConfig.address);
  const [cfgHours, setCfgHours] = useState(siteConfig.workingHours);
  const [cfgInsta, setCfgInsta] = useState(siteConfig.instagramUrl);
  const [cfgAbout, setCfgAbout] = useState(siteConfig.aboutText);

  const [bookingAdminNotes, setBookingAdminNotes] = useState<Record<string, string>>({});
  const [cfgHeroEyebrow, setCfgHeroEyebrow] = useState(siteConfig.heroEyebrow);
  const [cfgHeroTitle, setCfgHeroTitle] = useState(siteConfig.heroTitle);
  const [cfgHeroSubtitle, setCfgHeroSubtitle] = useState(siteConfig.heroSubtitle);
  const [cfgHeroImage, setCfgHeroImage] = useState(siteConfig.heroImage);
  const [cfgWhatsapp, setCfgWhatsapp] = useState(siteConfig.whatsappNumber);

  const handleStartEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setServiceTitle(service.title);
    setServiceCategory(service.category);
    setServiceShortDesc(service.shortDescription);
    setServiceLongDesc(service.longDescription);
    setServicePriceInfo(service.priceInfo);
    setServiceIcon(service.iconName);
    setServiceFeatures(
  service.features?.length
    ? service.features.map((feature) => {
        const [title, ...descriptionParts] = feature.split('|');

        return {
          title: title.trim(),
          description: descriptionParts.join('|').trim(),
        };
      })
    : [{ title: '', description: '' }]
);
    setServiceRequirements((service.requirements || []).join('\n'));
    setServiceImages(
      service.images?.length
        ? service.images
        : service.imageUrl
        ? [{ url: service.imageUrl, caption: service.title }]
        : []
    );
  };

  const handleCancelServiceEdit = () => {
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceShortDesc('');
    setServiceLongDesc('');
    setServicePriceInfo('');
   setServiceFeatures([{ title: '', description: '' }]);
    setServiceRequirements('');
    setServiceImages([]);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();

   const parsedFeatures = serviceFeatures
  .filter((feature) => feature.title.trim())
  .map((feature) => {
    const title = feature.title.trim();
    const description = feature.description.trim();

    return description ? `${title}|${description}` : title;
  });

    const parsedRequirements = serviceRequirements
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const payload = {
      title: serviceTitle,
      category: serviceCategory,
      shortDescription: serviceShortDesc,
      longDescription: serviceLongDesc || serviceShortDesc,
      priceInfo: servicePriceInfo || 'Contact us for quotation',
      features: parsedFeatures,
      requirements: parsedRequirements,
      images: serviceImages,
      imageUrl: serviceImages[0]?.url || 'https://picsum.photos/seed/service/900/600',
      iconName: serviceIcon,
    };

    if (editingServiceId) {
      await updateService(editingServiceId, payload);
    } else {
      await addService(payload);
    }

    handleCancelServiceEdit();
    await onRefreshData();
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await deleteService(id);
    await onRefreshData();
  };

  const handleServiceImageUpload = async (file: File) => {
    const url = await uploadWebsiteImage(file, 'services');
    setServiceImages((prev) => [...prev, { url, caption: '' }]);
  };

  const handleServiceImageCaptionChange = (index: number, caption: string) => {
    setServiceImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, caption } : img))
    );
  };

  const handleServiceImageRemove = (index: number) => {
    setServiceImages((prev) => prev.filter((_, i) => i !== index));
  };

  
   const handleServiceImageSetCover = (index: number) => {
    setServiceImages((prev) => {
      if (index === 0) return prev;
      const updated = [...prev];
      const [selected] = updated.splice(index, 1);
      return [selected, ...updated];
    });
  };

  const [orderedServices, setOrderedServices] = useState<Service[]>(services);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  React.useEffect(() => {
    setOrderedServices(services);
  }, [services]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setOrderedServices((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(draggedIndex, 1);
      updated.splice(index, 0, moved);
      return updated;
    });
    setDraggedIndex(index);
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);

    await Promise.all(
      orderedServices.map((service, index) =>
        updateService(service.id, { position: index })
      )
    );

    await onRefreshData();
  };

    
const handleFeatureChange = (
  index: number,
  field: 'title' | 'description',
  value: string
) => {
  setServiceFeatures((prev) =>
    prev.map((feature, i) =>
      i === index ? { ...feature, [field]: value } : feature
    )
  );
};

const handleAddFeature = () => {
  setServiceFeatures((prev) => [
    ...prev,
    { title: '', description: '' },
  ]);
};

const handleRemoveFeature = (index: number) => {
  setServiceFeatures((prev) => {
    const updated = prev.filter((_, i) => i !== index);

    return updated.length
      ? updated
      : [{ title: '', description: '' }];
  });
};
  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();

    await addGalleryItem({
      title: gTitle,
      description: gDesc || 'Project image',
      category: gCategory,
      imageUrl: gImage,
    });

    setGTitle('');
    setGDesc('');
    setGImage('');
    await onRefreshData();
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Delete this gallery image?')) return;
    await deleteGalleryItem(id);
    await onRefreshData();
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();

    await addClient({
      name: clientName,
      logo: clientLogo,
    });

    setClientName('');
    setClientLogo('');
    await onRefreshData();
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Delete this client logo?')) return;
    await deleteClient(id);
    await onRefreshData();
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();

    await addTestimonial({
      author: tAuthor,
      designation: tDesignation || 'Client',
      company: tCompany || undefined,
      comment: tComment,
      rating: tRating,
      serviceCategory: tCategory,
    });

    setTAuthor('');
    setTDesignation('');
    setTCompany('');
    setTComment('');
    setTRating(5);
    await onRefreshData();
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await deleteTestimonial(id);
    await onRefreshData();
  };

  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    await updateBookingStatus(id, status, bookingAdminNotes[id] || '');
    await onRefreshData();
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    await deleteBooking(id);
    await onRefreshData();
  };

  const handleSaveConfig = async () => {
    await saveSiteConfig({
      ...siteConfig,
      tagline: cfgTagline,
      phone: cfgPhone,
      email: cfgEmail,
      address: cfgAddress,
      workingHours: cfgHours,
      instagramUrl: cfgInsta,
      aboutText: cfgAbout,
      heroEyebrow: cfgHeroEyebrow,
      heroTitle: cfgHeroTitle,
      heroSubtitle: cfgHeroSubtitle,
      heroImage: cfgHeroImage,
      whatsappNumber: cfgWhatsapp,
    });

    await onRefreshData();
  };

  const tabs = [
    ['bookings', 'Client Inquiries', Users, bookings.length],
    ['services', 'Services', Wrench, services.length],
    ['gallery', 'Gallery', ImageIcon, galleryItems.length],
    ['clients', 'Client Logos', Building2, clients.length],
    ['testimonials', 'Testimonials', MessageSquareQuote, testimonials.length],
    ['config', 'Site Settings', Settings, null],
  ] as const;

  // Purely presentational helper — status → accent color, no logic change.
  const statusStyles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
    reviewed: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
    completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20';

  return (
    <div className="min-h-screen bg-slate-100 pt-20 sm:pt-24">
      {/* Top bar */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
              <FolderLock size={12} />
              Admin Control Panel
            </span>
            <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">
              Fast Service Dashboard
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Manage services, gallery, bookings, testimonials, client logos and website settings.
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('admin_logged_in');
              window.location.href = '/admin';
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600/90 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-red-600"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="h-fit space-y-1 rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-6 lg:col-span-3">
            {tabs.map(([key, label, Icon, count]) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`group flex w-full items-center justify-between rounded-lg border-l-4 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider transition ${
                    isActive
                      ? 'border-amber-500 bg-slate-900 text-white shadow-sm'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon size={15} className={isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-500'} />
                    {label}
                  </span>

                  {count !== null && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        isActive ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main content */}
          <main className="min-h-[500px] rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-9">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Client Inquiries</h2>
                  <span className="text-xs font-semibold text-slate-400">{bookings.length} total</span>
                </div>

                {bookings.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-14 text-center text-sm text-slate-400">
                    No leads yet.
                  </div>
                )}

                {bookings.map((booking) => (
                  <div key={booking.id} className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-5 py-4">
                      <div>
                        <h3 className="font-black uppercase tracking-tight text-slate-900">{booking.name}</h3>
                        <p className="text-xs font-bold text-blue-600">
                          {booking.serviceType}
                        </p>
                      </div>

                      <span className={`h-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[booking.status] || 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200'}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid gap-5 p-5 md:grid-cols-2">
                      <div className="space-y-1.5 text-sm text-slate-600">
                        <p className="flex items-center gap-2"><Phone size={13} className="text-slate-400" /> {booking.phone}</p>
                        <p className="flex items-center gap-2"><Mail size={13} className="text-slate-400" /> {booking.email}</p>
                        <p className="mt-3 rounded-lg bg-slate-50 p-3 italic text-slate-500">"{booking.message}"</p>
                      </div>

                      <div>
                        <textarea
                          rows={3}
                          value={bookingAdminNotes[booking.id] ?? booking.adminNotes ?? ''}
                          onChange={(e) =>
                            setBookingAdminNotes({
                              ...bookingAdminNotes,
                              [booking.id]: e.target.value,
                            })
                          }
                          placeholder="Admin notes"
                          className={inputClass}
                        />

                        <div className="mt-3 flex flex-wrap gap-2">
                          <button onClick={() => handleUpdateBookingStatus(booking.id, 'pending')} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-amber-400 hover:text-amber-700">Pending</button>
                          <button onClick={() => handleUpdateBookingStatus(booking.id, 'reviewed')} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-700">Reviewed</button>
                          <button onClick={() => handleUpdateBookingStatus(booking.id, 'completed')} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-emerald-400 hover:text-emerald-700">Completed</button>
                          <button onClick={() => handleDeleteBooking(booking.id)} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700">
                            <Trash2 size={12} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Services Manager</h2>
                  <span className="text-xs font-semibold text-slate-400">{services.length} total</span>
                </div>

                <form onSubmit={handleSaveService} className="space-y-5 rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber-600">
                    <Sparkles size={13} />
                    {editingServiceId ? 'Editing service' : 'New service'}
                  </div>

                  <input required value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} placeholder="Service title" className={inputClass} />

                  <div className="grid gap-4 md:grid-cols-3">
                    <input value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} placeholder="Category" className={inputClass} />

                    {/* <select value={serviceIcon} onChange={(e) => setServiceIcon(e.target.value)} className={inputClass}>
                      {AVAILABLE_ICONS.map((icon) => (
                        <option key={icon.name} value={icon.name}>{icon.name}</option>
                      ))}
                    </select> */}

                    <input value={servicePriceInfo} onChange={(e) => setServicePriceInfo(e.target.value)} placeholder="Price info" className={inputClass} />
                  </div>

                  <input required value={serviceShortDesc} onChange={(e) => setServiceShortDesc(e.target.value)} placeholder="Short description" className={inputClass} />

                  <textarea value={serviceLongDesc} onChange={(e) => setServiceLongDesc(e.target.value)} placeholder="Long description (shown on the service detail page)" className={inputClass} rows={4} />

                  {/* Photo gallery: up to 4 images, each with an optional caption */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                      Service Photos ({serviceImages.length}/4) — first photo is used as the cover image
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      
                      {serviceImages.map((img, index) => (
                        <div key={index} className="space-y-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                          <div className="relative">
                            <img
                              src={img.url}
                              alt={img.caption || 'Service photo'}
                              className="h-32 w-full rounded-lg border border-slate-200 object-cover"
                            />
                            {index === 0 && (
                              <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm">
                                Cover
                              </span>
                            )}
                          </div>
                          
                          <input
                            value={img.caption}
                            onChange={(e) => handleServiceImageCaptionChange(index, e.target.value)}
                            placeholder="Caption for this photo"
                            className={`${inputClass} text-xs`}
                          />
                            {index !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleServiceImageSetCover(index)}
                              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-amber-400 py-1.5 text-xs font-bold text-amber-600 transition hover:bg-amber-50"
                            >
                              Set as Cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleServiceImageRemove(index)}
                            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-600 py-1.5 text-xs font-bold text-white transition hover:bg-red-700"
                          >
                            <X size={12} />
                            Remove Photo
                          </button>
                        </div>
                      ))}

                      {serviceImages.length < 4 && (
                        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center">
                          <ImageIcon size={20} className="text-slate-300" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              await handleServiceImageUpload(file);
                              e.target.value = '';
                            }}
                            className="w-full text-xs"
                          />
                          <p className="text-[10px] text-slate-400">
                            {4 - serviceImages.length} more photo{4 - serviceImages.length === 1 ? '' : 's'} allowed
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                <div className="space-y-4">
  <div className="flex items-center justify-between">
    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
      What's Included
    </label>

    <button
      type="button"
      onClick={handleAddFeature}
      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
    >
      <Plus size={13} />
      Add Feature
    </button>
  </div>

  <div className="space-y-4">
    {serviceFeatures.map((feature, index) => (
      <div
        key={index}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Feature {index + 1}
          </p>

          <button
            type="button"
            onClick={() => handleRemoveFeature(index)}
            className="text-xs font-bold text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>

        <div className="space-y-3">
          <input
            value={feature.title}
            onChange={(e) =>
              handleFeatureChange(index, 'title', e.target.value)
            }
            placeholder="Feature title"
            className={inputClass}
          />

          <textarea
            value={feature.description}
            onChange={(e) =>
              handleFeatureChange(index, 'description', e.target.value)
            }
            placeholder="Short description"
            rows={3}
            className={inputClass}
          />
        </div>
      </div>
    ))}
  </div>
</div>

                  <textarea value={serviceRequirements} onChange={(e) => setServiceRequirements(e.target.value)} placeholder="What the customer needs to provide/have ready, one per line" className={inputClass} />

                  <div className="flex gap-2 pt-1">
                    <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600">
                      <Save size={14} />
                      {editingServiceId ? 'Save Service' : 'Add Service'}
                    </button>

                    {editingServiceId && (
                      <button type="button" onClick={handleCancelServiceEdit} className="rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-300">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <div className="grid gap-4 md:grid-cols-2">
                  {orderedServices.map((service, index) => (
                    <div
                      key={service.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 shadow-sm transition hover:border-slate-300 hover:shadow ${
                        draggedIndex === index ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="cursor-grab text-slate-300 hover:text-slate-500 active:cursor-grabbing">
                          <GripVertical size={16} />
                        </span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">{service.title}</h3>
                          <p className="text-xs font-semibold text-blue-600">{service.category}</p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            {service.images?.length || (service.imageUrl ? 1 : 0)} photo(s)
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button onClick={() => handleStartEditService(service)} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-amber-300 hover:text-amber-600">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDeleteService(service.id)} className="rounded-lg border border-slate-200 p-2 text-red-500 transition hover:border-red-300 hover:bg-red-50">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Gallery Manager</h2>
                  <span className="text-xs font-semibold text-slate-400">{galleryItems.length} total</span>
                </div>

                <form onSubmit={handleAddGalleryItem} className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
                  <input required value={gTitle} onChange={(e) => setGTitle(e.target.value)} placeholder="Image title" className={inputClass} />
                  <input value={gCategory} onChange={(e) => setGCategory(e.target.value)} placeholder="Category" className={inputClass} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const url = await uploadWebsiteImage(file, 'gallery');
                      setGImage(url);
                    }}
                    className="w-full rounded-lg border border-dashed border-slate-300 bg-white p-2 text-sm"
                  />

                  {gImage && (
                    <img
                      src={gImage}
                      alt="Gallery preview"
                      className="h-32 w-full rounded-lg border border-slate-200 object-cover"
                    />
                  )}
                  <input value={gDesc} onChange={(e) => setGDesc(e.target.value)} placeholder="Description" className={inputClass} />

                  <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600">
                    <Plus size={14} />
                    Add Gallery Image
                  </button>
                </form>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200 shadow-sm transition hover:shadow">
                      <img src={item.imageUrl} alt={item.title} className="h-28 w-full object-cover" />
                      <div className="p-3">
                        <p className="text-xs font-bold text-slate-800">{item.title}</p>
                        <button onClick={() => handleDeleteGalleryItem(item.id)} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-600 py-1.5 text-xs font-bold text-white transition hover:bg-red-700">
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'clients' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Client Logos</h2>
                  <span className="text-xs font-semibold text-slate-400">{clients.length} total</span>
                </div>

                <form onSubmit={handleAddClient} className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
                  <input required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client name" className={inputClass} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const url = await uploadWebsiteImage(file, 'clients');
                      setClientLogo(url);
                    }}
                    className="w-full rounded-lg border border-dashed border-slate-300 bg-white p-2 text-sm"
                  />

                  {clientLogo && (
                    <img
                      src={clientLogo}
                      alt="Client logo preview"
                      className="h-16 object-contain"
                    />
                  )}

                  <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600">
                    <Plus size={14} />
                    Add Client Logo
                  </button>
                </form>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {clients.map((client) => (
                    <div key={client.id} className="rounded-xl border border-slate-200 p-4 text-center shadow-sm transition hover:shadow">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="mx-auto h-16 max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <p className="mt-3 text-sm font-bold text-slate-800">{client.name}</p>
                      <button onClick={() => handleDeleteClient(client.id)} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-600 py-1.5 text-xs font-bold text-white transition hover:bg-red-700">
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Testimonials Manager</h2>
                  <span className="text-xs font-semibold text-slate-400">{testimonials.length} total</span>
                </div>

                <form onSubmit={handleAddTestimonial} className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
                  <input required value={tAuthor} onChange={(e) => setTAuthor(e.target.value)} placeholder="Author" className={inputClass} />
                  <input value={tDesignation} onChange={(e) => setTDesignation(e.target.value)} placeholder="Designation" className={inputClass} />
                  <input value={tCompany} onChange={(e) => setTCompany(e.target.value)} placeholder="Company" className={inputClass} />
                  <input value={tCategory} onChange={(e) => setTCategory(e.target.value)} placeholder="Service category" className={inputClass} />

                  <select value={tRating} onChange={(e) => setTRating(Number(e.target.value))} className={inputClass}>
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>

                  <textarea required value={tComment} onChange={(e) => setTComment(e.target.value)} placeholder="Comment" className={inputClass} />

                  <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600">
                    <Plus size={14} />
                    Add Testimonial
                  </button>
                </form>

                <div className="grid gap-4 md:grid-cols-2">
                  {testimonials.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-200 p-4 shadow-sm transition hover:shadow">
                      <p className="text-sm italic text-slate-600">"{item.comment}"</p>
                      <p className="mt-2 text-xs font-bold text-slate-800">— {item.author}</p>
                      <button onClick={() => handleDeleteTestimonial(item.id)} className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700">
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'config' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Site Settings</h2>
                </div>

                <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
                  <input value={cfgTagline} onChange={(e) => setCfgTagline(e.target.value)} placeholder="Tagline" className={inputClass} />
                  <input value={cfgPhone} onChange={(e) => setCfgPhone(e.target.value)} placeholder="Phone" className={inputClass} />
                  <input value={cfgEmail} onChange={(e) => setCfgEmail(e.target.value)} placeholder="Email" className={inputClass} />
                  <input value={cfgAddress} onChange={(e) => setCfgAddress(e.target.value)} placeholder="Address" className={inputClass} />
                  <input value={cfgHours} onChange={(e) => setCfgHours(e.target.value)} placeholder="Working hours" className={inputClass} />
                  <input value={cfgInsta} onChange={(e) => setCfgInsta(e.target.value)} placeholder="Instagram URL" className={inputClass} />
                  <input value={cfgWhatsapp} onChange={(e) => setCfgWhatsapp(e.target.value)} placeholder="WhatsApp Number" className={inputClass} />

                  <div className="rounded-lg border border-slate-200 bg-white p-5">
                    <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-800">Hero Section</h3>

                    <input value={cfgHeroEyebrow} onChange={(e) => setCfgHeroEyebrow(e.target.value)} placeholder="Hero Eyebrow" className={`${inputClass} mb-3`} />

                    <input value={cfgHeroTitle} onChange={(e) => setCfgHeroTitle(e.target.value)} placeholder="Hero Title" className={`${inputClass} mb-3`} />

                    <textarea value={cfgHeroSubtitle} onChange={(e) => setCfgHeroSubtitle(e.target.value)} placeholder="Hero Subtitle" className={`${inputClass} mb-3`} />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const url = await uploadWebsiteImage(file, 'hero');
                        setCfgHeroImage(url);
                      }}
                      className="w-full rounded-lg border border-dashed border-slate-300 p-2 text-sm"
                    />

                    {cfgHeroImage && (
                      <img
                        src={cfgHeroImage}
                        alt="Hero preview"
                        className="mt-3 h-40 w-full rounded-lg border border-slate-200 object-cover"
                      />
                    )}
                  </div>

                  <textarea value={cfgAbout} onChange={(e) => setCfgAbout(e.target.value)} placeholder="About text" className={inputClass} />

                  <button onClick={handleSaveConfig} className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800">
                    <Save size={14} />
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};