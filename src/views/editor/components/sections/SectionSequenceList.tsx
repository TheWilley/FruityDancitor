import { List, arrayMove } from 'react-movable';
import CardL1 from '../../../../components/CardL1';
import { SpriteSheetFrame } from '../../../../global/types';
import CommonListItem from '../common/CommonListItem';

function SectionSequenceList(EProps: { frames: SpriteSheetFrame[], setFrames: React.Dispatch<React.SetStateAction<SpriteSheetFrame[]>>, selectedRow: number, setSelectedRow: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <CardL1 className='p-1'>
            <List
                values={EProps.frames}
                onChange={({ oldIndex, newIndex }) => {
                    EProps.setFrames(arrayMove(EProps.frames, oldIndex, newIndex));
                    EProps.setSelectedRow(newIndex);
                }}
                renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                renderItem={({ value, props, index }) => (
                    <li {...props} onMouseDown={() => EProps.setSelectedRow(index || 0)}>
                        <CommonListItem {...props} base64={value.sequence[0]?.base64} text={EProps.frames[index || 0].name} alt={`Sequence ${(index || 0) + 1}`} highlighted={index === EProps.selectedRow}  />
                    </li>
                )}
            />
        </CardL1>
    );
}


export default SectionSequenceList;