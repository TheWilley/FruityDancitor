import { List, arrayMove } from 'react-movable';
import CardL1 from '../../../components/CardL1';
import Item from './Item';

function RowList(props: { frames: string[][], setFrames: React.Dispatch<React.SetStateAction<string[][]>>, rows: number}) {
    return (
        <CardL1 className='p-1'>
            <List
                values={props.frames.slice(0, props.rows)}
                onChange={({ oldIndex, newIndex }) => {
                    props.setFrames(arrayMove(props.frames, oldIndex, newIndex));
                }}
                renderList={({ children, props }) => <ul {...props}>{children}</ul>}
                renderItem={({ value, props, index }) => (
                    <li {...props}>
                        <Item {...props} index={index || 0} base64={value[0]} prefix='Row' />
                    </li>
                )}
            />
        </CardL1>
    );
}


export default RowList;