export default function ProductTable({ products, isLoading, isAdmin, onView, onEdit, onDelete }) {
    return (
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
                        {isLoading ? (
                            <tr><td colSpan="5" className="text-center py-5">Loading...</td></tr>
                        ) : products.map((product) => (
                            <tr key={product.id}>
                                <td className="ps-4">
                                    <div className="d-flex align-items-center">
                                        {product.imageUrl && (
                                            <img src={product.imageUrl} alt="" className="rounded me-2" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                        )}
                                        <div>
                                            <div className="fw-bold text-dark">{product.name}</div>
                                            <div className="small text-secondary">{product.description?.substring(0, 30)}...</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="fw-bold">${product.price}</td>
                                <td>
                                    <span className={`badge ${product.stock <= product.minStock ? "bg-danger" : "bg-success bg-opacity-10 text-success"}`}>
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
                                        <button className="btn btn-outline-secondary" onClick={() => onView(product.id)}>View</button>
                                        {isAdmin && (
                                            <>
                                                <button className="btn btn-outline-primary" onClick={() => onEdit(product.id)}>Edit</button>
                                                <button className="btn btn-outline-danger" onClick={() => onDelete(product.id)}>Delete</button>
                                            </>
                                        )}
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
        </div>
    );
}
