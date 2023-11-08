import useAppSettings from '../../hooks/useAppSettings';
import useEditorData from '../../hooks/useEditorData';
import useEditorSettings from '../../hooks/useEditorSettings';
import { deriveExportSettings, deriveSaveAndLoadSettings } from '../../utils/settingsHelper';
import Navbar from '../navbar/Navbar';
import FileUpload from './components/FileUpload';
import FrameMods from './components/FrameMods';
import FramesList from './components/FramesList';
import Inspector from './components/Inspector';
import Preview from './components/Preview';
import RowList from './components/RowList';
import RowName from './components/RowName';
import SpriteSheetCanvas from './components/SpriteSheetCanvas';
import Viewport from './components/Viewport';

function Editor() {
    const editorData = useEditorData();
    const appSettings = useAppSettings();
    const editorSettings = useEditorSettings();
    const exportSettings = deriveExportSettings(editorData);
    const saveAndLoadSettings = deriveSaveAndLoadSettings(editorData, editorSettings);

    return (
        <div className="grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full" style={{ height: 'calc(100vh - 40px)' }}>
            <RowList frames={editorData.frames} setFrames={editorData.setFrames} rows={editorSettings.rows} selectedRow={editorData.selectedRow} setSelectedRow={editorData.setSelectedRow} />

            <Viewport>
                <Navbar appSettings={appSettings} editorSettings={editorSettings} exportSettings={exportSettings} saveAndLoadSettings={saveAndLoadSettings} />
                <SpriteSheetCanvas rows={editorSettings.rows} height={editorSettings.height} width={editorSettings.width} frames={editorData.frames} setCanvas={editorData.setCanvas} />
            </Viewport>

            <Inspector>
                {editorData.canvas && <Preview originalCanvas={editorData.canvas} height={editorSettings.height} width={editorSettings.width} selectedRow={editorData.selectedRow} />}
                <RowName frames={editorData.frames} setFrames={editorData.setFrames} selectedRow={editorData.selectedRow} />
                <h2 className='text-2xl font-bold mt-5'> Frame Mods </h2>
                <FrameMods frames={editorData.frames} setFrames={editorData.setFrames} selectedRow={editorData.selectedRow} selectedFrame={editorData.selectedFrame} setSelectedFrame={editorData.setSelectedFrame} />
                <h2 className='text-2xl font-bold mt-5 mb-3'> Frames </h2>
                <FileUpload frames={editorData.frames} setFrames={editorData.setFrames} selectedRow={editorData.selectedRow} compressionRatio={appSettings.compressionRatio} />
                <FramesList frames={editorData.frames} setFrames={editorData.setFrames} rows={8} selectedRow={editorData.selectedRow} selectedFrame={editorData.selectedFrame} setSelectedFrame={editorData.setSelectedFrame} />
            </Inspector>
        </div>
    );
}

export default Editor;