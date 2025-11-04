import { useState, useEffect } from "react";
import bookService from "../../service/bookService";
import authorService from "../../service/authorService";
import categoryService from "../../service/categoryService";
import genreService from "../../service/genreService";
import { useAuth } from "../../context/useAuth";
import "./AdminBooksPage.css";
import type { Genre } from "../../types/Genre";
import type { Author } from "../../types/Author";
import type { Category } from "../../types/Category";

export default function AdminBooksPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cover, setCover] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewBookForm, setShowNewBookForm] = useState(false);

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
      });

      setMessage("✅ Libro agregado con éxito.");
      setTitle("");
      setSynopsis("");
      setCover("");
      setAuthor("");
      setGenre("");
      setCategory("");
      setPreview("");
    } catch (err) {
      console.error("Error al crear libro:", err);
      setMessage("❌ Ocurrió un error al agregar el libro.");
    } finally {
      setLoading(false);
    }
  };

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
                <input value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Autor *</label>
                <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                list="author-list"
                />
                <datalist id="author-list">
                {authors.map((a) => (
                    <option key={a} value={a} />
                ))}
                </datalist>

                <label>Género *</label>
                <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                list="genre-list"
                />
                <datalist id="genre-list">
                {genres.map((g) => (
                    <option key={g} value={g} />
                ))}
                </datalist>

                <label>Categoría *</label>
                <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                list="category-list"
                />
                <datalist id="category-list">
                {categories.map((c) => (
                    <option key={c} value={c} />
                ))}
                </datalist>

                <label>Portada (URL de la imagen)</label>
                <input
                value={cover}
                onChange={(e) => {
                    setCover(e.target.value);
                    setPreview(e.target.value);
                }}
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
                />

                <button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Agregar libro"}
                </button>
            </form>

            {message && <p className="message">{message}</p>}
          </div>
        )}  
    </section>
  );
}