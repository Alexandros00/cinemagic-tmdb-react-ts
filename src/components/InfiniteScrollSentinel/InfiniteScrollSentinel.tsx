import { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./InfiniteScrollSentinel.module.scss";

const observerMoviesOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0
};

const InfiniteScrollSentinel = ({
  increasePage
}: {
  increasePage: () => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) increasePage();
      });
    },
    [increasePage]
  );

  const observer = useMemo(
    () => new IntersectionObserver(observerCallback, observerMoviesOptions),
    [observerCallback]
  );

  useEffect(() => {
    const infiniteScrollSentinelRef = ref.current;
    if (infiniteScrollSentinelRef) {
      observer.observe(infiniteScrollSentinelRef);
    }
  }, [observer]);

  return <div ref={ref} className={styles.infiniteScrollSentinel} />;
};

export default InfiniteScrollSentinel;
