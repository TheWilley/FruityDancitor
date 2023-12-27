import { EditorData } from '../../../global/types.ts';
import useFileUpload from '../../../hooks/utils/useFileUpload.ts';
import useStyle from '../../../hooks/utils/useStyle.ts';
import InspectorPickFrames from './InspectorPickFrames.tsx';

type Props = Pick<
  EditorData,
  'spriteSheetSequences' | 'setSpriteSheetSequences' | 'selectedSequence'
>;

/**
 * Represent a file upload area.
 *
 * This area can be clicked, or files can be dragged and dropped over it. It's purpose it to upload images (i.e, frames).
 * @param props A object containing component properties.
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
    dragOver,
    addNewFrame,
    showDialog,
    dialogFrames,
    selectedDialogFrames,
  } = useFileUpload(
    props.spriteSheetSequences,
    props.setSpriteSheetSequences,
    props.selectedSequence
  );

  const [classes, styles] = useStyle(
    'border-2 border-dashed rounded-md w-full mb-2 p-3 bg-base-200 opacity-60',
    undefined,
    [
      {
        condition: disabled,
        result: {
          true: 'cursor-not-allowed',
          false: 'cursor-pointer hover:opacity-100 transition-opacity',
        },
      },
    ],
    [
      {
        cssProperty: 'borderColor',
        condition: dragOver && disabled,
        result: { true: 'darkred' },
      },
      {
        cssProperty: 'borderColor',
        condition: dragOver && !disabled,
        result: { true: 'darkgreen' },
      },
    ]
  );

  return (
    <>
      <div {...getRootProps()} className={classes} style={styles}>
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
