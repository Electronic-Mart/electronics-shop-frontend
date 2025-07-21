import React from 'react';
import { FaLaptop, FaMobileAlt, FaHeadphones } from 'react-icons/fa';
import '../index.css';

const CategorySection = () => {
  const categories = [
    { name: 'Laptops', icon: <FaLaptop />, color: 'orange' },
    { name: 'Phones', icon: <FaMobileAlt />, color: 'orange' },
    { name: 'Accessories', icon: <FaHeadphones />, color: 'orange' },
  ];

  return (
    <div className="category-section">
      {categories.map((cat) => (
        <div key={cat.name} className="category-card">
          <div className="icon">{cat.icon}</div>
          <div className="label-colored">{cat.name}</div>
          <div className="label-black">{cat.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
