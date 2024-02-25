import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  faIcon: IconProp;
  tooltip: string;
  checked: boolean;
  onChange: () => void;
};

/**
 * Component which represent a input with a label.
 * @param props A object containing component properties.
 */
function CheckboxInput(props: Props) {
  return (
    <div className='join mb-2 w-full'>
      <div className='join-item bg-base-200 p-1 px-2'>
        <div className='flex h-6 w-4 items-center justify-center'>
          <FontAwesomeIcon icon={props.faIcon} />
        </div>
      </div>
      <div className='tooltip tooltip-bottom w-full' data-tip={props.tooltip}>
        <input
          type='checkbox'
          className='checkbox join-item checkbox-lg !size-full'
          checked={props.checked}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default CheckboxInput;
