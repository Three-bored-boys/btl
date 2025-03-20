export type OpenLibraryRecords = {
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
    title: string;
    authors: { url: string; name: string }[];
    number_of_pages: number;
  };
};
