import { useEffect } from 'react';

/**
 * Custom hook to adjust the background image of the app.
 * @param backgroundSrc An image URL.
 * @param darkness How much to darken the image (0 = brighter, 1 = darker).
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
