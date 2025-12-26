import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const API_URL = "http://localhost:8080/api/products";
    const CAT_URL = "http://localhost:8080/api/categories";

    // Load categories once
    useEffect(() => {
        loadCategories();
    }, []);

    // Reload products on page or filters change
    useEffect(() => {
        loadProducts(page);
    }, [page, searchTerm, selectedCategory]);

    const loadCategories = async () => {
        try {
            const res = await axios.get(CAT_URL);
            setCategories(res.data);
        } catch (error) {
            console.error("Error categories", error);
        }
    };

    const loadProducts = async (pageNo = 0) => {
        try {
            let url = `${API_URL}?page=${pageNo}&size=5`;
            if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
            if (selectedCategory) url += `&categoryId=${selectedCategory}`;

            const result = await axios.get(url);
            setProducts(result.data.content ?? []);
            setTotalPages(result.data.totalPages ?? 0);
        } catch (error) {
            console.error("Error products", error);
        }
    };

    const deleteProduct = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            if (products.length === 1 && page > 0) {
                setPage(page - 1);
            } else {
                loadProducts(page);
            }
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(0);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setPage(0);
    };

    const nextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    return (
        <div className="w-100" style={{ maxWidth: "900px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark m-0">Product List</h3>
                <button
                    className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
                    onClick={() => navigate("/new")}
                >
                    <i className="bi bi-plus-lg"></i> New Product
                </button>
            </div>

            {/* Filters */}
            <div className="row g-2 mb-4">
                <div className="col-md-8">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="card shadow border-0 rounded-4 overflow-hidden">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4">Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Category</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td className="ps-4">
                                        <div className="fw-bold text-dark">{p.name}</div>
                                        <div className="small text-muted">{p.description}</div>
                                    </td>
                                    <td>${p.price?.toFixed?.(2) ?? p.price}</td>
                                    <td>{p.stock}</td>
                                    <td>{p.categoryName ?? p.category?.name ?? "—"}</td>
                                    <td className="text-end pe-4">
                                        <div className="btn-group">
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => navigate(`/view/${p.id}`)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => navigate(`/edit/${p.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => deleteProduct(p.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="d-flex justify-content-between align-items-center p-3 border-top">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={prevPage}
                            disabled={page === 0}
                        >
                            Previous
                        </button>
                        <span className="small text-muted">
                            Page {page + 1} of {Math.max(totalPages, 1)}
                        </span>
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={nextPage}
                            disabled={page >= totalPages - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}