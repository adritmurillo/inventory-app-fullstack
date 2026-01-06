import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { getAllProducts } from '../../services/productService';
import { createSale } from '../../services/saleService';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import CartTable from './components/CartTable';
import TotalsBar from './components/TotalsBar';

const PosPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const searchInputRef = useRef(null);

    const loadProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error loading products", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);

    const addToCart = useCallback((product) => {
        if (product.stock !== undefined && product.stock <= 0) return;
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                const nextQty = existingItem.quantity + 1;
                if (product.stock !== undefined && nextQty > product.stock) return prevCart;
                return prevCart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId, newQty) => {
        if (newQty < 1) return;
        setCart(prevCart => prevCart.map(item => {
            if (item.id !== productId) return item;
            if (item.stock !== undefined && newQty > item.stock) return item;
            return { ...item, quantity: newQty };
        }));
    }, []);

    const total = useMemo(
        () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        [cart]
    );

    const handleCheckout = useCallback(async () => {
        if (cart.length === 0) return alert("Cart is empty");
        
        try {
            await createSale(cart);
            alert("✅ Sale completed successfully!");
            setCart([]);
            setSearchTerm("");
            loadProducts();
        } catch (error) {
            alert("❌ Error processing sale: " + (error.response?.data?.message || "Check stock"));
        }
    }, [cart, loadProducts]);

    const filteredProducts = useMemo(
        () => products.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            p.id.toString() === searchTerm
        ),
        [products, searchTerm]
    );

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && filteredProducts.length === 1) {
            addToCart(filteredProducts[0]);
            setSearchTerm("");
        }
    }, [addToCart, filteredProducts]);

    return (
        <div className="container-fluid p-4" style={{ height: "calc(100vh - 60px)" }}>
            <div className="row h-100">
                <div className="col-md-7 d-flex flex-column">
                    <SearchBar
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        inputRef={searchInputRef}
                    />
                    <ProductGrid
                        products={filteredProducts}
                        onSelect={addToCart}
                        isLoading={isLoading}
                    />
                </div>

                <div className="col-md-5">
                    <div className="card shadow h-100 d-flex flex-column border-0">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold"><i className="bi bi-cart4 me-2"></i> Current Order</h5>
                        </div>
                        <CartTable
                            items={cart}
                            onQtyChange={updateQuantity}
                            onRemove={removeFromCart}
                        />
                        <TotalsBar
                            total={total}
                            onCheckout={handleCheckout}
                            disabled={cart.length === 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PosPage;
