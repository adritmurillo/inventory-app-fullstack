import React from 'react';

const TotalsBar = ({ total, onCheckout, disabled }) => (
    <div className="card-footer bg-white p-4 border-top">
        <div className="d-flex justify-content-between mb-3">
            <span className="h4 text-muted">Total</span>
            <span className="h2 fw-bold text-primary">${total.toFixed(2)}</span>
        </div>
        <button 
            className="btn btn-primary w-100 btn-lg py-3 fw-bold shadow-sm"
            onClick={onCheckout}
            disabled={disabled}
        >
            <i className="bi bi-credit-card-2-front me-2"></i> CHECKOUT
        </button>
    </div>
);

export default TotalsBar;
