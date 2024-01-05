import { Upload } from '../../../global/types.ts';
import useUpload from '../../../hooks/utils/useUpload.ts';

/**
 * Component which represents an image picker.
 *
 * The user picks which frames to extract from the GIF, which is then subsequently uploaded.
 * @param props A object containing component properties.
 */
function InspectorPickFrames(props: Upload) {
  const {
    dialogIsShown,
    amountOfFramesPicked,
    acceptUploadMultiple,
    selectFrame,
    hideGifDialog,
    selectedDialogFrames,
  } = useUpload(
    props.spriteSheetSequences,
    props.setSpriteSheetSequences,
    props.selectedSequence,
    props.dialogFrames,
    props.setDialogFrames,
    props.dialogIsShown,
    props.setDialogIsShown,
    props.selectedDialogFrames,
    props.setSelectedDialogFrames
  );

  return (
    <>
      <dialog
        id='my_modal_1'
        className='modal backdrop-brightness-50'
        open={dialogIsShown}
        onClose={hideGifDialog}
      >
        <div className='modal-box'>
          <h1 className='text-2xl mb-2'>Select Frames ({amountOfFramesPicked})</h1>
          <div className='grid grid-cols-5 gap-2'>
            {props.dialogFrames.map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Frame ${index}`}
                width={150}
                className={`cursor-pointer rounded bg-base-300 ${
                  selectedDialogFrames.includes(index) ? 'border' : ''
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
            <button className='btn btn-success' onClick={acceptUploadMultiple}>
              Upload
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default InspectorPickFrames;
