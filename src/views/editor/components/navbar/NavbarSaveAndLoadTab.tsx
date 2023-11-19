import {useRef} from 'react';
import useSaveAndLoad from '../../../../hooks/useSaveAndLoad';
import {SaveAndLoadSettings} from '../../../../global/types.ts';

type Props = { saveAndLoadSettings: SaveAndLoadSettings }

// TODO: Fix this file
function NavbarSaveAndLoadTab(props: Props) {
    const [save, load] = useSaveAndLoad();
    const fileRef = useRef<HTMLInputElement | null>(null);

    return (
        <div>
            <input id="selectImage" type="file" onChange={(e) => {
                e.target.files && load(e.target.files[0], props.saveAndLoadSettings);
            }} ref={fileRef} className="hidden"/>
            <button className="btn btn-outline btn-warning w-full"
                    onClick={() => fileRef.current && fileRef.current.click()}> Load Project
            </button>
            <button className="btn btn-outline btn-success w-full mt-1"
                    onClick={() => save(props.saveAndLoadSettings)}> Save Project
            </button>
        </div>
    );
}

export default NavbarSaveAndLoadTab;