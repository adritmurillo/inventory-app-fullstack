import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiClient } from "../services/apiClient";

export const useCategoryForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const editId = searchParams.get("edit"); 

    const [category, setCategory] = useState({
        name: "",
        description: ""
    });
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const API_URL = "/categories";

    useEffect(() => {
        if (editId) loadCategory();
    }, [editId]);

    const loadCategory = async () => {
        try {
            const result = await apiClient.get(`${API_URL}/${editId}`);
            setCategory(result.data);
        } catch (err) {
            console.error("Error loading category", err);
            setError(err.message || "Error loading category");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});
        try {
            if (editId) {
                await apiClient.put(`${API_URL}/${editId}`, category);
            } else {
                await apiClient.post(API_URL, category);
            }
            navigate("/categories");
        } catch (err) {
            console.error("Error saving category:", err);
            if (err.status === 400 && err.fieldErrors) {
                setFieldErrors(err.fieldErrors);
                setError(err.message || "Please correct the errors below.");
            } else if (err.status === 409) {
                setError(err.message || "A category with this name already exists.");
            } else {
                setError(err.message || "Error saving category");
            }
        }
    };

    return {
        category,
        isEditing: !!editId,
        error,
        fieldErrors,
        handleInputChange,
        handleSubmit,
        navigate
    };
};