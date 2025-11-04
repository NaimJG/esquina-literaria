const SERVER_URL = "http://localhost:5000";

const authorService = {

    getAllAuthors: async () => {
        const response = await fetch(`${SERVER_URL}/authors`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener las categorias.");
        }

        const data = await response.json();
        return data;
    },

}

export default authorService;