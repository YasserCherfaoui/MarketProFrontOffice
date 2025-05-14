import type { Category } from '../../types/models/category';
import type { Product } from '../../types/models/product';
import { apiRoutes } from '../app/constants';
interface APIError {
  code: string;
  description: string;
}

interface APIResponse<T> {
  status: string;
  message: string;
  data?: T;
  error?: APIError;
}

async function fetchFromAPI<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const json: APIResponse<T> = await res.json();
  if (!res.ok) {
    const errorMsg = json.error?.description || json.message || 'Unknown error';
    throw new Error(errorMsg);
  }
  if (json.data === undefined) {
    throw new Error('No data in API response');
  }
  return json.data;
}

export async function fetchProducts(): Promise<Product[]> {
  return fetchFromAPI<Product[]>(apiRoutes.products);
}

export async function fetchCategories(): Promise<Category[]> {
  return fetchFromAPI<Category[]>(apiRoutes.categories);
}

// Add more API functions as needed, e.g. fetchProductById, createOrder, etc. 