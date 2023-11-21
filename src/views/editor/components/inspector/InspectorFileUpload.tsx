import { AppSettings, EditorData, StateWithSetter } from '../../../../global/types';
import useFileUpload from '../../../../hooks/utils/useFileUpload.ts';
import { produce } from 'immer';

type PickDialogFrames = {
  showDialog: StateWithSetter<boolean>;
  dialogFrames: StateWithSetter<string[]>;
  selectedDialogFrames: StateWithSetter<number[]>;
  callback: (base64: string) => void;
} & Pick<EditorData, 'spriteSheetFrames' | 'selectedSequence'>;

function InspectorPickFrames(props: PickDialogFrames) {
  const selectFrame = (index: number) => {
    props.selectedDialogFrames.setValue(
      produce(props.selectedDialogFrames.value, (draftDialogFrames) => {
        const selectedIndex = draftDialogFrames.indexOf(index);
        if (selectedIndex !== -1) {
          // Remove frame
          draftDialogFrames.splice(selectedIndex, 1);
        } else {
          // Makes sure we don't upload too many frames
          if (
            draftDialogFrames.length >=
            8 -
              props.spriteSheetFrames.value[props.selectedSequence.value].sequence.length
          ) {
            draftDialogFrames.pop();
          }

          // Push clicked frame
          draftDialogFrames.push(index);
        }
      })
    );
  };

  return (
    <>
      <dialog
        id='my_modal_1'
        className='modal'
        open={props.showDialog.value}
        onClose={() => props.showDialog.setValue(false)}
      >
        <div className='modal-box'>
          <h1 className='text-2xl mb-2'> Select Frames </h1>
          <div className='grid grid-cols-5 gap-2'>
            {props.dialogFrames.value.map((frame, index) => (
              <img
                key={index}
                src={frame}
                alt={`Frame ${index}`}
                width={150}
                className={`border cursor-pointer ${
                  props.selectedDialogFrames.value.includes(index) ? 'border-primary' : ''
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
            <button
              className='btn btn-success'
              onClick={() => {
                // Since we don't need to show the dialog anymore, we close it
                props.showDialog.setValue(false);

                return props.selectedDialogFrames.value.map((item) =>
                  props.callback(props.dialogFrames.value[item])
                );
              }}
            >
              {' '}
              Upload
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

type Props = Pick<EditorData, 'spriteSheetFrames' | 'selectedSequence'> &
  Pick<AppSettings, 'imageCompressionRatio'>;

function InspectorFileUpload(props: Props) {
  const [
    rootProps,
    inputProps,
    placeholder,
    disabled,
    className,
    style,
    addNewFrame,
    showDialog,
    dialogFrames,
    selectedDialogFrames,
  ] = useFileUpload(
    props.spriteSheetFrames.value,
    props.spriteSheetFrames.setValue,
    props.selectedSequence.value,
    props.imageCompressionRatio.value
  );

  return (
    <>
      <div {...rootProps} className={className} style={style}>
        <input {...inputProps} disabled={disabled} />
        <p>{placeholder}</p>
      </div>
      <InspectorPickFrames
        dialogFrames={dialogFrames}
        showDialog={showDialog}
        selectedDialogFrames={selectedDialogFrames}
        selectedSequence={props.selectedSequence}
        spriteSheetFrames={props.spriteSheetFrames}
        callback={addNewFrame}
      />
    </>
  );
}

export default InspectorFileUpload;
