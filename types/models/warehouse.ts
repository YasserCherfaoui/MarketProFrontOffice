import type { Address } from './address';
import { GormModel } from './gorm-model';
import type { InventoryItem } from './inventory-item';

export interface Warehouse extends GormModel {
  name: string;
  code: string;
  address_id: number;
  address: Address;
  is_active: boolean;
  inventory_items?: InventoryItem[];
} 