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
