import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar"; 
import Dashboard from "./Dashboard"; 
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import ProductDetail from "./ProductDetail"; 

import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList"; 

function App() {
  return (
    <Router>
      <div className="d-flex min-vh-100 bg-light">
        <Sidebar />
        <div className="flex-grow-1" style={{ marginLeft: "250px" }}> 
            <div className="container-fluid p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />               
                <Route path="/products" element={<ProductList />} />             
                <Route path="/new" element={<ProductForm />} />
                <Route path="/edit/:id" element={<ProductForm />} />
                <Route path="/view/:id" element={<ProductDetail />} />             
                <Route path="/categories" element={<CategoryList />} />             
                <Route path="/new-category" element={<CategoryForm />} />
              </Routes>
            </div>
            <footer className="text-center py-3 text-muted small border-top mt-auto">
                &copy; 2026 Inventory System
            </footer>
        </div>
        
      </div>
    </Router>
  );
}

export default App;