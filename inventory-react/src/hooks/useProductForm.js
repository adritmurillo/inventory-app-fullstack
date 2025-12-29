// src/hooks/useProductForm.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const useProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        minStock: "",
        categoryId: ""
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [categories, setCategories] = useState([]);

    const API_URL = "http://localhost:8080/api/products";
    const CAT_URL = "http://localhost:8080/api/categories";

    useEffect(() => {
        loadCategories();
        if (id) loadProduct();
    }, [id]);

    const loadCategories = async () => {
        try {
            const result = await axios.get(CAT_URL);
            setCategories(result.data);
        } catch (e) { console.error("Error loading categories", e); }
    };

    const loadProduct = async () => {
        try {
            const result = await axios.get(`${API_URL}/${id}`);
            // Carga los datos de texto
            setProduct({
                name: result.data.name,
                description: result.data.description,
                price: result.data.price,
                stock: result.data.stock,
                minStock: result.data.minStock,
                categoryId: result.data.categoryId || ""
            });
            if (result.data.imageUrl) {
                setPreviewUrl(result.data.imageUrl);
            }
            // -------------------------------

        } catch (e) { console.error("Error loading product", e); }
    };

    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(product)], { type: 'application/json' }));
        if (selectedImage) formData.append("image", selectedImage);

        try {
            const headers = { "Content-Type": "multipart/form-data" };
            if (id) await axios.put(`${API_URL}/${id}`, formData, { headers });
            else await axios.post(API_URL, formData, { headers });
            navigate("/");
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Error saving product");
        }
    };

    // Retornamos solo lo que la vista necesita
    return {
        product,
        categories,
        previewUrl,
        isEditing: !!id,
        handleInputChange,
        handleFileChange,
        handleSubmit,
        navigate
    };
};