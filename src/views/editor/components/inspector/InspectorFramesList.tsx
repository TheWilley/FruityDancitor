import { produce } from 'immer';
import { useEffect } from 'react';
import { List, arrayMove } from 'react-movable';
import { SpriteSheetFrame } from '../../../../global/types';
import CommonListItem from '../common/CommonListItem';

function InspectorFramesList(EProps: { spriteSheetFrames: SpriteSheetFrame[], setSpriteSheetFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>, numberOfSequences: number, selectedRow: number, selectedFrame: number, setSelectedFrame: React.Dispatch<React.SetStateAction<number>> }) {
    // Detects when a sequence is changed and sets a default value of 0
    useEffect(() => {
        EProps.setSelectedFrame(0);
    }, [EProps.selectedRow]);

    // Runs on every update
    useEffect(() => {
        // If out form is enabled
        if (EProps.selectedFrame != -1) {
            // If the selected index is out of bounds, move it down one step
            if (EProps.spriteSheetFrames[EProps.selectedRow].sequence.length <= EProps.selectedFrame) {
                EProps.setSelectedFrame(EProps.selectedFrame - 1);
            } 
            // If we have no spriteSheetFrames, disable form
            else if (EProps.spriteSheetFrames[EProps.selectedRow].sequence.length === 0) {
                EProps.setSelectedFrame(-1);
            }
        } 
        // If we only have one frame, select it
        else if (EProps.spriteSheetFrames[EProps.selectedRow].sequence.length === 1) {
            EProps.setSelectedFrame(0);
        }
    });

    /**
     * Modified a row with a new value
     */
    const adjustRow = (modifiedRow: SpriteSheetFrame['sequence']) => {
        EProps.setSpriteSheetFrames((prevFrames) => {
            return produce(prevFrames, (draft) => {
                draft[EProps.selectedRow].sequence = modifiedRow;
            });
        });
    };
    /**
     * Callback when removing a frame
     */
    const callback = (targetFrame: number) => {
        adjustRow(EProps.spriteSheetFrames[EProps.selectedRow].sequence.filter((_, index) => index !== targetFrame));
    };

    return (
        <List
            values={EProps.spriteSheetFrames[EProps.selectedRow].sequence}
            onChange={({ oldIndex, newIndex }) => {
                adjustRow(arrayMove(EProps.spriteSheetFrames[EProps.selectedRow].sequence, oldIndex, newIndex));
                EProps.setSelectedFrame(newIndex);
            }}
            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
            renderItem={({ value, props, index }) => (
                <li {...props} onMouseDown={() => EProps.setSelectedFrame(index || 0)}>
                    <CommonListItem {...props} base64={value.base64} text={`Frame ${(index || 0) + 1}`} alt='' callback={() => callback(index || 0)} highlighted={EProps.selectedFrame === index} includeTrash />
                </li>
            )}
        />
    );
}


export default InspectorFramesList;