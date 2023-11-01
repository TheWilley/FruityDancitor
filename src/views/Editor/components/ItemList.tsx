import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, arrayMove } from 'react-movable';

function Item(props: { index: number, prefix: string, base64: string }) {
    return (
        <div className='p-2 m-1 relative bg-base-300 rounded cursor-move'>
            {<FontAwesomeIcon icon={faGripVertical} className='mr-2 text-2xl' />}
            <img src={props.base64} className="border inline mr-1" width={40} height={40} />
            <span> {props.prefix} {props.index}</span>
            <span className='absolute right-3 top-3 cursor-pointer'>
                <FontAwesomeIcon icon={faTrash} className='hover:text-error' />
            </span>
        </div>
    );
}

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