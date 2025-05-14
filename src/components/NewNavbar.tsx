import { ShoppingCart } from 'lucide-react';
import * as React from 'react';

interface NewNavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const NewNavbar: React.FC<NewNavbarProps> = ({ cartCount, onCartClick }) => (
  <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Algeria Market" className="h-[90px]" />
        <span className="font-bold text-xl text-primary">Algeria Market </span>
        <nav className="hidden md:flex gap-6 ml-8">
          <a href="/" className="text-gray-700 hover:text-primary transition">Home</a>
          <a href="/catalogue" className="text-gray-700 hover:text-primary transition">Catalogue</a>
          <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative" onClick={onCartClick} aria-label="Cart">
          <ShoppingCart className="h-6 w-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </nav>
);

export default NewNavbar; 