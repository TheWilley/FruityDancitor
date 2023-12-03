import { produce } from 'immer';
import { EditorData } from '../../../../global/types';

type Props = Pick<
  EditorData,
  'spriteSheetFrames' | 'setSpriteSheetFrames' | 'selectedSequence'
>;

/**
 * Represents the name of a sequence.
 *
 * This is used later within FL Studio as a unique identifier for a given sequence.
 */
function InspectorSequenceName(props: Props) {
  return (
    <div>
      <div className='items-center rounded mb-1'>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Name</span>
          </label>
          <input
            value={props.spriteSheetFrames[props.selectedSequence].name}
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full'
            onChange={(e) => {
              props.setSpriteSheetFrames(
                produce(props.spriteSheetFrames, (draft) => {
                  draft[props.selectedSequence].name = e.target.value;
                })
              );
            }}
            disabled={props.spriteSheetFrames.length - 1 === props.selectedSequence}
          />
        </div>
      </div>
    </div>
  );
}

export default InspectorSequenceName;
