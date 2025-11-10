import { useState, useEffect } from 'react';
import './Catalogue.css';
import BookSidebar from '../../components/BookSidebar/BookSidebar';
import Library from '../../components/Library/Library';
import type { Book, BookFilter } from '../../types/Book';
import bookService from '../../service/bookService';
import reviewService from '../../service/reviewService';
import authorService from '../../service/authorService';
import categoryService from '../../service/categoryService';
import genreService from '../../service/genreService';
import { useSearch } from '../../context/SearchContext';
import BookSorter from '../../components/BookSorter/BookSorter';

interface Review {
    _id: string;
    book: Book;
    user: { _id: string, username: string };
    score: number;
    comment: string;
    scoreDate: string;
}

type ActiveFilters = {
    [K in keyof BookFilter]: string[];
};

function Catalogue() {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [filters, setFilters] = useState<ActiveFilters>({ genre: [], author: [], category: [] });
    const [categories, setCategories] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [authors, setAuthors] = useState<string[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [sortOption, setSortOption] = useState<string>("");
    const { searchQuery } = useSearch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [books, authorsData, categoriesData, genresData, reviewsData] =
                await Promise.all([
                    bookService.getAllBooks(),
                    authorService.getAllAuthors(),
                    categoryService.getAllCategories(),
                    genreService.getAllGenres(),
                    reviewService.getAllReviews(),
                ]);

                setAllBooks(books);
                setFilteredBooks(books);
                setAuthors(authorsData.map((author: { name: string }) => author.name));
                setCategories(categoriesData.map((category: { name: string }) => category.name));
                setGenres(genresData.map((genre: { name: string }) => genre.name));
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        fetchData();
    }, []);

    
    // --- Filtrar libros cuando cambian filtros o búsqueda ---
    useEffect(() => {
        let booksToFilter = [...allBooks];

        // --- Filtrar por género, autor y categoría
        (Object.keys(filters) as Array<keyof ActiveFilters>).forEach((key) => {
            const activeValues = filters[key];
            if (activeValues.length > 0) {
                booksToFilter = booksToFilter.filter((book) =>
                    activeValues.includes(book[key] as string)
                );
            }
        });

        // --- Filtrar por búsqueda
        const query = searchQuery.trim().toLowerCase();
        if (query) {
            booksToFilter = booksToFilter.filter(
                (book) =>
                    book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query)
            );
        }

        // --- Ordenar según opción seleccionada
        switch (sortOption) {
            case "mostComments":
                booksToFilter.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            case "leastComments":
                booksToFilter.sort((a, b) => a.reviewCount - b.reviewCount);
                break;
            case "dateAsc":
                booksToFilter.sort(
                    (a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
                );
            break;
            case "dateDesc":
                booksToFilter.sort(
                    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
                );
                break;
            case "highestScore":
                booksToFilter.sort((a, b) => b.score - a.score);
                break;
            case "lowestScore":
                booksToFilter.sort((a, b) => a.score - b.score);
                break;
    }

        setFilteredBooks(booksToFilter);
    }, [filters, allBooks, searchQuery, sortOption]);
    // --- Cambiar filtros ---
    const handleFilterChange = (category: keyof ActiveFilters, value: string) => {
        setFilters((prevFilters) => {
            const newCategoryFilters = [...prevFilters[category]];
            const index = newCategoryFilters.indexOf(value);

            if (index === -1) newCategoryFilters.push(value);
            else newCategoryFilters.splice(index, 1);

            return { ...prevFilters, [category]: newCategoryFilters };
        });
    };

    return (
        <>
            <section className='catalogueContainer'>
                <aside className='catalogueAside'>
                    <h4>Filtrar libros</h4>
                    <BookSidebar title="genre" displayName="Género" items={genres} selectedItems={filters.genre} onFilterChange={handleFilterChange} />
                    <BookSidebar title="author" displayName="Autor" items={authors} selectedItems={filters.author} onFilterChange={handleFilterChange} />
                    <BookSidebar title="category" displayName="Categoría" items={categories} selectedItems={filters.category} onFilterChange={handleFilterChange} />
                    <h4 style={{ marginTop: '10px' }}>Ordenamiento</h4>
                    <BookSorter sortOption={sortOption} onSortChange={setSortOption} />
                </aside>
                <section className='catalogueMain'>
                    <div className='books'>
                        <Library books={filteredBooks} />
                    </div>
                </section>
                <aside className='asideComments'>
                <h4>Últimas Reseñas</h4>
                {reviews.slice(0, 5).map((review) => (
                    <div key={review._id} className="review-item">
                        <p className="review-book"><strong>{review.book.title}</strong></p>
                        <p className="review-comment"><span className="review-text">"{review.comment}"</span> -<em>{review.user.username}</em></p>
                        <p className="review-score">{review.score}★</p>
                    </div>
                    ))
                }
                </aside>
            </section>
        </>
    )
}

export default Catalogue;