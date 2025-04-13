import { JSX } from "react";
import styles from "./PageLoader.module.scss";

const PageLoader = (): JSX.Element => {
  return (
    <section
      className={styles.PageLoader}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <p>Loading...</p>
      <img
        src="/icons/loading.svg"
        alt="loading"
        aria-hidden="true"
        className={styles.icon}
      />
    </section>
  );
};

export default PageLoader;
