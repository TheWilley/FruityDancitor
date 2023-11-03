import {useCallback, useState } from 'react';
import { getBase64 } from '../../../utils/fileHandler';
import { IFrame } from '../../../global/types';
import { useDropzone } from 'react-dropzone';

function FileUploadMultiple(props: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, selectedRow: number }) {
    const [dragOver, setDragOver] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles) {
            // If drag was accepted
            setDragOver(false);
            
            // Go through all entries
            for (const file of acceptedFiles) {
                // Check if there is space for a new entry
                if (props.frames[props.selectedRow].row.length < 8) {
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
    }, []);

    const onDragOver = () => {
        setDragOver(true);
    };

    
    const onDragLeave = () => {
        setDragOver(false);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, onDragOver, onDragLeave });

    return (
        <div>
            <div {...getRootProps()} className='border-2 border-dashed rounded-md w-full mb-2 p-3 cursor-pointer bg-base-200 opacity-70 hover:opacity-100 transition-opacity' style={{borderColor: dragOver ? 'darkgreen' : ''}} >
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>
    );

}

export default FileUploadMultiple;
