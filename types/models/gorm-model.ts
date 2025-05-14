export interface GormModel {
  ID: number;
  CreatedAt: string; // ISO date string
  UpdatedAt: string; // ISO date string
  DeletedAt?: string | null; // ISO date string or null
} 