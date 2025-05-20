import { useCallback, useEffect, useMemo, useState } from "react";
import { Movie } from "../models/Movie";
import { AxiosError } from "axios";
import {
  MoviesResponse,
  MoviesResponseMetadata
} from "../models/MoviesResponse";
import { getTMDBService } from "@/services/TMDBService";
import { Params } from "@/models/Params";

const DEFAULT_PARAMS: Params = {
  page: 1,
  language: "en-US"
};
export const useGetTrendingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [params, setParams] = useState<Params>(DEFAULT_PARAMS);
  const [moviesMetadata, setMoviesMetadata] =
    useState<MoviesResponseMetadata>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(
    () => getTMDBService<MoviesResponse>("movie/now_playing"),
    []
  );

  const getMovies = useCallback(
    async (signal: AbortSignal) => {
      try {
        const response = await service.fetchEntities({ signal, params });
        if (response) {
          const {
            results = [],
            dates = { maximum: "", minimum: "" },
            page = 0,
            total_pages = 0,
            total_results = 0
          } = response;
          setMovies((p) => [...p, ...results]);
          setMoviesMetadata({ dates, page, total_pages, total_results });
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies: ", error);
        setError((error as AxiosError).message);
      }
      setIsLoading(false);
    },
    [service, params]
  );

  useEffect(() => {
    const abortController = new AbortController();
    getMovies(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [getMovies]);

  return {
    movies,
    moviesMetadata,
    params,
    setPage: (page: number) => setParams((p) => ({ ...p, page })),
    isLoading,
    error
  };
};
