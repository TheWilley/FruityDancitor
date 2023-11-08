import { IFrame } from '../../../global/types';
import useFileUpload from '../../../hooks/useFileUpload';

function FileUpload(props: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, selectedRow: number, compressionRatio: number }) {
    const [rootProps, inputProps, placeholderText, disabled, className, style] = useFileUpload(props.frames, props.setFrames, props.selectedRow, props.compressionRatio);

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

export default FileUpload;
