import { arrayMove, List } from 'react-movable';
import Card from '../../../../components/Card';
import { EditorData } from '../../../../global/types';
import CommonListItem from '../common/CommonListItem';

type Props = Pick<EditorData, 'spriteSheetFrames' | 'selectedSequence'>;

function SectionSequenceList(EProps: Props) {
  return (
    <Card className='p-1'>
      <List
        values={EProps.spriteSheetFrames.value}
        onChange={({ oldIndex, newIndex }) => {
          EProps.spriteSheetFrames.setValue(
            arrayMove(EProps.spriteSheetFrames.value, oldIndex, newIndex)
          );
          EProps.selectedSequence.setValue(newIndex);
        }}
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props, index }) => (
          <li {...props} onMouseDown={() => EProps.selectedSequence.setValue(index || 0)}>
            <CommonListItem
              {...props}
              base64={value.sequence[0]?.base64}
              text={EProps.spriteSheetFrames.value[index || 0].name}
              alt={`Sequence ${(index || 0) + 1}`}
              highlighted={index === EProps.selectedSequence.value}
            />
          </li>
        )}
      />
    </Card>
  );
}

export default SectionSequenceList;
