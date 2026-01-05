import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function useAuthInfo() {
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState("User");
    const [initial, setInitial] = useState("U");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        try {
            const decoded = jwtDecode(token);
            const name = decoded.sub || "User";
            setUsername(name);
            setInitial(name.charAt(0).toUpperCase());
            setRole(decoded.role || null);
        } catch (error) {
            console.error("Error decoding token", error);
        }
    }, []);

    return {
        role,
        username,
        initial,
        isAdmin: role === "ROLE_ADMIN"
    };
}
