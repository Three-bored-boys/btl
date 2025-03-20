import { Book } from "./book";

export type BestSellers = {
  bestSellers: BestSeller[];
};

export type BestSeller = {
  id: number;
  name: string;
  displayName: string;
  image: string;
  books: Book[];
};
