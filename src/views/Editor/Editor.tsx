import { useState } from 'react';
import Inspector from './components/Inspector';
import Viewport from './components/Viewport';
import Navbar from '../navbar/Navbar';
import Canvas from './components/Canvas';
import ItemList from './components/ItemList';
import FileUploadMultiple from './components/FileUploadMultiple';
import RowList from './components/RowList';

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
    const [frames, setFrames] = useState<string[][]>(new Array(1000).fill([]));
    const [selectedRow] = useState(0);

    return (
        <div className="grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full" style={{ height: 'calc(100vh - 40px)' }}>
            <RowList frames={frames} setFrames={setFrames} rows={rows} />
            <Viewport>
                <Navbar editorSettings={editorSettings} />
                <Canvas rows={editorSettings.rows} height={editorSettings.height} width={editorSettings.width} frames={frames} />
            </Viewport>
            <Inspector>
                <h2 className='text-2xl font-bold mt-3 mb-3'> Frames </h2>
                <FileUploadMultiple frames={frames} setFrames={setFrames} selectedRow={selectedRow}/>
                <ItemList frames={frames} setFrames={setFrames} rows={8} selectedRow={selectedRow} />
            </Inspector>
        </div>
    );
}

export default Editor;