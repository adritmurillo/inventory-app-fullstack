import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSidebar } from "./hooks/useSidebar";
import { logout } from "./services/authService";

export default function Sidebar() {
    const { isActive } = useSidebar();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-white shadow-sm vh-100 position-fixed" style={{ width: "250px", top: 0, left: 0, zIndex: 1000 }}>
            
            <Link to="/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none text-dark">
                <i className="bi bi-box-seam-fill fs-3 text-primary me-2"></i>
                <span className="fs-4 fw-bold">InventoryApp</span>
            </Link>
            
            <hr />
            
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                    <Link to="/dashboard" className={isActive("/dashboard")}>
                        <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/products" className={isActive("/products")}>
                        <i className="bi bi-grid me-2"></i> Products
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/categories" className={isActive("/categories")}>
                        <i className="bi bi-tags-fill me-2"></i> Categories
                    </Link>
                </li>
                
                <li className="mt-4 mb-2 ps-2 text-uppercase text-muted fw-bold small">Store</li>
                <li><a href="#" className="nav-link text-secondary disabled"><i className="bi bi-cart me-2"></i> Orders</a></li>
            </ul>
            
            <hr />
            
            <div className="dropdown dropup" ref={menuRef}>
                <button
                    className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle border-0 bg-transparent p-0"
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: "32px", height: "32px"}}>A</div>
                    <strong>Admin</strong>
                </button>
                <ul
                    className={`dropdown-menu text-small shadow dropdown-menu-anim ${menuOpen ? "show" : ""}`}
                    style={{
                        display: menuOpen ? "block" : "none",
                        bottom: "100%",
                        top: "auto",
                        marginBottom: "8px",
                    }}
                >
                    <li><button className="dropdown-item" type="button">Profile</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <button className="dropdown-item text-danger" type="button" onClick={logout}>
                            Sign Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}