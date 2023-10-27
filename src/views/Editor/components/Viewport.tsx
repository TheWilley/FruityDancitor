import { useState } from 'react';
import CardL1 from '../../../components/CardL1';
import Navbar from '../../navbar/Navbar';

function Viewport() {
    // Editor Settings
    const [rows, setRows] = useState(1);
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);
    const editorSettings = {
        rows, setRows,
        width, setWidth,
        height, setHeight
    };

    return (
        <div className="flex flex-col gap-2">
            <Navbar editorSettings={editorSettings} />
            <CardL1 className="flex justify-center items-center h-full">
                <canvas width='500px' height='500px' className='bg-[url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.nWLpYSGP33IYGhcR1sFOHgAAAA%26pid%3DApi&f=1&ipt=5812f5c126591b3cde8929ba6262c2374c2a488462b03474da6bd2da7c3a5bab&ipo=images)]' />
            </CardL1>

            {rows} {width} {height}
        </div>
    );
}

export default Viewport;