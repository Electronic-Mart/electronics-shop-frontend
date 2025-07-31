const API_BASE = 'https://electronics-shop-backend.onrender.com/api/users';

export const fetchMyProfileAPI = async (token) => {
  const response = await fetch(`${API_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
};

export const updateMyProfileAPI = async (data, token) => {
  const response = await fetch(`${API_BASE}/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
};
