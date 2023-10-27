import { useState } from 'react';
import Inspector from './components/Inspector';
import Viewport from './components/Viewport';
import Navbar from '../navbar/Navbar';
import Canvas from './components/Canvas';
import RowsList from './components/RowsList';

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

    return (
        <div className="grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full" style={{ height: 'calc(100vh - 40px)' }}>
            <RowsList rows={editorSettings.rows}/>
            <Viewport Navbar={<Navbar editorSettings={editorSettings}/>} Canvas={<Canvas rows={editorSettings.rows} height={editorSettings.height} width={editorSettings.width}/>} />
            <Inspector />
        </div>
    );
}

export default Editor;