import { List, arrayMove } from 'react-movable';
import Card from '../../../../components/Card';
import { SpriteSheetFrame } from '../../../../global/types';
import CommonListItem from '../common/CommonListItem';

function SectionSequenceList(EProps: { spriteSheetFrames: SpriteSheetFrame[], setFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>, selectedRow: number, setSelectedRow: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <Card className='p-1'>
            <List
                values={EProps.spriteSheetFrames}
                onChange={({ oldIndex, newIndex }) => {
                    EProps.setFrames(arrayMove(EProps.spriteSheetFrames, oldIndex, newIndex));
                    EProps.setSelectedRow(newIndex);
                }}
                renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                renderItem={({ value, props, index }) => (
                    <li {...props} onMouseDown={() => EProps.setSelectedRow(index || 0)}>
                        <CommonListItem {...props} base64={value.sequence[0]?.base64} text={EProps.spriteSheetFrames[index || 0].name} alt={`Sequence ${(index || 0) + 1}`} highlighted={index === EProps.selectedRow}  />
                    </li>
                )}
            />
        </Card>
    );
}


export default SectionSequenceList;