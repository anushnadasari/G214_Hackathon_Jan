
import React from 'react';
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Essential Hemp Tee',
    brand: 'Terra Threads',
    price: 45,
    discountPrice: 38,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    description: 'A breathable, durable t-shirt made from 100% industrial hemp. Grown without pesticides and requires 50% less water than conventional cotton.',
    materialInfo: '100% Organic Hemp',
    certifications: ['GOTS', 'Fair Trade'],
    ecoScore: {
      material: 38,
      labor: 28,
      certification: 20,
      transparency: 9,
      total: 95
    },
    reviews: [
      { id: 'r1', user: 'Alex G.', rating: 5, ecoAccuracyRating: 5, comment: 'Best hemp shirt I own. Truly transparent brand.', date: '2023-10-12' }
    ],
    isVerified: true
  },
  {
    id: '2',
    name: 'Recycled Ocean Denim',
    brand: 'Blue Wave',
    price: 120,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    description: 'Classic fit jeans made from 40% recycled ocean plastic and 60% organic cotton. Dyed using a waterless indigo process.',
    materialInfo: 'Recycled Polyester & Organic Cotton',
    certifications: ['GOTS'],
    ecoScore: {
      material: 32,
      labor: 25,
      certification: 10,
      transparency: 8,
      total: 75
    },
    reviews: [],
    isVerified: true
  },
  {
    id: '3',
    name: 'Natural Bamboo Cardigan',
    brand: 'GreenStyle',
    price: 85,
    discountPrice: 65,
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
    description: 'Soft bamboo viscose cardigan. Advertised as "100% Natural" but processed using conventional chemical methods.',
    materialInfo: 'Bamboo Viscose',
    certifications: [],
    ecoScore: {
      material: 15,
      labor: 12,
      certification: 0,
      transparency: 4,
      total: 31
    },
    reviews: [
      { id: 'r2', user: 'Sam R.', rating: 3, ecoAccuracyRating: 2, comment: 'Feels soft but "natural" is a stretch for viscose processing.', date: '2023-11-05' }
    ],
    isVerified: false,
    greenwashingFlag: 'Vague terms: "Natural" often hides chemical-heavy viscose processing.'
  },
  {
    id: '4',
    name: 'Recycled Pet Sneakers',
    brand: 'EcoStep',
    price: 110,
    discountPrice: 95,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    description: 'Lightweight sneakers with an upper made entirely from 15 recycled plastic bottles. The sole is made from natural wild rubber.',
    materialInfo: 'Recycled PET & Wild Rubber',
    certifications: ['Global Recycled Standard', 'B-Corp'],
    ecoScore: {
      material: 35,
      labor: 27,
      certification: 18,
      transparency: 8,
      total: 88
    },
    reviews: [
      { id: 'r3', user: 'Maya L.', rating: 5, ecoAccuracyRating: 5, comment: 'Super comfy and I love that they used plastic waste!', date: '2024-01-20' }
    ],
    isVerified: true
  },
  {
    id: '5',
    name: 'Cork Minimalist Wallet',
    brand: 'Oak & Bark',
    price: 35,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    description: 'A vegan alternative to leather, harvested sustainably from cork oak trees in Portugal. Naturally water-resistant and durable.',
    materialInfo: 'Sustainable Cork',
    certifications: ['PETA-Approved Vegan'],
    ecoScore: {
      material: 40,
      labor: 22,
      certification: 10,
      transparency: 9,
      total: 81
    },
    reviews: [],
    isVerified: true
  },
  {
    id: '6',
    name: 'Upcycled Denim Tote',
    brand: 'ReThread',
    price: 40,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    description: 'Large tote bag handcrafted from vintage denim scraps. Each piece is unique and prevents textile waste from entering landfills.',
    materialInfo: 'Upcycled Denim',
    certifications: [],
    ecoScore: {
      material: 39,
      labor: 29,
      certification: 0,
      transparency: 10,
      total: 78
    },
    reviews: [
      { id: 'r4', user: 'Jake W.', rating: 4, ecoAccuracyRating: 5, comment: 'Great quality and a cool story behind it.', date: '2024-02-14' }
    ],
    isVerified: true
  },
  {
    id: '7',
    name: 'Organic Linen Button-Up',
    brand: 'Loom & Leaf',
    price: 75,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1594932224456-7484cf66198e?auto=format&fit=crop&q=80&w=800',
    description: 'A timeless staple made from European flax. Linen is one of the most biodegradable and low-impact fabrics available.',
    materialInfo: '100% Organic Linen',
    certifications: ['OEKO-TEX'],
    ecoScore: {
      material: 37,
      labor: 24,
      certification: 15,
      transparency: 7,
      total: 83
    },
    reviews: [],
    isVerified: true
  },
  {
    id: '8',
    name: 'Pineapple Leather Belt',
    brand: 'Ananas Roots',
    price: 55,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1624222247344-550fbadcd973?auto=format&fit=crop&q=80&w=800',
    description: 'Made from Piñatex, an innovative textile made from pineapple leaf fiber—a byproduct of existing agriculture.',
    materialInfo: 'Piñatex (Pineapple Fiber)',
    certifications: ['B-Corp', 'PETA-Approved Vegan'],
    ecoScore: {
      material: 36,
      labor: 26,
      certification: 18,
      transparency: 8,
      total: 88
    },
    reviews: [],
    isVerified: true
  },
  {
    id: '9',
    name: 'Recycled Wool Beanie',
    brand: 'Cold Care',
    price: 30,
    discountPrice: 22,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf027?auto=format&fit=crop&q=80&w=800',
    description: 'Warm and cozy beanie made from 70% recycled wool and 30% recycled nylon. Perfect for winter impact reduction.',
    materialInfo: 'Recycled Wool Blend',
    certifications: ['GRS'],
    ecoScore: {
      material: 33,
      labor: 20,
      certification: 10,
      transparency: 6,
      total: 69
    },
    reviews: [
      { id: 'r5', user: 'Elena V.', rating: 5, ecoAccuracyRating: 4, comment: 'Warm and fits perfectly. Happy to support recycled wool.', date: '2023-12-01' }
    ],
    isVerified: true
  },
  {
    id: '10',
    name: 'Tencel Lounge Pants',
    brand: 'Flow State',
    price: 90,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=800',
    description: 'Silky smooth pants made from Tencel Lyocell, sourced from sustainably managed wood pulp in a closed-loop system.',
    materialInfo: 'Tencel Lyocell',
    certifications: ['OEKO-TEX', 'FSC Certified'],
    ecoScore: {
      material: 34,
      labor: 28,
      certification: 15,
      transparency: 9,
      total: 86
    },
    reviews: [],
    isVerified: true
  },
  {
    id: '11',
    name: 'Apple Leather Sneakers',
    brand: 'FruitStep',
    price: 135,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800',
    description: 'Innovative bio-based leather made from apple skins discarded by the juice industry. Luxury feel with zero animal impact.',
    materialInfo: 'AppleSkin Bio-leather',
    certifications: ['PETA-Approved Vegan'],
    ecoScore: {
      material: 38,
      labor: 25,
      certification: 10,
      transparency: 7,
      total: 80
    },
    reviews: [],
    isVerified: true
  },
  {
    id: '12',
    name: 'Ethical Alpaca Sweater',
    brand: 'Andean Heritage',
    price: 150,
    discountPrice: 125,
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
    description: 'Hand-knitted in Peru by fair-trade artisans. Alpaca wool is carbon neutral and biodegradable.',
    materialInfo: '100% Royal Alpaca',
    certifications: ['Fair Trade', 'Responsible Wool Standard'],
    ecoScore: {
      material: 36,
      labor: 30,
      certification: 20,
      transparency: 10,
      total: 96
    },
    reviews: [
      { id: 'r6', user: 'Sofia M.', rating: 5, ecoAccuracyRating: 5, comment: 'The softest sweater I have ever owned. Worth every penny.', date: '2024-01-15' }
    ],
    isVerified: true
  }
];

export const Icons = {
  Leaf: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Cart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Alert: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Facebook: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  ),
  Twitter: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Pinterest: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.93 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};
