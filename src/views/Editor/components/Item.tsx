import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export default Item;