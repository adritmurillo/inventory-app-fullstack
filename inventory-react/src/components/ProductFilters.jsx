export default function ProductFilters({ searchTerm, setSearchTerm, selectedCategoryId, setSelectedCategoryId, categories }) {
    return (
        <div className="row mb-4">
            <div className="col-md-8 mb-2 mb-md-0">
                <div className="input-group shadow-sm">
                    <span className="input-group-text bg-white border-end-0 text-secondary ps-3"><i className="bi bi-search"></i></span>
                    <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-md-4">
                <select
                    className="form-select shadow-sm"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
