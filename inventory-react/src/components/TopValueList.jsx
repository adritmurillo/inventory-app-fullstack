export default function TopValueList({ products, sortOrder, onToggleSort }) {
    return (
        <div className="card border-0 shadow-sm rounded-4 h-100 top-value-card d-flex flex-column">
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold text-dark m-0">
                    {sortOrder === "desc" ? "Top Value" : "Lowest Value"}
                </h5>
                <button
                    className="btn btn-outline-secondary btn-sm border-0 rounded-circle"
                    onClick={onToggleSort}
                    title={sortOrder === "desc" ? "Show lowest priced" : "Show highest priced"}
                    style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <i className={`bi bi-arrow-${sortOrder === "desc" ? "down" : "up"}`}></i>
                </button>
            </div>
            <div className="card-body p-0 top-value-list">
                <ul className="list-group list-group-flush ">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <li key={product.id} className="list-group-item border-0 d-flex align-items-center py-3">
                                {product.imageUrl && (
                                    <img src={product.imageUrl} alt="" className="rounded me-3" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                )}
                                <div className="flex-grow-1">
                                    <div className="fw-bold text-dark">{product.name}</div>
                                    <div className="small text-secondary">{product.categoryName || "Uncategorized"}</div>
                                </div>
                                <div className="fw-bold value-amount ms-3">${product.price?.toLocaleString()}</div>
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item border-0 text-center text-muted py-4">No products to show</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
