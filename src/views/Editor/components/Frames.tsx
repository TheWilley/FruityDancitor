import { useState } from 'react';
import CardL1 from '../../../Components/CardL1';
import Frame from './Frame';

function FramesList() {
    return (
        <ul className='h-full overflow-auto'>
            {Array.from({ length: 30 }).map((_, i) => (
                <li>
                    <Frame index={i} />
                </li>
            ))}
        </ul>
    );
}

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
    const [tab, setTab] = useState(0);

    const tabs = [
        {
            name: 'Frames',
            view: <FramesList />,
        },
        {
            name: 'Groups',
            view: <GroupList />,
        },
    ];
    return (
        <>
            <CardL1 className='min-h-full p-1'>
                <div className="tabs">
                    {tabs.map((item, index) => (
                        <div className={`tab tab-lifted ${index === tab && 'tab-active'}`} onClick={() => setTab(index)}> {item.name} </div>
                    ))}
                </div>
                <div>
                    {tabs[tab].view}
                </div>
            </CardL1>
        </>
    );
}

export default Frames;