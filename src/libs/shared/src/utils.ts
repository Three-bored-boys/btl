import { Book, BookUI } from "./types";
import { SearchObjectType } from "./validators";

export const BTL_LOCAL_STORAGE_SEARCH_OBJECT = "btlSearchObject";
export const BTL_LOCAL_STORAGE_COLLECTION_SIDEBAR = "btlCollectionSidebar";

export const filterKeysArray: (keyof SearchObjectType)[] = ["genre", "publisher"];

export const DEFAULT_MAX_RESULTS = 20;
export const MIN_MAX_RESULTS = 16;
export const MAX_MAX_RESULTS = 40;
export const DEFAULT_PAGE_NUMBER = 1;

export const bookLibraries = [
  { name: "Currently Reading", value: "currently-reading" },
  { name: "Want To Read", value: "want-to-read" },
  { name: "Finished", value: "finished" },
  { name: "Did Not Finish", value: "did-not-finish" },
];

export const bookLibraryValues = ["currently-reading", "want-to-read", "finished", "did-not-finish"] as const;

export const BTL_AUTH_SESSION_COOKIE_NAME = "btl_auth_session";

export const NOT_FOUND_IMAGE_ALT = "Cartoon image of man sitting on floor and reading a book";
export const HERO_SECTION_IMAGE_ALT =
  "Cartoon image of various people sitting and standing on and around a stack of books, each reading a book";
export const GENERIC_BOOK_IMAGE_ALT = "Generic Book Cover";

export const imageWH = {
  width: 500,
  height: 500,
};

const unknownBookTitle = "Unknown title";
const unknownBookAuthor = "Unknown author";
const unknownBookDescription = "No description";
const unknownBookISBN13 = "N/A";
const unknownBookISBN10 = "N/A";
const unknownBookPublisher = "N/A";

export const getUIForBook = function (book: Book): BookUI {
  const title = book.title ?? unknownBookTitle;
  const author = book.author ?? unknownBookAuthor;
  const description = book.description ?? unknownBookDescription;
  const isbn13 = book.isbn13 ?? unknownBookISBN13;
  const isbn10 = book.isbn10 ?? unknownBookISBN10;
  const publisher = book.publisher ?? unknownBookPublisher;

  return { title, author, description, isbn10, isbn13, publisher };
};

export const getBookCoverImageAltFromBook = function (book: Book): string {
  if (!book.image) return GENERIC_BOOK_IMAGE_ALT;
  if (book.title && book.author && book.image) return `Book cover for ${book.title} by ${book.author}`;
  if (!book.title && book.author && book.image) return `Book cover for unknown book title by ${book.author}`;
  if (book.title && !book.author && book.image) return `Book cover for book title '${book.title}'`;
  return "Book cover for unknown book by unknown title";
};

export const getBookCoverLinkHrefFromBook = function (book: Book) {
  if (book.isbn13 !== null) return `/book/${book.isbn13}`;
  if (book.isbn10 !== null) return `/book/${book.isbn10}`;
  return "/";
};

export const bookFormNames: BookUI & { image: string; categories: string } = {
  author: "bookAuthor",
  title: "bookTitle",
  description: "bookDescription",
  publisher: "bookPublisher",
  image: "bookImage",
  isbn10: "bookIsbn10",
  isbn13: "bookIsbn13",
  categories: "bookCategories",
};
