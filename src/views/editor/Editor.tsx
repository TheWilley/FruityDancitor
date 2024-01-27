import useAppSettings from '../../hooks/state/useAppSettings.ts';
import useEditorData from '../../hooks/state/useEditorData.ts';
import useEditorSettings from '../../hooks/state/useEditorSettings.ts';
import Navbar from './navbar/Navbar.tsx';
import SectionRight from './sections/SectionRight.tsx';
import InspectorFrameMods from './inspector/InspectorFrameMods';
import InspectorFramesList from './inspector/InspectorFramesList';
import InspectorPreview from './inspector/InspectorPreview';
import InspectorSequenceName from './inspector/InspectorSequenceName.tsx';
import SequenceList from './sequencelist/SequenceList.tsx';
import SectionMiddle from './sections/SectionMiddle.tsx';
import SpriteSheetCanvas from './viewport/Viewport.tsx';
import SectionLeft from './sections/SectionLeft.tsx';
import SectionContainer from './sections/SectionContainer.tsx';
import { LoadSettings, SaveSettings } from '../../global/types.ts';
import InspectorPickFrames from './inspector/InspectorPickFrames.tsx';
import InspectorUpload from './inspector/InspectorUpload.tsx';
import useUtils from '../../hooks/utils/useUtils.ts';
import PopupKeyboardBindings from './popup/PopupKeyboardBindings.tsx';

/**
 * Component which represents a sprite sheet Editor.
 * This component serves as a comprehensive editor interface for managing sequences,
 * frames, and various settings associated with the sprite sheet.
 */
function Editor() {
  // States
  const appSettings = useAppSettings();
  const editorSettings = useEditorSettings();
  const editorData = useEditorData(editorSettings.numberOfSequences);
  const saveSettings: SaveSettings = {
    spriteSheetSequences: editorData.spriteSheetSequences,
    numberOfSequences: editorSettings.numberOfSequences,
    height: editorSettings.height,
    width: editorSettings.width,
    previewFps: appSettings.previewFps,
    customBackgroundSrc: appSettings.customBackgroundSrc,
    customBackgroundDarkness: appSettings.customBackgroundDarkness,
  };
  const loadSettings: LoadSettings = {
    setSpriteSheetSequences: editorData.setSpriteSheetSequences,
    setNumberOfSequences: editorSettings.setNumberOfSequences,
    setHeight: editorSettings.setHeight,
    setWidth: editorSettings.setWidth,
    setPreviewFps: appSettings.setPreviewFps,
    setCustomBackgroundSrc: appSettings.setCustomBackgroundSrc,
    setCustomBackgroundDarkness: appSettings.setCustomBackgroundDarkness,
  };
  useUtils(editorData.viewport, editorData.fileUpload, saveSettings, loadSettings);

  return (
    <>
      <SectionContainer>
        <SectionLeft>
          <SequenceList />
        </SectionLeft>

        <SectionMiddle>
          <Navbar
            appSettings={appSettings}
            editorSettings={editorSettings}
            exportSettings={{
              viewport: editorData.viewport,
              spriteSheetSequences: editorData.spriteSheetSequences,
            }}
            loadSettings={loadSettings}
            saveSettings={saveSettings}
          />
          <SpriteSheetCanvas viewport={editorData.viewport} />
        </SectionMiddle>

        <SectionRight>
          {editorData.viewport && (
            <InspectorPreview
              viewport={editorData.viewport}
              previewFps={appSettings.previewFps}
            />
          )}
          <div className='p-2'>
            <InspectorSequenceName />
            <h2 className='text-2xl font-bold mt-5'> Frame Mods </h2>
            <InspectorFrameMods />
            <h2 className='text-2xl font-bold mt-5 mb-3'> Frames </h2>
            <InspectorUpload
              dialogIsShown={editorData.dialogIsShown}
              setDialogIsShown={editorData.setDialogIsShown}
              selectedDialogFrames={editorData.selectedDialogFrames}
              setSelectedDialogFrames={editorData.setSelectedDialogFrames}
              dialogFrames={editorData.dialogFrames}
              setDialogFrames={editorData.setDialogFrames}
              fileUpload={editorData.fileUpload}
            />
            <InspectorFramesList />
          </div>
        </SectionRight>
        <InspectorPickFrames
          dialogFrames={editorData.dialogFrames}
          setDialogFrames={editorData.setDialogFrames}
          selectedDialogFrames={editorData.selectedDialogFrames}
          setSelectedDialogFrames={editorData.setSelectedDialogFrames}
          dialogIsShown={editorData.dialogIsShown}
          setDialogIsShown={editorData.setDialogIsShown}
          fileUpload={editorData.fileUpload}
        />
      </SectionContainer>
      <PopupKeyboardBindings />
    </>
  );
}

export default Editor;
