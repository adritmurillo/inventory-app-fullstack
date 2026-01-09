import React, { useMemo, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import LowStockTable from "../components/LowStockTable";
import CategoryChartCard from "../components/CategoryChartCard";
import TopValueList from "../components/TopValueList";
import PieCard from "../components/PieCard";
import KpiCard from "../components/KpiCard";

const formatCurrency = (value) => {
    const amount = Number.isFinite(value) ? value : 0;
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const DashboardPage = () => {
    const [period, setPeriod] = useState("day");
    const [rangeDraft, setRangeDraft] = useState({ from: "", to: "" });
    const [range, setRange] = useState({ from: "", to: "" });

    const filters = useMemo(() => {
        if (period === "custom") {
            return { period, from: range.from, to: range.to };
        }
        return { period };
    }, [period, range]);

    const { stats, chartData, lowStockProducts, pieData, sortedProducts, loading, sortOrder, toggleSortOrder, refresh } = useDashboard(filters);

    const periodLabels = {
        day: "Today",
        week: "This Week",
        month: "This Month",
        custom: "Custom Range"
    };

    const kpis = useMemo(() => ([
        {
            key: "sales",
            borderClass: "border-primary",
            iconWrapperClass: "bg-primary bg-opacity-10",
            iconClass: "bi bi-currency-dollar text-primary",
            title: `Sales ${periodLabels[period] || ""}`,
            value: formatCurrency(stats?.salesToday),
            subtitle: "Gross revenue"
        },
        {
            key: "supplies",
            borderClass: "border-danger",
            iconWrapperClass: "bg-danger bg-opacity-10",
            iconClass: "bi bi-box-seam text-danger",
            title: `Restocking Spend ${periodLabels[period] || ""}`,
            value: formatCurrency(stats?.suppliesToday),
            subtitle: "Cash outflow"
        },
        {
            key: "profit",
            borderClass: "border-success",
            iconWrapperClass: "bg-success bg-opacity-10",
            iconClass: "bi bi-wallet2 text-success",
            title: `Net Profit ${periodLabels[period] || ""}`,
            value: formatCurrency(stats?.profitToday),
            subtitle: "Sales - Restocking"
        }
    ]), [stats, period]);

    const handlePeriodChange = (next) => {
        setPeriod(next);
        if (next !== "custom") {
            setRange({ from: "", to: "" });
            setRangeDraft({ from: "", to: "" });
        }
    };

    const applyCustomRange = () => {
        if (!rangeDraft.from || !rangeDraft.to) return;
        setRange(rangeDraft);
    };

    if (loading) return <div className="p-5 text-center">Loading dashboard...</div>;
    if (!stats) return <div className="p-5 text-center text-danger">Error loading data.</div>;

    return (
        <div className="container-fluid p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">
                <h2 className="fw-bold text-dark mb-2 mb-md-0">
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </h2>
                <span className="text-muted small">Real-time snapshot</span>
            </div>

            <div className="d-flex flex-column flex-lg-row gap-3 align-items-lg-center justify-content-between mb-3">
                <div className="d-flex gap-2 flex-wrap">
                    {[{ key: "day", label: "Today" }, { key: "week", label: "This Week" }, { key: "month", label: "This Month" }, { key: "custom", label: "Custom" }].map(({ key, label }) => (
                        <button
                            key={key}
                            className={`btn btn-sm ${period === key ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => handlePeriodChange(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                {period === "custom" && (
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                        <label className="small text-muted mb-0">From</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={rangeDraft.from}
                            onChange={(e) => setRangeDraft((prev) => ({ ...prev, from: e.target.value }))}
                        />
                        <label className="small text-muted mb-0">To</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={rangeDraft.to}
                            onChange={(e) => setRangeDraft((prev) => ({ ...prev, to: e.target.value }))}
                        />
                        <button className="btn btn-sm btn-success" onClick={applyCustomRange} disabled={!rangeDraft.from || !rangeDraft.to}>
                            Apply
                        </button>
                    </div>
                )}
            </div>

            <h6 className="text-muted mb-3">{period === "custom" ? "Selected range" : `${periodLabels[period]} finances`}</h6>
            <div className="row g-3 mb-4">
                {kpis.map(({ key, ...cardProps }) => (
                    <div className="col-md-4" key={key}>
                        <KpiCard {...cardProps} />
                    </div>
                ))}
            </div>

            <div className="row g-3 mb-4">
                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 fw-bold">📦 Inventory Status</h6>
                            <span className={`badge ${stats.lowStockCount > 0 ? "bg-danger" : "bg-success"} rounded-pill`}>
                                {stats.lowStockCount} alerts
                            </span>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                                <span>Total Products</span>
                                <span className="fw-bold">{stats.totalProducts}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                                <span>Inventory Value (Assets)</span>
                                <span className="fw-bold text-success">${stats.totalInventoryValue?.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-0">
                                <span>Low Stock Products</span>
                                <span className="fw-bold">{stats.lowStockCount}</span>
                            </div>
                        </div>
                    </div>
                    {lowStockProducts.length > 0 && (
                        <div className="alert alert-warning mt-3 border-0 shadow-sm d-flex align-items-center" role="alert">
                            <i className="bi bi-exclamation-triangle-fill fs-4 me-3 text-warning"></i>
                            <div>
                                <strong>Attention!</strong> There are {lowStockProducts.length} products that need urgent restocking.
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-lg-5">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white py-3">
                            <h6 className="mb-0 fw-bold">🏆 Top 5 Products ({periodLabels[period]})</h6>
                        </div>
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush">
                                {stats.topSellingProducts && Object.entries(stats.topSellingProducts).length > 0 ? (
                                    Object.entries(stats.topSellingProducts).map(([name, qty], index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <span
                                                    className={`badge rounded-circle me-3 ${index === 0 ? "bg-warning text-dark" : "bg-light text-muted"}`}
                                                    style={{ width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                                >
                                                    {index + 1}
                                                </span>
                                                {name}
                                            </div>
                                            <span className="badge bg-primary rounded-pill">{qty} sold</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item text-center text-muted py-4">No sales recorded for this period.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-xl-7">
                    <CategoryChartCard data={chartData} onRefresh={refresh} />
                </div>
                <div className="col-12 col-xl-5">
                    <PieCard data={pieData} />
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-lg-7">
                    <LowStockTable products={lowStockProducts} />
                </div>
                <div className="col-12 col-lg-5">
                    <TopValueList products={sortedProducts} sortOrder={sortOrder} onToggleSort={toggleSortOrder} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
