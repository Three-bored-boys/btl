import type { Book, OpenLibraryResponse, OpenLibraryInnerRecords, CreatedOrLastModifiedType } from "@/shared/types";
import { fetchServiceData } from "@/server/utils";

export class OpenLibraryService {
  async getBookByISBN(isbn: string): Promise<Book[]> {
    try {
      const data = await fetchServiceData<OpenLibraryResponse>(
        `https://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`,
      );

      const [recordsObj] = Object.values(data.records);

      return [this.mapBook(recordsObj)];
    } catch (e) {
      console.error("There was an error in the process of getting the Open Library book", JSON.stringify(e));
      return [];
    }
  }

  private mapBook(records: OpenLibraryInnerRecords): Book {
    return {
      title: records.data.title ?? "Unknown Title",
      author: this.mapAuthors(records.data.authors) || "Unknown Authors",
      image: records.data.cover?.large ?? records.data.cover?.medium ?? records.data.cover?.small ?? "",
      description: records.details.details.description?.value ?? "No description",
      isbn13: records.details.details.isbn_13?.[0] ?? "N/A",
      isbn10: records.details.details.isbn_10?.[0] ?? "N/A",
      price: 0,
      priceUnit: "GBP",
      publisher: records.data.publishers?.[0].name ?? "N/A",
      categories: [records.data.subjects?.[0].name ?? ""],
      createdAt: this.mapDate(records.details.details.created),
      updatedAt: this.mapDate(records.details.details.last_modified),
    };
  }

  private mapAuthors(authors?: { url: string; name: string }[]) {
    if (!authors) return "";
    return authors.map(({ name }) => name).join("; ");
  }

  private mapDate(obj?: CreatedOrLastModifiedType) {
    if (!obj) return new Date();
    return obj.type === "/type/datetime" && obj.value instanceof Date ? obj.value : new Date(obj.value);
  }
}
