import type { Book, GoogleBooksResponse, SearchObjectType } from "../types";

type Item = GoogleBooksResponse["items"][number];

export class GoogleBooksService {
  constructor(private apiKey: string) {}

  private async fetchBooks(url: string): Promise<Book[]> {
    try {
      const response = await fetch(url);
      console.log(response.ok, response.status, response.statusText);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = (await response.json()) as GoogleBooksResponse;
      return data.items.map((item) => this.mapBook(item));
    } catch (error) {
      console.error("Problem getting books:", JSON.stringify(error, null, 2));
      return [];
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
    const books = await this.fetchBooks(url);
    return books;
  }

  async getBookByISBN(isbn: string): Promise<Book[]> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${this.apiKey}`;
    const books = await this.fetchBooks(url);
    return books.length > 0 ? books : [];
  }

  async getBooksByAllParameters(
    { search, title, author, genre, publisher, isbn }: SearchObjectType,
    maxResults = 40,
  ): Promise<Book[]> {
    const searchUrl = search ?? "";
    const titleUrl = title !== undefined ? `+intitle:${title}` : "";
    const authorUrl = author !== undefined ? `+inauthor:${author}` : "";
    const genreUrl = genre !== undefined ? `+subject:${genre}` : "";
    const publisherUrl = publisher !== undefined ? `+inpublisher:${publisher}` : "";
    const isbnUrl = isbn !== undefined ? `+isbn:${isbn}` : "";

    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchUrl + titleUrl + authorUrl + genreUrl + publisherUrl + isbnUrl}&maxResults=${maxResults.toString()}&orderBy=relevance&startIndex=0&key=${this.apiKey}`;
    console.log(url);
    const books = await this.fetchBooks(url);
    return books;
  }
}
