export type TestBook = {
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
  createdAt: string;
  updatedAt: string;
  rank?: number;
  ageGroup?: string;
};

export const book: TestBook = {
  title: "The Invisible Man",
  author: "Len Jenkin, Herbert George Wells",
  image:
    "http://books.google.com/books/content?id=SCHqme8AluYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  description: "No description available",
  isbn13: "9780871299840",
  isbn10: "0871299844",
  price: 0,
  priceUnit: "GBP",
  categories: ["Drama"],
  publisher: "Dramatic Publishing",
  createdAt: "2000-01-01T00:00:00.000Z",
  updatedAt: "2000-01-01T00:00:00.000Z",
};
