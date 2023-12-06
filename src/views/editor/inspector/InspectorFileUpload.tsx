import { AppSettings, EditorData, PickDialogFrames } from '../../../global/types.ts';
import useFileUpload from '../../../hooks/utils/useFileUpload.ts';
import { produce } from 'immer';

/**
 * Represents an image picker.
 *
 * The user picks which frames to extract from the GIF, which is then subsequently uploaded.
 */
function InspectorPickFrames(props: PickDialogFrames) {
  /**
   * Handles logic of selecting frames.
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
            draftDialogFrames.pop();
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
        className='modal'
        open={props.showDialog}
        onClose={() => hideDialog()}
      >
        <div className='modal-box'>
          <h1 className='text-2xl mb-2'> Select Frames </h1>
          <div className='grid grid-cols-5 gap-2'>
            {props.dialogFrames.map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Frame ${index}`}
                width={150}
                className={`border cursor-pointer ${
                  props.selectedDialogFrames.includes(index) ? 'border-primary' : ''
                }`}
                onClick={() => selectFrame(index)}
              />
            ))}
          </div>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
            <button className='btn btn-success' onClick={() => uploadSelectedImages()}>
              {' '}
              Upload
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

type Props = Pick<
  EditorData,
  'spriteSheetSequences' | 'setSpriteSheetSequences' | 'selectedSequence'
> &
  Pick<AppSettings, 'imageCompressionRatio'>;

/**
 * Represent a file upload area.
 *
 * This area can be clicked, or files can be dragged and dropped over it. It's purpose it to upload images (i.e, frames).
 */
function InspectorFileUpload(props: Props) {
  const {
    getRootProps,
    getInputProps,
    setShowDialog,
    setDialogFrames,
    setSelectedDialogFrames,
    placeholder,
    disabled,
    className,
    style,
    addNewFrame,
    showDialog,
    dialogFrames,
    selectedDialogFrames,
  } = useFileUpload(
    props.spriteSheetSequences,
    props.setSpriteSheetSequences,
    props.selectedSequence,
    props.imageCompressionRatio
  );

  return (
    <>
      <div {...getRootProps()} className={className} style={style}>
        <input {...getInputProps()} disabled={disabled} />
        <p>{placeholder}</p>
      </div>
      <InspectorPickFrames
        dialogFrames={dialogFrames}
        setDialogFrames={setDialogFrames}
        selectedDialogFrames={selectedDialogFrames}
        setSelectedDialogFrames={setSelectedDialogFrames}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        selectedSequence={props.selectedSequence}
        spriteSheetSequences={props.spriteSheetSequences}
        callback={addNewFrame}
      />
    </>
  );
}

export default InspectorFileUpload;
