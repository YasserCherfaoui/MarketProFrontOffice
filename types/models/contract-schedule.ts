import { GormModel } from './gorm-model';

export interface ContractSchedule extends GormModel {
  contract_id: number;
  frequency: string;
  day_of_week?: number;
  day_of_month?: number;
  time_of_day?: string;
  last_generated?: string;
  next_generation?: string;
  is_active: boolean;
} 