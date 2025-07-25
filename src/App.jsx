import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer.jsx';
import './index.css';

const AppContent = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <AppRoutes />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
