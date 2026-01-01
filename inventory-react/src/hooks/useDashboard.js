import { useState, useEffect } from "react";
import axios from "axios";

export const useDashboard = () => {
    const [stats, setStats] = useState({ 
        totalProducts: 0, 
        totalInventoryValue: 0, 
        lowStockCount: 0 
    });
    const [chartData, setChartData] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsRes, chartRes, lowStockRes, pieRes, listRes] = await Promise.all([
                axios.get("http://localhost:8080/api/dashboard/stats"),
                axios.get("http://localhost:8080/api/dashboard/chart"),
                axios.get("http://localhost:8080/api/dashboard/low-stock"),
                axios.get("http://localhost:8080/api/dashboard/pie-chart"),
                axios.get(`http://localhost:8080/api/dashboard/products-by-price?sort=${sortOrder}`)
            ]);

            setStats(statsRes.data);
            setChartData(chartRes.data);
            setLowStockProducts(lowStockRes.data || []);
            setPieData(pieRes.data || []);
            setSortedProducts(listRes.data || []);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchList = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/dashboard/products-by-price?sort=${sortOrder}`);
                setSortedProducts(res.data || []);
            } catch (e) {
                console.error(e);
            }
        };
        if (!loading) fetchList();
    }, [sortOrder, loading]);

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    };

    return { stats, chartData, lowStockProducts, pieData, sortedProducts, loading, sortOrder, toggleSortOrder };
};