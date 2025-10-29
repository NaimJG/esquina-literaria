import React, { useState, useEffect } from 'react';
import './Catalogue.css';
import BookSidebar from '../../components/BookSidebar/BookSidebar';
import Library from '../../components/Library/Library';
import type { Book, BookFilter } from '../../types/Book';
import bookService from '../../service/bookService';

//Proximamente desde el backend
const filterOptions = {
    genre: ['Terror', 'Aventura', 'Misterio', 'Fantasía Oscura', 'Artes Marciales'],
    author: ['Frank Herbert', 'George Orwell', 'J.R.R. Tolkien', 'Stephen King', 'Kentaro Miura', 'Takehiko Inoue'],
    category: ['Fantasía', 'Manga', 'Juvenil'],
};

type ActiveFilters = {
    [K in keyof BookFilter]: string[];
};

function Catalogue() {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [filters, setFilters] = useState<ActiveFilters>({ genre: [], author: [], category: [] });

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

    return (
        <>
            <section className='catalogueContainer'>
                <aside className='catalogueAside'>
                    Filtrar libros
                    <BookSidebar title="genre" displayName="Género" items={filterOptions.genre} selectedItems={filters.genre} onFilterChange={handleFilterChange} />
                    <BookSidebar title="author" displayName="Autor" items={filterOptions.author} selectedItems={filters.author} onFilterChange={handleFilterChange} />
                    <BookSidebar title="category" displayName="Categoría" items={filterOptions.category} selectedItems={filters.category} onFilterChange={handleFilterChange} />
                </aside>
                <section className='catalogueMain'>
                    <div className='books'>
                    <Library books={filteredBooks} />
                    </div>
                </section>
                <aside className='asideComments'>
                    Comentarios
                </aside>
            </section>
        </>
    )
}

export default Catalogue;