import { SpriteSheetFrame } from '../../../../global/types';
import useFileUpload from '../../../../hooks/useFileUpload';

function InspectorFileUpload(props: { spriteSheetFrames: SpriteSheetFrame[], setFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>, selectedRow: number, compressionRatio: number }) {
    const [rootProps, inputProps, placeholderText, disabled, className, style] = useFileUpload(props.spriteSheetFrames, props.setFrames, props.selectedRow, props.compressionRatio);

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
