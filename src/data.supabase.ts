import { supabase } from './lib/supabase';
import {
  Service,
  GalleryItem,
  Booking,
  SiteConfig,
  Testimonial,
  ClientLogo,
} from './types';

const mapService = (s: any): Service => ({
  id: s.id,
  title: s.title,
  category: s.category,
  shortDescription: s.short_description,
  longDescription: s.long_description,
  priceInfo: s.price_info,
  features: s.features || [],
  requirements: s.requirements || [],
  imageUrl: s.image_url,
  images: s.images || [],
  iconName: s.icon_name,
   position: s.position ?? 0, 
});

const mapGallery = (g: any): GalleryItem => ({
  id: g.id,
  title: g.title,
  description: g.description,
  category: g.category,
  imageUrl: g.image_url,
});

const mapBooking = (b: any): Booking => ({
  id: b.id,
  name: b.name,
  phone: b.phone,
  email: b.email,
  serviceType: b.service_type,
  message: b.message,
  status: b.status,
  adminNotes: b.admin_notes,
  createdAt: b.created_at,
});

const mapTestimonial = (t: any): Testimonial => ({
  id: t.id,
  author: t.author,
  designation: t.designation,
  company: t.company,
  comment: t.comment,
  rating: t.rating,
  serviceCategory: t.service_category,
});

const mapConfig = (c: any): SiteConfig => ({
  companyName: c.company_name,
  tagline: c.tagline,
  phone: c.phone,
  email: c.email,
  address: c.address,
  workingHours: c.working_hours,
  instagramUrl: c.instagram_url,
  aboutText: c.about_text,
  visionText: c.vision_text,

  heroEyebrow: c.hero_eyebrow,
  heroTitle: c.hero_title,
  heroSubtitle: c.hero_subtitle,
  heroImage: c.hero_image,
  whatsappNumber: c.whatsapp_number,
});

export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
   .order('position', { ascending: true });  

  if (error) throw error;
  return data.map(mapService);
}

export async function addService(service: Omit<Service, 'id'>) {
  const { error } = await supabase.from('services').insert({
    title: service.title,
    category: service.category,
    short_description: service.shortDescription,
    long_description: service.longDescription,
    price_info: service.priceInfo,
    features: service.features,
    requirements: service.requirements || [],
    image_url: service.imageUrl,
    images: service.images || [],
    icon_name: service.iconName,
  });

  if (error) throw error;
}

export async function updateService(
  id: string,
  service: Partial<Service>
) {
  const updatePayload: Record<string, any> = {};

  if (service.title !== undefined) updatePayload.title = service.title;
  if (service.category !== undefined) updatePayload.category = service.category;
  if (service.shortDescription !== undefined) updatePayload.short_description = service.shortDescription;
  if (service.longDescription !== undefined) updatePayload.long_description = service.longDescription;
  if (service.priceInfo !== undefined) updatePayload.price_info = service.priceInfo;
  if (service.features !== undefined) updatePayload.features = service.features;
  if (service.requirements !== undefined) updatePayload.requirements = service.requirements;
  if (service.imageUrl !== undefined) updatePayload.image_url = service.imageUrl;
  if (service.images !== undefined) updatePayload.images = service.images;
  if (service.iconName !== undefined) updatePayload.icon_name = service.iconName;
  if (service.position !== undefined) updatePayload.position = service.position;

  const { data, error } = await supabase
    .from('services')
    .update(updatePayload)
    .eq('id', id)
    .select('id, images')
    .single();

  if (error) {
    console.error('Service update failed:', error);
    alert(`Service update failed: ${error.message}`);
    throw error;
  }

  console.log('Images saved successfully:', data.images);
}

export async function deleteService(id: string) {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
}

export async function getGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(mapGallery);
}

export async function addGalleryItem(item: Omit<GalleryItem, 'id'>) {
  const { error } = await supabase.from('gallery').insert({
    title: item.title,
    description: item.description,
    category: item.category,
    image_url: item.imageUrl,
  });

  if (error) throw error;
}

export async function deleteGalleryItem(id: string) {
  const { error } = await supabase.from('gallery').delete().eq('id', id);
  if (error) throw error;
}

export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(mapBooking);
}

export async function addBooking(
  booking: Omit<Booking, 'id' | 'createdAt' | 'status'>
) {
  const { error } = await supabase.from('bookings').insert({
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    service_type: booking.serviceType,
    message: booking.message,
    status: 'pending',
    admin_notes: booking.adminNotes || '',
  });

  if (error) throw error;
}

export async function updateBookingStatus(
  id: string,
  status: Booking['status'],
  adminNotes?: string
) {
  const { error } = await supabase
    .from('bookings')
    .update({
      status,
      admin_notes: adminNotes || '',
    })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteBooking(id: string) {
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) throw error;
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(mapTestimonial);
}

export async function addTestimonial(testimonial: Omit<Testimonial, 'id'>) {
  const { error } = await supabase.from('testimonials').insert({
    author: testimonial.author,
    designation: testimonial.designation,
    company: testimonial.company || null,
    comment: testimonial.comment,
    rating: testimonial.rating,
    service_category: testimonial.serviceCategory,
  });

  if (error) throw error;
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}

export async function getClients(): Promise<ClientLogo[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addClient(client: Omit<ClientLogo, 'id'>) {
  const { error } = await supabase.from('clients').insert({
    name: client.name,
    logo: client.logo,
  });

  if (error) throw error;
}

export async function deleteClient(id: string) {
  const { error } = await supabase.from('clients').delete().eq('id', id);
  if (error) throw error;
}

export async function getSiteConfig() {
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .limit(1)
    .single();

  if (error) throw error;
  return mapConfig(data);
}

export async function saveSiteConfig(config: SiteConfig) {
  const { data: existing } = await supabase
    .from('site_config')
    .select('id')
    .limit(1)
    .single();

  const payload = {
    company_name: config.companyName,
    tagline: config.tagline,
    phone: config.phone,
    email: config.email,
    address: config.address,
    working_hours: config.workingHours,
    instagram_url: config.instagramUrl,
    about_text: config.aboutText,
    vision_text: config.visionText,
    hero_eyebrow: config.heroEyebrow,
hero_title: config.heroTitle,
hero_subtitle: config.heroSubtitle,
hero_image: config.heroImage,
whatsapp_number: config.whatsappNumber,
  };

  if (existing?.id) {
    const { error } = await supabase
      .from('site_config')
      .update(payload)
      .eq('id', existing.id);

    if (error) throw error;
  } else {
    const { error } = await supabase.from('site_config').insert(payload);
    if (error) throw error;
  }
}

export async function uploadWebsiteImage(file: File, folder = 'general') {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from('website-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from('website-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}