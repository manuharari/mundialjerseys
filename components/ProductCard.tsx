import Image from 'next/image';
import type { FC } from 'react';

// Define the type for the product prop to ensure type safety
interface ProductCardProps {
  product: {
    id: string;
    createdAt: Date;
    title: string;
    title_en?: string | null;
    team: string;
    price: number;
    sizes: string;
    image?: string | null;
    sku: string;
    stockXS: number;
    stockS: number;
    stockM: number;
    stockL: number;
    stockXL: number;
  };
}

// Destructure the product prop directly
const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Product Image */}
      {product.image ? (
        <div className="relative w-full h-48 sm:h-64">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
        </div>
      ) : (
        <div className="w-full h-48 sm:h-64 bg-gray-300 flex items-center justify-center text-gray-500 rounded-t-xl">
          No Image
        </div>
      )}

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.team}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-900">${(product.price / 100).toFixed(2)}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

