import React, { useEffect, useRef, useState } from "react";
import { getAllUsers, createUser, deleteUser } from "./services/userService";
import { useAuthInfo } from "./hooks/useAuthInfo";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "EMPLOYEE"
    });
    const { username: currentUser } = useAuthInfo();

    const loadedRef = useRef(false);

    useEffect(() => {
        if (loadedRef.current) return;
        loadedRef.current = true;
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            if (err.status === 403 || err.response?.status === 403) {
                setError("⛔ You do not have permission to view users.");
            } else {
                setError(err.message || "Error loading users.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});
        try {
            await createUser(formData);
            setShowModal(false);
            setFormData({ username: "", email: "", password: "", role: "EMPLOYEE" });
            loadUsers();
            alert("✅ User created successfully");
        } catch (err) {
            if (err.status === 400 && err.fieldErrors) {
                setFieldErrors(err.fieldErrors);
            } else if (err.status === 409) {
                alert("❌ Error: " + (err.message || "User already exists"));
            } else {
                alert("❌ Error: " + (err.message || "Could not create user"));
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFieldErrors({});
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                loadUsers();
            } catch (err) {
                alert(err.message || "Error deleting user");
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
                onClose={handleCloseModal}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                fieldErrors={fieldErrors}
            />
        </div>
    );
};

export default UserList;