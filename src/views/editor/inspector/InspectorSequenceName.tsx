import useStyle from '../../../hooks/utils/useStyle.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { sequenceChangeName } from '../../../redux/spriteSheetSlice.ts';

/**
 * Component which represents the name of a sequence.
 *
 * This is used later within FL Studio as a unique identifier for a given sequence.
 */
function InspectorSequenceName() {
  const { spriteSheetSequences, selectedSequence } = useAppSelector(
    (state) => state.spriteSheet.present
  );
  const dispatch = useAppDispatch();

  const disabled = spriteSheetSequences.length - 1 === selectedSequence;
  const [formDisabledClass] = useStyle('form-control w-full', undefined, [
    { condition: disabled, result: 'tooltip tooltip-bottom' },
  ]);

  return (
    <div>
      <div className='items-center rounded mb-1'>
        <div className={formDisabledClass}>
          <label className='label'>
            <span className='label-text'>Name</span>
          </label>
          <input
            value={spriteSheetSequences[selectedSequence].name}
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full tooltip'
            onChange={(e) => {
              dispatch(sequenceChangeName(e.target.value));
            }}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

export default InspectorSequenceName;
