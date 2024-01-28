import { useRef } from 'react';

/**
 * Custom hook which handles states for refs
 */
export default function useRefs() {
  const viewport = useRef<HTMLCanvasElement>(null);
  const fileUpload = useRef<HTMLInputElement>(null);

  return { viewport, fileUpload };
}
