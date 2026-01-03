import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../services/apiClient";

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const API_URL = "/products";
    const CAT_URL = "/categories";

    useEffect(() => {
        loadCategories();
        if (id) loadProduct();
    }, [id]);

    const loadCategories = async () => {
        try {
            const result = await apiClient.get(CAT_URL);
            setCategories(result.data);
        } catch (e) { console.error("Error loading categories", e); }
    };

    const loadProduct = async () => {
        try {
            const result = await apiClient.get(`${API_URL}/${id}`);
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
        setError("");

        const price = parseFloat(product.price);
        const stock = Number(product.stock);
        const minStock = Number(product.minStock);

        if (Number.isNaN(price) || price <= 0) {
            setError("Price must be greater than 0.");
            return;
        }
        if (Number.isNaN(stock) || stock < 0) {
            setError("Stock cannot be negative.");
            return;
        }
        if (Number.isNaN(minStock) || minStock < 0) {
            setError("Minimum stock cannot be negative.");
            return;
        }
        if (minStock > stock) {
            setError("Minimum stock cannot exceed current stock.");
            return;
        }

        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(product)], { type: 'application/json' }));
        if (selectedImage) formData.append("image", selectedImage);

        try {
            setIsSubmitting(true);
            const headers = { "Content-Type": "multipart/form-data" };
            if (id) {
                await apiClient.put(`${API_URL}/${id}`, formData, { headers });
                navigate(`/view/${id}`);
            } else {
                await apiClient.post(API_URL, formData, { headers });
                navigate("/products");
            }
        } catch (error) {
            console.error("Error saving product:", error);
            setError("Error saving product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        product,
        categories,
        previewUrl,
        isEditing: !!id,
        isSubmitting,
        error,
        handleInputChange,
        handleFileChange,
        handleSubmit,
        navigate
    };
};