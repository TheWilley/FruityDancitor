import useAppSettings from '../../hooks/state/useAppSettings.ts';
import useEditorData from '../../hooks/state/useEditorData.ts';
import useEditorSettings from '../../hooks/state/useEditorSettings.ts';
import Navbar from './navbar/Navbar.tsx';
import Inspector from './inspector/Inspector.tsx';
import InspectorFileUpload from './inspector/InspectorFileUpload';
import InspectorFrameMods from './inspector/InspectorFrameMods';
import InspectorFramesList from './inspector/InspectorFramesList';
import InspectorPreview from './inspector/InspectorPreview';
import InspectorSequenceName from './inspector/InspectorSequenceName.tsx';
import SequenceList from './sequencelist/SequenceList.tsx';
import Viewport from './viewport/Viewport.tsx';
import SpriteSheetCanvas from './viewport/ViewportSpriteSheetCanvas';
import useBackground from '../../hooks/utils/useBackground.ts';

/**
 * Represents a sprite sheet Editor.
 * This component serves as a comprehensive editor interface for managing sequences,
 * frames, and various settings associated with the sprite sheet.
 */
function Editor() {
  const appSettings = useAppSettings();
  const editorSettings = useEditorSettings();
  const editorData = useEditorData(editorSettings.numberOfSequences);

  useBackground(appSettings.customBackgroundSrc, appSettings.customBackgroundDarkness);

  return (
    <div
      className='grid grid-cols-[20%_60%_20%] gap-2 w-full [&>*]:min-h-full'
      style={{ height: 'calc(100vh - 40px)' }}
    >
      <SequenceList
        spriteSheetSequences={editorData.spriteSheetSequences}
        setSpriteSheetSequences={editorData.setSpriteSheetSequences}
        selectedSequence={editorData.selectedSequence}
        setSelectedSequence={editorData.setSelectedSequence}
      />

      <Viewport>
        <Navbar
          appSettings={appSettings}
          editorSettings={editorSettings}
          exportSettings={{
            viewport: editorData.viewport,
            spriteSheetSequences: editorData.spriteSheetSequences,
          }}
          loadSettings={{
            setSpriteSheetSequences: editorData.setSpriteSheetSequences,
            setNumberOfSequences: editorSettings.setNumberOfSequences,
            setHeight: editorSettings.setHeight,
            setWidth: editorSettings.setWidth,
            setCustomBackgroundSrc: appSettings.setCustomBackgroundSrc,
            setCustomBackgroundDarkness: appSettings.setCustomBackgroundDarkness,
            setImageCompressionRatio: appSettings.setImageCompressionRatio,
          }}
          saveSettings={{
            spriteSheetSequences: editorData.spriteSheetSequences,
            numberOfSequences: editorSettings.numberOfSequences,
            height: editorSettings.height,
            width: editorSettings.width,
            customBackgroundSrc: appSettings.customBackgroundSrc,
            customBackgroundDarkness: appSettings.customBackgroundDarkness,
            imageCompressionRatio: appSettings.imageCompressionRatio,
          }}
        />
        <SpriteSheetCanvas
          numberOfSequences={editorSettings.numberOfSequences}
          height={editorSettings.height}
          width={editorSettings.width}
          spriteSheetSequences={editorData.spriteSheetSequences}
          viewport={editorData.viewport}
        />
      </Viewport>

      <Inspector>
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
            spriteSheetSequences={editorData.spriteSheetSequences}
            setSpriteSheetSequences={editorData.setSpriteSheetSequences}
            selectedSequence={editorData.selectedSequence}
          />
          <h2 className='text-2xl font-bold mt-5'> Frame Mods </h2>
          <InspectorFrameMods
            spriteSheetSequences={editorData.spriteSheetSequences}
            setSpriteSheetSequences={editorData.setSpriteSheetSequences}
            selectedSequence={editorData.selectedSequence}
            selectedFrame={editorData.selectedFrame}
          />
          <h2 className='text-2xl font-bold mt-5 mb-3'> Frames </h2>
          <InspectorFileUpload
            spriteSheetSequences={editorData.spriteSheetSequences}
            setSpriteSheetSequences={editorData.setSpriteSheetSequences}
            selectedSequence={editorData.selectedSequence}
            imageCompressionRatio={appSettings.imageCompressionRatio}
          />
          <InspectorFramesList
            spriteSheetSequences={editorData.spriteSheetSequences}
            setSpriteSheetSequences={editorData.setSpriteSheetSequences}
            selectedSequence={editorData.selectedSequence}
            selectedFrame={editorData.selectedFrame}
            setSelectedFrame={editorData.setSelectedFrame}
          />
        </div>
      </Inspector>
    </div>
  );
}

export default Editor;
