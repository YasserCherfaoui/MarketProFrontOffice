import { GormModel } from './gorm-model';

export interface ProductImage extends GormModel {
  product_id: number;
  url: string;
  is_primary: boolean;
  alt_text?: string;
} 