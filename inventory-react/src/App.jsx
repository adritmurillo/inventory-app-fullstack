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
        
        {/* 1. SIDEBAR (Menú Fijo a la Izquierda) */}
        <Sidebar />

        {/* 2. ÁREA DE CONTENIDO (A la derecha del sidebar) */}
        {/* El margin-left: 250px es para que el contenido no quede debajo del Sidebar fijo */}
        <div className="flex-grow-1" style={{ marginLeft: "250px" }}> 
            
            {/* Contenedor fluido para aprovechar el ancho */}
            <div className="container-fluid p-4">
              <Routes>
                {/* RUTA PRINCIPAL: Ahora muestra el Dashboard */}
                <Route path="/" element={<Dashboard />} />
                
                {/* RUTA PRODUCTOS: Movimos la lista aquí */}
                <Route path="/products" element={<ProductList />} />
                
                {/* OTRAS RUTAS */}
                <Route path="/new" element={<ProductForm />} />
                <Route path="/edit/:id" element={<ProductForm />} />
                <Route path="/view/:id" element={<ProductDetail />} />
                
                {/* GESTIÓN DE CATEGORÍAS */}
                {/* Ahora /categories muestra la LISTA */}
                <Route path="/categories" element={<CategoryList />} />
                
                {/* /new-category sigue mostrando el FORMULARIO */}
                <Route path="/new-category" element={<CategoryForm />} />
              </Routes>
            </div>

            {/* Footer opcional dentro del área de contenido */}
            <footer className="text-center py-3 text-muted small border-top mt-auto">
                &copy; 2026 Inventory System
            </footer>
        </div>
        
      </div>
    </Router>
  );
}

export default App;