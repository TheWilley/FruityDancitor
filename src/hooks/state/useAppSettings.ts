import { useState } from 'react';
import { AppSettings } from '../../global/types.ts';

/**
 * Custom hook which returns navbar app-settings.
 */
export default function useAppSettings(): AppSettings {
  const [imageCompressionRatio, setImageCompressionRatio] = useState(0.7);
  const [customBackgroundSrc, setCustomBackgroundSrc] = useState('');
  const [customBackgroundDarkness, setCustomBackgroundDarkness] = useState(0);

  return {
    imageCompressionRatio,
    setImageCompressionRatio,
    customBackgroundSrc,
    setCustomBackgroundSrc,
    customBackgroundDarkness,
    setCustomBackgroundDarkness,
  };
}
