import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm"; 
import CategoryForm from "./CategoryForm";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-light min-vh-100 d-flex flex-column">
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
              <i className="bi bi-box-seam-fill text-primary"></i>
              Inventory System
            </span>
          </div>
        </nav>

        {/* RUTAS */}
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/new" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
            <Route path="/new-category" element={<CategoryForm />} />
          </Routes>
        </div>

        <footer className="bg-white text-center py-3 text-muted small border-top">
          &copy; 2024 Inventory App - React & Spring Boot
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;