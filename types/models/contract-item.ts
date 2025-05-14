import { GormModel } from './gorm-model';
import type { Product } from './product';

export interface ContractItem extends GormModel {
  contract_id: number;
  product_id: number;
  product: Product;
  quantity: number;
  unit_price: number;
  tax_amount?: number;
  total_amount: number;
  is_active: boolean;
} 