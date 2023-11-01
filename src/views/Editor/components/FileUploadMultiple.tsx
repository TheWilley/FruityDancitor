import { ChangeEvent, useEffect, useState } from 'react';
import { getBase64 } from '../../../utils/fileHandler';

function FileUploadMultiple(props: { frames: string[][], setFrames: React.Dispatch<React.SetStateAction<string[][]>>, selectedRow: number }) {
    const [fileList, setFileList] = useState<FileList | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileList(e.target.files);
    };

    useEffect(() => {
        const e = async () => {
            // Check for file list
            if (fileList) {
                // Go through all entries
                for (const file of Array.from(fileList)) {
                    // Check if there is space for a new entry
                    if (props.frames[props.selectedRow].length < 8) {
                        // Get base64 for the file
                        const base64 = await getBase64(file) as string;

                        if (!props.frames[props.selectedRow].includes(base64)) {
                            // Update the state by appending the image to the first row
                            props.setFrames((prevFrames) => {
                                return prevFrames.map((row, index) =>
                                    index === props.selectedRow ? [...row, base64] : row
                                );
                            });
                        }

                    }
                }
            }
        };

        e();
    }, [fileList, props.frames, props.setFrames]);

    return (
        <div>
            <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-md w-full mb-2" multiple />
        </div>
    );

}

export default FileUploadMultiple;
