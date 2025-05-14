import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';
import * as React from 'react';

interface CartItem {
  ID: number;
  name: string;
  base_price: number;
  images?: { url: string }[];
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose, cartItems, onQuantityChange, onRemove, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.base_price * item.quantity, 0);
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <aside className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-12">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.ID} className="flex gap-3 items-center border-b pb-3">
                  <img
                    src={item.images?.[0]?.url || 'https://via.placeholder.com/60'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">${item.base_price.toFixed(2)}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => onQuantityChange(item.ID, Math.max(1, item.quantity - 1))}>-</Button>
                      <span className="px-2">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => onQuantityChange(item.ID, item.quantity + 1)}>+</Button>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => onRemove(item.ID)}>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" disabled={cartItems.length === 0} onClick={onCheckout}>
            Checkout
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer; 