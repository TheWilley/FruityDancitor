import { faImage, faLightbulb, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInputValidation from '../../../hooks/utils/useInputValidation.ts';
import {
  backgroundDarknessUpdate,
  backgroundSrcUpdate,
} from '../../../redux/backgroundSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { fpsUpdate } from '../../../redux/previewSlice.ts';
import { showHeaderUpdate } from '../../../redux/viewportSlice.ts';
import { faDisplay } from '@fortawesome/free-solid-svg-icons/faDisplay';
import CheckboxInput from '../../../components/CheckboxInput.tsx';

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
  const { validateNumberInput } = useInputValidation();

  return (
    <div className='grid grid-cols-3 gap-2'>
      <div className='join'>
        <div className='join-item bg-base-200 p-1 px-2'>
          <FontAwesomeIcon icon={faPlay} />
        </div>
        <div
          className='tooltip tooltip-bottom w-full'
          data-tip='Preview FPS - The sequence preview FPS'
        >
          <input
            type='number'
            className='input input-sm join-item input-bordered w-full'
            placeholder='Preview FPS'
            min={1}
            max={12}
            value={fps}
            onChange={(e) =>
              validateNumberInput('number', e, (value) => dispatch(fpsUpdate(value)))
            }
          />
        </div>
      </div>
      <div className='join'>
        <div className='join-item bg-base-200 p-1 px-2'>
          <FontAwesomeIcon icon={faImage} />
        </div>
        <div
          className='tooltip tooltip-bottom w-full'
          data-tip='Custom Background - Enter a URL of a image to use it as the background of the app'
        >
          <input
            type='text'
            className='input input-sm join-item input-bordered w-full'
            placeholder='Custom Background URL'
            value={background.backgroundSrc}
            onChange={(e) => dispatch(backgroundSrcUpdate(e.target.value))}
          />
        </div>
      </div>
      <div className='join'>
        <div className='join-item bg-base-200 p-1 px-2'>
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
        <div
          className='tooltip tooltip-bottom w-full'
          data-tip='Custom Background Darkness - How much to darken the custom background image'
        >
          <input
            type='number'
            className='input input-sm join-item input-bordered w-full'
            placeholder='Custom Background Darkness'
            min={0.1}
            max={1}
            step={0.1}
            value={background.backgroundDarkness}
            onChange={(e) =>
              validateNumberInput('float', e, (value) =>
                dispatch(backgroundDarknessUpdate(value))
              )
            }
          />
        </div>
      </div>
      <CheckboxInput faIcon={faDisplay} tooltip='Hide Header'>
        <input
          type='checkbox'
          className='checkbox join-item checkbox-lg !size-full'
          checked={showHeader}
          onClick={() => dispatch(showHeaderUpdate(!showHeader))}
        />
      </CheckboxInput>
    </div>
  );
}

export default NavbarAppSettingsTab;
