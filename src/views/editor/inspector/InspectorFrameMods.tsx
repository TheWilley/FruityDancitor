import useFrameMods from '../../../hooks/utils/useFrameMods.ts';
import {
  faLayerGroup,
  faUpRightAndDownLeftFromCenter,
  faX,
  faY,
} from '@fortawesome/free-solid-svg-icons';
import NumberInput from '../../../components/NumberInput.tsx';
import CheckboxInput from '../../../components/CheckboxInput.tsx';

/**
 * Component which represents settings for a selected frame.
 */
function InspectorFrameMods() {
  const { mods, disabled, modifyAllFrames, setxoffset, setyoffset, setScale, resetMods, copyMods, pasteMods, toggleSelectAll } = useFrameMods();

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
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
        <CheckboxInput
          tooltip='Edit all frames in sequence'
          faIcon={faLayerGroup}
          checked={modifyAllFrames}
          class='mb-2'
          onChange={
            toggleSelectAll
          }
        />
        <button
          className='btn btn-md mb-2 w-full disabled:bg-base-200'
          onClick={resetMods}
          disabled={disabled}
        >
          Reset
        </button>
      </div>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
        <button className='btn btn-success' onClick={copyMods}>
          Copy mods
        </button>
        <button className='btn btn-info' onClick={pasteMods}>
          Paste mods
        </button>
      </div>
    </>
  );
}

export default InspectorFrameMods;
