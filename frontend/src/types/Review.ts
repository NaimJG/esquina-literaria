import type { Book } from "./Book";

export interface Review {
  _id?: string;
  book: Book;
  comment: string;
  score: number;
  scoreDate: Date;
  user: User;
  date?: string;
}

export interface User{
  id: string;
  username: string
}