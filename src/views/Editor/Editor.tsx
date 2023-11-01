import { useState } from 'react';
import Inspector from './components/Inspector';
import Viewport from './components/Viewport';
import Navbar from '../navbar/Navbar';
import Canvas from './components/Canvas';
import FrameList from './components/ItemList';
import FileUploadMultiple from './components/FileUploadMultiple';
import RowList from './components/RowList';
import appConfig from '../../../appConfig';
import { IFrame } from '../../global/types';
import Name from './components/Name';

function Editor() {
    // Editor Settings
    const [rows, setRows] = useState(1);
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);
    const editorSettings = {
        rows, setRows,
        width, setWidth,
        height, setHeight
    };

    // Inspector
    const [frames, setFrames] = useState<IFrame[]>(new Array(appConfig.amountOfRows).fill({row: [], name: ''}));
    const [selectedRow, setSelectedRow] = useState(0);

    return (
        <div className="grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full" style={{ height: 'calc(100vh - 40px)' }}>
            <RowList frames={frames} setFrames={setFrames} rows={rows} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
            <Viewport>
                <Navbar editorSettings={editorSettings} />
                <Canvas rows={editorSettings.rows} height={editorSettings.height} width={editorSettings.width} frames={frames} />
            </Viewport>
            <Inspector>
                <Name frames={frames} setFrames={setFrames} selectedRow={selectedRow} />
                <h2 className='text-2xl font-bold mt-3 mb-3'> Frames </h2>
                <FileUploadMultiple frames={frames} setFrames={setFrames} selectedRow={selectedRow}/>
                <FrameList frames={frames} setFrames={setFrames} rows={8} selectedRow={selectedRow} />
            </Inspector>
        </div>
    );
}

export default Editor;