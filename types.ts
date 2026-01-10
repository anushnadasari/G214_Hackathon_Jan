
export interface EcoScore {
  material: number; // 0-40
  labor: number; // 0-30
  certification: number; // 0-20
  transparency: number; // 0-10
  total: number;
}

export interface Review {
  id: string;
  user: string;
  rating: number; // 1-5
  ecoAccuracyRating: number; // 1-5
  comment: string;
  date: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  description: string;
  materialInfo: string;
  certifications: string[];
  ecoScore: EcoScore;
  reviews: Review[];
  isVerified: boolean;
  greenwashingFlag?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  bio?: string;
}
