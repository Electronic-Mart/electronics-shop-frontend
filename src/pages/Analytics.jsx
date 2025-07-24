import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    popularProduct: null,
  });

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const productList = JSON.parse(localStorage.getItem('reduxProducts')) || [];

    // Calculate values
    const totalOrders = storedOrders.length;
    const totalRevenue = storedOrders.reduce((sum, o) => sum + o.total, 0);
    const totalProducts = productList.length;

    const productSales = {};
    storedOrders.forEach(order => {
      order.items.forEach(item => {
        if (productSales[item.name]) {
          productSales[item.name] += item.quantity;
        } else {
          productSales[item.name] = item.quantity;
        }
      });
    });

    const popularProduct = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];

    setAnalytics({
      totalOrders,
      totalRevenue,
      totalProducts,
      popularProduct: popularProduct
        ? { name: popularProduct[0], quantity: popularProduct[1] }
        : null,
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main-content">
        <h2>Analytics Overview</h2>

        <div className="analytics-cards-container">
          <div className="analytics-card">
            <h4>Total Products</h4>
            <p>{analytics.totalProducts}</p>
          </div>

          <div className="analytics-card">
            <h4>Total Orders</h4>
            <p>{analytics.totalOrders}</p>
          </div>

          <div className="analytics-card">
            <h4>Total Revenue</h4>
            <p>Ksh {analytics.totalRevenue.toLocaleString()}</p>
          </div>

          <div className="analytics-card">
            <h4>Most Popular Product</h4>
            {analytics.popularProduct ? (
              <p>
                {analytics.popularProduct.name} ({analytics.popularProduct.quantity} sold)
              </p>
            ) : (
              <p>No data</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
