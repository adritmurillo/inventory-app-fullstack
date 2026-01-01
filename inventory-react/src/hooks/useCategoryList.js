import { useState, useEffect } from "react";
import axios from "axios";

export const useCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = "http://localhost:8080/api/categories";

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setIsLoading(true);
        try {
            const result = await axios.get(API_URL);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            loadCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Cannot delete because it has associated products.");
        }
    };

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return {
        categories: filteredCategories, 
        searchTerm,
        setSearchTerm,
        isLoading,
        handleDelete
    };
};