import { produce } from 'immer';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SpriteSheetSequences } from '../../global/types.ts';
import { b64toBlob, getBase64 } from '../../utils/imageTools.ts';

/**
 * Custom hook which handles file uploads.
 * @param spriteSheetSequences An array of objects adhering to the strucutre of {@link SpriteSheetSequences}.
 * @param setSpriteSheetSequences Dispatch function to set a new state of `spriteSheetSequences`.
 * @param selectedSequence The currently selected sequence.
 */
export default function useFileUpload(
  spriteSheetSequences: SpriteSheetSequences[],
  setSpriteSheetSequences: Dispatch<SetStateAction<SpriteSheetSequences[]>>,
  selectedSequence: number
) {
  const [dragOver, setDragOver] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogFrames, setDialogFrames] = useState<string[]>([]);
  const [selectedDialogFrames, setSelectedDialogFrames] = useState<number[]>([]);
  const disabled = spriteSheetSequences[selectedSequence].sequence.length > 7;

  // Adds new frame
  const addNewFrame = useCallback(
    (base64: string) => {
      b64toBlob(base64).then((result) => {
        // Update the state by appending the image to the first sequence
        setSpriteSheetSequences((prevSequences) =>
          produce(prevSequences, (draft) => {
            draft[selectedSequence].sequence.push({
              objectURL: URL.createObjectURL(result),
              modifications: { scale: 1, xoffset: 0, yoffset: 0 },
            });
          })
        );
      });
    },
    [selectedSequence, setSpriteSheetSequences]
  );

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
          if (spriteSheetSequences[selectedSequence].sequence.length + index < 8) {
            // Get base64 for the file
            const base64 = (await getBase64(file)) as string | string[];

            // Check if it is a collection of images or a single one
            if (Array.isArray(base64)) {
              setShowDialog(true);
              setDialogFrames(base64.map((item) => item));
              setSelectedDialogFrames(
                Array.from(
                  {
                    length:
                      8 - (spriteSheetSequences[selectedSequence]?.sequence.length || 0),
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
    [addNewFrame, selectedSequence, spriteSheetSequences]
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

  return {
    getRootProps,
    getInputProps,
    setShowDialog,
    setDialogFrames,
    setSelectedDialogFrames,
    placeholder,
    disabled,
    dragOver,
    addNewFrame,
    showDialog,
    dialogFrames,
    selectedDialogFrames,
  };
}
