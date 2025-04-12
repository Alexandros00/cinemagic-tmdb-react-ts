import { Movie } from "../../models/Movie";
import { LazyImage } from "../LazyImage";
import styles from "./MovieCard.module.scss";

const VoteContainer = ({ vote_average }: { vote_average?: number | null }) => {
  return (
    <div className={styles.voteContainer}>
      <span className={styles.voteAverage}>
        {vote_average
          ? vote_average.toFixed(1) + " / 10"
          : "No rating available"}
      </span>
      <meter
        min={0}
        max={10}
        low={4.9}
        high={7.5}
        optimum={10}
        className={styles.voteMeter}
        value={vote_average ? vote_average : 0}
        aria-label={`Vote average: ${
          vote_average ? vote_average.toFixed(1) : "No rating available"
        }`}
      />
    </div>
  );
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <article className={styles.movieCard}>
      <LazyImage
        src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
        alt={`Movie poster for ${movie.title}`}
        ariaLabel={`Movie poster for ${movie.title}`}
        styles={styles}
      />
      <div className={styles.content}>
        <div className={styles.additionalInfo}>
          <time>
            {movie.release_date
              ? new Date(movie.release_date).getFullYear() + ""
              : "No year available"}
          </time>
          <VoteContainer vote_average={movie.vote_average} />
        </div>

        <h3 className={styles.movieCard__title}>{movie.title}</h3>
        <p className={styles.overview}>{movie.overview}</p>
        <div className={styles.genres}>
          {movie.genre_ids.map((genre, idx) => (
            <span className={styles.genre} key={idx}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
