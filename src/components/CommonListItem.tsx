import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noimage from '../media/noimage.svg';

type Props = {
  text: string;
  alt: string;
  objectURL: string;
  highlighted?: boolean;
  callback?: () => void; //FIXME: Callback is a bad name since it does not say what it does
  includeTrash?: boolean;
};

/**
 * A component which represent a list item within both SequenceList and InspectorFramesList.
 */
function CommonListItem(props: Props) {
  return (
    <div
      className={`flex items-center p-2 m-1 relative bg-base-300 rounded cursor-move ${
        props.highlighted ? 'border border-base' : ''
      }`}
    >
      <div className={'mr-2 text-2xl'}>
        <FontAwesomeIcon icon={faGripVertical} />
      </div>
      <img
        src={props.objectURL || noimage}
        className={`inline mr-1 w-10 h-10 ${props.objectURL && 'border'}`}
        width={40}
        height={40}
      />
      <span>{props.text || <i> {props.alt} </i>}</span>
      {props.includeTrash && (
        <span className='absolute right-3 top-3 cursor-pointer'>
          <FontAwesomeIcon
            icon={faTrash}
            className='hover:text-error'
            onMouseDown={props.callback}
          />
        </span>
      )}
    </div>
  );
}

export default CommonListItem;
