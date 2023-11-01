import { List, arrayMove } from 'react-movable';
import CardL1 from '../../../components/CardL1';
import Item from './Item';
import { IFrame } from '../../../global/types';

function RowList(EProps: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, rows: number, selectedRow: number,setSelectedRow: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <CardL1 className='p-1'>
            <List
                values={EProps.frames.slice(0, EProps.rows)}
                onChange={({ oldIndex, newIndex }) => {
                    EProps.setFrames(arrayMove(EProps.frames, oldIndex, newIndex));
                    EProps.setSelectedRow(newIndex);
                }}
                renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                renderItem={({ value, props, index }) => (
                    <li {...props} onMouseDown={() => EProps.setSelectedRow(index || 0)}>
                        <Item {...props} index={index || 0} base64={value.row[0]} prefix='Row' highlighted={index === EProps.selectedRow} />
                    </li>
                )}
            />
        </CardL1>
    );
}


export default RowList;