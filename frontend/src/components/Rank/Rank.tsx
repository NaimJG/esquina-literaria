import React from 'react';
import type { Book } from '../../types/Book';
import BookCard from '../BookCard/BookCard';

const todosLosLibros: Book[] = [
  { id: 1, titulo: 'El Señor de los Anillos', genero: 'Fantasía', año: 1954, tipo: 'Libro' },
  { id: 2, titulo: 'Naruto Vol. 1', genero: 'Acción', año: 1999, tipo: 'Manga' },
  { id: 3, titulo: 'Cien años de soledad', genero: 'Realismo Mágico', año: 1967, tipo: 'Libro' },
  { id: 4, titulo: 'Attack on Titan Vol. 1', genero: 'Acción', año: 2009, tipo: 'Manga' },
];

function Rank() {

  return (
    <>
      <div className="lista-libros">
        {todosLosLibros.map(libro => (
          <BookCard key={libro.id} libro={libro} />
        ))}
      </div>
    </>
  );
}

export default Rank;