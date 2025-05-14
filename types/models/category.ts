import { GormModel } from './gorm-model';
import type { Product } from './product';
export interface Category extends GormModel {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: number;
  parent?: Category;
  children?: Category[];
  products?: Product[];
} 