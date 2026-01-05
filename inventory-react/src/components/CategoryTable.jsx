export default function CategoryTable({ categories, isLoading, isAdmin, onEdit, onDelete }) {
    return (
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
                                    {isAdmin && (
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                className="btn btn-outline-primary d-flex align-items-center gap-1"
                                                onClick={() => onEdit(cat.id)}
                                                title="Edit"
                                            >
                                                <i className="bi bi-pencil-square"></i> <span className="d-none d-md-inline">Edit</span>
                                            </button>
                                            <button
                                                className="btn btn-outline-danger d-flex align-items-center gap-1"
                                                onClick={() => onDelete(cat.id)}
                                                title="Delete"
                                            >
                                                <i className="bi bi-trash"></i> <span className="d-none d-md-inline">Delete</span>
                                            </button>
                                        </div>
                                    )}
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
    );
}
