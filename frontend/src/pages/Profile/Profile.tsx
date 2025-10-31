import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import './Profile.css';
import { useState, useEffect } from 'react';
import type { Book } from '../../types/Book';
import type { Review } from '../../types/Review';
import bookService from '../../service/bookService';

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
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

  const handleSelectBook = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bookId = e.target.value;
    const book = books.find((b) => b.id === bookId) || null;
    setSelectedBook(book);
    setMessage("");
  };

  const handlePublish = async () => {
    if (!selectedBook || !reviewText.trim() || score <= 0) {
      setMessage("Por favor seleccioná una puntuación y escribí tu reseña.");
      return;
    }

    const review: Review = {
      content: reviewText.trim(),
      score: score,
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
            <label htmlFor="bookSelect">Seleccioná un libro:</label>
              <select id="bookSelect" name="bookSelect" onChange={handleSelectBook} value={selectedBook?.id || ""}>
            <option value="">-- Elegí un libro --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} – {book.author}
              </option>
            ))}
          </select>

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
      <RightSidebar width="300px" topOffset="80px" fixed={true} className="right-sidebar">
          <div style={{ padding: '8px' }}>
            <h4 style={{ fontSize: '20px', textAlign: 'left', color: '#916f5b'}}>Ajustes</h4>
            <ul className='profileSettingsList'>
              <li><Link to="#">Cambiar color de mi página</Link></li>
              <li><Link to="#">Cambiar icono del perfil</Link></li>
              <li><Link to="#">Cambiar nombre de usuario</Link></li>
              <li><Link to="#">Cambiar constraseña</Link></li>
              <li>
                <button onClick={handleLogout} className="logoutButton" style={{ background: 'transparent', border: 'none', color: 'red', fontWeight: 'bold', cursor: 'pointer' }}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
      </RightSidebar>
    </>
  );
}

export default Profile;