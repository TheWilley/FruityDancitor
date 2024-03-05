import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { sequenceChangeName } from '../../../redux/spriteSheetSlice.ts';

/**
 * Component which represents the name of a sequence.
 *
 * This is used later within FL Studio as a unique identifier for a given sequence.
 */
function InspectorSequenceName() {
  const { spriteSheetSequences, selectedSequence } = useAppSelector(
    (state) => state.spriteSheet
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className='mb-1 items-center rounded'>
        <div className='form-control w-full'>
          <input
            value={spriteSheetSequences[selectedSequence].name}
            type='text'
            placeholder='Name'
            className='input input-bordered tooltip w-full'
            onChange={(e) => {
              dispatch(sequenceChangeName(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default InspectorSequenceName;
