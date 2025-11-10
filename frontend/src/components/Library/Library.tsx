import type { Book } from '../../types/Book';
import BookCard from '../BookCard/BookCard';

interface LibraryProps {
  books?: Book[];
}

function Library({ books }: LibraryProps) {
  return (
    <>
      {books?.map(libro => (
        <BookCard key={libro.id} libro={libro} />
      ))}
    </>
  );
}

export default Library;