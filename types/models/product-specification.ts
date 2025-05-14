import { GormModel } from './gorm-model';

export interface ProductSpecification extends GormModel {
  product_id: number;
  name: string;
  value: string;
  unit?: string;
} 