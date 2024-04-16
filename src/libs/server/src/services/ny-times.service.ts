import type { Book, NYTimesBestSellersResponse } from "../types";

export class NYTimesService {
  constructor(private apiKey: string) {}

  async getBestSellers() {
    const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${this.apiKey}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = (await response.json()) as NYTimesBestSellersResponse;
    const bestSellers = data.results.lists.map((list) => {
      return {
        id: list.list_id,
        name: list.list_name,
        displayName: list.display_name,
        image: list.list_image,
        books: list.books.map((book) => {
          return {
            title: book.title,
            author: book.author,
            image: book.book_image,
            description: book.description,
            isbn13: book.primary_isbn13,
            isbn10: book.primary_isbn10,
            price: Number(book.price) || 0,
            publisher: book.publisher,
            createdAt: new Date(book.created_date),
            updatedAt: new Date(book.updated_date),
            rank: book.rank,
            ageGroup: book.age_group,
            categories: []
          };
        }) satisfies Book[]
      };
    });

    return bestSellers;
  }
}
