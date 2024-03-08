import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useStyle from './useStyle.ts';

/**
 * Custom hook which handles file uploads.
 * @param handleFileUpload The callback function to run.
 * @param disabled Weather inputs are disabled.
 */
export default function useFileUpload(handleFileUpload: (file: File) => void) {
  const [dragOver, setDragOver] = useState(false);

  /**
   * Runs when a file is uploaded.
   */
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles) {
        // If drag was accepted
        setDragOver(false);

        // Removes all but the first occurence of uploaded GIFs
        const gifIndex = acceptedFiles.findIndex(
          (acceptedFile) => acceptedFile.type === 'image/gif'
        );
        if (gifIndex !== -1) {
          acceptedFiles = acceptedFiles.filter(
            (acceptedFile, index) =>
              acceptedFile.type !== 'image/gif' || index === gifIndex
          );
        }

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

  const placeholder = isDragActive
    ? 'Drop the files here...'
    : 'Drag \'n\' drop some files here, or click to select files';

  const [classes, styles] = useStyle(
    'border-2 border-dashed rounded-md w-full mb-2 p-3 bg-base-200 opacity-60 cursor-pointer hover:opacity-100 transition-opacity',
    undefined,
    undefined,
    [
      {
        cssProperty: 'borderColor',
        condition: dragOver,
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
