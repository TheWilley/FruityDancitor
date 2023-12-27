/**
 * Custom hook which utilizes a keyword to generate anchors consiting of the keyword + a given index.
 * The anchor can also be extracted from the current URL, and return an index based on its value.
 * This is used to navigate to the different app sections when the screen is small by clicking links in the bottom navbar.
 */
export default function useAnchorKeyword() {
  const keyword = 'tab';

  const incorporateKeyword = (index: number, includeAnchor?: boolean) => {
    return `${includeAnchor ? '#' : ''}${keyword}${index}`;
  };

  const getAnchorIndex = () => {
    if (window.location.href.includes(keyword)) {
      const urlParts = window.location.href.split('#');
      return urlParts.length > 1 ? parseInt(urlParts[1].split(keyword)[1]) : 0;
    } else {
      return 0;
    }
  };

  return { incorporateKeyword, getAnchorIndex };
}
