import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useStyle from './useStyle.ts';

/**
 * Custom hook which handles file uploads.
 * @param handleFileUpload The callback function to run.
 * @param disabled Weather inputs are disabled.
 */
export default function useFileUpload(
  handleFileUpload: (file: File) => void,
  disabled: boolean
) {
  const [dragOver, setDragOver] = useState(false);

  /**
   * Runs when a file is uploaded.
   */
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles) {
        // If drag was accepted
        setDragOver(false);

        // Go through all entries
        for (const [, file] of acceptedFiles.entries()) {
          // Don't accept too large images
          if (file.size >= 8000000) continue;

          handleFileUpload(file);
        }
      }
    },
    [handleFileUpload]
  );

  // When hovering over
  const onDragOver = () => {
    setDragOver(true);
  };

  // When leaving
  const onDragLeave = () => {
    setDragOver(false);
  };

  // Create a dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragOver,
    onDragLeave,
  });

  const placeholder = disabled
    ? "Can't upload more than 8 files"
    : isDragActive
      ? 'Drop the files here...'
      : "Drag 'n' drop some files here, or click to select files";

  const [classes, styles] = useStyle(
    'border-2 border-dashed rounded-md w-full mb-2 p-3 bg-base-200 opacity-60',
    undefined,
    [
      {
        condition: disabled,
        result: {
          true: 'cursor-not-allowed',
          false: 'cursor-pointer hover:opacity-100 transition-opacity',
        },
      },
    ],
    [
      {
        cssProperty: 'borderColor',
        condition: dragOver && disabled,
        result: { true: 'darkred' },
      },
      {
        cssProperty: 'borderColor',
        condition: dragOver && !disabled,
        result: { true: 'darkgreen' },
      },
    ]
  );

  return {
    getRootProps,
    getInputProps,
    placeholder,
    classes,
    styles,
  };
}
