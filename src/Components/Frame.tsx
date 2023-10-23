import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Frame(props: { index: number }) {
    return (
        <div className="p-1 mb-1 relative">
            <img src="https://picsum.photos/40/40" className="border inline mr-1" />
            <span> Frame {props.index} </span>
            <span className='absolute right-3 top-3'>
                <FontAwesomeIcon icon={faTrash} />
            </span>
        </div>
    );
}

export default Frame;