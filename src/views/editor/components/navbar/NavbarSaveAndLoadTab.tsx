import { useRef } from 'react';
import useSaveAndLoad from '../../../../hooks/useSaveAndLoad';
import { ISaveAndLoadSettings } from '../../../../utils/settingsHelper';

function NavbarSaveAndLoadTab(props: { saveAndLoadSettings: ISaveAndLoadSettings }) {
    const [save, load] = useSaveAndLoad();
    const { frames, numberOfSequences: numberOfSequences, width, height } = props.saveAndLoadSettings;
    const fileRef = useRef<HTMLInputElement | null>(null);

    return (
        <div>
            <input id='selectImage' type="file" onChange={(e) => { e.target.files && load(e.target.files[0]); }} ref={fileRef} className='hidden' />
            <button className="btn btn-outline btn-warning w-full" onClick={() => fileRef.current && fileRef.current.click()}> Load </button>
            <button className="btn btn-outline btn-success w-full mt-1" onClick={() => save(frames, numberOfSequences, width, height)}> Save </button>
        </div>
    );
}

export default NavbarSaveAndLoadTab;