import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyle from '../hooks/utils/useStyle.ts';
import { Else, If, Then, When } from 'react-if';

type ListItemProps = {
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
function CommonListItem(props: ListItemProps) {
  const [imageBorder] = useStyle('inline mr-2 w-10 h-10', undefined, [
    {
      condition: props.objectURL !== undefined,
      result: 'bg-base-100 border border-base-100',
    },
  ]);

  const [highlighted] = useStyle(
    'flex items-center p-2 m-1 relative bg-base-300 rounded cursor-move',
    undefined,
    [{ condition: props.highlighted === true, result: 'border border-primary' }]
  );

  return (
    <div className={highlighted}>
      <If condition={props.objectURL}>
        <Then>
          <img src={props.objectURL} className={imageBorder} width='40px' height='40px' />
        </Then>
        <Else>
          <FontAwesomeIcon icon={faImage} className='mr-2 size-[40px] text-4xl' />
        </Else>
      </If>
      <span className='overflow-hidden text-ellipsis'>
        {props.text || <i> {props.alt} </i>}
      </span>
      <When condition={props.includeTrash}>
        <span className='absolute right-3 top-[15px] cursor-pointer text-lg'>
          <FontAwesomeIcon
            icon={faTrash}
            className='hover:text-error'
            onMouseDown={props.trashClickedCallback}
          />
        </span>
      </When>
    </div>
  );
}

export default CommonListItem;
