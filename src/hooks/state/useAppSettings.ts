import { useState } from 'react';
import { AppSettings } from '../../global/types.ts';

/**
 * Custom hook which returns navbar app-settings.
 */
export default function useAppSettings(): AppSettings {
  const [customBackgroundSrc, setCustomBackgroundSrc] = useState('');
  const [customBackgroundDarkness, setCustomBackgroundDarkness] = useState(0);

  return {
    customBackgroundSrc,
    setCustomBackgroundSrc,
    customBackgroundDarkness,
    setCustomBackgroundDarkness,
  };
}
