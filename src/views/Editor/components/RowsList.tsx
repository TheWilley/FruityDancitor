import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import CardL1 from '../../../components/CardL1';

function Row(props: { index: number }) {
    return (
        <div className='p-2 m-1 relative bg-base-300 rounded cursor-move'>
            {<FontAwesomeIcon icon={faGripVertical} className='mr-2 text-2xl' />}
            <img src="https://picsum.photos/40/40" className="border inline mr-1" />
            <span> Row {props.index}</span>
            <span className='absolute right-3 top-3 cursor-pointer'>
                <FontAwesomeIcon icon={faTrash} className='hover:text-error' />
            </span>
        </div>
    );
}

function RowsList(props: { rows: number }) {
    return (
        <CardL1 className='p-1'>
            <ul className='h-full overflow-auto'>
                {Array.from({ length: props.rows }).map((_, i) => (
                    <li>
                        <Row index={i} />
                    </li>
                ))}
            </ul>
        </CardL1>
    );
}

export default RowsList;