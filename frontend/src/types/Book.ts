export interface Book {
  id: number;
  titulo: string;
  genero: string;
  año: number;
  tipo: string;
}

export interface BookCardProps {
  libro: Book;
}