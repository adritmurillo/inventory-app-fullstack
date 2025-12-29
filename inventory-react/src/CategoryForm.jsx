import { useCategoryForm } from "./hooks/useCategoryForm";

export default function CategoryForm() {
    const { category, isEditing, handleInputChange, handleSubmit, navigate } = useCategoryForm();

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow border-0 rounded-4">
                        <div className="card-header bg-primary text-white border-0 pt-4 px-4 text-center rounded-top-4">
                            <h3 className="fw-bold">
                                {isEditing ? <><i className="bi bi-pencil-square me-2"></i>Edit Category</> 
                                           : <><i className="bi bi-stars me-2"></i>New Category</>}
                            </h3>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold text-secondary small text-uppercase">Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Ex: Electronics, Furniture..." 
                                        name="name" 
                                        value={category.name} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold text-secondary small text-uppercase">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="3" 
                                        name="description" 
                                        value={category.description} 
                                        onChange={handleInputChange} 
                                    />
                                </div>

                                <div className="d-flex justify-content-end gap-2">
                                    <button type="button" className="btn btn-light text-secondary fw-bold" onClick={() => navigate("/categories")}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary fw-bold px-4">
                                        {isEditing ? "Update Category" : "Save Category"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}