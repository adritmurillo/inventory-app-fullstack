import { useState, useEffect } from "react";
import axios from "axios";

export const useProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);         
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = "http://localhost:8080/api/products";
    const CAT_URL = "http://localhost:8080/api/categories";

    useEffect(() => {
        loadData();
    }, [page, searchTerm, selectedCategoryId]); 

    const loadData = async () => {
        setIsLoading(true);
        try {
            const params = {
                page: page,
                size: 5,
                search: searchTerm,
                categoryId: selectedCategoryId
            };

            const [productsRes, categoriesRes] = await Promise.all([
                axios.get(API_URL, { params }), 
                axios.get(CAT_URL)
            ]);
            setProducts(productsRes.data.content || []);
            setTotalPages(productsRes.data.totalPages || 0);
            
            if (categories.length === 0) {
                setCategories(categoriesRes.data);
            }
            
        } catch (error) {
            console.error("Error loading data:", error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            loadData(); 
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return {
        products,
        categories,
        selectedCategoryId, setSelectedCategoryId,
        searchTerm, setSearchTerm,
        isLoading,
        handleDelete,
        page, setPage, totalPages
    };
};