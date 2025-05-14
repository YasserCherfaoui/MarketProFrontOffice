export const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const apiUrl = `${baseUrl}/api/v1`;

export const apiRoutes = {
  categories: `${apiUrl}/categories`,
  products: `${apiUrl}/products`,
};
