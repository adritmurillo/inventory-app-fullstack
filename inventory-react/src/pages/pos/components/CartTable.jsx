import React from 'react';

const CartTable = ({ items, onQtyChange, onRemove }) => (
    <div className="card-body overflow-auto p-0" style={{ flex: 1 }}>
        <table className="table table-striped mb-0 align-middle">
            <thead className="table-light sticky-top">
                <tr>
                    <th>Product</th>
                    <th style={{width: '120px'}}>Qty</th>
                    <th className="text-end">Subtotal</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                            <div className="input-group input-group-sm">
                                <button className="btn btn-outline-secondary" onClick={() => onQtyChange(item.id, item.quantity - 1)}>-</button>
                                <input type="text" className="form-control text-center px-0" value={item.quantity} readOnly />
                                <button className="btn btn-outline-secondary" onClick={() => onQtyChange(item.id, item.quantity + 1)}>+</button>
                            </div>
                        </td>
                        <td className="text-end fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="text-end">
                            <button className="btn btn-sm text-danger" onClick={() => onRemove(item.id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
                {items.length === 0 && (
                    <tr>
                        <td colSpan="4" className="text-center py-5 text-muted">
                            <i className="bi bi-basket fs-1 d-block mb-2"></i>
                            Cart is empty
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default CartTable;
