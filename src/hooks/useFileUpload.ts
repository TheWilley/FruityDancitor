import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getBase64 } from '../utils/fileHandler';
import { IFrame } from '../global/types';
import { produce } from 'immer';

export default function useFileUpload(frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, selectedRow: number) {
    const [dragOver, setDragOver] = useState(false);
    const disabled = frames[selectedRow].row.length > 7;

    // Runs when a file is uploaded
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles) {
            // If drag was accepted
            setDragOver(false);

            // Go through all entries
            for (const [index, file] of acceptedFiles.entries()) {
                // Check if there is space for a new entry
                if (frames[selectedRow].row.length + index < 8) {
                    // Get base64 for the file
                    const base64 = await getBase64(file) as string;

                    if (!frames[selectedRow].row.map(item => item.base64).includes(base64)) {
                        // Update the state by appending the image to the first row
                        setFrames((prevFrames) =>
                            produce(prevFrames, (draft) => {
                                draft[selectedRow].row.push({ base64: base64, mods: { scale: 1, xoffset: 0, yoffset: 0 } });
                            })
                        );
                    }
                }
            }
        }
    }, [frames]);

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
    const className = [
        'border-2',
        'border-dashed',
        'rounded-md',
        'w-full',
        'mb-2',
        'p-3',
        'bg-base-200',
        'opacity-60',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-100 transition-opacity'
    ].join(' ');

    const style = {
        borderColor: dragOver ? disabled ? 'darkred' : 'darkgreen' : ''
    };

    const placeholder = disabled ? 'Can\'t upload more than 8 files' : isDragActive ? 'Drop the files here...' : 'Drag \'n\' drop some files here, or click to select files';

    return [getRootProps(), getInputProps(), placeholder, disabled, className, style, placeholder] as const;
}

