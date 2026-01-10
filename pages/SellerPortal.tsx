
import React, { useState, useRef } from 'react';
import { Icons } from '../constants';
import { Product } from '../types';

interface SellerPortalProps {
  onPublish: (product: Product) => void;
  existingProducts: Product[];
}

const SellerPortal: React.FC<SellerPortalProps> = ({ onPublish, existingProducts }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [view, setView] = useState<'listings' | 'add'>('listings');
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    brandStory: '', 
    price: '',
    category: 'Tops',
    material: 'Organic Cotton',
    certifications: [] as string[],
    description: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);

  const handleToggleCert = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert) 
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert('Please upload a valid image file (JPG or PNG).');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isAvi = file.name.toLowerCase().endsWith('.avi');
      if (!['video/mp4', 'video/x-msvideo', 'video/avi'].includes(file.type) && !isAvi) {
        alert('Please upload a valid video file (MP4 or AVI).');
        return;
      }
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      alert('Please upload at least one product photo.');
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        brand: formData.brand || "Independent Seller",
        price: parseFloat(formData.price),
        category: formData.category,
        image: imagePreview,
        description: formData.description,
        materialInfo: formData.material,
        certifications: formData.certifications,
        isVerified: false,
        reviews: [],
        ecoScore: {
          material: 30,
          labor: 25,
          certification: formData.certifications.length * 5,
          transparency: 8,
          total: 63 + (formData.certifications.length * 5)
        }
      };
      onPublish(newProduct);
      setIsUploading(false);
      alert('Success! Your ethical listing is now live.');
      setView('listings');
      // Reset form
      setFormData({
        name: '',
        brand: '',
        brandStory: '',
        price: '',
        category: 'Tops',
        material: 'Organic Cotton',
        certifications: [],
        description: ''
      });
      setImagePreview(null);
      setVideoPreview(null);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-stone-900">Seller Dashboard</h1>
          <p className="text-stone-500">Manage your ethical fashion brand and list new sustainable pieces.</p>
        </div>
        <button 
          onClick={() => setView(view === 'listings' ? 'add' : 'listings')}
          className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg ${
            view === 'listings' 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          {view === 'listings' ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              Add New Product
            </>
          ) : 'Cancel Listing'}
        </button>
      </div>

      {view === 'listings' ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Icons.Leaf /> Impact Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300 text-sm">Active Listings</span>
                  <span className="font-bold text-2xl">{existingProducts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300 text-sm">Water Saved</span>
                  <span className="font-bold text-2xl text-emerald-400">4.2k L</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setView('add')}
              className="md:col-span-2 group border-4 border-dashed border-stone-200 rounded-3xl flex flex-col items-center justify-center p-8 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-stone-400 hover:text-emerald-600"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold">List a new product</h4>
              <p className="text-sm mt-2">Every listing helps build a more ethical world.</p>
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6 font-serif">Your Live Listings</h3>
            {existingProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-stone-400 italic">No listings yet. Start your journey by clicking 'Add New Product'.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {existingProducts.map(p => (
                  <div key={p.id} className="flex gap-4 p-4 border rounded-2xl hover:border-emerald-600 transition-colors">
                    <img src={p.image} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-stone-900">{p.name}</h4>
                      <p className="text-xs text-stone-400 font-bold">${p.price} • {p.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Score: {p.ecoScore.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="md:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                      <Icons.User />
                    </div>
                    <h2 className="text-xl font-bold text-stone-900">Brand Info</h2>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Brand Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={formData.brand}
                    onChange={e => setFormData({...formData, brand: e.target.value})}
                    placeholder="e.g. Terra Threads"
                  />
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
                  <div className="w-8 h-8 bg-stone-100 text-stone-700 rounded-lg flex items-center justify-center">
                    <Icons.Leaf />
                  </div>
                  <h2 className="text-xl font-bold text-stone-900">Listing Details</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Product Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Recycled Linen Shirt"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Price (USD)</label>
                    <input 
                      required
                      type="number" 
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Category</label>
                    <select 
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Tops</option>
                      <option>Bottoms</option>
                      <option>Knitwear</option>
                      <option>Accessories</option>
                      <option>Shoes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Primary Material</label>
                    <select 
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.material}
                      onChange={e => setFormData({...formData, material: e.target.value})}
                    >
                      <option>Organic Cotton</option>
                      <option>Hemp</option>
                      <option>Recycled Polyester</option>
                      <option>Tencel / Lyocell</option>
                      <option>Linen</option>
                      <option>Bamboo Viscose</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Product Description</label>
                  <textarea 
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the fit, feel, and ethical production of this piece."
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Sustainability Certifications</label>
                  <div className="flex flex-wrap gap-2">
                    {['GOTS Certified', 'Fair Trade', 'B-Corp', 'Oeko-Tex', 'Global Recycled Standard'].map(cert => (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => handleToggleCert(cert)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                          formData.certifications.includes(cert) 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-emerald-600 hover:bg-white'
                        }`}
                      >
                        {cert}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Product Photo</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer group overflow-hidden h-40 flex items-center justify-center ${
                        imagePreview ? 'border-emerald-500 bg-emerald-50/10' : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                      }`}
                    >
                      <input type="file" ref={fileInputRef} className="hidden" accept=".jpg,.jpeg,.png" onChange={handleImageChange} />
                      {imagePreview ? (
                        <div className="absolute inset-0 w-full h-full">
                          <img src={imagePreview} className="w-full h-full object-contain" alt="Preview" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button type="button" onClick={removeImage} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 text-stone-400 group-hover:text-emerald-600">
                            <Icons.Leaf />
                          </div>
                          <span className="text-xs text-stone-600 font-bold">Add Photo</span>
                          <span className="text-[9px] text-stone-400 mt-1 uppercase">JPG, PNG</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Product Video</label>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase">Optional</span>
                    </div>
                    <div 
                      onClick={() => videoInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer group overflow-hidden h-40 flex items-center justify-center ${
                        videoPreview ? 'border-indigo-500 bg-indigo-50/10' : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                      }`}
                    >
                      <input type="file" ref={videoInputRef} className="hidden" accept=".mp4,.avi" onChange={handleVideoChange} />
                      {videoPreview ? (
                        <div className="absolute inset-0 w-full h-full">
                          <video src={videoPreview} className="w-full h-full object-contain" muted playsInline />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button type="button" onClick={removeVideo} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 text-stone-400 group-hover:text-indigo-500">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          </div>
                          <span className="text-xs text-stone-600 font-bold">Add Video</span>
                          <span className="text-[9px] text-stone-400 mt-1 uppercase">MP4, AVI</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {isUploading && (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                     <div>
                       <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Validating Ethical Listing...</p>
                       <p className="text-[10px] text-emerald-600">This ensures our high standard for sustainability.</p>
                     </div>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={isUploading}
                className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-xl shadow-stone-900/10 disabled:opacity-50 active:scale-95"
              >
                {isUploading ? 'Securing Content...' : 'Publish Ethical Listing'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl">
              <h4 className="text-amber-800 font-bold text-sm mb-2 flex items-center gap-2">
                 <Icons.Alert /> Pro Tips
              </h4>
              <p className="text-[11px] text-amber-700 leading-relaxed">
                Add at least 2 certifications like <b>GOTS</b> or <b>Fair Trade</b> to automatically boost your Eco-Score by 10 points. High scores lead to 3x more sales.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPortal;
