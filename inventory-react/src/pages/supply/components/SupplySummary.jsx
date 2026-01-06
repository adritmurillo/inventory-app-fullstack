import React from 'react';

const SupplySummary = ({ total, disabled, onConfirm }) => (
    <div className="card-footer bg-white p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="h5 text-muted">Total Intake (Cost)</span>
            <span className="h3 text-success fw-bold">${total.toFixed(2)}</span>
        </div>
        <button
            className="btn btn-success w-100 py-2 fw-bold"
            onClick={onConfirm}
            disabled={disabled}
        >
            CONFIRM INTAKE
        </button>
    </div>
);

export default SupplySummary;
