import { List, arrayMove } from 'react-movable';
import ListItem from './ListItem';
import { IFrame } from '../../../global/types';
import { produce } from 'immer';

function FramesList(EProps: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, rows: number, selectedRow: number }) {
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
            }}
            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
            renderItem={({ value, props, index }) => (
                <li {...props}>
                    <ListItem {...props} base64={value.base64} text={`Frame ${(index || 0) + 1}`} callback={() => callback(index || 0)} includeTrash />
                </li>
            )}
        />
    );
}


export default FramesList;