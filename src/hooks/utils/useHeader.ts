import { useScrollDirection } from 'react-use-scroll-direction';
import { useEffect, useState } from 'react';

/**
 * Custom hook which retuns a boolean value based on scroll direction.
 */
export default function useHeader() {
  const [showHeader, setShowHeader] = useState(false);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();

  useEffect(() => {
    if (isScrollingDown && showHeader) {
      setShowHeader(false);
    } else if (isScrollingUp && !showHeader) {
      setShowHeader(true);
    }
  }, [isScrollingUp, isScrollingDown, showHeader]);

  return { showHeader };
}
