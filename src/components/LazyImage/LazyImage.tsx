import { JSX, useEffect, useRef, useState } from "react";
import { CustomPlaceholder } from "../CustomPlaceholder";
import { handleNonValidImage } from "../../utils/helpers";
import { observerCardImage } from "../../utils/observer";
import styles from "./LazyImage.module.scss";

interface LazyImageProps {
  src: string;
  alt: string;
  ariaLabel: string;
}
export const LazyImage = ({
  src,
  alt = "",
  ariaLabel = ""
}: Partial<LazyImageProps>): JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const imageElement = imgRef.current;
    if (!imageElement) {
      console.warn("Image ref is null, observer not attaching");
    }
    if (imageElement) {
      imageElement.dataset.src = src;
      observerCardImage.observe(imageElement);
    }
    return (): void => {
      if (imageElement) {
        observerCardImage.unobserve(imageElement);
      }
    };
  }, [src]);

  return (
    <div className="lazy-image-wrapper">
      {!isLoaded && <CustomPlaceholder />}
      <img
        ref={imgRef}
        data-src={src}
        alt={alt}
        aria-label={ariaLabel}
        onError={handleNonValidImage}
        onLoad={() => setIsLoaded(true)}
        className={styles.image}
      />
    </div>
  );
};
