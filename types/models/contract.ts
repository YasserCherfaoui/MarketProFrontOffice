import type { Company } from './company';
import type { ContractItem } from './contract-item';
import type { ContractSchedule } from './contract-schedule';
import type { ContractStatus } from './contract-status';
import type { Document } from './document';
import { GormModel } from './gorm-model';
export interface Contract extends GormModel {
  contract_number: string;
  company_id: number;
  company?: Company;
  status: ContractStatus;
  start_date: string;
  end_date?: string;
  auto_renew: boolean;
  renewal_period?: number;
  payment_terms?: number;
  notes?: string;
  items?: ContractItem[];
  schedule?: ContractSchedule;
  documents?: Document[];
} 