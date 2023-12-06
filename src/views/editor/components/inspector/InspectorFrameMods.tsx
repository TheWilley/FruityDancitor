import { EditorData } from '../../../../global/types';
import useFrameMods from '../../../../hooks/utils/useFrameMods.ts';

type Props = Pick<
  EditorData,
  | 'spriteSheetSequences'
  | 'setSpriteSheetSequences'
  | 'selectedSequence'
  | 'selectedFrame'
>;

/**
 * Component which represents settings for a selected frame.
 */
function InspectorFrameMods(props: Props) {
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
          type='number'
          className='input input-md input-bordered w-full'
          step={0.1}
          min={0.1}
          value={mods.scale}
          onChange={(e) => setScale(e)}
          disabled={disabled}
        />
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <label className='label'>
            <span className='label-text'>X-Offset</span>
          </label>
          <input
            type='number'
            className='input input-md input-bordered w-full'
            value={mods.xoffset}
            onChange={(e) => setxoffset(e)}
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
            value={mods.yoffset}
            onChange={(e) => setyoffset(e)}
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
