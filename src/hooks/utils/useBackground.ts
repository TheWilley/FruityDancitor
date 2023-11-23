import { useEffect } from 'react';

/**
 * Custom hook to adjust the background image of the app.
 * @param backgroundSrc - URL of the background image.
 * @param darkness - Darkness level (0 to 1).
 */
export default function useBackground(backgroundSrc: string, darkness: number) {
  useEffect(() => {
    const backgroundElement = document.getElementById('customBackground') as HTMLElement;

    // Change background image
    backgroundElement.style.backgroundImage = `url(${backgroundSrc})`;

    // Adjust darkness
    backgroundElement.style.filter = `brightness(${1 - darkness})`;

    // Clean up on unmount
    return () => {
      backgroundElement.style.backgroundImage = '';
      backgroundElement.style.filter = '';
    };
  }, [backgroundSrc, darkness]);
}
