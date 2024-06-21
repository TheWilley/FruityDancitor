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
import InspectorPickFrames from './inspector/InspectorPickFrames.tsx';
import InspectorUpload from './inspector/InspectorUpload.tsx';
import PopupKeyboardBindings from './popup/PopupKeyboardBindings.tsx';
import useRefs from '../../hooks/state/useRefs.ts';
import useUtils from '../../hooks/utils/useUtils.ts';
import InspectorSettings from './inspector/InspectorSettings.tsx';
import Collapse from '../../components/Collapse.tsx';

/**
 * Component which represents a sprite sheet Editor.
 * This component serves as a comprehensive editor interface for managing sequences,
 * frames, and various settings associated with the sprite sheet.
 */
function Editor() {
  // States
  const { viewport, fileUpload } = useRefs();
  useUtils(viewport, fileUpload);

  return (
    <>
      <SectionContainer>
        <SectionLeft>
          <SequenceList />
        </SectionLeft>

        <SectionMiddle>
          <Navbar viewport={viewport} />
          <SpriteSheetCanvas viewport={viewport} />
        </SectionMiddle>

        <SectionRight>
          {viewport && <InspectorPreview viewport={viewport} />}
          <div className='p-2'>
            <InspectorSequenceName />
            <Collapse label='Frame Mods'>
              <InspectorFrameMods />
            </Collapse>
            <Collapse label='Settings'>
              <InspectorSettings />
            </Collapse>
            <Collapse label='Upload'>
              <InspectorUpload fileUpload={fileUpload} />
            </Collapse>
            <Collapse label='Frames'>
              <InspectorFramesList />
            </Collapse>
          </div>
        </SectionRight>
      </SectionContainer>
      <InspectorPickFrames />
      <PopupKeyboardBindings />
    </>
  );
}

export default Editor;
