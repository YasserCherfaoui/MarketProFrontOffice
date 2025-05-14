import { GormModel } from './gorm-model';

export interface Address extends GormModel {
  street_address1: string;
  street_address2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  user_id: number;
} 