import { List, arrayMove } from 'react-movable';
import Item from './Item';
import { IFrame } from '../../../global/types';

function ItemList(props: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, rows: number, selectedRow: number }) {
    return (
        <List
            values={props.frames[props.selectedRow].row.slice(0, props.rows)}
            onChange={({ oldIndex, newIndex }) => {
                const modifiedRow = arrayMove(props.frames[props.selectedRow].row, oldIndex, newIndex);
                const newFrames = props.frames.map((frame, index) => {
                    if (index === props.selectedRow) {
                        return { ...frame, row: modifiedRow };
                    }
                    return frame;
                });

                props.setFrames(newFrames);
            }}
            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
            renderItem={({ value, props, index }) => (
                <li {...props}>
                    <Item {...props} index={index || 0} base64={value} prefix='Frame' />
                </li>
            )}
        />
    );
}


export default ItemList;