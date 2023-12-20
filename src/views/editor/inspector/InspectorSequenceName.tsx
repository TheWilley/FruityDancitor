import { produce } from 'immer';
import { EditorData } from '../../../global/types.ts';
import useStyle from '../../../hooks/utils/useStyle.ts';

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
  const disabled = props.spriteSheetSequences.length - 1 === props.selectedSequence;
  const [formDisabledClass] = useStyle('form-control w-full', undefined, [
    { condition: disabled, result: 'tooltip tooltip-bottom' },
  ]);

  return (
    <div>
      <div className='items-center rounded mb-1'>
        <div
          className={formDisabledClass}
          data-tip={
            disabled && 'The name of this sequence cannot be renamed due to plugin rules'
          }
        >
          <label className='label'>
            <span className='label-text'>Name</span>
          </label>
          <input
            value={props.spriteSheetSequences[props.selectedSequence].name}
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full tooltip'
            onChange={(e) => {
              props.setSpriteSheetSequences(
                produce(props.spriteSheetSequences, (draft) => {
                  draft[props.selectedSequence].name = e.target.value;
                })
              );
            }}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

export default InspectorSequenceName;
