import { useState } from 'react';
import { AppSettings } from '../../global/types.ts';

export default function useAppSettings(): AppSettings {
  const [imageCompressionRatio, setImageCompressionRatio] = useState(0.7);

  return {
    imageCompressionRatio: {
      value: imageCompressionRatio,
      setValue: setImageCompressionRatio,
    },
  };
}
