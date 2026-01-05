import CategoryChart from "./CategoryChart";

export default function CategoryChartCard({ data, onRefresh }) {
    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column chart-card">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold text-dark m-0">Products by Category</h5>
                <button className="btn btn-sm btn-outline-secondary refresh-btn" onClick={onRefresh}>
                    <i className="bi bi-arrow-clockwise me-1"></i> Refresh
                </button>
            </div>
            <div className="flex-grow-1">
                <CategoryChart data={data} />
            </div>
        </div>
    );
}
