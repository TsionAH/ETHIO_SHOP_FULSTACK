# 🛍️ EthioShop – Fullstack E-Commerce Platform

**EthioShop** is a full-featured Ethiopian e-commerce web application built with **React (frontend)** and **Django REST Framework (backend)**.  
It allows users to explore and purchase traditional Ethiopian products with secure authentication and a smooth cart and payment experience.  
Admins can easily manage products, users, and orders.

---

## 🚀 Tech Stack

### 🧩 Backend (Django REST Framework)
- Python 3.x  
- Django  
- Django REST Framework (DRF)  
- PostgreSQL Database  
- JWT Authentication  
- Render Deployment Support  

### 💻 Frontend (React)
- React.js  
- Axios (for API communication)  
- React Router DOM (for navigation)  
- Tailwind CSS (for styling)  
- Render / Netlify ready deployment  

---

## ⚙️ Core Features

### 👤 User Functionality
- 🔐 User Registration & Login (JWT Auth)
- 👤 Profile Management  
- 🛍️ Browse Products & Materials  
- 🔎 Real-time Search Functionality  
- 🛒 Add to Cart / View Cart  
- 💳 Checkout and Payment Integration  

---

### 🛒 Cart System
- Add, remove, or update quantities  
- View total cart amount  
- Proceed to checkout  
- Persistent cart per user  

---

### 🧑‍💼 Admin Functionality
- Access Admin Dashboard  
- ➕ Add / ✏️ Edit / ❌ Delete Products  
- Manage Materials & Categories  
- Monitor Customer Orders  
- Manage Inventory and Product Details  

---

## 🔒 Authentication Flow

- JWT tokens generated during login  
- Tokens stored in `localStorage`  
- Protected routes:
  - `/cart-collection`
  - `/add-product` (admin only)
  - `/profile`
- Tokens automatically attached to every API call using Axios headers.

---

## 🧠 Project Structure

### 🖥️ Backend
-r requirements.txt
....
Backend_capstone1/
│
├── ethi_back/
│ ├── settings.py
│ ├── urls.py
│ └── wsgi.py
│
├── products/
│ ├── models.py
│ ├── serializers.py
│ ├── views.py
│ ├── urls.py
│ └── admin.py
│
├── users/
│ ├── models.py
│ ├── serializers.py
│ ├── views.py
│ └── urls.py
│
├── cart/
│ ├── models.py
│ ├── serializers.py
│ ├── views.py
│ └── urls.py
│
└── manage.py


---

### 🌐 Frontend


ethio-shop/
│
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── Form.jsx
│ │ ├── ProductList.jsx
│ │ ├── ProductCard.jsx
│ │ └── CartCollection.jsx
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Products.jsx
│ │ ├── Materials.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── Profile.jsx
│ │
│ ├── App.jsx
│ ├── index.jsx
│ ├── products.js (Axios instance)
│ └── constants.js
│
└── package.json

---

## 🧰 API Endpoints

### 🔑 Authentication
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/register/` | Register a new user |
| POST | `/api/token/` | Obtain JWT token |
| POST | `/api/token/refresh/` | Refresh JWT token |

### 🛍️ Products & Materials
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/products/` | Get all products |
| GET | `/api/products/:id/` | Get product detail |
| POST | `/api/products/` | Add product (admin only) |
| PUT | `/api/products/:id/` | Update product (admin only) |
| DELETE | `/api/products/:id/` | Delete product (admin only) |

### 🛒 Cart
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/cart/` | View cart |
| POST | `/api/cart/add/` | Add item to cart |
| POST | `/api/cart/remove/` | Remove item from cart |

---

## 🔍 Search Functionality

Search is implemented inside **`Products.jsx`**.  
It filters product names dynamically as users type:

```javascript
const filteredProducts = productList.filter((p) =>
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
);

