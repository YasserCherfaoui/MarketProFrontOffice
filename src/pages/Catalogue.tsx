// Integrated with 21st.dev modern product catalogue UI
"use client";

import CartDrawer from "@/components/CartDrawer";
import NewNavbar from "@/components/NewNavbar";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useQuery } from '@tanstack/react-query';
import {
  Filter,
  Menu,
  Search,
  ShoppingCart,
  Star,
  X
} from "lucide-react";
import * as React from "react";
import { fetchCategories, fetchProducts } from '../services/apiService';

import type { Category } from "../../types/models/category";
import type { Product } from "../../types/models/product";


// Mock Data


// Product Card Component
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [currentImageIndex] = React.useState(0);
  const images = product.images || [];
  // Demo values for visual only
  const rating = 4.8;
  const ratingCount = 17000;
  const sold = 18;
  const stock = 35;
  const old_price = product.base_price * 1.5; // Demo old price for discount
  const hasDiscount = old_price > product.base_price;

  return (
    <div className="product-card h-full p-4 border border-gray-100 hover:border-primary rounded-2xl relative transition-all duration-200 bg-white flex flex-col">
      <a
        href={"/product-details-two"}
        className="product-card__thumb flex justify-center items-center rounded-lg bg-gray-50 relative aspect-square overflow-hidden"
      >
        {images.length > 0 ? (
          <img
            src={images[currentImageIndex].url}
            alt={product.name}
            className="w-auto max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
        )}
        {/* Discount badge if applicable */}
        {hasDiscount && (
          <span className="product-card__badge bg-danger-600 px-2 py-1 text-xs text-white absolute left-0 top-0 rounded-bl-lg rounded-tr-lg">Sale {Math.round(100 - (product.base_price / old_price) * 100)}%</span>
        )}
      </a>
      <div className="product-card__content mt-4 flex flex-col flex-1">
        <h6 className="title text-base font-semibold mt-2 mb-2 line-clamp-2">
          <a href={"/product-details-two"} className="link hover:text-primary transition-colors">
            {product.name}
          </a>
        </h6>
        <div className="flex items-center mb-3 mt-2 gap-2">
          <span className="text-xs font-medium text-gray-500">{rating}</span>
          <span className="text-yellow-500 flex items-center text-base">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </span>
          <span className="text-xs font-medium text-gray-500">({ratingCount.toLocaleString()})</span>
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-primary-600 h-1.5 rounded-full"
              style={{ width: `${Math.round((sold / stock) * 100)}%` }}
            />
          </div>
          <span className="text-gray-900 text-xs font-medium mt-2 block">
            Sold: {sold}/{stock}
          </span>
        </div>
        <div className="product-card__price my-4 flex items-center gap-2">
          {hasDiscount && (
            <span className="text-gray-400 text-sm font-semibold line-through">
              ${old_price.toFixed(2)}
            </span>
          )}
          <span className="text-heading text-base font-semibold">
            ${product.base_price.toFixed(2)} <span className="text-gray-500 font-normal">/Qty</span>
          </span>
        </div>
        <button
          className="product-card__cart btn bg-gray-50 text-gray-900 hover:bg-primary hover:text-white py-2 px-6 rounded-lg flex items-center justify-center gap-2 font-medium mt-auto"
          onClick={() => onAddToCart(product)}
          disabled={!product.is_active}
        >
          Add To Cart <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Redesigned Category List for Sidebar
const CategoryList: React.FC<{
  categories: Category[];
  selectedCategories: number[];
  onCategoryChange: (categoryId: number) => void;
}> = ({ categories, selectedCategories, onCategoryChange }) => (
  <ul className="max-h-[540px] overflow-y-auto space-y-2">
    {categories
      .filter((category) => !category.parent_id)
      .map((category) => (
        <li key={category.ID} className="mb-2">
          <button
            type="button"
            className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-md transition-colors border border-transparent hover:bg-primary/10 hover:text-primary font-medium ${selectedCategories.includes(category.ID) ? 'bg-primary/10 text-primary border-primary' : 'text-gray-900'}`}
            onClick={() => onCategoryChange(category.ID)}
          >
            <span>{category.name}</span>
            {/* <span className="text-xs text-gray-500 font-normal">({category.products?.length ?? 12})</span> */}
          </button>
          {category.children && category.children.length > 0 && (
            <ul className="pl-4 mt-1 space-y-1">
              {category.children.map((child) => (
                <li key={child.ID}>
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-md transition-colors border border-transparent hover:bg-primary/10 hover:text-primary font-medium ${selectedCategories.includes(child.ID) ? 'bg-primary/10 text-primary border-primary' : 'text-gray-900'}`}
                    onClick={() => onCategoryChange(child.ID)}
                  >
                    <span>{child.name}</span>
                    {/* <span className="text-xs text-gray-500 font-normal">({child.products?.length ?? 12})</span> */}
                  </button>
                  {/* Recursive for deeper subcategories */}
                  {child.children && child.children.length > 0 && (
                    <CategoryList
                      categories={child.children}
                      selectedCategories={selectedCategories}
                      onCategoryChange={onCategoryChange}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
  </ul>
);

// Main Product Catalogue Component
const ProductCatalogue: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>([]);
  const [, setSidebarOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState<{ ID: number; name: string; base_price: number; images?: { url: string }[]; quantity: number; }[]>([]);

  // Fetch categories and products
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });
  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  // Use fetched data or fallback to empty array
  const categoryList = categories?.filter(category => category.parent_id === null) || [];
  const productList = products || [];

  const filteredProducts = React.useMemo(() => {
    return productList.filter(product => {
      // Filter by search query
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      // Filter by selected categories
      const matchesCategory = selectedCategories.length === 0 || 
        product.categories?.some(cat => selectedCategories.includes(cat.ID));
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories, productList]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.ID === product.ID);
      if (existing) {
        return prev.map(item =>
          item.ID === product.ID ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ID: product.ID,
          name: product.name,
          base_price: product.base_price,
          images: product.images,
          quantity: 1,
        },
      ];
    });
  };

  const handleCartQuantityChange = (id: number, quantity: number) => {
    setCart(prev => prev.map(item => item.ID === id ? { ...item, quantity } : item));
  };

  const handleCartRemove = (id: number) => {
    setCart(prev => prev.filter(item => item.ID !== id));
  };

  const handleCheckout = () => {
    alert('Checkout not implemented.');
  };

  return (
    <div className="min-h-screen bg-background">
      <NewNavbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onQuantityChange={handleCartQuantityChange}
        onRemove={handleCartRemove}
        onCheckout={handleCheckout}
      />
      <header className="border-b border-border sticky top-0 z-40 bg-background">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Product Catalogue</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Categories</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
                </div>
                {categoriesLoading ? (
                  <div className="text-gray-400">Loading categories...</div>
                ) : categoriesError ? (
                  <div className="text-red-500">Failed to load categories</div>
                ) : (
                  <CategoryList
                    categories={categoryList}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Products</h2>
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {productList.length} products
                </p>
              </div>
              <Button variant="outline" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            {productsLoading ? (
              <div className="text-center py-12 text-gray-400">Loading products...</div>
            ) : productsError ? (
              <div className="text-center py-12 text-red-500">Failed to load products</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.ID} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogue; 