import { GormModel } from './gorm-model';
import type { Warehouse } from './warehouse';

export interface InventoryItem extends GormModel {
  ProductID: number;
  WarehouseID: number;
  Warehouse: Warehouse;
  Quantity: number;
  Reserved: number;
  BatchNumber?: string;
  ExpiryDate?: string;
  Status: string;
} 