import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { getToken } from "./services/authService";
import { isTokenExpired } from "./services/apiClient";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import ProductDetail from "./ProductDetail";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import LoginPage from "./pages/LoginPage";
import SupplyPage from "./pages/SupplyPage";
import UserList from "./UserList";
import PosPage from "./pages/pos/PosPage";
import AdminRoute from './components/AdminRoute';

function AppLayout() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <div className="container-fluid p-4">
          <Outlet />
        </div>
        <footer className="text-center py-3 text-muted small border-top mt-auto">
          &copy; 2026 Inventory System
        </footer>
      </div>
    </div>
  );
}

function ProtectedLayout() {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
  return <AppLayout />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pos" element={<PosPage />} />
          <Route path="/supply" element={<SupplyPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/new" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
          <Route path="/view/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/new-category" element={<CategoryForm />} />
          <Route element={<AdminRoute />}>
              <Route path="/users" element={<UserList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;