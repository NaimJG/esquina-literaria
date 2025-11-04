import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import './Profile.css';
import { useState, useEffect } from 'react';
import type { Book } from '../../types/Book';
import reviewService from '../../service/reviewService';
import bookService from '../../service/bookService';
import { Rating } from '@mui/material';
import type { Review } from '../../types/Review';

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchBook, setSearchBook] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editText, setEditText] = useState("");
  const [editScore, setEditScore] = useState<number>(0);

  const REVIEWS_PER_PAGE = 5;

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
    if (!showReviewForm) {
      setSelectedBook(null);
      setReviewText("");
      setScore(0);
      setMessage("");
    }
  }

 useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error al cargar libros:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (user) fetchReviews(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page]);

  const fetchReviews = async (pageNumber: number) => {
    try {
      const data = await reviewService.getReviewsByUser(user._id, pageNumber, REVIEWS_PER_PAGE);
      console.log('Reviews: ', data)
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error al cargar reseñas del usuario:', error);
    }
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setSearchBook(book.title + " – " + book.author);
    setShowSuggestions(false);
    setMessage("");
  };

  const handlePublish = async () => {
    if (!selectedBook || !reviewText.trim() || score <= 0) {
      setMessage("Por favor seleccioná una puntuación y escribí tu reseña.");
      return;
    }

    if (!user) {
      setMessage("Debes estar logueado para publicar una reseña.");
      return;
    }

    try {
      setLoading(true);
      await reviewService.createReview(selectedBook.id, {
        score: score,
        comment: reviewText.trim(),
        userId: user._id,
      });

      setMessage("✅ ¡Reseña publicada con éxito!");
      setReviewText("");
      setScore(0);
      setSelectedBook(null);

      // Actualizar reseñas
      fetchReviews(page);
    } catch (error) {
      console.error("Error al publicar reseña:", error);
      setMessage("❌ Ocurrió un error al publicar la reseña.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
    setEditText(review.comment);
    setEditScore(review.score);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditText("");
    setEditScore(0);
  };

  const handleSaveEdit = async () => {
    if (!editingReview) return;
    if (!editText.trim() || editScore <= 0) {
      setMessage("Por favor, completá todos los campos antes de guardar.");
      return;
    }

    try {
      setLoading(true);
      await reviewService.updateReview(editingReview._id, {
        comment: editText.trim(),
        score: editScore,
        scoreDate: new Date().toISOString(), // actualiza la fecha
      });
      setMessage("✅ Reseña actualizada con éxito.");
      setEditingReview(null);
      fetchReviews(page);
    } catch (error) {
      console.error("Error al editar reseña:", error);
      setMessage("❌ No se pudo actualizar la reseña.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm("¿Seguro que querés eliminar esta reseña?")) return;

    try {
      await reviewService.deleteReview(reviewId);
      setMessage("🗑️ Reseña eliminada correctamente.");
      fetchReviews(page);
    } catch (error) {
      console.error("Error al eliminar reseña:", error);
      setMessage("❌ No se pudo eliminar la reseña.");
    }
  };

  return (
    <>
      <section className="profileContainer">
        <button 
          onClick={toggleReviewForm} 
          className="add-review-button"
        >
          {showReviewForm ? 'Cerrar formulario' : '+ Agregar una nueva reseña'}
        </button>

        {showReviewForm && (
          <div className="review-form-container">
            <label htmlFor="bookSearch">Seleccioná un libro:</label>
            <input
              id="bookSearch"
              name="bookSearch"
              type="text"
              autoComplete="off"
              placeholder="Buscar por título o autor..."
              value={searchBook}
              onChange={e => {
                setSearchBook(e.target.value);
                setShowSuggestions(true);
                setSelectedBook(null);
              }}
              onFocus={() => setShowSuggestions(true)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', fontSize: '16px', marginBottom: '8px', boxSizing: 'border-box' }}
            />
            {showSuggestions && searchBook.trim() && (
              <ul className="book-suggestions">
                {books.filter(b =>
                  b.title.toLowerCase().includes(searchBook.toLowerCase()) ||
                  b.author.toLowerCase().includes(searchBook.toLowerCase())
                ).slice(0, 8).map(book => (
                  <li
                    key={book.id}
                    onClick={() => handleSelectBook(book)}
                    className={selectedBook?.id === book.id ? 'selected' : ''}
                    style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #eee'}}
                  >
                    {book.title} – {book.author}
                  </li>
                ))}
                {books.filter(b =>
                  b.title.toLowerCase().includes(searchBook.toLowerCase()) ||
                  b.author.toLowerCase().includes(searchBook.toLowerCase())
                ).length === 0 && (
                  <li style={{ padding: '8px', color: '#999' }}>No se encontraron libros</li>
                )}
              </ul>
            )}

          {selectedBook && (
            <div className="book-preview">
              <div className="book-cover-info">
                <img src={selectedBook.cover} alt={selectedBook.title} />
                <div className="book-info">
                  <h4>{selectedBook.title}</h4>
                  <p><strong>Autor:</strong> {selectedBook.author}</p>
                  <p><strong>Género:</strong> {selectedBook.genre}</p>
                  <p><strong>Categoría:</strong> {selectedBook.category}</p>
                  <p>{selectedBook.synopsis}</p>
                </div>
              </div>

              <div className="score-input">
                <label htmlFor="scoreInput" style={{ marginBottom: '6px' }}>
                  Puntaje:
                </label>
                <Rating
                  name="scoreInput"
                  value={score}
                  onChange={(event, newValue) => setScore(newValue || 0)}
                  precision={1}
                  size="large"
                />
              </div>
              
              <div className='review-textarea'>
                <label htmlFor="reviewText" style={{ alignSelf: 'flex-start' }}>Reseña:</label>
                <textarea
                  id="reviewText"
                  name="reviewText"
                  placeholder="Escribí tu reseña (máx. 500 palabras)..."
                  maxLength={500 * 6}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button className='publish-review-button' onClick={handlePublish} disabled={loading}>
                  {loading ? "Publicando..." : "Publicar reseña"}
                </button>
              </div>
            </div>
          )}

          {message && <p className="message">{message}</p>}
          </div>
        )}

        {/* 🔹 Sección de reseñas */}
        <section className="user-reviews-section">
          <h3>Mis reseñas</h3>
          {reviews.length === 0 ? (
            <p>No has publicado ninguna reseña todavía.</p>
          ) : (
            <ul className="user-reviews-list">
              {reviews.map((review: Review) => (
                <div key={review._id} className="book-preview">
                  <div className="book-cover-info">
                    <img src={review.book?.cover || '/default-cover.jpg'} alt={review.book?.title} />
                    <div className="book-info">
                      <h4>{review.book?.title}</h4>
                      <p><strong>Autor:</strong> {review.book?.author}</p>
                      <p><strong>Género:</strong> {review.book?.genre}</p>
                      <p><strong>Categoría:</strong> {review.book?.category}</p>
                      <p>{review.book?.synopsis}</p>
                    </div>
                  </div>
                  <div className="review-content">
                    {editingReview?._id === review._id ? (
                      <>
                        <div className="score-input">
                          <label>Puntaje:</label>
                          <Rating
                            value={editScore}
                            onChange={(e, val) => setEditScore(val || 0)}
                            size="large"
                          />
                        </div>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <div className="edit-buttons">
                          <button onClick={handleSaveEdit} disabled={loading}>
                            💾 Guardar
                          </button>
                          <button onClick={handleCancelEdit} className="cancel-btn">
                            Cancelar
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>⭐ {review.score}</p>
                        <p>{review.comment}</p>
                        <small>
                          {new Date(review.scoreDate).toLocaleDateString("es-AR")}
                        </small>
                        <div className="review-actions">
                          <button onClick={() => handleEditClick(review)}>✏️ Editar</button>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="delete-btn"
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </ul>
          )}

          {/* 🔹 Paginación */}
          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                ◀ Anterior
              </button>
              <span>
                Página {page} de {totalPages}
              </span>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Siguiente ▶
              </button>
            </div>
          )}
        </section>

        <aside className="right-sidebar">
          <h4>Ajustes</h4>
          <ul className='profileSettingsList'>
            <li className='listElement'>
              <Link to="/profile/settings#email">Cambiar email</Link>
            </li>
            <li className='listElement'>
              <Link to="/profile/settings#name">Cambiar nombre de usuario</Link>
            </li>
            <li className='listElement'>
              <Link to="/profile/settings#password">Cambiar contraseña</Link>
            </li>
            <li className='listElement'>
              <Link to="/profile/settings#color">Cambiar color de mi página</Link>
            </li>
            <li className='listElement'>
              <Link to="/profile/settings#icon">Cambiar icono del perfil</Link>
            </li>
            <li className='listButton'>
              <button onClick={handleLogout} className="logoutButton">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </aside>
      </section>

    </>
  );
}

export default Profile;