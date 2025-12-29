import { useDashboard } from "./hooks/useDashboard";

export default function Dashboard() {
    const { stats, loading } = useDashboard(); // <--- Así de simple

    if (loading) return <div className="p-5 text-center">Cargando métricas...</div>;

    return (
        <div className="w-100">
            <h2 className="fw-bold text-dark mb-4">Dashboard General</h2>

            {/* FILA DE TARJETAS (KPIs) */}
            <div className="row g-4 mb-5">
                
                {/* 1. Total de Productos */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 py-2 border-start border-4 border-primary">
                        <div className="card-body d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                <i className="bi bi-box-seam-fill fs-3 text-primary"></i>
                            </div>
                            <div>
                                <div className="text-secondary small fw-bold text-uppercase">Total Productos</div>
                                <div className="fs-2 fw-bold text-dark">{stats.totalProducts}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Valor del Inventario */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 py-2 border-start border-4 border-success">
                        <div className="card-body d-flex align-items-center">
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                                <i className="bi bi-currency-dollar fs-3 text-success"></i>
                            </div>
                            <div>
                                <div className="text-secondary small fw-bold text-uppercase">Valor Inventario</div>
                                <div className="fs-2 fw-bold text-dark">
                                    ${stats.totalInventoryValue?.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Alertas de Stock */}
                <div className="col-md-4">
                    <div className={`card border-0 shadow-sm h-100 py-2 border-start border-4 ${stats.lowStockCount > 0 ? 'border-danger' : 'border-secondary'}`}>
                        <div className="card-body d-flex align-items-center">
                            <div className={`p-3 rounded-circle me-3 ${stats.lowStockCount > 0 ? 'bg-danger bg-opacity-10' : 'bg-secondary bg-opacity-10'}`}>
                                <i className={`bi bi-exclamation-triangle-fill fs-3 ${stats.lowStockCount > 0 ? 'text-danger' : 'text-secondary'}`}></i>
                            </div>
                            <div>
                                <div className="text-secondary small fw-bold text-uppercase">Stock Bajo</div>
                                <div className={`fs-2 fw-bold ${stats.lowStockCount > 0 ? 'text-danger' : 'text-dark'}`}>
                                    {stats.lowStockCount}
                                </div>
                                <small className="text-muted">Productos requieren atención</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AQUÍ PONDREMOS GRÁFICOS LUEGO */}
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-light">
                <i className="bi bi-bar-chart-line display-1 text-muted opacity-25 mb-3"></i>
                <h4 className="text-muted">Próximamente: Gráficos de Ventas</h4>
                <p className="small text-muted">Aquí integraremos Recharts para visualizar categorías.</p>
            </div>
        </div>
    );
}