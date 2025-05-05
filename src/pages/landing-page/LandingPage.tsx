import styles from "./LandingPage.module.scss";
import { useGetTrendingMovies } from "../../hooks/useGetTrendingMovies";
import MovieCard from "@components/MovieCard/MovieCard";
import { useGetAllGenres } from "@/hooks/useGetAllGenres";

const LandingPage = () => {
  const { movies, isLoading, error } = useGetTrendingMovies();
  const { genres } = useGetAllGenres();

  if (isLoading) {
    return (
      <main className={styles.landingPage}>
        <h2>Loading...</h2>
      </main>
    );
  }
  if (error) {
    return (
      <main className={styles.landingPage}>
        <h2>Error: {error}</h2>
      </main>
    );
  }
  if (!movies || movies.length === 0) {
    return <div>No movies found</div>;
  }
  return (
    <main className={styles.landingPage}>
      <header>
        <h2>Trending Movies</h2>
      </header>

      <section className={styles.moviesSection} data-testid="movies-section">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </section>
    </main>
  );
};

export default LandingPage;
