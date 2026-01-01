import { useNavigate } from "react-router-dom";
import { useCategoryList } from "./hooks/useCategoryList";

export default function CategoryList() {
    const navigate = useNavigate();
    // Hook state and actions
    const { categories, searchTerm, setSearchTerm, handleDelete, isLoading } = useCategoryList();

    return (
        <div className="w-100" style={{ maxWidth: "1000px" }}>
            
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark m-0">Category List</h3>
                <button 
                    className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" 
                    onClick={() => navigate("/new-category")}
                >
                    <i className="bi bi-plus-lg"></i>
                    <span>New Category</span>
                </button>
            </div>

            {/* Search */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0 text-secondary ps-3">
                            <i className="bi bi-search"></i>
                        </span>
                        <input 
                            type="text" 
                            className="form-control border-start-0 ps-0" 
                            placeholder="Search categories..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4 py-3">ID</th>
                                <th className="py-3">Name</th>
                                <th className="py-3">Description</th>
                                <th className="pe-4 py-3 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                            ) : categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td className="ps-4 fw-bold text-secondary">#{cat.id}</td>
                                    <td className="fw-bold text-dark">{cat.name}</td>
                                    <td className="text-secondary small">{cat.description || "-"}</td>
                                    <td className="pe-4 text-end">
                                        <div className="btn-group btn-group-sm">
                                            <button className="btn btn-outline-primary d-flex align-items-center gap-1"
                                                onClick={() => navigate(`/new-category?edit=${cat.id}`)} title="Edit">
                                                <i className="bi bi-pencil-square"></i> <span className="d-none d-md-inline">Edit</span>
                                            </button>
                                            <button className="btn btn-outline-danger d-flex align-items-center gap-1"
                                                onClick={() => handleDelete(cat.id)} title="Delete">
                                                <i className="bi bi-trash"></i> <span className="d-none d-md-inline">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && categories.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">No categories found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}