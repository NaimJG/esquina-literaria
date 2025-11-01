import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import './Profile.css';
import { useState, useEffect } from 'react';
import type { Book } from '../../types/Book';
import type { Review } from '../../types/Review';
import bookService from '../../service/bookService';

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

    const review: Review = {
      content: reviewText.trim(),
      score: score,
      user: { id: user.id, username: user.username },
      date: new Date().toISOString(),
    };

    setLoading(true);
    try {
      await bookService.addReview(selectedBook.id, review);
      setMessage("✅ ¡Reseña publicada con éxito!");
      setReviewText("");
      setScore(0);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error al publicar reseña:", error);
      setMessage("❌ Ocurrió un error al publicar la reseña.");
    } finally {
      setLoading(false);
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

              <div className='score-input'>
                <label htmlFor="scoreInput">Puntaje (1 a 5):</label>
                <input
                  id="scoreInput"
                  name="score"
                  type="number"
                  min={1}
                  max={5}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
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
      </section>
      <aside className="right-sidebar">
        <h4>Ajustes</h4>
        <ul className='profileSettingsList'>
          <li className='listElement'><Link to="#" >Cambiar color de mi página</Link></li>
          <li className='listElement'><Link to="#">Cambiar icono del perfil</Link></li>
          <li className='listElement'><Link to="#">Cambiar nombre de usuario</Link></li>
          <li className='listElement'><Link to="#">Cambiar constraseña</Link></li>
          <li className='listButton'>
            <button onClick={handleLogout} className="logoutButton">
              Cerrar sesión
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Profile;