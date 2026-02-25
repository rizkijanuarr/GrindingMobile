// Model: response structure dari API /posts

export interface PostResponse {
  success: boolean;
  message: string;
  data: PostPagination;
}

export interface PostPagination {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
