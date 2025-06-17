import { SyntheticEvent } from "react";

/**
 * Function to handle the error when an image is not valid and show a placeholder image.
 * @param event The event that triggered the error.
 * @param imagePath The path to the image to be displayed in case of an error.
 * @returns Void.
 */
export function handleNonValidImage(
  event: SyntheticEvent<HTMLImageElement>,
  imagePath = "default_placeholder.png"
): void {
  const target = event.target as HTMLImageElement;
  target.onerror = null;
  target.src = imagePath;
}

/**
 * Debounce function to limit the number of times a function is called.
 * @param callbackFn The function to be called after the delay.
 * @param delay The delay in milliseconds.
 * @returns A function that will call the callbackFn after the delay.
 */
export function debounce<T extends unknown[]>(
  callbackFn: (...args: T) => void,
  delay = 500
) {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = (...rest: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFn(...rest);
    }, delay);
  };

  debounced.cancel = () => clearTimeout(timer);

  return debounced;
}
