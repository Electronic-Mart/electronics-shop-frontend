const API_BASE = 'https://electronics-shop-backend.onrender.com/api/auth';
const USERS_API = 'https://electronics-shop-backend.onrender.com/api/users';

//  Login user
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data; // { user, token }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred during login');
  }
};

//  Register user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data; // { user, token }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred during registration');
  }
};

//  Update user profile
export const updateUserProfile = async (token, updatedData) => {
  try {
    const response = await fetch(`${USERS_API}/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Profile update failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'An error occurred while updating profile');
  }
};
