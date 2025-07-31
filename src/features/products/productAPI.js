const API_BASE = 'https://electronics-shop-backend.onrender.com/api/products/'; // ✅ with trailing slash

// ✅ Fetch all products
export const fetchProducts = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

// ✅ Create a new product (public access)
export const createProductAPI = async (productData) => {
  const cleanedData = {
    ...productData,
    price: parseFloat(productData.price),
  };

  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cleanedData),
  });

  // Always attempt to read response
  const data = await response.json();
  if (!response.ok) {
    console.error('❌ Backend error on product create:', data);
    throw new Error(data?.message || 'Failed to create product');
  }

  return data;
};

// ✅ Delete product (public access)
export const deleteProductAPI = async (productId) => {
  const response = await fetch(`${API_BASE}${productId}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  if (!response.ok) {
    console.error('❌ Backend error on product delete:', data);
    throw new Error(data?.message || 'Failed to delete product');
  }

  return data;
};
