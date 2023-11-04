import { useCallback, useState } from 'react';
import { getBase64 } from '../../../utils/fileHandler';
import { IFrame } from '../../../global/types';
import { useDropzone } from 'react-dropzone';

function FileUpload(props: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, selectedRow: number }) {
    const [dragOver, setDragOver] = useState(false);
    const disabled = props.frames[props.selectedRow].row.length > 7;

    // Runs when a file is uploaded
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles) {
            // If drag was accepted
            setDragOver(false);

            // Go through all entries
            for (const [index, file] of acceptedFiles.entries()) {
                // Check if there is space for a new entry
                if (props.frames[props.selectedRow].row.length + index < 8) {
                    // Get base64 for the file
                    const base64 = await getBase64(file) as string;

                    if (!props.frames[props.selectedRow].row.includes(base64)) {
                        // Update the state by appending the image to the first row
                        props.setFrames((prevFrames) => {
                            return prevFrames.map((row, index) => ({
                                name: row.name,
                                row: index === props.selectedRow ? [...row.row, base64] : row.row
                            }));
                        });
                    }
                }
            }
        }
    }, [props]);

    // When hovering over
    const onDragOver = () => {
        setDragOver(true);
    };

    // When leaving
    const onDragLeave = () => {
        setDragOver(false);
    };

    // Create a dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, onDragOver, onDragLeave });

    // Create a dynamic class to use below
    const getDynamicClass = [
        'border-2',
        'border-dashed',
        'rounded-md',
        'w-full',
        'mb-2',
        'p-3',
        'bg-base-200',
        'opacity-60',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-100 transition-opacity'
    ];

    return (
        <div
            {...getRootProps()}
            className={getDynamicClass.join(' ')}
            style={{borderColor: dragOver ? disabled ? 'darkred' : 'darkgreen' : ''}}
        >
            <input {...getInputProps()} disabled={disabled} />
            {disabled ? (
                <p>Can't upload more than 8 files</p>
            ) : isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );


}

export default FileUpload;
