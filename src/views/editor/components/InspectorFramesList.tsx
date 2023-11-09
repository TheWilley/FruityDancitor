import { produce } from 'immer';
import { useEffect } from 'react';
import { List, arrayMove } from 'react-movable';
import { IFrame } from '../../../global/types';
import CommonListItem from './CommonListItem';

function InspectorFramesList(EProps: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, rows: number, selectedRow: number, selectedFrame: number, setSelectedFrame: React.Dispatch<React.SetStateAction<number>> }) {
    // Detects when a row is changed and sets a default value of 0
    useEffect(() => {
        EProps.setSelectedFrame(0);
    }, [EProps.selectedRow]);

    // Runs on every update
    useEffect(() => {
        // If out form is enabled
        if (EProps.selectedFrame != -1) {
            // If the selected index is out of bounds, move it down one step
            if (EProps.frames[EProps.selectedRow].row.length <= EProps.selectedFrame) {
                EProps.setSelectedFrame(EProps.selectedFrame - 1);
            } 
            // If we have no frames, disable form
            else if (EProps.frames[EProps.selectedRow].row.length === 0) {
                EProps.setSelectedFrame(-1);
            }
        } 
        // If we only have one frame, select it
        else if (EProps.frames[EProps.selectedRow].row.length === 1) {
            EProps.setSelectedFrame(0);
        }
    });

    /**
     * Modified a row with a new value
     */
    const adjustRow = (modifiedRow: IFrame['row']) => {
        EProps.setFrames((prevFrames) => {
            return produce(prevFrames, (draft) => {
                draft[EProps.selectedRow].row = modifiedRow;
            });
        });
    };
    /**
     * Callback when removing a frame
     */
    const callback = (targetFrame: number) => {
        adjustRow(EProps.frames[EProps.selectedRow].row.filter((_, index) => index !== targetFrame));
    };

    return (
        <List
            values={EProps.frames[EProps.selectedRow].row.slice(0, EProps.rows)}
            onChange={({ oldIndex, newIndex }) => {
                adjustRow(arrayMove(EProps.frames[EProps.selectedRow].row, oldIndex, newIndex));
                EProps.setSelectedFrame(newIndex);
            }}
            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
            renderItem={({ value, props, index }) => (
                <li {...props} onMouseDown={() => EProps.setSelectedFrame(index || 0)}>
                    <CommonListItem {...props} base64={value.base64} text={`Frame ${(index || 0) + 1}`} callback={() => callback(index || 0)} highlighted={EProps.selectedFrame === index} includeTrash />
                </li>
            )}
        />
    );
}


export default InspectorFramesList;