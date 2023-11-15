import useAppSettings from '../../hooks/useAppSettings';
import useEditorData from '../../hooks/useEditorData';
import useEditorSettings from '../../hooks/useEditorSettings';
import { deriveExportSettings, deriveSaveAndLoadSettings } from '../../utils/settingsHelper';
import SectionNavbar from './components/sections/SectionNavbar';
import SectionInspector from './components/sections/SectionInspector';
import InspectorFileUpload from './components/inspector/InspectorFileUpload';
import InspectorFrameMods from './components/inspector/InspectorFrameMods';
import InspectorFramesList from './components/inspector/InspectorFramesList';
import InspectorPreview from './components/inspector/InspectorPreview';
import InspectorRowName from './components/inspector/InspectorRowName';
import SectionSequenceList from './components/sections/SectionSequenceList';
import SectionViewport from './components/sections/SectionViewport';
import SpriteSheetCanvas from './components/viewport/ViewportSpriteSheetCanvas';

function Editor() {
    const appSettings = useAppSettings();
    const editorSettings = useEditorSettings();
    const editorData = useEditorData(editorSettings.numberOfSequences);
    const exportSettings = deriveExportSettings(editorData);
    const saveAndLoadSettings = deriveSaveAndLoadSettings(editorData, editorSettings);

    return (
        <div className="grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full" style={{ height: 'calc(100vh - 40px)' }}>
            <SectionSequenceList spriteSheetFrames={editorData.spriteSheetFrames} setSpriteSheetFrames={editorData.setSpriteSheetFrames} selectedRow={editorData.selectedSequence} setSelectedRow={editorData.setSelectedSequence} />

            <SectionViewport>
                <SectionNavbar appSettings={appSettings} editorSettings={editorSettings} exportSettings={exportSettings} saveAndLoadSettings={saveAndLoadSettings} />
                <SpriteSheetCanvas numberOfSequences={editorSettings.numberOfSequences} height={editorSettings.height} width={editorSettings.width} spriteSheetFrames={editorData.spriteSheetFrames} setCanvas={editorData.setViewport} />
            </SectionViewport>

            <SectionInspector>
                {editorData.viewport && <InspectorPreview originalCanvas={editorData.viewport} height={editorSettings.height} width={editorSettings.width} selectedRow={editorData.selectedSequence} />}
                <InspectorRowName spriteSheetFrames={editorData.spriteSheetFrames} setSpriteSheetFrames={editorData.setSpriteSheetFrames} selectedRow={editorData.selectedSequence} />
                <h2 className='text-2xl font-bold mt-5'> Frame Mods </h2>
                <InspectorFrameMods spriteSheetFrames={editorData.spriteSheetFrames} setSpriteSheetFrames={editorData.setSpriteSheetFrames} selectedRow={editorData.selectedSequence} selectedFrame={editorData.selectedFrame} setSelectedFrame={editorData.setSelectedFrame} />
                <h2 className='text-2xl font-bold mt-5 mb-3'> Frames </h2>
                <InspectorFileUpload spriteSheetFrames={editorData.spriteSheetFrames} setSpriteSheetFrames={editorData.setSpriteSheetFrames} selectedRow={editorData.selectedSequence} compressionRatio={appSettings.imageCompressionRatio} />
                <InspectorFramesList spriteSheetFrames={editorData.spriteSheetFrames} setSpriteSheetFrames={editorData.setSpriteSheetFrames} numberOfSequences={8} selectedRow={editorData.selectedSequence} selectedFrame={editorData.selectedFrame} setSelectedFrame={editorData.setSelectedFrame} />
            </SectionInspector>
        </div>
    );
}

export default Editor;