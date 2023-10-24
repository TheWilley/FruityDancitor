import CardL1 from '../../Components/CardL1';
import Frame from './Frame';

function Frames() {
    return (
        <CardL1 className='min-h-full p-1'>
            <ul className='h-full overflow-auto'>
                {Array.from({ length: 30 }).map((_, i) => (
                    <li>
                        <Frame index={i} />
                    </li>
                ))}
            </ul>
        </CardL1>
    );
}

export default Frames;