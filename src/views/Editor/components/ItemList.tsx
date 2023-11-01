import { List, arrayMove } from 'react-movable';
import Item from './Item';

function  ItemList(props: {frames: string[][], setFrames: React.Dispatch<React.SetStateAction<string[][]>>, rows: number, selectedRow: number}) {
    return (
        <List
            values={props.frames[props.selectedRow].slice(0, props.rows)}
            onChange={({ oldIndex, newIndex }) => {
                const modifiedRow = arrayMove(props.frames[props.selectedRow], oldIndex, newIndex);
                const newFrames = [
                    ...props.frames.slice(0, props.selectedRow),
                    modifiedRow,
                    ...props.frames.slice(props.selectedRow + 1)
                ];
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