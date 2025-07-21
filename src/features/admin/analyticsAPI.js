const API_BASE = 'http://localhost:5000/api/admin';

export const fetchAdminDashboard = async (token) => {
  const response = await fetch(`${API_BASE}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch admin dashboard');
  return response.json();
};
