import { Genre } from "@/models/Genre";
import { getTMDBService } from "@/services/TMDBService";
import { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

const genresToObj = (
  response: { genres: Genre[] } | null
): Map<number, string> => {
  const map = new Map();
  response?.genres?.forEach((genre) => map.set(genre.id, genre.name));
  return map;
};

export const useGetAllGenres = () => {
  const [genres, setGenres] = useState<Map<number, string>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(
    () => getTMDBService<{ genres: Genre[] }>("genre/movie/list"),
    []
  );

  const getGenres = useCallback(
    async (signal: AbortSignal) => {
      try {
        const response = await service.fetchEntities({ signal });
        setGenres(genresToObj(response));
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

    getGenres(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [getGenres]);

  return {
    genres,
    isLoading,
    error
  };
};
