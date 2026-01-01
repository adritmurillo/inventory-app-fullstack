import { useDashboard } from "./hooks/useDashboard";
import CategoryChart from "./components/CategoryChart";
import ValuePieChart from "./components/ValuePieChart";

export default function Dashboard() {
    const { stats, chartData, lowStockProducts, pieData, loading } = useDashboard();

    if (loading) return <div className="p-5 text-center">Loading metrics...</div>;

    return (
        <div className="w-100">
            <h2 className="fw-bold text-dark mb-4">General Dashboard</h2>

            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 py-2 border-start border-4 border-primary">
                        <div className="card-body d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                <i className="bi bi-box-seam-fill fs-3 text-primary"></i>
                            </div>
                            <div>
                                <div className="text-secondary small fw-bold text-uppercase">Total Products</div>
                                <div className="fs-2 fw-bold text-dark">{stats.totalProducts}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 py-2 border-start border-4 border-success">
                        <div className="card-body d-flex align-items-center">
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                                <i className="bi bi-currency-dollar fs-3 text-success"></i>
                            </div>
                            <div>
                                <div className="text-secondary small fw-bold text-uppercase">Inventory Value</div>
                                <div className="fs-2 fw-bold text-dark">
                                    ${stats.totalInventoryValue?.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card border-0 shadow-sm h-100 py-2 border-start border-4 ${stats.lowStockCount > 0 ? 'border-danger' : 'border-secondary'}`}>
                        <div className="card-body d-flex align-items-center">
                            <div className={`p-3 rounded-circle me-3 ${stats.lowStockCount > 0 ? 'bg-danger bg-opacity-10' : 'bg-secondary bg-opacity-10'}`}>
                                <i className={`bi bi-exclamation-triangle-fill fs-3 ${stats.lowStockCount > 0 ? 'text-danger' : 'text-secondary'}`}></i>
                            </div>
                            <div>
                                <div className="text-secondary small fw-bold text-uppercase">Low Stock</div>
                                <div className={`fs-2 fw-bold ${stats.lowStockCount > 0 ? 'text-danger' : 'text-dark'}`}>
                                    {stats.lowStockCount}
                                </div>
                                <small className="text-muted">Products require attention</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold text-dark m-0">Products by Category</h5>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => window.location.reload()}>
                                <i className="bi bi-arrow-clockwise me-1"></i> Refresh
                            </button>
                        </div>
                        <CategoryChart data={chartData} />
                    </div>
                </div>
            </div>
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="fw-bold text-dark m-0 d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                                Low Stock Alerts
                            </h5>
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

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body">
                            <h5 className="fw-bold text-dark mb-4">Value by Category</h5>
                            <ValuePieChart data={pieData} />
                            <div className="text-center mt-3 small text-muted">
                                Distribution of invested value
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-5"></div>
        </div>
    );
}