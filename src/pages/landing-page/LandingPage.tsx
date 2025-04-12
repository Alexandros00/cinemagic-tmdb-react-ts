import styles from "./LandingPage.module.scss";
import { useGetTrendingMovies } from "../../hooks/useGetTrendingMovies";

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

      {movies.map((movie) => (
        <article>{movie.title}</article>
      ))}
    </main>
  );
};

export default LandingPage;
