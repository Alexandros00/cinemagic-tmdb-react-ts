import { useCallback, useEffect, useMemo, useState } from "react";
import { Movie } from "../models/Movie";
import { AxiosError } from "axios";
import { getTMDBService } from "@/services/TMDBService";
import { Params } from "@/models/Params";
import { useParams } from "react-router-dom";

const DEFAULT_PARAMS: Params = {
  page: 1,
  language: "en-US"
};
export const useGetMovieDetails = () => {
  const { id = 0 } = useParams();

  const [movie, setMovie] = useState<Movie | null>();
  const [params, setParams] = useState<Params>(DEFAULT_PARAMS);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => getTMDBService<Movie>(`movie/${id}`), [id]);

  const getMovies = useCallback(
    async (signal: AbortSignal) => {
      try {
        const response = await service.fetchEntities({ signal, params });
        if (response) {
          setMovie(response);
        } else {
          setMovie(null);
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
    if (!id) return;

    const abortController = new AbortController();
    getMovies(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [getMovies, id]);

  return {
    movie,
    params,
    isLoading,
    error
  };
};
