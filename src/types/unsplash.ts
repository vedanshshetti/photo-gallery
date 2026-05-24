export interface UnsplashUser {
  name: string;
  username: string;
  links: {
    html: string;
  };
}

export interface UnsplashUrl {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  description: string | null;
  alt_description: string | null;
  urls: UnsplashUrl;
  user: UnsplashUser;
  links: {
    html: string;
    download: string;
    download_location: string;
  };
}

export interface SearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}