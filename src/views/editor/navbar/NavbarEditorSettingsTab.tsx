import { faBars, faTextHeight, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInputValidation from '../../../hooks/utils/useInputValidation.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { heightUpdate, widthUpdate } from '../../../redux/viewportSlice.ts';
import { numberOfSequencesUpdate } from '../../../redux/spriteSheetSlice.ts';

/**
 * Component which represents settings concerning the editor.
 *
 * For example, the width and height of a tile (i.e, things you would change when editing the sprite sheet).
 */
function NavbarEditorSettingsTab() {
  const { validateNumberInput } = useInputValidation();
  const dispatch = useAppDispatch();
  const numberOfSequences = useAppSelector(
    (state) => state.spriteSheet.numberOfSequences
  );
  const { height, width } = useAppSelector((state) => state.viewport);

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
            value={numberOfSequences}
            onChange={(e) =>
              validateNumberInput('number', e, (value) =>
                dispatch(numberOfSequencesUpdate(value))
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
            value={width}
            onChange={(e) =>
              validateNumberInput('number', e, (value) => dispatch(widthUpdate(value)))
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
            value={height}
            onChange={(e) =>
              validateNumberInput('number', e, (value) => dispatch(heightUpdate(value)))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default NavbarEditorSettingsTab;
