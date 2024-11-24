export type NYTimesBestSellersResponse = {
  status: string;
  copyright: string;
  num_results: number;
  results: Results;
};

type Results = {
  bestsellers_date: string;
  published_date: string;
  lists: List[];
};

type List = {
  list_id: number;
  list_name: string;
  display_name: string;
  updated: string;
  list_image: string;
  books: BookResponse[];
};

type BookResponse = {
  age_group: string;
  amazon_product_url: string;
  article_chapter_link: string;
  author: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  book_review_link: string;
  contributor: string;
  contributor_note: string;
  created_date: string;
  description: string;
  first_chapter_link: string;
  price: string;
  primary_isbn10: string;
  primary_isbn13: string;
  book_uri: string;
  publisher: string;
  rank: number;
  rank_last_week: number;
  sunday_review_link: string;
  title: string;
  updated_date: string;
  weeks_on_list: number;
  buy_links: BuyLink[];
};

export type BuyLink = {
  name: string;
  url: string;
};
