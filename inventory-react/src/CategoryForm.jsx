import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CategoryForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "", description: "" });
  const API_URL = "http://localhost:8080/api/categories";

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, category);
      // Al terminar, volvemos atrás (al formulario de productos)
      navigate(-1); 
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Error saving category.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="card shadow border-0 rounded-4 w-100" style={{ maxWidth: "500px" }}>
        <div className="card-header bg-primary text-white border-0 py-3 rounded-top-4">
          <h4 className="fw-bold m-0 text-center">✨ New Category</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold text-secondary">Name</label>
              <input 
                type="text" 
                className="form-control" 
                name="name" 
                placeholder="Ex: Electronics, Furniture..." 
                value={category.name} 
                onChange={handleChange} 
                required 
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold text-secondary">Description</label>
              <textarea 
                className="form-control" 
                name="description" 
                rows="3"
                value={category.description} 
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4">
                Save Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}