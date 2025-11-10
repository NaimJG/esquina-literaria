const SERVER_URL = "https://esquina-literaria.onrender.com";

const genreService = {

    getAllGenres: async () => {
        const response = await fetch(`${SERVER_URL}/genres`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener las categorias.");
        }

        const data = await response.json();
        return data;
    },


}

export default genreService;