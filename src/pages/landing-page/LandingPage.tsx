import styles from "./LandingPage.module.scss";
import { useGetTrendingMovies } from "../../hooks/useGetTrendingMovies";
import MovieCard from "@components/MovieCard/MovieCard";
import { useGetAllGenres } from "@/hooks/useGetAllGenres";
import InfiniteScrollSentinel from "@/components/InfiniteScrollSentinel/InfiniteScrollSentinel";
import Modal from "@/components/Modal/Modal";
import { useNavigate, useParams } from "react-router-dom";
import MovieDetails from "@/components/MovieDetails/MovieDetails";

const LandingPage = () => {
  const { id = "" } = useParams();

  const { movies, moviesMetadata, params, setPage, isLoading, error } =
    useGetTrendingMovies();

  const { genres } = useGetAllGenres();

  const navigate = useNavigate();

  const selectMovie = (selectedId: number): void => {
    navigate(`/movies/${selectedId}`);
  };

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
          <MovieCard
            key={movie.id}
            movie={movie}
            genres={genres}
            setSelectedMovie={selectMovie}
          />
        ))}
        {moviesMetadata &&
          moviesMetadata?.page < moviesMetadata?.total_pages && (
            <InfiniteScrollSentinel
              increasePage={() => setPage(params?.page + 1)}
            />
          )}
      </section>
      {id && (
        <Modal closeModal={() => navigate("/movies")}>
          <MovieDetails />
        </Modal>
      )}
    </main>
  );
};

export default LandingPage;
