import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useCategoryForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const editId = searchParams.get("edit"); 

    const [category, setCategory] = useState({
        name: "",
        description: ""
    });

    const API_URL = "http://localhost:8080/api/categories";

    useEffect(() => {
        if (editId) loadCategory();
    }, [editId]);

    const loadCategory = async () => {
        try {
            const result = await axios.get(`${API_URL}/${editId}`);
            setCategory(result.data);
        } catch (error) {
            console.error("Error loading category", error);
        }
    };

    const handleInputChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, category);
            } else {
                await axios.post(API_URL, category);
            }
            navigate("/categories");
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Error saving category");
        }
    };

    return {
        category,
        isEditing: !!editId,
        handleInputChange,
        handleSubmit,
        navigate
    };
};