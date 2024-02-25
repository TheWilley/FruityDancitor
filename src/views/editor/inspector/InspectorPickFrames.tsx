import useUpload from '../../../hooks/utils/useUpload.ts';

/**
 * Component which represents an image picker.
 *
 * The user picks which frames to extract from the GIF, which is then subsequently uploaded.
 */
function InspectorPickFrames() {
  const {
    dialogIsShown,
    amountOfFramesPicked,
    selectedDialogFrames,
    page,
    frameChunks,
    acceptUploadMultiple,
    selectFrame,
    hideGifDialog,
    nextPage,
    previousPage,
  } = useUpload();

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
            {frameChunks[page].map((frame) => (
              <img
                key={frame.index}
                src={frame.base64}
                alt={`Frame ${frame.index}`}
                width={150}
                className={`cursor-pointer rounded bg-base-300 ${
                  selectedDialogFrames.includes(frame.index)
                    ? 'border border-primary'
                    : ''
                }`}
                onClick={() => selectFrame(frame.index)}
              />
            ))}
          </div>
          {frameChunks.length > 1 && (
            <>
              <div className='mt-4 flex justify-center rounded'>
                <button className='btn' onClick={() => previousPage()}>
                  ←
                </button>
                <span className='mx-2 rounded bg-base-200 p-2 text-xl'>{page}</span>
                <button className='btn' onClick={() => nextPage()}>
                  →
                </button>
              </div>
            </>
          )}
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
                ✕
              </button>
            </form>
            <button className='btn btn-success w-full' onClick={acceptUploadMultiple}>
              Upload
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default InspectorPickFrames;
