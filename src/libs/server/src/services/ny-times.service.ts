import type { NYTimesBestSellersResponse, BestSeller } from "@/shared/types";
import { fetchServiceData } from "@/server/utils";

export class NYTimesService {
  constructor(private apiKey: string) {}

  async getBestSellers(): Promise<BestSeller[]> {
    try {
      const data = await fetchServiceData<NYTimesBestSellersResponse>(
        `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${this.apiKey}`,
      );

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
              price: Number.isNaN(Number(book.price)) ? 0 : Number(book.price),
              priceUnit: "GBP",
              publisher: book.publisher,
              createdAt: new Date(book.created_date),
              updatedAt: new Date(book.updated_date),
              rank: book.rank,
              ageGroup: book.age_group,
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
