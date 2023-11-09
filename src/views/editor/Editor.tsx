import useAppSettings from '../../hooks/useAppSettings';
import useEditorData from '../../hooks/useEditorData';
import useEditorSettings from '../../hooks/useEditorSettings';
import { deriveExportSettings, deriveSaveAndLoadSettings } from '../../utils/settingsHelper';
import Navbar from '../navbar/Navbar';
import SectionInspector from './components/SectionInspector';
import InspectorFileUpload from './components/InspectorFileUpload';
import InspectorFrameMods from './components/InspectorFrameMods';
import InspectorFramesList from './components/InspectorFramesList';
import InspectorPreview from './components/InspectorPreview';
import InspectorRowName from './components/InspectorRowName';
import SectionRowsList from './components/SectionRowsList';
import SectionViewport from './components/SectionViewport';
import SpriteSheetCanvas from './components/ViewportSpriteSheetCanvas';

function Editor() {
    const editorData = useEditorData();
    const appSettings = useAppSettings();
    const editorSettings = useEditorSettings();
    const exportSettings = deriveExportSettings(editorData);
    const saveAndLoadSettings = deriveSaveAndLoadSettings(editorData, editorSettings);

    return (
        <div className="grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full" style={{ height: 'calc(100vh - 40px)' }}>
            <SectionRowsList frames={editorData.frames} setFrames={editorData.setFrames} rows={editorSettings.rows} selectedRow={editorData.selectedRow} setSelectedRow={editorData.setSelectedRow} />

            <SectionViewport>
                <Navbar appSettings={appSettings} editorSettings={editorSettings} exportSettings={exportSettings} saveAndLoadSettings={saveAndLoadSettings} />
                <SpriteSheetCanvas rows={editorSettings.rows} height={editorSettings.height} width={editorSettings.width} frames={editorData.frames} setCanvas={editorData.setCanvas} />
            </SectionViewport>

            <SectionInspector>
                {editorData.canvas && <InspectorPreview originalCanvas={editorData.canvas} height={editorSettings.height} width={editorSettings.width} selectedRow={editorData.selectedRow} />}
                <InspectorRowName frames={editorData.frames} setFrames={editorData.setFrames} selectedRow={editorData.selectedRow} />
                <h2 className='text-2xl font-bold mt-5'> Frame Mods </h2>
                <InspectorFrameMods frames={editorData.frames} setFrames={editorData.setFrames} selectedRow={editorData.selectedRow} selectedFrame={editorData.selectedFrame} setSelectedFrame={editorData.setSelectedFrame} />
                <h2 className='text-2xl font-bold mt-5 mb-3'> Frames </h2>
                <InspectorFileUpload frames={editorData.frames} setFrames={editorData.setFrames} selectedRow={editorData.selectedRow} compressionRatio={appSettings.compressionRatio} />
                <InspectorFramesList frames={editorData.frames} setFrames={editorData.setFrames} rows={8} selectedRow={editorData.selectedRow} selectedFrame={editorData.selectedFrame} setSelectedFrame={editorData.setSelectedFrame} />
            </SectionInspector>
        </div>
    );
}

export default Editor;