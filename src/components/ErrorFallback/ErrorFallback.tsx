import { JSX } from "react";
import styles from "./ErrorFallback.module.scss";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({
  error,
  resetErrorBoundary
}: FallbackProps): JSX.Element => {
  return (
    <section
      className={styles.ErrorFallback}
      role="alert"
      aria-live="assertive"
    >
      <strong>Something went wrong:</strong>
      <p>{error?.message || "An unknown error occurred."}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </section>
  );
};
