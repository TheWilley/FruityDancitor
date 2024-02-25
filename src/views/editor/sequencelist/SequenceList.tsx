import { List } from 'react-movable';
import CommonListItem from '../../../components/ListItem.tsx';
import SequencePlusButton from './SequencePlusButton.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import {
  numberOfSequencesUpdate,
  selectedSequenceUpdate,
  sequenceMovePosition,
} from '../../../redux/spriteSheetSlice.ts';

/**
 * Component which represents a list of all sequences in a reordable list.
 */
function SequenceList() {
  const { spriteSheetSequences, selectedSequence, numberOfSequences } = useAppSelector(
    (state) => state.spriteSheet
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
      <SequencePlusButton
        onClick={() => dispatch(numberOfSequencesUpdate(numberOfSequences + 1))}
      />
    </>
  );
}

export default SequenceList;
