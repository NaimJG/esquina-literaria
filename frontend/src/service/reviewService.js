const SERVER_URL = "http://localhost:5000";

const reviewService = {
    createReview: async (bookId, reviewData) => {
        console.log(reviewData);
        
        const response = await fetch(`${SERVER_URL}/books/${bookId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al crear la reseña.");
        }
        
        return await response.json();
    },
};

export default reviewService;
