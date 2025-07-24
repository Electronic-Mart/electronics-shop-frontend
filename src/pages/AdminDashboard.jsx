import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-main-content">
        <h2>Welcome to the Admin Dashboard</h2>

        <div className="admin-cards-container">
          <Link to="/admin/products" className="admin-card-link">
            <div className="admin-card">
              <h3>Manage Products</h3>
              <p>Add and delete electronic products from the platform.</p>
            </div>
          </Link>

          <Link to="/admin/users" className="admin-card-link">
            <div className="admin-card">
              <h3>Manage Users</h3>
              <p>View and assign roles to users managing products and orders.</p>
            </div>
          </Link>

          <Link to="/admin/analytics" className="admin-card-link">
            <div className="admin-card">
              <h3>Product Analytics</h3>
              <p>Track trends, views, and popularity of electronics.</p>
            </div>
          </Link>

          <Link to="/admin/analytics" className="admin-card-link">
            <div className="admin-card">
              <h3>Order Analytics</h3>
              <p>Monitor sales and customer order history.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
