import { useLocation } from "react-router-dom";

export const useSidebar = () => {
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path 
            ? "nav-link active text-white shadow-sm" 
            : "nav-link text-dark";                 
    };

    return { isActive };
};