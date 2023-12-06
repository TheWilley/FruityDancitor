import { produce } from 'immer';
import { EditorData } from '../../../global/types.ts';

type Props = Pick<
  EditorData,
  'spriteSheetSequences' | 'setSpriteSheetSequences' | 'selectedSequence'
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
            value={props.spriteSheetSequences[props.selectedSequence].name}
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full'
            onChange={(e) => {
              props.setSpriteSheetSequences(
                produce(props.spriteSheetSequences, (draft) => {
                  draft[props.selectedSequence].name = e.target.value;
                })
              );
            }}
            disabled={props.spriteSheetSequences.length - 1 === props.selectedSequence}
          />
        </div>
      </div>
    </div>
  );
}

export default InspectorSequenceName;