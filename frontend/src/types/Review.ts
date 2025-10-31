export interface Review {
  _id?: string;
  content: string;
  score: number;
  user: User;
  date?: string;
}

export interface User{
  id: string;
  username: string
}
