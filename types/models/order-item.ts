import { GormModel } from './gorm-model';
import type { InventoryItem } from './inventory-item';
import type { Product } from './product';

export interface OrderItem extends GormModel {
  order_id: number;
  product_id: number;
  product: Product;
  quantity: number;
  unit_price: number;
  tax_amount?: number;
  discount_amount?: number;
  total_amount: number;
  inventory_item_id?: number;
  inventory_item?: InventoryItem;
  status: string;
} 