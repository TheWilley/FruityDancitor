import { produce } from 'immer';
import { Dispatch, SetStateAction } from 'react';
import { b64toBlob, getBase64, getImageFromExternalUrl } from '../../utils/imageTools.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { sequenceAddFrame } from '../../redux/spriteSheetSlice.ts';

/**
 * Custom hook which handles file uploads.
 * @param dialogFrames The frames to display in the gif frames picker.
 * @param setDialogFrames Dispatch function to set a new state of `dialogFrames`.
 * @param dialogIsShown Wether the gif frames picker is shown or not.
 * @param setDialogIsShown Dispatch function to set a new state of `dialogIsShown`.
 * @param selectedDialogFrames The selected frames within the gif frames picker.
 * @param setSelectedDialogFrames Dispatch function to set a new state of `selectedDialogFrames`.
 */
export default function useUpload(
  dialogFrames: string[],
  setDialogFrames: Dispatch<SetStateAction<string[]>>,
  dialogIsShown: boolean,
  setDialogIsShown: Dispatch<SetStateAction<boolean>>,
  selectedDialogFrames: number[],
  setSelectedDialogFrames: Dispatch<SetStateAction<number[]>>
) {
  const { spriteSheetSequences, selectedSequence } = useAppSelector(
    (state) => state.spriteSheet
  );
  const dispatch = useAppDispatch();

  const amountOfFramesPicked = `${selectedDialogFrames.length} /
    ${8 - spriteSheetSequences[selectedSequence].sequence.length}`;
  const disabled = spriteSheetSequences[selectedSequence].sequence.length > 7;

  /**
   * Handles file uploads by extracting base64 from the given image or gif and subseqently uploading the resulting data.
   * @param file The image file.
   */
  const handleFileUpload = async (file: File) => {
    // Check if there is space for a new entry
    if (!disabled) {
      // Get base64 for the file
      const base64 = (await getBase64(file)) as string | string[];

      // Check if it is a collection of images or a single one
      if (Array.isArray(base64)) {
        handleUploadMultiple(base64);
      } else {
        addNewFrame(base64);
      }
    }
  };

  /**
   * Handles URL uploads by fetching and extracting base64 from the given image subseqently uploading the resulting data.
   * @param url The URL of the image.
   */
  const handleURLUpload = async (url: string) => {
    try {
      const base64 = await getImageFromExternalUrl(url);

      if (base64 && !disabled) {
        addNewFrame(base64);
        toast.success('Added image from URL');
      }
    } catch (e) {
      toast.error('Could not fetch image from URL');
    }
  };

  /**
   * Handles logic of selecting frames.
   * @param index The frame within the sequence to select.
   */
  const selectFrame = (index: number) => {
    setSelectedDialogFrames(
      produce(selectedDialogFrames, (draftDialogFrames) => {
        const selectedIndex = draftDialogFrames.indexOf(index);
        if (selectedIndex !== -1) {
          // Remove frame
          draftDialogFrames.splice(selectedIndex, 1);
        } else {
          // Makes sure we don't upload too many frames
          if (
            draftDialogFrames.length >=
            8 - spriteSheetSequences[selectedSequence].sequence.length
          ) {
            draftDialogFrames.shift();
          }

          // Push clicked frame
          draftDialogFrames.push(index);
        }
      })
    );
  };

  /**
   * Hides the gif frames dialog.
   */
  const hideGifDialog = () => {
    setDialogIsShown(false);
  };

  /**
   * Shows the gif frames dialog.
   */
  const showGifDialog = () => {
    setDialogIsShown(true);
  };

  /**
   * Adds a new frame to the current sequence.
   * @param base64 The base64 of the image to add.
   */
  const addNewFrame = (base64: string) => {
    b64toBlob(base64).then((result) => {
      // Update the state by appending the image to the first sequence
      dispatch(
        sequenceAddFrame({
          objectURL: URL.createObjectURL(result),
          modifications: { scale: 1, xoffset: 0, yoffset: 0 },
        })
      );
    });
  };

  /**
   * Hanldes uploads of multiple images.
   * @param base64List A list of base64 strings.
   */
  const handleUploadMultiple = (base64List: string[]) => {
    showGifDialog();
    setDialogFrames(base64List.map((item) => item));
    setSelectedDialogFrames(
      Array.from(
        {
          length: 8 - (spriteSheetSequences[selectedSequence]?.sequence.length || 0),
        },
        (_, index) => index
      )
    );
  };

  /**
   * Uploads the selected gif frames.
   */
  const acceptUploadMultiple = () => {
    //Since we don't need to show the dialog anymore, we close it
    hideGifDialog();

    return selectedDialogFrames.map((item) => addNewFrame(dialogFrames[item]));
  };

  return {
    dialogIsShown,
    amountOfFramesPicked,
    handleUploadMultiple,
    selectFrame,
    acceptUploadMultiple,
    setDialogFrames,
    setSelectedDialogFrames,
    hideGifDialog,
    dialogFrames,
    selectedDialogFrames,
    disabled,
    handleFileUpload,
    handleURLUpload,
  };
}
