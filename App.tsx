
import React, { useState, useEffect } from 'react';
import { Product, UserRole, CartItem, User } from './types';
import { MOCK_PRODUCTS, Icons } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import EcoScoreDisplay from './components/EcoScoreDisplay';
import ReviewSection from './components/ReviewSection';
import CartModal from './components/CartModal';
import SellerPortal from './pages/SellerPortal';

// --- Simulation Helpers ---
const STORAGE_KEY_USERS = 'ecowear_users_db';
const STORAGE_KEY_SESSION = 'ecowear_session';

const getStoredUsers = (): (User & { password?: string })[] => {
  const data = localStorage.getItem(STORAGE_KEY_USERS);
  return data ? JSON.parse(data) : [];
};

const saveUserToDb = (user: User & { password?: string }) => {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.email === user.email);
  if (index > -1) {
    users[index] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'product' | 'seller' | 'profile' | 'brand-view'>('home');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartModalStep, setCartModalStep] = useState<'cart' | 'checkout'>('cart');
  const [cartModalProduct, setCartModalProduct] = useState<Product | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  // Filter states
  const [activeFilter, setActiveFilter] = useState('All');

  // Load session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY_SESSION);
    if (savedSession) {
      const user = JSON.parse(savedSession) as User;
      setUserProfile(user);
      setUserRole(user.role);
    }
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(null);
    setSizeError(false);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    setActivePage('brand-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublishProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY_SESSION);
    setUserRole(null);
    setUserProfile(null);
    setActivePage('home');
  };

  const openCartFlow = (step: 'cart' | 'checkout' = 'cart', product: Product | null = null) => {
    if (!userRole) {
      setShowLogin(true);
      return;
    }

    if (product) {
      if (!selectedSize) {
        setSizeError(true);
        setTimeout(() => setSizeError(false), 500);
        return;
      }
      addToCart(product, selectedSize);
      setCartModalProduct(product);
    } else {
      setCartModalProduct(null);
    }
    setCartModalStep(step);
    setShowCart(true);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  const calculateAverageRating = (product: Product) => {
    if (product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / product.reviews.length).toFixed(1);
  };

  const LoginPage = () => {
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
    const [loginStep, setLoginStep] = useState<'form' | 'role'>('form');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (authMode === 'signup') {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
          setError("A valid Gmail address (@gmail.com) is required.");
          return;
        }
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
          setError("Please enter a valid phone number (at least 10 digits).");
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters long.");
          return;
        }
      }
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        const users = getStoredUsers();
        if (authMode === 'signin') {
          const user = users.find(u => u.email === email && u.password === password);
          if (user) {
            const { password: _, ...profileData } = user;
            setUserRole(user.role);
            setUserProfile(profileData as User);
            localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(profileData));
            setShowLogin(false);
            if (user.role === 'seller') setActivePage('seller');
          } else {
            setError("Invalid email or password. Please try again.");
          }
        } else {
          const exists = users.find(u => u.email === email);
          if (exists) {
            setError("An account with this email already exists. Try signing in.");
          } else {
            setLoginStep('role');
          }
        }
      }, 800);
    };

    const finalizeLogin = (role: UserRole) => {
      const newUserProfile: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: fullName || email.split('@')[0],
        email: email,
        phone: phone || 'Not provided',
        role: role,
        avatar: '',
        bio: role === 'buyer' ? 'Conscious consumer looking for impact.' : 'Sustainable brand making a difference.'
      };
      saveUserToDb({ ...newUserProfile, password });
      setUserRole(role);
      setUserProfile(newUserProfile);
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(newUserProfile));
      setShowLogin(false);
      if (role === 'seller') setActivePage('seller');
    };

    return (
      <div className="fixed inset-0 z-[150] bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white max-w-sm w-full p-8 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icons.Leaf />
            </div>
            <h2 className="text-3xl font-bold mb-2 font-serif text-stone-900">
              {loginStep === 'form' ? (authMode === 'signin' ? "Welcome Back" : "Join EcoWear") : "Choose Your Path"}
            </h2>
          </div>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center">{error}</div>}
          {loginStep === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <>
                  <input required type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none" />
                  <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none" />
                </>
              )}
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="yourname@gmail.com" className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none" />
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none" />
              <button disabled={isProcessing} className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all">{isProcessing ? "Processing..." : (authMode === 'signin' ? "Sign In" : "Create Account")}</button>
              <p className="text-center text-xs text-stone-400 mt-4">{authMode === 'signin' ? "Don't have an account?" : "Already have an account?"} <button type="button" onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')} className="text-emerald-600 font-bold">{authMode === 'signin' ? "Sign Up" : "Sign In"}</button></p>
            </form>
          )}
          {loginStep === 'role' && (
            <div className="space-y-4">
              <button onClick={() => finalizeLogin('buyer')} className="w-full p-4 border rounded-2xl hover:bg-emerald-50 text-left flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600"><Icons.Cart /></div>
                <div><p className="font-bold">Shop Sustainable</p><p className="text-xs text-stone-400">Join as a Buyer</p></div>
              </button>
              <button onClick={() => finalizeLogin('seller')} className="w-full p-4 border rounded-2xl hover:bg-stone-50 text-left flex items-center gap-4">
                <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-900"><Icons.Leaf /></div>
                <div><p className="font-bold">List Your Brand</p><p className="text-xs text-stone-400">Join as a Seller</p></div>
              </button>
            </div>
          )}
          <button onClick={() => setShowLogin(false)} className="w-full mt-6 text-stone-400 text-[10px] font-bold uppercase tracking-widest">DISMISS</button>
        </div>
      </div>
    );
  };

  const BrandProfilePage = ({ brandName }: { brandName: string }) => {
    const brandProducts = products.filter(p => p.brand === brandName);
    const avgEcoScore = brandProducts.length > 0 
      ? Math.round(brandProducts.reduce((acc, p) => acc + p.ecoScore.total, 0) / brandProducts.length)
      : 0;
    
    return (
      <div className="py-12 animate-in fade-in duration-700">
        <button 
          onClick={() => setActivePage('home')}
          className="mb-8 flex items-center gap-2 text-stone-400 hover:text-stone-900 font-bold text-sm uppercase tracking-widest transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO MARKETPLACE
        </button>

        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-stone-200 mb-16 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="w-32 h-32 bg-stone-900 rounded-3xl flex items-center justify-center text-white text-4xl font-serif shadow-xl">
              {brandName.charAt(0)}
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-5xl font-bold text-stone-900 font-serif">{brandName}</h1>
                <div className="flex items-center justify-center md:justify-start gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  <Icons.Leaf />
                  Verified Sustainable
                </div>
              </div>
              <p className="text-xl text-stone-500 max-w-2xl mb-8 leading-relaxed italic">
                "Pioneering transparency in every thread. We believe that fashion should never come at the cost of our planet."
              </p>
              
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Brand Eco Score</p>
                  <p className="text-3xl font-bold text-emerald-600">{avgEcoScore}/100</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Impact Rank</p>
                  <p className="text-3xl font-bold text-stone-900">Top 5%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Ethics Score</p>
                  <p className="text-3xl font-bold text-stone-900">A+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-stone-900 mb-10 font-serif">Collections from {brandName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {brandProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={handleProductClick}
            />
          ))}
        </div>
      </div>
    );
  };

  const ProfilePage = () => {
    if (!userProfile) return null;
    return (
      <div className="py-12 animate-in fade-in duration-700">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[3rem] p-12 border border-stone-200 shadow-sm text-center">
            <div className="w-24 h-24 bg-emerald-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
              {userProfile.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-4xl font-bold text-stone-900 mb-2 font-serif">{userProfile.name}</h1>
            <p className="text-stone-500 mb-8 font-medium">{userProfile.email}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Account Role</p>
                <p className="text-lg font-bold text-stone-900 capitalize">{userProfile.role}</p>
              </div>
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Impact Score</p>
                <p className="text-lg font-bold text-emerald-600">850 Points</p>
              </div>
            </div>

            <div className="text-left space-y-6">
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 border-b pb-2">Your Bio</h3>
                <p className="text-stone-600 leading-relaxed italic">
                  {userProfile.bio || "No bio provided yet."}
                </p>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="mt-12 text-red-500 font-bold text-sm uppercase tracking-widest hover:underline"
            >
              Sign Out of Account
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        onOpenCart={() => openCartFlow('cart')} 
        onOpenLogin={() => setShowLogin(true)}
        userRole={userRole}
        setUserRole={(role) => {
          if (role === null) handleLogout();
          else setUserRole(role);
        }}
        onSwitchPage={(p) => setActivePage(p as any)}
        cartCount={cartCount}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activePage === 'home' && (
          <div className="py-12 animate-in fade-in duration-700">
            <header className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-4 tracking-tight leading-tight font-serif">
                Dress for the <span className="text-emerald-700 italic underline decoration-emerald-200 decoration-8 underline-offset-2">World</span> <br />You Want to Live In.
              </h1>
              <p className="text-xl text-stone-500 max-w-2xl leading-relaxed">
                EcoWear is a transparent marketplace for ethical fashion. Every product is scored across materials, labor, and certifications.
              </p>
            </header>

            <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide mb-8">
              {['All', 'Tops', 'Bottoms', 'Knitwear', 'Accessories', 'Shoes'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap ${
                    activeFilter === filter 
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md scale-105' 
                      : 'bg-white text-stone-500 border-stone-200 hover:border-emerald-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </div>
        )}

        {activePage === 'product' && selectedProduct && (
          <div className="py-12 animate-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={() => setActivePage('home')}
              className="mb-8 flex items-center gap-2 text-stone-400 hover:text-stone-900 font-bold text-sm uppercase tracking-widest transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              BACK TO EXPLORE
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                <div className="rounded-[2.5rem] overflow-hidden bg-stone-100 aspect-[4/5] shadow-inner relative group">
                  <img src={selectedProduct.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={selectedProduct.name} />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <button 
                      onClick={() => handleBrandClick(selectedProduct.brand)}
                      className="text-emerald-700 font-bold uppercase tracking-widest text-xs hover:underline"
                    >
                      {selectedProduct.brand}
                    </button>
                    <div className="flex items-center gap-2">
                       <div className="flex text-amber-400">
                          {'★'.repeat(Math.round(Number(calculateAverageRating(selectedProduct))))}
                          <span className="text-stone-300">{'★'.repeat(5 - Math.round(Number(calculateAverageRating(selectedProduct))))}</span>
                       </div>
                       <span className="text-sm font-bold text-stone-900">{calculateAverageRating(selectedProduct)}</span>
                       <span className="text-[10px] text-stone-400 font-bold">({selectedProduct.reviews.length} REVIEWS)</span>
                    </div>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 font-serif">{selectedProduct.name}</h2>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4 text-3xl font-bold text-stone-900">
                      {selectedProduct.discountPrice ? (
                        <>
                          <span className="text-emerald-700">${selectedProduct.discountPrice}</span>
                          <span className="text-lg text-stone-400 line-through font-normal">${selectedProduct.price}</span>
                        </>
                      ) : (
                        <span>${selectedProduct.price}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-stone-500 leading-relaxed text-lg mb-8">
                    {selectedProduct.description}
                  </p>

                  <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 mb-8 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-stone-900 text-white rounded-2xl flex items-center justify-center text-xl font-serif">
                        {selectedProduct.brand.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900">{selectedProduct.brand}</h4>
                        <div className="flex items-center gap-2">
                           <div className="flex text-amber-400 text-xs">
                              {'★'.repeat(Math.round(Number(calculateAverageRating(selectedProduct))))}
                              <span className="text-stone-300">{'★'.repeat(5 - Math.round(Number(calculateAverageRating(selectedProduct))))}</span>
                           </div>
                           <span className="text-[10px] font-bold text-stone-400">BRAND TRUST SCORE: A+</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleBrandClick(selectedProduct.brand)}
                      className="px-6 py-2.5 bg-white border border-stone-200 text-stone-900 rounded-full text-xs font-bold hover:bg-stone-900 hover:text-white transition-all shadow-sm"
                    >
                      View Profile
                    </button>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div className={`space-y-3 transition-all ${sizeError ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
                    <div className="flex justify-between items-center">
                      <label className={`text-[10px] font-bold uppercase tracking-widest ${sizeError ? 'text-red-500' : 'text-stone-500'}`}>
                        {sizeError ? 'Please Select a Size' : 'Select Size'}
                      </label>
                      {selectedSize && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">SELECTED: {selectedSize}</span>}
                    </div>
                    <div className="flex gap-2">
                      {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                        <button 
                          key={size} 
                          onClick={() => {
                            setSelectedSize(size);
                            setSizeError(false);
                          }}
                          className={`w-12 h-12 rounded-xl border font-bold text-sm transition-all active:scale-90 ${
                            selectedSize === size 
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20' 
                              : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-600 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => openCartFlow('cart', selectedProduct)}
                        className="w-full bg-white text-stone-900 border-2 border-stone-900 py-4 rounded-[1.5rem] font-bold text-lg hover:bg-stone-50 transition-all active:scale-95 flex items-center justify-center gap-3"
                      >
                        <Icons.Cart />
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => openCartFlow('checkout', selectedProduct)}
                        className="w-full bg-emerald-600 text-white py-4 rounded-[1.5rem] font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>

                <EcoScoreDisplay score={selectedProduct.ecoScore} />
              </div>
            </div>

            <ReviewSection reviews={selectedProduct.reviews} canReview={!!userRole} />
          </div>
        )}

        {activePage === 'brand-view' && selectedBrand && (
          <BrandProfilePage brandName={selectedBrand} />
        )}

        {activePage === 'seller' && userRole === 'seller' && (
          <SellerPortal 
            onPublish={handlePublishProduct} 
            existingProducts={products.filter(p => p.brand === userProfile?.name)}
          />
        )}

        {activePage === 'profile' && userProfile && (
          <ProfilePage />
        )}
      </main>

      {showCart && <CartModal 
        onClose={() => setShowCart(false)} 
        userRole={userRole}
        onOpenLogin={() => setShowLogin(true)}
        initialStep={cartModalStep}
        product={cartModalProduct}
        cartItems={cart}
      />}
      {showLogin && <LoginPage />}
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
      `}</style>
    </div>
  );
};

export default App;
