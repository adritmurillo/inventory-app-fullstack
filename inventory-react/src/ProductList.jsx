import { useNavigate } from "react-router-dom";
import { useProductList } from "./hooks/useProductList";
import { useAuthInfo } from "./hooks/useAuthInfo";
import ProductFilters from "./components/ProductFilters";
import ProductTable from "./components/ProductTable";

export default function ProductList() {
    const navigate = useNavigate();
    const {
        products,
        categories,
        searchTerm,
        setSearchTerm,
        selectedCategoryId,
        setSelectedCategoryId,
        handleDelete,
        isLoading,
        page,
        setPage,
        totalPages
    } = useProductList();
    const { isAdmin } = useAuthInfo();

    return (
        <div className="w-100" style={{ maxWidth: "1000px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark m-0">Product List</h3>
                {isAdmin && (
                    <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm" onClick={() => navigate("/new")}>
                        <i className="bi bi-plus-lg"></i> <span>New Product</span>
                    </button>
                )}
            </div>

            <ProductFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
                categories={categories}
            />

            <ProductTable
                products={products}
                isLoading={isLoading}
                isAdmin={isAdmin}
                onView={(id) => navigate(`/view/${id}`)}
                onEdit={(id) => navigate(`/edit/${id}`)}
                onDelete={handleDelete}
            />

            <div className="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span className="text-muted small">
                    Page {page + 1} of {totalPages === 0 ? 1 : totalPages}
                </span>

                <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}