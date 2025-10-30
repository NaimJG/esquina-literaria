export interface Book {
  id: string;
  title: string;
  synopsis: string;
  genre: string;
  category: string;
  author: string;
  score: number;
  cover: string;
  reviews: Review[];
}

export interface Review{
  _id: string;
  score: number;
  comment: string;
  user: User;
  scoreDate: Date;
}

export interface User{
  id: string;
  username: string
}

export interface BookCardProps {
  libro: Book;
}

export type BookFilter = Pick<Book, 'genre' | 'category' | 'author'>;
