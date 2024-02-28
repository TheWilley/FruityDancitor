import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInputValidation from '../hooks/utils/useInputValidation';

type Props = {
  faIcon: IconProp;
  tooltip: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  disabled?: boolean;
  type?: 'number' | 'float';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  onChange: (result: number) => void;
};

/**
 * Component which represent a input with a label.
 * @param props A object containing component properties.
 */
function NumberInput(props: Props) {
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
