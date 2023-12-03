import { produce } from 'immer';
import { EditorData } from '../../../../global/types';

type Props = Pick<
  EditorData,
  'spriteSheetFrames' | 'setSpriteSheetFrames' | 'selectedSequence' | 'selectedFrame'
>;

/**
 * Component which represents settings for a selected frame.
 */
function InspectorFrameMods(props: Props) {
  const mods = props.spriteSheetFrames[props.selectedSequence]?.sequence[
    props.selectedFrame
  ]?.modifications || { scale: 1, xoffset: 0, yoffset: 0 };

  /**
   * Resets mod params to default.
   */
  const resetMods = () => {
    if (props.spriteSheetFrames[props.selectedSequence].sequence[props.selectedFrame]) {
      props.setSpriteSheetFrames((prevFrames) =>
        produce(prevFrames, (draft) => {
          draft[props.selectedSequence].sequence[
            props.selectedFrame
          ].modifications.scale = 1;
          draft[props.selectedSequence].sequence[
            props.selectedFrame
          ].modifications.xoffset = 0;
          draft[props.selectedSequence].sequence[
            props.selectedFrame
          ].modifications.yoffset = 0;
        })
      );
    }
  };

  const setScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSpriteSheetFrames((prevFrames) =>
      produce(prevFrames, (draft) => {
        draft[props.selectedSequence].sequence[props.selectedFrame].modifications.scale =
          parseFloat(e.target.value);
      })
    );
  };

  const setxoffset = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSpriteSheetFrames((prevFrames) =>
      produce(prevFrames, (draft) => {
        draft[props.selectedSequence].sequence[
          props.selectedFrame
        ].modifications.xoffset = parseInt(e.target.value);
      })
    );
  };

  const setyoffset = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSpriteSheetFrames((prevFrames) =>
      produce(prevFrames, (draft) => {
        draft[props.selectedSequence].sequence[
          props.selectedFrame
        ].modifications.yoffset = parseInt(e.target.value);
      })
    );
  };

  // Decides weather the inputs should be disabled or not
  const disabled = props.selectedFrame === -1;

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
