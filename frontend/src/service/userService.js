const SERVER_URL = "https://esquina-literaria.onrender.com";

const userService = {
    registerUser: async (userData) => {
        console.log(userData);

        const response = await fetch(`${SERVER_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            console.log(response);
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al registrar el usuario.");
        }

        return response.json();
    },

    loginUser: async (credentials) => {
        const response = await fetch(`${SERVER_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.message || 'Usuario o contraseña incorrecta');
        }

        return data;
    },

    updateEmail: async (userId, newEmail) => {
        const response = await fetch(`${SERVER_URL}/users/${userId}/email`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar el email");
        return data;
    },

    updateUsername: async (userId, newUsername) => {
        const response = await fetch(`${SERVER_URL}/users/${userId}/username`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newUsername }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar el nombre de usuario");
        return data;
    },

    updatePassword: async (userId, oldPassword, newPassword) => {
        const response = await fetch(`${SERVER_URL}/users/${userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error al actualizar la contraseña");
        return data;
    },

}

export default userService;