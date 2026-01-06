import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { createSupply } from '../services/supplyService';
import SupplySearchPanel from './supply/components/SupplySearchPanel';
import SupplyListTable from './supply/components/SupplyListTable';
import SupplySummary from './supply/components/SupplySummary';

const SupplyPage = () => {
    const [products, setProducts] = useState([]);
    const [supplyList, setSupplyList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error loading products', error);
        }
    };

    const addToSupply = (product) => {
        setSupplyList((prev) => {
            if (prev.find((item) => item.id === product.id)) return prev;
            return [...prev, { ...product, quantity: 1, unitCost: 0 }];
        });
    };

    const removeFromList = (id) => {
        setSupplyList((prev) => prev.filter((item) => item.id !== id));
    };

    const updateItem = (id, field, value) => {
        setSupplyList((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: parseFloat(value) || 0 } : item
            )
        );
    };

    const handleSaveSupply = async () => {
        if (supplyList.length === 0) return alert('The list is empty');
        if (supplyList.some((item) => item.quantity <= 0)) return alert('Quantities must be greater than 0');

        try {
            await createSupply(supplyList);
            alert('✅ Incoming stock recorded successfully. Inventory updated.');
            setSupplyList([]);
            setSearchTerm('');
            loadProducts();
        } catch (error) {
            console.error(error);
            alert('❌ Error recording the intake');
        }
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const calculateTotal = () =>
        supplyList.reduce((total, item) => total + item.quantity * item.unitCost, 0);

    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4 fw-bold text-success">
                <i className="bi bi-box-seam-fill me-2"></i> Incoming Stock
            </h2>

            <div className="row h-100">
                <SupplySearchPanel
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filteredProducts={filteredProducts}
                    onAdd={addToSupply}
                />

                <div className="col-md-7">
                    <div className="card shadow border-0 h-100 d-flex flex-column">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-clipboard-check me-2"></i> Intake List
                            </h5>
                        </div>
                        <div className="card-body p-0">
                            <SupplyListTable
                                supplyList={supplyList}
                                onUpdateItem={updateItem}
                                onRemove={removeFromList}
                            />
                        </div>
                        <SupplySummary
                            total={calculateTotal()}
                            disabled={supplyList.length === 0}
                            onConfirm={handleSaveSupply}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplyPage;
