import FieldError from "./FieldError";

export default function UserModal({ show, onClose, formData, onChange, onSubmit, fieldErrors = {} }) {
    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">New User</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className={`form-control ${fieldErrors.username ? 'is-invalid' : ''}`}
                                    required
                                    value={formData.username}
                                    onChange={onChange}
                                />
                                <FieldError error={fieldErrors.username} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                                    required
                                    value={formData.email}
                                    onChange={onChange}
                                />
                                <FieldError error={fieldErrors.email} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Initial Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                                    required
                                    minLength="5"
                                    value={formData.password}
                                    onChange={onChange}
                                    placeholder="Minimum 5 characters"
                                />
                                <FieldError error={fieldErrors.password} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    name="role"
                                    className={`form-select ${fieldErrors.role ? 'is-invalid' : ''}`}
                                    value={formData.role}
                                    onChange={onChange}
                                >
                                    <option value="EMPLOYEE">Employee (Sales)</option>
                                    <option value="ADMIN">Administrator (All)</option>
                                </select>
                                <FieldError error={fieldErrors.role} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Create User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
