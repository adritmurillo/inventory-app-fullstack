import React from 'react';

const SearchBar = ({ value, onChange, onKeyDown, inputRef }) => (
    <div className="card shadow-sm mb-3">
        <div className="card-body">
            <div className="input-group input-group-lg">
                <span className="input-group-text bg-primary text-white border-0">
                    <i className="bi bi-upc-scan"></i>
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    className="form-control border-0 bg-light"
                    placeholder="Search product or scan code..."
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    autoFocus
                />
            </div>
        </div>
    </div>
);

export default SearchBar;
