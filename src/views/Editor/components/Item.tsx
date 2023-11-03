import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noimage from '../../../../public/noimage.svg';

function Item(props: { text: string, base64: string, highlighted?: boolean, callback?: () => void, includeTrash?: boolean }) {
    return (
        <div className={`p-2 m-1 relative bg-base-300 rounded cursor-move ${props.highlighted ? 'border border-base border-opacity-30' : ''}`}>
            {<FontAwesomeIcon icon={faGripVertical} className='mr-2 text-2xl' />}
            <img src={props.base64 || noimage} className={`inline mr-1 ${props.base64 && 'border'}`} width={40} height={40} />
            <span> {props.text || <i> Undefined </i>}</span>
            {
                props.includeTrash && (
                    <span className='absolute right-3 top-3 cursor-pointer'>
                        <FontAwesomeIcon icon={faTrash} className='hover:text-error' onMouseDown={props.callback} />
                    </span>
                )
            }
        </div>
    );
}

export default Item;