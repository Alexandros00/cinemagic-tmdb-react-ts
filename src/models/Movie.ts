import { Genre } from "./Genre";

export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  genre_ids: number[];
  genres?: Genre[];
  vote_average: number;
  vote_count: number;
  overview: string;
  original_language: string;
  original_title: string;
  backdrop_path: string;
  adult: boolean;
  popularity: number;
  video: boolean;
}
