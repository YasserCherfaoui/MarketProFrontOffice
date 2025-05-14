import { GormModel } from './gorm-model';
import type { User } from './user';

export interface Company extends GormModel {
  name: string;
  vat_number?: string;
  registration_number?: string;
  phone?: string;
  email?: string;
  website?: string;
  is_verified: boolean;
  credit_limit?: number;
  payment_terms?: number;
  address_id: number;
  users?: User[];
} 