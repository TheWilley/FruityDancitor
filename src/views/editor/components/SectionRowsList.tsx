import { useEffect } from 'react';
import { List, arrayMove } from 'react-movable';
import CardL1 from '../../../components/CardL1';
import { IFrame } from '../../../global/types';
import CommonListItem from './CommonListItem';

function SectionRowsList(EProps: { frames: IFrame[], setFrames: React.Dispatch<React.SetStateAction<IFrame[]>>, rows: number, selectedRow: number, setSelectedRow: React.Dispatch<React.SetStateAction<number>> }) {
    useEffect(() => {
        if(EProps.selectedRow >= EProps.rows) {
            EProps.setSelectedRow(EProps.rows - 1);
        }
    });
    
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
                        <CommonListItem {...props} base64={value.row[0]?.base64} text={EProps.frames[index || 0].name} alt={`Row ${(index || 0) + 1}`} highlighted={index === EProps.selectedRow}  />
                    </li>
                )}
            />
        </CardL1>
    );
}


export default SectionRowsList;