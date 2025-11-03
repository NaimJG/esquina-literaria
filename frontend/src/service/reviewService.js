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

    getReviewsByUser: async (userId, page = 1, limit = 5) => {
        try {
            const response = await fetch(
                `${SERVER_URL}/reviews/${userId}?page=${page}&limit=${limit}`
            );
            if (!response.ok) throw new Error("Error al obtener reseñas del usuario");
            return await response.json();
        } catch (error) {
            console.error("Error en getReviewsByUser:", error);
            throw error;
        }
    },

    updateReview: async (reviewId, updatedData) => {
        try {
            const response = await fetch(`${SERVER_URL}/reviews/${reviewId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Error al actualizar la reseña.");
            }
            return await response.json();
        } catch (error) {
            console.error("Error en updateReview:", error);
            throw error;
        }
    },

    deleteReview: async (reviewId) => {
        try {
            const response = await fetch(`${SERVER_URL}/reviews/${reviewId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Error al eliminar la reseña.");
            }
            return await response.json();
        } catch (error) {
            console.error("Error en deleteReview:", error);
            throw error;
        }

    },
};

export default reviewService;
