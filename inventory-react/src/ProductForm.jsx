import { useProductForm } from "./hooks/useProductForm";

export default function ProductForm() {
    const { 
        product, categories, previewUrl, isEditing,
        handleInputChange, handleFileChange, handleSubmit, navigate 
    } = useProductForm();

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow border-0 rounded-4">
                        <div className="card-header bg-white border-0 pt-4 px-4 text-center">
                            <h3 className="fw-bold text-dark">{isEditing ? "Edit Product" : "New Product"}</h3>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 text-center">
                                    <div className="mx-auto mb-3 d-flex align-items-center justify-content-center border rounded-3 bg-light position-relative overflow-hidden" 
                                         style={{ width: "150px", height: "150px", borderStyle: "dashed" }}>
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="w-100 h-100 object-fit-cover" />
                                        ) : (
                                            <div className="text-secondary text-center p-3">
                                                <i className="bi bi-camera fs-1"></i>
                                                <div className="small mt-1">Select Photo</div>
                                            </div>
                                        )}
                                    </div>
                                    <input type="file" className="form-control form-control-sm mx-auto" 
                                           style={{ maxWidth: "250px" }} onChange={handleFileChange} accept="image/*" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold small text-secondary">Product Name</label>
                                    <input type="text" className="form-control" name="name" 
                                           value={product.name} onChange={handleInputChange} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold small text-secondary">Description</label>
                                    <textarea className="form-control" name="description" rows="2"
                                              value={product.description} onChange={handleInputChange} />
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col-6">
                                        <label className="form-label fw-bold small text-secondary">Price</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input type="number" className="form-control" name="price" step="0.01"
                                                   value={product.price} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold small text-secondary">Category</label>
                                        <select className="form-select" name="categoryId" 
                                                value={product.categoryId} onChange={handleInputChange} required>
                                            <option value="">Select...</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row g-2 mb-4">
                                    <div className="col-6">
                                        <label className="form-label fw-bold small text-secondary">Stock</label>
                                        <input type="number" className="form-control" name="stock" 
                                               value={product.stock} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold small text-secondary">Min. Alert</label>
                                        <input type="number" className="form-control" name="minStock" 
                                               value={product.minStock} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary py-2 fw-bold shadow-sm">
                                        {isEditing ? "Update Product" : "Save Product"}
                                    </button>
                                    <button type="button" className="btn btn-link text-secondary text-decoration-none" 
                                            onClick={() => navigate("/products")}>
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}