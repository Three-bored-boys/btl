export type OpenLibraryResponse = { records: OpenLibraryRecords; items: OpenLibraryItems };

type OpenLibraryRecords = Record<string, OpenLibraryInnerRecords>;

type OpenLibraryInnerRecords = {
  isbns: string[];
  issns: string[];
  lccns: string[];
  oclcs: string[];
  olids: string[];
  publishDates: string[];
  recordURL: string;
  data: {
    url: string;
    key: string;
    title?: string;
    authors?: { url: string; name: string }[];
    number_of_pages: number;
    identifiers: {
      amazon: string[];
      "amazon.de_asin": string[];
      "amazon.ca_asin": string[];
      goodreads: string[];
      isbn_10?: string[];
      isbn_13?: string[];
      oclc: string[];
      openlibrary: string[];
    };
    publishers?: { name: string }[];
    publish_places: { name: string }[];
    publish_date: string;
    subjects?: { name: string; url: string }[];
    subject_places: { name: string; url: string }[];
    subject_people: { name: string; url: string }[];
    subject_times: { name: string; url: string }[];
    excerpts: { text: string; comment: string }[];
    links: { title: string; url: string }[];
    cover?: { small: string; medium: string; large: string };
  };
  details: {
    bib_key: string;
    info_url: string;
    preview: string;
    preview_url: string;
    thumbnail_url: string;
    details: {
      description?: { type: string; value: string };
      identifiers: { amazon: string[]; "amazon.de_asin": string[]; "amazon.ca_asin": string[]; goodreads: string[] };
      title?: string;
      publish_date: string;
      publishers?: string[];
      contributors: { role: string; name: string }[];
      covers: string[];
      physical_format: string;
      publish_places: string[];
      isbn_13?: string[];
      languages: { key: string }[];
      isbn_10?: string[];
      copyright_date: string;
      oclc_numbers: string[];
      type: { key: string };
      source_records: string[];
      key: string;
      works: { key: string }[];
      number_of_pages: number;
      latest_revision: number;
      revision: number;
      created?: CreatedModifiedType;
      last_modified?: CreatedModifiedType;
    };
  };
};

type OpenLibraryItems = {
  enumcron: boolean;
  match: string;
  status: string;
  fromRecord: string;
  "ol-edition-id": string;
  "ol-work-id": string;
  publishDate: string;
  contributor: string;
  itemURL: string;
  cover: { small: string; medium: string; large: string };
}[];

type CreatedModifiedType = { type: "/type/datetime"; value: Date } | { type: string; value: string };
