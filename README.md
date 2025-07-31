# Electro Mart - Frontend

Welcome to the **frontend** of Electro Mart — a modern e-commerce platform for selling and managing electronic products. This responsive, role-based web application is built with **React + Vite** and communicates with a Flask backend via REST APIs.

---

## Live Demo

>  Coming soon...

---

## Tech Stack

- **React** (with Vite)
- **Redux Toolkit** (state management)
- **React Router DOM** (routing)
- **LocalStorage** (for session persistence)
- **Custom CSS** (responsive and mobile-first design)

---

## Features

### Authentication
- Login & Register (with simulated backend and localStorage)
- Role-based access control (`admin` vs `user`)
- Auto-persistence of login state via localStorage

### Products
- View all products categorized (e.g., phones, laptops, accessories)
- Click on a product to view detailed information
- Add to Cart via "View Details" button

### Cart
- View all items added to cart
- Adjust quantities (increment/decrement)
- Delete individual items
- View cart total and proceed to checkout
- Cart count reflects **unique items only**

### Checkout
- Simulated checkout process
- Accessible only to authenticated users

###  User Profile
- View and update user details (name, email, password, phone)
- See past orders associated with the logged-in user

### ⚙ Admin Panel
> Accessible only to: `alexnjugi11@gmail.com` with password `1234`

- **Admin Dashboard**
- **Manage Products**: Add, update, and delete products
- **Manage Users**: View all users with their roles
- **Analytics**: View total orders, revenue, and product trends

###  Mobile Friendly
- Fully responsive with a hamburger menu for mobile navigation

---

## Folder Structure

src/
├── components/ # Reusable UI components (e.g., Navbar, ProductCard)
├── features/ # Redux slices & API logic
│ ├── auth/
│ ├── cart/
│ ├── products/
│ └── admin/
├── pages/ # Page components for routing
│ ├── ProductList.jsx
│ ├── ProductDetails.jsx
│ ├── Cart.jsx
│ ├── Profile.jsx
│ ├── AdminDashboard.jsx
│ └── ...
├── routes/ # AppRoutes.jsx
├── index.css # Global styling
└── main.jsx # App entry point

yaml
Copy
Edit

---

## 🛠 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/electro-mart-frontend.git
   cd electro-mart-frontend
Install dependencies

bash
Copy
Edit
npm install
Run the app locally

bash
Copy
Edit
npm run dev
Connect to backend

Make sure your backend server (Flask API) is running and its base URL is correctly set in your API files (e.g., authAPI.js, productsAPI.js, etc.)

 Testing
 Coming soon: Jest tests for reducers and components

 Contributing
We welcome improvements, refactors, and bug fixes. Please fork the repo and open a pull request.

 License
This project is open-source and available under the MIT License.

 Contact
Developer: Alex Njugi Karanja

Email: alexnjugi11@gmail.com

Portfolio: alexnjugi.com
