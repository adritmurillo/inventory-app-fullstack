import ValuePieChart from "./ValuePieChart";

export default function PieCard({ data }) {
    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column pie-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-dark m-0">Inventory Value Breakdown</h5>
                <span className="section-label">Pie chart</span>
            </div>
            <div className="flex-grow-1">
                <ValuePieChart data={data} />
            </div>
        </div>
    );
}
