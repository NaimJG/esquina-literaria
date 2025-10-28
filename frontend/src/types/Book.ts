export interface Book {
  id: string;
  title: string;
  synopsis: string;
  genre: string;
  category: string;
  author: string;
  score: number;
  cover: string;
}

export interface BookCardProps {
  libro: Book;
}

export type BookFilter = Pick<Book, 'genre' | 'category' | 'author'>;
