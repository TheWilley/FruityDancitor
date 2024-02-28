import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import CheckboxInput from '../../../components/CheckboxInput';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  copyMods,
  modifyAllFramesUpdate,
  pasteMods,
} from '../../../redux/spriteSheetSlice';

/**
 *
 */
function InspectorSettings() {
  const modifyAllFrames = useAppSelector((state) => state.spriteSheet.modifyAllFrames);
  const dispatch = useAppDispatch();

  return (
    <>
      <CheckboxInput
        tooltip='Edit all frames in sequence'
        faIcon={faLayerGroup}
        checked={modifyAllFrames}
        class='mb-2'
        onChange={() => {
          dispatch(modifyAllFramesUpdate(!modifyAllFrames));
        }}
      />
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
        <button className='btn btn-success' onClick={() => dispatch(copyMods())}>
          Copy mods
        </button>
        <button className='btn btn-info' onClick={() => dispatch(pasteMods())}>
          Paste mods
        </button>
      </div>
    </>
  );
}

export default InspectorSettings;
