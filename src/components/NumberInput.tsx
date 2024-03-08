import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInputValidation from '../hooks/utils/useInputValidation';

type NumberInputProps = {
  /**
   * The Font Awesome icon to display.
   */
  faIcon: IconProp;
  /**
   * The tooltip text to display.
   */
  tooltip: string;
  /**
   * The minimum value allowed.
   */
  min: number;
  /**
   * The maximum value allowed.
   */
  max: number;
  /**
   * The step value.
   */
  step?: number;
  /**
   * The value of the input.
   */
  value: number;
  /**
   * Indicates whether the input is disabled.
   */
  disabled?: boolean;
  /**
   * The type of input.
   */
  type?: 'number' | 'float';
  /**
   * The size of the input.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional CSS class for styling.
   */
  class?: string;
  /**
   * The function to call when the input value changes.
   * @param result The new value of the input.
   */
  onChange: (result: number) => void;
};

/**
 * Component which represent a input with a label.
 * @param props A object containing component properties.
 */
function NumberInput(props: NumberInputProps) {
  const { validateNumberInput } = useInputValidation();
  const inputSize =
    props.size == 'sm'
      ? 'input-sm'
      : props.size == 'md'
        ? 'input-md'
        : props.size == 'lg'
          ? 'input-lg'
          : '';

  return (
    <div className={`join w-full ${props.class}`}>
      <div className='join-item bg-base-200 p-1 px-2'>
        <div className='flex h-full w-4 items-center justify-center'>
          <FontAwesomeIcon icon={props.faIcon} />
        </div>
      </div>
      <div className='tooltip tooltip-bottom w-full' data-tip={props.tooltip}>
        <input
          type='number'
          className={`input join-item input-bordered w-full ${inputSize}`}
          value={props.value}
          max={props.max}
          min={props.min}
          step={props.step || 1}
          onChange={(e) => validateNumberInput(props.type || 'number', e, props.onChange)}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
}

export default NumberInput;
