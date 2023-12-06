import { arrayMove, List } from 'react-movable';
import Card from '../../../../components/Card';
import { EditorData } from '../../../../global/types';
import CommonListItem from '../common/CommonListItem';

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
function SectionSequenceList(EProps: Props) {
  return (
    <Card className='p-1'>
      <List
        values={EProps.spriteSheetSequences}
        onChange={({ oldIndex, newIndex }) => {
          EProps.setSpriteSheetSequences(
            arrayMove(EProps.spriteSheetSequences, oldIndex, newIndex)
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
    </Card>
  );
}

export default SectionSequenceList;
