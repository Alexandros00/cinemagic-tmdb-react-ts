import { useGetMovieDetails } from "@/hooks/useGetMovieDetails";
import styles from "./MovieDetails.module.scss";

const MovieDetails = () => {
  const { movie, isLoading } = useGetMovieDetails();

  if (isLoading) {
    return <div>Is loading...</div>;
  }
  return (
    <div className={styles.movieDetails}>
      <header>
        <h3>MovieDetails</h3>
      </header>
      {movie?.title}
    </div>
  );
};

export default MovieDetails;
