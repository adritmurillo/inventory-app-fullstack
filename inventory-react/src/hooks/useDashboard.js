import { useState, useEffect, useCallback } from "react";
import { getChartData, getDashboardStats, getLowStockProducts, getPieChartData, getProductsByPrice } from "../services/dashboardService";

export const useDashboard = (filters = {}) => {
    const { period = "day", from, to } = filters;

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

    const buildParams = () => {
        const params = { period };
        if (period === "custom") {
            if (from) params.from = from;
            if (to) params.to = to;
        }
        return params;
    };

    const loadData = useCallback(async () => {
        if (period === "custom" && (!from || !to)) {
            // Wait for both dates before requesting custom range
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const params = buildParams();
            const [statsRes, chartRes, lowStockRes, pieRes, listRes] = await Promise.all([
                getDashboardStats(params),
                getChartData(params),
                getLowStockProducts(params),
                getPieChartData(params),
                getProductsByPrice(sortOrder, params)
            ]);

            setStats(statsRes || {});
            setChartData(chartRes || []);
            setLowStockProducts(lowStockRes || []);
            setPieData(pieRes || []);
            setSortedProducts(listRes || []);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }, [period, from, to, sortOrder]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const res = await getProductsByPrice(sortOrder, buildParams());
                setSortedProducts(res || []);
            } catch (e) {
                console.error(e);
            }
        };
        if (!loading) fetchList();
    }, [sortOrder, loading, period, from, to]);

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    };

    return { stats, chartData, lowStockProducts, pieData, sortedProducts, loading, sortOrder, toggleSortOrder, refresh: loadData };
};