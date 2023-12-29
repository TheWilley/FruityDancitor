import { useEffect } from 'react';

/**
 * Prevents user from leaving page based on a condition.
 * @param isDirty Wether a change has been made or not, thus displaying a warning before leaving.
 */
function useOnUnload(isDirty: boolean) {
  useEffect(() => {
    const unloadCallback = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => {
      window.removeEventListener('beforeunload', unloadCallback);
    };
  }, [isDirty]);
}

export default useOnUnload;
