import useAppSettings from '../../hooks/state/useAppSettings.ts';
import useEditorData from '../../hooks/state/useEditorData.ts';
import useEditorSettings from '../../hooks/state/useEditorSettings.ts';
import {
  deriveExportSettings,
  deriveSaveAndLoadSettings,
} from '../../utils/settingsHelper';
import SectionNavbar from './components/sections/SectionNavbar';
import SectionInspector from './components/sections/SectionInspector';
import InspectorFileUpload from './components/inspector/InspectorFileUpload';
import InspectorFrameMods from './components/inspector/InspectorFrameMods';
import InspectorFramesList from './components/inspector/InspectorFramesList';
import InspectorPreview from './components/inspector/InspectorPreview';
import InspectorSequenceName from './components/inspector/InspectorSequenceName.tsx';
import SectionSequenceList from './components/sections/SectionSequenceList';
import SectionViewport from './components/sections/SectionViewport';
import SpriteSheetCanvas from './components/viewport/ViewportSpriteSheetCanvas';
import useBackground from '../../hooks/utils/useBackground.ts';
import Test from './components/sections/Test.tsx';

/**
 * Represents a sprite sheet Editor.
 * This component serves as a comprehensive editor interface for managing sequences,
 * frames, and various settings associated with the sprite sheet.
 */
function Editor() {
  const appSettings = useAppSettings();
  const editorSettings = useEditorSettings();
  const editorData = useEditorData(editorSettings.numberOfSequences);
  const exportSettings = deriveExportSettings(editorData);
  const saveAndLoadSettings = deriveSaveAndLoadSettings(
    editorData,
    appSettings,
    editorSettings
  );

  useBackground(
    appSettings.customBackgroundSrc.value,
    appSettings.customBackgroundDarkness.value
  );

  return (
    <div
      className='grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full'
      style={{ height: 'calc(100vh - 40px)' }}
    >
      <SectionSequenceList
        spriteSheetFrames={editorData.spriteSheetFrames}
        selectedSequence={editorData.selectedSequence}
      />

      <SectionViewport>
        <SectionNavbar
          appSettings={appSettings}
          editorSettings={editorSettings}
          exportSettings={exportSettings}
          saveAndLoadSettings={saveAndLoadSettings}
        />
        <SpriteSheetCanvas
          numberOfSequences={editorSettings.numberOfSequences}
          height={editorSettings.height}
          width={editorSettings.width}
          spriteSheetFrames={editorData.spriteSheetFrames}
          viewport={editorData.viewport}
        />
      </SectionViewport>

      <SectionInspector>
        {editorData.viewport && (
          <InspectorPreview
            viewport={editorData.viewport}
            height={editorSettings.height}
            width={editorSettings.width}
            selectedSequence={editorData.selectedSequence}
          />
        )}
        <div className='p-2'>
          <InspectorSequenceName
            spriteSheetFrames={editorData.spriteSheetFrames}
            selectedSequence={editorData.selectedSequence}
          />
          <h2 className='text-2xl font-bold mt-5'> Frame Mods </h2>
          <InspectorFrameMods
            spriteSheetFrames={editorData.spriteSheetFrames}
            selectedSequence={editorData.selectedSequence}
            selectedFrame={editorData.selectedFrame}
          />
          <h2 className='text-2xl font-bold mt-5 mb-3'> Frames </h2>
          <InspectorFileUpload
            spriteSheetFrames={editorData.spriteSheetFrames}
            selectedSequence={editorData.selectedSequence}
            imageCompressionRatio={appSettings.imageCompressionRatio}
          />
          <InspectorFramesList
            spriteSheetFrames={editorData.spriteSheetFrames}
            selectedSequence={editorData.selectedSequence}
            selectedFrame={editorData.selectedFrame}
          />
        </div>
      </SectionInspector>
      <Test />
    </div>
  );
}

export default Editor;
