import { useEffect, useState } from 'react';

/**
 * Custom hook which retuns a boolean value based on scroll position.
 */
export default function useHeader() {
  const [showHeader, setShowHeader] = useState(true);
  const [version, setVersion] = useState();

  const handleScroll = () => {
    setShowHeader(window.scrollY <= 75);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    const url = 'https://api.github.com/repos/TheWilley/FruityDancitor/tags';
    fetch(url).then(_ => _.json()).then(tags => {console.log(tags); setVersion(tags[0]['name']);});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { showHeader, version };
}
