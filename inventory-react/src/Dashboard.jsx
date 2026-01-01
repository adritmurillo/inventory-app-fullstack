import { useDashboard } from "./hooks/useDashboard";
import CategoryChart from "./components/CategoryChart";
import ValuePieChart from "./components/ValuePieChart";

export default function Dashboard() {
    const { stats, chartData, lowStockProducts, pieData, sortedProducts, loading, sortOrder, toggleSortOrder } = useDashboard();

    if (loading) return <div className="p-5 text-center">Loading metrics...</div>;

    return (
        <div className="w-100">
            <h2 className="fw-bold text-dark mb-4">General Dashboard</h2>

            <div className="row g-3 mb-4 align-items-stretch">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 py-2 border-start border-4 border-primary kpi-card">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                <i className="bi bi-box-seam-fill fs-3 text-primary"></i>
                            </div>
                            <div>
                                <div className="text-secondary small fw-bold text-uppercase">Total Products</div>
                                <div className="fs-2 fw-bold text-dark">{stats.totalProducts}</div>
                                <div className="kpi-subtitle">Updated just now</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 py-2 border-start border-4 border-success kpi-card">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                                <i className="bi bi-currency-dollar fs-3 text-success"></i>
                            </div>
                            <div>
                                <div className="text-secondary small fw-bold text-uppercase">Inventory Value</div>
                                <div className="fs-2 fw-bold text-dark">
                                    ${stats.totalInventoryValue?.toLocaleString()}
                                </div>
                                <div className="kpi-subtitle">Snapshot</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card border-0 shadow-sm h-100 py-2 border-start border-4 ${stats.lowStockCount > 0 ? 'border-danger' : 'border-secondary'} kpi-card`}>
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div className={`p-3 rounded-circle me-3 ${stats.lowStockCount > 0 ? 'bg-danger bg-opacity-10' : 'bg-secondary bg-opacity-10'}`}>
                                <i className={`bi bi-exclamation-triangle-fill fs-3 ${stats.lowStockCount > 0 ? 'text-danger' : 'text-secondary'}`}></i>
                            </div>
                            <div>
                                <div className="text-secondary small fw-bold text-uppercase">Low Stock</div>
                                <div className={`fs-2 fw-bold ${stats.lowStockCount > 0 ? 'text-danger' : 'text-dark'}`}>
                                    {stats.lowStockCount}
                                </div>
                                <div className="kpi-subtitle">Products require attention</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-4 mb-4">
                <div className="col-12">
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
                                        {lowStockProducts && lowStockProducts.length > 0 ? (
                                            lowStockProducts.map((p) => (
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
                </div>
            </div>
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-7">
                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column chart-card">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold text-dark m-0">Products by Category</h5>
                            <button className="btn btn-sm btn-outline-secondary refresh-btn" onClick={() => window.location.reload()}>
                                <i className="bi bi-arrow-clockwise me-1"></i> Refresh
                            </button>
                        </div>
                        <div className="flex-grow-1">
                            <CategoryChart data={chartData} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-5">
                    <div className="card border-0 shadow-sm rounded-4 h-100 top-value-card d-flex flex-column">
                        <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold text-dark m-0">
                                {sortOrder === "desc" ? "Top Value" : "Lowest Value"}
                            </h5>
                            <button 
                                className="btn btn-outline-secondary btn-sm border-0 rounded-circle" 
                                onClick={toggleSortOrder}
                                title={sortOrder === "desc" ? "Show lowest priced" : "Show highest priced"}
                                style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                <i className={`bi bi-arrow-${sortOrder === "desc" ? "down" : "up"}`}></i>
                            </button>
                        </div>
                        <div className="card-body p-0 top-value-list">
                            <ul className="list-group list-group-flush ">
                                {sortedProducts && sortedProducts.length > 0 ? (
                                    sortedProducts.map((product) => (
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
                </div>
            </div>
            <div className="row g-4 mb-4">
                <div className="col-12 col-xl-9 mx-auto">
                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column pie-card">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold text-dark m-0">Inventory Value Breakdown</h5>
                            <span className="section-label">Pie chart</span>
                        </div>
                        <div className="flex-grow-1">
                            <ValuePieChart data={pieData} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-5"></div>
        </div>
    );
}