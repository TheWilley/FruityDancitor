import {AppSettings, EditorData, PickFrames} from '../../../../global/types';
import useFileUpload from '../../../../hooks/useFileUpload';

type Props = Pick<EditorData, 'spriteSheetFrames' | 'selectedSequence'> & Pick<AppSettings, 'imageCompressionRatio'> & Pick<PickFrames, 'dialogFrames' | 'showDialog'>

function InspectorFileUpload(props: Props) {
    const [rootProps, inputProps, placeholderText, disabled, className, style] = useFileUpload(props.spriteSheetFrames.value, props.spriteSheetFrames.setValue, props.showDialog.setValue, props.dialogFrames.setValue, props.selectedSequence.value, props.imageCompressionRatio.value);

    return (
        <div
            {...rootProps}
            className={className}
            style={style}
        >
            <input {...inputProps} disabled={disabled}/>
            <p>
                {placeholderText}
            </p>
        </div>
    );


}

export default InspectorFileUpload;
