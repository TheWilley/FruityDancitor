import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import useStyle from './useStyle.ts';

/**
 * Checks if a given text string is a valid URL.
 * @param text The text to test.
 */
function checkIfValidUrl(text: string) {
  // https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
  const urlPattern = /https?:\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%\-/]))?/;
  return urlPattern.test(text);
}

/**
 * Custom hook to handle image uploads via a link.
 * @param handleURLUpload The callback function to run.
 */
export default function useLinkUpload(handleURLUpload: (url: string) => void) {
  const [link, setLink] = useState('');
  const [validURL, setValidURL] = useState(false);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validURL) {
        handleURLUpload(link);
      }
    },
    [handleURLUpload, link, validURL]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    if (checkIfValidUrl(e.target.value)) {
      setValidURL(true);
    } else {
      setValidURL(false);
    }
  }, []);

  const [borderStyling] = useStyle(
    'input input-bordered join-item w-full text-center',
    undefined,
    [
      {
        condition: link !== '' && validURL,
        result: 'input-success',
      },
      {
        condition: link !== '' && !validURL,
        result: 'input-error',
      },
    ]
  );

  const [enterStyling] = useStyle(
    'bg-base-200 join-item p-1 pl-2 pr-2 text-xl align-middle flex items-center',
    undefined,
    [
      {
        condition: link !== '' && validURL,
        result: 'text-success',
      },
      {
        condition: link !== '' && !validURL,
        result: 'text-error',
      },
    ]
  );

  return { link, borderStyling, enterStyling, handleChange, handleSubmit };
}
