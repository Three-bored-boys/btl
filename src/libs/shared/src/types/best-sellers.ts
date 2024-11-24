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

export type Book = {
  title: string;
  author: string;
  image: string;
  description: string;
  isbn13: string;
  isbn10: string;
  price: number;
  priceUnit: string;
  publisher: string;
  categories?: string[];
  createdAt: Date;
  updatedAt: Date;
  rank?: number;
  ageGroup?: string;
};
