import { Service, GalleryItem, Booking, SiteConfig, Testimonial } from './types';

const HERO_IMAGE = '/src/assets/images/hero_corporate_interior_1780387380858.png';
const ENGINEER_IMAGE = '/src/assets/images/service_engineer_1780387398949.png';

const INITIAL_SITE_CONFIG: SiteConfig = {
  companyName: 'Fast Service Contracting LLc',
  tagline: 'MEP, renovation, maintenance and fit-out services in the UAE',
  phone: '+971 XX XXX XXXX',
  email: 'info@fastserviceuae.com',
  address: 'Dubai, United Arab Emirates',
  workingHours: 'Sunday - Saturday: 8:00 AM - 7:00 PM | Emergency support available',
  instagramUrl: 'https://www.instagram.com/fast_service_uae?igsh=MWlnbm42N3U5YWJtaA==',
  aboutText: 'Fast Service Contracting LLc provides reliable electro mechanical, renovation, fit-out, painting, flooring, joinery, landscaping and maintenance services across the UAE. Our team handles small repair jobs, villa upgrades, office works and complete project execution with clear communication and professional workmanship.',
  visionText: 'To make building services simple, safe and reliable for homes, offices and commercial spaces in the UAE.'
};

const servicesBase = [
  ['office-fitout','Office Fit-Out Works','Fit-Out','Complete office interiors with partitions, ceiling, flooring, MEP, IT points and finishing works.','We create practical office spaces that are easy to use and easy to maintain. Our team can manage partitioning, false ceiling, flooring, joinery, electrical, plumbing, AC, IT points, fire safety support and final finishing works.', 'Partitioning and false ceiling|Flooring and joinery|Electrical, plumbing and AC|IT points and lighting|Painting and final finishing','https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200','Building2'],
  ['villa-renovation','Villa / Apartment Renovation','Renovation','Civil, electrical, plumbing, AC, tiling, painting and full home improvement works.','We renovate villas and apartments with a clear plan from site visit to handover. Services include demolition, civil work, electrical, plumbing, AC modifications, bathrooms, kitchen support, tiles, gypsum, joinery and paint.', 'Civil and structural work|Electrical and plumbing|AC modification|Bathroom and kitchen support|Tiling, gypsum and painting','https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200','Home'],
  ['mep-works','Building MEP Works','MEP','Electrical, plumbing, drainage, AC, ventilation and fire fighting support for buildings.','Our MEP team supports residential, commercial and building projects. We handle electrical LV and ELV works, plumbing, drainage, AC, ventilation and fire fighting related coordination as per project needs.', 'Electrical LV and ELV|Plumbing and drainage|AC and ventilation|Fire fighting system support|Testing and maintenance','https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200','Zap'],
  ['kitchen-renovation','Kitchen Renovation','Renovation','Cabinets, countertops, backsplash, tiling, plumbing and electrical points for kitchens.','We upgrade kitchens with simple planning and neat execution. Works include cabinet layout, countertop fitting, backsplash, tiles, appliance points, plumbing and electrical preparation.', 'Cabinet design and fitting|Quartz or granite countertop|Backsplash and wall tiles|Electrical appliance points|Sink and plumbing works','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200','Utensils'],
  ['gypsum-works','Gypsum Works','Interior','False ceilings, bulkheads, partitions, cornices and feature ceiling works.','We provide clean gypsum work for homes, offices and commercial spaces. Our work covers false ceiling, bulkhead, partitions, cornice, cove lighting and simple feature ceiling designs.', 'False ceiling systems|Bulkhead and cornice|Gypsum partitions|Cove lighting support|Ceiling repair works','https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200','PanelsTopLeft'],
  ['floor-tiles','Floor Tile Works','Flooring','Ceramic, porcelain, marble, stone, wall tiling and waterproofing for wet areas.','We install floor and wall tiles with proper base preparation and finishing. We support ceramic, porcelain, marble, stone, bathroom tiles, kitchen tiles and waterproofing for wet areas.', 'Ceramic and porcelain tiles|Marble and stone works|Bathroom and kitchen tiles|Wet area waterproofing|Tile repair and replacement','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200','Grid3X3'],
  ['joinery','Joinery Works','Interior','Wardrobes, TV units, feature walls, doors, frames and custom wood works.','We design and build practical joinery items for residential and office spaces. Works include wardrobes, TV units, feature walls, doors, frames, storage units and staircase joinery.', 'Built-in wardrobes|TV units and feature walls|Custom doors and frames|Storage units|Staircase joinery','https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=1200','Hammer'],
  ['custom-furniture','Customized Furniture','Interior','Bespoke sofas, bedroom sets, dining sets, office furniture and outdoor furniture.','We make custom furniture based on space, use and finish. Our team can support home furniture, office furniture, outdoor furniture and special size furniture requirements.', 'Sofas and seating|Bedroom and dining sets|Office furniture|Outdoor furniture|Custom size furniture','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200','Armchair'],
  ['internal-painting','Internal Painting','Painting','Wall painting, texture walls, wallpaper, enamel paint and repainting services.','We provide neat internal painting for homes, offices and buildings. Services include wall preparation, emulsion paint, texture walls, wallpaper fixing, enamel paint and touch-up works.', 'Wall preparation|Premium emulsion paint|Feature and texture walls|Wallpaper fixing|Enamel and joinery paint','https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200','Paintbrush'],
  ['external-painting','External Painting','Painting','Facade painting, waterproof coating, villa exterior paint and building painting support.','We handle external painting for villas, buildings and commercial spaces. Works include facade paint, waterproof coating, exterior wall repair and high area access support when required.', 'Facade painting|Villa exterior painting|Waterproof coating|Wall crack repair support|High area access support','https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1200','PaintBucket'],
  ['landscaping','Landscaping','Outdoor','Soft landscaping, hard landscaping, irrigation, lighting, pergolas and outdoor features.','We create usable outdoor spaces with plants, paving, irrigation, lighting and landscape features. Suitable for villas, offices, yards and commercial properties.', 'Soft and hard landscaping|Automatic irrigation|Outdoor lighting|Pergolas and seating areas|Water feature support','https://images.unsplash.com/photo-1558521958-0a228e77a984?q=80&w=1200','Trees'],
  ['parking-shades','Parking Shades','Outdoor','Cantilever shades, sail shades, steel frame shades and aluminium louvered shades.','We install parking shade structures for villas, buildings, offices and commercial properties. We support different designs based on space, budget and coverage needed.', 'Cantilever structures|Tensile sail shades|Steel frame shades|Aluminium louvered shades|Repair and replacement','https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200','Car'],
  ['epoxy-floor','Epoxy Floor Coating','Flooring','Self-levelling epoxy, anti-slip coating, decorative flake and industrial floors.','We provide epoxy floor coating for garages, warehouses, kitchens, commercial areas and industrial spaces. Options include anti-slip, flake, metallic and heavy-duty systems.', 'Self-levelling epoxy|Anti-slip coating|Decorative flake flooring|Metallic epoxy|Industrial grade systems','https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200','Factory'],
  ['spc-lvt','SPC / LVT Flooring','Flooring','Stone plastic composite, luxury vinyl tile, acoustic underlay and subfloor preparation.','We supply and install SPC and LVT flooring for homes, offices and shops. It is practical, clean-looking and easy to maintain.', 'SPC flooring|Luxury vinyl tile|Acoustic underlay|Subfloor preparation|Skirting and finishing','https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200','Ruler'],
  ['interlock','Interlock Works','Outdoor','Concrete interlock, eco paving, decorative patterns and sub-base preparation.','We install interlock paving for driveways, walkways, parking areas and outdoor spaces. We also support pattern design, base compaction and repair works.', 'Concrete interlock pavers|Permeable eco paving|Decorative patterns|Driveways and walkways|Sub-base compaction','https://images.unsplash.com/photo-1597047084897-51e81819a499?q=80&w=1200','Blocks']
];

const INITIAL_SERVICES: Service[] = servicesBase.map(([id,title,category,shortDescription,longDescription,features,imageUrl,iconName]) => ({
  id, title, category, shortDescription, longDescription, priceInfo: 'Contact us for a free site visit and quotation', features: String(features).split('|'), imageUrl, iconName
}));

const INITIAL_GALLERY: GalleryItem[] = [
  { id:'g1', title:'Villa Renovation Work', description:'Interior renovation and finishing work for a residential project.', category:'Renovation', imageUrl:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200' },
  { id:'g2', title:'MEP Site Work', description:'Electrical and mechanical service work handled by trained technicians.', category:'MEP', imageUrl:ENGINEER_IMAGE },
  { id:'g3', title:'Office Fit-Out', description:'Clean office space planning with ceiling, lighting and finishing.', category:'Fit-Out', imageUrl:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200' },
  { id:'g4', title:'Kitchen Upgrade', description:'Modern kitchen renovation with cabinets, countertop and services.', category:'Renovation', imageUrl:'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200' },
  { id:'g5', title:'Flooring and Tiles', description:'Tile and flooring installation for homes and commercial spaces.', category:'Flooring', imageUrl:'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200' },
  { id:'g6', title:'Outdoor Works', description:'Landscaping, interlock and parking shade related outdoor work.', category:'Outdoor', imageUrl:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200' },
  { id:'g7', title:'Painting Works', description:'Internal and external painting with clean preparation and finishing.', category:'Painting', imageUrl:'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=1200' },
  { id:'g8', title:'Maintenance Support', description:'Reliable maintenance support for villas, apartments and offices.', category:'Maintenance', imageUrl:HERO_IMAGE }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  { id:'t1', author:'Client in Dubai', designation:'Villa Owner', company:'Residential Project', comment:'The team completed our renovation neatly and explained every stage clearly. Good workmanship and easy communication.', rating:5, serviceCategory:'Renovation' },
  { id:'t2', author:'Office Client', designation:'Manager', company:'Business Bay', comment:'Fast Service handled our office fit-out and MEP requirements without confusion. The project was clean and well organized.', rating:5, serviceCategory:'Fit-Out' },
  { id:'t3', author:'Building Client', designation:'Facility Coordinator', company:'Dubai', comment:'They respond quickly for maintenance and complete the work professionally. Reliable team for regular building support.', rating:5, serviceCategory:'Maintenance' }
];

const INITIAL_BOOKINGS: Booking[] = [];

const STORAGE_KEYS = { SERVICES:'electro_services', GALLERY:'electro_gallery', BOOKINGS:'electro_bookings', CONFIG:'electro_config', TESTIMONIALS:'electro_testimonials' };
const loadData = <T,>(key: string, fallback: T): T => { try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : fallback; } catch { return fallback; } };
const saveData = <T,>(key: string, data: T) => localStorage.setItem(key, JSON.stringify(data));

export const getServices = () => loadData<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
export const saveServices = (services: Service[]) => saveData(STORAGE_KEYS.SERVICES, services);
export const getGallery = () => loadData<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
export const saveGallery = (items: GalleryItem[]) => saveData(STORAGE_KEYS.GALLERY, items);
export const getBookings = () => loadData<Booking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
export const saveBookings = (bookings: Booking[]) => saveData(STORAGE_KEYS.BOOKINGS, bookings);
export const addBooking = (booking: Omit<Booking,'id'|'createdAt'|'status'>) => { const bookings = getBookings(); const newBooking: Booking = { ...booking, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'pending' }; saveBookings([newBooking, ...bookings]); return newBooking; };
export const updateBooking = (id: string, updates: Partial<Booking>) => saveBookings(getBookings().map(b => b.id === id ? { ...b, ...updates } : b));
export const getSiteConfig = () => loadData<SiteConfig>(STORAGE_KEYS.CONFIG, INITIAL_SITE_CONFIG);
export const saveSiteConfig = (config: SiteConfig) => saveData(STORAGE_KEYS.CONFIG, config);
export const getTestimonials = () => loadData<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
export const saveTestimonials = (testimonials: Testimonial[]) => saveData(STORAGE_KEYS.TESTIMONIALS, testimonials);
export const resetAllData = () => { Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k)); };

export const addService = (service: Omit<Service,'id'>) => { const services = getServices(); const newService: Service = { ...service, id: Date.now().toString() }; saveServices([newService, ...services]); return newService; };
export const updateService = (id: string, updates: Partial<Service>) => saveServices(getServices().map(s => s.id === id ? { ...s, ...updates } : s));
export const deleteService = (id: string) => saveServices(getServices().filter(s => s.id !== id));
export const addGalleryItem = (item: Omit<GalleryItem,'id'>) => { const items = getGallery(); const newItem: GalleryItem = { ...item, id: Date.now().toString() }; saveGallery([newItem, ...items]); return newItem; };
export const deleteGalleryItem = (id: string) => saveGallery(getGallery().filter(i => i.id !== id));
export const updateBookingStatus = (id: string, status: Booking['status'], adminNotes?: string) => updateBooking(id, { status, adminNotes });
export const deleteBooking = (id: string) => saveBookings(getBookings().filter(b => b.id !== id));
export const addTestimonial = (testimonial: Omit<Testimonial,'id'>) => { const items = getTestimonials(); const newItem: Testimonial = { ...testimonial, id: Date.now().toString() }; saveTestimonials([newItem, ...items]); return newItem; };
export const deleteTestimonial = (id: string) => saveTestimonials(getTestimonials().filter(t => t.id !== id));
