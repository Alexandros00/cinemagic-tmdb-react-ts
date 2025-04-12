import styles from "./LandingPage.module.scss";
import { useGetTrendingMovies } from "../../hooks/useGetTrendingMovies";
import MovieCard from "../../components/MovieCard/MovieCard";

const LandingPage = () => {
  const { movies, isLoading, error } = useGetTrendingMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!movies || movies.length === 0) {
    return <div>No movies found</div>;
  }
  return (
    <main className={styles.landingPage}>
      <header>
        <h1 className={styles.title}>Trending Movies</h1>
      </header>

      <section className={styles.moviesSection}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  );
};

export default LandingPage;
