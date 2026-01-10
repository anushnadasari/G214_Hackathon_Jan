
import React from 'react';
import { Product } from '../types';
import EcoScoreDisplay from './EcoScoreDisplay';
import { Icons } from '../constants';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.discountPrice && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            -{Math.round((1 - product.discountPrice / product.price) * 100)}%
          </div>
        )}
        {product.greenwashingFlag && (
          <div className="absolute top-4 right-4 bg-orange-100 text-orange-700 p-1.5 rounded-full shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-colors" title={product.greenwashingFlag}>
            <Icons.Alert />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{product.brand}</p>
          <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">{product.name}</h3>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {product.discountPrice ? (
            <>
              <span className="text-lg font-bold text-emerald-700">${product.discountPrice}</span>
              <span className="text-sm text-stone-400 line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-stone-900">${product.price}</span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-stone-100">
          <EcoScoreDisplay score={product.ecoScore} compact />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
