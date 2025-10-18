# EthioShop Fullstack Project

EthioShop is a fullstack e-commerce application built with **Django REST Framework** for the backend and **React.js** for the frontend. It allows users to browse products, search, add items to a cart, and for admin users, add new products. The project is deployed on **Render** (backend) and **Vercel / other hosting** (frontend).

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Frontend Usage](#frontend-usage)
8. [Authentication](#authentication)
9. [Deployment](#deployment)
10. [Credits](#credits)

---

## **Features**
- User registration and login
- JWT-based authentication (access & refresh tokens)
- Browse, search, and filter products
- Add products to cart
- Admin panel for adding new products
- Protected routes for authenticated users
- Responsive frontend design

---

## **Technologies Used**
**Backend:**
- Python 3.x
- Django 4.x
- Django REST Framework (DRF)
- PostgreSQL (or SQLite for local development)
- CORS Headers
- JWT Authentication

**Frontend:**
- React.js
- Axios for API calls
- React Router for navigation
- Tailwind CSS for styling

**Deployment:**
- Render (backend)
- Vercel / Netlify (frontend)

---

## **Project Structure**

ethio-shop/
├─ Backend/
│ ├─ ethio_back/ # Django project
│ ├─ products/ # Django app (products, cart, auth)
│ ├─ manage.py
│ ├─ requirements.txt
│ └─ settings.py
├─ Frontend/
│ ├─ src/
│ │ ├─ components/
│ │ ├─ pages/
│ │ ├─ productsAPI.js # Axios instance for deployed backend
│ │ ├─ constants.js # Token keys & base URL
│ │ └─ App.jsx
│ ├─ package.json
│ └─ tailwind.config.js
└─ README.md

---

## **Installation & Setup**

### **Backend**
1. Clone the repository:
```bash
git clone <your-repo-url>
cd Backend/ethio_back
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
....
