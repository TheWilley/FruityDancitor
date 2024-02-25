import { faBars, faTextHeight, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { heightUpdate, widthUpdate } from '../../../redux/viewportSlice.ts';
import { numberOfSequencesUpdate } from '../../../redux/spriteSheetSlice.ts';
import NumberInput from '../../../components/NumberInput.tsx';

/**
 * Component which represents settings concerning the editor.
 *
 * For example, the width and height of a tile (i.e, things you would change when editing the sprite sheet).
 */
function NavbarEditorSettingsTab() {
  const dispatch = useAppDispatch();
  const numberOfSequences = useAppSelector(
    (state) => state.spriteSheet.numberOfSequences
  );
  const { height, width } = useAppSelector((state) => state.viewport);

  return (
    <div className='grid grid-cols-3 gap-2'>
      <NumberInput
        faIcon={faBars}
        tooltip='Sequences - The number of Sequences'
        min={1}
        max={100}
        size='sm'
        value={numberOfSequences}
        onChange={(value) => dispatch(numberOfSequencesUpdate(value))}
      />
      <NumberInput
        faIcon={faTextWidth}
        tooltip='Width - The width of every cell'
        min={50}
        max={1000}
        size='sm'
        value={width}
        onChange={(value) => dispatch(widthUpdate(value))}
      />
      <NumberInput
        faIcon={faTextHeight}
        tooltip='Height - The height of every cell'
        min={50}
        max={1000}
        size='sm'
        value={height}
        onChange={(value) => dispatch(heightUpdate(value))}
      />
    </div>
  );
}

export default NavbarEditorSettingsTab;
