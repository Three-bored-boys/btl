import type { NYTimesBestSellersResponse, BestSeller } from "@/shared/types";
import { fetchServiceData } from "@/server/utils";

export class NYTimesService {
  constructor(private apiKey: string) {}

  async getBestSellers(): Promise<BestSeller[]> {
    try {
      const data = await fetchServiceData<NYTimesBestSellersResponse>(
        `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${this.apiKey}`,
        { next: { revalidate: 604800 } },
      );

      const bestSellers = data.results.lists.map((list) => {
        return {
          id: list.list_id,
          name: list.list_name,
          displayName: list.display_name,
          image: list.list_image,
          books: list.books.map((book) => {
            return {
              title: book.title || null,
              author: book.author || null,
              image: book.book_image || null,
              description: book.description || null,
              isbn13: book.primary_isbn13 || null,
              isbn10: book.primary_isbn10 || null,
              publisher: book.publisher || null,
              categories: [],
            };
          }),
        };
      });

      return bestSellers;
    } catch (error) {
      console.error("Error fetching NYT Best Sellers:", JSON.stringify(error, null, 2));
      return [];
    }
  }
}
