import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import bookService from '../../service/bookService';
import reviewService from '../../service/reviewService';
import type { Book } from '../../types/Book';
import './BookDetail.css';
import { Box, Rating } from '@mui/material';
import { useAuth } from '../../context/useAuth';

function BookDetail() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userRating, setUserRating] = useState<number | null>(null);

    const getBook = useCallback(async () => {
        if (!id) {
            console.log("No book ID found in URL");
            return;
        }
        console.log(`Fetching book with id: ${id}`);
        try {
            setLoading(true);
            const bookData = await bookService.getBookById(id);
            console.log("Book data received:", bookData);
            setBook(bookData);
            setError(null);
        } catch (error: unknown) {
            console.error("Error fetching book:", error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error desconocido.");
            }
            setBook(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getBook();
    }, [getBook]);

    const handleRatingChange = async (newValue: number | null) => {
        if (!id || !user || newValue === null) return;

        try {
            await reviewService.createReview(id, { score: newValue, userId: user.id });
            setUserRating(newValue);
            // Refetch book data to update average score
            await getBook();
        } catch (error) {
            console.error("Error creating review:", error);
            // Optionally, show an error message to the user
        }
    };

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!book) {
        return <div className="no-book">No se encontró el libro.</div>;
    }

    return (
        <div className="book-detail-container">
            <div className="book-detail-card">
                <div className="book-detail-header">
                    <img src={book.cover} alt={book.title} className="book-detail-cover" />
                    <div className="book-detail-info">
                        <h1>{book.title}</h1>
                        <h2>{book.author}</h2>
                        <p><strong>Género:</strong> {book.genre}</p>
                        <p><strong>Categoría:</strong> {book.category}</p>
                    </div>
                </div>
                <div className="book-detail-body">
                    <h3>Sinopsis</h3>
                    <p className="book-detail-synopsis">{book.synopsis}</p>
                </div>
                <div className="book-detail-reviews">
                    <h3>Puntuación General</h3>
                    <Box sx={{ height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <div style={{ display: 'flex', fontSize: '14px', paddingTop: '1px' }}>{book.score}</div>
                        <Rating name="read-only" value={book.score} readOnly precision={0.1} />
                    </Box>
                    <h3>Tu Puntuación</h3>
                    <Rating
                        name="user-rating"
                        value={userRating}
                        onChange={(event, newValue) => {
                            handleRatingChange(newValue);
                        }}
                    />
                    
                    <p>Próximamente comentarios...</p>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
