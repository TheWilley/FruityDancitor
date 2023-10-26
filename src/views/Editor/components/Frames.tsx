import CardL1 from '../../../components/CardL1';
import Frame from './Frame';

function GroupList() {
    return (
        <ul className='h-full overflow-auto'>
            {Array.from({ length: 10 }).map((_, i) => (
                <li>
                    <Frame index={i} />
                </li>
            ))}
        </ul>
    );
}

function Frames() {
    return (
        <>
            <CardL1 className='min-h-full p-1'>
                <GroupList />
            </CardL1>
        </>
    );
}

export default Frames;