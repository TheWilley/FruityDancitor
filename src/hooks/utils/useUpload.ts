import { b64toBlob, getBase64, getImageFromExternalUrl } from '../../utils/imageTools.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { sequenceAddFrame } from '../../redux/spriteSheetSlice.ts';
import {
  adjustSelectedDialogFrame,
  dialogFramesUpdate,
  dialogIsShownToggle,
  resetSelectedDialogFrames,
} from '../../redux/dialogSlice.ts';

/**
 * Custom hook which handles file uploads.
 */
export default function useUpload() {
  const { spriteSheetSequences, selectedSequence } = useAppSelector(
    (state) => state.spriteSheet
  );
  const { selectedDialogFrames, dialogIsShown, dialogFrames } = useAppSelector(
    (state) => state.dialog
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
    dispatch(
      adjustSelectedDialogFrame({
        index,
        cap: 8 - spriteSheetSequences[selectedSequence].sequence.length,
      })
    );
  };

  /**
   * Hides the gif frames dialog.
   */
  const hideGifDialog = () => {
    dispatch(dialogIsShownToggle());
  };

  /**
   * Shows the gif frames dialog.
   */
  const showGifDialog = () => {
    dispatch(dialogIsShownToggle());
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
    dispatch(dialogFramesUpdate(base64List));
    dispatch(
      resetSelectedDialogFrames(
        8 - spriteSheetSequences[selectedSequence]?.sequence.length
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
    hideGifDialog,
    dialogFrames,
    selectedDialogFrames,
    disabled,
    handleFileUpload,
    handleURLUpload,
  };
}
