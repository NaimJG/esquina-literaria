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

    createBook: async (bookData) => {
        const response = await fetch(`${SERVER_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
        });

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el libro.");
        }

        const data = await response.json();
        console.log("Libro creado:", data);
        return data;
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

    addReview: async (bookId, review) => {
        const response = await fetch(`${SERVER_URL}/reviews/${bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
        });

        if (!response.ok) throw new Error("Error al guardar reseña");
        return await response.json();
    },
        
    getTopCommentedBooks: async () => {
        const response = await fetch(`${SERVER_URL}/books`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener los libros.");
        }

        const data = await response.json();
        const books = data.books;

        const topBooks = books
            .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
            .slice(0, 10);

        return topBooks;
    },

}

export default bookService;