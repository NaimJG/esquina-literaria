const SERVER_URL = "http://localhost:5000";

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
}

export default userService;