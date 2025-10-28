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
}

export default bookService;