import useFrameMods from '../../../hooks/utils/useFrameMods.ts';
import {
  faUpRightAndDownLeftFromCenter,
  faX,
  faY,
} from '@fortawesome/free-solid-svg-icons';
import NumberInput from '../../../components/NumberInput.tsx';

/**
 * Component which represents settings for a selected frame.
 */
function InspectorFrameMods() {
  const { mods, disabled, setxoffset, setyoffset, setScale, resetMods } = useFrameMods();

  return (
    <>
      <NumberInput
        faIcon={faUpRightAndDownLeftFromCenter}
        tooltip='Scale Multiplier'
        step={0.1}
        min={0.1}
        max={3}
        value={mods.scale}
        type='float'
        onChange={(value) => setScale(value)}
        class='mb-2'
        disabled={disabled}
      />
      <NumberInput
        faIcon={faX}
        tooltip='X-Offset'
        min={-500}
        max={500}
        value={mods.xoffset}
        onChange={(value) => setxoffset(value)}
        class='mb-2'
        disabled={disabled}
      />
      <NumberInput
        faIcon={faY}
        tooltip='Y-Offset'
        min={-500}
        max={500}
        value={mods.yoffset}
        onChange={(value) => setyoffset(value)}
        class='mb-2'
        disabled={disabled}
      />
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
