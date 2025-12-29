import { useLocation } from "react-router-dom";

export const useSidebar = () => {
    const location = useLocation();

    // Devuelve la clase CSS correcta si la ruta coincide
    const isActive = (path) => {
        return location.pathname === path 
            ? "nav-link active text-white shadow-sm" // Estilo Activo
            : "nav-link text-dark";                  // Estilo Inactivo
    };

    return { isActive };
};