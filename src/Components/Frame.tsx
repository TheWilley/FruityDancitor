import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Frame(props: { index: number, draggable?: boolean }) {
    return (
        <div className={`p-2 m-1 relative bg-base-300 rounded ${props.draggable && 'cursor-move'}`}>
            {props.draggable && <FontAwesomeIcon icon={faGripVertical} className='mr-2 text-2xl' />}
            <img src="https://picsum.photos/40/40" className="border inline mr-1" />
            <span> Frame {props.index} </span>
            <span className='absolute right-3 top-3 cursor-pointer'>
                <FontAwesomeIcon icon={faTrash} />
            </span>
        </div>
    );
}

export default Frame;