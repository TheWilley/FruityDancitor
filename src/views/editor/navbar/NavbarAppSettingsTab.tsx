import { faImage, faLightbulb, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppSettings } from '../../../global/types.ts';
import useInputValidation from '../../../hooks/utils/useInputValidation.ts';

type Props = { appSettings: AppSettings };

/**
 * Component which represents settings concerning the app.
 *
 * More specifically, settings which does not concern a specific section of the app.
 * @param props A object containing component properties.
 */
function NavbarAppSettingsTab(props: Props) {
  const { validateNumberInput } = useInputValidation();

  return (
    <div className='grid grid-cols-3 gap-2'>
      <div className='join'>
        <div className='bg-base-200 join-item p-1 pl-2 pr-2'>
          <FontAwesomeIcon icon={faPlay} />
        </div>
        <div
          className='w-full tooltip tooltip-bottom'
          data-tip='Preview FPS - The sequence preview FPS'
        >
          <input
            type='number'
            className='input input-bordered join-item input-sm w-full'
            placeholder='Preview FPS'
            min={1}
            max={12}
            value={props.appSettings.previewFps}
            onChange={(e) =>
              validateNumberInput('number', e, (value) =>
                props.appSettings.setPreviewFps(value)
              )
            }
          />
        </div>
      </div>
      <div className='join'>
        <div className='bg-base-200 join-item p-1 pl-2 pr-2'>
          <FontAwesomeIcon icon={faImage} />
        </div>
        <div
          className='w-full tooltip tooltip-bottom'
          data-tip='Custom Background - Enter a URL of a image to use it as the background of the app'
        >
          <input
            type='text'
            className='input input-bordered join-item input-sm w-full'
            placeholder='Custom Background URL'
            value={props.appSettings.customBackgroundSrc}
            onChange={(e) => props.appSettings.setCustomBackgroundSrc(e.target.value)}
          />
        </div>
      </div>
      <div className='join'>
        <div className='bg-base-200 join-item p-1 pl-2 pr-2'>
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
        <div
          className='w-full tooltip tooltip-bottom'
          data-tip='Custom Background Darkness - How much to darken the custom background image'
        >
          <input
            type='number'
            className='input input-bordered join-item input-sm w-full'
            placeholder='Custom Background Darkness'
            min={0.1}
            max={1}
            step={0.1}
            value={props.appSettings.customBackgroundDarkness}
            onChange={(e) =>
              validateNumberInput('float', e, (value) =>
                props.appSettings.setCustomBackgroundDarkness(value)
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default NavbarAppSettingsTab;
