import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import bookService from '../../service/bookService';
import reviewService from '../../service/reviewService';
import type { Book } from '../../types/Book';
import './BookDetail.css';
import { Box, Button, Rating, Modal, TextField, Typography, Alert } from '@mui/material';
import { useAuth } from '../../context/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '6px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function BookDetail() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState<number | null>(0);
    const [comment, setComment] = useState('');
    const [showUserAlert, setShowUserAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [validationError, setValidationError] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setValidationError(false); // Reset validation error on close
    }

    const errorUser = () => {
        setShowUserAlert(true);
        setTimeout(() => {
           setShowUserAlert(false); 
        }, 3000);
    }

    const getBook = useCallback(async () => {
        if (!id) {
            console.log("No se encontró un libro con esa URL");
            return;
        }
        try {
            setLoading(true);
            const bookData = await bookService.getBookById(id);
            console.log("Book data:", bookData);
            setBook(bookData);
            setError(null);
        } catch (error: unknown) {
            console.error("Error:", error);
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

    const handleReviewSubmit = async () => {
        if (rating === null || rating === 0 || comment.trim() === '') {
            setValidationError(true);
            return;
        }

        if (!id || !user) return;

        try {
            await reviewService.createReview(id, { score: rating, comment: comment, userId: user._id });
            await getBook();
            handleClose();
        } catch (error) {
            setShowErrorAlert(true);
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 4000);
            console.error("Error al crear reseña:", error);
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
        <>
            {showErrorAlert && (
                <Alert
                    severity="error"
                    onClose={() => setShowErrorAlert(false)}
                    sx={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1400 }}
                >
                    Error al crear la reseña. Es posible que ya hayas reseñado este libro.
                </Alert>
            )}
            <div className="book-detail-container">
                <div className="book-detail-card">
                    <div className="book-detail-header">
                        <img src={book.cover} alt={book.title} className="book-detail-cover" />
                        <div className="book-detail-info">
                            <h1>{book.title}</h1>
                            <h2>{book.author}</h2>
                            <p><strong>Género:</strong> {book.genre}</p>
                            <p><strong>Categoría:</strong> {book.category}</p>
                            <p>
                            <strong>Publicación:</strong>{" "}
                            {book.publishDate
                                ? new Date(book.publishDate).toLocaleDateString("es-AR", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })
                                : "Sin fecha"}
                            </p>
                            <div className='score-general'>
                                <div className='score-container'>
                                    <h3>Calificación General</h3>
                                    <Box sx={{ height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                        <div style={{ display: 'flex', fontSize: '14px', paddingTop: '1px' }}>{book.score}</div>
                                        <Rating name="read-only" value={book.score} readOnly precision={0.5} />
                                    </Box>
                                </div>
                                <div>
                                    {showUserAlert && (
                                        <Alert
                                            severity="info"
                                            sx={{ display: 'flex', position: 'absolute', right: '0px', bottom: '60px' }}
                                        >
                                            Inicia sesión o crea una cuenta para escribir una reseña.
                                        </Alert>
                                    )}
                                    <Button onClick={user ? handleOpen : errorUser} sx={{ border: '1px solid' }}>Escribir una reseña</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="book-detail-body">
                        <h3>Sinopsis</h3>
                        <p className="book-detail-synopsis">{book.synopsis}</p>
                    </div>
                    <div className="book-detail-reviews">
                        <div className='bookreview-container'>
                            <h4>Reseñas de los usuarios:</h4>
                            {book.reviews && book.reviews.length > 0 ? (
                                book.reviews.map(rev => (
                                    <div className='review-content' key={rev._id}>
                                        <span><strong>Fecha:</strong> {new Date(rev.scoreDate).toLocaleDateString()} - <strong>{rev.user.username}</strong></span>
                                        <span><strong>Comentario:</strong> {rev.comment}</span>
                                        <span><strong>Calificación:</strong>  {rev.score}⭐</span>
                                    </div>
                                ))
                            ) : (
                                <p>No hay reseñas para este libro todavía.</p>
                            )}
                        </div>
                    </div>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {validationError && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                Por favor, completa la calificación y el comentario.
                            </Alert>
                        )}
                        <Typography id="modal-modal-title" sx={{ paddingLeft: '1px' }} variant="h6" component="h2">
                            Escribe tu reseña
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                                setValidationError(false); // Hide error on change
                            }}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Comentario"
                            multiline
                            rows={4}
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                                setValidationError(false); // Hide error on change
                            }}
                            fullWidth
                        />
                        <Button sx={{ border: '1px solid', marginTop: 1 }} onClick={handleReviewSubmit}>Enviar reseña</Button>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default BookDetail;
