import React from 'react';

const SupplySearchPanel = ({ searchTerm, onSearchChange, filteredProducts, onAdd }) => (
    <div className="col-md-5">
        <div className="card shadow-sm border-0 mb-3">
            <div className="card-body">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="🔍 Search product to restock..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
        <div className="list-group shadow-sm" style={{ maxHeight: "600px", overflowY: "auto" }}>
            {filteredProducts.map((p) => (
                <button
                    key={p.id}
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    onClick={() => onAdd(p)}
                >
                    <div>
                        <div className="fw-bold">{p.name}</div>
                        <small className="text-muted">Current stock: {p.stock}</small>
                    </div>
                    <i className="bi bi-plus-circle text-success fs-4"></i>
                </button>
            ))}
        </div>
    </div>
);

export default SupplySearchPanel;
