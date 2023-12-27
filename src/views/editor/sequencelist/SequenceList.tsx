import { List } from 'react-movable';
import { EditorData } from '../../../global/types.ts';
import CommonListItem from '../../../components/CommonListItem.tsx';
import { arrayMoveMutable } from 'array-move';
import { produce } from 'immer';
import useKeyPress from '../../../hooks/utils/useKeyPress.ts';

type Props = Pick<
  EditorData,
  | 'spriteSheetSequences'
  | 'setSpriteSheetSequences'
  | 'selectedSequence'
  | 'setSelectedSequence'
>;

/**
 * Component which represents a list of all sequences in a reordable list.
 * @param EProps A object containing component properties.
 */
function SequenceList(EProps: Props) {
  // Keyboard shortcut to move to the next sequence
  useKeyPress(['0'], ['Control'], () => {
    if (EProps.selectedSequence < EProps.spriteSheetSequences.length) {
      EProps.setSelectedSequence(EProps.selectedSequence + 1);
    }
  });

  // Keyboard shortcut to move to the previous sequence
  useKeyPress(['9'], ['Control'], () => {
    if (EProps.selectedSequence > 0) {
      EProps.setSelectedSequence(EProps.selectedSequence - 1);
    }
  });

  // Moves the selected sequence up
  useKeyPress(['ArrowRight'], ['Control', 'Shift'], () => {
    if (EProps.selectedSequence < EProps.spriteSheetSequences.length - 1) {
      EProps.setSpriteSheetSequences((prevSequences) =>
        produce(prevSequences, (draft) => {
          arrayMoveMutable(draft, EProps.selectedSequence, EProps.selectedSequence + 1);
        })
      );
      EProps.setSelectedSequence(EProps.selectedSequence + 1);
    }
  });

  // Moves the selected sequence up
  useKeyPress(['ArrowLeft'], ['Control', 'Shift'], () => {
    if (EProps.selectedSequence > 0) {
      EProps.setSpriteSheetSequences((prevSequences) =>
        produce(prevSequences, (draft) => {
          arrayMoveMutable(draft, EProps.selectedSequence, EProps.selectedSequence - 1);
        })
      );
      EProps.setSelectedSequence(EProps.selectedSequence - 1);
    }
  });

  return (
    <List
      values={EProps.spriteSheetSequences}
      onChange={({ oldIndex, newIndex }) => {
        EProps.setSpriteSheetSequences((prevSequences) =>
          produce(prevSequences, (draft) => {
            arrayMoveMutable(draft, oldIndex, newIndex);
          })
        );
        EProps.setSelectedSequence(newIndex);
      }}
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props, index }) => (
        <li
          {...props}
          onMouseDown={() => EProps.setSelectedSequence(index || 0)}
          className='z-30'
        >
          <CommonListItem
            {...props}
            objectURL={value.sequence[0]?.objectURL}
            text={EProps.spriteSheetSequences[index || 0].name}
            alt={`Sequence ${(index || 0) + 1}`}
            highlighted={index === EProps.selectedSequence}
          />
        </li>
      )}
    />
  );
}

export default SequenceList;
