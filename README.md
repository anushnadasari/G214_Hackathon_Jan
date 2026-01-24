# G214 Hackathon — January Edition
## Problem Statement ID: 20  
### Track: Sustainable Commerce & Lifestyle  
### Theme: Sustainable Fashion Marketplace

## Mission
Build a digital marketplace that connects eco-friendly clothing brands with conscious buyers.  
The platform should promote ethical alternatives to fast fashion, educate users, verify sustainability claims, and reduce environmental impact globally.

## Why this matters
Fast fashion contributes heavily to:
- Textile waste and landfill dumping
- High carbon emissions and water usage
- Unethical/unsafe labor practices

Your solution should help users make **transparent, verified, sustainable purchases**.

---

## Core Challenge
### ✅ Verifying Sustainability Claims (Anti-Greenwashing)
“Greenwashing” (fake or vague eco-friendly claims) is common in fashion.
Your platform must implement a system to **quantify, verify, and clearly display** sustainability impact.

---

## MVP Deliverables (Must Have)
Your prototype must include:

### 1) Product Listings
- Clean visual product browsing interface
- Rich imagery and product detail view

### 2) Sustainability Scores / Badges
A clear metric explaining *why* an item is sustainable, for example:
- Recycled Materials
- Fair Trade Labor
- Organic Cotton
- Low Water Use
- B-Corp Certified

### 3) Search & Filters
Advanced filters for:
- Material
- Ethical certification
- Size
- Price

### 4) Cart + Checkout Flow
- Functional cart
- Checkout flow (dummy/sandbox is fine)

### 5) User Reviews
Allow buyers to rate:
- Product quality
- Sustainability claim accuracy (trust rating)

---

## Stretch Goals (Bonus Features)
Teams can add:

- **AR Try-On**: Try clothes virtually using AR
- **AI Matching**: Style recommendations that suggest ethical alternatives
- **Carbon Tracking**: Estimate shipping carbon footprint to the user's location

---

## Evaluation Criteria
| Criterion | Weight | Notes |
|----------|--------|------|
| Impact | 35% | Waste reduction + ethical labor |
| UX/UI | 25% | Must look great (fashion is visual) |
| Technical | 25% | Backend stability, search, scoring logic |
| Scalability | 10% | Can handle many brands and traffic |
| Ethics | 5% | Transparency, privacy, responsible design |

---

## FAQ
### Q1: How do we verify a brand’s sustainability?
For hackathon purposes:
- Use existing certifications like **GOTS**, **Fair Trade**, **B-Corp**
- Allow brands to upload proof
- Optionally simulate an “admin verification panel”

### Q2: Where do we get product data?
Use:
- Public eco-certification databases
- Synthetic/placeholder products and brands for demo

### Q3: Do we need a real payment gateway?
No. Use a sandbox flow:
- Click “Buy”
- Enter dummy details
- Show success page
⚠️ Do NOT process real money.

### Q4: What tech stack should we use?
Any stack works:
- React / Vue / Next.js
- Node.js / Django / Flask etc.
Focus on:
- Fast performance
- Image optimization
- Smooth UX

---

## Tips for Success
1. **High-quality visuals matter most** (trust + conversion)
2. Make transparency a feature: show “Made In”, supply chain details, maps, etc.
3. Educate the user using tooltips for terms like *Upcycled*, *Circular Economy*
4. Add a greenwashing filter: vague claims = lower score
5. Show commercial viability: vendor onboarding, commission model, vendor portal

---

## Suggested Modules (Optional Architecture)
- `User App` (browse, filter, cart, reviews)
- `Vendor Portal` (upload products + certification docs)
- `Admin Panel` (approve certifications + flag greenwashing)
- `Scoring Engine` (badge + points calculation)

---

Good luck — and make sustainability stylish 🌿👕

