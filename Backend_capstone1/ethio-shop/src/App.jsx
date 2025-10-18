import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import ProductCardDetail from "./components/ProductCardDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Protected from "./components/Protected";
import Cart from "./pages/Cart";
import ProductForm from "./components/ProductForm";
import CartCollection from "./pages/CartCollection";
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<HomePage />} />

  {/* Auth routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected routes */}
  <Route
    path="/products"
    element={
      <Protected>
        <Products />
      </Protected>
    }
  />
  <Route
    path="/product/:id"
    element={
      <Protected>
        <ProductCardDetail />
      </Protected>
    }
  />
  <Route
    path="/cart"
    element={
      <Protected>
        <Cart />
      </Protected>
    }
  />
  <Route
    path="/add-product"
    element={
      <Protected>
        <ProductForm />
      </Protected>
    }
  />
  <Route path="/cart-collection" element={<CartCollection />} />
  <Route path="/logout" element={<Logout />} />

  {/* 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>

    </Router>
  );
}

export default App;
