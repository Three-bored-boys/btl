import type { Book, OpenLibraryResponse, OpenLibraryInnerRecords } from "@/shared/types";
import { fetchServiceData } from "@/server/utils";

export class OpenLibraryService {
  async getBookByISBN(isbn: string): Promise<Book[]> {
    try {
      const data = await fetchServiceData<OpenLibraryResponse>(
        `https://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`,
        { next: { revalidate: 172800 } },
      );

      const [recordsObj] = Object.values(data.records);

      return [this.mapBook(recordsObj)];
    } catch (e) {
      console.error("There was an error in the process of getting the Open Library book", JSON.stringify(e));
      return [];
    }
  }

  private mapCategories(records: OpenLibraryInnerRecords): string[] {
    if (records.data.subjects === undefined) {
      return [];
    }
    if (records.data.subjects.length === 0) {
      return [];
    }
    return records.data.subjects.map((obj) => obj.name);
  }

  private mapBook(records: OpenLibraryInnerRecords): Book {
    return {
      title: records.data.title ?? null,
      author: this.mapAuthors(records.data.authors) || null,
      image: records.data.cover?.large ?? records.data.cover?.medium ?? records.data.cover?.small ?? null,
      description: records.details.details.description?.value ?? null,
      isbn13: records.details.details.isbn_13?.[0] ?? null,
      isbn10: records.details.details.isbn_10?.[0] ?? null,
      publisher: records.data.publishers?.[0].name ?? null,
      categories: this.mapCategories(records) ?? [],
    };
  }

  private mapAuthors(authors?: { url: string; name: string }[]) {
    if (!authors) return "";
    return authors.map(({ name }) => name).join("; ");
  }
}
