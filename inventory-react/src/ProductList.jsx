import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const API_URL = "http://localhost:8080/api/products";

    useEffect(() => { loadProducts(); }, []);

    const loadProducts = async () => {
        try {
            const result = await axios.get(API_URL);
            setProducts(result.data);
        } catch (error) { console.error("Error:", error); }
    };

    const deleteProduct = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await axios.delete(`${API_URL}/${id}`);
            loadProducts();
        }
    };

    return (
        <div className="w-100" style={{ maxWidth: "900px" }}>
            {/* Cabecera con Botón de Agregar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark m-0">Product List</h3>
                <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" onClick={() => navigate("/new")}>
                    <i className="bi bi-plus-lg"></i>
                    <span>New Product</span>
                </button>
            </div>

            {/* Tarjeta de la Tabla */}
            <div className="card shadow border-0 rounded-4 overflow-hidden">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th className="ps-4 py-3 text-secondary text-uppercase small">Product</th>
                                <th className="py-3 text-secondary text-uppercase small">Category</th>
                                <th className="py-3 text-secondary text-uppercase small">Price</th>
                                <th className="py-3 text-secondary text-uppercase small">Stock</th>
                                <th className="text-end pe-4 py-3 text-secondary text-uppercase small">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td className="ps-4">
                                        <div className="fw-bold text-dark">{p.name}</div>
                                        <div className="small text-muted">{p.description}</div>
                                    </td>
                                    <td>
                                        <span className="badge bg-info bg-opacity-10 text-info border border-info rounded-pill px-3">
                                            {p.categoryName || 'Tech'} {/* Hardcodeado por ahora si no viene del back */}
                                        </span>
                                    </td>
                                    <td className="fw-bold text-dark">${p.price.toFixed(2)}</td>
                                    <td>
                                        <span className={`fw-bold ${p.stock < p.minStock ? "text-danger" : "text-success"}`}>
                                            {p.stock} units
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button
                                            className="btn btn-light text-danger btn-sm border-0 rounded-circle p-2"
                                            onClick={() => deleteProduct(p.id)}
                                            title="Delete"
                                        >
                                            <i className="bi bi-trash-fill fs-6"></i>
                                        </button>
                                        <button className="btn btn-light..." onClick={() => navigate(`/edit/${p.id}`)}>
                                            <i className="bi bi-pencil-fill fs-6"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr><td colSpan="5" className="text-center py-5 text-muted">No products found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}