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
}

export default bookService;