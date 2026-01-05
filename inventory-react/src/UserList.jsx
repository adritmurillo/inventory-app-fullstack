import React, { useEffect, useState } from "react";
import { getAllUsers, createUser, deleteUser } from "./services/userService";
import { useAuthInfo } from "./hooks/useAuthInfo";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "EMPLOYEE"
    });
    const { username: currentUser } = useAuthInfo();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                setError("⛔ You do not have permission to view users.");
            } else {
                setError("Error loading users.");
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            setShowModal(false);
            setFormData({ username: "", email: "", password: "", role: "EMPLOYEE" });
            loadUsers();
            alert("✅ User created successfully");
        } catch (err) {
            alert("❌ Error: " + (err.response?.data?.error || "Could not create"));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                loadUsers();
            } catch (err) {
                alert("Error deleting user");
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>👥 User Management</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    + New User
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            <UserTable users={users} currentUser={currentUser} onDelete={handleDelete} />

            <UserModal
                show={showModal}
                onClose={() => setShowModal(false)}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default UserList;