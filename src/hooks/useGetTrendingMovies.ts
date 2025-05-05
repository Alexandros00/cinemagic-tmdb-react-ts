import { useCallback, useEffect, useMemo, useState } from "react";
import { Movie } from "../models/Movie";
import { AxiosError } from "axios";
import { MoviesResponse } from "../models/MoviesResponse";
import { getTMDBService } from "@/services/TMDBService";

export const useGetTrendingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(
    () => getTMDBService<MoviesResponse>("movie/now_playing"),
    []
  );

  const getMovies = useCallback(
    async (signal: AbortSignal) => {
      try {
        const response = await service.fetchEntities({ signal });
        setMovies(response?.results || []);
      } catch (error) {
        console.error("Error fetching movies: ", error);
        setError((error as AxiosError).message);
      }
      setIsLoading(false);
    },
    [service]
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
    isLoading,
    error
  };
};
