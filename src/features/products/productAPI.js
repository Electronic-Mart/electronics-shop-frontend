const API_BASE = 'http://localhost:5000/api/products';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};
