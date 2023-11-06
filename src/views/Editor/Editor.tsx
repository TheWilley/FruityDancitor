import { useState } from 'react';
import appConfig from '../../../appConfig';
import { IFrame } from '../../global/types';
import Navbar from '../navbar/Navbar';
import FileUpload from './components/FileUpload';
import FramesList from './components/FramesList';
import Inspector from './components/Inspector';
import RowName from './components/RowName';
import Preview from './components/Preview';
import RowList from './components/RowList';
import Viewport from './components/Viewport';
import SpriteSheetCanvas from './components/SpriteSheetCanvas';
import FrameMods from './components/FrameMods';

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
    // TODO: Make the last row have "held" as name
    const [frames, setFrames] = useState<IFrame[]>(new Array(appConfig.amountOfRows).fill({ row: [], name: '' }));
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedFrame, setSelectedFrame] = useState(0);

    // Canvas
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();

    // Export Settings
    const exportSettings = {
        canvas, frames
    };

    return (
        <div className="grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full" style={{ height: 'calc(100vh - 40px)' }}>
            <RowList frames={frames} setFrames={setFrames} rows={rows} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />

            <Viewport>
                <Navbar editorSettings={editorSettings} exportSettings={exportSettings} />
                <SpriteSheetCanvas rows={editorSettings.rows} height={editorSettings.height} width={editorSettings.width} frames={frames} setCanvas={setCanvas} />
            </Viewport>

            <Inspector>
                {canvas && <Preview originalCanvas={canvas} height={height} width={width} selectedRow={selectedRow} />}
                <RowName frames={frames} setFrames={setFrames} selectedRow={selectedRow} />
                <h2 className='text-2xl font-bold mt-5'> Frame Mods </h2>
                <FrameMods frames={frames} setFrames={setFrames} selectedRow={selectedRow} selectedFrame={selectedFrame} setSelectedFrame={setSelectedFrame} />
                <h2 className='text-2xl font-bold mt-5 mb-3'> Frames </h2>
                <FileUpload frames={frames} setFrames={setFrames} selectedRow={selectedRow} />
                <FramesList frames={frames} setFrames={setFrames} rows={8} selectedRow={selectedRow} selectedFrame={selectedFrame} setSelectedFrame={setSelectedFrame} />
            </Inspector>
        </div>
    );
}

export default Editor;