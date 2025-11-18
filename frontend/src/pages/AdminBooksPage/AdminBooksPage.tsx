import { useState, useEffect, useRef } from "react";
import bookService from "../../service/bookService";
import authorService from "../../service/authorService";
import categoryService from "../../service/categoryService";
import genreService from "../../service/genreService";
import { useAuth } from "../../context/useAuth";
import "./AdminBooksPage.css";
import type { Genre } from "../../types/Genre";
import type { Author } from "../../types/Author";
import type { Category } from "../../types/Category";
import { Link, useNavigate } from "react-router-dom";

export default function AdminBooksPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cover, setCover] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setDate] = useState("");
  const [preview, setPreview] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewBookForm, setShowNewBookForm] = useState(false);
  const [showAuthorSuggestions, setShowAuthorSuggestions] = useState(false);
  const [showGenreSuggestions, setShowGenreSuggestions] = useState(false);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const authorWrapperRef = useRef<HTMLDivElement | null>(null);
  const genreWrapperRef = useRef<HTMLDivElement | null>(null);
  const categoryWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        authorWrapperRef.current &&
        !authorWrapperRef.current.contains(event.target as Node)
      ) {
        setShowAuthorSuggestions(false);
      }

      if (
        genreWrapperRef.current &&
        !genreWrapperRef.current.contains(event.target as Node)
      ) {
        setShowGenreSuggestions(false);
      }

      if (
        categoryWrapperRef.current &&
        !categoryWrapperRef.current.contains(event.target as Node)
      ) {
        setShowCategorySuggestions(false);
      }

    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    Promise.all([
      authorService.getAllAuthors(),
      genreService.getAllGenres(),
      categoryService.getAllCategories(),
    ])
      .then(([author, genre, category]) => {
        setAuthors(author.map((x: Author) => x.name));
        setGenres(genre.map((x: Genre) => x.name));
        setCategories(category.map((x: Category) => x.name));
      })
      .catch((err) => console.error("Error al cargar listas:", err));
  }, []);

  const toggleNewBookForm = () => {
    setShowNewBookForm(!showNewBookForm);
    if (!showNewBookForm) {
      setTitle("");
      setSynopsis("");
      setCover("");
      setAuthor("");
      setGenre("");
      setCategory("");
      setDate("");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !genre.trim() || !category.trim()) {
      setMessage("Por favor, completá todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      await bookService.createBook({
        title: title.trim(),
        synopsis: synopsis.trim(),
        cover: cover.trim(),
        author: author.trim(),
        genre: genre.trim(),
        category: category.trim(),
        publishDate: publishDate.trim(),
      });

      setMessage("✅ Libro agregado con éxito.");
      setTitle("");
      setSynopsis("");
      setCover("");
      setAuthor("");
      setGenre("");
      setCategory("");
      setDate("");
      setPreview("");
    } catch (err) {
      console.error("Error al crear libro:", err);
      setMessage("❌ Ocurrió un error al agregar el libro.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  }


  return (
    <section className="admin-books-container">
        <button onClick={toggleNewBookForm} className="add-book-button">
          {showNewBookForm ? 'Cerrar formulario' : '+ Agregar un nuevo libro'}
        </button>
        {showNewBookForm && (
          <div className="book-form-container"><h2>Panel de administración – Agregar nuevo libro</h2>

            {user?.role !== "admin" && (
                <p style={{ color: "red" }}>No tenés permisos para acceder.</p>
            )}

            <form onSubmit={handleSubmit} className="admin-book-form">
                <label>Título *</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Escribí acá el título del libro..."/>

                <label>Autor *</label>
                <div className="suggestion-wrapper" ref={authorWrapperRef}>
                  <input
                    value={author}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                      setShowAuthorSuggestions(true);
                    }}
                    onFocus={() => setShowAuthorSuggestions(true)}
                    placeholder="Escribí o seleccioná un autor..."
                  />
                  {showAuthorSuggestions && author.trim() && (
                    <ul className="suggestions-list">
                      {authors
                        .filter((a) =>
                          a.toLowerCase().includes(author.toLowerCase())
                        )
                        .slice(0, 8)
                        .map((a) => (
                          <li
                            key={a}
                            onClick={() => {
                              setAuthor(a);
                              setShowAuthorSuggestions(false);
                            }}
                          >
                            {a}
                          </li>
                        ))}
                      {authors.filter((a) =>
                        a.toLowerCase().includes(author.toLowerCase())
                      ).length === 0 && (
                        <li className="no-results">Nuevo autor: {author}</li>
                      )}
                    </ul>
                  )}
                </div>

                <label>Género *</label>
                <div className="suggestion-wrapper" ref={genreWrapperRef}>
                  <input
                    value={genre}
                    onChange={(e) => {
                      setGenre(e.target.value);
                      setShowGenreSuggestions(true);
                    }}
                    onFocus={() => setShowGenreSuggestions(true)}
                    placeholder="Escribí o seleccioná un género..."
                  />
                  {showGenreSuggestions && genre.trim() && (
                    <ul className="suggestions-list">
                      {genres
                        .filter((g) =>
                          g.toLowerCase().includes(genre.toLowerCase())
                        )
                        .slice(0, 8)
                        .map((g) => (
                          <li
                            key={g}
                            onClick={() => {
                              setGenre(g);
                              setShowGenreSuggestions(false);
                            }}
                          >
                            {g}
                          </li>
                        ))}
                      {genres.filter((g) =>
                        g.toLowerCase().includes(genre.toLowerCase())
                      ).length === 0 && (
                        <li className="no-results">Nuevo género: {genre}</li>
                      )}
                    </ul>
                  )}
                </div>

                <label>Categoría *</label>
                <div className="suggestion-wrapper" ref={categoryWrapperRef}>
                  <input
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setShowCategorySuggestions(true);
                    }}
                    onFocus={() => setShowCategorySuggestions(true)}
                    placeholder="Escribí o seleccioná una categoría..."
                  />
                  {showCategorySuggestions && category.trim() && (
                    <ul className="suggestions-list">
                      {categories
                        .filter((c) =>
                          c.toLowerCase().includes(category.toLowerCase())
                        )
                        .slice(0, 8)
                        .map((c) => (
                          <li
                            key={c}
                            onClick={() => {
                              setCategory(c);
                              setShowCategorySuggestions(false);
                            }}
                          >
                            {c}
                          </li>
                        ))}
                      {categories.filter((c) =>
                        c.toLowerCase().includes(category.toLowerCase())
                      ).length === 0 && (
                        <li className="no-results">Nueva categoría: {category}</li>
                      )}
                    </ul>
                  )}
                </div>

                <label>Fecha de publicación *</label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Seleccioná la fecha de publicación..."
                  required
                />

                <label>Portada (URL de la imagen)</label>
                <input
                value={cover}
                onChange={(e) => {
                    setCover(e.target.value);
                    setPreview(e.target.value);
                }}
                placeholder="Copia aquí la URL de la imágen..."
                />
                {preview && (
                <img
                    src={preview}
                    alt="Vista previa"
                    style={{ width: 200, margin: "10px 0" }}
                />
                )}

                <label>Sinopsis</label>
                <textarea
                rows={6}
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                placeholder="Escribí acá la sinópsis del libro..."
                />

                <button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Agregar libro"}
                </button>
            </form>

            {message && <p className="message">{message}</p>}
          </div>
        )}  
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
            <li className='listButton'>
              <button onClick={handleLogout} className="logoutButton">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </aside>
    </section>
  );
}