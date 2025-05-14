import type { DocumentType } from './document-type';
import { GormModel } from './gorm-model';

export interface InDocument extends GormModel {
  documentable_id: number;
  documentable_type: string;
  type: DocumentType;
  file_name: string;
  file_type: string;
  file_size?: number;
  s3_bucket: string;
  s3_key: string;
  url: string;
  description?: string;
  expires_at?: string;
} 