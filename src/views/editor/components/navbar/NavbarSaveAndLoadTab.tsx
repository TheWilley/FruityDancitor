import { useRef } from 'react';
import useSaveAndLoad from '../../../../hooks/useSaveAndLoad';
import { DeriveSaveAndLoadSettings } from '../../../../utils/settingsHelper';

function NavbarSaveAndLoadTab(props: { saveAndLoadSettings: DeriveSaveAndLoadSettings }) {
    const { spriteSheetFrames, setSpriteSheetFrames, imageCompressionRatio, setImageCompressionRatio, numberOfSequences, setNumberOfSequences, width, setWidth, height, setHeight } = props.saveAndLoadSettings;
    const [save, load] = useSaveAndLoad();
    const fileRef = useRef<HTMLInputElement | null>(null);

    return (
        <div>
            <input id='selectImage' type="file" onChange={(e) => { e.target.files && load(e.target.files[0], setSpriteSheetFrames, setImageCompressionRatio, setNumberOfSequences, setWidth, setHeight); }} ref={fileRef} className='hidden' />
            <button className="btn btn-outline btn-warning w-full" onClick={() => fileRef.current && fileRef.current.click()}> Load Project </button>
            <button className="btn btn-outline btn-success w-full mt-1" onClick={() => save(spriteSheetFrames, imageCompressionRatio, numberOfSequences, width, height)}> Save Project </button>
        </div>
    );
}

export default NavbarSaveAndLoadTab;