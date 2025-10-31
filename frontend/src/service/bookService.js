const SERVER_URL = "http://localhost:5000";

const bookService = {
    getAllBooks: async () => {
        const response = await fetch(`${SERVER_URL}/books`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener los libros.");
        }

        const data = await response.json();
        console.log(data);

        return data.books;
    },

    getBookById: async (bookId) => {
        const response = await fetch(`${SERVER_URL}/books/${bookId}`);
        console.log(response)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener el libro.");
        }

        const data = await response.json();
        console.log(data);

        return data.book;
    },

    getCategories: async () => {
        const response = await fetch(`${SERVER_URL}/categories`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener las categorias.");
        }

        const data = await response.json();
        console.log(data);

        return data;
    },

    getGenres: async () => {
        const response = await fetch(`${SERVER_URL}/genres`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener las categorias.");
        }

        const data = await response.json();
        return data;
    },

    getAuthors: async () => {
        const response = await fetch(`${SERVER_URL}/authors`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener las categorias.");
        }

        const data = await response.json();
        return data;
    },

    addReview: async (bookId, review) => {
        const response = await fetch(`${SERVER_URL}/reviews/${bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
        });

        if (!response.ok) throw new Error("Error al guardar reseña");
        return await response.json();
    }
    
}

export default bookService;