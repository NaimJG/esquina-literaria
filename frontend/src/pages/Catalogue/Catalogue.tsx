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
    const [reviews, setReviews] = useState<Review[]>([]); // Corregido: Tipo y valor inicial

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesData = await categoryService.getAllCategories();
                const categoryNames = categoriesData.map((category: { name: string }) => category.name);
                setCategories(categoryNames);
            } catch (error) {
                console.error("Error al obtener las categorías.", error);
            }
        };
        getCategories();

    }, [])

    useEffect(() => {
        const getGenres = async () => {
            try {
                const genresData = await genreService.getAllGenres();
                const genreNames = genresData.map((genre: { name: string }) => genre.name);
                setGenres(genreNames);
            } catch (error) {
                console.error("Error al obtener los géneros.", error);
            }
        };
        getGenres();

    }, [])

    useEffect(() => {
        const getAuthors = async () => {
            try {
                const authorsData = await authorService.getAllAuthors();
                const authorNames = authorsData.map((author: { name: string }) => author.name);
                setAuthors(authorNames);
            } catch (error) {
                console.error("Error al obtener los géneros.", error);
            }
        };
        getAuthors();

    }, [])

    useEffect(() => {
        const getBooks = async () => {
            try {
                const books = await bookService.getAllBooks();
                setAllBooks(books);
                setFilteredBooks(books);
            } catch (error) {
                console.error("Error al obtener los libros.", error);
            }
        };

        getBooks();
    }, []);

    useEffect(() => {
        let booksToFilter = [...allBooks];

        (Object.keys(filters) as Array<keyof ActiveFilters>).forEach(key => {
            if (filters[key].length > 0) {
                booksToFilter = booksToFilter.filter(book => {
                    const bookValue = book[key as keyof Book];

                    if (bookValue) {
                        return filters[key].includes(bookValue as string);
                    }
                    return false;
                });
            }
        });

        setFilteredBooks(booksToFilter);
    }, [filters, allBooks]);

    const handleFilterChange = (category: keyof ActiveFilters, value: string) => {
        setFilters(prevFilters => {
            const newCategoryFilters = [...prevFilters[category]];
            const currentIndex = newCategoryFilters.indexOf(value);

            if (currentIndex === -1) {
                newCategoryFilters.push(value);
            } else {
                newCategoryFilters.splice(currentIndex, 1);
            }
            return { ...prevFilters, [category]: newCategoryFilters };
        });
    };

    useEffect(() => {
        const getReviews = async () => {
            try {
                const reviewsData = await reviewService.getAllReviews();
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error al obtener las reseñas.", error);
            }
        };
        getReviews();
    }, []);


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