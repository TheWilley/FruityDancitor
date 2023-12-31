import { faBars, faTextHeight, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditorSettings } from '../../../global/types.ts';
import useInputValidation from '../../../hooks/utils/useInputValidation.ts';

type Props = { editorSettings: EditorSettings };

/**
 * Component which represents settings concerning the editor.
 *
 * For example, the width and height of a tile (i.e, things you would change when editing the sprite sheet).
 * @param props A object containing component properties.
 */
function NavbarEditorSettingsTab(props: Props) {
  const { validateNumberInput } = useInputValidation();

  return (
    <div className='grid grid-cols-3 gap-2'>
      <div className='join'>
        <div className='bg-base-200 join-item p-1 pl-2 pr-2'>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div
          className='w-full tooltip tooltip-bottom'
          data-tip='Sequences - The number of Sequences'
        >
          <input
            type='number'
            className='input input-bordered join-item input-sm w-full'
            placeholder='Sequences'
            min={1}
            max={100}
            value={props.editorSettings.numberOfSequences}
            onChange={(e) =>
              validateNumberInput('number', e, (value) =>
                props.editorSettings.setNumberOfSequences(value)
              )
            }
          />
        </div>
      </div>
      <div className='join'>
        <div className='bg-base-200 join-item p-1 pl-2 pr-2'>
          <FontAwesomeIcon icon={faTextWidth} />
        </div>
        <div
          className='w-full tooltip tooltip-bottom'
          data-tip='Width - The width of every cell'
        >
          <input
            type='number'
            className='input input-bordered join-item input-sm w-full'
            placeholder='Width'
            min={50}
            value={props.editorSettings.width}
            onChange={(e) =>
              validateNumberInput('number', e, (value) =>
                props.editorSettings.setWidth(value)
              )
            }
          />
        </div>
      </div>
      <div className='join'>
        <div className='bg-base-200 join-item p-1 pl-2 pr-2'>
          <FontAwesomeIcon icon={faTextHeight} />
        </div>
        <div
          className='w-full tooltip tooltip-bottom'
          data-tip='Height - The height of every cell'
        >
          <input
            type='number'
            className='input input-bordered join-item input-sm w-full'
            placeholder='Height'
            min={50}
            value={props.editorSettings.height}
            onChange={(e) =>
              validateNumberInput('number', e, (value) =>
                props.editorSettings.setHeight(value)
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default NavbarEditorSettingsTab;
