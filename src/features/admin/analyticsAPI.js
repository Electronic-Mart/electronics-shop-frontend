const API_BASE = 'https://electronics-shop-backend.onrender.com/api/admin';

export const fetchAdminDashboard = async (token) => {
  const response = await fetch(`${API_BASE}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch admin dashboard');
  return response.json();
};
