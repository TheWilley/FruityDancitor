import { produce } from 'immer';
import { EditorData } from '../../../../global/types';

type Props = Pick<EditorData, 'spriteSheetFrames' | 'selectedSequence'>;

/**
 * Represents the name of a sequence.
 *
 * This is used later within FL Studio as a unique identifier for a given sequence.
 * TODO: Change this to "inspectorSequenceName"
 */
function InspectorRowName(props: Props) {
  return (
    <div>
      <div className='items-center rounded mb-1'>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Name</span>
          </label>
          <input
            value={props.spriteSheetFrames.value[props.selectedSequence.value].name}
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full'
            onChange={(e) => {
              props.spriteSheetFrames.setValue(
                produce(props.spriteSheetFrames.value, (draft) => {
                  draft[props.selectedSequence.value].name = e.target.value;
                })
              );
            }}
            disabled={
              props.spriteSheetFrames.value.length - 1 === props.selectedSequence.value
            }
          />
        </div>
      </div>
    </div>
  );
}

export default InspectorRowName;
