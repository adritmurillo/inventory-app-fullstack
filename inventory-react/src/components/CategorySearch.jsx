export default function CategorySearch({ searchTerm, setSearchTerm }) {
    return (
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
    );
}
