import React from 'react';

const ProductGrid = ({ products, onSelect, isLoading }) => (
    <div className="row g-3 overflow-auto" style={{ flex: 1 }}>
        {isLoading && (
            <div className="text-center text-muted small">Loading products...</div>
        )}
        {!isLoading && products.map(product => (
            <div
                key={product.id}
                className="col-md-4 col-lg-3"
                onClick={() => onSelect(product)}
                style={{ cursor: 'pointer' }}
            >
                <div className={`card h-100 border-0 shadow-sm ${product.stock <= 0 ? 'opacity-50' : ''}`}>
                    <div className="card-body text-center">
                        <div className="mb-2">
                            <i className="bi bi-box-seam fs-1 text-secondary"></i>
                        </div>
                        <h6 className="card-title fw-bold text-truncate">{product.name}</h6>
                        <p className="card-text text-primary fw-bold">${product.price}</p>
                        <small className={product.stock > 5 ? "text-success" : "text-danger"}>
                            Stock: {product.stock}
                        </small>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default ProductGrid;
