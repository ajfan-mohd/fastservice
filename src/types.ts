export interface Service {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  priceInfo: string;
  features: string[];
  imageUrl: string;
  iconName: string; // From lucide-react (e.g. 'Lightbulb', 'Wind', 'Cpu', 'Wrench', 'Zap')
  images?: { url: string; caption: string }[];
requirements?: string[];
 position?: number; 
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'completed';
  adminNotes?: string;
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  instagramUrl: string;
  aboutText: string;
  visionText: string;
heroEyebrow: string;
heroTitle: string;
heroSubtitle: string;
heroImage: string;
whatsappNumber: string;

}

export interface Testimonial {
  id: string;
  author: string;
  designation: string;
  company?: string;
  comment: string;
  rating: number;
  serviceCategory: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
}