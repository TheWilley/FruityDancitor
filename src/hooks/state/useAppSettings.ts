import { useState } from 'react';
import { AppSettings } from '../../global/types.ts';

/**
 * Custom hook which orchestrates user-modifiable application settings.
 * It specifically handles aspects of the application not directly tied to the editor functionality.
 */
export default function useAppSettings(): AppSettings {
  const [customBackgroundSrc, setCustomBackgroundSrc] = useState('');
  const [customBackgroundDarkness, setCustomBackgroundDarkness] = useState(0);
  const [previewFps, setPreviewFps] = useState(1);

  return {
    customBackgroundSrc,
    setCustomBackgroundSrc,
    customBackgroundDarkness,
    setCustomBackgroundDarkness,
    previewFps,
    setPreviewFps,
  };
}
