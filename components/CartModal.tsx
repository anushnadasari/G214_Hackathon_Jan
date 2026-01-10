
import React, { useState, useEffect } from 'react';
import { UserRole, Product, CartItem } from '../types';

interface CartModalProps {
  onClose: () => void;
  userRole: UserRole | null;
  onOpenLogin: () => void;
  initialStep?: 'cart' | 'checkout';
  product?: Product | null;
  cartItems: CartItem[];
}

type PaymentMethod = 'card' | 'upi' | 'cod';

const CartModal: React.FC<CartModalProps> = ({ onClose, userRole, onOpenLogin, initialStep = 'cart', product, cartItems }) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>(initialStep);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyerInfo(prev => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const isFormValid = () => {
    const newErrors: Record<string, boolean> = {};
    let valid = true;
    
    Object.entries(buyerInfo).forEach(([key, value]) => {
      const val = value as string;
      if (!val.trim()) {
        newErrors[key] = true;
        valid = false;
      }
    });

    if (paymentMethod === 'upi' && !upiId.trim()) {
        newErrors['upiId'] = true;
        valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handlePlaceOrder = () => {
    if (isFormValid()) {
      setStep('success');
    }
  };

  const inputClasses = (name: string) => `
    w-full px-4 py-3 bg-stone-50 border rounded-xl outline-none transition-all
    ${errors[name] ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-stone-200 focus:ring-2 focus:ring-emerald-500'}
  `;

  const PaymentOption = ({ id, label, icon }: { id: PaymentMethod, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setPaymentMethod(id)}
      className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
        paymentMethod === id 
          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' 
          : 'bg-white border-stone-200 text-stone-500 hover:border-stone-400'
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
    </button>
  );

  // If a specific product was passed (e.g., via Buy Now), use it; otherwise, use the cart items.
  // Note: For Buy Now, we assume a size was already selected in the parent and validation passed.
  const displayItems = cartItems; 
  const totalPrice = displayItems.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {step === 'cart' && 'Your Impact Cart'}
            {step === 'checkout' && 'Secure Checkout'}
            {step === 'success' && 'Order Confirmed!'}
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-900">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {step === 'cart' && (
            <div className="space-y-6">
              {displayItems.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-stone-400 italic">Your cart is currently empty.</p>
                </div>
              ) : (
                displayItems.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize}-${idx}`} className="flex gap-4 mb-6">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-lg" alt="" />
                    <div className="flex-grow">
                      <h4 className="font-bold">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-stone-500 uppercase tracking-widest">{item.brand}</p>
                        <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                        <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">SIZE: {item.selectedSize}</p>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center border border-stone-200 rounded-lg">
                          <button className="px-3 py-1 text-stone-500 hover:text-stone-900 transition-colors">-</button>
                          <span className="px-3 py-1 font-bold text-sm">{item.quantity}</span>
                          <button className="px-3 py-1 text-stone-500 hover:text-stone-900 transition-colors">+</button>
                        </div>
                        <span className="font-bold text-emerald-700">${(item.discountPrice || item.price) * item.quantity}.00</span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {!userRole && displayItems.length > 0 && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex gap-3">
                  <div className="text-amber-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <b>Sign in required:</b> Please log in to your EcoWear account to complete this ethical purchase and track your impact score.
                  </p>
                </div>
              )}

              {displayItems.length > 0 && (
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <p className="text-xs text-emerald-800 font-medium">
                    🌱 This purchase supports <b>Fair Trade</b> labor and saves approximately <b>250L of water</b> per garment compared to conventional options.
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 'checkout' && (
            <div className="space-y-6">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 mb-4">
                {displayItems.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex items-center gap-4 mb-2 last:mb-0">
                    <img src={item.image} className="w-8 h-8 object-cover rounded-lg" alt="" />
                    <div className="flex-grow flex justify-between items-center">
                      <p className="text-[10px] font-bold text-stone-900">{item.name} ({item.selectedSize}) x {item.quantity}</p>
                      <p className="text-[10px] font-bold text-emerald-700">${(item.discountPrice || item.price) * item.quantity}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-stone-200">
                   <p className="text-[10px] text-stone-500">Order Total: <span className="text-emerald-700 font-bold">${totalPrice}.00</span></p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Contact Details</label>
                <input 
                  type="text" 
                  name="name"
                  value={buyerInfo.name}
                  onChange={handleInputChange}
                  className={inputClasses('name')} 
                  placeholder="Full Name" 
                />
                <input 
                  type="tel" 
                  name="phone"
                  value={buyerInfo.phone}
                  onChange={handleInputChange}
                  className={inputClasses('phone')} 
                  placeholder="Contact Number" 
                />
                <input 
                  type="email" 
                  name="email"
                  value={buyerInfo.email}
                  onChange={handleInputChange}
                  className={inputClasses('email')} 
                  placeholder="Email Address" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Shipping Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={buyerInfo.address}
                  onChange={handleInputChange}
                  className={inputClasses('address')} 
                  placeholder="Street Address" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="city"
                    value={buyerInfo.city}
                    onChange={handleInputChange}
                    className={inputClasses('city')} 
                    placeholder="City" 
                  />
                  <input 
                    type="text" 
                    name="zip"
                    value={buyerInfo.zip}
                    onChange={handleInputChange}
                    className={inputClasses('zip')} 
                    placeholder="ZIP Code" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Payment Method</label>
                <div className="flex gap-2">
                  <PaymentOption 
                    id="card" 
                    label="Card" 
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} 
                  />
                  <PaymentOption 
                    id="upi" 
                    label="UPI" 
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} 
                  />
                  <PaymentOption 
                    id="cod" 
                    label="COD" 
                    icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} 
                  />
                </div>
                {paymentMethod === 'upi' && (
                  <input 
                    type="text" 
                    className={inputClasses('upiId')}
                    placeholder="UPI ID (e.g. user@upi)"
                    value={upiId}
                    onChange={e => { setUpiId(e.target.value); if(e.target.value.trim()) setErrors(prev => ({...prev, upiId: false})); }}
                  />
                )}
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Thank You!</h3>
              <p className="text-stone-500 max-w-xs">Your ethical order has been placed. You've made a difference today!</p>
              <button 
                onClick={onClose}
                className="mt-8 bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-stone-800 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {step !== 'success' && (
          <div className="p-6 border-t border-stone-100 bg-stone-50/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-stone-500">Order Total</span>
              <span className="text-xl font-bold text-stone-900">${totalPrice}.00</span>
            </div>
            
            {step === 'cart' ? (
              <button 
                disabled={displayItems.length === 0}
                onClick={() => userRole ? setStep('checkout') : onOpenLogin()}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {userRole ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>
            ) : (
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep('cart')}
                  className="flex-1 bg-white text-stone-900 border border-stone-200 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  className="flex-[2] bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-lg"
                >
                  Place Ethical Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
