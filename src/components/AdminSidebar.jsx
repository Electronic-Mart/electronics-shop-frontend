import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBoxOpen, FaUser, FaShoppingBag, FaChartBar } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h3 className="admin-sidebar-title">Admin</h3>

      <nav className="admin-nav">
        <NavLink to="/admin" className="admin-nav-main">
          <span>Main Page</span>
        </NavLink>

        <NavLink to="/admin/products" className="admin-nav-link">
          <FaBoxOpen className="admin-icon" />
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/users" className="admin-nav-link">
          <FaUser className="admin-icon" />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admin/analytics" className="admin-nav-link">
          <FaChartBar className="admin-icon" />
          <span>Analytics</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
