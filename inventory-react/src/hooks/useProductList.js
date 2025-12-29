import { useState, useEffect } from "react";
import axios from "axios";

export const useProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // <--- NUEVO: Para llenar el dropdown
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(""); // <--- NUEVO: Filtro seleccionado
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = "http://localhost:8080/api/products";
    const CAT_URL = "http://localhost:8080/api/categories"; // <--- Endpoint categorías

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            // Hacemos las dos peticiones en paralelo
            const [productsRes, categoriesRes] = await Promise.all([
                axios.get(API_URL),
                axios.get(CAT_URL)
            ]);

            setProducts(productsRes.data.content || []); 
            setCategories(categoriesRes.data); // Guardamos categorías
            
        } catch (error) {
            console.error("Error loading data:", error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            // Recargamos solo productos, no hace falta recargar categorías
            const result = await axios.get(API_URL);
            setProducts(result.data.content || []);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // --- LÓGICA DE FILTRADO DOBLE (Texto + Categoría) ---
    const filteredProducts = products.filter(prod => {
        // 1. Filtro por Texto
        const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // 2. Filtro por Categoría (Si está vacía "" mostramos todo, si no, debe coincidir el ID)
        const matchesCategory = selectedCategoryId === "" || 
                                (prod.categoryId && prod.categoryId.toString() === selectedCategoryId);

        return matchesSearch && matchesCategory;
    });

    return {
        products: filteredProducts,
        categories,          // Exportamos la lista de categorías
        selectedCategoryId,  // Exportamos el valor seleccionado
        setSelectedCategoryId, // Exportamos el setter
        searchTerm,
        setSearchTerm,
        isLoading,
        handleDelete
    };
};