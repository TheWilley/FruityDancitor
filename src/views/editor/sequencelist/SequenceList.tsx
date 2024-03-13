import { List } from 'react-movable';
import CommonListItem from '../../../components/ListItem.tsx';
import SequencePlusButton from './SequencePlusButton.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import {
  numberOfSequencesUpdate,
  selectedSequenceUpdate,
  sequenceMovePosition,
} from '../../../redux/spriteSheetSlice.ts';
import SequenceMinusButton from './SequenceMinusButton.tsx';

/**
 * Component which represents a list of all sequences in a reordable list.
 */
function SequenceList() {
  const spriteSheetSequences = useAppSelector(
    (state) => state.spriteSheet.spriteSheetSequences
  );
  const selectedSequence = useAppSelector((state) => state.spriteSheet.selectedSequence);
  const numberOfSequences = useAppSelector(
    (state) => state.spriteSheet.numberOfSequences
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <List
        values={spriteSheetSequences}
        onChange={({ oldIndex, newIndex }) => {
          dispatch(sequenceMovePosition({ from: oldIndex, to: newIndex }));
          dispatch(selectedSequenceUpdate(newIndex));
        }}
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props, index }) => (
          <li
            {...props}
            onMouseDown={() => dispatch(selectedSequenceUpdate(index || 0))}
            className='z-30'
          >
            <CommonListItem
              {...props}
              objectURL={value.sequence[0]?.objectURL}
              text={spriteSheetSequences[index || 0].name}
              alt={`Sequence ${(index || 0) + 1}`}
              highlighted={index === selectedSequence}
            />
          </li>
        )}
      />
      <div className='grid grid-cols-2'>
        <SequencePlusButton
          onClick={() => dispatch(numberOfSequencesUpdate(numberOfSequences + 1))}
        />
        <SequenceMinusButton
          onClick={() => dispatch(numberOfSequencesUpdate(numberOfSequences - 1))}
        />
      </div>
    </>
  );
}

export default SequenceList;
