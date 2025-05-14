import type { Category } from './category';
import { GormModel } from './gorm-model';
import type { InventoryItem } from './inventory-item';
import type { ProductImage } from './product-image';
import type { ProductSpecification } from './product-specification';

export interface Product extends GormModel {
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  qr_code?: string;
  base_price: number;
  b2b_price?: number;
  cost_price?: number;
  weight?: number;
  weight_unit?: string;
  is_active: boolean;
  is_featured: boolean;
  images?: ProductImage[];
  categories?: Category[];
  inventory_items?: InventoryItem[];
  specifications?: ProductSpecification[];
} 