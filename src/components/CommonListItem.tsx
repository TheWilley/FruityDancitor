import { faGripVertical, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyle from '../hooks/utils/useStyle.ts';

type Props = {
  /**
   * The text to display on the list item.
   */
  text: string;
  /**
   * The alternative text to display if `objectURL` is falsy (i.e, the image cannot be rendered).
   */
  alt: string;
  /**
   * The object URL leading to the image to render.
   */
  objectURL: string;
  /**
   * Whether to highlight the list item with a border.
   */
  highlighted?: boolean;
  /**
   * Callback function to run if trash icon is clicked.
   */
  trashClickedCallback?: () => void;
  /**
   * Whether to include a trash icon.
   */
  includeTrash?: boolean;
};

/**
 * Component which represent a list item within SequenceList and InspectorFramesList.
 * @param props A object containing component properties.
 */
function CommonListItem(props: Props) {
  const [imageBorder] = useStyle('inline mr-1 w-10 h-10', undefined, [
    { condition: props.objectURL !== undefined, result: 'border' },
  ]);

  const [highlighted] = useStyle(
    'flex items-center p-2 m-1 relative bg-base-300 rounded cursor-move',
    undefined,
    [{ condition: props.highlighted === true, result: 'border border-base' }]
  );

  return (
    <div className={highlighted}>
      <div className={'mr-2 text-2xl'}>
        <FontAwesomeIcon icon={faGripVertical} />
      </div>
      {props.objectURL ? (
        <img src={props.objectURL} className={imageBorder} width={40} height={40} />
      ) : (
        <FontAwesomeIcon icon={faImage} className='text-4xl mr-2' />
      )}
      <span className='overflow-hidden text-ellipsis'>
        {props.text || <i> {props.alt} </i>}
      </span>
      {props.includeTrash && (
        <span className='absolute right-3 top-[15px] text-lg cursor-pointer'>
          <FontAwesomeIcon
            icon={faTrash}
            className='hover:text-error'
            onMouseDown={props.trashClickedCallback}
          />
        </span>
      )}
    </div>
  );
}

export default CommonListItem;
