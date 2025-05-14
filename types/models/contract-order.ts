import type { Contract } from './contract';
import type { ContractSchedule } from './contract-schedule';
import { GormModel } from './gorm-model';
import type { Order } from './order';

export interface ContractOrder extends GormModel {
  contract_id: number;
  contract: Contract;
  order_id: number;
  order: Order;
  schedule_id: number;
  schedule: ContractSchedule;
  generated_date: string;
  status: string;
  error?: string;
} 