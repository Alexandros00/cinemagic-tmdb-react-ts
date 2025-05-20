import { memo } from "react";
import { Movie } from "../../models/Movie";
import { LazyImage } from "../LazyImage/LazyImage";
import styles from "./MovieCard.module.scss";

const VoteContainer = ({ vote_average }: { vote_average?: number | null }) => {
  const voteAverageFixed = vote_average
    ? vote_average.toFixed(1) + " / 10"
    : "No rating available";

  return (
    <div className={styles.voteContainer}>
      <span
        className={styles.voteAverage}
        data-testid="vote_average"
        aria-label={`Vote average: ${voteAverageFixed}`}
      >
        {voteAverageFixed}
      </span>
      {vote_average && (
        <meter
          min={0}
          max={10}
          low={4.9}
          high={7.5}
          optimum={10}
          className={styles.voteMeter}
          value={vote_average ? vote_average : 0}
          aria-hidden={true}
        />
      )}
    </div>
  );
};

const MovieCard = ({
  movie,
  genres,
  setSelectedMovie
}: {
  movie: Movie;
  genres: Map<number, string> | undefined;
  setSelectedMovie: (id: number) => void;
}) => {
  const onSelectMovie = () => {
    setSelectedMovie(movie.id);
  };
  return (
    <button className={styles.movieCardButtonContr} onClick={onSelectMovie}>
      <article className={styles.movieCard}>
        <LazyImage
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt={`Movie poster for ${movie.title}`}
        />
        <div className={styles.content}>
          <div className={styles.additionalInfo}>
            <time data-testid="release-year">
              {movie.release_date
                ? new Date(movie.release_date).getFullYear() + ""
                : "No year available"}
            </time>
            <VoteContainer vote_average={movie.vote_average} />
          </div>

          <h3 className={styles.movieCard__title}>{movie.title}</h3>
          <p className={styles.overview}>{movie.overview}</p>
          <div className={styles.genres}>
            {genres &&
              genres?.size > 0 &&
              movie.genre_ids.map((genre, idx) => (
                <span className={styles.genre} key={idx}>
                  {genres?.get(genre)}
                </span>
              ))}
          </div>
        </div>
      </article>
    </button>
  );
};

export default memo(MovieCard);
