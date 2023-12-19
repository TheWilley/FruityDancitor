import { List } from 'react-movable';
import { EditorData } from '../../../global/types.ts';
import CommonListItem from '../../../components/CommonListItem.tsx';
import { arrayMoveMutable } from 'array-move';
import { produce } from 'immer';

type Props = Pick<
  EditorData,
  | 'spriteSheetSequences'
  | 'setSpriteSheetSequences'
  | 'selectedSequence'
  | 'setSelectedSequence'
>;

/**
 * Component which represents a list of all sequences in a reordable list.
 */
function SequenceList(EProps: Props) {
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
