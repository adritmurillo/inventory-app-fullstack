import { useNavigate } from "react-router-dom";
import { useCategoryList } from "./hooks/useCategoryList";
import { useAuthInfo } from "./hooks/useAuthInfo";
import CategorySearch from "./components/CategorySearch";
import CategoryTable from "./components/CategoryTable";

export default function CategoryList() {
    const navigate = useNavigate();
    // Hook state and actions
    const { categories, searchTerm, setSearchTerm, handleDelete, isLoading } = useCategoryList();
    const { isAdmin } = useAuthInfo();

    return (
        <div className="w-100" style={{ maxWidth: "1000px" }}>
            
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark m-0">Category List</h3>
                {isAdmin && (
                    <button 
                        className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" 
                        onClick={() => navigate("/new-category")}
                    >
                        <i className="bi bi-plus-lg"></i>
                        <span>New Category</span>
                    </button>
                )}
            </div>
            <CategorySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <CategoryTable
                categories={categories}
                isLoading={isLoading}
                isAdmin={isAdmin}
                onEdit={(id) => navigate(`/new-category?edit=${id}`)}
                onDelete={handleDelete}
            />
        </div>
    );
}