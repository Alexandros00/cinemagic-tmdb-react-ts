const observerCardImageOptions = {
  root: null,
  rootMargin: "100px",
  threshold: 0
};
function lazyLoadImage(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
): void {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const image = entry.target as HTMLImageElement;

      if (!image.src) {
        if (image.dataset.src) {
          image.src = image.dataset.src;
        } else {
          image.src = "default_placeholder.png";
        }
      }
      observer.unobserve(image);
    }
  });
}

export const observerCardImage = new IntersectionObserver(
  lazyLoadImage,
  observerCardImageOptions
);
