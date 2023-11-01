import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, arrayMove } from 'react-movable';

function Item(props: { index: number, prefix: string }) {
    return (
        <div className='p-2 m-1 relative bg-base-300 rounded cursor-move'>
            {<FontAwesomeIcon icon={faGripVertical} className='mr-2 text-2xl' />}
            <img src="https://picsum.photos/40/40" className="border inline mr-1" />
            <span> {props.prefix} {props.index}</span>
            <span className='absolute right-3 top-3 cursor-pointer'>
                <FontAwesomeIcon icon={faTrash} className='hover:text-error' />
            </span>
        </div>
    );
}

function ItemList(props: {items: number[], setItems: React.Dispatch<React.SetStateAction<number[]>>, rows: number}) {
    return (
        <List
            values={props.items.slice(0, props.rows)}
            onChange={({ oldIndex, newIndex }) =>
                props.setItems(arrayMove(props.items, oldIndex, newIndex))
            }
            renderList={({ children, props }) => <ul {...props}>{children}</ul>}
            renderItem={({ value, props }) => <li {...props}><Item {...props} index={value} prefix='Frame' /></li>}
        />
    );
}

export default ItemList;