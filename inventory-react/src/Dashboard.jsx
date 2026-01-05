import { useDashboard } from "./hooks/useDashboard";
import KpiCard from "./components/KpiCard";
import LowStockTable from "./components/LowStockTable";
import CategoryChartCard from "./components/CategoryChartCard";
import TopValueList from "./components/TopValueList";
import PieCard from "./components/PieCard";

export default function Dashboard() {
    const { stats, chartData, lowStockProducts, pieData, sortedProducts, loading, sortOrder, toggleSortOrder } = useDashboard();

    if (loading) return <div className="p-5 text-center">Loading metrics...</div>;

    return (
        <div className="w-100">
            <h2 className="fw-bold text-dark mb-4">General Dashboard</h2>

            <div className="row g-3 mb-4 align-items-stretch">
                <div className="col-md-4">
                    <KpiCard
                        borderClass="border-primary"
                        iconWrapperClass="bg-primary bg-opacity-10"
                        iconClass="bi bi-box-seam-fill text-primary"
                        title="Total Products"
                        value={stats.totalProducts}
                        subtitle="Updated just now"
                    />
                </div>
                <div className="col-md-4">
                    <KpiCard
                        borderClass="border-success"
                        iconWrapperClass="bg-success bg-opacity-10"
                        iconClass="bi bi-currency-dollar text-success"
                        title="Inventory Value"
                        value={`$${stats.totalInventoryValue?.toLocaleString()}`}
                        subtitle="Snapshot"
                    />
                </div>
                <div className="col-md-4">
                    <KpiCard
                        borderClass={stats.lowStockCount > 0 ? 'border-danger' : 'border-secondary'}
                        iconWrapperClass={stats.lowStockCount > 0 ? 'bg-danger bg-opacity-10' : 'bg-secondary bg-opacity-10'}
                        iconClass={stats.lowStockCount > 0 ? 'bi bi-exclamation-triangle-fill text-danger' : 'bi bi-exclamation-triangle-fill text-secondary'}
                        title="Low Stock"
                        value={stats.lowStockCount}
                        subtitle="Products require attention"
                    />
                </div>
            </div>
            <div className="row g-4 mb-4">
                <div className="col-12">
                    <LowStockTable products={lowStockProducts} />
                </div>
            </div>
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-7">
                    <CategoryChartCard data={chartData} onRefresh={() => window.location.reload()} />
                </div>
                <div className="col-12 col-lg-5">
                    <TopValueList products={sortedProducts} sortOrder={sortOrder} onToggleSort={toggleSortOrder} />
                </div>
            </div>
            <div className="row g-4 mb-4">
                <div className="col-12 col-xl-9 mx-auto">
                    <PieCard data={pieData} />
                </div>
            </div>

            <div className="mb-5"></div>
        </div>
    );
}