export default function UserTable({ users, currentUser, onDelete }) {
    return (
        <div className="card shadow-sm">
            <div className="card-body p-0">
                <table className="table table-hover mb-0 align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="fw-bold">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-light rounded-circle p-2 me-2 text-center" style={{ width: "40px", height: "40px" }}>
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        {user.username}
                                        {user.username === currentUser && <span className="badge bg-success ms-2">You</span>}
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === "ADMIN" ? "bg-dark" : "bg-info text-dark"}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="text-end">
                                    {user.username !== currentUser && (
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => onDelete(user.id)}
                                        >
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
