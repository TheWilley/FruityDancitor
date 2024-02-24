import useUpload from '../../../hooks/utils/useUpload.ts';
import { useAppSelector } from '../../../redux/hooks.ts';

/**
 * Component which represents an image picker.
 *
 * The user picks which frames to extract from the GIF, which is then subsequently uploaded.
 */
function InspectorPickFrames() {
  const {
    dialogIsShown,
    amountOfFramesPicked,
    acceptUploadMultiple,
    selectFrame,
    hideGifDialog,
    selectedDialogFrames,
  } = useUpload();
  const dialogFrames = useAppSelector((state) => state.dialog.dialogFrames);

  return (
    <>
      <dialog
        id='my_modal_1'
        className='modal backdrop-brightness-50'
        open={dialogIsShown}
        onClose={hideGifDialog}
      >
        <div className='modal-box'>
          <h1 className='mb-2 text-2xl'>Select Frames ({amountOfFramesPicked})</h1>
          <div className='grid grid-cols-5 gap-2'>
            {dialogFrames.map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Frame ${index}`}
                width={150}
                className={`cursor-pointer rounded bg-base-300 ${
                  selectedDialogFrames.includes(index) ? 'border border-primary' : ''
                }`}
                onClick={() => selectFrame(index)}
              />
            ))}
          </div>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
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
