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
  const [serviceFeatures, setServiceFeatures] = useState('');
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
    setServiceFeatures(service.features.join('\n'));
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
    setServiceFeatures('');
    setServiceRequirements('');
    setServiceImages([]);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedFeatures = serviceFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

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

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b-4 border-blue-600 bg-slate-900 p-6 text-white md:p-8">
          <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-blue-400">
            <FolderLock size={12} className="mr-2" />
            Admin Control Panel
          </span>

          <h1 className="mt-2 text-2xl font-black uppercase">
            Fast Service Admin Dashboard
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('admin_logged_in');
              window.location.href = '/admin';
            }}
            className="mt-4 bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
          >
            Logout
          </button>
          <p className="mt-1 text-xs text-slate-400">
            Manage services, gallery, bookings, testimonials, client logos and website settings.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="space-y-2 border border-slate-200 bg-white p-4 lg:col-span-3">
            {tabs.map(([key, label, Icon, count]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${
                  activeTab === key
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon size={14} />
                  {label}
                </span>

                {count !== null && <span>{count}</span>}
              </button>
            ))}
          </aside>

          <main className="min-h-[500px] border border-slate-200 bg-white p-6 md:p-8 lg:col-span-9">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-black uppercase">Client Inquiries</h2>

                {bookings.length === 0 && (
                  <div className="border border-dashed border-slate-300 py-14 text-center text-sm text-slate-400">
                    No leads yet.
                  </div>
                )}

                {bookings.map((booking) => (
                  <div key={booking.id} className="border p-5">
                    <div className="flex flex-wrap justify-between gap-3 border-b pb-4">
                      <div>
                        <h3 className="font-black uppercase">{booking.name}</h3>
                        <p className="text-xs font-bold text-blue-600">
                          {booking.serviceType}
                        </p>
                      </div>

                      <span className="h-fit bg-slate-900 px-3 py-1 text-xs font-bold uppercase text-white">
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="text-sm text-slate-600">
                        <p><b>Phone:</b> {booking.phone}</p>
                        <p><b>Email:</b> {booking.email}</p>
                        <p className="mt-3 italic">"{booking.message}"</p>
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
                          className="w-full border p-2 text-sm"
                        />

                        <div className="mt-3 flex flex-wrap gap-2">
                          <button onClick={() => handleUpdateBookingStatus(booking.id, 'pending')} className="border px-3 py-1 text-xs">Pending</button>
                          <button onClick={() => handleUpdateBookingStatus(booking.id, 'reviewed')} className="border px-3 py-1 text-xs">Reviewed</button>
                          <button onClick={() => handleUpdateBookingStatus(booking.id, 'completed')} className="border px-3 py-1 text-xs">Completed</button>
                          <button onClick={() => handleDeleteBooking(booking.id)} className="bg-red-600 px-3 py-1 text-xs text-white">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-8">
                <h2 className="text-xl font-black uppercase">Services Manager</h2>

                <form onSubmit={handleSaveService} className="space-y-4 border-4 border-slate-900 p-6">
                  <input required value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} placeholder="Service title" className="w-full border p-2 text-sm" />

                  <div className="grid gap-4 md:grid-cols-3">
                    <input value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} placeholder="Category" className="border p-2 text-sm" />

                    {/* <select value={serviceIcon} onChange={(e) => setServiceIcon(e.target.value)} className="border p-2 text-sm">
                      {AVAILABLE_ICONS.map((icon) => (
                        <option key={icon.name} value={icon.name}>{icon.name}</option>
                      ))}
                    </select> */}

                    <input value={servicePriceInfo} onChange={(e) => setServicePriceInfo(e.target.value)} placeholder="Price info" className="border p-2 text-sm" />
                  </div>

                  <input required value={serviceShortDesc} onChange={(e) => setServiceShortDesc(e.target.value)} placeholder="Short description" className="w-full border p-2 text-sm" />

                  <textarea value={serviceLongDesc} onChange={(e) => setServiceLongDesc(e.target.value)} placeholder="Long description (shown on the service detail page)" className="w-full border p-2 text-sm" rows={4} />

                  {/* Photo gallery: up to 4 images, each with an optional caption */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase text-slate-500">
                      Service Photos ({serviceImages.length}/4) — first photo is used as the cover image
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {serviceImages.map((img, index) => (
                        <div key={index} className="space-y-2 border p-3">
                          <div className="relative">
                            <img
                              src={img.url}
                              alt={img.caption || 'Service photo'}
                              className="h-32 w-full rounded-lg border object-cover"
                            />
                            {index === 0 && (
                              <span className="absolute left-2 top-2 bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                                Cover
                              </span>
                            )}
                          </div>
                          <input
                            value={img.caption}
                            onChange={(e) => handleServiceImageCaptionChange(index, e.target.value)}
                            placeholder="Caption for this photo"
                            className="w-full border p-2 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleServiceImageRemove(index)}
                            className="w-full bg-red-600 py-1 text-xs font-bold text-white"
                          >
                            Remove Photo
                          </button>
                        </div>
                      ))}

                      {serviceImages.length < 4 && (
                        <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-slate-300 p-4 text-center">
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

                  <textarea value={serviceFeatures} onChange={(e) => setServiceFeatures(e.target.value)} placeholder="Features, one per line" className="w-full border p-2 text-sm" />

                  <textarea value={serviceRequirements} onChange={(e) => setServiceRequirements(e.target.value)} placeholder="What the customer needs to provide/have ready, one per line" className="w-full border p-2 text-sm" />

                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 px-5 py-2 text-sm font-bold text-white">
                      {editingServiceId ? 'Save Service' : 'Add Service'}
                    </button>

                    {editingServiceId && (
                      <button type="button" onClick={handleCancelServiceEdit} className="bg-slate-200 px-5 py-2 text-sm font-bold">
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <div className="grid gap-4 md:grid-cols-2">
                  {services.map((service) => (
                    <div key={service.id} className="flex justify-between gap-4 border p-4">
                      <div>
                        <h3 className="text-sm font-black uppercase">{service.title}</h3>
                        <p className="text-xs text-slate-500">{service.category}</p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {service.images?.length || (service.imageUrl ? 1 : 0)} photo(s)
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button onClick={() => handleStartEditService(service)} className="border p-2">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDeleteService(service.id)} className="border p-2 text-red-600">
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
                <h2 className="text-xl font-black uppercase">Gallery Manager</h2>

                <form onSubmit={handleAddGalleryItem} className="space-y-4 border-4 border-slate-900 p-6">
                  <input required value={gTitle} onChange={(e) => setGTitle(e.target.value)} placeholder="Image title" className="w-full border p-2 text-sm" />
                  <input value={gCategory} onChange={(e) => setGCategory(e.target.value)} placeholder="Category" className="w-full border p-2 text-sm" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const url = await uploadWebsiteImage(file, 'gallery');
                      setGImage(url);
                    }}
                    className="w-full border p-2 text-sm"
                  />

                  {gImage && (
                    <img
                      src={gImage}
                      alt="Gallery preview"
                      className="h-32 w-full object-cover rounded-lg border"
                    />
                  )}
                  <input value={gDesc} onChange={(e) => setGDesc(e.target.value)} placeholder="Description" className="w-full border p-2 text-sm" />

                  <button type="submit" className="bg-blue-600 px-5 py-2 text-sm font-bold text-white">
                    Add Gallery Image
                  </button>
                </form>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="border p-3">
                      <img src={item.imageUrl} alt={item.title} className="h-28 w-full object-cover" />
                      <p className="mt-2 text-xs font-bold">{item.title}</p>
                      <button onClick={() => handleDeleteGalleryItem(item.id)} className="mt-2 w-full bg-red-600 py-1 text-xs text-white">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'clients' && (
              <div className="space-y-8">
                <h2 className="text-xl font-black uppercase">Client Logos</h2>

                <form onSubmit={handleAddClient} className="space-y-4 border-4 border-slate-900 p-6">
                  <input required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client name" className="w-full border p-2 text-sm" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const url = await uploadWebsiteImage(file, 'clients');
                      setClientLogo(url);
                    }}
                    className="w-full border p-2 text-sm"
                  />

                  {clientLogo && (
                    <img
                      src={clientLogo}
                      alt="Client logo preview"
                      className="h-16 object-contain"
                    />
                  )}

                  <button type="submit" className="bg-blue-600 px-5 py-2 text-sm font-bold text-white">
                    Add Client Logo
                  </button>
                </form>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {clients.map((client) => (
                    <div key={client.id} className="border p-4 text-center">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="mx-auto h-16 max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <p className="mt-3 text-sm font-bold">{client.name}</p>
                      <button onClick={() => handleDeleteClient(client.id)} className="mt-3 w-full bg-red-600 py-1 text-xs text-white">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-8">
                <h2 className="text-xl font-black uppercase">Testimonials Manager</h2>

                <form onSubmit={handleAddTestimonial} className="space-y-4 border-4 border-slate-900 p-6">
                  <input required value={tAuthor} onChange={(e) => setTAuthor(e.target.value)} placeholder="Author" className="w-full border p-2 text-sm" />
                  <input value={tDesignation} onChange={(e) => setTDesignation(e.target.value)} placeholder="Designation" className="w-full border p-2 text-sm" />
                  <input value={tCompany} onChange={(e) => setTCompany(e.target.value)} placeholder="Company" className="w-full border p-2 text-sm" />
                  <input value={tCategory} onChange={(e) => setTCategory(e.target.value)} placeholder="Service category" className="w-full border p-2 text-sm" />

                  <select value={tRating} onChange={(e) => setTRating(Number(e.target.value))} className="w-full border p-2 text-sm">
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>

                  <textarea required value={tComment} onChange={(e) => setTComment(e.target.value)} placeholder="Comment" className="w-full border p-2 text-sm" />

                  <button type="submit" className="bg-blue-600 px-5 py-2 text-sm font-bold text-white">
                    Add Testimonial
                  </button>
                </form>

                <div className="grid gap-4 md:grid-cols-2">
                  {testimonials.map((item) => (
                    <div key={item.id} className="border p-4">
                      <p className="text-sm italic">"{item.comment}"</p>
                      <p className="mt-2 text-xs font-bold">— {item.author}</p>
                      <button onClick={() => handleDeleteTestimonial(item.id)} className="mt-3 bg-red-600 px-3 py-1 text-xs text-white">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'config' && (
              <div className="space-y-8">
                <h2 className="text-xl font-black uppercase">Site Settings</h2>

                <div className="space-y-4 border-4 border-slate-900 p-6">
                  <input value={cfgTagline} onChange={(e) => setCfgTagline(e.target.value)} placeholder="Tagline" className="w-full border p-2 text-sm" />
                  <input value={cfgPhone} onChange={(e) => setCfgPhone(e.target.value)} placeholder="Phone" className="w-full border p-2 text-sm" />
                  <input value={cfgEmail} onChange={(e) => setCfgEmail(e.target.value)} placeholder="Email" className="w-full border p-2 text-sm" />
                  <input value={cfgAddress} onChange={(e) => setCfgAddress(e.target.value)} placeholder="Address" className="w-full border p-2 text-sm" />
                  <input value={cfgHours} onChange={(e) => setCfgHours(e.target.value)} placeholder="Working hours" className="w-full border p-2 text-sm" />
                  <input value={cfgInsta} onChange={(e) => setCfgInsta(e.target.value)} placeholder="Instagram URL" className="w-full border p-2 text-sm" />
                  <input value={cfgWhatsapp} onChange={(e) => setCfgWhatsapp(e.target.value)} placeholder="WhatsApp Number" className="w-full border p-2 text-sm" />

                  <div className="border-t pt-5">
                    <h3 className="mb-3 text-sm font-black uppercase">Hero Section</h3>

                    <input value={cfgHeroEyebrow} onChange={(e) => setCfgHeroEyebrow(e.target.value)} placeholder="Hero Eyebrow" className="mb-3 w-full border p-2 text-sm" />

                    <input value={cfgHeroTitle} onChange={(e) => setCfgHeroTitle(e.target.value)} placeholder="Hero Title" className="mb-3 w-full border p-2 text-sm" />

                    <textarea value={cfgHeroSubtitle} onChange={(e) => setCfgHeroSubtitle(e.target.value)} placeholder="Hero Subtitle" className="mb-3 w-full border p-2 text-sm" />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const url = await uploadWebsiteImage(file, 'hero');
                        setCfgHeroImage(url);
                      }}
                      className="w-full border p-2 text-sm"
                    />

                    {cfgHeroImage && (
                      <img
                        src={cfgHeroImage}
                        alt="Hero preview"
                        className="mt-3 h-40 w-full rounded-lg border object-cover"
                      />
                    )}
                  </div>

                  <textarea value={cfgAbout} onChange={(e) => setCfgAbout(e.target.value)} placeholder="About text" className="w-full border p-2 text-sm" />

                  <button onClick={handleSaveConfig} className="flex items-center gap-2 bg-slate-900 px-5 py-2 text-sm font-bold text-white">
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