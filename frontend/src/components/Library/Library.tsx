import React from 'react';
import type { Book } from '../../types/Book';
import BookCard from '../BookCard/BookCard';

interface LibraryProps {
  books: Book[];
}

function Library({ books }: LibraryProps) {
  return (
    <div className="lista-libros">
      {books.map(libro => (
        <BookCard key={libro.id} libro={libro} />
      ))}
    </div>
  );
}

export default Library;