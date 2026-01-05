export default function KpiCard({ borderClass, iconWrapperClass, iconClass, title, value, subtitle }) {
    return (
        <div className={`card border-0 shadow-sm h-100 py-2 border-start border-4 ${borderClass}`}>
            <div className="card-body d-flex align-items-center justify-content-between">
                <div className={`${iconWrapperClass} p-3 rounded-circle me-3`}>
                    <i className={`${iconClass} fs-3`}></i>
                </div>
                <div>
                    <div className="text-secondary small fw-bold text-uppercase">{title}</div>
                    <div className="fs-2 fw-bold text-dark">{value}</div>
                    <div className="kpi-subtitle">{subtitle}</div>
                </div>
            </div>
        </div>
    );
}
