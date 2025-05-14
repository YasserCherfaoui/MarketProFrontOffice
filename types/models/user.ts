import type { Address } from './address';
import { GormModel } from './gorm-model';

export type UserType = 'CUSTOMER' | 'WHOLESALER' | 'VENDOR' | 'ADMIN';

export interface User extends GormModel {
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  user_type: UserType;
  is_active: boolean;
  last_login?: string;
  company_id?: number;
  role?: string;
  addresses?: Address[];
} 