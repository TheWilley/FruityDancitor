import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CheckboxInputProps = {
  /**
   * The Font Awesome icon to display.
   */
  faIcon: IconProp;
  /**
   * The tooltip text to display.
   */
  tooltip: string;
  /**
   * Indicates whether the checkbox is checked.
   */
  checked: boolean;
  /**
   * Additional CSS class for styling.
   */
  class?: string;
  /**
   * The function to call when the checkbox state changes.
   */
  onChange: () => void;
};

/**
 * Component which represents a checkbox input with a label and tooltip.
 * @param props A object containing component properties.
 */
function CheckboxInput(props: CheckboxInputProps): JSX.Element {
  return (
    <div className={`join w-full ${props.class}`}>
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
