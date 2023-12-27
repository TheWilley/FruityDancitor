import { useEffect, useState } from 'react';

/**
 * Custom hook which retuns a boolean value based on scroll position.
 */
export default function useHeader() {
  const [showHeader, setShowHeader] = useState(true);

  const handleScroll = () => {
    setShowHeader(window.scrollY <= 75);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { showHeader };
}
