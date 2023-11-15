import Compressor from 'compressorjs';
import { produce } from 'immer';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SpriteSheetFrame } from '../global/types';

/**
 * Extract base64 from an image
 */
function getBase64(file: File, compressionRatio: number) {
    return new Promise((resolve, reject) => {
        if (file.type === 'image/jpeg') {
            new Compressor(file, {
                quality: compressionRatio,
                success: (result) => {
                    const reader = new FileReader();

                    reader.onloadend = function () {
                        resolve(reader.result);
                    };

                    reader.onerror = function () {
                        reject(new Error('Failed to read the file as Base64'));
                    };

                    reader.readAsDataURL(result);
                }
            });
        } else {
            reject(new Error('Unsupported file type'));
        }
    });
}

export default function useFileUpload(spriteSheetFrames: SpriteSheetFrame[], setSpriteSheetFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>, selectedRow: number, compressionRatio: number) {
    const [dragOver, setDragOver] = useState(false);
    const disabled = spriteSheetFrames[selectedRow].sequence.length > 7;

    // Runs when a file is uploaded
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles) {
            // If drag was accepted
            setDragOver(false);

            // Go through all entries
            for (const [index, file] of acceptedFiles.entries()) {
                // Don't accept too large images
                if(file.size >= 8000000) continue;

                // Check if there is space for a new entry
                if (spriteSheetFrames[selectedRow].sequence.length + index < 8) {
                    // Get base64 for the file
                    const base64 = await getBase64(file, compressionRatio) as string;

                    if (!spriteSheetFrames[selectedRow].sequence.map(item => item.base64).includes(base64)) {
                        // Update the state by appending the image to the first sequence
                        setSpriteSheetFrames((prevFrames) =>
                            produce(prevFrames, (draft) => {
                                draft[selectedRow].sequence.push({ base64: base64, modifications: { scale: 1, xoffset: 0, yoffset: 0 } });
                            })
                        );
                    }
                }
            }
        }
    }, [spriteSheetFrames]);

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

