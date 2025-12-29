import { useState, useEffect } from "react";
import axios from "axios";

export const useDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalInventoryValue: 0,
        lowStockCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/dashboard/stats");
                setStats(result.data);
            } catch (error) {
                console.error("Error loading dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    return { stats, loading };
};