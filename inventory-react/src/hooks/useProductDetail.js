import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../services/apiClient";

export const useProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const result = await apiClient.get(`/products/${id}`);
            setProduct(result.data);
        } catch (error) {
            console.error("Error loading product", error);
        } finally {
            setLoading(false);
        }
    };

    const isLowStock = product ? product.stock <= product.minStock : false;

    return { 
        product, 
        loading, 
        isLowStock, 
        navigate 
    };
};