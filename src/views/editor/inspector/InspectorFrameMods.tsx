import { EditorData } from '../../../global/types.ts';
import useFrameMods from '../../../hooks/utils/useFrameMods.ts';
import useInputValidation from '../../../hooks/utils/useInputValidation.ts';

type Props = Pick<
  EditorData,
  | 'spriteSheetSequences'
  | 'setSpriteSheetSequences'
  | 'selectedSequence'
  | 'selectedFrame'
>;

/**
 * Component which represents settings for a selected frame.
 * @param props A object containing component properties.
 */
function InspectorFrameMods(props: Props) {
  const { validateNumberInput } = useInputValidation();
  const { mods, disabled, setxoffset, setyoffset, setScale, resetMods } = useFrameMods(
    props.spriteSheetSequences,
    props.setSpriteSheetSequences,
    props.selectedSequence,
    props.selectedFrame
  );

  return (
    <>
      <div>
        <label className='label'>
          <span className='label-text'>Scale</span>
        </label>
        <input
          type='range'
          className='range w-full'
          step={0.1}
          min={0.1}
          max={3}
          value={mods.scale}
          onChange={(e) => validateNumberInput('float', e, (value) => setScale(value))}
          disabled={disabled}
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
        <div>
          <label className='label'>
            <span className='label-text'>X-Offset</span>
          </label>
          <input
            type='number'
            className='input input-md input-bordered w-full'
            min={-500}
            value={mods.xoffset}
            onChange={(e) =>
              validateNumberInput('number', e, (value) => setxoffset(value))
            }
            disabled={disabled}
          />
        </div>
        <div>
          <label className='label'>
            <span className='label-text'>Y-Offset</span>
          </label>
          <input
            type='number'
            className='input input-md input-bordered w-full'
            min={-500}
            value={mods.yoffset}
            onChange={(e) =>
              validateNumberInput('number', e, (value) => setyoffset(value))
            }
            disabled={disabled}
          />
        </div>
      </div>
      <button className='btn btn-md w-full mt-4' onClick={resetMods} disabled={disabled}>
        Reset
      </button>
    </>
  );
}

export default InspectorFrameMods;
