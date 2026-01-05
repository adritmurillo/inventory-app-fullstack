export default function LowStockTable({ products }) {
    return (
        <div className="card border-0 shadow-sm rounded-4 h-100 low-stock-card">
            <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold text-dark m-0 d-flex align-items-center">
                    <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                    Low Stock Alerts
                </h5>
                <span className="section-label">Priority items</span>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4">Product</th>
                                <th>Current Stock</th>
                                <th>Minimum</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.length > 0 ? (
                                products.map((p) => (
                                    <tr key={p.id}>
                                        <td className="ps-4 fw-bold">{p.name}</td>
                                        <td className="text-danger fw-bold">{p.stock}</td>
                                        <td>{p.minStock}</td>
                                        <td><span className="badge bg-danger">Restock</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-success">
                                        <i className="bi bi-check-circle me-2"></i>Inventory is healthy
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
