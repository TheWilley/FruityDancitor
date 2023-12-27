import { PickDialogFrames } from '../../../global/types.ts';
import { produce } from 'immer';

/**
 * Component which represents an image picker.
 *
 * The user picks which frames to extract from the GIF, which is then subsequently uploaded.
 * @param props A object containing component properties.
 */
function InspectorPickFrames(props: PickDialogFrames) {
  /**
   * Handles logic of selecting frames.
   * @param index The frame within the sequence to select.
   */
  const selectFrame = (index: number) => {
    props.setSelectedDialogFrames(
      produce(props.selectedDialogFrames, (draftDialogFrames) => {
        const selectedIndex = draftDialogFrames.indexOf(index);
        if (selectedIndex !== -1) {
          // Remove frame
          draftDialogFrames.splice(selectedIndex, 1);
        } else {
          // Makes sure we don't upload too many frames
          if (
            draftDialogFrames.length >=
            8 - props.spriteSheetSequences[props.selectedSequence].sequence.length
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
  const hideDialog = () => {
    props.setShowDialog(false);
  };

  /**
   * Uploads the selected gif frames.
   */
  const uploadSelectedImages = () => {
    //Since we don't need to show the dialog anymore, we close it
    hideDialog();

    return props.selectedDialogFrames.map((item) =>
      props.callback(props.dialogFrames[item])
    );
  };

  return (
    <>
      <dialog
        id='my_modal_1'
        className='modal backdrop-brightness-50'
        open={props.showDialog}
        onClose={() => hideDialog()}
      >
        <div className='modal-box'>
          <h1 className='text-2xl mb-2'>
            Select Frames ({props.selectedDialogFrames.length} /
            {8 - props.spriteSheetSequences[props.selectedSequence].sequence.length})
          </h1>
          <div className='grid grid-cols-5 gap-2'>
            {props.dialogFrames.map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Frame ${index}`}
                width={150}
                className={`cursor-pointer rounded bg-base-300 ${
                  props.selectedDialogFrames.includes(index) ? 'border' : ''
                }`}
                onClick={() => selectFrame(index)}
              />
            ))}
          </div>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                ✕
              </button>
            </form>
            <button className='btn btn-success' onClick={() => uploadSelectedImages()}>
              Upload
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default InspectorPickFrames;