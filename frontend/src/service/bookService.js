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
    
    addReview: async (bookId, review) => {
        const response = await fetch(`${SERVER_URL}/reviews/${bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
        });

        if (!response.ok) throw new Error("Error al guardar reseña");
        return await response.json();
    },
}

export default bookService;