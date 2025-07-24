import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      ...form,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setForm({ name: '', email: '', password: '', role: 'user' });
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main-content">
        <h2>Manage Users</h2>

        <form onSubmit={handleAddUser} className="user-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="add-btn">Add User</button>
        </form>

        <div className="user-list-admin">
          {users.map((user) => (
            <div key={user.id} className="admin-user-card">
              <div>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <p>Role: {user.role}</p>
                <button onClick={() => handleDelete(user.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
