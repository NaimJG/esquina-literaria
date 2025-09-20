import React, { useState, useEffect } from 'react';
import type { Book } from '../../types/Book';
import BookCard from '../BookCard/BookCard';

const todosLosLibros: Book[] = [
  { id: 1, titulo: 'El Señor de los Anillos', genero: 'Fantasía', año: 1954, tipo: 'Libro' },
  { id: 2, titulo: 'Naruto Vol. 1', genero: 'Acción', año: 1999, tipo: 'Manga' },
  { id: 3, titulo: 'Cien años de soledad', genero: 'Realismo Mágico', año: 1967, tipo: 'Libro' },
  { id: 4, titulo: 'Attack on Titan Vol. 1', genero: 'Acción', año: 2009, tipo: 'Manga' },
];

function Library() {
  const [librosFiltrados, setLibrosFiltrados] = useState(todosLosLibros);
  const [filtros, setFiltros] = useState({
    genero: 'todos',
    tipo: 'todos',
  });

  const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  useEffect(() => {
    let librosResultado = todosLosLibros;

    if (filtros.genero !== 'todos') {
      librosResultado = librosResultado.filter(libro => libro.genero === filtros.genero);
    }

    if (filtros.tipo !== 'todos') {
      librosResultado = librosResultado.filter(libro => libro.tipo === filtros.tipo);
    }

    setLibrosFiltrados(librosResultado);
  }, [filtros]);

  return (
    <div>
      <div className="filtros">
        <select name="genero" onChange={handleFiltroChange}>
          <option value="todos">Todos los géneros</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Acción">Acción</option>
          <option value="Realismo Mágico">Realismo Mágico</option>
        </select>

        <select name="tipo" onChange={handleFiltroChange}>
          <option value="todos">Todos los tipos</option>
          <option value="Libro">Libro</option>
          <option value="Manga">Manga</option>
        </select>
      </div>

      <div className="lista-libros">
        {librosFiltrados.map(libro => (
          <BookCard key={libro.id} libro={libro} />
        ))}
      </div>
    </div>
  );
}

export default Library;