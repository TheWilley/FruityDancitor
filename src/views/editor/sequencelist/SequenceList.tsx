import { List } from 'react-movable';
import { EditorData, EditorSettings } from '../../../global/types.ts';
import CommonListItem from '../../../components/CommonListItem.tsx';
import { arrayMoveMutable } from 'array-move';
import { produce } from 'immer';
import SequencePlusButton from './SequencePlusButton.tsx';

type Props = Pick<
  EditorData,
  | 'spriteSheetSequences'
  | 'setSpriteSheetSequences'
  | 'selectedSequence'
  | 'setSelectedSequence'
> &
  Pick<EditorSettings, 'numberOfSequences' | 'setNumberOfSequences'>;

/**
 * Component which represents a list of all sequences in a reordable list.
 * @param EProps A object containing component properties.
 */
function SequenceList(EProps: Props) {
  return (
    <>
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
      <SequencePlusButton
        onClick={() => EProps.setNumberOfSequences(EProps.numberOfSequences + 1)}
      />
    </>
  );
}

export default SequenceList;
