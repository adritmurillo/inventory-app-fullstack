import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
            const result = await axios.get(`http://localhost:8080/api/products/${id}`);
            setProduct(result.data);
        } catch (error) {
            console.error("Error loading product", error);
        } finally {
            setLoading(false);
        }
    };

    // Lógica derivada (calculada al vuelo)
    const isLowStock = product ? product.stock <= product.minStock : false;

    return { 
        product, 
        loading, 
        isLowStock, 
        navigate 
    };
};