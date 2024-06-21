import { faImage, faLightbulb, faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  backgroundDarknessUpdate,
  backgroundSrcUpdate,
} from '../../../redux/backgroundSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { fpsUpdate } from '../../../redux/previewSlice.ts';
import { showHeaderUpdate } from '../../../redux/viewportSlice.ts';
import { faDisplay } from '@fortawesome/free-solid-svg-icons/faDisplay';
import CheckboxInput from '../../../components/CheckboxInput.tsx';
import TextInput from '../../../components/TextInput.tsx';
import NumberInput from '../../../components/NumberInput.tsx';

/**
 * Component which represents settings concerning the app.
 *
 * More specifically, settings which does not concern a specific section of the app.
 */
function NavbarAppSettingsTab() {
  const dispatch = useAppDispatch();
  const fps = useAppSelector((state) => state.preview.fps);
  const background = useAppSelector((state) => state.background);
  const showHeader = useAppSelector((state) => state.viewport.showHeader);

  return (
    <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
      <NumberInput
        faIcon={faPlay}
        tooltip='Preview FPS - The sequence preview FPS'
        min={1}
        max={12}
        size='sm'
        value={fps}
        onChange={(value) => dispatch(fpsUpdate(value))}
      />
      <TextInput
        faIcon={faImage}
        placeholder='Custom Background URL'
        tooltip='Custom Background - Enter a URL of a image to use it as the background of the app'
        size='sm'
        onChange={(value) => dispatch(backgroundSrcUpdate(value))}
        value={background.backgroundSrc}
      />
      <NumberInput
        faIcon={faLightbulb}
        tooltip='Custom Background Darkness - How much to darken the custom background image'
        min={0}
        max={1}
        step={0.1}
        size='sm'
        value={background.backgroundDarkness}
        type='float'
        onChange={(value) => dispatch(backgroundDarknessUpdate(value))}
      />
      <CheckboxInput
        faIcon={faDisplay}
        tooltip='Hide Header'
        checked={showHeader}
        onChange={() => dispatch(showHeaderUpdate(!showHeader))}
      />
    </div>
  );
}

export default NavbarAppSettingsTab;
