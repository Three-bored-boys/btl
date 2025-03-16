import type { Book, GoogleBooksResponse } from "@/shared/types";
import type { SearchObjectType, PaginationObjectType } from "@/shared/validators";
import { DEFAULT_MAX_RESULTS, DEFAULT_PAGE_NUMBER } from "@/shared/utils";
import { fetchServiceData } from "@/server/utils";

type Item = GoogleBooksResponse["items"][number];

export class GoogleBooksService {
  constructor(private apiKey: string) {}

  private async fetchBooks(url: string): Promise<{ books: Book[]; totalItems: number }> {
    try {
      console.log(url);
      const data = await fetchServiceData<GoogleBooksResponse>(url);
      return { books: data.items.map((item) => this.mapBook(item)), totalItems: data.totalItems };
    } catch (error) {
      console.error("Problem getting books:", JSON.stringify(error, null, 2));
      return { books: [], totalItems: 0 };
    }
  }

  private mapBook(item: Item): Book {
    return {
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(", ") ?? "Unknown Author",
      image: item.volumeInfo.imageLinks?.thumbnail ?? "",
      description: item.volumeInfo.description ?? "No description available",
      isbn13: this.findIdentifier(item, "ISBN_13"),
      isbn10: this.findIdentifier(item, "ISBN_10"),
      price: item.saleInfo.retailPrice?.amount ?? item.saleInfo.listPrice?.amount ?? 0,
      priceUnit: item.saleInfo.retailPrice?.currencyCode ?? "GBP",
      categories: item.volumeInfo.categories ?? [],
      publisher: item.volumeInfo.publisher ?? "N/A",
      createdAt: new Date(item.volumeInfo.publishedDate),
      updatedAt: new Date(item.volumeInfo.publishedDate),
    };
  }

  private findIdentifier(item: Item, type: string): string {
    const identifier = item.volumeInfo.industryIdentifiers?.find((id) => id.type === type);
    return identifier?.identifier ?? "";
  }

  async getLatestBooks(): Promise<Book[]> {
    // use most common letter in the English language as a search term to satisfy the API
    const url = `https://www.googleapis.com/books/v1/volumes?q=e&key=${this.apiKey}&maxResults=5&startIndex=0&orderBy=newest`;
    const latestBooks = (await this.fetchBooks(url)).books;
    return latestBooks;
  }

  async getBookByISBN(isbn: string): Promise<Book[]> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${this.apiKey}`;
    const books = (await this.fetchBooks(url)).books;
    const book = books.find((book) => book.isbn13 === isbn || book.isbn10 === isbn);

    if (books.length === 0 || !book) {
      return [];
    }

    return [book];
  }

  async getBooksByAllParameters({
    searchObject: { search, genre, publisher, isbn },
    paginationObject: { maxResults = DEFAULT_MAX_RESULTS.toString(), page = DEFAULT_PAGE_NUMBER.toString() },
  }: {
    searchObject: SearchObjectType;
    paginationObject: PaginationObjectType;
  }): Promise<{ books: Book[]; totalItems: number }> {
    const searchUrl = search ?? "";
    const genreUrl = genre !== undefined ? `+subject:${genre}` : "";
    const publisherUrl = publisher !== undefined ? `+inpublisher:${publisher}` : "";
    const isbnUrl = isbn !== undefined ? `+isbn:${isbn}` : "";
    const startIndexNumber = (parseInt(page, 10) - 1) * parseInt(maxResults, 10);
    let startIndex: string;

    if (!Number.isNaN(startIndexNumber)) {
      startIndex = startIndexNumber.toString();
    } else {
      startIndex = "0";
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchUrl + genreUrl + publisherUrl + isbnUrl}&maxResults=${maxResults}&orderBy=relevance&startIndex=${startIndex}&key=${this.apiKey}`;

    const books = await this.fetchBooks(url);

    return books;
  }
}
