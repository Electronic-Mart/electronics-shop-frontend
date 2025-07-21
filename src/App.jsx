import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;
