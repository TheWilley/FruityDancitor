import { faImage, faLightbulb, faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppSettings } from '../../../../global/types';

type Props = { appSettings: AppSettings };

/**
 * Component which represents settings concerning the app.
 *
 * More specifically, settings which does not concern a specific section of the app.
 */
function NavbarAppSettingsTab(props: Props) {
  return (
    <div className='grid grid-cols-3 gap-2'>
      <div className='join'>
        <div className='bg-base-200 join-item p-1 pl-2 pr-2'>
          <FontAwesomeIcon icon={faPercent} />
        </div>
        <div
          className='w-full tooltip tooltip-bottom'
          data-tip='Compression Ratio - Effects the resolution when uploading images'
        >
          <input
            type='number'
            className='input input-bordered join-item input-sm w-full'
            placeholder='Sequences'
            min={0.1}
            max={1}
            step={0.1}
            value={props.appSettings.imageCompressionRatio.value}
            onChange={(e) =>
              props.appSettings.imageCompressionRatio.setValue(Number(e.target.value))
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
            value={props.appSettings.customBackgroundSrc.value}
            onChange={(e) =>
              props.appSettings.customBackgroundSrc.setValue(e.target.value)
            }
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
            value={props.appSettings.customBackgroundDarkness.value}
            onChange={(e) =>
              props.appSettings.customBackgroundDarkness.setValue(Number(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default NavbarAppSettingsTab;
