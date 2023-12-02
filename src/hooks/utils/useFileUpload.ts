import { produce } from 'immer';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SpriteSheetFrame } from '../../global/types.ts';
import { b64toBlob, getBase64 } from '../../utils/imageTools.ts';

/**
 * Custom hooks which handles file uploads.
 *
 * This includes:
 * - Drag and drop detection and logic
 * - File upload logic
 * - etc.
 */
export default function useFileUpload(
  spriteSheetFrames: SpriteSheetFrame[],
  setSpriteSheetFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>,
  selectedSequence: number,
  compressionRatio: number
) {
  const [dragOver, setDragOver] = useState(false);
  const disabled = spriteSheetFrames[selectedSequence].sequence.length > 7;
  const [showDialog, setShowDialog] = useState(false);
  const [dialogFrames, setDialogFrames] = useState<string[]>([]);
  const [selectedDialogFrames, setSelectedDialogFrames] = useState<number[]>([]);

  // Adds new frame
  const addNewFrame = (base64: string) => {
    b64toBlob(base64).then((result) => {
      // Update the state by appending the image to the first sequence
      setSpriteSheetFrames((prevFrames) =>
        produce(prevFrames, (draft) => {
          draft[selectedSequence].sequence.push({
            objectURL: URL.createObjectURL(result),
            modifications: { scale: 1, xoffset: 0, yoffset: 0 },
          });
        })
      );
    });
  };

  /**
   * Runs when a file is uploaded.
   */
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles) {
        // If drag was accepted
        setDragOver(false);

        // Go through all entries
        for (const [index, file] of acceptedFiles.entries()) {
          // Don't accept too large images
          if (file.size >= 8000000) continue;

          // Check if there is space for a new entry
          if (spriteSheetFrames[selectedSequence].sequence.length + index < 8) {
            // Get base64 for the file
            const base64 = (await getBase64(file, compressionRatio)) as string | string[];

            // Check if it is a collection of images or a single one
            if (Array.isArray(base64)) {
              setShowDialog(true);
              setDialogFrames(base64.map((item) => item));
              setSelectedDialogFrames(
                Array.from(
                  {
                    length:
                      8 - (spriteSheetFrames[selectedSequence]?.sequence.length || 0),
                  },
                  (_, index) => index
                )
              );
            } else {
              addNewFrame(base64);
            }
          }
        }
      }
    },
    [spriteSheetFrames]
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

  // Create a dynamic class to use below
  const className = [
    'border-2',
    'border-dashed',
    'rounded-md',
    'w-full',
    'mb-2',
    'p-3',
    'bg-base-200',
    'opacity-60',
    disabled
      ? 'cursor-not-allowed'
      : 'cursor-pointer hover:opacity-100 transition-opacity',
  ].join(' ');

  const style = {
    borderColor: dragOver ? (disabled ? 'darkred' : 'darkgreen') : '',
  };

  const placeholder = disabled
    ? "Can't upload more than 8 files"
    : isDragActive
      ? 'Drop the files here...'
      : "Drag 'n' drop some files here, or click to select files";

  return [
    getRootProps(),
    getInputProps(),
    placeholder,
    disabled,
    className,
    style,
    addNewFrame,
    { value: showDialog, setValue: setShowDialog },
    { value: dialogFrames, setValue: setDialogFrames },
    { value: selectedDialogFrames, setValue: setSelectedDialogFrames },
  ] as const;
}
