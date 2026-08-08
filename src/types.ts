export interface WaitlistFormData {
  fullName: string;
  email: string;
  phone?: string;
  university: string;
  level: string;
  gender?: string;
  accommodationNeed: 'Yes' | 'No' | string;
  accommodationTimeline: 'Immediately' | 'Within 1 month' | '1–3 months' | '3–6 months' | 'Just exploring' | string;
  referralSource: 'Friend' | 'WhatsApp' | 'Instagram' | 'TikTok' | 'X' | 'Campus' | 'Other' | string;
}

export interface WaitlistUser extends WaitlistFormData {
  id: string;
  position: number;
  createdAt: string;
}

export interface AccommodationListing {
  id: string;
  title: string;
  type: string;
  university: string;
  universityDistance: string;
  walkMinutes: number;
  pricePerYear: number;
  image: string;
  verifiedAgent: string;
  agentLogo?: string;
  rating: number;
  reviewCount: number;
  facilities: string[];
  availableFrom: string;
}

export type InstitutionCategory =
  | 'Federal University'
  | 'State University'
  | 'Private University'
  | 'Federal Polytechnic'
  | 'State Polytechnic'
  | 'Private Polytechnic'
  | 'College of Education';

export interface UniversityOption {
  name: string;
  city: string;
  state: string;
  code: string;
  category: InstitutionCategory;
  type: 'Federal' | 'State' | 'Private';
  isPolytechnic?: boolean;
  isCollege?: boolean;
  studentCount?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WaitlistStats {
  totalUsers: number;
  topUniversity: string;
  immediateNeedCount: number;
}
