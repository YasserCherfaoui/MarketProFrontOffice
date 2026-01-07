// Integrated with 21st.dev modern product catalogue UI
"use client";

import CartDrawer from "@/components/CartDrawer";
import NewNavbar from "@/components/NewNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@heroui/checkbox";
import { useQuery } from '@tanstack/react-query';
import {
  Filter,
  Heart,
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
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = product.images || [];
  return (
    <Card className="h-full overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {images.length > 0 ? (
          <img 
            src={images[currentImageIndex].url} 
            alt={product.name}
            className="h-full w-full object-cover transition-all hover:scale-105 duration-300"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`h-1.5 w-6 rounded-full ${idx === currentImageIndex ? 'bg-primary' : 'bg-background/70'}`}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {product.b2b_price && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            B2B: ${product.b2b_price.toFixed(2)}
          </Badge>
        )}
        {!product.is_active && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="destructive" className="text-base py-1.5">Inactive</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-primary text-primary mr-1" />
            <span className="text-sm font-medium">{product.base_price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1">
            {product.categories?.map((category) => (
              <Badge key={category.ID} variant="outline" className="text-xs">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        <h3 className="font-semibold text-lg line-clamp-1 mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${product.base_price.toFixed(2)}</span>
            {product.b2b_price && (
              <span className="text-muted-foreground text-sm">B2B: ${product.b2b_price.toFixed(2)}</span>
            )}
          </div>
          <Button size="sm" disabled={!product.is_active} onClick={() => onAddToCart(product)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          {product.specifications?.slice(0, 4).map((spec) => (
            <div key={spec.ID}>
              <span className="text-muted-foreground">{spec.name}:</span>{" "}
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
          {product.specifications && product.specifications.length > 4 && (
            <Button variant="link" className="text-xs p-0 h-auto col-span-2">
              Show more specifications
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Recursive Category List for Sidebar
const CategoryList: React.FC<{
  categories: Category[];
  selectedCategories: number[];
  onCategoryChange: (categoryId: number) => void;
}> = ({ categories, selectedCategories, onCategoryChange }) => (
  <ul className="pl-2">
    {categories
      .filter((category) => !category.parent_id) // Only show parent categories at the top level
      .map((category) => (
        <li key={category.ID} className="mb-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category.ID}`}
              checked={selectedCategories.includes(category.ID)}
              onChange={() => onCategoryChange(category.ID)}
            />
            <Label htmlFor={`category-${category.ID}`}>{category.name}</Label>
          </div>
          {category.children && category.children.length > 0 && (
            <ul className="pl-4">
              {category.children.map((child) => (
                <li key={child.ID} className="mb-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${child.ID}`}
                      checked={selectedCategories.includes(child.ID)}
                      onChange={() => onCategoryChange(child.ID)}
                    />
                    <Label htmlFor={`category-${child.ID}`}>{child.name}</Label>
                  </div>
                  {/* If children have their own children, render recursively */}
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