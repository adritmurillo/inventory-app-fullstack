import { Link } from "react-router-dom";
import { useProductDetail } from "./hooks/useProductDetail";

export default function ProductDetail() {
    const { product, loading, isLowStock, navigate } = useProductDetail();

    if (loading) return <div className="text-center mt-5">Loading details...</div>;
    if (!product) return <div className="text-center mt-5 text-danger">Product not found</div>;

    return (
        <div className="container mt-4">
            <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none mb-3 ps-0 text-secondary">
                <i className="bi bi-arrow-left me-2"></i>Go back
            </button>

            <div className="card shadow border-0 rounded-4 overflow-hidden">
                <div className="row g-0">
                    <div className="col-md-5 bg-light d-flex align-items-center justify-content-center p-4">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="img-fluid rounded shadow-sm" style={{ maxHeight: "400px", objectFit: "contain" }} />
                        ) : (
                            <div className="text-secondary text-center opacity-50">
                                <i className="bi bi-image fs-1"></i><p>No image</p>
                            </div>
                        )}
                    </div>
                    <div className="col-md-7">
                        <div className="card-body p-5">
                            <span className="badge bg-secondary mb-2">{product.categoryName || "Uncategorized"}</span>
                            <h2 className="fw-bold text-dark mb-3">{product.name}</h2>
                            <h3 className="text-primary fw-bold mb-4">${product.price?.toLocaleString()}</h3>
                            
                            <div className="mb-4">
                                <h6 className="text-uppercase text-muted small fw-bold">Description</h6>
                                <p className="text-secondary">{product.description || "No description available."}</p>
                            </div>
                            <hr className="my-4" />

                            <div className="row mb-4">
                                <div className="col-6">
                                    <div className="border rounded-3 p-3 text-center">
                                        <small className="d-block text-muted text-uppercase mb-1">Current Stock</small>
                                        <span className={`fs-4 fw-bold ${isLowStock ? "text-danger" : "text-success"}`}>{product.stock}</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="border rounded-3 p-3 text-center">
                                        <small className="d-block text-muted text-uppercase mb-1">Minimum Stock</small>
                                        <span className="fs-4 fw-bold text-dark">{product.minStock}</span>
                                    </div>
                                </div>
                            </div>

                            {isLowStock && (
                                <div className="alert alert-danger d-flex align-items-center mb-4">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    <div><strong>Attention!</strong> Low stock.</div>
                                </div>
                            )}

                            <div className="d-grid">
                                <Link to={`/edit/${product.id}`} className="btn btn-outline-primary py-2 fw-bold">
                                    <i className="bi bi-pencil-square me-2"></i> Edit Product
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}