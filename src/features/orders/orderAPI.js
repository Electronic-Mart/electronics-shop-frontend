const API_BASE = 'https://electronics-shop-backend.onrender.com/api/orders';

export const placeOrder = async (orderData, token) => {
  const response = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error('Failed to place order');
  return response.json();
};

export const fetchUserOrders = async (token) => {
  const response = await fetch(`${API_BASE}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch orders');
  return response.json();
};
