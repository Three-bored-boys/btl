export type Book = {
  title: string | null;
  author: string | null;
  image: string | null;
  description: string | null;
  isbn13: string | null;
  isbn10: string | null;
  publisher: string | null;
  categories: string[];
};

export type BookUI = {
  title: string;
  author: string;
  description: string;
  isbn13: string;
  isbn10: string;
  publisher: string;
};
