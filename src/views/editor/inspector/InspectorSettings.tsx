import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import CheckboxInput from '../../../components/CheckboxInput';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { modifyAllFramesUpdate } from '../../../redux/spriteSheetSlice';

/**
 *
 */
function InspectorSettings() {
    const modifyAllFrames = useAppSelector((state) => state.spriteSheet.modifyAllFrames);
    const dispatch = useAppDispatch();

    return (
        <CheckboxInput tooltip='Edit all frames in sequence' faIcon={faLayerGroup}>
            <input
                type='checkbox'
                className='checkbox join-item checkbox-lg !size-full'
                checked={modifyAllFrames}
                onChange={() => {dispatch(modifyAllFramesUpdate(!modifyAllFrames)); }}
            />
        </CheckboxInput>
    );
}

export default InspectorSettings;