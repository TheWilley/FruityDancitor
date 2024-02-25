import useFrameMods from '../../../hooks/utils/useFrameMods.ts';
import useInputValidation from '../../../hooks/utils/useInputValidation.ts';
import {
  faUpRightAndDownLeftFromCenter,
  faX,
  faY,
} from '@fortawesome/free-solid-svg-icons';
import TextInput from '../../../components/TextInput.tsx';

/**
 * Component which represents settings for a selected frame.
 */
function InspectorFrameMods() {
  const { validateNumberInput } = useInputValidation();
  const { mods, disabled, setxoffset, setyoffset, setScale, resetMods } = useFrameMods();

  return (
    <>
      <TextInput faIcon={faUpRightAndDownLeftFromCenter} tooltip='Scale Multiplier'>
        <input
          type='number'
          className='input join-item input-bordered w-full'
          step={0.1}
          min={0.1}
          max={3}
          value={mods.scale}
          onChange={(e) => validateNumberInput('float', e, (value) => setScale(value))}
          disabled={disabled}
        />
      </TextInput>

      <TextInput faIcon={faX} tooltip='X-Offset'>
        <input
          type='number'
          className='input join-item input-bordered w-full'
          min={-500}
          value={mods.xoffset}
          onChange={(e) => validateNumberInput('number', e, (value) => setxoffset(value))}
          disabled={disabled}
        />
      </TextInput>

      <TextInput faIcon={faY} tooltip='Y-Offset'>
        <input
          type='number'
          className='input join-item input-bordered w-full'
          min={-500}
          value={mods.yoffset}
          onChange={(e) => validateNumberInput('number', e, (value) => setyoffset(value))}
          disabled={disabled}
        />
      </TextInput>

      <button
        className='btn btn-md w-full disabled:bg-base-200'
        onClick={resetMods}
        disabled={disabled}
      >
        Reset
      </button>
    </>
  );
}

export default InspectorFrameMods;
