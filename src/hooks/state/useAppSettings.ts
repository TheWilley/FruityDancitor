import { useState } from 'react';
import { AppSettings } from '../../global/types.ts';

/**
 * Custom hook which returns navbar app-settings.
 */
export default function useAppSettings(): AppSettings {
  const [useImageCompression, setUseImageCompression] = useState(false);
  const [customBackgroundSrc, setCustomBackgroundSrc] = useState('');
  const [customBackgroundDarkness, setCustomBackgroundDarkness] = useState(0);

  return {
    useImageCompression,
    setUseImageCompression,
    customBackgroundSrc,
    setCustomBackgroundSrc,
    customBackgroundDarkness,
    setCustomBackgroundDarkness,
  };
}
