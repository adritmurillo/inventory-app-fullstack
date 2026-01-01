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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsRes, chartRes, lowStockRes, pieRes] = await Promise.all([
                axios.get("http://localhost:8080/api/dashboard/stats"),
                axios.get("http://localhost:8080/api/dashboard/chart"),
                axios.get("http://localhost:8080/api/dashboard/low-stock"),
                axios.get("http://localhost:8080/api/dashboard/pie-chart")
            ]);

            setStats(statsRes.data);
            setChartData(chartRes.data);
            setLowStockProducts(lowStockRes.data || []);
            setPieData(pieRes.data || []);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    return { stats, chartData, lowStockProducts, pieData, loading };
};