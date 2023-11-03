import { List, arrayMove } from 'react-movable';
import Item from './Item';
import { IFrame } from '../../../global/types';

function FrameList(EProps: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, rows: number, selectedRow: number }) {
    /**
     * Modified a row with a new value
     */
    const adjustRow = (modifiedRow: string[]) => {
        // Delete the specified frame from the row array
        const newFrames = EProps.frames.map((frame, index) => {
            if (index === EProps.selectedRow) {
                return { ...frame, row: modifiedRow };
            }
            return frame;
        });
        EProps.setFrames(newFrames);
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
            }}
            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
            renderItem={({ value, props, index }) => (
                <li {...props}>
                    <Item {...props} base64={value} text={`Frame ${(index || 0) + 1}`} callback={() => callback(index || 0)} includeTrash />
                </li>
            )}
        />
    );
}


export default FrameList;