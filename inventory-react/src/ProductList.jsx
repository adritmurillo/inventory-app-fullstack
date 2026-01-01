import { useNavigate } from "react-router-dom";
import { useProductList } from "./hooks/useProductList";

export default function ProductList() {
    const navigate = useNavigate();
    
    const { 
        products, categories, 
        searchTerm, setSearchTerm, 
        selectedCategoryId, setSelectedCategoryId, 
        handleDelete, isLoading,
        page, setPage, totalPages
    } = useProductList();

    return (
        <div className="w-100" style={{ maxWidth: "1000px" }}>
            
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark m-0">Product List</h3>
                <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" onClick={() => navigate("/new")}>
                    <i className="bi bi-plus-lg"></i> <span>New Product</span>
                </button>
            </div>
            <div className="row mb-4">
                <div className="col-md-8 mb-2 mb-md-0">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0 text-secondary ps-3"><i className="bi bi-search"></i></span>
                        <input 
                            type="text" 
                            className="form-control border-start-0 ps-0" 
                            placeholder="Search products..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-select shadow-sm" 
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4 py-3">Product</th>
                                <th className="py-3">Price</th>
                                <th className="py-3">Stock</th>
                                <th className="py-3">Category</th>
                                <th className="pe-4 py-3 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? <tr><td colSpan="5" className="text-center py-5">Loading...</td></tr> : 
                             products.map((product) => (
                                <tr key={product.id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center">
                                            {product.imageUrl && (
                                                <img src={product.imageUrl} alt="" className="rounded me-2" style={{width: "40px", height: "40px", objectFit: "cover"}}/>
                                            )}
                                            <div>
                                                <div className="fw-bold text-dark">{product.name}</div>
                                                <div className="small text-secondary">{product.description?.substring(0,30)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="fw-bold">${product.price}</td>
                                    <td>
                                        <span className={`badge ${product.stock <= product.minStock ? 'bg-danger' : 'bg-success bg-opacity-10 text-success'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge bg-light text-dark border">
                                            {product.categoryName || "Uncategorized"}
                                        </span>
                                    </td>
                                    <td className="pe-4 text-end">
                                        <div className="btn-group btn-group-sm">
                                            <button className="btn btn-outline-secondary" onClick={() => navigate(`/view/${product.id}`)}>View</button>
                                            <button className="btn btn-outline-primary" onClick={() => navigate(`/edit/${product.id}`)}>Edit</button>
                                            <button className="btn btn-outline-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                             {!isLoading && products.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span className="text-muted small">
                        Page {page + 1} of {totalPages === 0 ? 1 : totalPages}
                    </span>

                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}