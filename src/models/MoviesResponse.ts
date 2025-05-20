import { Movie } from "./Movie";

interface Dates {
  maximum: string;
  minimum: string;
}

export interface MoviesResponse {
  dates: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface MoviesResponseMetadata {
  dates: Dates;
  page: number;
  total_pages: number;
  total_results: number;
}
