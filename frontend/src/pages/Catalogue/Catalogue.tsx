import React, { useState, useEffect } from 'react';
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

        // Filtrar por género, autor y categoría
        (Object.keys(filters) as Array<keyof ActiveFilters>).forEach((key) => {
            const activeValues = filters[key];
            if (activeValues.length > 0) {
                booksToFilter = booksToFilter.filter((book) =>
                activeValues.includes(book[key] as string)
                );
            }
        });

        // Filtrar por texto de búsqueda
        const query = searchQuery.trim().toLowerCase();
        if (query) {
            booksToFilter = booksToFilter.filter(
                (book) =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
            );
        }

        setFilteredBooks(booksToFilter);
    }, [filters, allBooks, searchQuery]);

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
                    Filtrar libros
                    <BookSidebar title="genre" displayName="Género" items={genres} selectedItems={filters.genre} onFilterChange={handleFilterChange} />
                    <BookSidebar title="author" displayName="Autor" items={authors} selectedItems={filters.author} onFilterChange={handleFilterChange} />
                    <BookSidebar title="category" displayName="Categoría" items={categories} selectedItems={filters.category} onFilterChange={handleFilterChange} />
                </aside>
                <section className='catalogueMain'>
                    <div className='books'>
                        <Library books={filteredBooks} />
                    </div>
                </section>
                <aside className='asideComments'>
                    <h4>Últimas Reseñas</h4>
                    {reviews.map(review => (
                        <div key={review._id} className="review-item">
                            <p>"{review.comment}" ({review.score}★)</p>
                        </div>
                    ))}
                </aside>
            </section>
        </>
    )
}

export default Catalogue;