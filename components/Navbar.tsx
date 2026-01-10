
import React from 'react';
import { Icons } from '../constants';
import { UserRole } from '../types';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenLogin: () => void;
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
  onSwitchPage: (page: 'home' | 'seller' | 'profile') => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenLogin, userRole, setUserRole, onSwitchPage, cartCount }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSwitchPage('home')}>
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Icons.Leaf />
              </div>
              <span className="text-2xl font-bold tracking-tight text-stone-900">ECO<span className="text-emerald-600">WEAR</span></span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => onSwitchPage('home')} className="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors">Shop All</button>
              <button className="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors">Brands</button>
              <button className="text-sm font-medium text-stone-600 hover:text-emerald-600 transition-colors">Impact Report</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Search />
              </div>
              <input 
                type="text" 
                placeholder="Search ethical brands..." 
                className="pl-10 pr-4 py-2 bg-stone-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none"
              />
            </div>

            <button 
              onClick={onOpenCart}
              className="p-2 text-stone-600 hover:bg-stone-100 rounded-full relative transition-all"
            >
              <Icons.Cart />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-200">
                  {cartCount}
                </span>
              )}
            </button>

            {userRole === 'seller' ? (
              <div className="flex items-center gap-2">
                 <button 
                  onClick={() => onSwitchPage('profile')}
                  className="p-2 text-stone-600 hover:bg-stone-100 rounded-full"
                >
                  <Icons.User />
                </button>
                 <button 
                  onClick={() => onSwitchPage('seller')}
                  className="bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-stone-800 transition-all shadow-sm"
                >
                  Portal
                </button>
                <button 
                  onClick={() => setUserRole(null)}
                  className="text-xs font-bold text-stone-400 hover:text-red-500 px-2"
                >
                  Logout
                </button>
              </div>
            ) : userRole === 'buyer' ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onSwitchPage('profile')}
                  className="p-2 text-stone-600 hover:bg-stone-100 rounded-full flex items-center gap-2 group transition-all"
                >
                  <Icons.User />
                  <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-600">Profile</span>
                </button>
                <button 
                  onClick={() => setUserRole(null)}
                  className="text-xs font-bold text-stone-400 hover:text-red-500 ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenLogin}
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-500/20"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
