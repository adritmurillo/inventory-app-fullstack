import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Captura el ID si estamos editando

  // Estados del formulario
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    minStock: "",
    categoryId: ""
  });

  const [categories, setCategories] = useState([]);

  // URL base
  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    loadCategories();
    // Si hay ID, estamos editando: cargamos el producto
    if (id) {
      loadProduct();
    }
  }, []);

  const loadCategories = async () => {
    try {
      // Asumimos que tienes este endpoint. Si no, ¡avísame!
      const result = await axios.get(`${API_URL}/categories`);
      setCategories(result.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadProduct = async () => {
    try {
      const result = await axios.get(`${API_URL}/products/${id}`);
      setProduct(result.data);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // MODO EDITAR (PUT)
        await axios.put(`${API_URL}/products/${id}`, product);
      } else {
        // MODO CREAR (POST)
        await axios.post(`${API_URL}/products`, product);
      }
      navigate("/"); // Volver a la lista
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Check console.");
    }
  };

  return (
    <div className="card shadow border-0 rounded-4 w-100" style={{ maxWidth: "600px" }}>
      <div className="card-header bg-white border-0 py-3">
        <h4 className="fw-bold text-dark m-0">
          {id ? "✏️ Edit Product" : "✨ New Product"}
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">Name</label>
            <input type="text" className="form-control" name="name" 
              value={product.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">Description</label>
            <textarea className="form-control" name="description" rows="2"
              value={product.description} onChange={handleChange}></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">Category</label>
            
            {/* 👇 CAMBIO AQUÍ: Usamos input-group para pegar el botón al select 👇 */}
            <div className="input-group">
              <select 
                className="form-select" 
                name="categoryId" 
                value={product.categoryId || ""} 
                onChange={handleChange} 
                required
              >
                <option value="" disabled>Select a category...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              
              {/* Botón que te lleva a crear categoría */}
              <button 
                className="btn btn-outline-primary" 
                type="button" 
                onClick={() => navigate("/new-category")}
                title="Create New Category"
              >
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
            
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold small text-secondary">Price ($)</label>
              <input type="number" step="0.01" className="form-control" name="price"
                value={product.price} onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold small text-secondary">Stock</label>
              <input type="number" className="form-control" name="stock"
                value={product.stock} onChange={handleChange} required />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold small text-secondary">Min Stock</label>
              <input type="number" className="form-control" name="minStock"
                value={product.minStock} onChange={handleChange} required />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Link to="/" className="btn btn-light text-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary px-4">
              {id ? "Update" : "Save Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}