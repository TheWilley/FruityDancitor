import { produce } from 'immer';
import { useEffect } from 'react';
import { List, arrayMove } from 'react-movable';
import { EditorData, SpriteSheetFrame } from '../../../../global/types';
import CommonListItem from '../common/CommonListItem';

type Props = Pick<EditorData, 'spriteSheetFrames' | 'selectedSequence' | 'selectedFrame'>

function InspectorFramesList(EProps: Props) {
    // Detects when a sequence is changed and sets a default value of 0
    useEffect(() => {
        EProps.selectedFrame.setValue(0);
    }, [EProps.selectedSequence.value]);

    // Runs on every update
    useEffect(() => {
        // If out form is enabled
        if (EProps.selectedFrame.value != -1) {
            // If the selected index is out of bounds, move it down one step
            if (EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence.length <= EProps.selectedFrame.value) {
                EProps.selectedFrame.setValue(EProps.selectedFrame.value - 1);
            } 
            // If we have no spriteSheetFrames, disable form
            else if (EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence.length === 0) {
                EProps.selectedFrame.setValue(-1);
            }
        } 
        // If we only have one frame, select it
        else if (EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence.length === 1) {
            EProps.selectedFrame.setValue(0);
        }
    });

    /**
     * Modified a row with a new value
     */
    const adjustRow = (modifiedRow: SpriteSheetFrame['sequence']) => {
        EProps.spriteSheetFrames.setValue((prevFrames) => {
            return produce(prevFrames, (draft) => {
                draft[EProps.selectedSequence.value].sequence = modifiedRow;
            });
        });
    };
    /**
     * Callback when removing a frame
     */
    const callback = (targetFrame: number) => {
        adjustRow(EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence.filter((_, index) => index !== targetFrame));
    };

    return (
        <List
            values={EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence}
            onChange={({ oldIndex, newIndex }) => {
                adjustRow(arrayMove(EProps.spriteSheetFrames.value[EProps.selectedSequence.value].sequence, oldIndex, newIndex));
                EProps.selectedFrame.setValue(newIndex);
            }}
            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
            renderItem={({ value, props, index }) => (
                <li {...props} onMouseDown={() => EProps.selectedFrame.setValue(index || 0)}>
                    <CommonListItem {...props} base64={value.base64} text={`Frame ${(index || 0) + 1}`} alt='' callback={() => callback(index || 0)} highlighted={EProps.selectedFrame.value === index} includeTrash />
                </li>
            )}
        />
    );
}


export default InspectorFramesList;