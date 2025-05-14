import type { Address } from './address';
import type { Company } from './company';
import { GormModel } from './gorm-model';
import type { OrderItem } from './order-item';
import type { User } from './user';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Order extends GormModel {
  order_number: string;
  user_id: number;
  user: User;
  company_id?: number;
  company?: Company;
  status: OrderStatus;
  payment_status: PaymentStatus;
  total_amount: number;
  tax_amount?: number;
  shipping_amount?: number;
  discount_amount?: number;
  final_amount: number;
  shipping_address_id: number;
  shipping_address: Address;
  shipping_method?: string;
  tracking_number?: string;
  payment_method?: string;
  payment_reference?: string;
  payment_date?: string;
  items?: OrderItem[];
  customer_notes?: string;
  admin_notes?: string;
  order_date: string;
  shipped_date?: string;
  delivered_date?: string;
} 