import React from 'react';

const SupplyListTable = ({ supplyList, onUpdateItem, onRemove }) => (
    <table className="table table-striped align-middle mb-0">
        <thead className="table-light">
            <tr>
                <th>Product</th>
                <th style={{ width: "100px" }}>Qty.</th>
                <th style={{ width: "120px" }}>Unit Cost</th>
                <th className="text-end">Subtotal</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {supplyList.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                        <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            value={item.quantity}
                            onChange={(e) => onUpdateItem(item.id, "quantity", e.target.value)}
                            min="1"
                        />
                    </td>
                    <td>
                        <div className="input-group input-group-sm">
                            <span className="input-group-text">$</span>
                            <input
                                type="number"
                                className="form-control text-end"
                                value={item.unitCost}
                                onChange={(e) => onUpdateItem(item.id, "unitCost", e.target.value)}
                                min="0"
                            />
                        </div>
                    </td>
                    <td className="text-end fw-bold">${(item.quantity * item.unitCost).toFixed(2)}</td>
                    <td className="text-end">
                        <button className="btn btn-sm text-danger" onClick={() => onRemove(item.id)}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </td>
                </tr>
            ))}
            {supplyList.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                        Select products on the left to restock.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
);

export default SupplyListTable;
