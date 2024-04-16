export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items: Item[];
}

interface Item {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
}

interface VolumeInfo {
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  averageRating?: number;
  ratingsCount?: number;
}

interface IndustryIdentifier {
  type: string;
  identifier: string;
}

interface ReadingModes {
  text: boolean;
  image: boolean;
}

interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: ListPrice;
  retailPrice?: RetailPrice;
  buyLink?: string;
}

interface ListPrice {
  amount: number;
  currencyCode: string;
}

interface RetailPrice {
  amount: number;
  currencyCode: string;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

interface Epub {
  isAvailable: boolean;
  acsTokenLink?: string;
}

interface Pdf {
  isAvailable: boolean;
}
