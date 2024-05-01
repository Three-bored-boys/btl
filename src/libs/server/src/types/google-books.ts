export type GoogleBooksResponse = {
  kind: string;
  totalItems: number;
  items: Item[];
}

type Item = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
}

type VolumeInfo = {
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

type IndustryIdentifier = {
  type: string;
  identifier: string;
}

type ReadingModes = {
  text: boolean;
  image: boolean;
}

type PanelizationSummary = {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

type ImageLinks = {
  smallThumbnail: string;
  thumbnail: string;
}

type SaleInfo = {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: ListPrice;
  retailPrice?: RetailPrice;
  buyLink?: string;
}

type ListPrice = {
  amount: number;
  currencyCode: string;
}

type RetailPrice = {
  amount: number;
  currencyCode: string;
}

type AccessInfo = {
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

type Epub = {
  isAvailable: boolean;
  acsTokenLink?: string;
}

type Pdf = {
  isAvailable: boolean;
}
