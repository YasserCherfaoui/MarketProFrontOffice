import { GormModel } from './gorm-model';
import type { Order } from './order';

export interface Invoice extends GormModel {
  order_id: number;
  order: Order;
  invoice_number: string;
  issue_date: string;
  due_date?: string;
  amount: number;
  tax_amount?: number;
  status: string;
  payment_date?: string;
  payment_method?: string;
  payment_reference?: string;
  notes?: string;
} 