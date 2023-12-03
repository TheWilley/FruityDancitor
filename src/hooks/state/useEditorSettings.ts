import { useState } from 'react';
import { EditorSettings } from '../../global/types.ts';

/**
 * Custom hook which returns navbar editor-settings.
 */
export default function useEditorSettings(): EditorSettings {
  const [numberOfSequences, setNumberOfSequences] = useState(1);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);

  return {
    height,
    setHeight,
    numberOfSequences,
    setNumberOfSequences,
    width,
    setWidth,
  };
}
