import React, { useState } from 'react';
import { Service, GalleryItem, Booking, SiteConfig, Testimonial } from '../types';
import { 
  addService, updateService, deleteService, 
  addGalleryItem, deleteGalleryItem, 
  updateBookingStatus, deleteBooking,
  saveSiteConfig, addTestimonial, deleteTestimonial
} from '../data';
import { IconResolver, AVAILABLE_ICONS } from './IconResolver';
import { 
  FolderLock, Database, Wrench, Image as ImageIcon, 
  Settings, Users, Trash2, Edit3, Plus, Check, Save, 
  X, HelpCircle, PhoneCall, CheckSquare, Clock, ArrowUpRight,
  MessageSquareQuote
} from 'lucide-react';

interface AdminPanelProps {
  services: Service[];
  galleryItems: GalleryItem[];
  bookings: Booking[];
  siteConfig: SiteConfig;
  testimonials: Testimonial[];
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  services,
  galleryItems,
  bookings,
  siteConfig,
  testimonials,
  onRefreshData
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'gallery' | 'config' | 'testimonials'>('bookings');

  // Testimonial Form State
  const [tAuthor, setTAuthor] = useState('');
  const [tDesignation, setTDesignation] = useState('');
  const [tCompany, setTCompany] = useState('');
  const [tComment, setTComment] = useState('');
  const [tRating, setTRating] = useState(5);
  const [tCategory, setTCategory] = useState('Electrical');


  // Service Form State
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Electrical');
  const [serviceShortDesc, setServiceShortDesc] = useState('');
  const [serviceLongDesc, setServiceLongDesc] = useState('');
  const [servicePriceInfo, setServicePriceInfo] = useState('');
  const [serviceIcon, setServiceIcon] = useState('Zap');
  const [serviceImage, setServiceImage] = useState('');
  const [serviceFeatures, setServiceFeatures] = useState('');

  // Gallery Form State
  const [gTitle, setGTitle] = useState('');
  const [gDesc, setGDesc] = useState('');
  const [gCategory, setGCategory] = useState('Electrical');
  const [gImage, setGImage] = useState('');

  // Config State
  const [cfgTagline, setCfgTagline] = useState(siteConfig.tagline);
  const [cfgPhone, setCfgPhone] = useState(siteConfig.phone);
  const [cfgEmail, setCfgEmail] = useState(siteConfig.email);
  const [cfgAddress, setCfgAddress] = useState(siteConfig.address);
  const [cfgHours, setCfgHours] = useState(siteConfig.workingHours);
  const [cfgInsta, setCfgInsta] = useState(siteConfig.instagramUrl);
  const [cfgAbout, setCfgAbout] = useState(siteConfig.aboutText);

  // Administrative Booking Notes State
  const [bookingAdminNotes, setBookingAdminNotes] = useState<{ [key: string]: string }>({});

  // Trigger State change on Site configurations
  const handleSaveConfig = () => {
    saveSiteConfig({
      ...siteConfig,
      tagline: cfgTagline,
      phone: cfgPhone,
      email: cfgEmail,
      address: cfgAddress,
      workingHours: cfgHours,
      instagramUrl: cfgInsta,
      aboutText: cfgAbout
    });
    onRefreshData();
    console.log("System specifications updated successfully!");
  };

  // Service CRUD handlers
  const handleStartEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setServiceTitle(service.title);
    setServiceCategory(service.category);
    setServiceShortDesc(service.shortDescription);
    setServiceLongDesc(service.longDescription);
    setServicePriceInfo(service.priceInfo);
    setServiceIcon(service.iconName);
    setServiceImage(service.imageUrl);
    setServiceFeatures(service.features.join('\n'));
  };

  const handleCancelServiceEdit = () => {
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceShortDesc('');
    setServiceLongDesc('');
    setServicePriceInfo('');
    setServiceFeatures('');
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle || !serviceShortDesc) return;

    const parsedFeatures = serviceFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const targetImage = serviceImage || "https://picsum.photos/seed/elec/800/600";

    if (editingServiceId) {
      updateService(editingServiceId, {
        title: serviceTitle,
        category: serviceCategory,
        shortDescription: serviceShortDesc,
        longDescription: serviceLongDesc || serviceShortDesc,
        priceInfo: servicePriceInfo || "Pricing upon request",
        features: parsedFeatures.length > 0 ? parsedFeatures : ["Guaranteed quality restoration", "Clean project handover"],
        imageUrl: targetImage,
        iconName: serviceIcon
      });
    } else {
      addService({
        title: serviceTitle,
        category: serviceCategory,
        shortDescription: serviceShortDesc,
        longDescription: serviceLongDesc || serviceShortDesc,
        priceInfo: servicePriceInfo || "Pricing upon request",
        features: parsedFeatures.length > 0 ? parsedFeatures : ["Guaranteed quality restoration", "Clean project handover"],
        imageUrl: targetImage,
        iconName: serviceIcon
      });
    }

    handleCancelServiceEdit();
    onRefreshData();
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Are you sure you want to deactivate and delete this service item?")) {
      deleteService(id);
      onRefreshData();
    }
  };

  // Gallery CRUD Handler
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gTitle || !gImage) return;

    addGalleryItem({
      title: gTitle,
      description: gDesc || "Precision work captured in high detail.",
      category: gCategory,
      imageUrl: gImage
    });

    setGTitle('');
    setGDesc('');
    setGImage('');
    onRefreshData();
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (confirm("Are you sure you want to log off and delete this image from the gallery?")) {
      deleteGalleryItem(id);
      onRefreshData();
    }
  };

  // Bookings Handlers
  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    const customMemo = bookingAdminNotes[id] || "";
    updateBookingStatus(id, status, customMemo);
    onRefreshData();
  };

  const handleSaveBookingMemo = (id: string) => {
    const customMemo = bookingAdminNotes[id] || "";
    updateBookingStatus(id, bookings.find(b => b.id === id)?.status || 'pending', customMemo);
    onRefreshData();
    console.log("Internal administrative notes saved successfully!");
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("Permanently wipe this contact lead from the active registry?")) {
      deleteBooking(id);
      onRefreshData();
    }
  };

  // Testimonials Handlers
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tAuthor || !tComment) return;

    addTestimonial({
      author: tAuthor,
      designation: tDesignation || "Property Owner",
      company: tCompany || undefined,
      comment: tComment,
      rating: tRating,
      serviceCategory: tCategory
    });

    setTAuthor('');
    setTDesignation('');
    setTCompany('');
    setTComment('');
    setTRating(5);
    onRefreshData();
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this client testimonial?")) {
      deleteTestimonial(id);
      onRefreshData();
    }
  };


  return (
    <div className="bg-slate-100 min-h-screen py-8 border-b border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-blue-600 shadow-sm mb-8">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase flex items-center">
              <FolderLock size={12} className="mr-1.5" />
              SECURE OPERATOR INTERACTION TERMINAL
            </span>
            <h1 className="font-sans font-black text-2xl uppercase tracking-wider">
              Fast Service Admin Dashboard
            </h1>
            <p className="font-sans text-xs text-slate-400">
              Manage physical services, client listings, aesthetic work galleries, and core contact coordinates from a centralized browser persistent store.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 bg-slate-800 p-3 border border-slate-700/80 font-mono text-xs pr-6">
            <span className="block text-slate-400">REGISTERED LEADS: {bookings.length}</span>
            <span className="block text-blue-400">PENDING DISPATCHES: {bookings.filter(b => b.status === 'pending').length}</span>
          </div>
        </div>

        {/* Action Panel Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Navigation Sidebar (3 Cols) */}
          <div className="lg:col-span-3 bg-white border border-slate-200 p-4 space-y-2">
            <span className="block font-mono text-[9px] text-slate-400 tracking-widest uppercase px-3 mb-2">
              SYSTEM DIRECTIVES
            </span>
            
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left px-4 py-3 text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-between ${
                activeTab === 'bookings' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center"><Users size={14} className="mr-2" /> CLIENT INQUIRIES</span>
              <span className="bg-blue-600/20 text-blue-600 px-1.5 py-0.5 text-[9px] font-sans font-black">
                {bookings.filter(b => b.status === 'pending').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full text-left px-4 py-3 text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-between ${
                activeTab === 'services' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center"><Wrench size={14} className="mr-2" /> SERVICES CRUD</span>
              <span className="text-[10px] font-sans text-slate-400">{services.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-4 py-3 text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-between ${
                activeTab === 'gallery' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center"><ImageIcon size={14} className="mr-2" /> GALLERY ATTACH</span>
              <span className="text-[10px] font-sans text-slate-400">{galleryItems.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full text-left px-4 py-3 text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-between ${
                activeTab === 'testimonials' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center"><MessageSquareQuote size={14} className="mr-2" /> TESTIMONIAL CRUD</span>
              <span className="text-[10px] font-sans text-slate-400">{testimonials.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`w-full text-left px-4 py-3 text-xs font-mono tracking-wider uppercase transition-colors flex items-center ${
                activeTab === 'config' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings size={14} className="mr-2" /> SYSTEM CONFIG METRICS
            </button>

          </div>

          {/* Admin Dynamic View Area (9 Cols) */}
          <div className="lg:col-span-9 bg-white border border-slate-200 p-6 md:p-8 min-h-[500px]">
            
            {/* 1. BOOKINGS INTAKES VIEW */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-sans font-black text-xl text-slate-900 uppercase tracking-tight">
                    CLIENT DISPATCH TICKETS OR INQUIRIES
                  </h2>
                  <p className="font-sans text-xs text-slate-500">
                    Review incoming leads, update progress from Pending validation to Checked or Completed, and attach personal technician reports.
                  </p>
                </div>

                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id} 
                      className={`border-2 p-5 ${
                        booking.status === 'pending' ? 'border-amber-400 bg-amber-50/10' : 
                        booking.status === 'reviewed' ? 'border-blue-300' : 'border-slate-200 bg-slate-50/30'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/80 pb-4 mb-4">
                        <div>
                          <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block">NAME AND SERVICE UNIT</span>
                          <span className="font-sans font-extrabold text-base text-slate-900 uppercase block">{booking.name}</span>
                          <span className="font-sans text-[11px] font-bold text-blue-600 uppercase tracking-wide block">{booking.serviceType}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className={`px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase font-bold text-white ${
                            booking.status === 'pending' ? 'bg-amber-600' :
                            booking.status === 'reviewed' ? 'bg-blue-600' : 'bg-emerald-600'
                          }`}>
                            {booking.status}
                          </span>
                          
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="p-1.5 border border-slate-200 hover:border-red-600 text-slate-400 hover:text-red-600 transition-colors bg-white"
                            title="Delete Lead"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Specifications of message */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        
                        {/* Left Info Column */}
                        <div className="space-y-3 font-sans text-xs text-slate-600">
                          <div>
                            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block">CONTACT SPECS:</span>
                            <span className="block font-semibold text-slate-900">CELL: {booking.phone}</span>
                            <span className="block mt-0.5">MAIL: {booking.email}</span>
                          </div>
                          <div>
                            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block font-bold">CLIENT MESSAGE DESCRIPTION:</span>
                            <p className="mt-1 font-light italic leading-relaxed text-slate-700 bg-slate-50 p-2.5 border border-slate-100">
                              &ldquo;{booking.message}&rdquo;
                            </p>
                          </div>
                        </div>

                        {/* Administrative Notes Column */}
                        <div className="space-y-3 bg-slate-50 p-4 border border-slate-200">
                          <label className="block font-mono text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                            ADMINISTRATOR / TECH MEMORANDUNS
                          </label>
                          <textarea
                            rows={2}
                            value={bookingAdminNotes[booking.id] !== undefined ? bookingAdminNotes[booking.id] : (booking.adminNotes || '')}
                            onChange={(e) => setBookingAdminNotes({ ...bookingAdminNotes, [booking.id]: e.target.value })}
                            placeholder="Add hardware components required, diagnostic dates, or quotes assigned."
                            className="w-full border border-slate-200 bg-white py-1.5 px-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 rounded-none resize-y"
                          />
                          
                          <div className="flex justify-between items-center flex-wrap gap-2 pt-1 border-t border-slate-200">
                            {/* Fast status updates */}
                            <div className="flex space-x-1.5">
                              <button
                                onClick={() => handleUpdateBookingStatus(booking.id, 'pending')}
                                className="px-2 py-1 text-[9px] font-mono border border-slate-200 hover:border-slate-400 bg-white"
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => handleUpdateBookingStatus(booking.id, 'reviewed')}
                                className="px-2 py-1 text-[9px] font-mono border border-slate-200 hover:border-slate-400 bg-white"
                              >
                                Reviewed
                              </button>
                              <button
                                onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                                className="px-2 py-1 text-[9px] font-mono border border-slate-200 hover:border-slate-400 bg-white"
                              >
                                Complete check
                              </button>
                            </div>

                            <button
                              onClick={() => handleSaveBookingMemo(booking.id)}
                              className="px-2.5 py-1 text-[9px] font-sans font-bold bg-slate-900 hover:bg-blue-600 text-white tracking-wider uppercase transition-colors"
                            >
                              SAVE NOTES
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  ))}

                  {bookings.length === 0 && (
                    <div className="py-16 text-center border border-dashed border-slate-200">
                      <span className="block font-mono text-xs text-slate-400 uppercase tracking-widest">
                        No contact leads stored in local database.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. SERVICES CRUD VIEW */}
            {activeTab === 'services' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-sans font-black text-xl text-slate-900 uppercase tracking-tight">
                    INTEGRATED SPECIALIST SERVICES MANAGER
                  </h2>
                  <p className="font-sans text-xs text-slate-500">
                    Add new service components or edit physical descriptions, icon identifiers, features list, and price tags.
                  </p>
                </div>

                {/* Service Input Form (Collapsible/Dynamic toggle) */}
                <form onSubmit={handleSaveService} className="border-4 border-slate-900 p-6 space-y-4">
                  <h3 className="font-sans font-bold text-sm text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-2">
                    {editingServiceId ? 'EDIT ACTIVE SERVICE NODE' : 'ADD NEW SERVICE DEPLOYMENT'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        SERVICE TITLE *
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceTitle}
                        onChange={(e) => setServiceTitle(e.target.value)}
                        placeholder="e.g. Copper Earth Pipe Assembly"
                        className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        CATEGORY GROUP
                      </label>
                      <select
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        className="w-full border border-slate-200 py-1.5 px-2 bg-white text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-sans"
                      >
                        <option value="Electrical">Electrical Circuits</option>
                        <option value="Appliances">Appliances Mechanics</option>
                        <option value="Maintenance">Annual Maintenance</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        ICON REPRESENTATIVE
                      </label>
                      <select
                        value={serviceIcon}
                        onChange={(e) => setServiceIcon(e.target.value)}
                        className="w-full border border-slate-200 py-1.5 px-2 bg-white text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-sans"
                      >
                        {AVAILABLE_ICONS.map((ico) => (
                          <option key={ico.name} value={ico.name}>
                            {ico.name} ({ico.label})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        DIAGNOSTIC PRICE STATS *
                      </label>
                      <input
                        type="text"
                        required
                        value={servicePriceInfo}
                        onChange={(e) => setServicePriceInfo(e.target.value)}
                        placeholder="e.g. Diagnostics from AED 150"
                        className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        VISUAL THUMBNAIL URL
                      </label>
                      <input
                        type="text"
                        value={serviceImage}
                        onChange={(e) => setServiceImage(e.target.value)}
                        placeholder="Paste image address/URL (or leave empty for default)"
                        className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                      SHORT TEASER CARD COMPRESSION *
                    </label>
                    <input
                      type="text"
                      required
                      value={serviceShortDesc}
                      onChange={(e) => setServiceShortDesc(e.target.value)}
                      placeholder="Enter a brief, compelling 1-sentence synopsis for general service pages."
                      className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-1000 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        DEEP TECHNICAL SPECIFICATION RUNS (INNER PAGES TEXT)
                      </label>
                      <textarea
                        rows={3}
                        value={serviceLongDesc}
                        onChange={(e) => setServiceLongDesc(e.target.value)}
                        placeholder="Comprehensive paragraphs detailing repair cycles, diagnostic gear, testing mechanisms."
                        className="w-full border border-slate-200 py-2 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30 resize-y"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        PER ELEMENT SPECIFICATION FEATURES (LINE BREAK SEPARATED)
                      </label>
                      <textarea
                        rows={3}
                        value={serviceFeatures}
                        onChange={(e) => setServiceFeatures(e.target.value)}
                        placeholder="Double balancing loops calibration&#10;Sealed refrigerant recycling support&#10;Genuine UAE authorized brass spares"
                        className="w-full border border-slate-200 py-2 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30 resize-y"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold tracking-widest px-6 py-2.5 uppercase transition-colors"
                    >
                      {editingServiceId ? 'SAVE SPECIFICATIONS' : 'DEPLOY ACTIVE NODE'}
                    </button>
                    {editingServiceId && (
                      <button
                        type="button"
                        onClick={handleCancelServiceEdit}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-sans text-xs font-semibold tracking-widest px-4 py-2.5 uppercase transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                {/* Dashboard active list with delete actions */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs font-bold text-slate-400 tracking-widest uppercase pb-1 border-b border-slate-100">
                    CURRENT LIVE SERVICES CONFIGURATION
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div key={service.id} className="p-4 border border-slate-200 flex items-start justify-between bg-white hover:border-slate-900 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-slate-100 px-1.5 py-0.5 text-slate-600 font-mono text-[9px] font-bold uppercase border">
                              {service.category}
                            </span>
                            <span className="font-sans font-bold text-xs uppercase tracking-tight text-slate-900">
                              {service.title}
                            </span>
                          </div>
                          <p className="font-sans text-[11px] text-slate-500 leading-tight line-clamp-1">
                            {service.shortDescription}
                          </p>
                          <span className="block font-mono text-[9px] text-blue-600 uppercase font-black tracking-wider">
                            PRICING SPEC: {service.priceInfo}
                          </span>
                        </div>
                        
                        <div className="flex space-x-1.5 shrink-0 ml-4">
                          <button
                            onClick={() => handleStartEditService(service)}
                            className="p-1.5 border border-slate-200 hover:border-blue-600 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Edit Service"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-1.5 border border-slate-200 hover:border-red-600 text-slate-400 hover:text-red-600 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 3. GALLERY CRUD VIEW */}
            {activeTab === 'gallery' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-sans font-black text-xl text-slate-900 uppercase tracking-tight">
                    AESTHETIC PORTFOLIO LOG ENTRIES
                  </h2>
                  <p className="font-sans text-xs text-slate-500">
                    Add high-quality project images from active operations directly into the gallery matrix, or clean older archives.
                  </p>
                </div>

                {/* Input form */}
                <form onSubmit={handleAddGalleryItem} className="border-4 border-slate-900 p-6 space-y-4">
                  <h3 className="font-sans font-bold text-sm text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-2">
                    ATTACH NEW GALLERY SPECIMEN
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        IMAGE CAPTION / TITLE *
                      </label>
                      <input
                        type="text"
                        required
                        value={gTitle}
                        onChange={(e) => setGTitle(e.target.value)}
                        placeholder="e.g. Smart Distribution Panel Retrofit"
                        className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        CATEGORY ALIGN
                      </label>
                      <select
                        value={gCategory}
                        onChange={(e) => setGCategory(e.target.value)}
                        className="w-full border border-slate-200 py-1.5 px-2 bg-white text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-sans"
                      >
                        <option value="Electrical">Electrical</option>
                        <option value="Appliances">Appliances</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                      PICTURE ADRESS / REMOTE URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={gImage}
                      onChange={(e) => setGImage(e.target.value)}
                      placeholder="e.g. https://images.unsplash.com/your-image-identifier"
                      className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                      SPECIFICATION NOTES (FOR HOVER STATE)
                    </label>
                    <input
                      type="text"
                      value={gDesc}
                      onChange={(e) => setGDesc(e.target.value)}
                      placeholder="Enter detailed hardware modifications, diagnostic tools, or parts replaced."
                      className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold tracking-widest px-6 py-2.5 uppercase transition-colors"
                    >
                      LOGGER PICTURE NODE
                    </button>
                  </div>
                </form>

                {/* Live listing thumbnail gallery */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs font-bold text-slate-400 tracking-widest uppercase pb-1 border-b border-slate-100">
                    ACTIVE ARCHIVE LOG INDEX
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {galleryItems.map((item) => (
                      <div key={item.id} className="relative group border border-slate-200 bg-white p-2 aspect-square flex flex-col justify-between">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-18 object-cover border border-slate-100" 
                        />
                        <div className="mt-1">
                          <span className="block font-sans font-bold text-[9px] uppercase tracking-wider text-slate-800 line-clamp-1">{item.title}</span>
                          <span className="block font-mono text-[8px] text-slate-400 uppercase">{item.category}</span>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-1 rounded transition-colors shadow-sm"
                          title="Delete Specimen"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 4. SITE SCHEMA CONFIG VIEW */}
            {activeTab === 'config' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-sans font-black text-xl text-slate-900 uppercase tracking-tight">
                    GENERAL CORPORATE CONFIGURATION
                  </h2>
                  <p className="font-sans text-xs text-slate-500">
                    Adjust basic telephone numbers, emails, addresses, Instagram integrations, or corporate taglines dynamically across the entire live system.
                  </p>
                </div>

                <div className="space-y-4 border border-slate-200 p-6 bg-slate-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        COMPANY NOMENCLATURE
                      </label>
                      <input
                        type="text"
                        disabled
                        value={siteConfig.companyName}
                        className="w-full border border-slate-250 bg-slate-100 py-1.5 px-2 text-xs text-slate-500 cursor-not-allowed font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        INSTAGRAM URL LINK
                      </label>
                      <input
                        type="text"
                        value={cfgInsta}
                        onChange={(e) => setCfgInsta(e.target.value)}
                        className="w-full border border-slate-200 bg-white py-1.5 px-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                      BRAND TAGLINE (HERO CAPTURING)
                    </label>
                    <input
                      type="text"
                      value={cfgTagline}
                      onChange={(e) => setCfgTagline(e.target.value)}
                      className="w-full border border-slate-200 bg-white py-1.5 px-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                        TELEPHONE NUMBER
                      </label>
                      <input
                        type="text"
                        value={cfgPhone}
                        onChange={(e) => setCfgPhone(e.target.value)}
                        className="w-full border border-slate-200 bg-white py-1.5 px-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        EMAIL INBOX
                      </label>
                      <input
                        type="email"
                        value={cfgEmail}
                        onChange={(e) => setCfgEmail(e.target.value)}
                        className="w-full border border-slate-200 bg-white py-1.5 px-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        WORKING HOURS SLATE
                      </label>
                      <input
                        type="text"
                        value={cfgHours}
                        onChange={(e) => setCfgHours(e.target.value)}
                        className="w-full border border-slate-200 bg-white py-1.5 px-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] font-bold text-slate-1000 tracking-widest uppercase">
                      PHYSICAL HEADQUARTERS ADDRESS
                    </label>
                    <input
                      type="text"
                      value={cfgAddress}
                      onChange={(e) => setCfgAddress(e.target.value)}
                      className="w-full border border-slate-200 bg-white py-1.5 px-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                      DETAILED ABOUT TEXT
                    </label>
                    <textarea
                      rows={4}
                      value={cfgAbout}
                      onChange={(e) => setCfgAbout(e.target.value)}
                      className="w-full border border-slate-200 bg-white py-2 px-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleSaveConfig}
                      className="bg-slate-900 hover:bg-blue-600 text-white font-sans text-xs font-bold tracking-widest px-6 py-3 uppercase transition-all duration-300 flex items-center space-x-2 shadow-sm"
                    >
                      <Save size={14} />
                      <span>APPLY GENERAL CONFIGURATION</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* 5. TESTIMONIALS CRUD VIEW */}
            {activeTab === 'testimonials' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-sans font-black text-xl text-slate-900 uppercase tracking-tight">
                    CLIENT TESTIMONIALS MANAGER
                  </h2>
                  <p className="font-sans text-xs text-slate-500">
                    Register genuine, friendly client feedback from corporate and penthouse managers to showcase brand authenticity on the home page.
                  </p>
                </div>

                {/* Testimonial Creation Form */}
                <form onSubmit={handleAddTestimonial} className="border-4 border-slate-900 p-6 space-y-4 bg-white">
                  <h3 className="font-sans font-bold text-sm text-slate-950 uppercase tracking-widest border-b border-slate-200 pb-2">
                    LOG NEW CLIENT TESTIMONY
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        AUTHOR / CLIENT NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={tAuthor}
                        onChange={(e) => setTAuthor(e.target.value)}
                        placeholder="e.g. Fatima Al-Suwaidi"
                        className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        DESIGNATION / TITLE *
                      </label>
                      <input
                        type="text"
                        required
                        value={tDesignation}
                        onChange={(e) => setTDesignation(e.target.value)}
                        placeholder="e.g. Penthouse Proprietor"
                        className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        COMPANY NOMENCLATURE (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        value={tCompany}
                        onChange={(e) => setTCompany(e.target.value)}
                        placeholder="e.g. Nikki Beach Residences"
                        className="w-full border border-slate-200 py-1.5 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        SERVICE CATEGORY
                      </label>
                      <select
                        value={tCategory}
                        onChange={(e) => setTCategory(e.target.value)}
                        className="w-full border border-slate-200 py-1.5 px-2 bg-white text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-sans"
                      >
                        <option value="Electrical">Electrical Circuits</option>
                        <option value="Appliances">Appliances Mechanics</option>
                        <option value="Maintenance">Annual Maintenance Plan</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        SATISFACTION INDEX (STAR RATING)
                      </label>
                      <select
                        value={tRating}
                        onChange={(e) => setTRating(parseInt(e.target.value))}
                        className="w-full border border-slate-200 py-1.5 px-2 bg-white text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-sans"
                      >
                        <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                        <option value="4">★★★★☆ (4 Stars - Great)</option>
                        <option value="3">★★★☆☆ (3 Stars - Average)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                      CLIENT COMMENTS / TRANSCRIPT *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={tComment}
                      onChange={(e) => setTComment(e.target.value)}
                      placeholder="Add authentic transcripts of mechanical restoration quality or engineer professionalism..."
                      className="w-full border border-slate-200 py-2 px-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/30 resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold tracking-widest px-6 py-2.5 uppercase transition-colors"
                    >
                      DEPLOY TESTIMONIAL VIEW
                    </button>
                  </div>
                </form>

                {/* Testimony list with delete buttons */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs font-bold text-slate-400 tracking-widest uppercase pb-1 border-b border-slate-100">
                    LIVE FEEDBACK DATA MATRIX ({testimonials.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((item) => (
                      <div key={item.id} className="p-5 border border-slate-200 bg-slate-50 flex items-start justify-between hover:border-slate-800 transition-all duration-200">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[8px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-none uppercase">
                              {item.serviceCategory}
                            </span>
                            <span className="text-amber-500 text-xs text-[10px]">
                              {'★'.repeat(item.rating)}
                            </span>
                          </div>
                          <p className="font-sans italic text-slate-700 text-[11px] leading-relaxed line-clamp-2">
                            &ldquo;{item.comment}&rdquo;
                          </p>
                          <span className="block font-sans font-extrabold text-[10px] text-slate-900 uppercase">
                            — {item.author} ({item.designation} {item.company ? `• ${item.company}` : ''})
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteTestimonial(item.id)}
                          className="p-1.5 shrink-0 ml-4 border border-slate-200 hover:border-red-600 text-slate-400 hover:text-red-600 transition-colors bg-white"
                          title="Delete Testimony"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>


        </div>

      </div>
    </div>
  );
};
