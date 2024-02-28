import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  faIcon: IconProp;
  tooltip: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  onChange: (result: string) => void;
};

/**
 * Component which represent a input with a label.
 * @param props A object containing component properties.
 */
function TextInput(props: Props) {
  return (
    <div className={`join w-full ${props.class}`}>
      <div className='join-item bg-base-200 p-1 px-2'>
        <div className='flex h-full w-4 items-center justify-center'>
          <FontAwesomeIcon icon={props.faIcon} />
        </div>
      </div>
      <div className='tooltip tooltip-bottom w-full' data-tip={props.tooltip}>
        <input
          type='text'
          className={`input join-item input-bordered w-full ${
            props.size && 'input-' + props.size
          }`}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
}

export default TextInput;
